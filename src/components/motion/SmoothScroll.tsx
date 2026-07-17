"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// iOS/Android address-bar show/hide fires a resize mid-scroll; without this,
// ScrollTrigger recalculates trigger positions on that resize and the page
// appears to "stick"/jump mid-scroll (classic symptom right around whichever
// section is in view when the bar collapses, e.g. Services).
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Lenis smooth scroll — desktop pointer devices only (design system §5).
 * Mobile keeps native scroll; reduced-motion users keep native scroll.
 * Driven by the GSAP ticker so ScrollTrigger stays in sync.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isDesktopPointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isDesktopPointer || reducedMotion) return;

    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll to top on every route change — Lenis keeps its own virtual
  // scroll position, which otherwise carries over from the previous page.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
