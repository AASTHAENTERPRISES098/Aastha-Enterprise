/**
 * Text marquee (React Bits "Logo Loop", restyled per design system §4):
 * pure CSS, slow scroll, pause on hover, edge fades, stops entirely for
 * reduced-motion users. Server component — no JS shipped.
 */
export default function Marquee({
  items,
  durationSeconds = 45,
}: {
  items: readonly string[];
  durationSeconds?: number;
}) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center whitespace-nowrap px-6 md:px-10"
        >
          <span className="font-display text-xl font-bold uppercase tracking-wide text-charcoal md:text-2xl">
            {item}
          </span>
          <span
            aria-hidden
            className="ml-12 size-1.5 rounded-full bg-ember md:ml-20"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ animation: `marquee ${durationSeconds}s linear infinite` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
