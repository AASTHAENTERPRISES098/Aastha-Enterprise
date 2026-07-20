import type { Metadata } from "next";
import { site } from "@/lib/site";
import EnquiryForm from "@/components/home/EnquiryForm";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import ProcessStrip from "@/components/shared/ProcessStrip";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: `Contact Us — ${site.address.city} | ${site.name}`,
  description: `Get in touch with ${site.name}: ${site.phone.display} · ${site.address.full}`,
  alternates: { canonical: "/contact/" },
};

const FAQS = [
  {
    q: "Do you offer a free site visit?",
    a: "Yes — every enquiry starts with a free, no-obligation site visit and measurement.",
  },
  {
    q: "Do you take on residential jobs, or only institutional?",
    a: `Both. The same engineer-led team handles institutional clients and homes across ${site.address.city}.`,
  },
  {
    q: "Do you give a written quotation?",
    a: "Yes — after the free site visit and measurement, we send a clear written quotation. No obligation, no cash-only work.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <FaqJsonLd faqs={FAQS} />
      <div className="grid lg:grid-cols-2">
        <div className="px-6 py-20 md:px-16 md:py-28 lg:pr-20">
          <PageHeader
            label="01 — Get in touch"
            title="Tell us about"
            emphasis="your project"
          />
          <div className="mt-12">
            <EnquiryForm />
          </div>
        </div>

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
      </div>

      <ProcessStrip
        label="02 — What happens next"
        title="Same-day reply,"
        emphasis="no obligation"
        steps={[
          "Same-day reply",
          "Free site visit & measurement",
          "Written quotation",
        ]}
      />

      <section className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-28">
        <Reveal>
          <p className="font-mono text-label font-medium uppercase text-text-muted">
            03 — Frequently asked
          </p>
          <div className="mt-6 max-w-[60ch] space-y-6 border-t border-hairline-light pt-6">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h2 className="font-display text-lg font-bold">{f.q}</h2>
                <p className="mt-1 text-sm text-text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
