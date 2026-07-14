import { site } from "@/lib/site";
import Marquee from "@/components/motion/Marquee";

/** §2 Trust strip (bone) — client names marquee. Names as text, no logos. */
export default function TrustStrip() {
  return (
    <section className="border-y border-hairline-light py-10 md:py-14">
      <p className="mx-auto w-full max-w-site px-6 font-mono text-label font-medium uppercase text-text-muted md:px-16">
        02 — Trusted by
      </p>
      <div className="mt-8">
        <Marquee items={site.marqueeClients} />
      </div>
    </section>
  );
}
