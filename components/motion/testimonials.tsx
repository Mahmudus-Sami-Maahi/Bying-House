"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  company: string;
}

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [hover, setHover] = useState(false);

  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => (i + delta + items.length) % items.length);
  };

  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % items.length);
    }, 7000);
    return () => clearInterval(t);
  }, [hover, items.length]);

  const t = items[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Quote className="size-14 text-gold-bright/60" strokeWidth={1} aria-hidden="true" />
      <div className="relative mt-6 min-h-[15rem] overflow-hidden sm:min-h-[12rem]" aria-live="polite">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-display text-2xl leading-snug font-medium text-white sm:text-3xl lg:text-[2.35rem]">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 text-sm">
              <span className="font-semibold tracking-wide text-white">{t.name}</span>
              <span className="text-white/60"> — {t.company}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex items-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="inline-flex size-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold-bright hover:text-gold-bright"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          <span className="sr-only">Previous testimonial</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="inline-flex size-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold-bright hover:text-gold-bright"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
          <span className="sr-only">Next testimonial</span>
        </button>
        <span className="ml-2 font-display text-lg text-white/60 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
