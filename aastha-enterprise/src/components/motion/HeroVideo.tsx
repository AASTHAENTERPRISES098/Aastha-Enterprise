"use client";

import { useEffect, useState } from "react";

const POSTER_DESKTOP = "/images/hero-poster.webp";
/** 900w re-encode of the same frame, q72 — 248KB → 59KB (sharp, 20 Jul) */
const POSTER_MOBILE = "/images/hero-poster-mobile.webp";
const VIDEO_DESKTOP = "/images/hero-video-desktop.mp4";
const VIDEO_MOBILE = "/images/hero-video-mobile.mp4";
const ALT =
  "Aastha Enterprise logo mark on a stone wall, camera zooming out to reveal a warm modern interior with floor-to-ceiling glazing and timber ceiling in golden-hour light";

/**
 * Hero media — muted looping video over a permanent poster image, on both
 * desktop (1080p) and mobile (720p, lighter file for the smaller viewport).
 *
 * Reduced-motion users never mount the video at all (design system §5), so
 * they never download it — same bailout pattern as Reveal/Marquee.
 */
export default function HeroVideo({ className }: { className?: string }) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setVideoSrc(isDesktop ? VIDEO_DESKTOP : VIDEO_MOBILE);
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
