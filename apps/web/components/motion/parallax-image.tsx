"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { photo } from "@/lib/site";

interface Props {
  id: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Total vertical travel as a percentage of the frame height. */
  strength?: number;
  preload?: boolean;
  width?: number;
}

/** Image that drifts slower than the page for a subtle depth effect. */
export function ParallaxImage({
  id,
  alt,
  className = "",
  sizes = "100vw",
  strength = 14,
  preload = false,
  width = 1800,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}%`, `${strength / 2}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
        <Image src={photo(id, width)} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </motion.div>
    </div>
  );
}
