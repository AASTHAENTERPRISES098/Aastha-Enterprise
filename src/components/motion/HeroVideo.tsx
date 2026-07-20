"use client";

import { useEffect, useState } from "react";

const POSTER = "/images/hero-poster.webp";
const ALT =
  "Warm modern interior with floor-to-ceiling glazing, slatted timber ceiling and crafted furniture in golden-hour light";

/** Full-quality originals — fine on desktop bandwidth (Lighthouse desktop perf 96) */
const DESKTOP_SOURCES = {
  webm: "/images/hero-video.webm",
  mp4: "/images/hero-video.mp4",
};

/**
 * ImageKit on-the-fly transform (w-828,q-40) — same clip re-encoded down to
 * ~245KB from the 1.9MB original, verified via `curl -I` against the
 * ImageKit URL (20 Jul). Small enough that mobile no longer saturates the
 * throttled connection the way the untouched original did (Lighthouse
 * 20 Jul: perf 71, simulated LCP 6.5s — that run is why mobile went
 * poster-only in the first place).
 */
const MOBILE_SOURCES = {
  webm: "https://ik.imagekit.io/whqaagber/Hero/hero-video.webm?tr=w-828,q-40",
  mp4: "https://ik.imagekit.io/whqaagber/Hero/hero-video.mp4?tr=w-828,q-40",
};

/**
 * Hero media — muted looping video over a permanent poster image.
 *
 * The poster <img> is always in the DOM (never swapped out) so it is the
 * page's stable LCP element: it's in the initial HTML, fetches at high
 * priority, and the same-size video overlay never registers as a new,
 * later LCP candidate.
 *
 * Reduced-motion users never mount the video at all (design system §5),
 * so they never download it — same bailout pattern as Reveal/Marquee.
 * Mobile gets the ImageKit-compressed clip instead of being skipped
 * entirely, so the loop is back on phones without repeating the earlier
 * LCP regression.
 */
export default function HeroVideo({ className }: { className?: string }) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [sources, setSources] = useState(DESKTOP_SOURCES);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setSources(isDesktop ? DESKTOP_SOURCES : MOBILE_SOURCES);
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
          <source src={sources.webm} type="video/webm" />
          <source src={sources.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
