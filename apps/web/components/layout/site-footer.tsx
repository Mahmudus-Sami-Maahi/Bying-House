import { cacheLife } from "next/cache";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { categories } from "@/lib/catalog";
import { site, whatsappUrl } from "@/lib/site";
import { Logo } from "../brand/logo";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const company = [
  { href: "/about", label: "About Us" },
  { href: "/managing-director", label: "Managing Director" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/partnerships", label: "Global Partnerships" },
  { href: "/contact", label: "Contact" },
];

const expertise = [
  { href: "/services", label: "Services" },
  { href: "/custom-design", label: "Design & Development" },
  { href: "/manufacturing", label: "Manufacturing & Quality" },
  { href: "/contact?type=sample", label: "Request a Sample" },
  { href: "/contact?type=quotation", label: "Request a Quotation" },
];

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden bg-night text-white">
      <div className="container-page pt-20 pb-10">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-3xl font-display text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
            Reliable apparel sourcing,
            <span className="text-gold-bright italic"> from Bangladesh to the world.</span>
          </p>
          <Link
            href="/contact"
            className="group inline-flex size-36 shrink-0 items-center justify-center rounded-full border border-white/20 text-center text-sm font-semibold tracking-wide transition-colors duration-500 hover:border-gold-bright hover:bg-gold-bright hover:text-night"
          >
            <span>
              Start a <br /> project
              <ArrowUpRight className="mx-auto mt-1 size-5 transition-transform group-hover:rotate-45" aria-hidden="true" />
            </span>
          </Link>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-6 text-sm leading-7 text-white/60">{site.description}</p>
          </div>

          <FooterColumn title="Company" links={company} />
          <FooterColumn title="Expertise" links={expertise} />

          <div>
            <h2 className="text-xs font-semibold tracking-[0.24em] text-gold-bright uppercase">Head office</h2>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-bright" aria-hidden="true" />
                <address className="not-italic">
                  {site.address.lines.join(", ")}
                  <br />
                  {site.address.city}-{site.address.postalCode}, {site.address.country}
                </address>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-bright" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-bright" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  {site.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-white">
                      {p.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold-bright" aria-hidden="true" />
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp Business<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <h2 className="sr-only">Collections</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-2 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © <CopyrightYear /> {site.legalName}. All rights reserved.
            </p>
            <p>Garments Buying House · Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-semibold tracking-[0.24em] text-gold-bright uppercase">{title}</h2>
      <ul className="mt-6 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
