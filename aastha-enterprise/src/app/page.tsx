import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Services from "@/components/home/Services";
import FeaturedProject from "@/components/home/FeaturedProject";
import Metrics from "@/components/home/Metrics";
import ClientWall from "@/components/home/ClientWall";
import CtaBand from "@/components/home/CtaBand";
import ContactSplit from "@/components/home/ContactSplit";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Homepage — 8 sections, surface rhythm locked (design system §3):
 * bone → bone → bone → charcoal → stone → bone → charcoal → split
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Services />
      <FeaturedProject />
      <Metrics />
      <ClientWall />
      <CtaBand />
      <ContactSplit />
    </main>
  );
}
