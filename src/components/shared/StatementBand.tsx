import Reveal from "@/components/motion/Reveal";

/**
 * Full-bleed stone band, one centered serif italic line — a breathing
 * moment between denser sections. Fixes the inset-box rendering on /clients.
 */
export default function StatementBand({ line }: { line: string }) {
  return (
    <section className="border-y border-hairline-light bg-stone">
      <div className="mx-auto w-full max-w-[36ch] px-6 py-20 text-center md:py-28">
        <Reveal>
          <p className="font-display text-h3 italic leading-snug text-charcoal">
            {line}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
