// JSON-LD builders for both sites. `sameAs` cross-references so search engines
// understand the two domains are the same person / same owner.
import { OWNER, SOCIALS, COLLECTIVE } from "./bio.js";
import { DOMAINS } from "./brand.js";

// Site A — movsummirzazada.com (Person)
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: OWNER.fullName,
    url: DOMAINS.personal,
    email: `mailto:${OWNER.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: OWNER.city,
    },
    image: `${DOMAINS.personal}${OWNER.headshotUrl}`,
    sameAs: [
      DOMAINS.collective, // <— cross-reference the sibling brand site
      SOCIALS.linkedin,
      SOCIALS.github,
      SOCIALS.instagram,
      SOCIALS.x,
    ].filter(Boolean),
  };
}

// Site B — mimoscollective.com (Organization / brand, solo-owned)
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COLLECTIVE.brandName,
    url: DOMAINS.collective,
    logo: `${DOMAINS.collective}${COLLECTIVE.logoUrl}`,
    email: `mailto:${COLLECTIVE.email}`,
    // NOTE: Do NOT emit employees/founder counts. Solo brand — no headcount claims.
    sameAs: [
      DOMAINS.personal, // <— cross-reference the owner's personal site
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: COLLECTIVE.email,
      contactType: "customer support",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
  };
}

// Per-service page schema on Site B
export function serviceJsonLd({ slug, title, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: `${DOMAINS.collective}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: COLLECTIVE.brandName,
      url: DOMAINS.collective,
    },
  };
}
