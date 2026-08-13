import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { blogPosts, formatPostDate } from "@/lib/posts";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/" },
  title: `Insights — Glazing, Windows & Interiors | ${site.name}`,
  description:
    "Practical guides on aluminium windows, structural glazing, façades and interior work in Gujarat — written by the Aastha Enterprise team.",
};

/**
 * Blog index — newest first, from Sanity (see src/lib/posts.ts). Drafted by us,
 * published by Hitesh; each card links to the full article at /blog/[slug].
 */
export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <main>
      <div className="mx-auto w-full max-w-site px-6 pt-20 md:px-16 md:pt-32">
        <PageHeader
          label="01 — Insights"
          title="Notes from the"
          emphasis="jobsite"
          lead="Straight answers on glazing, aluminium windows and interior work — the questions clients actually ask us, written down."
        />
      </div>

      {blogPosts.length === 0 ? (
        <div className="mx-auto mt-16 w-full max-w-site px-6 md:px-16">
          <p className="max-w-[52ch] text-lg text-text-muted">
            The first articles are on their way. In the meantime,{" "}
            <Link
              href="/contact"
              className="underline decoration-ember decoration-2 underline-offset-4 hover:text-ember"
            >
              get in touch
            </Link>{" "}
            with any question about your project.
          </p>
        </div>
      ) : (
        <>
          {/* Featured — newest post, full width */}
          <Reveal className="mx-auto mt-16 w-full max-w-site px-6 md:px-16">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="overflow-hidden rounded-card lg:col-span-7">
                  <Image
                    src={featured.coverUrl}
                    alt={featured.coverAlt}
                    width={1600}
                    height={1000}
                    priority
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="lg:col-span-5">
                  <p className="font-mono text-label font-medium uppercase text-text-muted">
                    {featured.category} · {formatPostDate(featured.publishedAt)}
                  </p>
                  <h2 className="mt-4 font-display text-h3 font-bold leading-tight transition-colors group-hover:text-ember">
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-[48ch] text-text-muted">
                    {featured.excerpt}
                  </p>
                  <span className="mt-6 inline-block text-sm font-medium underline decoration-ember decoration-2 underline-offset-4">
                    Read the article →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* The rest — grid */}
          {rest.length > 0 && (
            <Reveal
              stagger={0.08}
              className="mx-auto mt-20 grid w-full max-w-site gap-x-8 gap-y-14 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-16"
            >
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-card">
                    <Image
                      src={post.coverUrl}
                      alt={post.coverAlt}
                      width={1200}
                      height={800}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
                    {post.category} · {formatPostDate(post.publishedAt)}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight transition-colors group-hover:text-ember">
                    {post.title}
                  </p>
                  <p className="mt-2 line-clamp-3 text-sm text-text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </Reveal>
          )}
        </>
      )}

      <div className="mt-24">
        <CtaBand label="Start a conversation" />
      </div>
    </main>
  );
}
