import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Top bar. Desktop: wordmark + nav links + call number.
 * Mobile: wordmark + call icon only — the MobileDock handles navigation.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline-light bg-bone/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-site items-center justify-between px-6 md:px-16">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-medium">
            Aastha<span className="text-ember">.</span>
          </span>
          <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-muted sm:inline">
            Engineers &amp; Contractors
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-charcoal transition-colors hover:text-ember"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.phone.href}
            className="font-mono text-label font-medium uppercase text-charcoal transition-colors hover:text-ember"
          >
            {site.phone.display}
          </a>
        </nav>

        {/* Mobile: call icon only */}
        <a
          href={site.phone.href}
          aria-label={`Call ${site.name}`}
          className="flex size-10 items-center justify-center rounded-full border border-hairline-light text-charcoal md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
