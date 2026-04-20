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

### 2. Clone the repo twice

```bash
git clone -b main    git@github.com:<owner>/<frontend-repo>.git "$FRONTEND_APP_DIR"
git clone -b staging git@github.com:<owner>/<frontend-repo>.git "$FRONTEND_STAGING_DIR"
```

### 3. Place env files

Production — `$FRONTEND_APP_DIR/.env.production`:
```
VITE_API_URL=https://api.chatblix.com
VITE_API_BASE_URL_TEST=https://api.chatblix.com/api/v1
VITE_SOCKET_URL=wss://api.chatblix.com
VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/<cloud-name>
VITE_NEWSLETTER_MODAL_KEY=<prod-newsletter-key>
```

Staging — `$FRONTEND_STAGING_DIR/.env.staging`:
```
VITE_API_URL=https://staging-api.chatblix.com
VITE_API_BASE_URL_TEST=https://staging-api.chatblix.com/api/v1
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

## Operational notes

### Rollback caveat — `VITE_*` are baked into image layers

Production `deploy-production.yml` snapshots the running container with `docker commit frontend frontend:backup-<ts>` and rolls back by retagging that snapshot. Because Vite bakes `VITE_*` build args into the JS bundle at build time, a rollback restores the **bundled** `VITE_*` values from the time of that build. If you rotate any `VITE_*` between deploys, a rollback to a pre-rotation backup will restore the old values. Risk is low (these are public URLs/keys, not server-side secrets), but worth knowing when investigating "why did the SPA call the old URL after rollback?"

### Container internal port

The image runs `nginxinc/nginx-unprivileged:alpine` which listens on port `8080` inside the container (not 80). The compose files map host `8080`/`8081` → container `8080`. Cloudflared rules target the host ports, so the internal port is invisible to the tunnel — but useful to know when poking at the container directly with `docker exec ... wget http://localhost:8080/`.
