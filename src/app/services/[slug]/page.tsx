import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import RippleButton from "@/components/ui/RippleButton";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import RelatedServices from "@/components/shared/RelatedServices";
import CtaBand from "@/components/home/CtaBand";
import { ServiceJsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return site.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = site.services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} in ${site.address.city} | ${site.name}`,
    description: `${service.short} Trusted by L&T, Saint-Gobain and Zydus — engineer-led, GST-billed work in ${site.address.city}.`,
  };
}

/**
 * Spec bullets are the verified `service.short` facts split into a list —
 * nothing invented beyond what's already in site.ts. FAQ answers stay
 * generic/verified until Hitesh reviews per-service detail.
 */
const SPECS: Record<string, string[]> = {
  "aluminium-windows-doors": [
    "Sliding & openable windows",
    "Doors & partitions",
    "Sections & profiles",
  ],
  "structural-glazing-curtain-wall": [
    "Structural glazing",
    "Curtain walls",
    "Spider glass & façades",
  ],
  furniture: [
    "Office furniture & workstations",
    "Modular kitchens",
    "Custom interiors",
  ],
  "false-ceiling-interior": [
    "POP & false ceilings",
    "Blinds",
    "SS railing & finishing",
  ],
};

const FAQS = [
  {
    q: "Do you provide installation and after-sales support?",
    a: "Yes. Our in-house teams handle measurement, fabrication and installation, with GST-billed invoicing and after-sales support.",
  },
  {
    q: "Do you take on both institutional and residential projects?",
    a: `Yes — the same engineer-led team serves institutional clients like L&T and Saint-Gobain as well as homes and offices across ${site.address.city}.`,
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = site.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const [first, ...rest] = service.title.split(" ");

  return (
    <main>
      <ServiceJsonLd
        title={service.title}
        description={service.short}
        slug={service.slug}
      />
      <div className="mx-auto w-full max-w-site px-6 pt-20 md:px-16 md:pt-28">
        <p className="font-mono text-label font-medium uppercase text-text-muted">
          <Link href="/services" className="hover:text-ember">
            Services
          </Link>{" "}
          → {service.title}
        </p>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-site gap-12 px-6 md:px-16 lg:grid-cols-2 lg:items-start">
        <ImageReveal parallax className="rounded-card">
          <Image
            src={`/images/services/${service.slug}.webp`}
            alt={service.title}
            width={900}
            height={1200}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="aspect-[3/4] w-full object-cover"
          />
        </ImageReveal>

        <Reveal>
          <h1 className="font-display text-h2 font-bold leading-tight">
            {first}{" "}
            <span className="italic underline decoration-ember decoration-2 underline-offset-4">
              {rest.join(" ")}
            </span>
          </h1>
          <p className="mt-5 max-w-[48ch] text-lg text-text-muted">
            {service.short}
          </p>

          <ul className="mt-10 divide-y divide-hairline-light border-y border-hairline-light">
            {SPECS[service.slug]?.map((spec) => (
              <li
                key={spec}
                className="flex items-center justify-between py-4 text-base"
              >
                {spec}
                <span aria-hidden className="size-1.5 rounded-full bg-ember" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <section className="mx-auto mt-20 w-full max-w-site px-6 md:px-16">
        <Reveal>
          <p className="font-mono text-label font-medium uppercase text-text-muted">
            02 — Frequently asked
          </p>
          <div className="mt-6 max-w-[60ch] space-y-6 border-t border-hairline-light pt-6">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h2 className="font-display text-lg font-bold">{f.q}</h2>
                <p className="mt-1 text-sm text-text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <RelatedServices currentSlug={service.slug} label="03 — Also available" />

      <div className="bg-charcoal">
        <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-6 px-6 py-12 text-bone sm:flex-row sm:items-center md:px-16">
          <p className="text-lg">
            Trusted by L&amp;T, Saint-Gobain &amp; Zydus.
          </p>
          <RippleButton href={site.whatsapp.href} external>
            WhatsApp for a Free Quote
          </RippleButton>
        </div>
      </div>

      <CtaBand label="04 — Start a conversation" />
    </main>
  );
}
