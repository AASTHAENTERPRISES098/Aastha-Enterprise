import type { Metadata } from "next";
import { boska, generalSans, plexMono } from "@/lib/fonts";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import MobileDock from "@/components/layout/MobileDock";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Aastha Enterprise — Aluminium, Glazing, Furniture & Interior Contractors, Vadodara",
  description:
    "25 years of aluminium sections, structural glazing, furniture and interior work in Vadodara, Gujarat. Trusted by L&T, Saint-Gobain, Zydus and 25+ more clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${boska.variable} ${generalSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
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
