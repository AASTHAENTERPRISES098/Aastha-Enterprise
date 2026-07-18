"use client";

import { useEffect, useState } from "react";

const POSTER = "/images/hero-poster.webp";
const ALT =
  "Warm modern interior with floor-to-ceiling glazing, slatted timber ceiling and crafted furniture in golden-hour light";

/**
 * Hero media — muted looping video over a permanent poster image.
 *
 * The poster <img> is always in the DOM (never swapped out) so it is the
 * page's stable LCP element: it's in the initial HTML, fetches at high
 * priority, and the same-size video overlay never registers as a new,
 * later LCP candidate. The old swap-on-hydration version pushed mobile
 * LCP to ~7s (Lighthouse 18 Jul) because the <video preload="auto">
 * replaced the img post-hydration and pulled ~1.9MB eagerly.
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
    setAllowVideo(!reducedMotion);
  }, []);

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER}
        alt={ALT}
        fetchPriority="high"
        className="h-full w-full object-cover"
      />
      {allowVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
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
