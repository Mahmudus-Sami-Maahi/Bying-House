import Link from "next/link";
import { site } from "@/lib/site";

/**
 * "MMF" monogram in a ring, redrawn from the business card. Replace with the
 * official vector logo file when available.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="50" cy="50" r="44" strokeWidth="5.5" />
      <path
        d="M23 54V29l9.5 14L42 29v25M58 54V29l9.5 14L77 29v25M43 80V60h15M43 70h11"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={`group inline-flex items-center gap-3 ${className}`}>
      <LogoMark
        className={`size-10 shrink-0 transition-transform duration-500 group-hover:rotate-[8deg] ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[1.15rem] font-extrabold tracking-[-0.01em] ${tone === "light" ? "text-white" : "text-ink"}`}
        >
          MetaMax
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold tracking-[0.42em] uppercase ${
            tone === "light" ? "text-gold-bright" : "text-gold"
          }`}
        >
          Fashions
        </span>
      </span>
    </Link>
  );
}
