/**
 * Temporary slot for imagery/video not yet delivered. Shows the asset spec
 * so it's obvious what goes where. Swap for <Image>/<video> when Aayush
 * supplies the file. `dark` = sits on a charcoal surface (bone frame rule).
 */
export default function MediaPlaceholder({
  label,
  aspect = "aspect-video",
  dark = false,
  className = "",
}: {
  label: string;
  aspect?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${dark ? "border border-bone/40 p-2" : ""} ${className}`}
    >
      <div
        className={`flex ${aspect} w-full items-center justify-center rounded-card ${
          dark ? "bg-charcoal-deep" : "bg-stone"
        }`}
      >
        <p
          className={`px-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] ${
            dark ? "text-stone-muted" : "text-text-muted"
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
