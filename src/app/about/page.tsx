import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import ProcessStrip from "@/components/shared/ProcessStrip";
import Metrics from "@/components/home/Metrics";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  alternates: { canonical: "/about/" },
  title: `About Us — Aluminium & Glazing Contractor in ${site.address.city} | ${site.name}`,
  description:
    "Aastha Enterprise is a civil-engineer-led aluminium, glazing, furniture and interior contractor in Vadodara, founded in 2000.",
};

const VALUES = [
  {
    title: "Engineer-led precision",
    body: "Every project is measured, drawn and executed by our own civil-engineering team — not subcontracted guesswork.",
  },
  {
    title: "One contractor, one bill",
    body: "Aluminium, glazing, furniture and interiors from a single accountable team, so nothing falls between two vendors.",
  },
  {
    title: "Paperwork done right",
    body: `GST-billed invoicing on every job (${site.gst}) — no cash-only shortcuts.`,
  },
];

/**
 * About — story built only from verified facts (master doc). No invented
 * milestones: a full 2000→today timeline needs Hitesh's real dates before
 * it ships (see Aastha-Build-Plan.md Phase 2).
 */
export default function AboutPage() {
  return (
    <main>
      <div className="mx-auto w-full max-w-site px-6 pt-20 md:px-16 md:pt-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <PageHeader
              label="01 — Our story"
              title="Twenty-five years,"
              emphasis="one workshop"
              lead=""
            />
            <Reveal delay={0.1} className="mt-8 max-w-[60ch] space-y-5 text-base text-text-muted">
              <p>
                {site.name} was founded in {site.established} on a simple
                belief — that engineering discipline and craftsmanship build
                spaces that last. What began as a {site.address.city}{" "}
                fabrication unit is today a trusted partner for institutional
                clients including L&amp;T, Saint-Gobain and Zydus, alongside
                homes and offices across the city.
              </p>
              <p>
                We are civil engineers at heart. Every project — from a
                single window to a full curtain wall — is measured, drawn and
                executed by our own in-house team, so there is one contractor
                and one point of responsibility from the first site visit to
                the final fix in {site.address.city}, {site.address.state}.
              </p>
            </Reveal>
            <Reveal
              delay={0.2}
              className="mt-10 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-text-muted"
            >
              Est. {site.established} · Engineer-led · {site.address.city}
            </Reveal>
          </div>

          <ImageReveal className="rounded-card lg:col-span-5">
            <Image
              src="/images/workshop.webp"
              alt="Aluminium sections and profiles stacked in the Aastha Enterprise workshop, golden-hour light through a high window"
              width={1000}
              height={1250}
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </ImageReveal>
        </div>
      </div>

      <ProcessStrip
        label="02 — How we work"
        title="Five steps,"
        emphasis="no surprises"
      />

      <section className="border-y border-hairline-light bg-stone">
        <div className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-28">
          <Reveal>
            <p className="font-mono text-label font-medium uppercase text-text-muted">
              03 — Why engineer-led
            </p>
            <h2 className="mt-6 max-w-[20ch] font-display text-h2 font-bold">
              Built on{" "}
              <span className="italic underline decoration-ember decoration-2 underline-offset-4">
                discipline
              </span>
              , not shortcuts.
            </h2>
          </Reveal>

          <Reveal
            stagger={0.08}
            className="mt-12 grid gap-10 sm:grid-cols-3"
          >
            {VALUES.map((v) => (
              <div key={v.title} className="border-t border-hairline-light pt-5">
                <h3 className="font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{v.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Metrics label="04 — In numbers" />

      <CtaBand label="05 — Start a conversation" />
    </main>
  );
}
