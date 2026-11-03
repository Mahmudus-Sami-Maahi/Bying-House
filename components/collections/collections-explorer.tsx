"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { photo } from "@/lib/site";

export interface ExplorerStyle {
  name: string;
  image: string;
  fabric: string;
  detail: string;
  category: string;
  categoryName: string;
}

interface Props {
  styles: ExplorerStyle[];
  categories: { slug: string; short: string }[];
}

/** Filterable, animated gallery of product styles. Category is mirrored in the URL. */
export function CollectionsExplorer({ styles, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const fromUrl = params.get("category") ?? "all";
  const active = categories.some((c) => c.slug === fromUrl) ? fromUrl : "all";
  const [query, setQuery] = useState("");

  const setCategory = (slug: string) => {
    const next = new URLSearchParams(params);
    if (slug === "all") next.delete("category");
    else next.set("category", slug);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return styles.filter(
      (s) =>
        (active === "all" || s.category === active) &&
        (!q || `${s.name} ${s.fabric} ${s.detail} ${s.categoryName}`.toLowerCase().includes(q)),
    );
  }, [styles, active, query]);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0">
          {[{ slug: "all", short: "All" }, ...categories].map((c) => {
            const on = active === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(c.slug)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-[0.8125rem] font-medium transition-colors ${
                  on ? "text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {!on && <span className="absolute inset-0 rounded-full border border-line" aria-hidden="true" />}
                <span className="relative">{c.short}</span>
              </button>
            );
          })}
        </div>
        <div className="relative w-full lg:w-72">
          <label htmlFor="style-search" className="sr-only">
            Search styles and fabrics
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="style-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search styles, fabrics…"
            className="field !rounded-full !pl-11"
            autoComplete="off"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "style" : "styles"}
      </p>

      <motion.ul layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((s) => (
            <motion.li
              key={`${s.category}-${s.name}`}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <StyleCard style={s} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-12 text-center">
          <p className="font-display text-2xl text-ink">No styles match “{query}”.</p>
          <p className="mt-2 text-muted">We develop far more than we can show — tell us what you need.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:bg-surface-muted"
            >
              <X className="size-4" aria-hidden="true" /> Clear search
            </button>
            <Link href="/contact?type=quotation" className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold">
              Send an inquiry
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function StyleCard({ style: s }: { style: ExplorerStyle }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.25rem] bg-surface shadow-card transition-shadow duration-500 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
        <Image
          src={photo(s.image, 900)}
          alt={`${s.name} — ${s.fabric}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-110"
        />
        <span className="absolute top-4 left-4 rounded-full bg-surface/90 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-ink uppercase backdrop-blur">
          {s.categoryName}
        </span>
        <div className="absolute inset-x-3 bottom-3 translate-y-4 rounded-xl bg-night/85 p-4 text-white opacity-0 backdrop-blur transition-all duration-500 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-gold-bright uppercase">Construction</p>
          <p className="mt-1 text-sm">{s.detail}</p>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-xl leading-tight font-medium text-ink">
            <Link
              href={`/products/${s.category}`}
              className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-[1.25rem] focus-visible:after:outline-2 focus-visible:after:outline-gold"
            >
              {s.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">{s.fabric}</p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-gold transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
      </div>
    </article>
  );
}
