# Frontend CI/CD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GitHub Actions CI/CD pipeline for the frontend that builds in CI, deploys a localhost-bound nginx container to the same VPS as the backend on push to `staging` and `main`, with auto-rollback on production health failure.

**Architecture:** Multi-stage Docker build (node → nginx:alpine) serves the Vite SPA. Two compose files (`docker-compose.yml` prod, `docker-compose.staging.yml` staging) bind to `127.0.0.1:8080` and `127.0.0.1:8081`; an existing cloudflared tunnel on the VPS routes public domains to those localhost ports. Three workflows (`ci.yml`, `deploy-staging.yml`, `deploy-production.yml`) mirror the backend pipeline in `Message_Integration_Backend/.github/workflows/`.

**Tech Stack:** Vite + React 19, pnpm, nginx:alpine, Docker Compose, GitHub Actions, `appleboy/ssh-action@v1`, cloudflared tunnel (external).

**Source of truth for VITE\_\* keys (grepped from `src/`):** `VITE_API_URL`, `VITE_API_BASE_URL`, `VITE_SOCKET_URL`, `VITE_CLOUDINARY_BASE_URL`, `VITE_NEWSLETTER_MODAL_KEY`.

**Operating decisions (from user):**

- Work directly on branch `main`. No feature branch. No PR.
- Commits are **local only**. Do NOT `git push`. First push will trigger `deploy-production.yml`; user will push explicitly once VPS prep is complete.
- Task 0 (branch setup) and Task 11 (PR) in the original draft are SKIPPED; they are retained below only as "N/A" placeholders so numbering stays stable across reviewers.

**Caveats for the implementer:**

- This is an infra plan. "Verification" = `docker compose config`, `docker build`, `docker run` smoke — not unit tests. Follow the steps literally.
- Docker 29.4+ and `docker compose` v5+ are already installed locally (verified).
- `gh` CLI is authed as user `SurajR2` (only relevant if a reviewer wants to cross-check).
- All file paths below are relative to `message_integration_platform_frontend_v2/` unless stated otherwise.
- The spec restored from commit `b3781da` lives at `docs/superpowers/specs/2026-04-19-frontend-cicd-design.md`.

---

## File Structure

Files to create or modify in `message_integration_platform_frontend_v2/`:

| Path                                             | Responsibility                                                    |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| `nginx.conf`                                     | SPA routing + caching + gzip + security headers                   |
| `.dockerignore`                                  | Exclude build artifacts, secrets, IDE cruft from Docker context   |
| `Dockerfile`                                     | Multi-stage build: pnpm install → vite build → nginx:alpine serve |
| `docker-compose.yml`                             | Production service (`127.0.0.1:8080:80`, `.env.production`)       |
| `docker-compose.staging.yml`                     | Staging service (`127.0.0.1:8081:80`, `.env.staging`)             |
| `.gitignore`                                     | Add `.env.production`, `.env.staging`                             |
| `.github/workflows/ci.yml`                       | PR/push: lint, type-check, test, build                            |
| `.github/workflows/deploy-staging.yml`           | Push to `staging`: SSH deploy + health check                      |
| `.github/workflows/deploy-production.yml`        | Push to `main`: backup + SSH deploy + health check + rollback     |
| `docs/superpowers/runbooks/frontend-vps-prep.md` | One-time VPS setup instructions                                   |

Files NOT modified: `.github/workflows/playwright.yml` stays as-is.

---

## Task 0: Branch setup — SKIPPED

Working directly on `main`. No action.

---

## Task 1: Create `nginx.conf`

**Files:**

- Create: `nginx.conf`

- [ ] **Step 1.1: Write `nginx.conf`**

Create `message_integration_platform_frontend_v2/nginx.conf` with:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/javascript
        application/javascript
        application/json
        application/xml
        image/svg+xml;

    # Hashed assets: immutable, long cache
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    # index.html: never cache
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        expires 0;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    server_tokens off;
}
```

- [ ] **Step 1.2: Verify syntax with a throwaway container**

Run:

```bash
docker run --rm -v "$PWD/nginx.conf:/etc/nginx/conf.d/default.conf:ro" nginx:alpine nginx -t
```

Expected output ends with: `nginx: configuration file /etc/nginx/nginx.conf test is successful`.

- [ ] **Step 1.3: Commit**

```bash
git add nginx.conf
git commit -m "chore(cicd): add nginx config for SPA serving"
```

---

## Task 2: Create `.dockerignore`

**Files:**

- Create: `.dockerignore`

- [ ] **Step 2.1: Write `.dockerignore`**

Create `message_integration_platform_frontend_v2/.dockerignore`:

```
# Git / CI
.git
.github
.gitignore

# Node / build output
node_modules
dist
dist-ssr
*.tsbuildinfo

# Local env (never baked into image — passed as build args)
.env
.env.local
.env.production
.env.staging

# IDE / OS
.vscode
.idea
.DS_Store
*.swp

# Test output
coverage
playwright-report
test-results
blob-report

# Misc
.claude
.claude-flow
docs
README.md
reports
stats.html
```

- [ ] **Step 2.2: Commit**

```bash
git add .dockerignore
git commit -m "chore(cicd): add dockerignore"
```

---

## Task 3: Create `Dockerfile`

**Files:**

- Create: `Dockerfile`

- [ ] **Step 3.1: Write `Dockerfile`**

Create `message_integration_platform_frontend_v2/Dockerfile`:

```dockerfile
# syntax=docker/dockerfile:1.7

# ---- Base ----
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate
WORKDIR /app
RUN apk add --no-cache curl

# ---- Dependencies ----
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---- Build ----
FROM dependencies AS build
ARG VITE_API_URL
ARG VITE_API_BASE_URL
ARG VITE_SOCKET_URL
ARG VITE_CLOUDINARY_BASE_URL
ARG VITE_NEWSLETTER_MODAL_KEY
ENV VITE_API_URL=$VITE_API_URL \
    VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_SOCKET_URL=$VITE_SOCKET_URL \
    VITE_CLOUDINARY_BASE_URL=$VITE_CLOUDINARY_BASE_URL \
    VITE_NEWSLETTER_MODAL_KEY=$VITE_NEWSLETTER_MODAL_KEY
COPY . .
RUN pnpm build

# ---- Production (nginx) ----
FROM nginx:alpine AS production
RUN apk add --no-cache curl
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
```

The pnpm version `10.10.0` matches `package.json:packageManager`. Keep them in sync.

- [ ] **Step 3.2: Verify the image builds locally with placeholder args**

Run:

```bash
docker build \
  --build-arg VITE_API_URL=https://placeholder.example/api \
  --build-arg VITE_API_BASE_URL=https://placeholder.example/api \
  --build-arg VITE_SOCKET_URL=wss://placeholder.example \
  --build-arg VITE_CLOUDINARY_BASE_URL=https://placeholder.example \
  --build-arg VITE_NEWSLETTER_MODAL_KEY=placeholder \
  -t chatblix-frontend:dev .
```

Expected: build succeeds.

If the build fails because of a TypeScript error in source, STOP and report — do NOT modify source to make it build. Source quality is out of scope for this plan.

- [ ] **Step 3.3: Smoke-run the image locally**

Run:

```bash
docker run --rm -d --name frontend-smoke -p 127.0.0.1:8090:80 chatblix-frontend:dev
sleep 3
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:8090/
docker stop frontend-smoke
```

Expected: final line prints `200`.

- [ ] **Step 3.4: Commit**

```bash
git add Dockerfile
git commit -m "chore(cicd): add multi-stage Dockerfile (node build + nginx serve)"
```

---

## Task 4: Create `docker-compose.yml` (production)

**Files:**

- Create: `docker-compose.yml`

- [ ] **Step 4.1: Write `docker-compose.yml`**

Create `message_integration_platform_frontend_v2/docker-compose.yml`:

```yaml
services:
  frontend:
    container_name: frontend
    build:
      context: .
      target: production
      args:
        VITE_API_URL: ${VITE_API_URL}
        VITE_API_BASE_URL: ${VITE_API_BASE_URL}
        VITE_SOCKET_URL: ${VITE_SOCKET_URL}
        VITE_CLOUDINARY_BASE_URL: ${VITE_CLOUDINARY_BASE_URL}
        VITE_NEWSLETTER_MODAL_KEY: ${VITE_NEWSLETTER_MODAL_KEY}
    ports:
      - "127.0.0.1:8080:80"
    restart: unless-stopped
    env_file:
      - .env.production
    healthcheck:
      test: ["CMD-SHELL", "curl -fsS http://localhost/ || exit 1"]
      interval: 1m30s
      timeout: 10s
      retries: 5
      start_period: 20s
    networks:
      - chatblix-frontend-network

networks:
  chatblix-frontend-network:
    driver: bridge
```

- [ ] **Step 4.2: Validate compose syntax with a temporary env file**

Run:

```bash
cat > /tmp/frontend-test.env <<'EOF'
VITE_API_URL=https://placeholder.example/api
VITE_API_BASE_URL=https://placeholder.example/api
VITE_SOCKET_URL=wss://placeholder.example
VITE_CLOUDINARY_BASE_URL=https://placeholder.example
VITE_NEWSLETTER_MODAL_KEY=placeholder
EOF

docker compose --env-file /tmp/frontend-test.env -f docker-compose.yml config > /dev/null && echo OK

rm /tmp/frontend-test.env
```

Expected: prints `OK`.

The compose validation will complain that `.env.production` does not exist — that's expected here; that file only lives on the VPS. Use `--env-file` for validation, never for runtime.

- [ ] **Step 4.3: Commit**

```bash
git add docker-compose.yml
git commit -m "chore(cicd): add production docker-compose"
```

---

## Task 5: Create `docker-compose.staging.yml`

**Files:**

- Create: `docker-compose.staging.yml`

- [ ] **Step 5.1: Write `docker-compose.staging.yml`**

Create `message_integration_platform_frontend_v2/docker-compose.staging.yml`:

```yaml
services:
  frontend:
    container_name: chatblix-frontend-staging
    build:
      context: .
      target: production
      args:
        VITE_API_URL: ${VITE_API_URL}
        VITE_API_BASE_URL: ${VITE_API_BASE_URL}
        VITE_SOCKET_URL: ${VITE_SOCKET_URL}
        VITE_CLOUDINARY_BASE_URL: ${VITE_CLOUDINARY_BASE_URL}
        VITE_NEWSLETTER_MODAL_KEY: ${VITE_NEWSLETTER_MODAL_KEY}
    ports:
      - "127.0.0.1:8081:80"
    restart: unless-stopped
    env_file:
      - .env.staging
    healthcheck:
      test: ["CMD-SHELL", "curl -fsS http://localhost/ || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 20s
    networks:
      - chatblix-frontend-staging-network

networks:
  chatblix-frontend-staging-network:
    driver: bridge
```

- [ ] **Step 5.2: Validate compose syntax**

Run:

```bash
cat > /tmp/frontend-staging-test.env <<'EOF'
VITE_API_URL=https://placeholder.example/api
VITE_API_BASE_URL=https://placeholder.example/api
VITE_SOCKET_URL=wss://placeholder.example
VITE_CLOUDINARY_BASE_URL=https://placeholder.example
VITE_NEWSLETTER_MODAL_KEY=placeholder
EOF

docker compose --env-file /tmp/frontend-staging-test.env -f docker-compose.staging.yml config > /dev/null && echo OK

rm /tmp/frontend-staging-test.env
```

Expected: prints `OK`.

- [ ] **Step 5.3: Commit**

```bash
git add docker-compose.staging.yml
git commit -m "chore(cicd): add staging docker-compose"
```

---

## Task 6: Update `.gitignore`

**Files:**

- Modify: `.gitignore`

- [ ] **Step 6.1: Confirm current `.gitignore` state**

Run:

```bash
grep -E '^\.env(\..+)?$' .gitignore
```

Expected: prints at least `.env` and `.env.local`, and does NOT currently include `.env.production` or `.env.staging`.

- [ ] **Step 6.2: Append env entries**

Edit `.gitignore`: immediately after the `.env.local` line, insert two new lines:

```
.env.production
.env.staging
```

Verify:

```bash
grep -E '^\.env\.(production|staging)$' .gitignore
```

Expected: both lines present.

- [ ] **Step 6.3: Commit**

```bash
git add .gitignore
git commit -m "chore(cicd): ignore env files for production and staging"
```

---

## Task 7: Create `.github/workflows/ci.yml`

**Files:**

- Create: `.github/workflows/ci.yml`

- [ ] **Step 7.1: Write `ci.yml`**

Create `message_integration_platform_frontend_v2/.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
    branches: [main, staging]
  push:
    branches: [main, staging]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  ci:
    name: Lint, Type-check, Test & Build
    runs-on: ubuntu-latest

    env:
      VITE_API_URL: https://ci-placeholder.example/api
      VITE_API_BASE_URL: https://ci-placeholder.example/api
      VITE_SOCKET_URL: wss://ci-placeholder.example
      VITE_CLOUDINARY_BASE_URL: https://ci-placeholder.example
      VITE_NEWSLETTER_MODAL_KEY: ci-placeholder

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type-check
        run: pnpm type-check

      - name: Test
        run: pnpm test -- --run

      - name: Build
        run: pnpm build
```

- [ ] **Step 7.2: Validate YAML**

Run:

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/ci.yml'))" && echo OK
```

Expected: prints `OK`.

- [ ] **Step 7.3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci(cicd): add CI workflow (lint, type-check, test, build)"
```

---

## Task 8: Create `.github/workflows/deploy-staging.yml`

**Files:**

- Create: `.github/workflows/deploy-staging.yml`

- [ ] **Step 8.1: Write `deploy-staging.yml`**

Create `message_integration_platform_frontend_v2/.github/workflows/deploy-staging.yml`:

```yaml
name: Deploy Frontend to Staging

on:
  push:
    branches: [staging]

concurrency:
  group: deploy-staging-frontend
  cancel-in-progress: false

jobs:
  deploy:
    name: Deploy Frontend to Staging
    runs-on: ubuntu-latest
    environment: staging

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            set -e
            cd ${{ vars.FRONTEND_STAGING_DIR }}

            echo "==> Fetching latest staging..."
            git fetch origin staging

            echo "==> Resetting to origin/staging..."
            git reset --hard origin/staging

            echo "==> Building frontend..."
            docker compose -f docker-compose.staging.yml build --no-cache frontend

            echo "==> Starting frontend..."
            docker compose -f docker-compose.staging.yml up -d frontend

            echo "==> Cleaning up dangling images..."
            docker image prune -f

            echo "==> Deploy complete."

  health-check:
    name: Health Check
    needs: deploy
    runs-on: ubuntu-latest

    steps:
      - name: Wait for startup
        run: sleep 10

      - name: Poll health endpoint
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            set -e
            HEALTH_URL="http://localhost:${{ vars.STAGING_FRONTEND_PORT }}/"
            RETRIES=5
            DELAY=5

            for i in $(seq 1 $RETRIES); do
              echo "Health check attempt $i/$RETRIES..."
              STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL" || true)

              if [ "$STATUS" = "200" ]; then
                echo "Health check passed."
                exit 0
              fi

              echo "Got status $STATUS, retrying in ${DELAY}s..."
              sleep $DELAY
            done

            echo "Health check failed after $RETRIES attempts."
            exit 1
```

- [ ] **Step 8.2: Validate YAML**

Run:

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy-staging.yml'))" && echo OK
```

Expected: prints `OK`.

- [ ] **Step 8.3: Commit**

```bash
git add .github/workflows/deploy-staging.yml
git commit -m "ci(cicd): add staging deploy workflow"
```

---

## Task 9: Create `.github/workflows/deploy-production.yml`

**Files:**

- Create: `.github/workflows/deploy-production.yml`

- [ ] **Step 9.1: Write `deploy-production.yml`**

Create `message_integration_platform_frontend_v2/.github/workflows/deploy-production.yml`:

```yaml
name: Deploy Frontend to Production

on:
  push:
    branches: [main]

concurrency:
  group: deploy-production-frontend
  cancel-in-progress: false

jobs:
  deploy:
    name: Deploy Frontend to Production
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Deploy via SSH
        id: deploy
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            set -e
            cd ${{ vars.FRONTEND_APP_DIR }}

            TIMESTAMP=$(date +%Y%m%d-%H%M%S)

            # --- Pre-deploy backup ---
            echo "==> Creating backup of current frontend container..."
            if docker ps -q -f name=frontend | grep -q .; then
              docker commit frontend frontend:backup-$TIMESTAMP
              echo "Backup tagged: frontend:backup-$TIMESTAMP"
            else
              echo "No running frontend container found, skipping backup."
            fi

            # --- Pull & reset ---
            echo "==> Fetching latest main..."
            git fetch origin main
            git reset --hard origin/main

            # --- Build ---
            echo "==> Building frontend..."
            docker compose build --no-cache frontend

            # --- Restart ---
            echo "==> Starting frontend..."
            docker compose up -d --no-deps frontend

            # --- Health check ---
            echo "==> Running health checks..."
            HEALTH_URL="http://localhost:${{ vars.FRONTEND_PORT }}/"
            RETRIES=6
            DELAY=5
            HEALTHY=false

            for i in $(seq 1 $RETRIES); do
              echo "Health check attempt $i/$RETRIES..."
              STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL" || true)

              if [ "$STATUS" = "200" ]; then
                echo "Health check passed."
                HEALTHY=true
                break
              fi

              echo "Got status $STATUS, retrying in ${DELAY}s..."
              sleep $DELAY
            done

            # --- Rollback on failure ---
            if [ "$HEALTHY" = false ]; then
              echo "==> HEALTH CHECK FAILED. Rolling back..."

              LATEST_BACKUP=$(docker images --format '{{.Repository}}:{{.Tag}}' | grep 'frontend:backup-' | head -1)

              if [ -n "$LATEST_BACKUP" ]; then
                echo "Rolling back to $LATEST_BACKUP"
                docker tag "$LATEST_BACKUP" frontend:latest
                docker compose up -d --no-deps frontend
                echo "Rollback complete."
              else
                echo "ERROR: No backup image found for rollback!"
              fi

              exit 1
            fi

            # --- Cleanup old backups (keep last 3) ---
            echo "==> Cleaning up old backup images..."
            docker images --format '{{.Repository}}:{{.Tag}}' \
              | grep 'frontend:backup-' \
              | sort -r \
              | tail -n +4 \
              | xargs -r docker rmi || true

            docker image prune -f
            echo "==> Production deploy complete."

  notify:
    name: Deployment Summary
    needs: deploy
    runs-on: ubuntu-latest
    if: always()

    steps:
      - name: Write summary
        run: |
          echo "## Frontend Deployment Summary" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Field | Value |" >> $GITHUB_STEP_SUMMARY
          echo "|-------|-------|" >> $GITHUB_STEP_SUMMARY
          echo "| **Environment** | production |" >> $GITHUB_STEP_SUMMARY
          echo "| **Commit** | \`${{ github.sha }}\` |" >> $GITHUB_STEP_SUMMARY
          echo "| **Actor** | ${{ github.actor }} |" >> $GITHUB_STEP_SUMMARY
          echo "| **Deploy Status** | ${{ needs.deploy.result }} |" >> $GITHUB_STEP_SUMMARY
          echo "| **Triggered by** | push to main |" >> $GITHUB_STEP_SUMMARY
          echo "| **Timestamp** | $(date -u +'%Y-%m-%d %H:%M:%S UTC') |" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY

          if [ "${{ needs.deploy.result }}" = "failure" ]; then
            echo "> **Auto-rollback was triggered.** Check the deploy logs for details." >> $GITHUB_STEP_SUMMARY
          fi
```

- [ ] **Step 9.2: Validate YAML**

Run:

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy-production.yml'))" && echo OK
```

Expected: prints `OK`.

- [ ] **Step 9.3: Commit**

```bash
git add .github/workflows/deploy-production.yml
git commit -m "ci(cicd): add production deploy workflow with auto-rollback"
```

---

## Task 10: Write VPS prep runbook

**Files:**

- Create: `docs/superpowers/runbooks/frontend-vps-prep.md`

- [ ] **Step 10.1: Create runbook directory**

Run:

```bash
mkdir -p docs/superpowers/runbooks
```

- [ ] **Step 10.2: Write runbook**

Create `message_integration_platform_frontend_v2/docs/superpowers/runbooks/frontend-vps-prep.md`:

````markdown
# Frontend VPS Prep Runbook

One-time setup required on the VPS before the first frontend deploy.

## Prerequisites

- SSH access to VPS as the deploy user.
- Docker + Docker Compose v2 installed (already present for backend).
- cloudflared tunnel running (already present for backend).

## Steps

### 1. Create clone directories

Example values:

```bash
export FRONTEND_APP_DIR=/srv/chatblix-frontend
export FRONTEND_STAGING_DIR=/srv/chatblix-frontend-staging

sudo mkdir -p "$FRONTEND_APP_DIR" "$FRONTEND_STAGING_DIR"
sudo chown "$USER":"$USER" "$FRONTEND_APP_DIR" "$FRONTEND_STAGING_DIR"
```
````

### 2. Clone the repo twice

```bash
git clone -b main    git@github.com:<owner>/<frontend-repo>.git "$FRONTEND_APP_DIR"
git clone -b staging git@github.com:<owner>/<frontend-repo>.git "$FRONTEND_STAGING_DIR"
```

### 3. Place env files

Production — `$FRONTEND_APP_DIR/.env.production`:

```
VITE_API_URL=https://api.chatblix.com
VITE_API_BASE_URL=https://api.chatblix.com/api/v1
VITE_SOCKET_URL=wss://api.chatblix.com
VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/<cloud-name>
VITE_NEWSLETTER_MODAL_KEY=<prod-newsletter-key>
```

Staging — `$FRONTEND_STAGING_DIR/.env.staging`:

```
VITE_API_URL=https://staging-api.chatblix.com
VITE_API_BASE_URL=https://staging-api.chatblix.com/api/v1
VITE_SOCKET_URL=wss://staging-api.chatblix.com
VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/<cloud-name>
VITE_NEWSLETTER_MODAL_KEY=<staging-newsletter-key>
```

Permissions: `chmod 600 .env.production .env.staging`.

### 4. Confirm ports are free

```bash
ss -lntp | grep -E ':(8080|8081)\b' || echo "ports free"
```

Expected: `ports free`. If a process holds 8080 or 8081, either stop it or update the compose files + GH vars to use different ports.

### 5. Add cloudflared tunnel ingress rules

Edit `/etc/cloudflared/config.yml` (or equivalent) and add routes before the catch-all 404:

```yaml
- hostname: app.chatblix.com
  service: http://localhost:8080
- hostname: staging.chatblix.com
  service: http://localhost:8081
```

Reload:

```bash
sudo systemctl reload cloudflared
```

### 6. Configure GitHub repository

**Secrets** — reuse from backend:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`

**Variables**:

- `FRONTEND_APP_DIR`
- `FRONTEND_STAGING_DIR`
- `FRONTEND_PORT` = `8080`
- `STAGING_FRONTEND_PORT` = `8081`

**Environments**:

- `production`
- `staging`

### 7. First manual build (sanity check)

On the VPS, in `$FRONTEND_STAGING_DIR`:

```bash
docker compose -f docker-compose.staging.yml build --no-cache frontend
docker compose -f docker-compose.staging.yml up -d frontend
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:8081/
```

Expected final output: `200`.

````

- [ ] **Step 10.3: Commit**

```bash
git add docs/superpowers/runbooks/frontend-vps-prep.md
git commit -m "docs(cicd): add VPS prep runbook for frontend deploys"
````

---

## Task 11: PR creation — SKIPPED

Working directly on `main`. No PR. User will `git push` only after completing the VPS prep runbook.

---

## Out-of-plan operational steps (owner action required)

These cannot be done from the repo and are flagged for the user:

1. Execute the runbook `docs/superpowers/runbooks/frontend-vps-prep.md` on the VPS.
2. Create the `staging` branch on `origin` (initially tracking `main`) so `deploy-staging.yml` has a branch to trigger on.
3. Set the GitHub repository variables and environments listed in the runbook.
4. When ready, `git push origin main`. This will trigger `deploy-production.yml` on its first run.

---

## Self-Review Notes

**Spec coverage (all sections mapped):**

- §3.1 environments → Tasks 4, 5, 8, 9, 10.
- §3.2 container → Task 3.
- §3.3 nginx → Task 1.
- §3.4 env vars → Task 3 ARGs, Task 4/5 compose args, Task 10 env file placement.
- §4.1–4.5 → Tasks 1–5.
- §4.6 → Task 7.
- §4.7 → Task 8.
- §4.8 → Task 9.
- §4.9 playwright.yml unchanged → explicit non-action.
- §6 error handling → encoded in Task 8 and Task 9 scripts.
- §7 GH config + VPS prep → Task 10.
- §8 testing plan → Task 7 + runbook §7.
- §9 rollback → Task 9 script.
- §10 file manifest → all files accounted for.
- §11 assumptions → surfaced as "Out-of-plan operational steps".

**Placeholder scan:** none — all code shown in full, no "TBD", no "similar to Task N".

**Type consistency:** container names (`frontend` prod, `chatblix-frontend-staging` staging), image tag format `frontend:backup-<ts>`, ports (`8080`/`8081`), variable names (`FRONTEND_APP_DIR`/`FRONTEND_STAGING_DIR`/`FRONTEND_PORT`/`STAGING_FRONTEND_PORT`) used consistently across compose/workflows/runbook.
