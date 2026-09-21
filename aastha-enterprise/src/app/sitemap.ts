import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { showcaseProjects } from "@/lib/projects";
import { blogPosts } from "@/lib/posts";

// Required for output: 'export' — sitemap route must be statically rendered.
export const dynamic = "force-static";

/**
 * Static-export sitemap — every indexable route, built from site.ts so new
 * services appear automatically. Google ignores priority/changeFrequency,
 * so only url + lastModified are emitted. 404 excluded by convention.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "/",
    "/about/",
    "/services/",
    "/projects/",
    "/clients/",
    "/blog/",
    "/contact/",
    "/privacy/",
  ];

  const serviceRoutes = site.services.map(
    (service) => `/services/${service.slug}/`
  );

  const projectRoutes = showcaseProjects.map(
    (project) => `/projects/${project.slug}/`
  );

  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}/`);

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
  }));
}
