"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

/**
 * Mobile bottom navigation (design system §4 — Dock, restyled).
 * Flat — no macOS magnification. Center slot = WhatsApp in ember.
 * Active page = ember dot under the icon. Hidden on md+.
 */

type DockItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const iconProps = {
  viewBox: "0 0 24 24",
  className: "size-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const items: DockItem[] = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg {...iconProps}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "/projects",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="8" height="10" rx="1" />
        <rect x="13" y="3" width="8" height="6" rx="1" />
        <rect x="13" y="11" width="8" height="10" rx="1" />
        <rect x="3" y="15" width="8" height="6" rx="1" />
      </svg>
    ),
  },
  // index 2 = WhatsApp center slot, rendered separately
  {
    label: "Services",
    href: "/services",
    icon: (
      <svg {...iconProps}>
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="m2 12 10 5 10-5" />
        <path d="m2 17 10 5 10-5" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
];

export default function MobileDock() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const renderItem = (item: DockItem) => (
    <Link
      key={item.href}
      href={item.href}
      aria-label={item.label}
      aria-current={isActive(item.href) ? "page" : undefined}
      className={`flex h-full flex-1 flex-col items-center justify-center gap-1 ${
        isActive(item.href) ? "text-charcoal" : "text-text-muted"
      }`}
    >
      {item.icon}
      <span
        className={`size-1 rounded-full ${
          isActive(item.href) ? "bg-ember" : "bg-transparent"
        }`}
      />
    </Link>
  );

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline-light bg-bone/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="flex h-16 items-stretch">
        {items.slice(0, 2).map(renderItem)}

        {/* Center: WhatsApp — the primary conversion action */}
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex flex-1 items-center justify-center"
        >
          <span className="flex size-12 -translate-y-3 items-center justify-center rounded-full bg-ember text-bone shadow-md transition-colors active:bg-ember-hover">
            <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
              <path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.9L2 22l5.25-1.49A9.9 9.9 0 1 0 12.04 2zm0 18.02a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.87.88-3-.2-.31a8.12 8.12 0 1 1 6.81 3.75zm4.46-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.5.11-.11.25-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03 0 1.2.87 2.35 1 2.51.12.16 1.72 2.62 4.16 3.68.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
            </svg>
          </span>
        </a>

        {items.slice(2).map(renderItem)}
      </div>
    </nav>
  );
}
