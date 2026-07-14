import { site } from "@/lib/site";
import RippleButton from "@/components/ui/RippleButton";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Reveal from "@/components/motion/Reveal";

/** §1 Hero (bone) — editorial headline + warm video loop + CTAs */
export default function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-site px-6 pb-16 pt-14 md:px-16 md:pb-24 md:pt-24">
      {/* Side rail — desktop only */}
      <p
        aria-hidden
        className="absolute right-4 top-32 hidden font-mono text-rail font-medium uppercase text-stone-muted [writing-mode:vertical-rl] xl:block"
      >
        Built on experience · Vadodara · Since {site.established}
      </p>

      <Reveal>
        <p className="font-mono text-label font-medium uppercase text-text-muted">
          Aluminium · Glazing · Furniture · Interiors — {site.address.city}
        </p>

        <h1 className="mt-8 max-w-[15ch] font-display text-display-xl font-medium">
          Built for L&amp;T. Built for{" "}
          <span className="italic underline decoration-ember decoration-2 underline-offset-8">
            your home
          </span>
          .
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[48ch] text-lg text-text-muted">
            Aluminium windows, glass façades, furniture and interior work — the
            same engineer-led team trusted by Saint-Gobain and Zydus, working
            across {site.address.city} for 25 years.
          </p>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <RippleButton href={site.whatsapp.href} external>
              WhatsApp for a Free Quote
            </RippleButton>
            <RippleButton href={site.phone.href} variant="outline">
              Call {site.phone.display}
            </RippleButton>
          </div>
        </div>

        <p className="mt-6 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-text-muted">
          Free site visit &amp; measurement · GST billed · Same-day reply
        </p>
      </Reveal>

      {/* Hero media — video loop slot (V1 warm interior sweep) */}
      <Reveal delay={0.15} className="mt-14 md:mt-20">
        <MediaPlaceholder
          label="Hero video loop — V1 warm interior sweep · 16:9 · ≤3MB WebM+MP4 · muted loop + poster"
          aspect="aspect-[16/9] md:aspect-[21/9]"
        />
      </Reveal>
    </section>
  );
}
