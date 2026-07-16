import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

/** Cross-link row to the other crafts — shown on each service detail page. */
export default function RelatedServices({
  currentSlug,
  label,
}: {
  currentSlug: string;
  label: string;
}) {
  const others = site.services.filter((s) => s.slug !== currentSlug);

  return (
    <section className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-28">
      <Reveal>
        <p className="font-mono text-label font-medium uppercase text-text-muted">
          {label}
        </p>
        <h2 className="mt-6 font-display text-h2 font-bold">
          The other{" "}
          <span className="italic underline decoration-ember decoration-2 underline-offset-4">
            three crafts
          </span>
          .
        </h2>
      </Reveal>

      <Reveal
        stagger={0.08}
        className="mt-12 grid gap-px overflow-hidden rounded-card border border-hairline-light sm:grid-cols-3"
      >
        {others.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex flex-col justify-between gap-6 bg-bone p-8 transition-colors hover:bg-stone/40"
          >
            <h3 className="font-display text-lg font-bold leading-snug">
              {service.title}
            </h3>
            <span
              aria-hidden
              className="inline-block text-charcoal transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ember"
            >
              →
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
