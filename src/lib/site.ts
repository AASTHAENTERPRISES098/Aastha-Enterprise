/**
 * Single source of truth for all business facts.
 * Footer, contact page, JSON-LD and meta descriptions read from here —
 * NAP consistency (top local-SEO lever) is enforced by construction.
 *
 * Editable content (contact, services, clients, metrics) now comes from
 * Sanity via `content.generated.json`, written at build time by
 * scripts/fetch-content.mjs. Structural facts that must never be edited by
 * hand in the CMS (canonical URL, GST, map coordinates, nav) stay in code.
 * See Aastha-CMS-Build-Document.md.
 */
import content from "./content.generated.json";

const s = content.settings;

export const site = {
  name: s.businessName,
  descriptor: s.descriptor,

  /** Used by metadataBase, sitemap.xml, robots.txt and JSON-LD @id. */
  url: "https://aastha-enterprise.com",
  tagline: s.tagline,
  established: s.established,
  owner: s.owner,
  /** Kept for records/invoices — not rendered anywhere (client request) */
  gst: "24ALWPP2857P1Z1",

  phone: {
    display: s.phoneDisplay,
    e164: s.phoneE164,
    href: `tel:${s.phoneE164}`,
  },

  whatsapp: {
    display: s.whatsappDisplay,
    e164: s.whatsappE164,
    href: `https://wa.me/${s.whatsappE164.replace(/\D/g, "")}`,
  },

  email: s.email,

  address: {
    line1: s.addressLine1,
    line2: s.addressLine2,
    city: s.city,
    state: s.state,
    pincode: s.pincode,
    full: `${s.addressLine1}, ${s.addressLine2}, ${s.city} – ${s.pincode}`,
  },

  /**
   * Social profile URLs for JSON-LD `sameAs` (links this business as one
   * entity across the web for Google/AI). Add Facebook/YouTube/Instagram
   * URLs here once confirmed.
   */
  social: [] as string[],

  /** Google Business Profile map links (place id g/11b6gl4f58) */
  maps: {
    shareUrl: "https://maps.app.goo.gl/LVAW5uEeBBwziim29",
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1022367814876!2d73.19722589999999!3d22.311972899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ddc1f7eadd%3A0x658231a5e080934b!2sAastha%20Enterprise!5e0!3m2!1sen!2sin!4v1784271281893!5m2!1sen!2sin",
    lat: 22.3119729,
    lng: 73.1972259,
  },

  hours: {
    display: s.hoursDisplay,
    closed: s.hoursClosed,
    /** For LocalBusiness JSON-LD — fixed schema format, not CMS-edited */
    schema: "Mo-Sa 10:00-18:30",
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  /** 4 service categories with specs/intro/process/image — from Sanity */
  services: content.services,

  /** Client wall — text only, no logos (trademark rule) */
  clients: content.clients.map((c) => c.name),

  /** Homepage trust strip — the CMS "show on homepage" subset */
  marqueeClients: content.clients
    .filter((c) => c.featured)
    .map((c) => c.name),

  metrics: {
    yearsOfWork: s.yearsOfWork,
    clientCount: s.clientCount,
    googleRating: s.googleRating,
    /** Not rendered yet — awaiting a confirmed number from Hitesh */
    projectsCompleted: null as number | null,
  },
} as const;

export type Service = (typeof site.services)[number];
