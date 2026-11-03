# MetaMax Fashions — website

Corporate website for **MetaMax Fashions**, a garments buying house in Dhaka, Bangladesh.
Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.metamaxfashions.com`) in production so canonical URLs, the sitemap and structured data use the live domain.

## Where to edit content

| What | File |
| --- | --- |
| Company name, email, phones, WhatsApp, address, MD details & portrait | `lib/site.ts` |
| Navigation, stats, services, process, standards, testimonials, MD message, sustainability copy | `lib/content.ts` |
| Apparel categories, styles, fabrics, MOQ & lead times | `lib/catalog.ts` |
| Photography (Unsplash ids, named by subject) | `lib/images.ts` |
| Colours, fonts and design tokens | `app/globals.css` |

## Before launch — please review

- **Placeholder figures**: statistics (factories, pieces per year, markets, capacity), testimonials (anonymised), and the certification list are representative. Replace them with verified MetaMax data.
- **Managing Director**: add the official portrait to `public/` and set `site.md.portrait` (e.g. `/images/md-portrait.jpg`); review the leadership message in `lib/content.ts`.
- **Logo**: `components/brand/logo.tsx` and `app/icon.svg` are an SVG redraw of the business-card monogram — swap in the official vector logo when available.
- **Inquiry delivery**: `app/actions.ts → deliverInquiry()` currently only validates and logs. Connect it to your email provider or CRM.
- **Photography**: stock images from Unsplash; replacing them with your own factory and product photos will strengthen credibility.

## Structure

```
app/                 routes (home, about, managing-director, services, products/[slug],
                     custom-design, manufacturing, sustainability, partnerships, contact)
components/motion/   reveal, animated headings, parallax, counters, slideshow, carousel, intro
components/sections/ page hero and shared section blocks
components/forms/    inquiry form + accessible field helpers
lib/                 content, catalog, SEO helpers, validation
```
