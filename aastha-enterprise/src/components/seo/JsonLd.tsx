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
    founder: {
      "@type": "Person",
      name: site.owner,
      jobTitle: "Founder",
      url: site.url,
    },
    sameAs: [site.maps.shareUrl, ...site.social],
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

/**
 * Article (BlogPosting) JSON-LD — one per blog post. This is the structured
 * data Google shows as rich results and that AI engines parse to attribute a
 * quote. Author + dates carry the E-E-A-T / freshness signals.
 */
export function ArticleJsonLd({
  title,
  description,
  slug,
  image,
  authorName,
  authorCredential,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  authorName: string;
  authorCredential?: string;
  datePublished: string;
  dateModified?: string;
}) {
  const url = `${site.url}/blog/${slug}/`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    image,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: site.url,
      jobTitle: authorCredential || "Founder",
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      "@id": `${site.url}/#business`,
      logo: { "@type": "ImageObject", url: `${site.url}/logo-mark.png` },
    },
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
