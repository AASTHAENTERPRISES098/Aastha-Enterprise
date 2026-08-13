import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { blogPosts, getPostBySlug, formatPostDate } from "@/lib/posts";
import Reveal from "@/components/motion/Reveal";
import PostBody from "@/components/blog/PostBody";
import CtaBand from "@/components/home/CtaBand";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/seo/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.coverUrl],
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const published = formatPostDate(post.publishedAt);
  const updated = post.updatedAt ? formatPostDate(post.updatedAt) : "";

  return (
    <main>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        image={post.coverUrl}
        authorName={post.author.name}
        authorCredential={post.author.credential}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Blog", path: "/blog/" },
          { name: post.title, path: `/blog/${post.slug}/` },
        ]}
      />
      {post.faqs.length > 0 && <FaqJsonLd faqs={post.faqs} />}

      <article>
        {/* Header */}
        <div className="mx-auto w-full max-w-site px-6 pt-20 md:px-16 md:pt-28">
          <p className="font-mono text-label font-medium uppercase text-text-muted">
            <Link href="/blog" className="hover:text-ember">
              Blog
            </Link>{" "}
            → {post.category}
          </p>

          <Reveal>
            <h1 className="mt-8 max-w-[24ch] font-display text-h2 font-bold leading-tight">
              {post.title}
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-[68ch] text-xl leading-relaxed text-text-muted">
              {post.excerpt}
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline-light pt-6 font-mono text-label uppercase text-text-muted">
            <span className="text-charcoal">
              {post.author.name}
              {post.author.credential && (
                <span className="text-text-muted">
                  {" "}
                  · {post.author.credential}
                </span>
              )}
            </span>
            <span>{published}</span>
            {updated && updated !== published && (
              <span>Updated {updated}</span>
            )}
          </div>
        </div>

        {/* Cover */}
        <div className="mx-auto mt-10 w-full max-w-site px-6 md:px-16">
          <div className="overflow-hidden rounded-card border border-hairline-light p-2">
            <Image
              src={post.coverUrl}
              alt={post.coverAlt}
              width={1600}
              height={1000}
              priority
              sizes="(max-width: 1279px) 100vw, 1200px"
              className="aspect-[16/10] w-full rounded-card object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto mt-14 w-full max-w-site px-6 md:px-16">
          <PostBody value={post.body} />
        </div>

        {/* FAQs — visible + already emitted as schema above */}
        {post.faqs.length > 0 && (
          <div className="mx-auto mt-20 w-full max-w-site px-6 md:px-16">
            <div className="max-w-[68ch]">
              <h2 className="font-display text-h3 font-bold leading-tight">
                Frequently asked
              </h2>
              <dl className="mt-8 divide-y divide-hairline-light border-t border-hairline-light">
                {post.faqs.map((f) => (
                  <div key={f.q} className="py-6">
                    <dt className="font-display text-lg font-bold">{f.q}</dt>
                    <dd className="mt-2 text-lg leading-relaxed text-text-muted">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {/* Author card — E-E-A-T signal, visible */}
        {post.author.credential && (
          <div className="mx-auto mt-16 w-full max-w-site px-6 md:px-16">
            <div className="max-w-[68ch] rounded-card border border-hairline-light bg-stone/30 p-6">
              <p className="font-mono text-label uppercase text-text-muted">
                Written by
              </p>
              <p className="mt-2 font-display text-lg font-bold">
                {post.author.name}
              </p>
              <p className="mt-1 text-text-muted">{post.author.credential}</p>
            </div>
          </div>
        )}

        <div className="mx-auto mt-16 w-full max-w-site px-6 md:px-16">
          <Link
            href="/blog"
            className="inline-block text-sm font-medium underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
          >
            ← All articles
          </Link>
        </div>
      </article>

      <div className="mt-24">
        <CtaBand label="Start a conversation" />
      </div>
    </main>
  );
}
