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
import {
  ServiceJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/seo/JsonLd";

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
    description: `${service.short} Trusted by L&T, Saint-Gobain and Zydus — engineer-led work in ${site.address.city}.`,
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

/**
 * Spec bullets sourced from Hitesh's company profile PDF and
 * Aastha-Enterprise-Master-Document.md §2 — nothing invented, but expanded
 * beyond the original 3-bullet `service.short` split to cover the full
 * category breadth those documents verify. FAQ answers stay
 * generic/verified until Hitesh reviews per-service detail.
 */
const SPECS: Record<string, string[]> = {
  "aluminium-windows-doors": [
    "Sliding & openable windows",
    "Sliding & automatic sliding doors",
    "Aluminium partitions",
    "Aluminium kitchen",
    "ACP (aluminium composite panel) work",
    "Mosquito-net (roll-up) windows",
    "Two & three-track windows",
    "Sections & profiles",
  ],
  "structural-glazing-curtain-wall": [
    "Structural glazing",
    "Curtain walls",
    "Spider glass & suspended glass systems",
    "Glass facades",
    "Glass doors with patch fitting",
    "DGU windows",
    "Sound-proof windows",
  ],
  furniture: [
    "Wooden furniture",
    "Office furniture — reception, conference, cubicles",
    "Auditorium furniture",
    "Modular kitchens",
    "Industrial & computer furniture",
    "Furniture contracting & hire",
  ],
  "false-ceiling-interior": [
    "POP & false ceilings",
    "Vertical & horizontal blinds",
    "Curtains",
    "S.S. railing & fabrication",
    "FRP roof sheet",
    "Mini civil work",
  ],
};

/**
 * Second intro paragraph per service — content depth without invention:
 * capabilities restate the verified spec lists; project references match
 * the master doc. Per-service detail beyond this waits on Hitesh.
 */
const INTROS: Record<string, string> = {
  "aluminium-windows-doors":
    "From two-track sliding windows in a Vadodara home to full aluminium partition systems for institutional offices, every frame is fabricated in our own workshop and installed by our own team. Sections, hardware and glass are chosen for the opening and its exposure — not for what is lying in stock.",
  "structural-glazing-curtain-wall":
    "Structural glazing is unforgiving work: the facade carries wind load, weather and the building's public face at once. Our engineering team has delivered glazing for public infrastructure, hospitals and university campuses across Gujarat — work that is still standing and still sealed.",
  furniture:
    "From a single conference table to a complete office fit-out — workstations, reception counters, auditorium seating and modular kitchens — we build furniture for daily institutional use, made in the same workshop that serves our contracting clients.",
  "false-ceiling-interior":
    "Ceilings, blinds, railings and finishing are the last ten percent of a project that decide how finished it feels. We handle POP and false-ceiling work alongside S.S. railing fabrication and mini civil jobs, so one team closes out the site.",
};

/** How-we-build-it steps — the verified operational flow, told per craft. */
const PROCESS: Record<string, { step: string; body: string }[]> = {
  "aluminium-windows-doors": [
    {
      step: "Site visit & measurement",
      body: "We measure every opening ourselves — plumb, level and brickwork tolerance — because a window is only as good as its measurement. The visit is free.",
    },
    {
      step: "Section selection & quotation",
      body: "We recommend the right aluminium sections, hardware and glass for the opening and your budget, then send a written quotation.",
    },
    {
      step: "In-house fabrication",
      body: "Frames are cut and assembled in our own Vadodara workshop — the same unit that has served our institutional clients since 2000.",
    },
    {
      step: "Installation & handover",
      body: "Our own team fits, seals and finishes the work, then walks it with you before handover. After-sales support stays a phone call away.",
    },
  ],
  "structural-glazing-curtain-wall": [
    {
      step: "Site survey & feasibility",
      body: "We survey the elevation, substrate and access, and confirm what the structure can carry before anything is promised.",
    },
    {
      step: "System design & quotation",
      body: "Glazing system, glass specification — DGU, toughened, sound-proof — and fixing details are worked out by our engineering team and priced in a written quotation.",
    },
    {
      step: "Fabrication & staging",
      body: "Frames and fittings are prepared in-house and staged to the project's schedule — we work alongside builders on live sites.",
    },
    {
      step: "Installation & handover",
      body: "Our experienced site team installs, seals and checks the facade, and stays accountable after handover.",
    },
  ],
  furniture: [
    {
      step: "Requirement & measurement",
      body: "We visit, measure the space and understand how it will be used — workstations, storage, reception, conference or a full office.",
    },
    {
      step: "Design & quotation",
      body: "Layouts, materials and finishes are settled with you, then priced in a written quotation.",
    },
    {
      step: "In-house fabrication",
      body: "Every piece is built in our own workshop — wooden, modular and industrial furniture from one accountable team.",
    },
    {
      step: "Delivery & installation",
      body: "We deliver, install and level the furniture on site, and support it after handover.",
    },
  ],
  "false-ceiling-interior": [
    {
      step: "Site visit & scope",
      body: "We walk the site with you and agree the exact scope — ceilings, blinds, railing, finishing — before quoting.",
    },
    {
      step: "Written quotation",
      body: "One itemised quotation for the full interior scope, so nothing falls between two vendors.",
    },
    {
      step: "Execution",
      body: "POP and false-ceiling work, S.S. railing fabrication and mini civil jobs run by our own crews, sequenced around your site.",
    },
    {
      step: "Finishing & handover",
      body: "We close out the details — edges, joints, cleanup — and hand over a finished space.",
    },
  ],
};

/**
 * Named project proof — only where the scope is verified glazing work
 * (master doc §3). Other services point at the client wall instead.
 */
const GLAZING_PROOF = [
  { name: "Central Bus Station, Ved Transcube Plaza", detail: "Structural glazing · Vadodara" },
  { name: "H.J. Doshi Hospital", detail: "Curtain wall · Rajkot" },
  { name: "Vapi Auditorium", detail: "Spider glass fixing · Vapi" },
  { name: "GFSU, Gandhinagar", detail: "Curtain wall · Gandhinagar" },
];

const FAQS = [
  {
    q: "Do you provide installation and after-sales support?",
    a: "Yes. Our in-house teams handle measurement, fabrication and installation, with clear documentation and after-sales support.",
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
      <BreadcrumbJsonLd
        items={[
          { name: "Services", path: "/services/" },
          { name: service.title, path: `/services/${service.slug}/` },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />
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
            priority
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
          {INTROS[service.slug] && (
            <p className="mt-4 max-w-[52ch] text-base text-text-muted">
              {INTROS[service.slug]}
            </p>
          )}

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

      {/* How we build it — per-craft process */}
      <section className="mx-auto mt-24 w-full max-w-site px-6 md:px-16">
        <Reveal>
          <p className="font-mono text-label font-medium uppercase text-text-muted">
            02 — How we build it
          </p>
          <h2 className="mt-6 max-w-[24ch] font-display text-h2 font-bold">
            Four steps,{" "}
            <span className="italic underline decoration-ember decoration-2 underline-offset-4">
              one accountable team
            </span>
            .
          </h2>
        </Reveal>
        <Reveal
          stagger={0.08}
          className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROCESS[service.slug]?.map((p, i) => (
            <div key={p.step}>
              <p className="font-display text-h3 font-bold text-ember">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 border-t border-hairline-light pt-3 font-display text-lg font-bold">
                {p.step}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{p.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Track record — named glazing projects, or the client wall */}
      <section className="mx-auto mt-24 w-full max-w-site px-6 md:px-16">
        <Reveal>
          <p className="font-mono text-label font-medium uppercase text-text-muted">
            03 — Track record
          </p>
          {service.slug === "structural-glazing-curtain-wall" ? (
            <>
              <div className="mt-6 max-w-[60ch] divide-y divide-hairline-light border-y border-hairline-light">
                {GLAZING_PROOF.map((p) => (
                  <div
                    key={p.name}
                    className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <p className="font-display text-lg font-bold">{p.name}</p>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
                      {p.detail}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/projects"
                className="mt-6 inline-block text-sm font-medium underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
              >
                See the photos on our projects page →
              </Link>
            </>
          ) : (
            <>
              <p className="mt-6 max-w-[52ch] text-lg">
                The same team behind our institutional work —{" "}
                {site.metrics.clientCount} clients across pharma, construction,
                finance and real estate.
              </p>
              <Link
                href="/clients"
                className="mt-6 inline-block text-sm font-medium underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
              >
                See the client wall →
              </Link>
            </>
          )}
        </Reveal>
      </section>

      <section className="mx-auto mt-20 w-full max-w-site px-6 md:px-16">
        <Reveal>
          <p className="font-mono text-label font-medium uppercase text-text-muted">
            04 — Frequently asked
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

      <RelatedServices currentSlug={service.slug} label="05 — Also available" />

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

      <CtaBand label="06 — Start a conversation" />
    </main>
  );
}
