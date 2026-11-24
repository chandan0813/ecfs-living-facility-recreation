import {
  Building2,
  Sparkles,
  PanelsTopLeft,
  Zap,
  ShieldCheck,
  UsersRound,
  Factory,
  HeartPulse,
  GraduationCap,
  Store,
  House,
  FlaskConical,
  ShoppingBag,
  Leaf,
  ClipboardCheck,
  Clock3,
  MapPinned,
  Layers3,
} from "lucide-react";

export const company = {
  name: "Easy Clean Facility Services",
  legal: "ECFS Private Limited",
  since: 2018,
  phone: "+91 77900 42133",
  tel: "+917790042133",
  care: "079 4801 0848",
  email: "info@easycleanfacility.in",
  cin: "U74999OR2018PTC028771",
  gst: "24AAFCE0317G1Z7",
  coverage: { label: "PAN India", country: "India" },
  hours: "Mon–Sat, 9:00 AM – 7:00 PM",
  head: "102, Dev Primi, Corporate Road, Prahladnagar, Ahmedabad, Gujarat 380051",
  regional: "EB-396, Stage 2, Laxmi Sagar, Brit Colony, Bhubaneswar, Odisha 751006",
};
export const managingDirector = {
  name: "Mr. Prafulla Behera",
  role: "Managing Director",
  heading: "From the Managing Director",
  bio: [
    "Mr. Behera’s leadership philosophy centres on empowering teams with the skills and resources they need to deliver exceptional results, while maintaining the highest standards of safety and environmental responsibility.",
    "Under his leadership, ECFS has grown into a reputable provider of integrated facility management, serving clients across multiple industry verticals.",
    "His approach emphasises long-term relationships built on consistent service quality and a commitment to client satisfaction.",
  ],
  pillars: [
    ["8+ years", "Of service excellence"],
    ["People-first", "Trained, disciplined teams"],
    ["Quality-focused", "Consistent standards"],
  ],
} as const;
export const guaranteeHours = 24;
export const guarantee = `Report a service issue within ${guaranteeHours} hours and we’ll re-service the area at no extra charge.`;
export const services = [
  {
    slug: "integrated-facility-management",
    name: "Integrated Facility Management",
    short: "Facility Management",
    icon: Layers3,
    category: "Integrated services",
    text: "One partner for soft and hard services: one contact, one invoice, defined SLAs and monthly reporting.",
  },
  {
    slug: "housekeeping-services",
    name: "Housekeeping & Cleaning Services",
    short: "Housekeeping",
    icon: Sparkles,
    category: "Soft services",
    text: "Daily, mechanized and deep cleaning for offices, factories and homes.",
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial & Office Cleaning",
    short: "Office Cleaning",
    icon: PanelsTopLeft,
    category: "Soft services",
    text: "Daily or periodic cleaning for offices, IT parks and showrooms, priced per sq ft or per deployment.",
  },
  {
    slug: "mep-maintenance",
    name: "Electro-Mechanical & MEP Maintenance",
    short: "MEP Maintenance",
    icon: Zap,
    category: "Hard services",
    text: "Electrical, plumbing and HVAC upkeep. 24/7 response for contract clients.",
  },
  {
    slug: "pest-control",
    name: "Integrated Pest Control",
    short: "Pest Control",
    icon: ShieldCheck,
    category: "Soft services",
    text: "Odourless, regulation-compliant pest and rodent control for offices, kitchens, hospitals and factories.",
  },
  {
    slug: "manpower-payroll",
    name: "Manpower & Payroll",
    short: "Manpower & Payroll",
    icon: UsersRound,
    category: "Workforce solutions",
    text: "Trained housekeeping, technical and support staff with managed payroll, PF and ESIC filings.",
  },
];
export const secondary = [
  {
    slug: "specialised-cleaning",
    name: "Specialised Cleaning",
    text: "Glass façade and high-rise cleaning, floor and marble polishing, and post-construction cleaning. Solar panel and water-tank cleaning on request.",
  },
  {
    slug: "pantry-office-support",
    name: "Pantry & Office Support",
    text: "Trained pantry staff, front-office support and administrative manpower.",
  },
  {
    slug: "gardening",
    name: "Gardening",
    text: "Scheduled upkeep of lawns, planters and outdoor areas, so entrances, courtyards and landscaped spaces stay neat and welcoming all year round.",
  },
  {
    slug: "event-housekeeping",
    name: "Event Housekeeping",
    text: "On-demand support for corporate events, conferences and exhibitions before, during and after.",
  },
];
export const industries = [
  {
    slug: "facility-management-for-offices",
    name: "Corporate & IT/ITES",
    icon: Building2,
    text: "Daily housekeeping, pantry, front-office support and MEP upkeep for offices and tech parks.",
  },
  {
    slug: "facility-management-for-factories",
    name: "Manufacturing & Industrial",
    icon: Factory,
    text: "Industrial deep cleaning, machine-area housekeeping and labour supply across GIDC estates.",
  },
  {
    slug: "facility-management-for-hospitals",
    name: "Healthcare & Hospitals",
    icon: HeartPulse,
    text: "Infection-aware housekeeping, 24/7 manpower and waste-handling support from trained staff.",
  },
  {
    slug: "facility-management-for-education",
    name: "Education & Institutions",
    icon: GraduationCap,
    text: "Campus cleaning, hostel and classroom housekeeping, and event support.",
  },
  {
    slug: "facility-management-for-retail",
    name: "Commercial & Retail",
    icon: Store,
    text: "Showroom cleaning, façade and floor care, and footfall-ready hygiene scheduled around trading hours.",
  },
  {
    slug: "facility-management-for-societies",
    name: "Residential Societies",
    icon: House,
    text: "Common-area housekeeping, gardening, security support and maintenance.",
  },
  {
    slug: "facility-management-for-pharma",
    name: "Pharmaceuticals",
    icon: FlaskConical,
    text: "Controlled-environment cleaning and compliance-aware housekeeping for pharmaceutical sites.",
  },
  {
    slug: "facility-management-for-malls",
    name: "Shopping Malls",
    icon: ShoppingBag,
    text: "Large-floor mechanized cleaning, restroom hygiene and event housekeeping.",
  },
];
export const areas = (
  [
    [
      "ahmedabad",
      "Ahmedabad",
      "Integrated facility management for offices, factories, institutions and residential complexes, coordinated from our Prahladnagar head office.",
    ],
    [
      "gandhinagar",
      "Gandhinagar",
      "Housekeeping, office support and maintenance for institutions and commercial premises.",
    ],
    [
      "gift-city",
      "GIFT City",
      "Daily housekeeping, pantry support, MEP maintenance and pest control for corporate offices and financial institutions in GIFT City, Gandhinagar.",
    ],
    [
      "sg-highway",
      "SG Highway",
      "Office cleaning, floor care and preventive maintenance for workplaces and showrooms along the SG Highway corridor.",
    ],
    [
      "prahladnagar",
      "Prahladnagar",
      "Our head office on Corporate Road coordinates cleaning, staffing and site assessments for local businesses.",
    ],
    [
      "sanand-gidc",
      "Sanand GIDC",
      "Industrial deep cleaning, machine-area housekeeping and trained workforce support for manufacturing sites.",
    ],
    [
      "vadodara",
      "Vadodara",
      "Scheduled cleaning, maintenance and staffing scoped to commercial and industrial premises.",
    ],
    [
      "surat",
      "Surat",
      "Daily and periodic facility cleaning for offices, showrooms and retail spaces.",
    ],
    [
      "rajkot",
      "Rajkot",
      "Mechanized cleaning and maintenance support for commercial and industrial facilities.",
    ],
    [
      "bhubaneswar",
      "Bhubaneswar",
      "Facility management in Odisha is coordinated from our regional office in Laxmi Sagar, Bhubaneswar.",
    ],
    [
      "rajasthan",
      "Rajasthan",
      "Multi-site housekeeping and facility maintenance under one contract and consistent service standards.",
    ],
  ] as const
).map(([key, name, text]) => ({ slug: `facility-management-${key}`, name, text }));
export const trust = [
  { icon: Clock3, top: "Since 2018", low: "Operating since" },
  { icon: MapPinned, top: company.coverage.label, low: "Service coverage" },
  { icon: UsersRound, top: "Trained & verified", low: "Workforce" },
  { icon: ClipboardCheck, top: "100% compliant", low: "PF · ESIC · GST" },
  { icon: Zap, top: "24/7 response", low: "Contracted clients" },
];
export const differentiators = [
  [
    Layers3,
    "One accountable partner",
    "Soft services, hard services and manpower under one contract.",
  ],
  [
    UsersRound,
    "Trained & verified staff",
    "Screened, background-checked and trained before deployment.",
  ],
  [ShieldCheck, "100% statutory compliance", "PF, ESIC and GST compliance on each deployment."],
  [Clock3, "24/7 service response", "On-call support for contracted clients."],
  [Leaf, "Eco-friendly methods", "Responsible products and practices, matched to the site."],
  [Sparkles, "Satisfaction guarantee", guarantee],
  [
    ClipboardCheck,
    "Transparent reporting",
    "Monthly checklists, SLA reviews and a named point of contact.",
  ],
  [
    MapPinned,
    `${company.coverage.label} coverage`,
    `Facility management for single and multiple sites across ${company.coverage.country}.`,
  ],
] as const;
export const process = [
  ["Free site assessment", "We survey your premises and understand your requirements."],
  ["Custom proposal & SLA", "A scoped plan with staffing, schedule and transparent pricing."],
  ["Trained deployment", "Verified staff, uniforms, materials and a site supervisor."],
  ["Supervision & audits", "Daily checklists, quality audits and monthly reviews."],
  ["Continuous improvement", "We act on feedback and refine the programme over time."],
];
export const faqs = [
  [
    "What is integrated facility management?",
    `Integrated facility management (IFM) brings housekeeping, cleaning, maintenance, pest control and manpower together through one provider and one point of contact. ECFS provides IFM across ${company.coverage.country}.`,
  ],
  [
    "What services does ECFS provide?",
    "ECFS provides integrated facility management, housekeeping, commercial and deep cleaning, MEP maintenance, pest control, pantry and office support, gardening, event housekeeping, staffing and PF/ESIC-compliant payroll outsourcing.",
  ],
  [
    "Which cities and states does ECFS serve?",
    `ECFS offers ${company.coverage.label} service coverage, with a head office in Ahmedabad and a regional office in Bhubaneswar. Share your city and requirements for a site assessment.`,
  ],
  [
    "How much do housekeeping or cleaning services cost in Ahmedabad?",
    "Housekeeping and cleaning in Ahmedabad can be priced per square foot, per deployment or as a fixed monthly contract. Floor area, staffing, frequency and scope determine the cost. A free site assessment provides an exact, itemised quote.",
  ],
  [
    "Is ECFS staff PF and ESIC compliant?",
    "Yes. ECFS is registered for Provident Fund (PF) and ESIC and manages the statutory deductions and filings for its workforce.",
  ],
  [
    "What is the difference between soft services and hard services?",
    "Soft services cover people-led tasks such as housekeeping, pest control and gardening. Hard services cover technical maintenance such as electrical, plumbing and HVAC. ECFS provides both under one contract.",
  ],
  ["Does ECFS offer a satisfaction guarantee?", `Yes. ${guarantee}`],
  [
    "How do I get a quote or start service?",
    `Call ${company.phone}, email ${company.email}, or use the contact form to request a callback. ECFS arranges a free site visit, then sends a scoped proposal with pricing and an SLA.`,
  ],
  [
    "Why choose ECFS over other facility management companies in Gujarat?",
    "ECFS combines trained and verified staff, statutory compliance, 24/7 response for contracted clients, eco-friendly methods and one accountable contract for soft and hard services.",
  ],
];
export const navigation = [
  ["Services", "services"],
  ["Industries", "industries"],
  ["Why ECFS", "why-ecfs"],
  ["Contact", "contact"],
] as const;
