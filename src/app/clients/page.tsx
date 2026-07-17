import type { Metadata } from "next";
import { site } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: `Our Clients in Vadodara & Gujarat | ${site.name}`,
  description: `${site.metrics.clientCount} institutional clients across pharma, construction, finance and real estate — listed as names, not logos.`,
};

const SECTORS = [
  {
    name: "Pharma",
    line: "Aluminium and glazing work for pharmaceutical plants and offices, built to the finish and hygiene standards the sector expects.",
  },
  {
    name: "Construction",
    line: "Fabrication and installation partner to builders and construction firms across their live sites.",
  },
  {
    name: "Finance",
    line: "Interior fit-outs and glazing for financial services offices, delivered on the project's schedule.",
  },
  {
    name: "Real Estate",
    line: "Windows, doors and façade glazing for residential and commercial developments across Gujarat.",
  },
  {
    name: "Healthcare",
    line: "Structural and interior work for hospital buildings, where precision and timelines both matter.",
  },
  {
    name: "Government",
    line: "Public infrastructure glazing and fabrication work delivered to institutional specification.",
  },
];

export default function ClientsPage() {
  return (
    <main>
      <div className="mx-auto w-full max-w-site px-6 pt-20 md:px-16 md:pt-32">
        <PageHeader
          label="01 — Clients & sectors"
          title="The names on our"
          emphasis="work orders"
        />
      </div>

      <Reveal
        stagger={0.02}
        className="mx-auto mt-14 grid w-full max-w-site grid-cols-2 gap-x-8 px-6 md:grid-cols-3 md:px-16"
      >
        {site.clients.map((client) => (
          <p
            key={client}
            className="border-t border-hairline-light py-4 text-sm font-medium text-charcoal md:text-base"
          >
            {client}
          </p>
        ))}
      </Reveal>

      <section className="border-t border-hairline-light bg-stone">
        <div className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-28">
          <Reveal>
            <p className="font-mono text-label font-medium uppercase text-text-muted">
              02 — Sectors we serve
            </p>
            <h2 className="mt-6 max-w-[20ch] font-display text-h2 font-bold">
              Six sectors,{" "}
              <span className="italic underline decoration-ember decoration-2 underline-offset-4">
                one standard
              </span>
              .
            </h2>
          </Reveal>

          <Reveal
            stagger={0.08}
            className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SECTORS.map((sector) => (
              <div key={sector.name} className="border-t border-hairline-light pt-5">
                <h3 className="font-display text-lg font-bold">{sector.name}</h3>
                <p className="mt-2 text-sm text-text-muted">{sector.line}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand label="03 — Start a conversation" />
    </main>
  );
}
