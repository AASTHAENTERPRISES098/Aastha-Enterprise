import { site } from "@/lib/site";
import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";

/**
 * §5 Metrics (stone) — count-up numerals.
 * Projects metric renders only after Hitesh confirms the real figure
 * (site.metrics.projectsCompleted stays null until then).
 */
export default function Metrics({
  label = "05 — In numbers",
}: {
  label?: string;
}) {
  const { yearsOfWork, clientCount, googleRating, projectsCompleted } =
    site.metrics;

  const items: {
    value: number;
    decimals?: number;
    suffix: string;
    label: string;
    href?: string;
  }[] = [
    { value: yearsOfWork, suffix: "+", label: "Years of work" },
    ...(projectsCompleted
      ? [{ value: projectsCompleted, suffix: "+", label: "Projects delivered" }]
      : []),
    { value: clientCount, suffix: "", label: "Institutional clients" },
    {
      value: googleRating,
      decimals: 1,
      suffix: "★",
      label: "Google rating",
      // Opens the GBP pin, where the reviews are one tap away
      href: site.maps.shareUrl,
    },
  ];

  return (
    <section className="border-y border-hairline-light bg-stone">
      <div className="mx-auto w-full max-w-site px-6 py-16 md:px-16 md:py-24">
        <Reveal>
          <p className="font-mono text-label font-medium uppercase text-text-muted">
            {label}
          </p>
        </Reveal>
        <Reveal
          stagger={0.1}
          className="mt-10 grid gap-10 sm:grid-cols-3"
        >
          {items.map((item) => {
            const metric = (
              <>
                <p className="font-display text-metric font-bold">
                  <Counter to={item.value} decimals={item.decimals ?? 0} />
                  <span className="text-ember">{item.suffix}</span>
                </p>
                <p className="mt-3 border-t border-hairline-light pt-3 font-mono text-label font-medium uppercase text-text-muted">
                  {item.label}
                </p>
              </>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.value} stars — read our Google reviews`}
                className="transition-colors hover:text-ember"
              >
                {metric}
              </a>
            ) : (
              <div key={item.label}>{metric}</div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
