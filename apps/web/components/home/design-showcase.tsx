"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { img } from "@/lib/images";
import { photo } from "@/lib/site";

const stages = [
  {
    title: "Concept & design",
    body: "Trend research, mood boards and flat sketches shaped around your brand, customer and price architecture.",
    image: img.rackStudio,
    alt: "Curated rail of fashion garments in a design studio",
  },
  {
    title: "Fabric & trims",
    body: "Hand-feel swatches, lab dips and trim cards from certified mills — conventional, organic and recycled.",
    image: img.fabricRolls,
    alt: "Rolls of patterned fabric in a textile warehouse",
  },
  {
    title: "Pattern & sampling",
    body: "Pattern development, proto and fit samples in 7–10 days, refined through detailed fit comments.",
    image: img.pinCushion,
    alt: "Pin cushion and sewing tools used in sample making",
  },
  {
    title: "Embellishment",
    body: "Print, embroidery, washes and finishes engineered for consistent results in bulk production.",
    image: img.embroidery,
    alt: "Industrial multi-head embroidery machine with thread spools",
  },
];

/** Interactive list of development stages with a cross-fading image. */
export function DesignShowcase() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <ol className="flex flex-col" aria-label="Product development stages">
        {stages.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title} className="border-b border-white/10 first:border-t">
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={on}
                className="group flex w-full items-start gap-6 py-7 text-left"
              >
                <span className={`font-display text-xl transition-colors ${on ? "text-gold-bright" : "text-white/35"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span
                    className={`block font-display text-3xl font-medium transition-colors sm:text-4xl ${
                      on ? "text-white" : "text-white/50 group-hover:text-white/80"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-luxe)] ${
                      on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-md pt-3 text-[0.9375rem] leading-7 text-white/65">{s.body}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-night-soft sm:aspect-[4/3] lg:aspect-auto">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
            animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image
              src={photo(stages[active].image, 1400)}
              alt={stages[active].alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent p-6">
          <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-gold-bright uppercase">
            Stage {String(active + 1).padStart(2, "0")}
          </p>
          <p className="mt-1 font-display text-2xl text-white">{stages[active].title}</p>
        </div>
      </div>
    </div>
  );
}
