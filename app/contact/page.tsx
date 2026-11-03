import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Suspense } from "react";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { button } from "@/components/ui";
import { categories } from "@/lib/catalog";
import { img } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { mapsQuery, site, whatsappUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact & Inquiry",
  description: `Request a quotation, request a sample or start a sourcing partnership with ${site.name}. Email ${site.email}, call ${site.phones[0].display} or message us on WhatsApp.`,
  path: "/contact",
  image: img.shirtsTable,
});

export default function ContactPage() {
  const formCategories = categories.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact & inquiry"
        title="Let's talk about your next collection."
        accent={["next", "collection."]}
        description="Tell us what you are developing. Our team replies to every inquiry within one business day — with questions, costing or a sampling plan."
        image={img.shirtsTable}
        crumbs={[{ label: "Contact" }]}
      />

      <section className="container-page py-20 lg:py-28" aria-label="Inquiry form and contact details">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
          <Reveal className="rounded-[2rem] border border-line bg-surface p-6 shadow-card sm:p-10 lg:p-12">
            <h2 className="font-display text-4xl font-medium text-ink">Send an inquiry</h2>
            <p className="mt-2 mb-10 text-muted">All fields are required unless marked optional.</p>
            <Suspense fallback={<div className="h-[44rem] animate-pulse rounded-2xl bg-surface-muted" aria-hidden="true" />}>
              <InquiryForm categories={formCategories} />
            </Suspense>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1} className="grain relative overflow-hidden rounded-[2rem] bg-night p-8 text-white sm:p-10">
              <h2 className="text-xs font-semibold tracking-[0.24em] text-gold-bright uppercase">Head office</h2>
              <ul className="mt-8 space-y-6">
                <ContactRow icon={MapPin} label="Address">
                  <address className="not-italic">
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    {site.address.city}-{site.address.postalCode}, {site.address.country}
                  </address>
                </ContactRow>
                <ContactRow icon={Mail} label="Email">
                  <a href={`mailto:${site.email}`} className="block hover:text-gold-bright">
                    {site.email}
                  </a>
                  <a href={`mailto:${site.altEmail}`} className="block text-white/60 hover:text-gold-bright">
                    {site.altEmail}
                  </a>
                </ContactRow>
                <ContactRow icon={Phone} label="Phone">
                  {site.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-gold-bright">
                      {p.display}
                    </a>
                  ))}
                </ContactRow>
                <ContactRow icon={Clock} label="Office hours">
                  {site.hours}
                </ContactRow>
              </ul>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={button("light", "lg", "mt-10 w-full")}
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Chat on WhatsApp Business
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Reveal>

            <Reveal delay={0.2} className="rounded-[2rem] border border-line bg-surface p-8">
              <p className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">Managing Director</p>
              <p className="mt-3 font-display text-2xl text-ink">
                {site.md.name} ({site.md.nickname})
              </p>
              <p className="mt-1 text-sm text-muted">
                For partnership discussions, contact our Managing Director directly at{" "}
                <a href={`mailto:${site.md.email}`} className="font-medium text-gold hover:underline">
                  {site.md.email}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-page pb-24" aria-labelledby="map-heading">
        <h2 id="map-heading" className="sr-only">
          Office location map
        </h2>
        <Reveal className="overflow-hidden rounded-[2rem] border border-line bg-surface-muted shadow-card">
          <iframe
            title={`Map showing the ${site.name} office in DOHS Baridhara, Dhaka`}
            src={`https://www.google.com/maps?q=${mapsQuery}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[420px] w-full grayscale-[0.4]"
          />
        </Reveal>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-semibold text-gold hover:underline"
        >
          Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-gold-bright">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs tracking-wide text-white/50">{label}</p>
        <div className="mt-1 text-[0.9375rem] leading-7 text-white/90">{children}</div>
      </div>
    </li>
  );
}
