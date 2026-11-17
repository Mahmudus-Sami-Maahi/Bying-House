import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { FeatureGrid, InquiryCta, SectionHeading, Split } from "@/components/sections/blocks";
import { PageHero } from "@/components/sections/page-hero";
import { button, lead } from "@/components/ui";
import { customDesign } from "@/lib/content";
import { img } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { photo } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Custom Design & Development",
  description:
    "Custom apparel design, fashion concept development, fabric and colour selection, print and embroidery, tech packs, sampling and private-label / OEM clothing solutions.",
  path: "/custom-design",
  image: img.rackStudio,
});

const techPack = [
  "Front, back & detail flats",
  "Bill of materials (fabric, trims, labels)",
  "Construction & stitch specifications",
  "Graded measurement charts & tolerances",
  "Artwork, colourways & placement guides",
  "Packaging & labelling instructions",
];

const palette = [
  { name: "Ecru", hex: "#efe6d4" },
  { name: "Sand", hex: "#d7c3a1" },
  { name: "Terracotta", hex: "#b4643f" },
  { name: "Olive", hex: "#6b6b3e" },
  { name: "Indigo", hex: "#2e3a5c" },
  { name: "Ink", hex: "#16191f" },
];

export default function CustomDesignPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Design & Development", path: "/custom-design" }])} />
      <PageHero
        eyebrow="Custom design & development"
        title="Your vision, engineered for production."
        accent={["vision,"]}
        description="Whether you arrive with a finished tech pack or a single reference image, our designers and technicians develop garments that look right, fit right and produce right."
        image={img.rackStudio}
        crumbs={[{ label: "Design & Development" }]}
      />

      <section className="container-page py-24 lg:py-36" aria-labelledby="studio-heading">
        <Split image={img.pinCushion} imageAlt="Sewing pins and tools at a sampling table">
          <SectionHeading
            id="studio-heading"
            kicker="Design studio"
            title="Creative ideas, commercially grounded."
            accent={["Creative"]}
          />
          <Reveal delay={0.15}>
            <p className={`mt-6 ${lead}`}>
              Great collections balance creativity with cost, timing and manufacturability. Our development team works
              from concept boards through to approved pre-production samples, flagging risks early and suggesting smarter
              alternatives where they add value.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {[
              ["7–10", "days for proto samples"],
              ["3", "fit rounds on average"],
              ["100%", "tech-pack documented"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-4xl text-ink">{v}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{l}</p>
              </div>
            ))}
          </Reveal>
        </Split>
      </section>

      <section className="bg-surface py-24 lg:py-32" aria-labelledby="capabilities-heading">
        <div className="container-page">
          <SectionHeading
            id="capabilities-heading"
            kicker="What we develop"
            title="Nine ways we bring your collection to life."
            accent={["life."]}
            align="center"
          />
          <div className="mt-16">
            <FeatureGrid items={customDesign} numbered />
          </div>
        </div>
      </section>

      {/* Colour + fabric showcase */}
      <section className="grain bg-night py-24 text-white lg:py-32" aria-labelledby="colour-heading">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="colour-heading"
              tone="light"
              kicker="Colour & material"
              title="Matched to the Pantone, tested to the standard."
              accent={["Pantone,"]}
              description="Lab dips, strike-offs and yarn-dyed blankets are developed against your references and approved under standard light sources before bulk."
            />
            <Stagger as="ul" className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {palette.map((c) => (
                <StaggerItem as="li" key={c.name} className="text-center">
                  <span
                    className="block aspect-[3/4] rounded-xl border border-white/10 transition-transform duration-500 hover:-translate-y-2"
                    style={{ background: c.hex }}
                  />
                  <span className="mt-2 block text-xs text-white/60">{c.name}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ParallaxImage id={img.threadSpools} alt="Assorted colour thread spools" className="row-span-2 aspect-[3/5] rounded-[1.5rem]" sizes="25vw" />
            <ParallaxImage id={img.clothShelf} alt="Colourful fabrics folded on shelves" className="aspect-square rounded-[1.5rem]" sizes="25vw" />
            <ParallaxImage id={img.foldedCloth} alt="Stack of folded blue and green fabric" className="aspect-square rounded-[1.5rem]" sizes="25vw" />
          </div>
        </div>
      </section>

      {/* Tech packs */}
      <section className="container-page py-24 lg:py-36" aria-labelledby="techpack-heading">
        <Split image={img.shirtFormal} imageAlt="Finished shirt developed from a detailed tech pack" reverse>
          <SectionHeading
            id="techpack-heading"
            kicker="Tech packs & specifications"
            title="Every detail documented."
            accent={["documented."]}
            description="No tech pack? No problem. We build complete, factory-ready documentation so every unit is made exactly as approved."
          />
          <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2">
            {techPack.map((t) => (
              <StaggerItem as="li" key={t} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-[0.9375rem] text-ink-soft">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {t}
              </StaggerItem>
            ))}
          </Stagger>
        </Split>
      </section>

      {/* Private label */}
      <section className="bg-surface-muted py-24 lg:py-32" aria-labelledby="oem-heading">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="grid grid-cols-3 gap-4">
            {[img.teesFolded, img.foldedBlack, img.hoodiesRack].map((id, i) => (
              <Reveal key={id} delay={i * 0.1} className={i === 1 ? "mt-12" : ""}>
                <div className="relative aspect-[3/5] overflow-hidden rounded-[1.25rem]">
                  <Image src={photo(id, 700)} alt="" fill sizes="(min-width: 1024px) 18vw, 33vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
          <div>
            <SectionHeading
              id="oem-heading"
              kicker="Private label & OEM"
              title="Your brand, manufactured end-to-end."
              accent={["Your", "brand,"]}
              description="Custom woven labels, hangtags, printed packaging and barcodes — produced to your brand guidelines and retailer compliance requirements."
            />
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact?type=sample" className={button("primary", "md")}>
                Request a sample <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/products" className={button("outline", "md")}>
                Browse collections
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <InquiryCta image={img.embroidery} title="Have a design in mind? Let's develop it." />
    </>
  );
}
