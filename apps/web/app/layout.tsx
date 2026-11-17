import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { IntroLoader, introScript } from "@/components/motion/intro-loader";
import { MotionProvider } from "@/components/motion/reveal";
import { organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const defaultTitle = `${site.name} — Garments Buying House & Apparel Sourcing in Bangladesh`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "garments buying house",
    "buying house Bangladesh",
    "apparel sourcing Bangladesh",
    "clothing manufacturer Bangladesh",
    "private label clothing",
    "OEM apparel manufacturing",
    "knitwear sourcing",
    "denim manufacturing",
    "garment sourcing agent Dhaka",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: defaultTitle,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0c1015",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks first-visit sessions before paint so the intro curtain never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-[110] rounded-full bg-ink px-5 py-2.5 text-sm text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <IntroLoader />
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
