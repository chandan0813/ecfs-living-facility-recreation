import { findBlogPost } from "./blog";
import { areas, industries, secondary, services } from "./content";

/**
 * One place for how pages relate, so service, industry, area and article pages
 * link to each other consistently. Unknown slugs are skipped when resolved.
 */
const servicesByIndustry: Record<string, readonly string[]> = {
  "facility-management-for-offices": [
    "commercial-cleaning",
    "pantry-office-support",
    "mep-maintenance",
    "pest-control",
  ],
  "facility-management-for-factories": [
    "housekeeping-services",
    "manpower-payroll",
    "mep-maintenance",
    "pest-control",
  ],
  "facility-management-for-hospitals": [
    "housekeeping-services",
    "manpower-payroll",
    "pest-control",
    "mep-maintenance",
  ],
  "facility-management-for-education": [
    "housekeeping-services",
    "gardening",
    "event-housekeeping",
    "pest-control",
  ],
  "facility-management-for-retail": [
    "commercial-cleaning",
    "specialised-cleaning",
    "pest-control",
    "mep-maintenance",
  ],
  "facility-management-for-societies": [
    "housekeeping-services",
    "gardening",
    "mep-maintenance",
    "pest-control",
  ],
  "facility-management-for-pharma": [
    "housekeeping-services",
    "manpower-payroll",
    "pest-control",
    "mep-maintenance",
  ],
  "facility-management-for-malls": [
    "housekeeping-services",
    "specialised-cleaning",
    "event-housekeeping",
    "mep-maintenance",
  ],
};

const industriesByArea: Record<string, readonly string[]> = {
  "facility-management-ahmedabad": [
    "facility-management-for-offices",
    "facility-management-for-factories",
    "facility-management-for-societies",
    "facility-management-for-malls",
  ],
  "facility-management-gandhinagar": [
    "facility-management-for-education",
    "facility-management-for-offices",
  ],
  "facility-management-gift-city": ["facility-management-for-offices"],
  "facility-management-sg-highway": [
    "facility-management-for-offices",
    "facility-management-for-retail",
  ],
  "facility-management-prahladnagar": [
    "facility-management-for-offices",
    "facility-management-for-retail",
  ],
  "facility-management-sanand-gidc": [
    "facility-management-for-factories",
    "facility-management-for-pharma",
  ],
  "facility-management-vadodara": [
    "facility-management-for-factories",
    "facility-management-for-offices",
  ],
  "facility-management-surat": [
    "facility-management-for-retail",
    "facility-management-for-malls",
    "facility-management-for-offices",
  ],
  "facility-management-rajkot": [
    "facility-management-for-factories",
    "facility-management-for-retail",
  ],
  "facility-management-bhubaneswar": [
    "facility-management-for-offices",
    "facility-management-for-hospitals",
    "facility-management-for-education",
  ],
  "facility-management-rajasthan": [
    "facility-management-for-offices",
    "facility-management-for-retail",
  ],
};

const nearbyAreas: Record<string, readonly string[]> = {
  "facility-management-ahmedabad": [
    "facility-management-sg-highway",
    "facility-management-prahladnagar",
    "facility-management-gandhinagar",
  ],
  "facility-management-gandhinagar": [
    "facility-management-gift-city",
    "facility-management-ahmedabad",
  ],
  "facility-management-gift-city": [
    "facility-management-gandhinagar",
    "facility-management-ahmedabad",
  ],
  "facility-management-sg-highway": [
    "facility-management-prahladnagar",
    "facility-management-ahmedabad",
  ],
  "facility-management-prahladnagar": [
    "facility-management-sg-highway",
    "facility-management-ahmedabad",
  ],
  "facility-management-sanand-gidc": [
    "facility-management-ahmedabad",
    "facility-management-vadodara",
  ],
  "facility-management-vadodara": ["facility-management-ahmedabad", "facility-management-surat"],
  "facility-management-surat": ["facility-management-vadodara", "facility-management-ahmedabad"],
  "facility-management-rajkot": ["facility-management-ahmedabad", "facility-management-vadodara"],
  "facility-management-bhubaneswar": ["facility-management-ahmedabad"],
  "facility-management-rajasthan": ["facility-management-ahmedabad"],
};

/** Guides that help with each page; new articles are picked up once they exist. */
const guidesByPage: Record<string, readonly string[]> = {
  "integrated-facility-management": [
    "choosing-a-facility-management-company",
    "housekeeping-contract-checklist",
  ],
  "housekeeping-services": ["housekeeping-contract-checklist", "how-often-deep-clean-office"],
  "commercial-cleaning": ["ahmedabad-cleaning-costs", "how-often-deep-clean-office"],
  "mep-maintenance": ["preventive-facility-maintenance-checklist"],
  "manpower-payroll": [
    "pf-esic-compliance-outsourced-staff",
    "choosing-a-facility-management-company",
  ],
  "specialised-cleaning": ["how-often-deep-clean-office"],
  "facility-management-for-offices": ["how-often-deep-clean-office", "ahmedabad-cleaning-costs"],
  "facility-management-for-factories": [
    "pf-esic-compliance-outsourced-staff",
    "preventive-facility-maintenance-checklist",
  ],
  "facility-management-for-hospitals": ["housekeeping-contract-checklist"],
  "facility-management-for-pharma": ["housekeeping-contract-checklist"],
  "facility-management-for-malls": [
    "how-often-deep-clean-office",
    "housekeeping-contract-checklist",
  ],
  "facility-management-for-retail": ["ahmedabad-cleaning-costs"],
  "facility-management-for-societies": ["preventive-facility-maintenance-checklist"],
  "facility-management-ahmedabad": [
    "ahmedabad-cleaning-costs",
    "choosing-a-facility-management-company",
  ],
};

const allServices = [...services, ...secondary];
const byServiceSlug = new Map(allServices.map((s) => [s.slug, s]));
const byIndustrySlug = new Map(industries.map((i) => [i.slug, i]));
const byAreaSlug = new Map(areas.map((a) => [a.slug, a]));

const pick = <T>(slugs: readonly string[] | undefined, from: Map<string, T>) =>
  (slugs ?? []).flatMap((slug) => {
    const item = from.get(slug);
    return item ? [item] : [];
  });

export type RelatedLink = { slug: string; name: string; to: "page" | "blog" };

/** Services to show as cards on a detail page. Falls back to the core services. */
export function relatedServices(slug: string) {
  const area = industriesByArea[slug];
  const fromIndustry = servicesByIndustry[slug];
  const fromArea = area
    ? [...new Set(area.flatMap((i) => servicesByIndustry[i] ?? []))]
    : undefined;
  const chosen = pick(fromIndustry ?? fromArea, byServiceSlug);
  const list = chosen.length ? chosen : services.filter((s) => s.slug !== slug);
  return list.filter((s) => s.slug !== slug).slice(0, 3);
}

/** Text links to other pages and guides that relate to this one. */
export function relatedLinks(slug: string): { title: string; links: RelatedLink[] }[] {
  const groups: { title: string; links: RelatedLink[] }[] = [];
  const isService = byServiceSlug.has(slug);
  const isArea = byAreaSlug.has(slug);

  const sectors = isService
    ? industries.filter((i) => servicesByIndustry[i.slug]?.includes(slug))
    : isArea
      ? pick(industriesByArea[slug], byIndustrySlug)
      : [];
  if (sectors.length)
    groups.push({
      title: "Industries",
      links: sectors.map((i) => ({ slug: i.slug, name: i.name, to: "page" })),
    });

  const places = isArea
    ? pick(nearbyAreas[slug], byAreaSlug)
    : byIndustrySlug.has(slug)
      ? areas.filter((a) => industriesByArea[a.slug]?.includes(slug))
      : [];
  if (places.length)
    groups.push({
      title: isArea ? "Nearby service areas" : "Service areas",
      links: places.map((a) => ({ slug: a.slug, name: a.name, to: "page" })),
    });

  const guides = (guidesByPage[slug] ?? []).flatMap((g) => {
    const post = findBlogPost(g);
    return post ? [{ slug: post.slug, name: post.title, to: "blog" as const }] : [];
  });
  if (guides.length) groups.push({ title: "Guides", links: guides });
  return groups;
}

/** Services and sectors an article supports, derived from the same guide map. */
export function pagesForGuide(guideSlug: string): RelatedLink[] {
  return Object.entries(guidesByPage)
    .filter(([, guides]) => guides.includes(guideSlug))
    .flatMap(([slug]) => {
      const page = byServiceSlug.get(slug) ?? byIndustrySlug.get(slug);
      return page ? [{ slug, name: page.name, to: "page" as const }] : [];
    })
    .slice(0, 4);
}

/** Raw maps, exported so tests can check every slug points at a real page. */
export const relationMaps = { servicesByIndustry, industriesByArea, nearbyAreas, guidesByPage };
