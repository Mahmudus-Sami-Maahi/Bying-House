# MetaMax Fashions — API

NestJS 12 backend for the MetaMax Fashions website and admin panel.
Stack: Node.js 26 LTS · NestJS 12 (ESM) · Prisma ORM 7.10 · PostgreSQL 18 · Zod · Vitest.

Architecture and decisions: [`docs/backend/`](../../docs/backend/PROGRESS.md).

## Local development

Requirements: Node.js 26, Docker Desktop (for PostgreSQL).

```bash
# from the repository root: start PostgreSQL (localhost:5432, databases metamax + metamax_test)
docker compose -f infra/compose/docker-compose.dev.yml up -d

cd apps/api
cp .env.example .env            # local settings
cp .env.test.example .env.test  # e2e test settings
npm ci
npm run start:dev               # http://localhost:4000/api/docs
```

## Scripts

| Command | What it does |
|---|---|
| `npm run start:dev` | Run with reload |
| `npm run build` | Generate Prisma Client and compile to `dist/` |
| `npm run start:prod` | Run the compiled app |
| `npm run lint` | oxlint (type-aware) |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests |
| `npm run test:e2e` | End-to-end tests (needs PostgreSQL for `test/database.e2e-spec.ts`) |
| `npm run openapi:export` | Write `openapi.json` (commit it; CI checks it is current) |
| `npm run db:migrate:dev` | Create/apply a migration locally |
| `npm run db:migrate:deploy` | Apply committed migrations (production uses this, via the deploy script) |

## Endpoints so far

| Path | Purpose |
|---|---|
| `GET /api/health/live` | Liveness (process up, app version) |
| `GET /api/health/ready` | Readiness (database reachable) |
| `GET /api/docs` · `/api/docs-json` | Swagger UI · OpenAPI JSON (off by default in production) |

Feature endpoints live under `/api/v1/public/*` and `/api/v1/admin/*` from Phase 4 onward.

## Conventions

- Success: `{ "data": ... }` (lists: `{ "data": [...], "meta": {...} }`).
- Error: `{ "error": { "code", "message", "details"?, "requestId" } }`.
- Every response carries `X-Request-Id`; log lines include it.
- Environment variables are validated at startup (`src/config/env.schema.ts`); see `.env.example`.
