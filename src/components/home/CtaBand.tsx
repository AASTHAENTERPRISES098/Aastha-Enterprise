import { site } from "@/lib/site";
import RippleButton from "@/components/ui/RippleButton";
import Reveal from "@/components/motion/Reveal";

/**
 * §7 CTA band (charcoal) — the ONE shimmer headline per page
 * (Dia Text Reveal, restyled: bone→ember sweep).
 */
export default function CtaBand() {
  return (
    <section className="bg-charcoal">
      <div className="mx-auto w-full max-w-site px-6 py-24 text-center md:px-16 md:py-36">
        <Reveal>
          <p className="font-mono text-label font-medium uppercase text-stone-muted">
            07 — Start a conversation
          </p>
          <h2 className="mx-auto mt-8 max-w-[16ch] font-display text-h2 font-medium text-bone">
            <span className="text-shimmer">Have a project</span>{" "}
            <span className="italic text-shimmer">in mind</span>
            <span className="text-ember">?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[45ch] text-stone-muted">
            Send the details on WhatsApp — we&apos;ll visit the site, measure,
            and send a clear quotation. Same-day reply, no obligation.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <RippleButton href={site.whatsapp.href} external>
              WhatsApp for a Free Quote
            </RippleButton>
            <RippleButton href={site.phone.href} variant="outline-dark">
              Call {site.phone.display}
            </RippleButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
