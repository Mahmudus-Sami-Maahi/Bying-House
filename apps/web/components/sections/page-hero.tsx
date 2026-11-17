import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedHeading } from "../motion/animated-heading";
import { ParallaxImage } from "../motion/parallax-image";
import { Reveal } from "../motion/reveal";
import { eyebrowLight } from "../ui";

interface Props {
  eyebrow: string;
  title: string;
  accent?: string[];
  description: string;
  image: string;
  imageAlt?: string;
  crumbs: { href?: string; label: string }[];
  children?: React.ReactNode;
}

/** Cinematic dark hero used at the top of every inner page. */
export function PageHero({ eyebrow, title, accent, description, image, imageAlt = "", crumbs, children }: Props) {
  return (
    <section className="grain relative isolate overflow-hidden bg-night text-white">
      <ParallaxImage id={image} alt={imageAlt} preload strength={18} className="absolute inset-0 -z-10 opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-night/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-transparent to-transparent" />

      <div className="container-page flex min-h-[560px] flex-col justify-end pt-36 pb-16 sm:min-h-[620px] lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs tracking-wide text-white/60">
            {[{ href: "/", label: "Home" }, ...crumbs].map((c, i, arr) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {c.href && i < arr.length - 1 ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/90">
                    {c.label}
                  </span>
                )}
                {i < arr.length - 1 && <ChevronRight className="size-3" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </nav>
        <Reveal y={12}>
          <p className={eyebrowLight}>{eyebrow}</p>
        </Reveal>
        <AnimatedHeading
          as="h1"
          immediate
          delay={0.15}
          text={title}
          accent={accent}
          className="mt-6 max-w-4xl font-display text-5xl leading-[1] font-medium tracking-[-0.02em] sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.5} className="mt-7 max-w-2xl">
          <p className="text-lg leading-8 text-white/75">{description}</p>
        </Reveal>
        {children && (
          <Reveal delay={0.65} className="mt-9">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
