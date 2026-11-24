import { company, faqs, managingDirector } from "./content";
import { photos, type FacilityImage } from "./imagery";

type ShareImage = FacilityImage & { width?: number; height?: number };
// Default link-preview image for social shares (closest stock photo to the 1.91:1 card shape).
const shareImage: ShareImage = { ...photos.atrium, width: 1673, height: 940 };

export const homeHeading = `Facility Management Services in ${company.coverage.country}`;
export const homeTitle = `${homeHeading} | ECFS`;
export const homeDesc = `ECFS provides integrated facility management services in ${company.coverage.country}, including housekeeping, commercial cleaning and MEP maintenance. Book a free site assessment.`;
export const coverageArea = { "@type": "Country", name: company.coverage.country };
export const siteOrigin = "https://ecfs-living-facility-recreation.lovable.app";
export const pageUrl = (path: string) => new URL(path, siteOrigin).href;
export const headMeta = (
  title: string,
  description: string,
  path: string,
  type = "website",
  image: ShareImage = shareImage,
) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: pageUrl(path) },
    { property: "og:image", content: pageUrl(image.url) },
    ...(image.width && image.height
      ? [
          { property: "og:image:width", content: String(image.width) },
          { property: "og:image:height", content: String(image.height) },
        ]
      : []),
    { property: "og:image:alt", content: image.alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: pageUrl(image.url) },
  ],
  links: [{ rel: "canonical", href: pageUrl(path) }],
});
const address = {
  "@type": "PostalAddress",
  streetAddress: "102, Dev Primi, Corporate Road, Prahladnagar",
  addressLocality: "Ahmedabad",
  addressRegion: "Gujarat",
  postalCode: "380051",
  addressCountry: "IN",
};
const organization = {
  "@type": "Organization",
  "@id": "/#organization",
  name: company.name,
  legalName: company.legal,
  foundingDate: String(company.since),
  telephone: company.tel,
  email: company.email,
  logo: "/ecfs-logo.png",
};
export const managingDirectorSchema = {
  "@type": "Person",
  "@id": "/about#managing-director",
  name: managingDirector.name.replace(/^Mr\.\s*/, ""),
  honorificPrefix: "Mr.",
  jobTitle: managingDirector.role,
  worksFor: { "@id": "/#organization" },
};
const business = {
  "@type": "ProfessionalService",
  "@id": "/#office",
  name: company.name,
  telephone: company.tel,
  email: company.email,
  address,
  areaServed: coverageArea,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  parentOrganization: { "@id": "/#organization" },
};
// Exact office coordinates and verified social URLs were not provided.
export function breadcrumbs(name?: string, path?: string, parent?: { name: string; path: string }) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      ...(parent
        ? [{ "@type": "ListItem", position: 2, name: parent.name, item: parent.path }]
        : []),
      ...(name && path
        ? [{ "@type": "ListItem", position: parent ? 3 : 2, name, item: path }]
        : []),
    ],
  };
}
export function schemaScript(items: unknown[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({ "@context": "https://schema.org", "@graph": items }).replaceAll(
      "<",
      "\\u003c",
    ),
  };
}
export const faqPageSchema = (items: readonly (readonly string[])[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
});
export const faqSchema = faqPageSchema(faqs);
export const homeSchema = schemaScript([organization, business, breadcrumbs(), faqSchema]);
