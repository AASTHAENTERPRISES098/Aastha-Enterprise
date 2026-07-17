import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import FeaturedProject from "@/components/home/FeaturedProject";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: `Our Projects in Gujarat | ${site.name}`,
  description:
    "Structural glazing, aluminium and interior work delivered for institutional and residential clients across Gujarat.",
};

/**
 * Real jobsite photos from Hitesh's company profile PDF — never AI imagery
 * on this page. Names/scope/location verified against
 * Aastha-Enterprise-Master-Document.md §3. Exact years and full project
 * count are still pending from Hitesh.
 */
const PROJECTS = [
  {
    name: "H.J. Doshi Hospital",
    scope: "Curtain wall",
    location: "Rajkot, Gujarat",
    image: "hj-doshi-hospital.jpg",
  },
  {
    name: "Vapi Auditorium",
    scope: "Spider glass fixing",
    location: "Vapi, Gujarat",
    image: "vapi-auditorium.jpg",
  },
  {
    name: "MEPRO",
    scope: "12mm glass partition",
    location: "Jarod, Gujarat",
    image: "mepro.jpg",
  },
  {
    name: "GFSU, Gandhinagar",
    scope: "Curtain wall",
    location: "Gandhinagar, Gujarat",
    image: "gfsu-gandhinagar.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <div className="mx-auto w-full max-w-site px-6 pt-20 md:px-16 md:pt-32">
        <PageHeader
          label="01 — Selected work"
          title="Work that"
          emphasis="stays built"
        />
        <Reveal
          delay={0.1}
          className="mt-6 max-w-[52ch] text-sm text-text-muted"
        >
          Every photo below is from an actual Aastha Enterprise jobsite —
          never AI-generated.
        </Reveal>
      </div>

      <div className="mt-14">
        <FeaturedProject label="02 — Featured work" />
      </div>

      <Reveal
        stagger={0.08}
        className="mx-auto mt-20 grid w-full max-w-site gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-16"
      >
        {PROJECTS.map((project) => (
          <div key={project.name}>
            <div className="overflow-hidden rounded-card">
              <Image
                src={`/images/projects/${project.image}`}
                alt={`${project.name} — ${project.scope}, ${project.location}`}
                width={1600}
                height={1200}
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <p className="mt-5 font-display text-lg font-bold leading-tight">
              {project.name}
            </p>
            <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
              {project.scope} · {project.location}
            </p>
          </div>
        ))}
      </Reveal>

      <div className="mt-20">
        <CtaBand label="03 — Start a conversation" />
      </div>
    </main>
  );
}
