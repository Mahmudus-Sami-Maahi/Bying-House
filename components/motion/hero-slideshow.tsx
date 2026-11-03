"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { photo } from "@/lib/site";

interface Slide {
  id: string;
  label: string;
}

/** Cinematic cross-fading hero imagery with a slow Ken Burns zoom. */
export function HeroSlideshow({ slides, interval = 6000 }: { slides: Slide[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [paused, reduce, interval, slides.length]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-night">
      <AnimatePresence initial={false}>
        <motion.div
          key={slides[index].id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6 }, scale: { duration: interval / 1000 + 1.6, ease: "linear" } }}
        >
          <Image
            src={photo(slides[index].id, 2400)}
            alt=""
            fill
            preload={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/55 to-night/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/40" />

      <div className="absolute right-5 bottom-8 z-10 flex items-center gap-3 sm:right-8 lg:right-12">
        <ul className="flex items-center gap-2" aria-label="Hero images">
          {slides.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className="group flex h-6 items-center"
              >
                <span
                  className={`block h-px transition-all duration-500 ${
                    i === index ? "w-10 bg-gold-bright" : "w-5 bg-white/40 group-hover:bg-white/80"
                  }`}
                />
                <span className="sr-only">Show image: {s.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="text-[0.65rem] font-semibold tracking-[0.2em] text-white/60 uppercase hover:text-white"
        >
          {paused ? "Play" : "Pause"}
          <span className="sr-only"> slideshow</span>
        </button>
      </div>
    </div>
  );
}
