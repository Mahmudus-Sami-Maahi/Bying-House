"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface Props {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  /** Words to render in the italic accent style. */
  accent?: string[];
  delay?: number;
  /** Animate on mount (heroes) instead of when scrolled into view. */
  immediate?: boolean;
  accentClassName?: string;
  id?: string;
}

/**
 * Word-by-word masked reveal. The full sentence stays in the DOM as a single
 * accessible string; the animated spans are hidden from assistive tech.
 */
export function AnimatedHeading({
  text,
  as = "h2",
  className,
  accent = [],
  delay = 0,
  immediate = false,
  accentClassName = "text-gold-bright",
  id,
}: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  const strip = (w: string) => w.replace(/[.,!?—]/g, "");
  const accents = new Set(accent.map(strip));
  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-10% 0px" } };

  return (
    <Tag
      id={id}
      className={className}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const isAccent = accents.has(strip(word));
          return (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${isAccent ? `font-medium italic ${accentClassName}` : ""}`}
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease } },
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
