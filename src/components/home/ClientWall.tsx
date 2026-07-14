import { site } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

/**
 * §6 Client wall (bone) — Aastha's single biggest differentiator.
 * Typographic grid: names as text only, no logos (trademark rule).
 */
export default function ClientWall() {
  return (
    <section className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-32">
      <Reveal>
        <p className="font-mono text-label font-medium uppercase text-text-muted">
          06 — Clients
        </p>
        <h2 className="mt-6 max-w-[20ch] font-display text-h2 font-medium">
          The names on our{" "}
          <span className="italic underline decoration-ember decoration-2 underline-offset-4">
            work orders
          </span>
          .
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg text-text-muted">
          Twenty-eight institutional clients across pharma, construction,
          finance and real estate — listed as names, not logos, exactly as we
          worked for them.
        </p>
      </Reveal>

      <Reveal
        stagger={0.03}
        className="mt-14 grid grid-cols-2 gap-x-8 md:grid-cols-3 lg:grid-cols-4"
      >
        {site.clients.map((client) => (
          <p
            key={client}
            className="border-t border-hairline-light py-4 text-sm font-medium text-charcoal md:text-base"
          >
            {client}
          </p>
        ))}
      </Reveal>
    </section>
  );
}
