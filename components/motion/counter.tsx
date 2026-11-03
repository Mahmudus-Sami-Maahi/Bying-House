"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const format = (n: number) => `${n.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!inView) {
      // Reset below-the-fold counters once hydrated so they can count up later.
      if (!reduce) node.textContent = format(0);
      return;
    }
    if (reduce) {
      node.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- format is derived from stable props
  }, [inView, value, reduce]);

  // Server render shows the final figure, so crawlers and no-JS users see real numbers.
  return <span ref={ref}>{format(value)}</span>;
}
