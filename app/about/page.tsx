import { ArrowRight, Eye, Target } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid, InquiryCta, SectionHeading, Split, StatsBand } from "@/components/sections/blocks";
import { button, lead } from "@/components/ui";
import { mdMessage, values, whyUs } from "@/lib/content";
import { img } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us",
  description: `Learn about ${site.name}, a Dhaka-based garments buying house: our history, mission, vision, values and why international brands choose us as their sourcing partner.`,
  path: "/about",
  image: img.factoryFloor,
});

const milestones = [
  { title: "Founded in Dhaka", body: "Established with a clear purpose: give international buyers an honest, accountable partner on the ground in Bangladesh." },
  { title: "Building the network", body: "Partnerships with specialist knit, woven, denim, sweater and outerwear factories, each vetted for capability and compliance." },
  { title: "Design & development studio", body: "An in-house team for concept design, pattern development and fast sampling to support brands from idea to bulk." },
  { title: "Global programmes", body: "Serving brands, retailers and importers across Europe, North America, Asia-Pacific and the Middle East." },
];

const philosophy = [
  "We are an extension of your sourcing team — not a middleman.",
  "We recommend what is right for your product, even when it is not the easiest option.",
  "We measure ourselves by repeat orders, not single shipments.",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about" }])} />
      <PageHero
        eyebrow="About MetaMax Fashions"
        title="Built on trust. Driven by craft."
        accent={["trust.", "craft."]}
        description="We are a garments buying house helping international fashion brands, retailers and importers source quality apparel from Bangladesh — responsibly, transparently and on time."
        image={img.assemblyLine}
        crumbs={[{ label: "About Us" }]}
      />

      {/* Background */}
      <section className="container-page py-24 lg:py-36" aria-labelledby="story-heading">
        <Split image={img.shirtsTable} imageAlt="Folded woven shirts prepared for buyer approval">
          <SectionHeading
            id="story-heading"
            kicker="Company background"
            title="Your trusted team on the ground in Bangladesh."
            accent={["trusted"]}
          />
          <Reveal delay={0.15}>
            <p className={`mt-6 ${lead}`}>
              {site.name} was founded to solve a problem every overseas buyer knows: finding a sourcing partner who
              combines factory access with genuine accountability.
            </p>
            <p className="mt-5 leading-7 text-muted">
              Headquartered in DOHS Baridhara, Dhaka, our team of merchandisers, product developers and quality
              specialists works alongside a curated network of partner factories. We manage the details — costing,
              materials, sampling, production follow-up, inspection and shipping — so our clients receive the right
              product, at the right quality, at the right time.
            </p>
          </Reveal>
        </Split>
      </section>

      {/* Timeline */}
      <section className="bg-surface py-24 lg:py-32" aria-labelledby="journey-heading">
        <div className="container-page">
          <SectionHeading id="journey-heading" kicker="Our journey" title="Growing with our partners." accent={["Growing"]} />
          <Stagger as="ol" className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <StaggerItem as="li" key={m.title} className="bg-surface p-8 lg:p-10">
                <span className="font-display text-5xl text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-lg font-semibold text-ink">{m.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{m.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="grain bg-night py-24 text-white lg:py-32" aria-label="Mission and vision">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          {[
            {
              icon: Target,
              label: "Our mission",
              text: "To make apparel sourcing from Bangladesh simple, reliable and responsible — delivering consistent quality and complete transparency to every client we serve.",
            },
            { icon: Eye, label: "Our vision", text: mdMessage.vision },
          ].map(({ icon: Icon, label, text }, i) => (
            <Reveal key={label} delay={i * 0.12} className="rounded-[1.75rem] border border-white/10 bg-night-soft p-10 lg:p-14">
              <Icon className="size-9 text-gold-bright" strokeWidth={1.25} aria-hidden="true" />
              <h2 className="mt-8 text-xs font-semibold tracking-[0.24em] text-gold-bright uppercase">{label}</h2>
              <p className="mt-5 font-display text-3xl leading-snug font-medium sm:text-4xl">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-page py-24 lg:py-36" aria-labelledby="values-heading">
        <SectionHeading
          id="values-heading"
          kicker="Our values"
          title="The principles behind every order."
          accent={["principles"]}
          align="center"
        />
        <div className="mt-16">
          <FeatureGrid items={values} columns={4} />
        </div>
      </section>

      {/* Philosophy + leadership */}
      <section className="bg-surface-muted py-24 lg:py-32" aria-labelledby="philosophy-heading">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="philosophy-heading"
              kicker="Philosophy & leadership"
              title="Partnership over transactions."
              accent={["Partnership"]}
              description={`Led by Managing Director ${site.md.name}, our leadership stays close to production and to our clients — making decisions with the long-term relationship in mind.`}
            />
            <Reveal delay={0.2} className="mt-10">
              <Link href="/managing-director" className={button("primary", "md")}>
                Message from the MD <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Stagger as="ul" className="space-y-4 self-center">
            {philosophy.map((p) => (
              <StaggerItem as="li" key={p} className="rounded-2xl border border-line bg-surface p-7 font-display text-2xl leading-snug text-ink">
                {p}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why us */}
      <section className="container-page py-24 lg:py-36" aria-labelledby="why-heading">
        <SectionHeading
          id="why-heading"
          kicker="Why international brands choose us"
          title="Six reasons buyers stay with MetaMax."
          accent={["stay"]}
        />
        <div className="mt-16">
          <FeatureGrid items={whyUs} />
        </div>
        <div className="mt-24 rounded-[2rem] bg-night p-10 lg:p-16">
          <StatsBand />
        </div>
      </section>

      <InquiryCta image={img.fabricMarket} />
    </>
  );
}
