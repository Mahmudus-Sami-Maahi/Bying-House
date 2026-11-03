import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TestimonialCarousel } from "@/components/motion/testimonials";
import { FeatureGrid, InquiryCta, Marquee, SectionHeading, Split, StatsBand } from "@/components/sections/blocks";
import { PageHero } from "@/components/sections/page-hero";
import { button, lead } from "@/components/ui";
import { markets, partnership, testimonials } from "@/lib/content";
import { img } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Global Partnerships",
  description:
    "Partner with MetaMax Fashions: international buyers, sourcing offices, private label and OEM programmes, worldwide shipment coordination and long-term B2B collaboration.",
  path: "/partnerships",
  image: img.port,
});

const regions = [
  { name: "Europe & UK", detail: "REACH-compliant chemistry, EU labelling and sustainability documentation." },
  { name: "North America", detail: "CPSIA for kidswear, FTC care labelling and retailer routing guides." },
  { name: "Asia-Pacific", detail: "Australian, Japanese and regional retail standards and fast sea-air options." },
  { name: "Middle East & Africa", detail: "Modest fashion, uniforms and wholesale programmes with flexible terms." },
];

const models = [
  { title: "Direct sourcing", body: "We act as your buying house — sourcing, managing and shipping your orders." },
  { title: "Sourcing office extension", body: "We support your existing team with local merchandising and QA capacity." },
  { title: "Private label & OEM", body: "End-to-end development and production under your brand." },
  { title: "Agency partnership", body: "Representation for overseas agents and trading companies sourcing from Bangladesh." },
];

export default function PartnershipsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Global Partnerships", path: "/partnerships" }])} />
      <PageHero
        eyebrow="Global partnerships"
        title="Long-term partners, across every market."
        accent={["Long-term", "every"]}
        description="We work with fashion brands, retailers, wholesalers, importers and sourcing offices worldwide — building relationships measured in seasons, not shipments."
        image={img.port}
        crumbs={[{ label: "Global Partnerships" }]}
      />

      <div className="border-b border-line bg-surface">
        <Marquee items={markets} label="Markets we serve" />
      </div>

      <section className="container-page py-24 lg:py-32" aria-labelledby="partners-heading">
        <SectionHeading
          id="partners-heading"
          kicker="Why partner with us"
          title="Built for international B2B collaboration."
          accent={["international"]}
        />
        <div className="mt-14">
          <FeatureGrid items={partnership} />
        </div>
      </section>

      <section className="bg-surface-muted py-24 lg:py-32" aria-labelledby="markets-heading">
        <div className="container-page">
          <Split image={img.port} imageAlt="Container port with cargo ready for export">
            <SectionHeading id="markets-heading" kicker="Global market experience" title="We know the rules of your market." accent={["your"]} />
            <Reveal delay={0.1}>
              <p className={`mt-6 ${lead}`}>
                Compliance, testing and labelling differ by destination. Our team prepares every order for the market it is
                going to.
              </p>
            </Reveal>
            <Stagger as="ul" className="mt-10 space-y-4">
              {regions.map((r) => (
                <StaggerItem as="li" key={r.name} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="font-display text-2xl text-ink">{r.name}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{r.detail}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Split>
        </div>
      </section>

      <section className="container-page py-24 lg:py-32" aria-labelledby="models-heading">
        <SectionHeading id="models-heading" kicker="Ways to work together" title="Choose the partnership model that fits." accent={["fits."]} align="center" />
        <Stagger as="ol" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {models.map((m, i) => (
            <StaggerItem as="li" key={m.title} className="group flex flex-col rounded-[1.5rem] border border-line bg-surface p-8 transition-colors duration-500 hover:bg-ink">
              <span className="font-display text-4xl text-gold/70 group-hover:text-gold-bright">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-2xl font-medium text-ink group-hover:text-white">{m.title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-muted group-hover:text-white/70">{m.body}</p>
              <Link
                href="/contact?type=partnership"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:text-gold-bright"
              >
                Discuss this model <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">: {m.title}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="grain bg-night py-24 text-white lg:py-32" aria-labelledby="partner-voices">
        <div className="container-page">
          <StatsBand />
          <div className="mt-24 grid gap-14 lg:grid-cols-[1fr_2fr]">
            <h2 id="partner-voices" className="font-display text-4xl leading-tight font-medium sm:text-5xl">
              Partners in their own words.
            </h2>
            <TestimonialCarousel items={testimonials} />
          </div>
          <Reveal className="mt-16">
            <Link href="/contact?type=partnership" className={button("light", "lg")}>
              Start a sourcing partnership <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <InquiryCta image={img.jeansStacks} />
    </>
  );
}
