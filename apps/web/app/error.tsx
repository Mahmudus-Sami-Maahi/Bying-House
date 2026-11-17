"use client";

import Link from "next/link";
import { useEffect } from "react";
import { button } from "@/components/ui";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    // Hook up your error reporting service here.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center bg-night text-white">
      <div className="container-page pt-32 pb-20">
        <h1 className="font-display text-5xl font-medium sm:text-6xl">Something went wrong.</h1>
        <p className="mt-5 max-w-lg text-white/70">
          We couldn&apos;t load this page. Please try again — if the problem continues, contact our team.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={() => retry()} className={button("light", "lg")}>
            Try again
          </button>
          <Link href="/contact" className={button("outlineLight", "lg")}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
