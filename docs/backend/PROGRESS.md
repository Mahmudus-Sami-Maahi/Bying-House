# Backend Programme — Progress Log

One phase at a time. Each phase starts only after explicit approval.

| # | Phase | Status | Deliverable |
|---|---|---|---|
| 1 | Frontend audit & backend requirements | ✅ Approved 2026-11-17 | [01-frontend-audit.md](01-frontend-audit.md) |
| 2 | Backend architecture & technical design | ✅ Approved 2026-11-17 (recommended options) | [02-architecture.md](02-architecture.md), [02b-cicd-design.md](02b-cicd-design.md) |
| 3 | Production-grade backend foundation | ✅ Delivered 2026-11-17 — awaiting approval; DB tests pending Docker Desktop | [03-foundation.md](03-foundation.md) |
| 4 | Database architecture & implementation | ⏳ Not started | — |
| 5 | Authentication & authorization | ⏳ Not started | — |
| 6 | Independent admin panel | ⏳ Not started | — |
| 7 | Dynamic content management | ⏳ Not started | — |
| 8 | Design flexibility & modular content | ⏳ Not started | — |
| 9 | Media & file management | ⏳ Not started | — |
| 10 | API development & frontend integration | ⏳ Not started | — |
| 11 | Error handling & change resilience | ⏳ Not started | — |
| 12 | Security audit | ⏳ Not started | — |
| 13 | Testing & QA | ⏳ Not started | — |
| 14 | Hostinger VPS infrastructure | ⏳ Not started | — |
| 15 | Production build & deployment | ⏳ Not started | — |
| 16 | Documentation & handover | ⏳ Not started | — |

## Approved technology stack (mandated 2026-11-17)

Next.js (public site + admin UI) · **NestJS** (independent backend API) · PostgreSQL · Prisma · Docker + Docker Compose · Nginx · Hostinger VPS (Ubuntu 24.04 LTS).
Routing: site `example.com`, admin `example.com/admin`, API `api.example.com`, API docs `api.example.com/api/docs`.
CI/CD (mandated 2026-11-17): GitHub (`Mahmudus-Sami-Maahi/Bying-House`, branch `main`) → GitHub Actions → GHCR → Hostinger KVM 4 VPS; images never built on the VPS.
This supersedes the "backend inside Next.js" suggestion in [01-frontend-audit.md §13.2](01-frontend-audit.md#132-preliminary-recommendation-for-phase-2-not-yet-a-decision). No technology changes without approval.

## Decisions taken (Phase 2 approval, 2026-11-17, recommended options)

- Repo restructured into `apps/web` + `apps/api` ✅ done in Phase 3.
- Next.js upgraded to 16.4.6 ✅ done in Phase 3.
- API docs protected in production (off by default; Nginx protection in Phase 14).
- CI/CD: no manual approval gate for now; runtime secrets on the VPS only; a few seconds of downtime per deploy with a maintenance page.
- Phase 1 questions use the defaults in [02-architecture.md §19](02-architecture.md#19-assumptions-made-for-unanswered-questions) until changed.

## Pending decisions

- Off-server backup destination (needed by Phase 14).
- Soft-404 handling for unknown slugs (Phase 10; see [03-foundation.md §3](03-foundation.md#3-build-independence-spike-phase-2-decision-d14--result)).

## Carry-forward items

From Phase 3:
- Run `test/database.e2e-spec.ts` once Docker Desktop is installed (expected 21/21 e2e).
- First push must run CI: Docker image builds and DB tests have not run yet.
- Configure branch protection, secret scanning and the `NEXT_PUBLIC_SITE_URL` variable on GitHub.
- `SiteHeader` must move inside a Suspense boundary when the layout loads data at request time (Phase 7/10).

From Phase 1:

- Inquiries are not stored or sent anywhere (`app/actions.ts → deliverInquiry()` only logs).
- Components that will crash on empty data: `TestimonialCarousel`, `HeroSlideshow`, related/prev-next on `/products/[slug]`.
- Hard-coded counts in headings ("Twelve", "Six", "Nine", "Four", "12").
- `app/global-error.tsx` missing.
