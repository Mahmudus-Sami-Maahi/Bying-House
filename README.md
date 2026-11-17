# MetaMax Fashions

Website, admin panel and backend for MetaMax Fashions, a garments buying house in Dhaka, Bangladesh.

| App | Path | Stack |
|---|---|---|
| Website (+ admin UI, later) | [`apps/web`](apps/web/README.md) | Next.js 16, React 19, Tailwind CSS 4 |
| Backend API | [`apps/api`](apps/api/README.md) | NestJS 12, Prisma 7, PostgreSQL 18 |
| Infrastructure | [`infra/`](infra/) | Docker Compose, Nginx (production config arrives in Phase 14) |
| Documentation | [`docs/backend/`](docs/backend/PROGRESS.md) | Audit, architecture, CI/CD design, phase reports |

The two apps are independent: each has its own dependencies, Dockerfile and CI workflow, and they talk only through the documented API.

## Quick start (local)

Requirements: Node.js 26 LTS, Docker Desktop.

```bash
docker compose -f infra/compose/docker-compose.dev.yml up -d   # PostgreSQL

cd apps/api && cp .env.example .env && npm ci && npm run start:dev   # http://localhost:4000/api/docs
cd apps/web && npm ci && npm run dev                                 # http://localhost:3000
```

## CI/CD

GitHub Actions (`.github/workflows/`) checks every pull request and push to `main`: lint, type check, tests and a Docker image build for each app that changed. Publishing to GHCR and deploying to the Hostinger VPS are added in Phase 15. See [`docs/backend/02b-cicd-design.md`](docs/backend/02b-cicd-design.md).

Never commit `.env` files or secrets; only `*.example` files are tracked.
