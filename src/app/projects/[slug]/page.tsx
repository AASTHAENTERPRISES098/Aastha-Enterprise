import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { showcaseProjects, getProjectBySlug } from "@/lib/projects";
import type { GalleryPhoto } from "@/lib/projects";
import Reveal from "@/components/motion/Reveal";
import ProjectGallery from "@/components/projects/ProjectGallery";
import CtaBand from "@/components/home/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return showcaseProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const fullName = [project.name, project.emphasis].filter(Boolean).join(" ");
  return {
    title: `${fullName} — ${project.scope} | ${site.name}`,
    description: `${project.scope} for ${fullName}${
      project.location ? ` in ${project.location}` : ""
    } — real jobsite photos from Aastha Enterprise.`,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: { images: [project.imageUrl] },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const fullName = [project.name, project.emphasis].filter(Boolean).join(" ");

  // Cover first, then any extra jobsite photos — the lightbox steps the full set.
  const photos: GalleryPhoto[] = [
    { url: project.imageUrl, alt: project.alt },
    ...project.gallery,
  ];

  const meta = [
    { label: "Scope", value: project.scope },
    { label: "Location", value: project.location },
    { label: "Type", value: project.type },
  ].filter((m) => m.value);

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Projects", path: "/projects/" },
          { name: fullName, path: `/projects/${project.slug}/` },
        ]}
      />

      <div className="mx-auto w-full max-w-site px-6 pt-20 md:px-16 md:pt-28">
        <p className="font-mono text-label font-medium uppercase text-text-muted">
          <Link href="/projects" className="hover:text-ember">
            Projects
          </Link>{" "}
          → {fullName}
        </p>

        <Reveal>
          <h1 className="mt-8 max-w-[20ch] font-display text-h2 font-bold leading-tight">
            {project.name}
            {project.emphasis && (
              <>
                {" "}
                <span className="italic underline decoration-ember decoration-2 underline-offset-4">
                  {project.emphasis}
                </span>
              </>
            )}
          </h1>
        </Reveal>

        {meta.length > 0 && (
          <Reveal>
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t border-hairline-light pt-6">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-label font-medium uppercase text-text-muted">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-lg">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>

      <div className="mx-auto mt-12 w-full max-w-site px-6 md:px-16">
        <ProjectGallery photos={photos} projectName={fullName} />
      </div>

      <div className="mx-auto mt-16 w-full max-w-site px-6 md:px-16">
        <Link
          href="/projects"
          className="inline-block text-sm font-medium underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
        >
          ← All projects
        </Link>
      </div>

      <div className="mt-20">
        <CtaBand label="Start a conversation" />
      </div>
    </main>
  );
}
