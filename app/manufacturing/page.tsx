import { HardHat, Scale, ShieldCheck, Users } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Counter } from "@/components/motion/counter";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { FeatureGrid, InquiryCta, SectionHeading, Split } from "@/components/sections/blocks";
import { PageHero } from "@/components/sections/page-hero";
import { lead } from "@/components/ui";
import { manufacturing, process, qualitySteps, standards } from "@/lib/content";
import { img } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Manufacturing & Quality",
  description:
    "Manufacturing capabilities, factory network, production capacity, quality inspection, QA standards, certifications and ethical manufacturing practices at MetaMax Fashions.",
  path: "/manufacturing",
  image: img.factoryFloor,
});

const capacity = [
  { value: 40, suffix: "+", label: "Partner factories" },
  { value: 250, suffix: "K+", label: "Pieces per month capacity" },
  { value: 600, suffix: "+", label: "Sewing lines across the network" },
  { value: 30, suffix: "+", label: "In-house QA & merchandising staff" },
];

const network = [
  { region: "Gazipur", focus: "Knit composites, fleece & activewear" },
  { region: "Ashulia & Savar", focus: "Woven shirting, bottoms & denim laundries" },
  { region: "Narayanganj", focus: "Knitwear, basics & kidswear" },
  { region: "Chattogram EPZ", focus: "Outerwear, sweaters & technical garments" },
];

const ethics = [
  { icon: HardHat, title: "Building & fire safety", body: "Partner factories maintain structural, electrical and fire-safety programmes aligned with RSC standards." },
  { icon: Users, title: "Fair treatment", body: "No forced or child labour, regulated working hours, written contracts and grievance mechanisms." },
  { icon: Scale, title: "Fair wages", body: "Legal minimum wages as a baseline, with overtime paid correctly and transparently documented." },
  { icon: ShieldCheck, title: "Continuous auditing", body: "Third-party audit reports reviewed before onboarding and tracked through corrective action plans." },
];

export default function ManufacturingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Manufacturing & Quality", path: "/manufacturing" }])} />
      <PageHero
        eyebrow="Manufacturing & quality"
        title="Scale you can rely on. Quality you can verify."
        accent={["rely", "verify."]}
        description="A curated network of specialist factories, monitored daily by our own production and quality teams."
        image={img.factoryFloor}
        crumbs={[{ label: "Manufacturing & Quality" }]}
      />

      {/* Capacity */}
      <section className="border-b border-line bg-surface py-16" aria-label="Production capacity">
        <Stagger as="ul" className="container-page grid grid-cols-2 gap-10 lg:grid-cols-4">
          {capacity.map((c) => (
            <StaggerItem as="li" key={c.label}>
              <p className="font-display text-5xl text-ink tabular-nums sm:text-6xl">
                <Counter value={c.value} suffix={c.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{c.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Capabilities */}
      <section className="container-page py-24 lg:py-32" aria-labelledby="capabilities-heading">
        <SectionHeading
          id="capabilities-heading"
          kicker="Manufacturing capabilities"
          title="Specialists for every product family."
          accent={["Specialists"]}
          description="We don't push every order through one factory. Each programme is placed where the equipment, skills and compliance match the product."
        />
        <div className="mt-16">
          <FeatureGrid items={manufacturing} />
        </div>
      </section>

      {/* Network */}
      <section className="grain bg-night py-24 text-white lg:py-32" aria-labelledby="network-heading">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="network-heading"
              tone="light"
              kicker="Factory network"
              title="Bangladesh's key apparel clusters, covered."
              accent={["covered."]}
            />
            <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {network.map((n, i) => (
                <Reveal as="li" key={n.region} delay={i * 0.08} className="flex items-baseline justify-between gap-6 py-6">
                  <span className="font-display text-3xl">{n.region}</span>
                  <span className="text-right text-sm text-white/60">{n.focus}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ParallaxImage id={img.sewingFactory} alt="Machine operator at work in a garment factory" className="col-span-2 aspect-[16/10] rounded-[1.5rem]" sizes="(min-width: 1024px) 45vw, 100vw" />
            <ParallaxImage id={img.textileMachinery} alt="Industrial textile machinery" className="aspect-square rounded-[1.5rem]" sizes="25vw" width={900} />
            <ParallaxImage id={img.spools} alt="Thread cones on an industrial sewing machine" className="aspect-square rounded-[1.5rem]" sizes="25vw" width={900} />
          </div>
        </div>
      </section>

      {/* Production process */}
      <section className="container-page py-24 lg:py-32" aria-labelledby="process-heading">
        <SectionHeading id="process-heading" kicker="Production process" title="Controlled at every stage." accent={["Controlled"]} align="center" />
        <Stagger as="ol" className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {process.map((p) => (
            <StaggerItem as="li" key={p.step} className="bg-surface p-8 lg:p-10">
              <span className="font-display text-4xl text-gold/70">{p.step}</span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* QA */}
      <section className="bg-surface-muted py-24 lg:py-32" aria-labelledby="qa-heading">
        <div className="container-page">
          <Split image={img.folding} imageAlt="Inspector checking and folding finished garments">
            <SectionHeading id="qa-heading" kicker="Quality inspection" title="Six checkpoints between fabric and freight." accent={["Six"]} />
            <Reveal delay={0.1}>
              <p className={`mt-6 ${lead}`}>
                Our QA team works independently of production, with full photo reports and inspection results shared with
                you in real time.
              </p>
            </Reveal>
            <Stagger as="ol" className="mt-10 grid gap-4 sm:grid-cols-2">
              {qualitySteps.map((q, i) => (
                <StaggerItem as="li" key={q.title} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Step {i + 1}</p>
                  <p className="mt-2 font-semibold text-ink">{q.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{q.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Split>
        </div>
      </section>

      {/* Standards */}
      <section className="container-page py-24 lg:py-32" aria-labelledby="standards-heading">
        <SectionHeading
          id="standards-heading"
          kicker="Certifications & compliance"
          title="Standards our partner factories work to."
          accent={["Standards"]}
          description="Certification scope varies by factory; we confirm the valid certificates for your specific programme during onboarding."
        />
        <Stagger as="ul" className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {standards.map((s) => (
            <StaggerItem
              as="li"
              key={s.name}
              className="group rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-gold hover:bg-gold-soft"
            >
              <p className="font-display text-2xl font-medium text-ink">{s.name}</p>
              <p className="mt-2 text-sm text-muted">{s.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Ethics */}
      <section className="bg-surface py-24 lg:py-32" aria-labelledby="ethics-heading">
        <div className="container-page">
          <SectionHeading id="ethics-heading" kicker="Ethical manufacturing" title="People first, on every production floor." accent={["People"]} />
          <div className="mt-14">
            <FeatureGrid items={ethics} columns={4} />
          </div>
        </div>
      </section>

      <InquiryCta image={img.assemblyLine} title="Book a factory visit or virtual audit." />
    </>
  );
}
