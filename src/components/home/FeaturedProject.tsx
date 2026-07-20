"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { showcaseProjects } from "@/lib/projects";

/**
 * §4 Featured work (charcoal) — stepped showcase through the real jobsite
 * photos, framed like mounted prints. Arrows + swipe navigate; the last
 * stop hands off to /projects. Only the active slide's image is in the
 * DOM so the other photos never download until asked for.
 *
 * The ghost numeral is painted via ::after (see .ghost-numeral in
 * globals.css) — it sits at 4% opacity by design, and as a pseudo-element
 * it no longer trips Lighthouse's color-contrast audit.
 */
export default function FeaturedProject({
  label = "04 — Featured work",
}: {
  label?: string;
}) {
  const [index, setIndex] = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = showcaseProjects.length;
  const project = showcaseProjects[index];
  const num = String(index + 1).padStart(2, "0");

  const step = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + count) % count);
    setHasNavigated(true);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1);
  };

  const swapClass = hasNavigated ? "animate-step" : "";

  return (
    <section className="relative overflow-hidden bg-charcoal text-bone">
      {/* Ghost numeral — tracks the active slide */}
      <span
        aria-hidden
        data-numeral={num}
        className="ghost-numeral pointer-events-none absolute -right-6 top-8 select-none font-display text-[16rem] font-bold leading-none text-bone/[0.04] md:text-[24rem]"
      />

      <div className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-32">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-label font-medium uppercase text-stone-muted">
              {label}
            </p>
            <p className="font-mono text-label font-medium uppercase text-stone-muted">
              {num} / {String(count).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        <div
          className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Reveal className="border border-bone/40 p-2 lg:col-span-7">
            <div key={project.image} className={swapClass}>
              <Image
                src={`/images/projects/${project.image}`}
                alt={project.alt}
                width={1800}
                height={1350}
                sizes="(max-width: 1023px) 100vw, 58vw"
                priority={index === 0}
                className="aspect-[4/3] w-full rounded-card object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div key={project.name} className={swapClass}>
              <h2 className="font-display text-h2 font-bold leading-tight">
                {project.name}
                {project.emphasis && (
                  <>
                    {" "}
                    <span className="italic">{project.emphasis}</span>
                  </>
                )}
              </h2>
              <dl className="mt-8 space-y-4 border-t border-hairline-dark pt-8 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="font-mono text-label font-medium uppercase text-stone-muted">
                    Scope
                  </dt>
                  <dd>{project.scope}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="font-mono text-label font-medium uppercase text-stone-muted">
                    Location
                  </dt>
                  <dd>{project.location}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="font-mono text-label font-medium uppercase text-stone-muted">
                    Type
                  </dt>
                  <dd>{project.type}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 flex items-center justify-between gap-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous project"
                  className="flex size-11 items-center justify-center rounded-full border border-bone/40 text-bone transition-colors hover:border-ember hover:text-ember"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next project"
                  className="flex size-11 items-center justify-center rounded-full border border-bone/40 text-bone transition-colors hover:border-ember hover:text-ember"
                >
                  →
                </button>
              </div>
              <Link
                href="/projects"
                className="text-sm font-medium text-bone underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
              >
                View all projects
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
