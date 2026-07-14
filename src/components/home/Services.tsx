import Link from "next/link";
import { site } from "@/lib/site";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Reveal from "@/components/motion/Reveal";

/** §3 What we do (bone) — 4 tall photo panels with staggered reveal */
export default function Services() {
  return (
    <section className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-32">
      <Reveal>
        <p className="font-mono text-label font-medium uppercase text-text-muted">
          03 — What we do
        </p>
        <h2 className="mt-6 font-display text-h2 font-medium">
          Four crafts,{" "}
          <span className="italic underline decoration-ember decoration-2 underline-offset-4">
            one standard
          </span>
          .
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg text-text-muted">
          From a single window to a full factory façade — one contractor, one
          bill, one point of responsibility.
        </p>
      </Reveal>

      <Reveal stagger={0.08} className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {site.services.map((service, i) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group"
          >
            <MediaPlaceholder
              label={`Service photo — ${service.title} · 3:4 portrait`}
              aspect="aspect-[3/4]"
            />
            <p className="mt-5 font-mono text-label font-medium uppercase text-text-muted">
              0{i + 1}
            </p>
            <h3 className="mt-2 font-display text-h3 font-normal leading-tight">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-text-muted">{service.short}</p>
            <p className="mt-3 text-sm font-medium text-charcoal underline decoration-hairline-light underline-offset-4 transition-colors group-hover:decoration-ember">
              Explore
            </p>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
