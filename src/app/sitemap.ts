import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for output: 'export' — sitemap route must be statically rendered.
export const dynamic = "force-static";

/**
 * Static-export sitemap — every indexable route, built from site.ts so new
 * services appear automatically. Privacy page included (indexable but low
 * priority); 404 excluded by convention.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about/", priority: 0.8 },
    { path: "/services/", priority: 0.9 },
    { path: "/projects/", priority: 0.8 },
    { path: "/clients/", priority: 0.7 },
    { path: "/contact/", priority: 0.9 },
    { path: "/privacy/", priority: 0.2 },
  ];

  const serviceRoutes = site.services.map((service) => ({
    path: `/services/${service.slug}/`,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
