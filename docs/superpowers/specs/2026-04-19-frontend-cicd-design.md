# Frontend CI/CD Pipeline — Design Spec

**Date:** 2026-04-19
**Target repo:** `message_integration_platform_frontend_v2`
**Deploy target:** Same VPS as backend (Message_Integration_Backend)
**Reviewer domain:** cloudflared tunnel (domains routed to localhost ports on VPS)

---

## 1. Goal

Add a GitHub Actions CI/CD pipeline for the frontend that mirrors the backend's pipeline (`Message_Integration_Backend/.github/workflows/`). Frontend builds run in CI; staging and production deploys run on the same VPS as the backend via SSH, using Docker Compose with an nginx-served container bound to localhost. The existing cloudflared tunnel routes the public domains to these localhost ports.

## 2. Scope

**In scope:**
- `Dockerfile` (multi-stage: node build → nginx serve) for the frontend.
- `nginx.conf` tuned for a Vite SPA (fallback + caching + gzip).
- `docker-compose.yml` (production) and `docker-compose.staging.yml` (staging).
- `.dockerignore`.
- Three GitHub Actions workflows: `ci.yml`, `deploy-staging.yml`, `deploy-production.yml`.
- Production auto-rollback via `docker commit` snapshot.
- Documentation of required GitHub secrets/vars and VPS prep steps.

**Out of scope:**
- CDN, pre-rendering, SSR.
- Automated cloudflared tunnel config updates (tunnel routes added manually, once).
- E2E (Playwright) run against deployed staging URL — existing `playwright.yml` stays as-is for now.
- Bundle-size budget enforcement in CI.
- Secret rotation automation.

## 3. Architecture

### 3.1 Environments

| Env | Branch | VPS dir (var) | Compose file | Host port | Container | Cloudflared route |
|-----|--------|---------------|--------------|-----------|-----------|-------------------|
| Production | `main` | `${FRONTEND_APP_DIR}` | `docker-compose.yml` | `127.0.0.1:8080` | `frontend` | prod-domain → `http://localhost:8080` |
| Staging | `staging` | `${FRONTEND_STAGING_DIR}` | `docker-compose.staging.yml` | `127.0.0.1:8081` | `chatblix-frontend-staging` | staging-domain → `http://localhost:8081` |

The container listens on nginx port 8080 internally (using `nginxinc/nginx-unprivileged:alpine`, which runs as UID 101 and binds to 8080 by default — chosen to keep the production stage rootless). Compose maps it to the localhost host port (`127.0.0.1:8080:8080` prod, `127.0.0.1:8081:8080` staging). Cloudflared tunnel (already installed on VPS for backend) terminates TLS and forwards to these localhost ports.

### 3.2 Container

- Base for serving: `nginx:alpine`.
- Build stage: `node:22-alpine` + pnpm via corepack (same pnpm version as backend Dockerfile).
- Built assets land in `/usr/share/nginx/html`.
- Healthcheck: `curl -f http://localhost/ || exit 1`.
- No network side-effects (no DB, no Redis) — a pure static file server.
- Container is bound to `127.0.0.1:<port>` only. Not publicly exposed.

### 3.3 nginx behavior

- SPA fallback: `try_files $uri /index.html;`.
- Gzip on for text/js/css/json/svg.
- `Cache-Control: public, max-age=31536000, immutable` for `/assets/*` (Vite emits content-hashed filenames).
- `Cache-Control: no-cache` for `/index.html`.
- Basic security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`.

### 3.4 Env var strategy

Vite bakes `VITE_*` variables into the JS bundle at build time. Different URLs per environment require different build-time values.

- On the VPS, two gitignored files: `.env.production` and `.env.staging`, each in its respective clone directory.
- The compose file pulls these variables via `env_file:` and passes them to the Dockerfile as `build.args` (which then become `ARG` → `ENV` → available to Vite during `pnpm build`).
- CI never receives production env vars (no secrets needed in GH for `VITE_*`).

Required `VITE_*` keys (to be finalized during implementation by reading `src/`): `VITE_API_URL`, `VITE_SOCKET_URL`, plus any others currently referenced in source.

## 4. Components

### 4.1 `Dockerfile`

Multi-stage:

1. `base` — `node:22-alpine`, corepack, pnpm activated, curl installed.
2. `dependencies` — copy `pnpm-lock.yaml` + `package.json`, run `pnpm install --frozen-lockfile` with a cache mount on `/pnpm/store`.
3. `build` — copy rest of source. Declare `ARG VITE_API_URL`, `ARG VITE_SOCKET_URL`, etc., and re-expose as `ENV`. Run `pnpm build` → `dist/`.
4. `production` — `FROM nginxinc/nginx-unprivileged:alpine`. Copy `dist/` to `/usr/share/nginx/html`. Copy `nginx.conf` to `/etc/nginx/conf.d/default.conf`. `EXPOSE 8080`. `HEALTHCHECK` uses BusyBox `wget` (the unprivileged image ships without `curl`).

### 4.2 `nginx.conf`

Single `server` block on port 8080. `root /usr/share/nginx/html;`. SPA fallback, gzip, cache rules, security headers as described in 3.3.

### 4.3 `docker-compose.yml` (production)

- Service `frontend`, container `frontend`.
- `build.context: .`, `build.target: production`, `build.args` listing each `VITE_*` from env.
- `ports: '127.0.0.1:8080:80'`.
- `env_file: .env.production`.
- `restart: unless-stopped`.
- `healthcheck` invoking curl `/`.
- `networks: [chatblix-frontend-network]`.

### 4.4 `docker-compose.staging.yml`

Same shape, but:
- `container_name: chatblix-frontend-staging`.
- `ports: '127.0.0.1:8081:80'`.
- `env_file: .env.staging`.
- `networks: [chatblix-frontend-staging-network]`.

### 4.5 `.dockerignore`

`node_modules`, `dist`, `.env*`, `.git`, `playwright-report`, `tests`, `coverage`, `.github`, `.vscode`, `.idea`.

### 4.6 `.github/workflows/ci.yml`

Triggers: `pull_request` and `push` to `main` and `staging`. Concurrency group cancels in-progress CI for same ref.

Single job on `ubuntu-latest`:
1. `actions/checkout@v4`.
2. `pnpm/action-setup@v4`.
3. `actions/setup-node@v4` with `node-version: '22'` and `cache: 'pnpm'`.
4. `pnpm install --frozen-lockfile`.
5. `pnpm lint`.
6. `pnpm type-check`.
7. `pnpm test -- --run` (vitest non-watch).
8. `pnpm build` (with placeholder `VITE_*` values from a `ci` env section so Vite doesn't error on missing vars; values don't need to be real — CI only verifies it builds).

No service containers.

### 4.7 `.github/workflows/deploy-staging.yml`

Triggers: `push` to `staging`. Concurrency `deploy-staging`, cancel-in-progress `false`.

Two jobs: `deploy` and `health-check` (`needs: deploy`).

`deploy` job uses `appleboy/ssh-action@v1` with `VPS_HOST`/`VPS_USER`/`VPS_SSH_KEY` to run:

```
cd ${{ vars.FRONTEND_STAGING_DIR }}
git fetch origin staging
git reset --hard origin/staging
docker compose -f docker-compose.staging.yml build --no-cache frontend
docker compose -f docker-compose.staging.yml up -d frontend
docker image prune -f
```

`health-check` job: `sleep 10`, then poll `http://localhost:${{ vars.STAGING_FRONTEND_PORT }}/` — 5 retries × 5s, expecting HTTP 200.

### 4.8 `.github/workflows/deploy-production.yml`

Triggers: `push` to `main`. Concurrency `deploy-production`, cancel-in-progress `false`.

Two jobs: `deploy` and `notify` (`needs: deploy`, `if: always()`).

`deploy` job, all steps inside a single SSH action, `set -e`:

1. `cd ${{ vars.FRONTEND_APP_DIR }}`.
2. `TIMESTAMP=$(date +%Y%m%d-%H%M%S)`.
3. **Backup**: if `frontend` container running → `docker commit frontend frontend:backup-$TIMESTAMP`.
4. `git fetch origin main && git reset --hard origin/main`.
5. `docker compose build --no-cache frontend`.
6. `docker compose up -d --no-deps frontend`.
7. **Health poll**: curl `http://localhost:${{ vars.FRONTEND_PORT }}/` — 6 retries × 5s, expect 200.
8. **On fail**: find newest `frontend:backup-*` image, `docker tag` it to `frontend:latest`, `docker compose up -d --no-deps frontend`, `exit 1`. If no backup exists, log error and exit 1.
9. **On success**: keep 3 newest `frontend:backup-*` tags (`sort -r | tail -n +4 | xargs docker rmi`), then `docker image prune -f`.

`notify` job writes a deployment summary table to `$GITHUB_STEP_SUMMARY` (env, commit, actor, result, timestamp, rollback note).

### 4.9 Existing workflows

`playwright.yml` stays unchanged (runs in CI locally against built app). Future: add a `post-deploy-smoke.yml` that hits staging URL — deferred, not part of this spec.

## 5. Flow Summary

**CI (PR or push):**
```
checkout → pnpm install → lint → type-check → vitest → build
```

**Staging deploy:**
```
SSH → git reset → compose build → compose up → prune
  → health poll :8081 (5×5s) → job result
```

**Production deploy:**
```
SSH → (commit backup) → git reset → compose build → compose up
  → health poll :8080 (6×5s)
     ├─ 200  → keep last 3 backups, prune, summary OK
     └─ fail → retag newest backup, compose up, summary ROLLBACK, exit 1
```

## 6. Error handling

| Failure | Behavior |
|---|---|
| CI job step fails | GH Actions red, blocks merge. |
| SSH fails | Job red, VPS untouched beyond last completed step. |
| `git reset` fails | `set -e` aborts deploy, existing container keeps serving. |
| Docker build fails | Old container keeps serving; deploy red. |
| Container starts but unhealthy on staging | Deploy/health-check job red. Manual re-push to fix. No auto-rollback (mirrors backend staging). |
| Container starts but unhealthy on prod | Auto-rollback to newest backup tag, job red. |
| No backup image exists at prod rollback | Error logged, exit 1. Manual recovery (re-deploy previous git SHA). |

## 7. Required configuration

### 7.1 GitHub secrets (reused from backend, no new secrets)

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`

### 7.2 GitHub repository variables (new, frontend repo)

- `FRONTEND_APP_DIR` — absolute path to prod clone on VPS.
- `FRONTEND_STAGING_DIR` — absolute path to staging clone on VPS.
- `FRONTEND_PORT` — `8080`.
- `STAGING_FRONTEND_PORT` — `8081`.

### 7.3 GitHub environments (new, frontend repo)

- `production`
- `staging`

(Mirrors backend repo's environment setup.)

### 7.4 VPS one-time prep

1. Clone frontend repo into `${FRONTEND_APP_DIR}` (main branch checked out).
2. Clone frontend repo into `${FRONTEND_STAGING_DIR}` (staging branch checked out).
3. Place `.env.production` in the prod clone, `.env.staging` in the staging clone, each containing all required `VITE_*` keys. Gitignored.
4. Docker + Docker Compose already installed (required by backend, no new dependency).
5. Add cloudflared tunnel ingress rules: prod-domain → `http://localhost:8080`, staging-domain → `http://localhost:8081`. Reload cloudflared.

## 8. Testing plan

**CI enforced:**
- `pnpm lint` — eslint clean.
- `pnpm type-check` — `tsc --noEmit` clean.
- `pnpm test -- --run` — vitest passes.
- `pnpm build` — Vite build succeeds with placeholder `VITE_*`.

**Post-deploy automated:**
- Health poll hits `/` and expects HTTP 200. (`/` returns `index.html`, so 200 means nginx is up and `index.html` exists in the image.)

**Manual smoke (first deploy each env):**
- Open prod/staging domain in a browser.
- Verify the SPA loads.
- Verify it reaches the backend API (check network tab for 2xx responses).
- Verify no console errors.

## 9. Rollback and recovery

- Prod auto-rollback retags `frontend:backup-<latest>` to `frontend:latest` and restarts the container. Three backups retained; older ones pruned on successful deploys.
- Staging has no auto-rollback: on failure, push a fix commit to `staging`.
- If prod has no backup image available (first deploy or after a prune bug), manual recovery: on VPS, `git checkout <previous-working-sha>`, `docker compose build --no-cache frontend`, `docker compose up -d --no-deps frontend`.

## 10. File manifest

New files to be created:

- `message_integration_platform_frontend_v2/Dockerfile`
- `message_integration_platform_frontend_v2/nginx.conf`
- `message_integration_platform_frontend_v2/docker-compose.yml`
- `message_integration_platform_frontend_v2/docker-compose.staging.yml`
- `message_integration_platform_frontend_v2/.dockerignore`
- `message_integration_platform_frontend_v2/.github/workflows/ci.yml`
- `message_integration_platform_frontend_v2/.github/workflows/deploy-staging.yml`
- `message_integration_platform_frontend_v2/.github/workflows/deploy-production.yml`
- `message_integration_platform_frontend_v2/docs/superpowers/runbooks/frontend-vps-prep.md`

Modified files:

- `message_integration_platform_frontend_v2/.gitignore` — add `.env.production`, `.env.staging` entries if not already ignored.

Unchanged:

- `message_integration_platform_frontend_v2/.github/workflows/playwright.yml` — stays as-is.

## 11. Assumptions and open implementation details

- `VITE_*` key list: finalized during implementation by grepping `src/` for `import.meta.env.VITE_`.
- Backend and frontend share the VPS; no port collisions at 8080/8081 (verify on VPS before first deploy).
- Cloudflared tunnel is already managed outside this repo; tunnel config changes are manual and one-time.
- The frontend repo already has a `staging` branch, or one will be created as part of the first deploy.
- `pnpm type-check` script exists (`tsc --noEmit`) — confirmed in `package.json`.
