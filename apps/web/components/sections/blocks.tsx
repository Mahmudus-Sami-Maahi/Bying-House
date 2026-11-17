import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { stats } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";
import { AnimatedHeading } from "../motion/animated-heading";
import { Counter } from "../motion/counter";
import { ParallaxImage } from "../motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { button, eyebrow, eyebrowLight, lead } from "../ui";

/* ------------------------------ Section heading ----------------------------- */

export function SectionHeading({
  kicker,
  title,
  accent,
  description,
  align = "left",
  tone = "dark",
  id,
  className = "",
}: {
  kicker: string;
  title: string;
  accent?: string[];
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <Reveal y={12}>
        <p className={tone === "light" ? eyebrowLight : eyebrow}>{kicker}</p>
      </Reveal>
      <AnimatedHeading
        id={id}
        text={title}
        accent={accent}
        accentClassName={tone === "light" ? "text-gold-bright" : "text-gold"}
        className={`mt-5 font-display text-4xl leading-[1.05] font-medium tracking-[-0.015em] sm:text-5xl lg:text-[3.5rem] ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      />
      {description && (
        <Reveal delay={0.2}>
          <p className={`mt-6 ${tone === "light" ? "text-lg leading-8 text-white/70" : lead}`}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}

/* -------------------------------- Feature grid ------------------------------ */

export function FeatureGrid({
  items,
  columns = 3,
  tone = "dark",
  numbered = false,
}: {
  items: { icon: LucideIcon; title: string; body: string }[];
  columns?: 2 | 3 | 4;
  tone?: "dark" | "light";
  numbered?: boolean;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  const light = tone === "light";
  return (
    <Stagger
      as="ul"
      className={`grid gap-px overflow-hidden rounded-2xl border ${cols} ${
        light ? "border-white/10 bg-white/10" : "border-line bg-line"
      }`}
    >
      {items.map(({ icon: Icon, title, body }, i) => (
        <StaggerItem
          as="li"
          key={title}
          className={`group relative p-8 transition-colors duration-500 lg:p-10 ${
            light ? "bg-night hover:bg-night-soft" : "bg-surface hover:bg-canvas"
          }`}
        >
          <div className="flex items-start justify-between">
            <span
              className={`inline-flex size-14 items-center justify-center rounded-full border transition-colors duration-500 ${
                light
                  ? "border-white/15 text-gold-bright group-hover:border-gold-bright"
                  : "border-line text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-white"
              }`}
            >
              <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
            </span>
            {numbered && (
              <span className={`font-display text-2xl ${light ? "text-white/25" : "text-ink/20"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
          </div>
          <h3 className={`mt-7 text-lg font-semibold ${light ? "text-white" : "text-ink"}`}>{title}</h3>
          <p className={`mt-3 text-[0.9375rem] leading-7 ${light ? "text-white/65" : "text-muted"}`}>{body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* --------------------------------- Stats band -------------------------------- */

export function StatsBand({ tone = "light" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <Stagger as="ul" className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
      {stats.map((s) => (
        <StaggerItem as="li" key={s.label} className={`border-t pt-6 ${light ? "border-white/15" : "border-line"}`}>
          <p
            className={`font-display text-5xl font-medium tracking-tight tabular-nums sm:text-6xl ${
              light ? "text-white" : "text-ink"
            }`}
          >
            <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
          </p>
          <p className={`mt-3 text-sm font-semibold tracking-wide ${light ? "text-gold-bright" : "text-gold"}`}>
            {s.label}
          </p>
          <p className={`mt-1 text-sm ${light ? "text-white/55" : "text-muted"}`}>{s.detail}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------------------------------- Marquee ---------------------------------- */

export function Marquee({ items, tone = "dark", label }: { items: string[]; tone?: "dark" | "light"; label: string }) {
  const row = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${
        tone === "light" ? "text-white/80" : "text-ink/70"
      }`}
    >
      <p className="sr-only">
        {label}: {items.join(", ")}
      </p>
      <ul
        aria-hidden="true"
        className="flex w-max animate-[marquee_40s_linear_infinite] items-center gap-12 hover:[animation-play-state:paused]"
      >
        {row.map((item, i) => (
          <li key={`${item}-${i}`} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-3xl italic sm:text-4xl">{item}</span>
            <span className="size-1.5 rounded-full bg-gold" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------- Inquiry CTA -------------------------------- */

export function InquiryCta({
  title = "Let's build your next collection together.",
  description = "Share your tech pack, target price and quantities. Our team replies within one business day with costing, factory recommendations and a sampling plan.",
  image,
}: {
  title?: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="container-page py-24 lg:py-32" aria-label="Start an inquiry">
      <div className="grain relative isolate overflow-hidden rounded-[2rem] bg-night px-6 py-16 text-white sm:px-12 lg:px-20 lg:py-24">
        <ParallaxImage id={image} alt="" className="absolute inset-0 -z-10 opacity-35" strength={20} sizes="(min-width: 1344px) 1300px, 100vw" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/85 to-night/40" />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-24 -z-10 size-[28rem] animate-[drift_18s_ease-in-out_infinite] rounded-full bg-gold/25 blur-3xl"
        />
        <div className="max-w-2xl">
          <p className={eyebrowLight}>Start a partnership</p>
          <AnimatedHeading
            text={title}
            accent={["together", "next"]}
            className="mt-5 font-display text-4xl leading-[1.05] font-medium tracking-[-0.015em] sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-8 text-white/70">{description}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact?type=quotation" className={button("light", "lg")}>
              Request a quotation
              <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
            </Link>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={button("outlineLight", "lg")}>
              <MessageCircle className="size-4" aria-hidden="true" />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Image + text split ---------------------------- */

export function Split({
  image,
  imageAlt,
  reverse = false,
  children,
  badge,
}: {
  image: string;
  imageAlt: string;
  reverse?: boolean;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal className={`relative ${reverse ? "lg:order-2" : ""}`}>
        <ParallaxImage
          id={image}
          alt={imageAlt}
          className="aspect-[4/5] rounded-[1.75rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
        {badge}
      </Reveal>
      <div>{children}</div>
    </div>
  );
}
