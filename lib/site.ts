/*
 * Company details (from the MetaMax Fashions business card). Every page reads
 * contact information from here, so updates happen in one place.
 */
export const site = {
  name: "MetaMax Fashions",
  shortName: "MetaMax",
  legalName: "MetaMax Fashions",
  tagline: "Reliable apparel sourcing from Bangladesh to the world.",
  description:
    "MetaMax Fashions is a Dhaka-based garments buying house delivering apparel sourcing, product development, production management and quality assurance for international brands, retailers and importers.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.metamaxfashions.com").replace(/\/$/, ""),
  email: "paris@metamaxfashions.com",
  altEmail: "paris.english09@gmail.com",
  phones: [
    { display: "+880 1712-803762", tel: "+8801712803762" },
    { display: "+880 1612-803762", tel: "+8801612803762" },
  ],
  whatsapp: "8801712803762",
  address: {
    lines: ["House #285, Road #4, Flat-2", "DOHS Baridhara"],
    street: "House #285, Road #4, Flat-2, DOHS Baridhara",
    city: "Dhaka",
    postalCode: "1206",
    country: "Bangladesh",
    countryCode: "BD",
  },
  hours: "Sunday – Thursday, 9:00 – 18:00 (GMT+6)",
  md: {
    name: "Md. Shahinoor Rahman",
    nickname: "Paris",
    title: "Managing Director",
    email: "paris@metamaxfashions.com",
    /** Drop a portrait into /public (e.g. /images/md-portrait.jpg) and set its path here. */
    portrait: null as string | null,
  },
} as const;

export const whatsappUrl = (text = "Hello MetaMax Fashions, I would like to discuss a sourcing inquiry.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapsQuery = encodeURIComponent(
  `House 285, Road 4, DOHS Baridhara, Dhaka 1206, Bangladesh`,
);

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Unsplash CDN URL for a photo id. next/image handles responsive resizing. */
export function photo(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}
