"use client";

import { useEffect, useState } from "react";

const POSTER_DESKTOP = "/images/hero-poster.webp";
/** 900w re-encode of the same frame, q72 — 248KB → 59KB (sharp, 20 Jul) */
const POSTER_MOBILE = "/images/hero-poster-mobile.webp";
const ALT =
  "Warm modern interior with floor-to-ceiling glazing, slatted timber ceiling and crafted furniture in golden-hour light";

/**
 * Hero media — muted looping video over a permanent poster image, desktop
 * only. Mobile stays poster-only (Lighthouse mobile 20 Jul: 71/97/100/100).
 *
 * An ImageKit-compressed clip was tried on mobile (~245KB) but Lighthouse's
 * Lantern model still counted it against the critical path and simulated
 * LCP at 6.2s, so it was removed — poster-only mobile is the accepted
 * tradeoff for now.
 *
 * The <picture> below picks the right poster size at parse time via
 * `media`, before any JS runs, so it stays the fast, stable LCP element on
 * every device — same-size video overlay (desktop only) never registers as
 * a new, later LCP candidate.
 *
 * Reduced-motion users never mount the video at all (design system §5),
 * so they never download it — same bailout pattern as Reveal/Marquee.
 */
export default function HeroVideo({ className }: { className?: string }) {
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setAllowVideo(!reducedMotion && isDesktop);
  }, []);

  return (
    <div className={`relative ${className ?? ""}`}>
      <picture>
        <source media="(max-width: 767px)" srcSet={POSTER_MOBILE} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={POSTER_DESKTOP}
          alt={ALT}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </picture>
      {allowVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_DESKTOP}
          aria-label="Slow zoom-out reveal of a warm modern interior with floor-to-ceiling glazing, slatted timber ceiling and crafted furniture in golden-hour light"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/images/hero-video.webm" type="video/webm" />
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
