import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import FeaturedProject from "@/components/home/FeaturedProject";
import CtaBand from "@/components/home/CtaBand";
import { showcaseProjects } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/" },
  title: `Our Projects in Gujarat | ${site.name}`,
  description:
    "Structural glazing, aluminium and interior work delivered for institutional and residential clients across Gujarat.",
};

/**
 * Grid lists everything after the featured slot — data lives in
 * src/lib/projects.ts (real jobsite photos only, never AI imagery;
 * facts verified against Aastha-Enterprise-Master-Document.md §3).
 * Exact years and full project count are still pending from Hitesh.
 */
const PROJECTS = showcaseProjects.slice(1).map((p) => ({
  name: [p.name, p.emphasis].filter(Boolean).join(" "),
  slug: p.slug,
  scope: p.scope,
  location: p.location,
  imageUrl: p.imageUrl,
  // Cover + extra shots — drives the "N photos" badge and hints there's more.
  photoCount: 1 + p.gallery.length,
}));

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
          <Link
            key={project.name}
            href={`/projects/${project.slug}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-card">
              <Image
                src={project.imageUrl}
                alt={`${project.name} — ${project.scope}, ${project.location}`}
                width={1600}
                height={1200}
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {project.photoCount > 1 && (
                <span className="absolute bottom-3 right-3 rounded-full bg-charcoal/80 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-bone backdrop-blur">
                  {project.photoCount} photos
                </span>
              )}
            </div>
            <p className="mt-5 font-display text-lg font-bold leading-tight transition-colors group-hover:text-ember">
              {project.name}
            </p>
            <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
              {project.scope} · {project.location}
            </p>
          </Link>
        ))}
      </Reveal>

      <div className="mt-20">
        <CtaBand label="03 — Start a conversation" />
      </div>
    </main>
  );
}
