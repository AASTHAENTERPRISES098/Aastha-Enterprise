import { site } from "@/lib/site";

/**
 * LocalBusiness JSON-LD — rendered once in the root layout.
 * Every fact reads from site.ts so schema NAP can never drift from the
 * visible NAP (the top local-SEO lever).
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: `Aluminium windows & doors, structural glazing, furniture and interior contractors in ${site.address.city} since ${site.established}.`,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pincode,
      addressCountry: "IN",
    },
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
