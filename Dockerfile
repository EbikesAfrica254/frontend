# syntax=docker/dockerfile:1
#
# Monorepo Dockerfile — parameterised by APP_NAME
#
# Build args:
#   APP_NAME — app directory name: client | ops | agents | web
#
# Runtime env (must be set in stack file):
#   SERVER_PORT — 3000 | 3001 | 3002 | 3003
#   HOSTNAME    — 0.0.0.0
#
# Secret injection is handled by each app's src/instrumentation.ts.
# Docker Swarm secrets are mounted at /run/secrets/<name> and read
# at server startup via the Next.js instrumentation register() hook.
# No entrypoint script required.
#
# NOTE: node-linker=hoisted in root ..npmrc is required.
# Without it, pnpm creates symlinks that break standalone output in Docker.

ARG APP_NAME

# -----------------------------------------------------------------------------
# base — pinned Node 22 LTS (Bookworm slim, glibc — Alpine rejected: musl)
# pnpm installed via npm to avoid Corepack npm key rotation incidents
# -----------------------------------------------------------------------------
FROM node:22.22.1-bookworm-slim@sha256:4f77a690f2f8946ab16fe1e791a3ac0667ae1c3575c3e4d0d4589e9ed5bfaf3d AS base

RUN npm install -g pnpm@10.33.0

# -----------------------------------------------------------------------------
# deps — install all workspace dependencies with frozen lockfile
# Copies only manifests + lockfile first for better layer caching
# -----------------------------------------------------------------------------
FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

COPY apps/client/package.json              ./apps/client/package.json
COPY apps/ops/package.json                 ./apps/ops/package.json
COPY apps/agents/package.json              ./apps/agents/package.json
COPY apps/web/package.json                 ./apps/web/package.json

COPY packages/eslint-config/package.json              ./packages/eslint-config/package.json
COPY packages/features/auth/package.json              ./packages/features/auth/package.json
COPY packages/features/iam/package.json               ./packages/features/iam/package.json
COPY packages/features/maker-checker/package.json     ./packages/features/maker-checker/package.json
COPY packages/features/notifications/package.json     ./packages/features/notifications/package.json
COPY packages/features/orders/package.json            ./packages/features/orders/package.json
COPY packages/features/organizations/package.json     ./packages/features/organizations/package.json
COPY packages/features/workflows/package.json         ./packages/features/workflows/package.json
COPY packages/features/workforce/package.json         ./packages/features/workforce/package.json
COPY packages/shared/package.json                     ./packages/shared/package.json
COPY packages/typescript-config/package.json          ./packages/typescript-config/package.json
COPY packages/ui/package.json                         ./packages/ui/package.json

RUN pnpm install --frozen-lockfile

# -----------------------------------------------------------------------------
# builder — copy full source, build the target app
# -----------------------------------------------------------------------------
FROM deps AS builder

ARG APP_NAME

WORKDIR /app

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm --filter "${APP_NAME}" build

# -----------------------------------------------------------------------------
# runner — minimal production image
# Non-root user nextjs:nodejs (uid/gid 1001)
#
# Standalone output is preserved at apps/X/.next/standalone/ so that
# server.js references remain consistent with outputFileTracingRoot.
#
# Static files are placed at the path server.js expects given the
# monorepo outputFileTracingRoot nesting:
#   apps/X/.next/standalone/apps/X/.next/static/
#
# Public dir likewise:
#   apps/X/.next/standalone/apps/X/public/
# -----------------------------------------------------------------------------
FROM base AS runner

ARG APP_NAME
ARG VERSION
ARG BUILD_DATE
ARG VCS_REF

WORKDIR /app

ENV APP_NAME=${APP_NAME}

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

# Standalone output — preserved at apps/X/.next/standalone/
COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/${APP_NAME}/.next/standalone/ ./apps/${APP_NAME}/.next/standalone/

# Static assets — nested path expected by server.js with monorepo outputFileTracingRoot
COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/${APP_NAME}/.next/static/ ./apps/${APP_NAME}/.next/standalone/apps/${APP_NAME}/.next/static/

# Public directory
COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/${APP_NAME}/public/ ./apps/${APP_NAME}/.next/standalone/apps/${APP_NAME}/public/

USER nextjs

ENTRYPOINT ["sh", "-c", "node apps/${APP_NAME}/.next/standalone/apps/${APP_NAME}/server.js"]

LABEL org.opencontainers.image.title="eBikes Africa ${APP_NAME} frontend"
LABEL org.opencontainers.image.description=""
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.source="https://github.com/EbikesAfrica254/frontend"
LABEL org.opencontainers.image.revision="${VCS_REF}"