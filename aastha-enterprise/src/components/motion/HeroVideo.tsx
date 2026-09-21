"use client";

import { useSyncExternalStore } from "react";

const POSTER_DESKTOP = "/images/hero-poster.webp";
/** 900w re-encode of the same frame, q72 — 248KB → 59KB (sharp, 20 Jul) */
const POSTER_MOBILE = "/images/hero-poster-mobile.webp";
const VIDEO_DESKTOP = "/images/hero-video-desktop.mp4";
const VIDEO_MOBILE = "/images/hero-video-mobile.mp4";
const ALT =
  "Aastha Enterprise logo mark on a stone wall, camera zooming out to reveal a warm modern interior with floor-to-ceiling glazing and timber ceiling in golden-hour light";

const MQ_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const MQ_DESKTOP = "(min-width: 768px)";

/**
 * Which video to mount, read straight from the media queries.
 *
 * Read during render rather than set from an effect: setting state inside an
 * effect renders the hero twice on every single page load, and the whole point
 * of this component is that the hero is fast. Returns a primitive so React can
 * compare snapshots cheaply.
 */
function getVideoSrc(): string | null {
  if (window.matchMedia(MQ_REDUCED_MOTION).matches) return null;
  return window.matchMedia(MQ_DESKTOP).matches ? VIDEO_DESKTOP : VIDEO_MOBILE;
}

/** Nothing during prerender — `window` does not exist, and the poster alone is
 *  the correct first paint anyway. */
function getServerVideoSrc(): string | null {
  return null;
}

function subscribe(onChange: () => void) {
  const queries = [
    window.matchMedia(MQ_REDUCED_MOTION),
    window.matchMedia(MQ_DESKTOP),
  ];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () =>
    queries.forEach((q) => q.removeEventListener("change", onChange));
}

/**
 * Hero media — muted looping video over a permanent poster image, on both
 * desktop (1080p) and mobile (720p, lighter file for the smaller viewport).
 *
 * Reduced-motion users never mount the video at all (design system §5), so
 * they never download it — same bailout pattern as Reveal/Marquee.
 *
 * Subscribing to the queries (rather than reading them once on mount) also
 * means resizing across the 768px breakpoint, or turning reduced-motion on,
 * now takes effect immediately instead of needing a reload.
 */
export default function HeroVideo({ className }: { className?: string }) {
  const videoSrc = useSyncExternalStore(
    subscribe,
    getVideoSrc,
    getServerVideoSrc
  );

  return (
    <div className={`relative ${className ?? ""}`}>
      <picture>
        <source media="(max-width: 767px)" srcSet={POSTER_MOBILE} />
        <img
          src={POSTER_DESKTOP}
          alt={ALT}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </picture>
      {videoSrc && (
        <video
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_DESKTOP}
          aria-label={ALT}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
