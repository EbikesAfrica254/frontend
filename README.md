# eBikes Africa — Frontend

> pnpm monorepo containing all four frontend applications for the eBikes Africa platform — customer portal, operations dashboard, field agent PWA, and public marketing website.

---

## Overview

This monorepo is the authoritative source for all eBikes Africa frontend applications. It uses a shared package architecture: UI primitives, domain feature packages, and shared utilities live in `packages/` and are consumed by the four Next.js 16 apps in `apps/`. All apps share a single parameterised `Dockerfile`, a unified CI pipeline per app, and a common deployment model via Docker Swarm on AWS EC2.

Secrets are never baked into images. Each authenticated app reads Docker Swarm secrets at startup via Next.js `instrumentation.ts`, which runs once before the server handles any requests. The `web` app is fully public and requires no secrets.

**Owns:**

- Customer-facing portal (`client`) — order placement, tracking, and account management
- Operations dashboard (`ops`) — internal tooling for fleet, workforce, and organisation management
- Field agent PWA (`agents`) — mobile-first app for delivery riders, installable via Add to Home Screen
- Public marketing website (`web`) — public-facing landing pages and content

**Does not own:**

- Business logic — owned by the backend microservices
- Authentication and identity — owned by Keycloak and the IAM service
- File storage — owned by S3; frontends consume presigned URLs only
- Push notifications — owned by the Notifications service

---

## Applications

| App           | Purpose              | Dev port | Production host             |
| ------------- | -------------------- | -------- | --------------------------- |
| `apps/client` | Customer portal      | 3000     | `app.ebikesafrica.co.ke`    |
| `apps/ops`    | Operations dashboard | 3001     | `ops.ebikesafrica.co.ke`    |
| `apps/agents` | Field agent PWA      | 3002     | `agents.ebikesafrica.co.ke` |
| `apps/web`    | Public website       | 3003     | `ebikesafrica.co.ke`        |

## Packages

| Package                           | Purpose                                                      |
| --------------------------------- | ------------------------------------------------------------ |
| `packages/ui`                     | Shared component library — shadcn/ui primitives, Tailwind v4 |
| `packages/shared`                 | Utilities, hooks, types, server helpers                      |
| `packages/features/auth`          | NextAuth v4 configuration and session utilities              |
| `packages/features/iam`           | Identity and access management components                    |
| `packages/features/orders`        | Order domain components and resources                        |
| `packages/features/workforce`     | Workforce and agent domain components                        |
| `packages/features/organizations` | Organisation domain components                               |
| `packages/features/notifications` | SSE notification provider and components                     |
| `packages/features/maker-checker` | Approval workflow components                                 |
| `packages/eslint-config`          | Shared ESLint configuration                                  |
| `packages/typescript-config`      | Shared TypeScript configuration                              |

---

## Platform Context

| Relationship      | Service               | How                                                                               |
| ----------------- | --------------------- | --------------------------------------------------------------------------------- |
| Authenticates via | Keycloak              | OAuth2 / OIDC — all authenticated apps use NextAuth v4 with the Keycloak provider |
| Calls             | IAM service           | User profiles, memberships, roles                                                 |
| Calls             | Orders service        | Order lifecycle                                                                   |
| Calls             | Workforce service     | Agent management                                                                  |
| Calls             | Notifications service | SSE stream for real-time notifications                                            |
| Calls             | Organisations service | Branch and organisation management                                                |
| Calls             | Maker-checker service | Approval requests and outbox                                                      |
| Reads files from  | S3                    | Via presigned URLs — files never transit the frontend server                      |

---

## Tech Stack

| Concern         | Technology                                          |
| --------------- | --------------------------------------------------- |
| Language        | TypeScript 5.9                                      |
| Framework       | Next.js 16 (App Router)                             |
| UI              | React 19, shadcn/ui, Tailwind CSS v4                |
| Auth            | NextAuth v4 (Keycloak provider)                     |
| Package manager | pnpm 10 (workspaces, `node-linker=hoisted`)         |
| Build           | Turbopack (Next.js 16 default)                      |
| Docker output   | Next.js standalone (`output: standalone`)           |
| Observability   | OTLP push to Grafana Cloud via `instrumentation.ts` |

---

## Prerequisites

| Tool    | Version | Notes                            |
| ------- | ------- | -------------------------------- |
| Node.js | 22+     | Use `nvm` or `fnm`               |
| pnpm    | 10.32.1 | `npm install -g pnpm@10.32.1`    |
| Docker  | 20.10+  | Required to build images locally |

---

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment template for the app you want to run
cp apps/client/.env.example apps/client/.env.local
# Edit .env.local — see inline comments for required values

# 3. Run the app
pnpm --filter client dev      # http://localhost:3000
pnpm --filter ops dev         # http://localhost:3001
pnpm --filter agents dev      # http://localhost:3002
pnpm --filter web dev         # http://localhost:3003
```

---

## Lint and Type Check

```bash
# Lint a specific app
pnpm --filter client lint

# Type-check a specific app
pnpm --filter client exec tsc --noEmit

# Run across all apps
pnpm -r lint
pnpm -r exec tsc --noEmit
```

---

## Docker

All four apps share a single parameterised `Dockerfile` at the monorepo root, selected by `APP_NAME` build arg.

```bash
docker build \
  --build-arg APP_NAME=client \
  --build-arg VERSION=dev \
  -t ebikes/client:dev .
```

`node-linker=hoisted` in `.npmrc` is required — it produces a flat `node_modules` without symlinks, which is necessary for the Next.js standalone output to copy correctly in Docker.

---

## Environments & Deployment

| Environment  | Trigger                                | Image tag       |
| ------------ | -------------------------------------- | --------------- |
| `dev`        | Push to `dev` (after quality gate)     | `dev` + `sha-*` |
| `staging`    | Push to `staging` (after quality gate) | `staging`       |
| `production` | Release Please semver tag              | `vX.Y.Z`        |

Images are published to AWS ECR. Each app has its own workflow under `.github/workflows/ci-<app>.yml`. The quality gate runs ESLint, `tsc --noEmit`, and Semgrep on every push and pull request.

Full infrastructure documentation lives in the infrastructure repository.
