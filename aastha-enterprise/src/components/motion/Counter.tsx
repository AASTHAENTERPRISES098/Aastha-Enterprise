"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Count-up numeral on scroll into view. Renders the final value in the
 * markup (SEO / no-JS safe) and animates from 0 when it enters.
 */
export default function Counter({
  to,
  decimals = 0,
  className,
}: {
  to: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const state = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        value: to,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = state.value.toFixed(decimals);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [to, decimals]);

  return (
    <span ref={ref} className={className}>
      {to.toFixed(decimals)}
    </span>
  );
}
