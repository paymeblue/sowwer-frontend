// Single source of truth for anything that identifies the site to crawlers,
// social cards and LLMs. Keep this in step with public/llms.txt.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.soower.org"
).replace(/\/$/, "");

export const SITE_NAME = "SOOWER Widows and Missions Foundation";
export const SITE_SHORT_NAME = "SOOWER";

export const SITE_TAGLINE = "Perfectly positioned to lend a helping hand";

export const SITE_DESCRIPTION =
  "SOOWER Widows and Missions Foundation is a Nigerian faith-based nonprofit providing monthly stipends, healthcare, education sponsorships and welfare support to widows, orphans and missionaries. 2,943 lives reached across 29 states in 2025.";

export const ORG_CONTACT = {
  email: "info@soower.org",
  telephone: "+234 707 601 6055",
  street: "4th Floor, Kojo Motors Building, Shehu Yar'adua Way, Mabushi",
  locality: "Abuja",
  country: "NG",
} as const;

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/soower.foundation",
  "https://www.facebook.com/Soower Foundation",
] as const;

export const KEYWORDS = [
  "SOOWER Foundation",
  "widows support Nigeria",
  "orphan scholarship Nigeria",
  "missionary welfare Nigeria",
  "Christian nonprofit Abuja",
  "donate to widows Nigeria",
  "WidowCare",
  "Donate A Dream",
  "MissionCare",
  "faith-based charity Nigeria",
];

/**
 * JSON-LD for the organisation itself. Rendered once, in the landing layout.
 *
 * @return {object} Schema.org NGO payload.
 */
export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  slogan: SITE_TAGLINE,
  description: SITE_DESCRIPTION,
  foundingDate: "2024",
  areaServed: { "@type": "Country", name: "Nigeria" },
  address: {
    "@type": "PostalAddress",
    streetAddress: ORG_CONTACT.street,
    addressLocality: ORG_CONTACT.locality,
    addressCountry: ORG_CONTACT.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: ORG_CONTACT.email,
    telephone: ORG_CONTACT.telephone,
  },
  sameAs: [...SOCIAL_PROFILES],
  knowsAbout: [
    "widow welfare",
    "orphan education sponsorship",
    "missionary support",
    "internally displaced persons relief",
  ],
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
});

export const breadcrumbJsonLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: `${SITE_URL}${crumb.path}`,
  })),
});
