import Link from "next/link";
import RippleButton from "@/components/ui/RippleButton";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-site flex-col items-start px-6 py-32 md:px-16 md:py-48">
      <p className="font-mono text-label font-medium uppercase text-text-muted">
        404
      </p>
      <h1 className="mt-6 font-display text-h2 font-bold">
        This page{" "}
        <span className="italic underline decoration-ember decoration-2 underline-offset-4">
          wasn&rsquo;t built
        </span>
        .
      </h1>
      <p className="mt-5 max-w-[48ch] text-lg text-text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist. Head back home,
        or reach us directly.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <RippleButton href="/">Back to home</RippleButton>
        <RippleButton href={site.whatsapp.href} variant="outline" external>
          WhatsApp us
        </RippleButton>
      </div>
      <nav aria-label="Site map" className="mt-16 border-t border-hairline-light pt-8">
        <p className="font-mono text-label font-medium uppercase text-text-muted">
          Or find what you need
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-charcoal underline">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
