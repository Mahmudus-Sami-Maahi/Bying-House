import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/collections/category-card";
import { DesignShowcase } from "@/components/home/design-showcase";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { HeroSlideshow } from "@/components/motion/hero-slideshow";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TestimonialCarousel } from "@/components/motion/testimonials";
import { FeatureGrid, InquiryCta, Marquee, SectionHeading, Split, StatsBand } from "@/components/sections/blocks";
import { button, eyebrowLight, lead } from "@/components/ui";
import { categories } from "@/lib/catalog";
import { manufacturing, markets, pillars, qualitySteps, standards, sustainability, testimonials, values } from "@/lib/content";
import { img } from "@/lib/images";
import { photo, site } from "@/lib/site";

const heroSlides = [
  { id: img.factoryFloor, label: "Garment workers on a production floor" },
  { id: img.rackStudio, label: "Fashion collection on a studio rail" },
  { id: img.fabricRolls, label: "Fabric rolls in a textile warehouse" },
  { id: img.denimStack, label: "Folded premium denim" },
];

export default function HomePage() {
  // 10 cards with two double-width tiles fill a clean 3 × 4 grid on desktop.
  const featured = categories.slice(0, 10);
  const wide = (i: number) => i === 0 || i === 7;

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white">
        <HeroSlideshow slides={heroSlides} />
        <div className="container-page flex flex-1 flex-col justify-center pt-32 pb-28">
          <Reveal y={12}>
            <p className={eyebrowLight}>Garments Buying House · Dhaka, Bangladesh</p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            immediate
            delay={0.2}
            text="Crafting apparel for the world's leading brands."
            accent={["apparel", "brands."]}
            className="mt-7 max-w-5xl font-display text-[3.25rem] leading-[0.95] font-medium tracking-[-0.025em] sm:text-7xl lg:text-8xl xl:text-[7.25rem]"
          />
          <Reveal delay={0.7} className="mt-8 max-w-xl">
            <p className="text-lg leading-8 text-white/75">
              {site.name} is your reliable sourcing partner in Bangladesh — connecting international brands, retailers and
              importers with audited factories, expert product development and uncompromising quality assurance.
            </p>
          </Reveal>
          <Reveal delay={0.85} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact?type=quotation" className={button("light", "lg")}>
              Request a quotation
              <ArrowUpRight
                className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link href="/products" className={button("outlineLight", "lg")}>
              Explore collections
            </Link>
          </Reveal>
        </div>
        <a
          href="#overview"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold tracking-[0.3em] text-white/60 uppercase hover:text-white md:flex"
        >
          Scroll
          <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </section>

      {/* -------------------------------------------------------- Pillars */}
      <div className="border-b border-line bg-surface">
        <Marquee items={pillars} label="Our commitments" />
      </div>

      {/* ------------------------------------------------------- Overview */}
      <section id="overview" className="container-page scroll-mt-24 py-24 lg:py-36" aria-labelledby="overview-heading">
        <Split
          image={img.sewingWoman}
          imageAlt="Skilled garment technician sewing a sample at a partner factory"
          badge={
            <div className="absolute -right-4 -bottom-8 hidden w-60 rounded-2xl bg-ink p-6 text-white shadow-lift sm:block lg:-right-10">
              <p className="font-display text-5xl">12</p>
              <p className="mt-2 text-sm leading-6 text-white/70">Apparel categories developed and produced under one roof of expertise.</p>
            </div>
          }
        >
          <SectionHeading
            id="overview-heading"
            kicker="Who we are"
            title="A global sourcing partner, rooted in Bangladesh."
            accent={["global", "Bangladesh."]}
          />
          <Reveal delay={0.15}>
            <p className={`mt-6 ${lead}`}>
              Bangladesh is one of the world&apos;s largest and most capable apparel manufacturing hubs. {site.name} gives
              international buyers a direct, transparent route into that strength — with our own merchandisers, technicians
              and quality teams managing every step on your behalf.
            </p>
            <p className="mt-5 leading-7 text-muted">
              From fashion-forward collections to high-volume basics, we coordinate design, fabric, sampling, production,
              compliance and shipment, so you can focus on building your brand.
            </p>
          </Reveal>
          <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <StaggerItem as="li" key={v.title} className="flex gap-3">
                <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                <span className="text-[0.9375rem] font-medium text-ink">{v.title}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-12">
            <Link href="/about" className={button("outline", "md")}>
              Discover our story <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </Split>
      </section>

      {/* ----------------------------------------------------- Categories */}
      <section className="bg-surface py-24 lg:py-32" aria-labelledby="collections-heading">
        <div className="container-page">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="collections-heading"
              kicker="Featured collections"
              title="Every category your customers wear."
              accent={["Every", "wear."]}
              description="Knit, woven, denim, sweater and outerwear expertise for menswear, womenswear and kidswear — developed to your specifications."
            />
            <Reveal>
              <Link href="/products" className={button("primary", "md", "shrink-0")}>
                View all collections <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Stagger as="ul" className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c, i) => (
              <StaggerItem as="li" key={c.slug} className={wide(i) ? "sm:col-span-2 lg:col-span-2" : ""}>
                <CategoryCard
                  category={c}
                  index={i}
                  sizes={wide(i) ? "(min-width: 1024px) 50vw, 100vw" : undefined}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------------------- Design & development */}
      <section className="grain relative overflow-hidden bg-night py-24 text-white lg:py-36" aria-labelledby="design-heading">
        <div
          aria-hidden="true"
          className="absolute top-1/4 -left-40 size-[34rem] animate-[drift_22s_ease-in-out_infinite] rounded-full bg-gold/15 blur-3xl"
        />
        <div className="container-page relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="design-heading"
              tone="light"
              kicker="Design & product development"
              title="From first sketch to finished sample."
              accent={["sketch", "sample."]}
              description="Our in-house design and development team turns ideas into commercial, manufacturable garments — quickly and precisely."
            />
            <Reveal>
              <Link href="/custom-design" className={button("outlineLight", "md", "shrink-0")}>
                Custom design services <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-16">
            <DesignShowcase />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Capabilities */}
      <section className="container-page py-24 lg:py-36" aria-labelledby="capabilities-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="capabilities-heading"
              kicker="Manufacturing & sourcing"
              title="Specialist capability for every product."
              accent={["Specialist", "product."]}
              description="We place each programme in the factory best suited to it — knit composites, woven units, denim laundries, sweater plants and outerwear specialists."
            />
            <Reveal delay={0.2} className="mt-10">
              <Link href="/manufacturing" className={button("outline", "md")}>
                Manufacturing & quality <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <FeatureGrid items={manufacturing} columns={2} numbered />
        </div>
      </section>

      {/* ----------------------------------------------------- Quality */}
      <section className="bg-surface-muted py-24 lg:py-32" aria-labelledby="quality-heading">
        <div className="container-page">
          <Split
            image={img.folding}
            imageAlt="Quality inspector folding and checking finished garments"
            reverse
            badge={
              <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-full bg-surface px-5 py-3 shadow-lift sm:flex lg:-left-8">
                <BadgeCheck className="size-6 text-gold" aria-hidden="true" />
                <span className="text-sm font-semibold text-ink">AQL 2.5 final inspections</span>
              </div>
            }
          >
            <SectionHeading
              id="quality-heading"
              kicker="Quality assurance & compliance"
              title="Quality is checked, not assumed."
              accent={["checked,"]}
            />
            <Stagger as="ol" className="mt-10 space-y-6">
              {qualitySteps.slice(0, 5).map((q, i) => (
                <StaggerItem as="li" key={q.title} className="flex gap-5 border-b border-line pb-6 last:border-0">
                  <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold text-ink">{q.title}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-7 text-muted">{q.body}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </Split>
          <Reveal className="mt-20">
            <p className="text-center text-xs font-semibold tracking-[0.24em] text-muted uppercase">
              Partner factories audited & certified against
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {standards.map((s) => (
                <li key={s.name} className="bg-surface px-6 py-7 text-center">
                  <p className="font-display text-2xl font-medium text-ink">{s.name}</p>
                  <p className="mt-1 text-xs text-muted">{s.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ Sustainability */}
      <section className="container-page py-24 lg:py-36" aria-labelledby="sustainability-heading">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="sustainability-heading"
            kicker="Sustainability & ethics"
            title="Responsible by design, transparent by default."
            accent={["Responsible", "transparent"]}
          />
          <Reveal>
            <Link href="/sustainability" className={button("outline", "md", "shrink-0")}>
              Our commitments <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Stagger as="ul" className="mt-16 grid gap-6 md:grid-cols-3">
          {sustainability.slice(0, 3).map(({ icon: Icon, title, body, image }) => (
            <StaggerItem as="li" key={title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={photo(image, 1000)}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105"
                />
                <span className="absolute top-5 left-5 inline-flex size-12 items-center justify-center rounded-full bg-surface/90 text-gold backdrop-blur">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium text-ink">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-7 text-muted">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ------------------------------------------------ Stats + global */}
      <section className="grain relative isolate overflow-hidden bg-night py-24 text-white lg:py-32" aria-labelledby="global-heading">
        <ParallaxImage id={img.port} alt="" className="absolute inset-0 -z-10 opacity-25" strength={20} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/80 to-night" />
        <div className="container-page">
          <SectionHeading
            id="global-heading"
            tone="light"
            kicker="Global reach"
            title="Trusted by buyers across five continents."
            accent={["five", "continents."]}
            description="We ship to brands, retailers and importers worldwide, with experience in the labelling, testing and logistics requirements of every major market."
          />
          <div className="mt-20">
            <StatsBand />
          </div>
        </div>
        <div className="mt-20 border-y border-white/10">
          <Marquee items={markets} tone="light" label="Markets we export to" />
        </div>
        <div className="container-page mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-white/70">
            Looking for a long-term partner for your sourcing office, private label or OEM programme?
          </p>
          <Link href="/partnerships" className={button("light", "md", "shrink-0")}>
            Global partnerships <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ Factory showcase */}
      <section className="container-page py-24 lg:py-36" aria-labelledby="factory-heading">
        <SectionHeading
          id="factory-heading"
          align="center"
          kicker="Factory & production"
          title="Inside the factories we partner with."
          accent={["Inside"]}
          description="Modern, compliant production floors with skilled teams — monitored daily by our own production and quality staff."
        />
        <div className="mt-16 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] lg:grid-cols-4">
          {[
            { id: img.factoryFloor, alt: "Large garment production floor with sewing lines", cls: "col-span-2 row-span-2" },
            { id: img.spools, alt: "Thread cones loaded on an industrial sewing machine", cls: "" },
            { id: img.fabricSorting, alt: "Textile workers sorting fabric panels", cls: "" },
            { id: img.sewingMan, alt: "Operator stitching garments on an industrial machine", cls: "col-span-2 lg:col-span-1" },
            { id: img.looms, alt: "Industrial looms weaving fabric", cls: "col-span-2 lg:col-span-1" },
          ].map((tile, i) => (
            <Reveal key={tile.id} delay={i * 0.08} className={tile.cls}>
              <ParallaxImage
                id={tile.id}
                alt={tile.alt}
                strength={10}
                className="h-full rounded-[1.25rem]"
                sizes={tile.cls.includes("row-span-2") ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                width={1200}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- Testimonials */}
      <section className="bg-ink py-24 text-white lg:py-32" aria-labelledby="testimonials-heading">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className={eyebrowLight}>Client feedback</p>
            <h2 id="testimonials-heading" className="mt-5 font-display text-4xl leading-tight font-medium sm:text-5xl">
              What our partners say.
            </h2>
            <p className="mt-6 text-white/60">
              Long-term relationships with brands, retailers and importers are the true measure of our work.
            </p>
          </div>
          <TestimonialCarousel items={testimonials} />
        </div>
      </section>

      <InquiryCta image={img.rackShowroom} />
    </>
  );
}
