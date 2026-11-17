import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { InquiryCta, Marquee, SectionHeading } from "@/components/sections/blocks";
import { PageHero } from "@/components/sections/page-hero";
import { sustainability } from "@/lib/content";
import { img } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { photo } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Sustainability",
  description:
    "Responsible sourcing, sustainable fabrics, eco-conscious production, ethical labour practices and environmental responsibility at MetaMax Fashions.",
  path: "/sustainability",
  image: img.whiteTextile,
});

const fabrics = [
  "Organic cotton",
  "Better Cotton",
  "Recycled polyester",
  "Recycled nylon",
  "Tencel™ lyocell",
  "LENZING™ ECOVERO™",
  "Linen",
  "Hemp blends",
  "Recycled cotton",
];

const commitments = [
  { metric: "Low-water", label: "Denim finishing via laser & ozone technology" },
  { metric: "ZDHC", label: "MRSL-aligned chemical management at wet-processing partners" },
  { metric: "Certified", label: "Organic & recycled materials with transaction certificates" },
  { metric: "Audited", label: "Social compliance verified through recognised programmes" },
];

export default function SustainabilityPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Sustainability", path: "/sustainability" }])} />
      <PageHero
        eyebrow="Sustainability"
        title="Fashion that respects people and planet."
        accent={["people", "planet."]}
        description="Responsibility is built into how we choose factories, materials and processes — so our clients can make sustainability claims with confidence."
        image={img.whiteTextile}
        crumbs={[{ label: "Sustainability" }]}
      />

      <section className="container-page py-24 lg:py-32" aria-labelledby="intro-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="intro-heading"
            kicker="Our approach"
            title="Progress over promises."
            accent={["Progress"]}
          />
          <Reveal delay={0.1} className="space-y-5 text-lg leading-8 text-muted">
            <p>
              The apparel industry has a significant environmental and social footprint. We believe sourcing partners have
              a responsibility to reduce it — practically, measurably and honestly.
            </p>
            <p>
              We help brands select certified materials, work with factories investing in cleaner production, and keep the
              documentation needed for traceability and regulatory requirements in key markets.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-12" aria-label="Pillars of our sustainability programme">
        <ul className="container-page space-y-6">
          {sustainability.map(({ icon: Icon, title, body, image }, i) => (
            <Reveal as="li" key={title}>
              <article className={`grid overflow-hidden rounded-[2rem] bg-surface shadow-card md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative min-h-[18rem] md:min-h-[26rem]">
                  <Image src={photo(image, 1400)} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                  <span className="font-display text-xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <Icon className="mt-6 size-9 text-gold" strokeWidth={1.25} aria-hidden="true" />
                  <h2 className="mt-6 font-display text-4xl font-medium text-ink">{title}</h2>
                  <p className="mt-4 text-[1.0625rem] leading-8 text-muted">{body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="grain bg-night py-24 text-white lg:py-32" aria-labelledby="fabrics-heading">
        <div className="container-page">
          <SectionHeading
            id="fabrics-heading"
            tone="light"
            kicker="Sustainable fabrics"
            title="Better materials, as standard options."
            accent={["Better"]}
          />
        </div>
        <div className="mt-14 border-y border-white/10">
          <Marquee items={fabrics} tone="light" label="Sustainable materials we source" />
        </div>
        <Stagger as="ul" className="container-page mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c) => (
            <StaggerItem as="li" key={c.metric} className="border-t border-white/15 pt-6">
              <p className="font-display text-4xl text-gold-bright">{c.metric}</p>
              <p className="mt-3 text-sm leading-6 text-white/65">{c.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <InquiryCta image={img.fabricRolls} title="Planning a more sustainable collection?" />
    </>
  );
}
