import { Check } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { InquiryCta, SectionHeading } from "@/components/sections/blocks";
import { PageHero } from "@/components/sections/page-hero";
import { button } from "@/components/ui";
import { process, services } from "@/lib/content";
import { img } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "End-to-end garment sourcing services: apparel sourcing, manufacturing coordination, design, product development, fabric sourcing, sampling, merchandising, production management, QA, compliance and shipping.",
  path: "/services",
  image: img.sewingMan,
});

export default function ServicesPage() {
  const servicesLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.body,
        provider: { "@id": absoluteUrl("/#organization"), name: site.name },
        areaServed: "Worldwide",
        url: absoluteUrl(`/services#${s.slug}`),
      },
    })),
  };

  return (
    <>
      <JsonLd data={[servicesLd, breadcrumbJsonLd([{ name: "Services", path: "/services" }])]} />
      <PageHero
        eyebrow="Our services"
        title="One partner. Every step of your supply chain."
        accent={["One", "Every"]}
        description="From the first design conversation to the container leaving Chattogram, we manage the details so your collections arrive right, first time."
        image={img.sewingMan}
        crumbs={[{ label: "Services" }]}
      >
        <nav aria-label="Jump to a service" className="flex max-w-3xl flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-gold-bright hover:text-gold-bright"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="container-page py-24 lg:py-32" aria-label="Service details">
        <ul className="divide-y divide-line border-y border-line">
          {services.map(({ icon: Icon, title, body, points, slug }, i) => (
            <li key={slug} id={slug} className="scroll-mt-28">
              <Reveal className="group grid gap-8 py-12 lg:grid-cols-[auto_1.1fr_1fr] lg:items-start lg:gap-16 lg:py-16">
                <span className="font-display text-2xl text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <span className="inline-flex size-14 items-center justify-center rounded-full border border-line text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                    <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 font-display text-3xl font-medium text-ink sm:text-4xl">{title}</h2>
                  <p className="mt-4 max-w-xl text-[1.0625rem] leading-8 text-muted">{body}</p>
                </div>
                <ul className="space-y-3 lg:pt-20">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-ink-soft">
                      <Check className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="grain bg-night py-24 text-white lg:py-32" aria-labelledby="process-heading">
        <div className="container-page">
          <SectionHeading
            id="process-heading"
            tone="light"
            kicker="How we work"
            title="A clear process from inquiry to delivery."
            accent={["clear"]}
          />
          <Stagger as="ol" className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {process.map((p) => (
              <StaggerItem as="li" key={p.step} className="relative border-t border-white/15 pt-8">
                <span className="absolute -top-px left-0 h-px w-16 bg-gold-bright" aria-hidden="true" />
                <span className="font-display text-5xl text-white/20">{p.step}</span>
                <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-16">
            <Link href="/contact?type=quotation" className={button("light", "lg")}>
              Start with an inquiry
            </Link>
          </Reveal>
        </div>
      </section>

      <InquiryCta image={img.port} title="Ready to streamline your next production?" />
    </>
  );
}
