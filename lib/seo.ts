import type { Metadata } from "next";
import { absoluteUrl, photo, site } from "./site";

/** Per-page metadata with consistent canonical, Open Graph and Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const images = image ? [{ url: photo(image, 1200), width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", title: `${title} | ${site.name}`, description, url: path, images },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: images?.map((i) => i.url) },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    email: site.email,
    telephone: site.phones[0].tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    founder: { "@type": "Person", name: site.md.name, jobTitle: site.md.title },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.phones[0].tel,
        availableLanguage: ["English", "Bengali"],
        areaServed: "Worldwide",
      },
    ],
    knowsAbout: ["Apparel sourcing", "Garment manufacturing", "Product development", "Quality assurance", "Textile compliance"],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
