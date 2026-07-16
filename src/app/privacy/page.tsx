import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.name}`,
  description: `How ${site.name} collects and uses information submitted through this website.`,
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-site px-6 py-20 md:px-16 md:py-32">
      <p className="font-mono text-label font-medium uppercase text-text-muted">
        Privacy policy
      </p>
      <h1 className="mt-6 font-display text-h2 font-bold">
        How we handle your information.
      </h1>

      <div className="mt-10 max-w-[65ch] space-y-6 text-base leading-relaxed text-text-muted">
        <p>
          This policy explains what information {site.name} collects through
          this website and how it is used. We collect only what you choose to
          share with us.
        </p>

        <div>
          <h2 className="font-display text-lg font-bold text-charcoal">
            What we collect
          </h2>
          <p className="mt-2">
            When you submit the enquiry form, we collect your name, phone
            number, and the details of your requirement. We do not collect
            payment information on this website. Standard technical data
            (such as browser type and pages visited) may be collected via
            analytics tools to understand how the site is used.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-charcoal">
            How we use it
          </h2>
          <p className="mt-2">
            Enquiry details are used only to respond to your request — for a
            site visit, measurement, or quotation. We do not sell or share
            your information with third parties for marketing purposes.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-charcoal">
            Contact
          </h2>
          <p className="mt-2">
            Questions about this policy or your data can be sent to{" "}
            <a href={`mailto:${site.email}`} className="text-ember underline">
              {site.email}
            </a>{" "}
            or {site.phone.display}.
          </p>
        </div>
      </div>
    </main>
  );
}
