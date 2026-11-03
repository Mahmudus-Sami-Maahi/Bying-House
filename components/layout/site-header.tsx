"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { site, whatsappUrl } from "@/lib/site";
import { Logo } from "../brand/logo";
import { button } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const companyRef = useRef<HTMLLIElement>(null);

  // Close menus whenever the route changes (routes stay mounted under Activity).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setCompanyOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!companyOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!companyRef.current?.contains(e.target as Node)) setCompanyOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCompanyOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [companyOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const solid = scrolled && !menuOpen;
  const linkTone = solid ? "text-ink-soft hover:text-ink" : "text-white/80 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? "bg-canvas/85 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Logo tone={solid ? "dark" : "light"} className="relative z-10" />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              "children" in item ? (
                <li key={item.label} ref={companyRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={companyOpen}
                    aria-controls="company-menu"
                    onClick={() => setCompanyOpen((o) => !o)}
                    className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors ${
                      item.children.some((c) => isActive(pathname, c.href)) ? (solid ? "text-ink" : "text-white") : linkTone
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-300 ${companyOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence>
                    {companyOpen && (
                      <motion.div
                        id="company-menu"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25, ease }}
                        className="absolute top-full left-0 mt-3 w-80 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-lift"
                      >
                        <ul>
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                aria-current={isActive(pathname, c.href) ? "page" : undefined}
                                className="group flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-canvas aria-[current=page]:bg-canvas"
                              >
                                <span>
                                  <span className="block text-sm font-semibold text-ink">{c.label}</span>
                                  <span className="mt-0.5 block text-xs text-muted">{c.description}</span>
                                </span>
                                <ArrowUpRight
                                  className="mt-0.5 size-4 text-gold opacity-0 transition-opacity group-hover:opacity-100"
                                  aria-hidden="true"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={`relative inline-flex rounded-full px-4 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 ${
                      isActive(pathname, item.href) ? (solid ? "text-ink" : "text-white") : linkTone
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <Link
            href="/contact?type=quotation"
            className={button(solid ? "primary" : "light", "sm", "max-sm:hidden")}
          >
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors xl:hidden ${
              solid ? "border-line text-ink hover:bg-surface-muted" : "border-white/25 text-white hover:bg-white/10"
            }`}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 -z-0 overflow-y-auto bg-night pt-24 text-white xl:hidden"
          >
            <nav aria-label="Mobile" className="container-page pb-12">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } } }}
                className="divide-y divide-white/10 border-y border-white/10"
              >
                {nav
                  .flatMap<{ href: string; label: string }>((item) => ("children" in item ? [...item.children] : [item]))
                  .map((item) => (
                    <motion.li
                      key={item.href}
                      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className="group flex items-center justify-between py-4 font-display text-3xl text-white/90 aria-[current=page]:text-gold-bright sm:text-4xl"
                      >
                        {item.label}
                        <ArrowUpRight
                          className="size-6 text-white/30 transition group-hover:text-gold-bright"
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
                className="mt-10 grid gap-4 text-sm text-white/70 sm:grid-cols-3"
              >
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="size-4 text-gold-bright" aria-hidden="true" />
                  {site.email}
                </a>
                <a href={`tel:${site.phones[0].tel}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="size-4 text-gold-bright" aria-hidden="true" />
                  {site.phones[0].display}
                </a>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <MessageCircle className="size-4 text-gold-bright" aria-hidden="true" />
                  WhatsApp us
                </a>
              </motion.div>
              <Link
                href="/contact?type=quotation"
                onClick={() => setMenuOpen(false)}
                className={button("light", "lg", "mt-10 w-full sm:hidden")}
              >
                Request a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
