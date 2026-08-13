import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";

/**
 * Renders a post's Portable Text body in the house editorial style — serif
 * headings with the ember underline accent, comfortable measure, ember links.
 * Runs at build time (static export), so nothing ships to the client.
 *
 * Image blocks carry a pre-resolved `url` (see scripts/fetch-content.mjs), so
 * we render a plain <img> and never touch the Sanity asset pipeline here.
 */
type ImageValue = { url?: string; alt?: string; caption?: string };
type LinkMark = { href?: string };

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-lg leading-relaxed text-charcoal">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 font-display text-h3 font-bold leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-display text-xl font-bold leading-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-ember pl-6 font-display text-xl italic leading-relaxed text-charcoal">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-charcoal marker:text-ember">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-charcoal marker:text-ember">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-charcoal">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value as LinkMark)?.href ?? "#";
      const internal = href.startsWith("/");
      const cls =
        "underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember";
      return internal ? (
        <Link href={href} className={cls}>
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const { url, alt, caption } = value as ImageValue;
      if (!url) return null;
      return (
        <figure className="mt-12">
          <div className="overflow-hidden rounded-card border border-hairline-light p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={alt ?? ""}
              loading="lazy"
              className="w-full rounded-card object-cover"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PostBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="max-w-[68ch]">
      <PortableText value={value} components={components} />
    </div>
  );
}
