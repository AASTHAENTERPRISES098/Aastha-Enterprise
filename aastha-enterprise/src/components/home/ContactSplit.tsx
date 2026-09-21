import { site } from "@/lib/site";
import EnquiryForm from "@/components/home/EnquiryForm";
import Reveal from "@/components/motion/Reveal";

/** §8 Contact split — form on bone, NAP + map on charcoal */
export default function ContactSplit() {
  return (
    <section className="grid lg:grid-cols-2">
      {/* Left — form on bone */}
      <div className="px-6 py-20 md:px-16 md:py-28 lg:pr-20">
        <Reveal>
          <p className="font-mono text-label font-medium uppercase text-text-muted">
            08 — Get in touch
          </p>
          <h2 className="mt-6 font-display text-h2 font-bold">
            Tell us about{" "}
            <span className="italic underline decoration-ember decoration-2 underline-offset-4">
              your project
            </span>
            .
          </h2>
          <div className="mt-12">
            <EnquiryForm />
          </div>
        </Reveal>
      </div>

      {/* Right — NAP + map on charcoal */}
      <div className="bg-charcoal px-6 py-20 text-bone md:px-16 md:py-28">
        <Reveal>
          <p className="font-mono text-label font-medium uppercase text-stone-muted">
            Visit us
          </p>
          <address className="mt-6 text-lg not-italic leading-relaxed">
            {site.address.line1},
            <br />
            {site.address.line2},
            <br />
            {site.address.city} – {site.address.pincode}
          </address>

          <div className="mt-8 space-y-2 text-base">
            <p>
              <a href={site.phone.href} className="hover:text-ember">
                {site.phone.display}
              </a>
            </p>
            <p>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ember"
              >
                WhatsApp: {site.whatsapp.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-ember">
                {site.email}
              </a>
            </p>
          </div>

          <p className="mt-8 border-t border-hairline-dark pt-6 text-sm text-stone-muted">
            {site.hours.display} · {site.hours.closed}
          </p>

          {/* Map — 1px bone frame with inset gap (charcoal photo rule) */}
          <div className="mt-10 border border-bone/40 p-2">
            <iframe
              title={`${site.name} on Google Maps`}
              src={site.maps.embedSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="aspect-[4/3] w-full rounded-card border-0 md:aspect-video"
            />
          </div>
          <a
            href={site.maps.shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
          >
            Open in Google Maps →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
