import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Slim closing bar — the homepage ContactSplit already carries the big
 * contact block, so this stays compact. The one-line NAP remains on every
 * page for local-SEO consistency.
 */
export default function Footer() {
  return (
    <footer className="bg-charcoal-deep text-bone">
      <div className="mx-auto w-full max-w-site px-6 py-10 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-xl font-bold">
            Aastha<span className="text-ember">.</span>
            <span className="ml-3 font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-stone-muted">
              Engineers &amp; Contractors · Since {site.established}
            </span>
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-bone/80 transition-colors hover:text-ember"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/privacy"
              className="text-bone/80 transition-colors hover:text-ember"
            >
              Privacy
            </Link>
          </nav>
        </div>

        <div className="mt-8 space-y-2 border-t border-hairline-dark pt-6 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-stone-muted">
          <p>
            {site.name} · {site.address.full} ·{" "}
            <a href={site.phone.href} className="hover:text-ember">
              {site.phone.display}
            </a>{" "}
            · {site.hours.display}
          </p>
          <p>
            © {new Date().getFullYear()} {site.name} · GST {site.gst}
          </p>
        </div>
      </div>
    </footer>
  );
}
