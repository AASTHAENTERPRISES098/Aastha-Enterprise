import Reveal from "@/components/motion/Reveal";

/**
 * Numbered step strip — verified operational facts only (no invented process).
 * Default 5 steps = the full "how we work" flow; pass `steps` for the
 * 3-step Contact-page variant.
 */
const DEFAULT_STEPS = [
  "Enquiry",
  "Free site visit & measurement",
  "Written quotation",
  "In-house fabrication",
  "Installation & handover",
];

export default function ProcessStrip({
  label,
  title,
  emphasis,
  steps = DEFAULT_STEPS,
  dark = false,
}: {
  label: string;
  title: string;
  emphasis: string;
  steps?: string[];
  dark?: boolean;
}) {
  return (
    <section className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-28">
      <Reveal>
        <p
          className={`font-mono text-label font-medium uppercase ${dark ? "text-stone-muted" : "text-text-muted"}`}
        >
          {label}
        </p>
        <h2
          className={`mt-6 font-display text-h2 font-bold ${dark ? "text-bone" : ""}`}
        >
          {title}{" "}
          <span className="italic underline decoration-ember decoration-2 underline-offset-4">
            {emphasis}
          </span>
        </h2>
      </Reveal>

      <Reveal
        stagger={0.08}
        className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5"
      >
        {steps.map((step, i) => (
          <div key={step} className="relative">
            <p className="font-display text-h3 font-bold text-ember">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p
              className={`mt-3 border-t pt-3 text-base leading-snug ${dark ? "border-hairline-dark text-bone" : "border-hairline-light text-charcoal"}`}
            >
              {step}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
