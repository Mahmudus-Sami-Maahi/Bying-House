import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Package, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryCard } from "@/components/collections/category-card";
import { JsonLd } from "@/components/json-ld";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { InquiryCta, SectionHeading } from "@/components/sections/blocks";
import { PageHero } from "@/components/sections/page-hero";
import { button } from "@/components/ui";
import { categories, getCategory, type Category } from "@/lib/catalog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, photo, site } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return { title: "Collection not found", robots: { index: false } };
  return pageMetadata({
    title: `${c.name} Manufacturer & Sourcing in Bangladesh`,
    description: `${c.description} MOQ ${c.moq}, lead time ${c.leadTime}.`,
    path: `/products/${c.slug}`,
    image: c.cover,
  });
}

export default function CategoryPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[620px] bg-night" aria-hidden="true" />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: Pick<PageProps<"/products/[slug]">, "params">) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();

  const index = categories.indexOf(c);
  const prev = categories[(index - 1 + categories.length) % categories.length];
  const next = categories[(index + 1) % categories.length];
  const related = [next, categories[(index + 2) % categories.length], categories[(index + 3) % categories.length]];

  return (
    <>
      <JsonLd data={[collectionJsonLd(c), breadcrumbJsonLd([{ name: "Collections", path: "/products" }, { name: c.name, path: `/products/${c.slug}` }])]} />
      <PageHero
        eyebrow={`Collection ${String(index + 1).padStart(2, "0")} / ${categories.length}`}
        title={c.name}
        description={c.description}
        image={c.cover}
        imageAlt={c.name}
        crumbs={[{ href: "/products", label: "Collections" }, { label: c.name }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={`/contact?type=quotation&category=${c.slug}`} className={button("light", "lg")}>
            Request a quotation <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href={`/contact?type=sample&category=${c.slug}`} className={button("outlineLight", "lg")}>
            Request a sample
          </Link>
        </div>
      </PageHero>

      {/* Key facts */}
      <section className="border-b border-line bg-surface" aria-label="Order facts">
        <dl className="container-page grid gap-px bg-line sm:grid-cols-3">
          {[
            { icon: Package, label: "Minimum order", value: c.moq },
            { icon: Clock, label: "Production lead time", value: c.leadTime },
            { icon: Ruler, label: "Size range", value: c.sizes },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 bg-surface py-8 sm:px-8 sm:first:pl-0">
              <Icon className="size-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <div className="flex flex-col-reverse">
                <dt className="text-xs tracking-wide text-muted">{label}</dt>
                <dd className="font-display text-2xl text-ink">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* Styles */}
      <section className="container-page py-24 lg:py-32" aria-labelledby="styles-heading">
        <SectionHeading id="styles-heading" kicker="Signature styles" title={c.tagline} />
        <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.styles.map((s) => (
            <StaggerItem as="li" key={s.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-surface-muted">
                <Image
                  src={photo(s.image, 900)}
                  alt={`${s.name} in ${s.fabric}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-110"
                />
              </div>
              <h3 className="mt-5 font-display text-2xl font-medium text-ink">{s.name}</h3>
              <p className="mt-1 text-sm text-muted">
                {s.fabric} · {s.detail}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Fabrics & finishes */}
      <section className="grain bg-night py-24 text-white lg:py-32" aria-labelledby="materials-heading">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="materials-heading"
              tone="light"
              kicker="Fabrics & finishes"
              title="Materials chosen for performance and feel."
              accent={["performance", "feel."]}
            />
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <SpecList title="Fabric options" items={c.fabrics} />
              <SpecList title="Finishes & value-add" items={c.finishes} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {c.gallery.map((id, i) => (
              <Reveal key={id} delay={i * 0.08} className={i % 2 === 1 ? "translate-y-10" : ""}>
                <ParallaxImage id={id} alt={`${c.name} example ${i + 1}`} className="aspect-[3/4] rounded-[1.25rem]" sizes="(min-width: 1024px) 22vw, 50vw" width={900} strength={10} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customisation */}
      <section className="container-page py-24 lg:py-32" aria-labelledby="custom-heading">
        <div className="grid gap-10 rounded-[2rem] border border-line bg-surface p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-16">
          <div>
            <SectionHeading
              id="custom-heading"
              kicker="Fully customisable"
              title={`Develop your ${c.short.toLowerCase()} programme with us.`}
              description="Send a tech pack, a reference sample or just an idea. We will propose fabrics, construction and costing within one business day."
            />
          </div>
          <Reveal className="flex flex-col gap-3">
            <Link href={`/contact?type=quotation&category=${c.slug}`} className={button("primary", "lg")}>
              Request a quotation <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/custom-design" className={button("outline", "lg")}>
              Design & development services
            </Link>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent(`${c.name} inquiry`)}`} className="text-center text-sm font-medium text-gold hover:underline">
              or email {site.email}
            </a>
          </Reveal>
        </div>

        <nav aria-label="Other collections" className="mt-16 flex items-center justify-between gap-4 border-t border-line pt-8 text-sm">
          <Link href={`/products/${prev.slug}`} className="group inline-flex items-center gap-2 font-medium text-ink-soft hover:text-ink">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            {prev.name}
          </Link>
          <Link href={`/products/${next.slug}`} className="group inline-flex items-center gap-2 text-right font-medium text-ink-soft hover:text-ink">
            {next.name}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </nav>
      </section>

      <section className="bg-surface-muted py-24" aria-labelledby="related-heading">
        <div className="container-page">
          <h2 id="related-heading" className="font-display text-4xl font-medium text-ink">
            Explore more collections
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <CategoryCard category={r} sizes="(min-width: 768px) 33vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InquiryCta image={c.gallery[0]} />
    </>
  );
}

function SpecList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-[0.24em] text-gold-bright uppercase">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((f) => (
          <li key={f} className="flex items-center gap-3 border-b border-white/10 pb-3 text-white/80">
            <span className="size-1.5 rounded-full bg-gold-bright" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function collectionJsonLd(c: Category) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${c.name} — ${site.name}`,
    description: c.description,
    url: absoluteUrl(`/products/${c.slug}`),
    about: { "@id": absoluteUrl("/#organization") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: c.styles.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: s.name,
          description: `${s.fabric}. ${s.detail}.`,
          image: photo(s.image, 1200),
          category: c.name,
          brand: { "@type": "Brand", name: "Private label" },
          manufacturer: { "@id": absoluteUrl("/#organization"), name: site.name },
        },
      })),
    },
  };
}
