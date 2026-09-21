import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { site } from "@/lib/site";
import { libreCaslonText, pontanoSans, plexMono } from "@/lib/fonts";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import MobileDock from "@/components/layout/MobileDock";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // ≤65 chars so Google doesn't truncate it (audit item, was 89)
  title: "Aluminium & Glazing Contractor in Vadodara | Aastha Enterprise",
  description:
    "25 years of aluminium sections, structural glazing, furniture and interior work in Vadodara, Gujarat. Trusted by L&T, Saint-Gobain, Zydus and 25+ more clients.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180x180.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.descriptor}, ${site.address.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "48L0CnqXuSuHGJglET05qLxBSlTVrLYCHPcg943tvP4",
    other: {
      "msvalidate.01": "83A44D20A3FDB9A85ABEA2EFAB30566F",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#26241F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${libreCaslonText.variable} ${pontanoSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HL8QQQMH1E"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HL8QQQMH1E');
          `}
        </Script>
        <LocalBusinessJsonLd />
        <SmoothScroll>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <MobileDock />
        </SmoothScroll>
      </body>
    </html>
  );
}
