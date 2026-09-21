import Reveal from "@/components/motion/Reveal";

/**
 * Shared inner-page header (design system §3): mono numbered label + hairline
 * → serif headline with one italic+ember-underlined word. Every inner page
 * opens with this — a quieter variation of the homepage section pattern.
 */
export default function PageHeader({
  label,
  title,
  emphasis,
  suffix = ".",
  lead,
  dark = false,
}: {
  label: string;
  title: string;
  emphasis: string;
  suffix?: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <p
        className={`font-mono text-label font-medium uppercase ${dark ? "text-stone-muted" : "text-text-muted"}`}
      >
        {label}
      </p>
      <h1
        className={`mt-6 max-w-[20ch] font-display text-h2 font-bold ${dark ? "text-bone" : ""}`}
      >
        {title}{" "}
        <span className="italic underline decoration-ember decoration-2 underline-offset-4">
          {emphasis}
        </span>
        {suffix}
      </h1>
      {lead && (
        <p
          className={`mt-5 max-w-[52ch] text-lg ${dark ? "text-stone-muted" : "text-text-muted"}`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
