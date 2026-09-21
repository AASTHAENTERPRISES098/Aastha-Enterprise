"use client";

import { useRef } from "react";

/**
 * Ripple CTA (Magic UI, restyled §4): ember bg / bone text / darker ripple,
 * or outline variant. Renders an anchor — every CTA on this site is a link
 * (WhatsApp, tel:, or internal). ≥48px tap height.
 */
export default function RippleButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "outline-dark";
  external?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const spawnRipple = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.style.cssText = `position:absolute;border-radius:9999px;pointer-events:none;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;background:${variant === "primary" ? "rgba(28,26,22,0.25)" : "rgba(199,80,31,0.18)"};transform:scale(0);animation:ripple 0.6s ease-out forwards;`;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  };

  const variants = {
    // Pure white (not bone) on ember: 4.57:1, passes WCAG AA — bone was 4.23
    primary: "bg-ember text-white hover:bg-ember-hover",
    outline: "border border-charcoal text-charcoal hover:bg-stone",
    "outline-dark": "border border-bone/40 text-bone hover:border-bone",
  };

  return (
    <a
      ref={ref}
      href={href}
      onPointerDown={spawnRipple}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-btn px-8 py-3.5 text-base font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
