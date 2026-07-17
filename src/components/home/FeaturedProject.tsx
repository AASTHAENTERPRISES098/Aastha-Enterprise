import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

/**
 * §4 Featured project (charcoal) — real photo framed like a mounted print.
 * Showcase project 1 of 6, from Hitesh's company profile PDF.
 */
export default function FeaturedProject({
  label = "04 — Featured work",
}: {
  label?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal text-bone">
      {/* Ghost numeral */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-8 select-none font-display text-[16rem] font-bold leading-none text-bone/[0.04] md:text-[24rem]"
      >
        01
      </span>

      <div className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-32">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-label font-medium uppercase text-stone-muted">
              {label}
            </p>
            <p className="font-mono text-label font-medium uppercase text-stone-muted">
              01 / 06
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="border border-bone/40 p-2 lg:col-span-7">
            <Image
              src="/images/projects/central-bus-station.jpg"
              alt="Structural glazing at Central Bus Station, Ved Transcube Plaza, Vadodara"
              width={1800}
              height={1350}
              sizes="(max-width: 1023px) 100vw, 58vw"
              priority
              className="aspect-[4/3] w-full rounded-card object-cover"
            />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <h2 className="font-display text-h2 font-bold leading-tight">
              Central Bus Station,{" "}
              <span className="italic">Ved Transcube Plaza</span>
            </h2>
            <dl className="mt-8 space-y-4 border-t border-hairline-dark pt-8 text-sm">
              <div className="flex justify-between gap-6">
                <dt className="font-mono text-label font-medium uppercase text-stone-muted">
                  Scope
                </dt>
                <dd>Structural glazing</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="font-mono text-label font-medium uppercase text-stone-muted">
                  Location
                </dt>
                <dd>Vadodara, Gujarat</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="font-mono text-label font-medium uppercase text-stone-muted">
                  Type
                </dt>
                <dd>Public infrastructure</dd>
              </div>
            </dl>
            <Link
              href="/projects"
              className="mt-10 inline-block text-sm font-medium text-bone underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
            >
              View all projects
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
