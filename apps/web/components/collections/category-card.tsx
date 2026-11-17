import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/catalog";
import { photo } from "@/lib/site";

export function CategoryCard({
  category,
  index,
  className = "",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  category: Category;
  index?: number;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className={`group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-night p-7 text-white ${className}`}
    >
      <Image
        src={photo(category.cover, 1200)}
        alt={`${category.name} sourced and manufactured by MetaMax Fashions`}
        fill
        sizes={sizes}
        className="-z-10 object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-110"
      />
      <span className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/30 to-transparent transition-opacity duration-700 group-hover:from-night" />
      {index != null && (
        <span className="absolute top-6 left-7 font-display text-lg text-white/70">{String(index + 1).padStart(2, "0")}</span>
      )}
      <span className="absolute top-6 right-6 inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-bright group-hover:bg-gold-bright group-hover:text-night">
        <ArrowUpRight className="size-5" aria-hidden="true" />
      </span>
      <h3 className="font-display text-3xl leading-tight font-medium">{category.name}</h3>
      <p className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[var(--ease-luxe)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
        <span className="overflow-hidden">
          <span className="block pt-3 text-sm leading-6 text-white/75">{category.tagline}</span>
        </span>
      </p>
      <span className="mt-4 flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.2em] text-gold-bright uppercase">
        MOQ {category.moq.replace(" per style", "")}
        <span className="h-px w-6 bg-gold-bright/60" />
        {category.leadTime}
      </span>
    </Link>
  );
}
