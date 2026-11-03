import type { Metadata } from "next";
import Link from "next/link";
import { button, eyebrowLight } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 size-[30rem] animate-[drift_18s_ease-in-out_infinite] rounded-full bg-gold/20 blur-3xl"
      />
      <div className="container-page relative pt-32 pb-20">
        <p className={eyebrowLight}>Error 404</p>
        <h1 className="mt-6 max-w-3xl font-display text-6xl leading-[1] font-medium sm:text-7xl">
          This page is out of <span className="text-gold-bright italic">stock.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/70">
          The link may be outdated or the page has moved. Explore our collections or get in touch with our team.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/products" className={button("light", "lg")}>
            View collections
          </Link>
          <Link href="/" className={button("outlineLight", "lg")}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
