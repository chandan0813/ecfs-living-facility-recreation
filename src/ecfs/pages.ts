import { areas, company, industries, secondary, services } from "./content";
export type Detail = { slug: string; name: string; text: string; kind: string; lines?: string[] };
export const aboutPage: Detail = {
  slug: "about",
  name: "About Easy Clean Facility Services",
  text: `Since ${company.since}, ECFS has combined soft services, hard services and trained manpower under one accountable contract, serving sites across ${company.coverage.country} from Ahmedabad.`,
  kind: "Company",
  lines: [
    "Led by Managing Director Mr. Prafulla Behera.",
    "Mission: Deliver quality services and lasting value for our clients, communities and principals.",
    "Vision: Set the regional standard for integrated facility management.",
    "Values: Service · Quality · Value.",
  ],
};
export const details: Detail[] = [
  ...[...services, ...secondary].map(({ slug, name, text }) => ({
    slug,
    name,
    text,
    kind: "Services",
  })),
  ...industries.map(({ slug, name, text }) => ({ slug, name, text, kind: "Industries" })),
  ...areas.map((s) => ({ ...s, name: `Facility Management in ${s.name}`, kind: "Service Areas" })),
  aboutPage,
  {
    slug: "careers",
    name: "Careers at ECFS",
    text: "Build a career in facility management, from housekeeping and mechanized cleaning to technical, supervisory and operations roles.",
    kind: "Company",
    lines: [
      "Statutory benefits, structured training and opportunities to grow.",
      "Send your CV with your preferred role and city.",
    ],
  },
  {
    slug: "privacy-policy",
    name: "Privacy Policy",
    text: "The enquiry form prepares a WhatsApp message from the details you enter. ECFS does not receive that message unless you choose to send it.",
    kind: "Legal",
    lines: [`For privacy questions, contact ${company.email}.`],
  },
  {
    slug: "terms",
    name: "Terms & Conditions",
    text: "Service scope, pricing and schedules are agreed in the written proposal and service-level agreement for each site.",
    kind: "Legal",
    lines: [`For questions about service terms, contact ${company.email}.`],
  },
];
export const findDetail = (slug: string) => details.find((page) => page.slug === slug);

export function detailDirectory(kind: string) {
  switch (kind) {
    case "Services":
      return { name: "Services", path: "/services" } as const;
    case "Industries":
      return { name: "Industries", path: "/industries" } as const;
    case "Service Areas":
      return { name: "Service Areas", path: "/service-areas" } as const;
    case "Company":
      return { name: "About", path: "/about" } as const;
    default:
      return undefined;
  }
}
