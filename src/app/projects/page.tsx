import type { Metadata } from "next";
import { site } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Reveal from "@/components/motion/Reveal";
import FeaturedProject from "@/components/home/FeaturedProject";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: `Our Projects in Gujarat | ${site.name}`,
  description:
    "Structural glazing, aluminium and interior work delivered for institutional and residential clients across Gujarat.",
};

/**
 * ⚠ Content rule (Aastha-Build-Plan.md Phase 2): every tile here needs a
 * REAL photo from Hitesh before launch — never AI imagery on this page.
 * Names/scope below are the verified showcase projects from the master
 * document; nothing invented. Photos, exact years and full project count
 * are pending — this page ships as a named worklist until they arrive.
 */
const PROJECTS = [
  {
    name: "H.J. Doshi Hospital",
    scope: "Institutional project",
    location: "Rajkot, Gujarat",
  },
  {
    name: "Vapi Auditorium",
    scope: "Spider glazing",
    location: "Vapi, Gujarat",
  },
  {
    name: "MEPRO",
    scope: "Glass partition",
    location: "Gujarat",
  },
  {
    name: "GFSU Training Centre",
    scope: "Curtain wall",
    location: "Gandhinagar, Gujarat",
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
          Real project photography is being added as each job is confirmed —
          every image here will be from an actual Aastha Enterprise site,
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
            <MediaPlaceholder
              label="Real project photo pending — no AI imagery here"
              aspect="aspect-[4/3]"
            />
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
