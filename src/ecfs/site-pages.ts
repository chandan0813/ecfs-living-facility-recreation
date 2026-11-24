import { company } from "./content";

export const sitePages = {
  services: {
    name: "Services",
    headline: "Integrated facility management services",
    description:
      "Explore ECFS housekeeping, commercial cleaning, MEP maintenance and manpower services. Get a plan scoped to your facility and operating hours.",
  },
  industries: {
    name: "Industries",
    headline: "Industries we serve",
    description:
      "Facility support for offices, factories, healthcare, retail and more, matched to each site’s needs.",
  },
  "service-areas": {
    name: "Service Areas",
    headline: `${company.coverage.label} Service Areas`,
    description: `ECFS provides facility management across ${company.coverage.country}, with a head office in Ahmedabad and a regional office in Bhubaneswar.`,
  },
  contact: {
    name: "Contact",
    headline: "Book a free site assessment",
    description: `Tell ECFS about your facility anywhere in ${company.coverage.country} for a free, no-obligation site assessment and a scoped quote.`,
  },
  faq: {
    name: "FAQs",
    headline: "Facility management FAQs",
    description:
      "Find answers about ECFS services, coverage, pricing, compliance and booking a free site assessment.",
  },
} as const;

export const sitePagePaths = Object.keys(sitePages).map((key) => `/${key}`);
