/**
 * Showcase projects — real jobsite photos, managed in Sanity by Hitesh.
 * Data is fetched at build time into content.generated.json (see
 * scripts/fetch-content.mjs). Only projects marked "Show on site" appear here,
 * ordered by the CMS "Display order" field.
 */
import content from "./content.generated.json";

export type ShowcaseProject = {
  /** Upright part of the display name */
  name: string;
  /** Italic part of the display name (design system headline split) */
  emphasis?: string;
  scope: string;
  location: string;
  type: string;
  /** Sanity CDN URL (already sized + auto-format) */
  imageUrl: string;
  alt: string;
};

export const showcaseProjects: ShowcaseProject[] = content.projects.map(
  (p) => ({
    name: p.name,
    emphasis: p.emphasis || undefined,
    scope: p.scope,
    location: p.location,
    type: p.type,
    imageUrl: p.imageUrl,
    alt: p.alt,
  })
);
