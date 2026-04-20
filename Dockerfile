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
ARG VITE_API_BASE_URL_TEST
ARG VITE_SOCKET_URL
ARG VITE_CLOUDINARY_BASE_URL
ARG VITE_NEWSLETTER_MODAL_KEY
ENV VITE_API_URL=$VITE_API_URL \
    VITE_API_BASE_URL_TEST=$VITE_API_BASE_URL_TEST \
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
