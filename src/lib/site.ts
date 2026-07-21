/**
 * Single source of truth for all business facts.
 * Footer, contact page, JSON-LD and meta descriptions read from here —
 * NAP consistency (top local-SEO lever) is enforced by construction.
 * Source: Aastha-Enterprise-Master-Document.md
 */

export const site = {
  name: "Aastha Enterprise",
  descriptor: "Engineers & Contractors",

  /**
   * Used by metadataBase, sitemap.xml, robots.txt and JSON-LD @id.
   * Registered 21 Jul 2026, DNS pointed at Cloudflare Pages same day.
   */
  url: "https://aastha-enterprise.com",
  tagline: "Twenty-five years of building trust.",
  established: 2000,
  owner: "Hitesh Panchal",
  /** Kept for records/invoices — not rendered anywhere (client request, 20 Jul 2026) */
  gst: "24ALWPP2857P1Z1",

  phone: {
    /** Primary call number — feature this */
    display: "098253 63015",
    e164: "+919825363015",
    href: "tel:+919825363015",
  },

  whatsapp: {
    /** Monitored daily — primary conversion path */
    display: "+91 79840 33895",
    e164: "+917984033895",
    href: "https://wa.me/917984033895",
  },

  email: "aasthaenterprises098@gmail.com",

  address: {
    line1: "AB-35/38, RBG Commercial Complex",
    line2: "Bahucharaji Road, Karelibaug",
    city: "Vadodara",
    state: "Gujarat",
    pincode: "390018",
    full: "AB-35/38, RBG Commercial Complex, Bahucharaji Road, Karelibaug, Vadodara – 390018",
  },

  /** Google Business Profile map links (place id g/11b6gl4f58) */
  maps: {
    /** Short share link — opens the GBP pin in the Google Maps app/site */
    shareUrl: "https://maps.app.goo.gl/LVAW5uEeBBwziim29",
    /** Official place embed for <iframe src> */
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1022367814876!2d73.19722589999999!3d22.311972899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ddc1f7eadd%3A0x658231a5e080934b!2sAastha%20Enterprise!5e0!3m2!1sen!2sin!4v1784271281893!5m2!1sen!2sin",
    /** GBP pin coordinates — for LocalBusiness geo schema */
    lat: 22.3119729,
    lng: 73.1972259,
  },

  hours: {
    display: "Mon–Sat, 10:00 AM – 6:30 PM",
    closed: "Sunday closed",
    /** For LocalBusiness JSON-LD */
    schema: "Mo-Sa 10:00-18:30",
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
    { label: "Contact", href: "/contact" },
  ],

  services: [
    {
      slug: "aluminium-windows-doors",
      title: "Aluminium Windows & Doors",
      short: "Sliding and openable windows, doors, sections and partitions.",
      keyword: "aluminium windows vadodara",
    },
    {
      slug: "structural-glazing-curtain-wall",
      title: "Structural Glazing & Curtain Wall",
      short: "Structural glazing, curtain walls, spider glass and facades.",
      keyword: "structural glazing vadodara",
    },
    {
      slug: "furniture",
      title: "Wooden & Modular Furniture",
      short: "Office furniture, workstations, modular kitchens and interiors.",
      keyword: "office furniture vadodara",
    },
    {
      slug: "false-ceiling-interior",
      title: "False Ceiling & Interior Work",
      short: "POP, false ceilings, blinds, SS railing and interior finishing.",
      keyword: "false ceiling vadodara",
    },
  ],

  /**
   * The credibility asset — client names as TEXT only.
   * No corporate logos without Hitesh's explicit permission (trademark rule).
   */
  clients: [
    "L&T Hydrocarbon Engineering",
    "Saint-Gobain India",
    "Zydus Cadila",
    "Lupin Pharmaceuticals",
    "Grasim Industries",
    "Alembic Real Estate",
    "Motilal Oswal",
    "India Infoline",
    "JP Iscon",
    "Safal Group",
    "Arvind & Smart Value Homes",
    "Glenmark",
    "Deepak Phenolics",
    "Aikya Chemical",
    "AFC Elastomers",
    "Cube Construction Engineering",
    "Katira Construction",
    "Rohan Builders",
    "Sharad Constructions",
    "Manglam Construction",
    "National Builders Infrastructure",
    "Dipesh Construction",
    "Stem Cell Hospital, Surat",
    "T.B. Hospital, Gotri",
    "Stone Sapphire",
    "Nirmal Bang",
    "Applewoods Estate",
    "APMC Bharuch",
  ],

  /** Marquee subset for the homepage trust strip */
  marqueeClients: [
    "L&T Hydrocarbon",
    "Saint-Gobain",
    "Zydus Cadila",
    "Lupin",
    "Grasim Industries",
    "Alembic",
    "Motilal Oswal",
    "India Infoline",
    "JP Iscon",
    "Glenmark",
  ],

  metrics: {
    yearsOfWork: 25,
    clientCount: 28,
    googleRating: 4.8,
    /**
     * ⚠ UNCONFIRMED — "500+" was AI-suggested. Must be confirmed by Hitesh
     * before launch. null = don't render a projects metric yet.
     */
    projectsCompleted: null as number | null,
  },
} as const;

export type Service = (typeof site.services)[number];
