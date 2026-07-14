/**
 * Single source of truth for all business facts.
 * Footer, contact page, JSON-LD and meta descriptions read from here —
 * NAP consistency (top local-SEO lever) is enforced by construction.
 * Source: Aastha-Enterprise-Master-Document.md
 */

export const site = {
  name: "Aastha Enterprise",
  descriptor: "Engineers & Contractors",
  tagline: "Twenty-five years of building trust.",
  established: 2000,
  owner: "Hitesh Panchal",
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
      short: "Structural glazing, curtain walls, spider glass and façades.",
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
