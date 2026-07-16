"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial photo reveal (design system §5): the frame un-clips upward while
 * the image inside settles from a slight zoom — like a plate in a print book.
 * Content is fully visible without JS; reduced-motion users get no animation.
 * `parallax` keeps a residual 1.08 zoom so the slow scroll drift never shows
 * the image edge. Wrap exactly one media element (img/video/div).
 */
export default function ImageReveal({
  children,
  className,
  parallax = false,
}: {
  children: React.ReactNode;
  className?: string;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = el.firstElementChild as HTMLElement | null;
    if (!media) return;

    const ctx = gsap.context(() => {
      const enter = {
        trigger: el,
        start: "top 82%",
        once: true,
      } as const;

      gsap.fromTo(
        el,
        { clipPath: "inset(10% 5% 14% 5%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: enter,
        }
      );
      gsap.fromTo(
        media,
        { scale: 1.15 },
        {
          scale: parallax ? 1.08 : 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: enter,
        }
      );

      if (parallax) {
        gsap.fromTo(
          media,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      {children}
    </div>
  );
}
