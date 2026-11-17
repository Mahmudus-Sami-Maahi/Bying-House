/* Shared class recipes so buttons and labels look identical everywhere. */

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-wide transition-all duration-300 ease-[var(--ease-luxe)] disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-ink text-white hover:bg-gold",
  gold: "bg-gold text-white hover:bg-ink",
  light: "bg-white text-ink hover:bg-gold-bright hover:text-night",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  outlineLight: "border border-white/30 text-white hover:border-white hover:bg-white hover:text-night",
} as const;

const sizes = {
  sm: "h-10 px-5 text-[0.8125rem]",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-8 text-[0.9375rem]",
} as const;

export function button(
  variant: keyof typeof variants = "primary",
  size: keyof typeof sizes = "md",
  extra = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

export const eyebrow =
  "inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold before:h-px before:w-8 before:bg-current";
export const eyebrowLight =
  "inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold-bright before:h-px before:w-8 before:bg-current";
export const displayXL =
  "font-display text-5xl leading-[0.98] font-medium tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl xl:text-[5.5rem]";
export const displayL = "font-display text-4xl leading-[1.04] font-medium tracking-[-0.015em] text-balance sm:text-5xl lg:text-6xl";
export const displayM = "font-display text-3xl leading-tight font-medium tracking-[-0.01em] text-balance sm:text-4xl";
export const lead = "text-lg leading-8 text-muted";
export const label = "mb-1.5 block text-[0.8125rem] font-medium text-ink-soft";
