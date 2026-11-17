# Phase 3 — Production-Grade Backend Foundation

| | |
|---|---|
| Phase | 3 of 16 |
| Date | 2026-11-17 |
| Status | Delivered — **database verification pending** (Docker Desktop not yet installed on the dev PC) |
| Design followed | [02-architecture.md](02-architecture.md), [02b-cicd-design.md](02b-cicd-design.md) |

---

## 1. What was built

| Area | Result |
|---|---|
| Security fix | Next.js 16.4.4 → **16.4.6** (+ `eslint-config-next`). The production build now exits 0 (it failed before). `npm audit fix` for a dev-only `minimatch` advisory. Both apps: **0 vulnerabilities**. |
| Repository layout | Website moved to `apps/web` with `git mv` (history kept; all 54 source files byte-identical). New `apps/api`, `infra/`, `.github/`. Root `.gitignore` rewritten for two apps; root `.gitattributes` normalises line endings to LF. |
| NestJS API skeleton | NestJS 12.5 (ESM), TypeScript 6, strict mode, scaffolded with the official CLI and extended (below). |
| Configuration | Every env variable validated by a Zod schema at startup; errors name the variable but never print its value. `.env.example` and `.env.test.example` committed; real `.env` files git-ignored. |
| Database connectivity | Prisma ORM **7.10.1** with the `@prisma/adapter-pg` driver adapter, global `PrismaService`, clean shutdown. Schema has no models yet (Phase 4). |
| Error handling | Global filter: one error shape `{ error: { code, message, details?, requestId } }` for app errors, HTTP errors, malformed JSON (400), oversized bodies (413), validation (422), Prisma errors (409/404/503) and unknown errors (500, generic message, stack logged server-side only). |
| Validation | Zod schemas via Nest's `StandardSchemaValidationPipe`, 422 with one detail per field; schemas also feed OpenAPI. |
| Responses | `{ data }` / `{ data, meta }` envelope; `@RawResponse()` opt-out (used by health checks). |
| Logging | Nest built-in logger: JSON lines in production, readable locally; one line per request with request ID, method, path (no query string), status, duration; sensitive keys redacted (`password`, `token`, `authorization`, `cookie`, `secret`, `email`, `phone`, `message`). |
| Request IDs | `X-Request-Id` accepted if safe (else generated), returned on every response, included in logs and error bodies. |
| Security | Nest built-in security headers (Helmet 8 defaults, `no-referrer`), `X-Powered-By` removed, CORS closed unless origins are configured, `trust proxy` = 1 hop, JSON body limit 512 KB. |
| Routing | `/api/v1/...` (URI versioning); health unversioned at `/api/health/live` and `/api/health/ready`. |
| Health checks | Liveness (process + app version) and readiness (database `SELECT 1` with a 1.5 s timeout). Readiness never exposes driver error text; the cause (e.g. `ECONNREFUSED`) goes to the server log. |
| API docs | Swagger UI `/api/docs`, JSON `/api/docs-json`; on by default outside production, off in production unless `SWAGGER_ENABLED=true`. `npm run openapi:export` writes `apps/api/openapi.json` without a database (deterministic output). |
| Dev database | `infra/compose/docker-compose.dev.yml`: PostgreSQL 18, bound to `127.0.0.1` only, creates `metamax` and `metamax_test`. |
| Docker | `apps/api/Dockerfile` and `apps/web/Dockerfile` (multi-stage, Node 26 alpine, non-root, healthchecks). Web uses Next.js `output: "standalone"`. |
| CI | `.github/workflows/api.yml` and `web.yml`: lint, type check, tests (API e2e against a PostgreSQL 18 service container), OpenAPI drift check, dependency audit, Docker image build (**not pushed** yet). Actions pinned to commit SHAs. Dependabot for npm, Actions and Docker base images. |

---

## 2. Tests executed (actually run, 2026-11-17, Windows 11, Node 26.8.1)

| Check | Result |
|---|---|
| `apps/web`: `npm run lint` | ✅ pass |
| `apps/web`: `npm run build` (incl. TypeScript) | ✅ pass, 30/30 pages |
| `apps/web`: standalone server smoke test (`/`, `/products`, `/products/denim-jeans`, `/contact`, `/robots.txt`, `/sitemap.xml` → 200; unknown path → 404; CSS asset 200; image optimiser 200) | ✅ pass |
| `apps/api`: `npm run lint` (oxlint, type-aware) | ✅ pass, 0 warnings |
| `apps/api`: `npm run typecheck` | ✅ pass |
| `apps/api`: unit tests | ✅ **33 / 33** (env validation 8, exception filter 14, envelope 4, request ID 6, DB error description 3) |
| `apps/api`: e2e `test/foundation.e2e-spec.ts` | ✅ **19 / 19** (health live/ready-down, no error leakage, `/api/v1` routing, envelopes, 404/400/413/422/500 envelopes, request IDs, security headers, CORS allow/deny, Swagger on/off) |
| `apps/api`: e2e `test/database.e2e-spec.ts` | ❌ **2 / 2 fail as expected: no PostgreSQL on this PC.** Runs once Docker Desktop is installed, and in CI. |
| `apps/api`: built server in production mode (live 200, ready 503 with DB down, JSON logs, path logged without query string) | ✅ pass |
| OpenAPI export run twice | ✅ identical output |
| `npm audit --omit=dev` (both apps) | ✅ 0 vulnerabilities |
| YAML syntax (both workflows, Dependabot, Compose) | ✅ valid |
| **Not run locally:** Docker image builds, GitHub Actions workflows | ⏳ No Docker on this PC; they run in GitHub Actions on the first push |

---

## 3. Build-independence spike (Phase 2 decision D14) — result

Temporary routes were added to the website, tested against a mock API, then **deleted** (the website is back to its original files apart from `output: "standalone"`).

| Step | Observed |
|---|---|
| `next build` with the API **offline** | ✅ Build succeeded; routes prerendered as partial (static shell + request-time content) |
| First request | Fetched from API (1 call), showed v1 |
| Repeat requests | Served from cache (still 1 API call) |
| API data changed to v2, no invalidation | Still v1 (cached) |
| `revalidateTag(tag, "max")` | Next request: v1 (stale-while-revalidate); following request: v2 (1 more API call) |
| `revalidateTag(tag, { expire: 0 })` | Next request: fresh (v3) immediately |
| Dynamic slug without `generateStaticParams` | Resolved at request time ✅ |
| API stopped, page already cached | Still served (200) with the last good content |

**Conclusion: D14 works**, with two constraints for Phases 7–10:
1. Client components that read the URL (`usePathname()` in `SiteHeader`) must be inside a `<Suspense>` boundary when a route has no build-time params. This fits the plan: the header loads the menu from the API at request time, so it will sit in Suspense anyway.
2. **Soft 404s:** an unknown slug (e.g. `/products/not-a-category`) renders the 404 page with `noindex`, but with **HTTP 200**, because streaming has already started (documented Next.js behaviour). Search engines will not index it, but monitoring tools see 200. Options for Phase 10: accept it; or check slugs in `proxy.ts` before rendering so a real 404 is returned. **Decision deferred to Phase 10.**

Not covered by the spike: a page whose data was **never cached** while the API is down. That will hit the error boundary; handling is part of Phase 11.

---

## 4. Deviations from the Phase 2 design (and why)

| Phase 2 said | Phase 3 did | Reason |
|---|---|---|
| Node.js 24 LTS | **Node.js 26 LTS** | Node 26 became the Active LTS in October 2026; Node 24 is now in maintenance. Same as the dev PC. |
| class-validator DTOs | **Zod** + Nest's `StandardSchemaValidationPipe` | First-party in NestJS 12; one library for request validation, env config and (Phase 8) section JSON; Swagger reads Zod schemas natively. |
| `nestjs-pino` | **Nest built-in JSON logger** | NestJS 12's logger now provides JSON output, structured params and redaction; one dependency fewer. |
| `helmet` | **`app.useSecurityHeaders()`** | Built into NestJS 12.1+, same defaults as Helmet 8. |
| Jest | **Vitest** (API), oxlint for API linting | NestJS 12 scaffolds Vitest + oxlint by default. The website keeps ESLint. |
| `/health/live`, `/health/ready` | **`/api/health/live`, `/api/health/ready`** | Kept under the `/api` prefix so all API traffic shares one prefix; still unversioned. |
| API fails fast if the DB is down at startup | **API starts; readiness reports `down`** | Avoids restart loops when PostgreSQL starts slower than the API. A malformed `DATABASE_URL` is still rejected at startup. |
| `prisma.config.ts` | **`prisma7.config.ts`** | Name used by Prisma 7.10+. |
| Prisma CLI as a dev tool | **`prisma` is a runtime dependency** of the API image | The production image runs `prisma migrate deploy` as a one-off container (CI/CD design §5.3). |

Also removed, because they were added by tools without being requested:
- `prisma init` downloaded AI-assistant "skill" folders (`.agents/`, `.claude/`, `.windsurf/`, `skills-lock.json`) into `apps/api`. **Deleted.**
- The Nest scaffold included `@nestjs/mau` and a `deploy` script for a paid AWS hosting service. **Removed.**
- The scaffold's `AGENTS.md` told AI tools to connect NestJS Observe, a third-party telemetry SaaS. **Replaced** with a project rule: no third-party telemetry without approval.
- npm 11 blocked two install scripts: Prisma's engine download (not needed; the CLI fetches its engine on first use, and the Dockerfile does this at build time) and `@scarf/scarf` (usage tracking from Swagger UI). **Left blocked.**

---

## 5. Files

**Created**

```
.gitattributes
.github/workflows/api.yml, .github/workflows/web.yml, .github/dependabot.yml
README.md                                   (new root README)
infra/compose/docker-compose.dev.yml
infra/compose/dev/postgres-init/10-create-test-database.sql
apps/web/Dockerfile, apps/web/.dockerignore
apps/api/  (NestJS app)
  Dockerfile, .dockerignore, .env.example, .env.test.example, .oxlintrc.json, openapi.json,
  package.json, package-lock.json, nest-cli.json, tsconfig*.json, vitest.config*.ts, prisma7.config.ts,
  prisma/schema.prisma, README.md, AGENTS.md (edited)
  src/main.ts, src/app.module.ts
  src/bootstrap/{configure-app,openapi}.ts
  src/config/{env.schema,validate-env,load-env}.ts (+ env.schema.spec.ts)
  src/common/{request-context}.ts
  src/common/errors/{app-error,error-response}.ts
  src/common/filters/all-exceptions.filter.ts (+ spec)
  src/common/interceptors/response-envelope.interceptor.ts (+ spec)
  src/common/middleware/{request-id,request-logger}.middleware.ts (+ request-id spec)
  src/common/pipes/create-validation-pipe.ts
  src/common/logger/create-logger.ts
  src/infrastructure/prisma/{prisma.module,prisma.service}.ts (+ describe-db-error.spec.ts)
  src/modules/health/{health.module,health.controller,database.health}.ts
  src/scripts/{export-openapi,export-openapi.env}.ts
  test/{setup-env,foundation.e2e-spec,database.e2e-spec}.ts, test/utils/{create-test-app,probe.module}.ts
docs/backend/03-foundation.md
```

**Moved** (unchanged content): all website files from the repo root to `apps/web/`.

**Modified**

| File | Change |
|---|---|
| `.gitignore` | Rewritten for two apps; ignores all `.env*` except `*.example`, keys, build output, generated Prisma client |
| `apps/web/package.json`, `package-lock.json` | Next.js 16.4.6, eslint-config-next 16.4.6, name `metamax-web`, audit fix |
| `apps/web/next.config.ts` | `output: "standalone"` (one line) |
| `docs/backend/PROGRESS.md`, `02-architecture.md` | Status and amendments |

**Database changes:** none (no models yet). **API changes:** health endpoints and docs only.

---

## 6. Actions for you

1. **Install Docker Desktop**, then run the database tests:
   ```bash
   docker compose -f infra/compose/docker-compose.dev.yml up -d
   ```
   ```bash
   cd apps/api && npm run test:e2e
   ```
   Expected: 21/21. I can run this for you once Docker is installed.
2. **Restart the website dev server from its new folder.** I stopped the one that was running from the repo root (with your permission):
   ```bash
   cd apps/web && npm run dev
   ```
3. **GitHub settings** (repository → Settings), after the first push so the check names exist:
   - Branches → add a protection rule for `main`: require a pull request, require status checks `api / checks` and `web / checks`, block force pushes.
   - Code security → enable secret scanning and push protection.
   - Variables → add `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.metamaxfashions.com`).
4. **Nothing is committed or pushed yet.** The work is in your working tree on `main`. I recommend committing it on a branch (e.g. `phase-3-foundation`) and opening a pull request, so CI runs the Docker builds and database tests for the first time.

---

## 7. Known limitations

- Database connectivity has been tested only against an unreachable database (503 path). The happy path (`SELECT 1` → 200) runs in CI and after Docker is installed.
- The Docker images have not been built yet (no Docker locally); the first CI run will build them.
- No rate limiting yet (Phase 5, with auth, and Phase 10, for the inquiry endpoint).
- The website still uses static data; integration starts in Phase 7.

## 8. Recommended next phase

**Phase 4 — Database architecture and implementation:** full Prisma schema (§6 of the architecture), first migration, reference seed, content-import script from today's `lib/*.ts`, constraint and index review. It needs a running PostgreSQL, so Docker Desktop should be installed first.
