# Phase 1 — Frontend Audit & Backend Requirements

| | |
|---|---|
| Project | MetaMax Fashions website (garments buying house, Dhaka) |
| Phase | 1 of 16 — Frontend audit (no code changes) |
| Date | 2026-11-17 |
| Commit audited | `c650044` on `main` |
| Status | Awaiting approval |

This document records what the existing Next.js frontend actually does, what content it holds, and what the backend must provide. Everything below comes from reading the source. Anything that is a guess about your business is listed under [§12 Open questions](#12-open-questions-for-you) rather than assumed.

---

## 1. Executive summary

- The site is a **marketing and lead-generation website** for a B2B buying house. It is not a shop: there are no prices, carts, user accounts, or orders.
- **All content is hard-coded** in TypeScript files (`lib/site.ts`, `lib/content.ts`, `lib/catalog.ts`, `lib/images.ts`) plus about 25 inline arrays and many headings written directly in page files.
- **The only backend behaviour today** is the inquiry form's Server Action (`app/actions.ts`). It validates input and blocks one kind of spam, then **only writes a log line**. Every inquiry submitted today is lost.
- **There is no admin area, authentication, database, API route, middleware/proxy, environment file, Docker setup, test suite, or `public/` folder.**
- **All images are Unsplash photo IDs** passed through a `photo(id)` helper. Image components accept an Unsplash ID, not a URL. This is the biggest coupling problem for media management.
- **The code is clean and well structured**: strict TypeScript, accessible markup, shared section components, and validation separated from the action. Most of it can stay. The backend work is mainly about where data comes from, not about redesigning pages.

Baseline checks run during this audit (no files changed):

| Check | Result |
|---|---|
| `npm run lint` | ✅ Passed, no warnings |
| `next build`: compile, TypeScript, prerender | ✅ Compiled, type-checked, 30/30 pages generated |
| `next build`: exit status | ❌ **Exited with code 1** after generating pages, with `SecurityFatalError: Your version of Next.js is affected by a known security vulnerability` |
| `npm audit --omit=dev` | ⚠️ 1 moderate: next 16.3.0–16.4.4, [GHSA-mfr8-8qww-v76h](https://github.com/advisories/GHSA-mfr8-8qww-v76h) (information disclosure via `'use cache'` + `unstable_cache`). Fixed in **16.4.6**. `package.json` pins `"next": "16.4.4"` exactly. |

> **Action needed before Phase 3:** upgrade `next` and `eslint-config-next` to 16.4.6 or later. A production build currently fails, so this blocks deployment. I did not upgrade anything in Phase 1, as instructed.

---

## 2. Existing frontend architecture

### 2.1 Stack

| Layer | Technology |
|---|---|
| Framework | Next.js **16.4.4**, App Router, `cacheComponents: true`, `partialPrefetching: true` |
| UI | React 19.3, TypeScript 5 (strict), Tailwind CSS v4 (via `@tailwindcss/turbopack`) |
| Animation | framer-motion 14 |
| Icons | lucide-react |
| Fonts | `next/font/google`: Geist (sans), Cormorant Garamond (display) |
| Lint | ESLint 9 + `eslint-config-next` |
| Tests | **None** |
| State management | None beyond local `useState` and URL query params |

### 2.2 Directory structure

```
app/                         routes + metadata files
  layout.tsx                 root layout: header, footer, WhatsApp button, intro loader, Organization JSON-LD
  template.tsx               page-entrance CSS animation
  error.tsx                  route error boundary (uses Next 16 `retry()`)
  not-found.tsx              404 page
  actions.ts                 "use server" → submitInquiry()
  page.tsx                   home
  about/ managing-director/ services/ products/ products/[slug]/
  custom-design/ manufacturing/ sustainability/ partnerships/ contact/
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg globals.css
components/
  brand/logo.tsx             SVG monogram + wordmark
  collections/               category-card, collections-explorer (client: filter + search)
  forms/                     inquiry-form (client), fields (Field, Honeypot, FormMessage, FormSuccess)
  home/design-showcase.tsx   client, interactive stages (data inline)
  layout/                    site-header (client), site-footer, whatsapp-button
  motion/                    reveal, animated-heading, counter, parallax-image, hero-slideshow,
                             testimonials (carousel), intro-loader
  sections/                  blocks (SectionHeading, FeatureGrid, StatsBand, Marquee, InquiryCta, Split), page-hero
  json-ld.tsx                safe JSON-LD script renderer
  ui.ts                      shared Tailwind class recipes (button(), eyebrow, display sizes…)
lib/
  site.ts                    company identity, contacts, address, MD profile, helpers (photo(), whatsappUrl(), absoluteUrl())
  content.ts                 nav, stats, pillars, services, process, standards, markets, testimonials,
                             values, whyUs, customDesign, manufacturing, qualitySteps, sustainability,
                             partnership, mdMessage
  catalog.ts                 12 product categories with styles; getCategory(), allStyles
  images.ts                  ~75 named Unsplash photo IDs
  inquiry.ts                 inquiry types + labels
  validation.ts              dependency-free form validator + honeypot check
  seo.ts                     pageMetadata(), organizationJsonLd(), breadcrumbJsonLd()
```

### 2.3 Rendering model

- Every page is a **Server Component** that imports static data directly. The build output shows all routes as static (○) with a 1-day revalidate / 1-week expire profile (the Cache Components default). `/products/[slug]` is partially prerendered (◐).
- Client components: `SiteHeader`, `InquiryForm`, `CollectionsExplorer`, `DesignShowcase`, `TestimonialCarousel`, `HeroSlideshow`, `ParallaxImage`, `Reveal/Stagger`, `Counter`, `AnimatedHeading`.
- `useSearchParams()` is used in `InquiryForm` (preselect `?type=` / `?category=`) and `CollectionsExplorer` (`?category=` filter). Both are wrapped in `<Suspense>`, as Cache Components requires.
- The footer's `CopyrightYear` uses `"use cache"` + `cacheLife("days")`. This is the only explicit cache usage.

### 2.4 Configuration and environment

| Item | Current state |
|---|---|
| Environment variables | Only `NEXT_PUBLIC_SITE_URL` (with a hard-coded fallback). No `.env.example`. `.env*` is git-ignored ✅ |
| `next.config.ts` | Security headers: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy`. **No CSP, no HSTS.** `poweredByHeader: false`. Image `remotePatterns` allows only `images.unsplash.com`. `experimental.agentFeedback: true` only affects `next dev`. |
| `output` | Not set. Docker images will need `output: "standalone"` (Phase 14). |
| `public/` | **Does not exist.** README asks for an MD portrait in `/public`. |
| Middleware/proxy | None (`proxy.ts` is the Next 16 name). |
| `global-error.tsx` | **Missing.** `app/error.tsx` cannot catch errors thrown in the root layout. |
| `loading.tsx` | None. Not needed while data is static; needed once data comes from a database. |

---

## 3. Pages and features

### 3.1 Routes

| Route | Type | Purpose | Data sources |
|---|---|---|---|
| `/` | Static | Home: hero slideshow, commitments marquee, overview, 10 featured categories, design showcase, capabilities, quality steps + standards, sustainability (3), stats + markets, factory gallery, testimonials, CTA | catalog, content (manufacturing, markets, pillars, qualitySteps, standards, sustainability, testimonials, values, stats), images, inline `heroSlides` + factory tiles |
| `/about` | Static | Story, timeline, mission/vision, values, philosophy, why us, stats | content (mdMessage.vision, values, whyUs, stats), inline `milestones`, `philosophy`, mission text |
| `/managing-director` | Static | MD profile, message, vision, philosophy, contact buttons, Person JSON-LD | site.md, content.mdMessage |
| `/services` | Static | 11 services with anchor nav, 6-step process, Service JSON-LD | content.services, content.process |
| `/products` | Static + client island | Filterable/searchable style gallery (≈40 styles), all categories, ItemList JSON-LD | catalog |
| `/products/[slug]` | 12 prerendered (`generateStaticParams`) | Category page: key facts (MOQ, lead time, sizes), styles, fabrics/finishes, gallery, prev/next, related, CollectionPage JSON-LD | catalog |
| `/custom-design` | Static | Studio, 9 capabilities, colour palette, tech-pack checklist, private label | content.customDesign, inline `techPack`, `palette`, proto stats |
| `/manufacturing` | Static | Capacity counters, capabilities, factory network, process, 6 QA steps, standards, ethics | content (manufacturing, process, qualitySteps, standards), inline `capacity`, `network`, `ethics` |
| `/sustainability` | Static | Approach, 5 pillars with images, fabric marquee, commitments | content.sustainability, inline `fabrics`, `commitments` |
| `/partnerships` | Static | Markets marquee, 5 partnership reasons, regions, 4 models, stats, testimonials | content (markets, partnership, testimonials, stats), inline `regions`, `models` |
| `/contact` | Static + client form | Inquiry form, head-office details, MD contact, Google Maps iframe | site, catalog (category options) |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, `/icon.svg` | Metadata routes | SEO | Sitemap page list is **hard-coded**; categories are added from catalog |
| 404, error boundary | Special | | Static copy |

There are **no admin routes** and no admin login anywhere ✅. This matches the requirement that the public site must not expose admin login.

### 3.2 Interactive features

| Feature | Location | Behaviour | Backend need |
|---|---|---|---|
| Inquiry form (4 types: quotation, sample, partnership, general) | `/contact`; deep-linked from ~20 CTAs as `/contact?type=…&category=…` | Server Action, server-side validation, honeypot, keeps values on error, success screen | **Yes**: persist, notify, rate-limit, admin inbox |
| Collection filter + search | `/products` | Client-side filter of all styles; category kept in URL | Data only. Fine at the current ~40 styles; would need server pagination at a few hundred. |
| Hero slideshow, testimonial carousel, design showcase, counters, parallax, marquee | Various | Pure UI | Data only |
| Mobile menu, Company dropdown | Header | Pure UI | Navigation data |
| WhatsApp links / floating button | Everywhere | `wa.me` links with prefilled text | Settings data |
| Google Maps embed | `/contact` | iframe from a **separately hard-coded** address string (`mapsQuery`) | Settings data |
| Intro loader | Root layout | Once per session (`sessionStorage`) | None |

There is **no pagination, no server-side search, no login, no user accounts, no file upload, and no newsletter**.

### 3.3 SEO

- Per-page `metadata` via `pageMetadata()`: title, description, canonical, Open Graph, Twitter. OG images are Unsplash URLs.
- `generateMetadata` on category pages.
- JSON-LD: Organization (layout), BreadcrumbList (every inner page), Person (MD), ItemList of Services, ItemList + CollectionPage of Products.
- A global generated OG image, with **hard-coded brand text**.
- Root `keywords` array, hard-coded.

---

## 4. Static content that should become dynamic

Rating: **High** = will change and the business will want to edit it. **Medium** = changes occasionally. **Low** = changes rarely; could stay in code.

### 4.1 Global / site-wide

| Content | Current location | Priority |
|---|---|---|
| Company name, short/legal name, tagline, description | `lib/site.ts` | High |
| Emails (primary, alternate), phones, WhatsApp number, office hours | `lib/site.ts` | High |
| Address (lines, city, postcode, country) **and** separately hard-coded `mapsQuery` | `lib/site.ts` | High (also fix the duplication) |
| Default WhatsApp message text | `lib/site.ts` `whatsappUrl()` default | Medium |
| Header navigation (incl. Company dropdown with descriptions) | `lib/content.ts` `nav` | Medium |
| Footer "Company" and "Expertise" link lists (**duplicate** the nav) | `site-footer.tsx` inline | Medium |
| Footer headline and tagline line | `site-footer.tsx` inline | Low |
| Default SEO title, keywords, OG copy | `app/layout.tsx` | Medium |
| Generated OG image text | `app/opengraph-image.tsx` | Low |
| Intro loader brand text ("MetaMax Fashions" literal) | `intro-loader.tsx` | Low |
| Logo | SVG in code (`logo.tsx`, `icon.svg`); README says an official logo is still to come | Medium (as a media setting) |
| Social media links | **None exist today** | n/a (ask) |

### 4.2 Shared collections (used on more than one page)

| Collection | Count | Used on | Priority |
|---|---|---|---|
| Stats (value, suffix, decimals, label, detail) | 4 | Home, About, Partnerships (`StatsBand`) | High (README says placeholders) |
| Testimonials (quote, name/role, company) | 4 | Home, Partnerships | High (placeholders) |
| Standards / certifications (name, note) | 8 | Home, Manufacturing | High (placeholders) |
| Export markets | 14 | Home, Partnerships | Medium |
| Services (slug, icon, title, body, points[]) | 11 | Services | High |
| Process steps | 6 | Services, Manufacturing | Medium |
| Quality steps | 6 | Home (first 5), Manufacturing | Medium |
| Manufacturing capabilities (icon, title, body) | 6 | Home, Manufacturing | Medium |
| Sustainability pillars (icon, title, body, image) | 5 | Home (first 3), Sustainability | Medium |
| Values | 4 | Home, About | Low |
| Commitment pillars (marquee) | 7 | Home | Low |

### 4.3 Product catalog

| Entity | Fields | Count |
|---|---|---|
| Category | slug, name, short, tagline, description, cover image, gallery (4 images), fabrics[], finishes[], moq, leadTime, sizes, SEO title/description (derived today) | 12 |
| Style | name, image, fabric, detail (**no ID or slug**) | ≈40 |

Priority: **High**. This is the content the business is most likely to grow.

### 4.4 Page-specific content (inline in page files)

| Page | Inline content |
|---|---|
| Home | Hero eyebrow, headline, intro, CTAs; 4 hero slides; overview copy; "12" badge; section headings/kickers/descriptions (~10 sections); 5 factory gallery tiles; testimonial intro |
| About | Hero; story copy; 4 milestones; mission text; 3 philosophy statements; section headings |
| Managing Director | Name, nickname, title, email, **portrait (null)**; message headline + 4 paragraphs; 4 philosophy items; vision; intro paragraph |
| Services | Hero; process intro |
| Products | Hero ("Twelve categories…"), section headings |
| Custom design | 9 capabilities (`content.customDesign`); 3 proto stats; 6-colour palette; 6 tech-pack items; private-label copy; 3 images |
| Manufacturing | 4 capacity counters; 4 factory-network regions; 4 ethics items; headings |
| Sustainability | Approach copy; 9 fabrics; 4 commitments |
| Partnerships | 5 partnership reasons; 4 regions; 4 partnership models |
| Contact | Hero; form intro; MD contact card copy |
| Home design showcase | 4 development stages (title, body, image, alt) **inside a client component** |
| Every page | `InquiryCta` title/description/image; PageHero eyebrow/title/accent/description/image; SEO title/description/OG image |

### 4.5 Content that can reasonably stay in code

- Inquiry types (`quotation | sample | partnership | general`) and their validation rules. These are business logic and the form branches on them. Labels and prompts could become editable later if wanted.
- Design tokens, fonts, animation timings, class recipes (`globals.css`, `ui.ts`).
- Structural JSON-LD shapes (the data inside them becomes dynamic).
- Accessibility text such as "Skip to content" and "opens in a new tab".
- 404 and error page copy (Low; can be made editable later).

---

## 5. Required database entities (preliminary)

This is the **requirements-level** model. Exact columns, types, indexes, and the choice between a table and a JSON section are Phase 2/4 decisions.

**Guiding rule:** data that is reused across pages, or has its own URL, becomes a real table. Lists that appear on only one page and only serve that page's layout become typed, validated JSON inside a page section. Without this rule we would end up with about 25 tiny tables, one per inline array, all tightly coupled to today's design.

| Entity | Why it is needed | Key relations |
|---|---|---|
| **AdminUser** | Admin login | → Role |
| **Role / Permission** | RBAC (see §7) | AdminUser ↔ Role |
| **Session** | Server-side sessions, revocable | → AdminUser |
| **LoginAttempt** (or rate-limit store) | Brute-force protection | — |
| **PasswordResetToken** | Only if self-service reset is wanted (ask) | → AdminUser |
| **AuditLog** | Who changed what, when | → AdminUser |
| **SiteSettings** (singleton) | Identity, contacts, address, hours, WhatsApp, default SEO, logo | → MediaAsset |
| **NavigationMenu / NavigationItem** | Header, footer "Company", footer "Expertise" | self-referencing parent (dropdown) |
| **Page** | One row per public page: slug, SEO title/description, OG image, status | → MediaAsset; 1→N PageSection |
| **PageSection** | Ordered, toggleable sections; `type` + validated `data` JSON (hero, heading, feature list, timeline, CTA, etc.) | → Page; may reference MediaAsset or shared collections |
| **ProductCategory** | 12 categories, `/products/[slug]` | → MediaAsset (cover, gallery); 1→N ProductStyle |
| **ProductStyle** | ≈40 styles in the gallery | → ProductCategory, → MediaAsset |
| **Service** | 11 services | — |
| **Testimonial** | Shared on 2 pages | — |
| **Stat** | Shared on 3 pages + manufacturing capacity (needs a `group`) | — |
| **Certification** | Shared on 2 pages | optional → MediaAsset (logo) |
| **Market** | Shared on 2 pages | — |
| **ProcessStep, QualityStep** | Each shared on 2 pages | — |
| **TeamMember / Leader profile** | MD page today (only one person). Could be a table or Page sections; decide in Phase 2 | → MediaAsset (portrait) |
| **MediaAsset** | Uploaded images: storage key, MIME type, size, dimensions, alt text, uploader | → AdminUser |
| **Inquiry** | Every form submission: type, name, company, email, phone, country, category (FK + snapshot), quantity, message, consent timestamp, status, source page, technical metadata | → ProductCategory (nullable) |
| **InquiryNote / status history** | Only if a follow-up workflow is wanted (ask) | → Inquiry, → AdminUser |

**Icons:** content items store an icon reference such as `Factory` or `Leaf`, rendered as a Lucide component. The database must store an **icon key string**, and the frontend needs an allow-listed icon registry. Lucide components cannot be stored.

**Not needed (no evidence in the frontend):** blog posts, portfolio projects, public user accounts, orders, prices, comments, multi-language content. I will not add these unless you ask.

---

## 6. Required API surface (preliminary)

The final style (REST `/api/v1` Route Handlers vs Server Actions vs both) is decided in Phase 2. Listed here as capabilities.

### 6.1 Public (no authentication)

| Capability | Notes |
|---|---|
| Submit inquiry | Replaces the logging-only `deliverInquiry()`. Needs validation (exists), honeypot (exists), **rate limiting**, persistence, notification email. |
| Read site settings, navigation | Used by the root layout on every page |
| Read page + visible sections by slug | One call per page |
| List product categories / get one by slug / list styles (filter by category) | Feeds `/products`, `/products/[slug]`, the sitemap, the contact form's category options |
| List services, testimonials, stats, certifications, markets, process/quality steps | Shared collections |
| Serve media files | Uploaded images from persistent storage |
| Health check | For Docker/Nginx |

Most public reads can be called **directly from Server Components through a service layer** without going over HTTP. A public REST read API is only needed if another client (mobile app, separate frontend) will consume it (ask).

### 6.2 Admin (authenticated + authorised)

| Area | Operations |
|---|---|
| Auth | login, logout, current session, change password, (password reset — ask) |
| Admin users & roles | list, create, update, deactivate, assign role |
| Site settings | get, update |
| Navigation | CRUD items, reorder |
| Pages & sections | list pages, update SEO, CRUD sections, reorder, toggle visibility, draft/publish |
| Product categories & styles | CRUD, reorder, publish/unpublish, manage gallery |
| Services, testimonials, stats, certifications, markets, steps | CRUD, reorder, publish/unpublish |
| Media | upload, list/search, update alt text, delete (block deletion while in use) |
| Inquiries | list with filter/sort/pagination, view, update status, add note, export CSV (ask), delete (GDPR request) |
| Audit log | list, filter |

Every admin write must also **invalidate the matching Next.js cache tag** (see §9.4) so the public site updates without a rebuild.

---

## 7. Authentication and authorization

- **Current state:** nothing exists.
- **Required:** admin-only authentication. The public site has no login and should not get one.
- **Suggested roles**, to be confirmed with you:
  - **Owner/Super admin**: everything, including admin users and settings
  - **Editor**: content, catalog, media; no users, no settings
  - **Sales/Inquiry handler**: read/update inquiries only. This matters because inquiries contain buyers' personal data, and not every editor needs to see it.
- **Must-haves** (from your brief, nothing in the frontend conflicts): hashed passwords (Argon2id or bcrypt), HTTP-only `Secure` `SameSite` cookies, server-side session store with expiry and revocation, login rate limiting + lockout, CSRF protection appropriate to the chosen design, checks enforced in the data/service layer (not only in a proxy or layout).
- **Next 16 note:** Server Actions are reachable by direct POST, so **every admin Server Action must verify the session itself**. The docs also have a dedicated guide on authentication with Cache Components. Session-dependent data must never go into a shared `"use cache"` scope.

---

## 8. Media management requirements

### 8.1 Current state

- Around 75 named Unsplash IDs in `lib/images.ts`, used through `photo(id, width)` → `https://images.unsplash.com/photo-{id}?…`.
- **11 files** call `photo()` or pass an Unsplash ID into an image component: `ParallaxImage`, `CategoryCard`, `HeroSlideshow`, `CollectionsExplorer`, `DesignShowcase`, `PageHero` (via ParallaxImage), `InquiryCta`, `Split`, home, custom-design, sustainability, products/[slug], and `lib/seo.ts` for OG images.
- Image props are named `id` or `image` and hold a **photo ID, not a URL**.
- `next/image` is only allowed to load from `images.unsplash.com`.
- The MD portrait expects a file in `/public`, which does not exist.

### 8.2 Requirements

- Admin upload of images (JPEG/PNG/WebP/AVIF; SVG only if sanitised or for the logo, see open questions). Validation by real file signature, not just extension; size limits; random storage names.
- Metadata in `MediaAsset`: dimensions (needed by `next/image`), alt text (accessibility; the site already writes good alt text), MIME type, size.
- Files on a **persistent Docker volume**, served through Nginx or a Next route, behind a storage interface that can later point at S3-compatible storage.
- A frontend change: image components must accept a **resolved image object or URL** instead of an Unsplash ID, and `photo()` becomes a resolver that handles both, so existing Unsplash content keeps working during migration.
- `next.config.ts` `images` must allow the self-hosted media path (and keep Unsplash until migration ends).
- Documents/attachments: **none in the frontend today.** But the copy repeatedly asks buyers to "share your tech pack", and the form cannot accept a file (see §11).

---

## 9. Potential architectural problems

### 9.1 Coupling that blocks a CMS

1. **Images are Unsplash IDs, not URLs** (§8). Every image component needs a small prop-type change.
2. **Icons are component references** inside data (`lib/content.ts`). They need an icon-key registry.
3. **Client components import static data directly.** `SiteHeader` imports `nav` and `site`; `DesignShowcase` defines its data inside the component. Database data cannot be imported into a client component, so the server layout must fetch it and pass it as props.
4. **The root layout is shared by everything.** `app/layout.tsx` renders the public header, footer, WhatsApp button, intro loader, and Organization JSON-LD around every route. An independent admin UI needs its **own root layout**, which means moving public pages into a route group such as `app/(site)/…` and adding `app/(admin)/…`. This is a file move, not a redesign, but it touches every page path on disk.
5. **Section order and visibility are fixed in JSX.** Each page is a hand-composed list of sections. Reordering or hiding sections from the admin needs a section renderer (a registry of section types → existing components). The existing components (`PageHero`, `SectionHeading`, `FeatureGrid`, `Split`, `StatsBand`, `InquiryCta`, `Marquee`) already make good section types.

### 9.2 Content consistency bugs that dynamic data would expose

6. **Hard-coded counts in headings** become wrong as soon as an admin adds or removes items:
   - Home badge "**12** apparel categories"
   - `/products` "**Twelve** categories"
   - About "**Six** reasons buyers stay"
   - Custom design "**Nine** ways"
   - MD "**Four** principles"
   - Manufacturing "**Six** checkpoints"
7. **Duplicated facts:**
   - "40+ partner factories" appears in both `stats` and the manufacturing `capacity` array.
   - Footer links duplicate the header nav.
   - `mapsQuery` duplicates the address.
   - The sitemap page list is separate from the routes.
   - Brand name is hard-coded in the OG image and the intro loader.
   - About reuses `mdMessage.vision` as the company vision.

### 9.3 Components that crash or misbehave on empty or unusual data

Today the data is never empty, so these are harmless. Once an admin can delete items, they become real risks.

| Component | Failure |
|---|---|
| `TestimonialCarousel` | `items[index]` is undefined when the list is empty → `t.quote` throws; also `% items.length` = `NaN` |
| `HeroSlideshow` | `slides[index].id` throws when there are no slides |
| `products/[slug]` prev/next/related | Fewer than 4 categories → duplicate "related" cards and duplicate React keys; 1 category → links to itself |
| Home featured grid | Assumes exactly 10 categories to fill the 3 × 4 layout (`wide(i)` at index 0 and 7) |
| React keys | Built from titles or text (`key={title}`, `key={p.slice(0, 20)}`, `${category}-${name}`). Duplicate titles from admins → key collisions. Database IDs fix this. |
| `CategoryCard` | `moq.replace(" per style", "")` assumes a text format; empty `gallery` → `InquiryCta image={c.gallery[0]}` gets `undefined` |
| Root layout | With settings or nav loaded from the database, a DB failure in the layout is **not** caught by `app/error.tsx`; needs `app/global-error.tsx` and a safe fallback |

### 9.4 Next.js 16 / Cache Components implications

- With `cacheComponents: true`, database reads must go inside `"use cache"` functions tagged with `cacheTag(...)`. Admin writes then call `updateTag()` (inside Server Actions) or `revalidateTag()` (inside Route Handlers). Without this, either pages go fully dynamic (a DB hit on every request) or admin edits do not show up for up to a day (the current default profile).
- **`generateStaticParams` must return at least one param** under Cache Components (an empty array is a build error). If category slugs come from the database, then **either the database must be reachable during `next build`** (inside `docker build`) **or** a different strategy is needed. This is an important Phase 2 / Phase 14 decision for the Hostinger Docker pipeline.
- The default Next cache is in-memory + local disk. That is fine for **one container on one VPS**, but the cache directory should be on a volume or accepted as ephemeral. Multiple instances would need a shared cache handler. Not needed now.

### 9.5 Security and operations

- **Inquiry endpoint has no rate limiting.** The honeypot only stops naive bots. Server Actions are public POST endpoints.
- No CSP and no HSTS. HSTS can be set at Nginx. A CSP must allow the Google Maps iframe and, during migration, Unsplash.
- No `output: "standalone"`. Docker images would carry the full `node_modules`.
- Next.js has a known vulnerability, and the production build currently exits with an error (§1).
- No `.env.example`, no config validation at startup.
- No tests or test tooling of any kind.
- `error.tsx` logs to the browser console only. There is no server-side error logging.

---

## 10. What the current inquiry flow does (detail)

`components/forms/inquiry-form.tsx` → `app/actions.ts submitInquiry()`:

1. Honeypot `company_website` filled → returns a fake success (correct behaviour).
2. Validates: `inquiryType` ∈ 4 types; `name` 2–80; `company` 2–120; `email` (regex, ≤120); `phone` optional (regex); `country` ≤60; `category` optional ∈ catalog slugs; `quantity` ≤60 free text; `message` 15–3000; `consent` required.
3. On error, returns field errors + echoed values (the form keeps its input ✅).
4. On success, calls `deliverInquiry()`, which **only `console.info`s the type, category, and country**. Then it returns a personalised message promising a reply to the submitted email "within one business day".

**Gap:** nothing is stored or sent. The success message makes a promise the system cannot keep today. This is the **highest-value, lowest-risk backend feature** and is independent of the CMS.

---

## 11. Missing functionality (implied by the site but not built)

Grouped by how strongly the current frontend implies each one. None will be built without your confirmation.

| Item | Evidence | Strength |
|---|---|---|
| Store inquiries + notify the team | `deliverInquiry()` comment, README "Before launch", success message promises a reply | **Strong** |
| Admin inbox for inquiries | Follows from the above | **Strong** |
| Rate limiting on the form | Public endpoint, only a honeypot | **Strong** (security) |
| Privacy policy page | Consent checkbox says MetaMax "may store and use these details", with no policy link. Buyers are in the EU/UK (GDPR). | **Strong** (legal) |
| MD portrait + official logo upload | README "Before launch", `md.portrait = null` | **Strong** |
| Replace Unsplash with own photography | README, `lib/images.ts` comment | **Strong** |
| Automatic acknowledgement email to the buyer | Common for B2B, not mentioned in code | Medium (ask) |
| Tech-pack / file attachment on the inquiry form | Copy asks for tech packs, form has no file input | Medium (ask) |
| Inquiry status workflow (new → contacted → quoted → won/lost), notes, CSV export | Not in code | Ask |
| Social media links | None in header/footer/JSON-LD | Ask |
| Analytics | None; no cookie banner needed today | Ask |
| Blog/news, team page, multilingual (Bengali) | No evidence | Not planned |

---

## 12. Open questions for you

These affect Phase 2. Answers can be short.

1. **Admin users:** roughly how many people will use the admin panel, and who should see buyer inquiries? (Decides the roles in §7.)
2. **Inquiry notifications:** which address(es) should receive new inquiries? Do you already have SMTP (e.g. Hostinger business email), or are you open to a transactional email provider? Should the buyer get an automatic acknowledgement email?
3. **Inquiry workflow:** is a simple inbox (list, read, mark handled) enough, or do you want statuses, notes, assignment, and CSV export?
4. **Tech-pack upload:** should buyers be able to attach files (PDF/images/AI) to the inquiry form? This adds public-upload security work.
5. **Catalog depth:** is "category + styles" (as now) enough, or will individual styles need their own detail pages?
6. **Editing flexibility:** should admins be able to **reorder/hide/add sections** on pages (a section system), or only **edit the text/images** of the existing fixed layout? The first is more flexible but more work. (I lean towards a section system limited to the existing section types.)
7. **Draft/publish and scheduling:** is draft → publish enough, or do you need scheduled publishing?
8. **Password reset:** self-service by email, or the Owner resets other admins' passwords?
9. **Backend approach preference:** your brief asks me to evaluate NestJS vs Next.js. Do you have a reason to want a separate backend service (for example, a future mobile app or another team consuming a public API)? If not, see §13.
10. **Domain and email:** the production domain (`metamaxfashions.com`?) and whether email is hosted on the same Hostinger account.
11. **Privacy policy:** do you have one, or should a CMS-editable privacy page be included?

---

## 13. Feature dependencies and recommended next decisions

### 13.1 Dependency graph

```
Next.js security upgrade ──► (unblocks production build)
Backend foundation (config, DB, logging, validation)
  ├─► Inquiry persistence + rate limit + email ─────────────────┐
  ├─► Auth (users, sessions, roles)                              │
  │     └─► Admin shell (separate root layout via route groups)  │
  │           ├─► Inquiry inbox ◄────────────────────────────────┘
  │           ├─► Media library ──┐
  │           ├─► Settings + nav ─┼─► Frontend refactor: layout/header read from DB
  │           ├─► Shared collections (services, stats, testimonials…)
  │           ├─► Catalog (categories, styles) ◄── media
  │           └─► Pages + sections ◄── media, shared collections
  └─► Cache tags + invalidation (needed by every public read)
Frontend hardening (empty states, ID keys, global-error, dynamic counts) ◄── any dynamic data
```

### 13.2 Preliminary recommendation for Phase 2 (not yet a decision)

- **Backend approach:** build the backend **inside this Next.js app as a modular monolith**: a `server/` layer with modules (inquiries, auth, content, catalog, media, settings), each with service + repository + validation schemas. Expose it through Server Actions for the admin UI and `/api/v1` Route Handlers where an HTTP API is genuinely useful (health, media, the inquiry endpoint, any external consumer). Use PostgreSQL with an ORM (Prisma or Drizzle; to compare in Phase 2).
  - **Why not NestJS here:** the frontend relies on Cache Components. Same-process writes can call `updateTag()` directly. A separate NestJS service would need a webhook back into Next to invalidate caches, a second container, duplicated types, and an extra network hop, for a site with one small admin team and a single VPS.
  - **When I would change this:** if you plan other clients for the API (mobile app, partner portal), or a separate backend team. Phase 2 will lay out both options with trade-offs.
- **Admin separation:** route groups `app/(site)` and `app/(admin)` with separate root layouts, admin under `/admin/*`, `noindex`, and excluded from the sitemap/robots.
- **Phase order suggestion:** your 16-phase plan stands. Within it, I recommend delivering **inquiry persistence + notification first** once the foundation and database exist, because it fixes real data loss today and does not depend on the CMS.

---

## 14. Phase 1 report

| Item | Result |
|---|---|
| Completed work | Full read of every tracked file (56 files, ~5,300 lines excluding the lockfile); baseline lint, build, and dependency audit |
| Files created | `docs/backend/01-frontend-audit.md` (this file), `docs/backend/PROGRESS.md` |
| Files modified | None |
| Packages installed | None |
| Database changes | None |
| API changes | None |
| Tests executed | `npm run lint` (pass); `npm run build` (compile + type-check + 30/30 pages pass; **process exits 1 with Next.js security error**); `npm audit --omit=dev` (1 moderate) |
| Known limitations of this audit | Visual behaviour was not checked in a browser (structure was read from code only). Business facts (roles, workflows, email) are open questions, not assumptions. |
| Recommended next phase | **Phase 2 — Backend architecture and technical design**, after you answer §12 (or tell me to proceed with the defaults suggested there), and after deciding whether to do the Next.js 16.4.6 security upgrade first. |
