/**
 * Showcase projects — real jobsite photos, managed in Sanity by Hitesh.
 * Data is fetched at build time into content.generated.json (see
 * scripts/fetch-content.mjs). Only projects marked "Show on site" appear here,
 * ordered by the CMS "Display order" field.
 */
import content from "./content.generated.json";

/** One extra photo on a project's detail page (beyond the cover). */
export type GalleryPhoto = {
  /** Sanity CDN URL (already sized + auto-format) */
  url: string;
  alt: string;
  caption?: string;
};

export type ShowcaseProject = {
  /** Upright part of the display name */
  name: string;
  /** Italic part of the display name (design system headline split) */
  emphasis?: string;
  /** URL segment for /projects/[slug] — falls back to a slugified name */
  slug: string;
  scope: string;
  location: string;
  type: string;
  /** Cover image — Sanity CDN URL (already sized + auto-format) */
  imageUrl: string;
  alt: string;
  /** Extra jobsite photos shown on the detail page (may be empty) */
  gallery: GalleryPhoto[];
};

/** Fallback for projects saved before the slug field existed. */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const showcaseProjects: ShowcaseProject[] = content.projects.map(
  (p) => ({
    name: p.name,
    emphasis: p.emphasis || undefined,
    slug: ("slug" in p && p.slug ? p.slug : slugify(p.name)) as string,
    scope: p.scope,
    location: p.location,
    type: p.type,
    imageUrl: p.imageUrl,
    alt: p.alt,
    gallery: (("gallery" in p && p.gallery ? p.gallery : []) as GalleryPhoto[])
      .filter((g) => g && g.url),
  })
);

/** Look up a single project by its URL slug. */
export function getProjectBySlug(slug: string): ShowcaseProject | undefined {
  return showcaseProjects.find((p) => p.slug === slug);
}
