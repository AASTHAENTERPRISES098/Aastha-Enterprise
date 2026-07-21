import { site } from "@/lib/site";

/**
 * LocalBusiness JSON-LD — rendered once in the root layout.
 * Every fact reads from site.ts so schema NAP can never drift from the
 * visible NAP (the top local-SEO lever).
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: `Aluminium windows & doors, structural glazing, furniture and interior contractors in ${site.address.city} since ${site.established}.`,
    url: site.url,
    logo: `${site.url}/logo-mark.png`,
    image: `${site.url}/images/og-image.png`,
    telephone: site.phone.e164,
    email: site.email,
    foundingDate: String(site.established),
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.maps.lat,
      longitude: site.maps.lng,
    },
    hasMap: site.maps.shareUrl,
    openingHours: site.hours.schema,
    priceRange: "₹₹",
    areaServed: {
      "@type": "State",
      name: site.address.state,
    },
    knowsAbout: site.services.map((s) => s.title),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** BreadcrumbList JSON-LD — mirrors the visible breadcrumb UI. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQPage JSON-LD — mirrors FAQ content already visible on the page. */
export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Service JSON-LD — one per service detail page, linked to the business. */
export function ServiceJsonLd({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: `${site.url}/services/${slug}/`,
    serviceType: title,
    provider: { "@id": `${site.url}/#business` },
    areaServed: {
      "@type": "City",
      name: site.address.city,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
