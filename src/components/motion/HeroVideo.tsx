"use client";

import { useEffect, useState } from "react";

/**
 * Hero media — muted looping video, poster fallback (design system §5:
 * "prefers-reduced-motion: ... video shows poster"). Checked client-side,
 * same bailout pattern as Reveal/Marquee, so reduced-motion users never
 * download the video at all.
 */
export default function HeroVideo({ className }: { className?: string }) {
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setAllowVideo(!reducedMotion);
  }, []);

  if (!allowVideo) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src="/images/hero-poster.webp"
        alt="Warm modern interior with floor-to-ceiling glazing, slatted timber ceiling and crafted furniture in golden-hour light"
        className={className}
      />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/images/hero-poster.webp"
      aria-label="Slow zoom-out reveal of a warm modern interior with floor-to-ceiling glazing, slatted timber ceiling and crafted furniture in golden-hour light"
      className={className}
    >
      <source src="/images/hero-video.webm" type="video/webm" />
      <source src="/images/hero-video.mp4" type="video/mp4" />
    </video>
  );
}
