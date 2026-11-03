import { Suspense } from "react";
import { CategoryCard } from "@/components/collections/category-card";
import { CollectionsExplorer } from "@/components/collections/collections-explorer";
import { JsonLd } from "@/components/json-ld";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { InquiryCta, SectionHeading } from "@/components/sections/blocks";
import { PageHero } from "@/components/sections/page-hero";
import { allStyles, categories } from "@/lib/catalog";
import { img } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Products & Apparel Collections",
  description:
    "Explore apparel we source and manufacture in Bangladesh: T-shirts, polos, shirts, knitwear, wovens, denim, outerwear, sweaters, hoodies, trousers, activewear, kidswear and fashion wear.",
  path: "/products",
  image: img.rackShowroom,
});

export default function ProductsPage() {
  const explorerCategories = categories.map((c) => ({ slug: c.slug, short: c.short }));
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Apparel collections",
    itemListElement: categories.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: absoluteUrl(`/products/${c.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={[listLd, breadcrumbJsonLd([{ name: "Collections", path: "/products" }])]} />
      <PageHero
        eyebrow="Products & apparel collections"
        title="Twelve categories. Endless possibilities."
        accent={["Twelve", "Endless"]}
        description="A snapshot of the styles we develop and produce for international brands. Every programme is customised — fabric, fit, colour, trims and packaging."
        image={img.rackShowroom}
        crumbs={[{ label: "Collections" }]}
      />

      <section className="container-page py-20 lg:py-28" aria-labelledby="styles-heading">
        <SectionHeading
          id="styles-heading"
          kicker="Style gallery"
          title="Browse by category."
          accent={["category."]}
          className="mb-12"
        />
        <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-2xl bg-surface-muted" aria-hidden="true" />}>
          <CollectionsExplorer styles={allStyles} categories={explorerCategories} />
        </Suspense>
      </section>

      <section className="bg-surface py-24 lg:py-32" aria-labelledby="categories-heading">
        <div className="container-page">
          <SectionHeading
            id="categories-heading"
            kicker="All collections"
            title="Explore each category in depth."
            accent={["depth."]}
            description="Fabrics, finishes, minimum order quantities and lead times for every product family."
          />
          <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <StaggerItem as="li" key={c.slug}>
                <CategoryCard category={c} index={i} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <InquiryCta image={img.teesRack} title="Can't see your product? We probably make it." />
    </>
  );
}
