import { Mail, MessageCircle, Phone, Quote } from "lucide-react";
import Image from "next/image";
import { LogoMark } from "@/components/brand/logo";
import { JsonLd } from "@/components/json-ld";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { InquiryCta, SectionHeading } from "@/components/sections/blocks";
import { eyebrowLight } from "@/components/ui";
import { mdMessage } from "@/lib/content";
import { img } from "@/lib/images";
import { absoluteUrl, site, whatsappUrl } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${site.md.name}, Managing Director`,
  description: `A message from ${site.md.name} (${site.md.nickname}), Managing Director of ${site.name}, on leadership, quality and the future of international apparel sourcing from Bangladesh.`,
  path: "/managing-director",
  image: img.sewingFactory,
});

export default function ManagingDirectorPage() {
  const { md } = site;
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: md.name,
    alternateName: md.nickname,
    jobTitle: md.title,
    email: `mailto:${md.email}`,
    worksFor: { "@id": absoluteUrl("/#organization"), name: site.name },
    url: absoluteUrl("/managing-director"),
  };

  return (
    <>
      <JsonLd data={[personLd, breadcrumbJsonLd([{ name: "Managing Director", path: "/managing-director" }])]} />

      {/* Executive hero */}
      <section className="grain relative isolate overflow-hidden bg-night pt-32 pb-20 text-white lg:pt-40 lg:pb-28">
        <div
          aria-hidden="true"
          className="absolute -top-40 right-0 -z-10 size-[40rem] animate-[drift_20s_ease-in-out_infinite] rounded-full bg-gold/20 blur-3xl"
        />
        <div className="container-page grid items-end gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-night-soft">
              {md.portrait ? (
                <Image src={md.portrait} alt={`Portrait of ${md.name}`} fill preload sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              ) : (
                // Elegant placeholder until the official portrait is supplied (see lib/site.ts → md.portrait).
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-night-soft via-night to-[#1d1912]">
                  <LogoMark className="size-28 text-gold-bright/80" />
                  <p className="mt-8 font-display text-5xl tracking-[0.08em] text-white/90">{md.nickname}</p>
                  <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-gold-bright uppercase">{md.title}</p>
                </div>
              )}
            </div>
            <div className="absolute -right-3 -bottom-6 rounded-2xl bg-gold px-6 py-4 text-night shadow-lift sm:-right-8">
              <p className="text-[0.65rem] font-bold tracking-[0.24em] uppercase">Leadership</p>
              <p className="font-display text-xl font-semibold">{site.name}</p>
            </div>
          </Reveal>

          <div>
            <Reveal y={12}>
              <p className={eyebrowLight}>Managing Director</p>
            </Reveal>
            <AnimatedHeading
              as="h1"
              immediate
              delay={0.15}
              text={`${md.name}`}
              className="mt-6 font-display text-5xl leading-[1] font-medium tracking-[-0.02em] sm:text-6xl lg:text-7xl"
            />
            <Reveal delay={0.4}>
              <p className="mt-4 font-display text-2xl text-gold-bright italic">“{md.nickname}” · {md.title}</p>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/75">
                As Managing Director, {md.name} leads {site.name}&apos;s strategy, client partnerships and production
                standards — personally overseeing relationships with international buyers and the factory network that
                serves them.
              </p>
            </Reveal>
            <Reveal delay={0.55} className="mt-10 flex flex-wrap gap-3 text-sm">
              <a href={`mailto:${md.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 hover:border-gold-bright hover:text-gold-bright">
                <Mail className="size-4" aria-hidden="true" /> {md.email}
              </a>
              <a href={`tel:${site.phones[0].tel}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 hover:border-gold-bright hover:text-gold-bright">
                <Phone className="size-4" aria-hidden="true" /> {site.phones[0].display}
              </a>
              <a href={whatsappUrl(`Hello ${md.nickname}, I would like to discuss a sourcing partnership.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 hover:border-gold-bright hover:text-gold-bright">
                <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Message */}
      <section className="container-page py-24 lg:py-36" aria-labelledby="message-heading">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <Quote className="size-14 text-gold" strokeWidth={1} aria-hidden="true" />
            <h2 id="message-heading" className="sr-only">
              Leadership message
            </h2>
            <p className="mt-6 font-display text-3xl leading-snug font-medium text-ink sm:text-4xl lg:text-5xl">
              {mdMessage.headline}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 text-lg leading-8 text-ink-soft md:grid-cols-2 md:gap-x-12">
            {mdMessage.paragraphs.map((p, i) => (
              <Reveal key={p.slice(0, 20)} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 flex items-center gap-5 border-t border-line pt-8">
            <span className="font-display text-4xl text-ink italic">{md.nickname}</span>
            <span className="h-10 w-px bg-line" />
            <span>
              <span className="block font-semibold text-ink">{md.name}</span>
              <span className="text-sm text-muted">
                {md.title}, {site.name}
              </span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="grain bg-night py-24 text-white lg:py-32" aria-labelledby="vision-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            id="vision-heading"
            tone="light"
            kicker="Vision for international sourcing"
            title="Where we are going, together."
            accent={["together."]}
          />
          <Reveal delay={0.15}>
            <p className="font-display text-3xl leading-snug sm:text-4xl">{mdMessage.vision}</p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container-page py-24 lg:py-36" aria-labelledby="philosophy-heading">
        <SectionHeading
          id="philosophy-heading"
          kicker="Leadership philosophy"
          title="Four principles that guide every decision."
          accent={["principles"]}
          align="center"
        />
        <Stagger as="ol" className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mdMessage.philosophy.map((p, i) => (
            <StaggerItem as="li" key={p.title} className="rounded-[1.5rem] border border-line bg-surface p-8 shadow-card">
              <span className="font-display text-5xl text-gold/60">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-2xl font-medium text-ink">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <InquiryCta
        image={img.sewingFactory}
        title="Meet our team in Dhaka — or online."
        description="Schedule a video meeting or a visit to our office and partner factories. We will tailor the agenda to your product categories."
      />
    </>
  );
}
