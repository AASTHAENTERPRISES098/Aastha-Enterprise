/**
 * Blog posts — written in Sanity, drafted by us and published by Hitesh.
 * Fetched at build time into content.generated.json (see
 * scripts/fetch-content.mjs). Only posts marked "Show on site" appear here,
 * newest first.
 */
import type { PortableTextBlock } from "@portabletext/react";
import content from "./content.generated.json";

export type PostAuthor = {
  name: string;
  credential?: string;
};

export type PostFaq = {
  q: string;
  a: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  /** Plain-text summary — meta description + AI-quotable answer */
  excerpt: string;
  category: string;
  coverUrl: string;
  coverAlt: string;
  author: PostAuthor;
  /** ISO date */
  publishedAt: string;
  /** ISO date — only when meaningfully revised */
  updatedAt?: string;
  faqs: PostFaq[];
  /** Portable Text; image blocks carry a resolved `url` (see fetch script) */
  body: PortableTextBlock[];
};

// content.generated.json may not carry `posts` until the field ships / a post
// is published — default to an empty list so the site builds regardless.
const raw = ("posts" in content ? content.posts : []) as unknown as BlogPost[];

export const blogPosts: BlogPost[] = raw.map((p) => ({
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  category: p.category || "Insights",
  coverUrl: p.coverUrl,
  coverAlt: p.coverAlt,
  author: p.author || { name: "Aastha Enterprise" },
  publishedAt: p.publishedAt,
  updatedAt: p.updatedAt || undefined,
  faqs: (p.faqs || []).filter((f) => f && f.q && f.a),
  body: (p.body || []) as PortableTextBlock[],
}));

/** Look up a single post by its URL slug. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Human-friendly date for display, e.g. "13 August 2026". */
export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
