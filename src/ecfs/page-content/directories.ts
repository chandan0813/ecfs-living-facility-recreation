import type { PageContent } from "./types";

export type DirectoryContent = {
  heading: string;
  overview: readonly string[];
  faqs: readonly (readonly [question: string, answer: string])[];
};

export const directoryContent: Record<
  "services" | "industries" | "service-areas",
  DirectoryContent
> = {
  services: {
    heading: "How to choose the right mix of services",
    overview: [
      "Most sites need a blend of three kinds of support. Soft services are the people-led tasks that keep a space clean, hygienic and presentable: daily housekeeping, mechanized and deep cleaning, pest control, gardening and pantry support. Hard services keep the building itself working, covering electrical, plumbing and HVAC upkeep. Manpower fills roles your own team would otherwise recruit and manage, from housekeeping staff to technical and front-office personnel, with PF and ESIC handled by ECFS.",
      "You can contract any of these on their own or combine them under one agreement. A combined contract gives you one point of contact for the whole site, written SLAs for each service and a monthly report showing how every part of the programme is performing. Pricing can be set per square foot, per deployment or as a fixed monthly fee, depending on what suits your scope.",
      "If you are unsure where to begin, start with a free site assessment. ECFS surveys your premises, discusses your priorities and sends a scoped proposal with staffing, schedules and an SLA, so you can decide what to include before anyone is deployed.",
    ],
    faqs: [
      [
        "Can I start with one facility service and add more later?",
        "Yes, you can start with a single service and add others as your needs grow. Many sites begin with housekeeping or office cleaning and later bring in MEP maintenance, pest control or manpower. ECFS updates the scope and SLA when services are added, so everything stays under the same contract and point of contact.",
      ],
      [
        "What is the difference between soft and hard facility services?",
        "Soft services look after the people who use a building, while hard services look after the building itself. Cleaning, housekeeping, pest control, gardening and pantry support are soft services. Electrical, plumbing and HVAC maintenance are hard services. ECFS can deliver either type alone or both together under one SLA.",
      ],
      [
        "What does facility manpower supply include?",
        "Manpower supply means ECFS provides trained staff for roles at your site and manages their payroll and statutory compliance. Staff can include housekeeping, technical and front-office support personnel. Each person is screened, background-checked and trained before deployment, and ECFS handles PF and ESIC filings on their behalf.",
      ],
      [
        "How are facility management services priced?",
        "Facility management services are priced per square foot, per deployment or as a fixed monthly contract. The right model depends on floor area, staffing, service frequency and scope. ECFS confirms the price in a scoped proposal after a free site assessment, so you know the cost before any work begins.",
      ],
    ],
  },
  industries: {
    heading: "Service plans shaped around how your sector works",
    overview: [
      "Every sector puts different demands on a facility team. An office needs quiet cleaning around working hours and a well-run pantry, while a factory needs machine-area housekeeping and staff who understand shop-floor safety. Hospitals call for infection-aware cleaning and round-the-clock cover, schools and colleges need work planned around classes and events, and retail stores and malls need floors and restrooms kept ready for footfall throughout trading hours.",
      "ECFS adapts three things for each site. Scope sets which soft services, hard services and manpower are included. Schedules decide when work happens, from early-morning shifts before a showroom opens to cleaning cycles planned around production or patient care. Staff briefing prepares the deployed team for the site’s own rules, whether that means controlled-environment procedures at a pharmaceutical unit or common-area etiquette in a residential society.",
      "Every plan begins with a free site assessment, and a site supervisor runs daily checklists once the team is deployed. Quality audits and monthly reviews keep the programme in line with the agreed SLA as your operations change.",
    ],
    faqs: [
      [
        "How does ECFS adapt facility services for different industries?",
        "ECFS adapts its services by changing the scope, schedule and staff briefing for each site. After a free site assessment, the proposal sets which services are included, when they are carried out and which site-specific procedures the team must follow. A site supervisor then checks the work against daily checklists.",
      ],
      [
        "Can cleaning be scheduled outside business or trading hours?",
        "Yes, cleaning can be scheduled around your operating hours. Offices, showrooms and malls often prefer work before opening or after closing, while factories and hospitals may need cover across shifts. ECFS agrees the schedule in the proposal and SLA, so staffing matches the times your site actually needs support.",
      ],
      [
        "Are housekeeping staff trained for hospitals and pharmaceutical sites?",
        "Yes, ECFS staff are trained before deployment and briefed on each site’s procedures. For hospitals and pharmaceutical units, that briefing covers the infection-aware or controlled-environment practices the site requires. A site supervisor then checks that those practices are followed through daily checklists and regular quality audits.",
      ],
      [
        "Does ECFS work with industries that aren’t listed?",
        "ECFS may be able to support premises outside the listed sectors. The industries shown are the most common, but the same soft services, hard services and manpower can be scoped to other types of site. Share details of your premises and requirements, and ECFS will arrange a free site assessment to confirm what can be offered.",
      ],
    ],
  },
  "service-areas": {
    heading: "PAN India coverage from two offices",
    overview: [
      "ECFS provides facility management across India from two offices. The head office at 102, Dev Primi, Corporate Road, Prahladnagar, Ahmedabad, leads operations and site assessments, while the regional office at EB-396, Stage 2, Laxmi Sagar, Brit Colony, Bhubaneswar, coordinates work for clients in Odisha.",
      "The cities listed above are where clients most often ask for support, but they are not the limit of where ECFS works. For a site elsewhere, deployment is planned from one of the two offices: staff are screened, trained and placed with a site supervisor, and the same daily checklists, quality audits and monthly reviews apply as at any other location.",
      "Organisations with premises in several cities can bring them under one multi-site contract. You get one point of contact, consistent SLAs across locations and monthly reporting for each site, which makes it easier to compare performance and keep standards even. To check coverage for your location, share your city and requirements and ask for a free site assessment.",
    ],
    faqs: [
      [
        "Do you serve cities that aren’t listed?",
        "ECFS may be able to serve cities that aren’t listed, so share your city and requirements to find out. The team reviews the location, scope and staffing involved and arranges a free site assessment where a plan is practical. Call +91 77900 42133 or email info@easycleanfacility.in to start.",
      ],
      [
        "Where are the ECFS offices located?",
        "ECFS has a head office in Ahmedabad and a regional office in Bhubaneswar. The head office is at 102, Dev Primi, Corporate Road, Prahladnagar, Ahmedabad, and the regional office is at EB-396, Stage 2, Laxmi Sagar, Brit Colony, Bhubaneswar. Site assessments and deployments are coordinated from these two offices.",
      ],
      [
        "Can one company manage facilities in several cities under one contract?",
        "Yes, ECFS can manage sites in several cities under a single multi-site contract. You get one point of contact, consistent SLAs across every location and monthly reporting, so standards can be compared site by site. Each location is scoped through its own site assessment before staff are deployed.",
      ],
      [
        "Is facility support available outside office hours?",
        "Yes, ECFS offers 24/7 on-call support to contracted clients at every location it serves. If a service issue is reported within 24 hours, ECFS re-services the area at no extra charge. For new enquiries, the team can be reached on +91 77900 42133 or at info@easycleanfacility.in.",
      ],
    ],
  },
};

export const careersContent: PageContent = {
  heading: "Working at ECFS",
  overview: [
    "ECFS has delivered facility management since 2018, and the work depends on the people who turn up at each site every day. We hire for housekeeping, mechanized cleaning, technical maintenance, pantry and front-office support, site supervision and operations roles, and each position plays a direct part in keeping a client’s premises clean, safe and running well.",
    "Every new team member is screened and background-checked, then given structured training before deployment. You are placed with a uniform and the materials needed for the job, and work alongside a site supervisor who uses daily checklists and quality audits to keep standards consistent. ECFS is registered for PF and ESIC, so statutory contributions are managed for its workforce.",
    "Openings depend on the sites ECFS currently serves, so roles and locations change over time. To apply, email your CV to info@easycleanfacility.in with your preferred role and city, and the team will review it against current requirements.",
  ],
  included: [
    "Housekeeping staff for offices, factories, hospitals and societies",
    "Mechanized cleaning operators for large floors and deep cleaning",
    "Technicians for electrical, plumbing and HVAC maintenance",
    "Pantry and front-office support staff",
    "Site supervisors who run daily checklists and audits",
    "Operations and coordination roles that support site teams",
  ],
  faqs: [
    [
      "How do I apply for a job at ECFS?",
      "Email your CV to info@easycleanfacility.in with your preferred role and city in the message. Including both details helps the team match your application to the roles needed at its current sites. Applications are reviewed against those requirements, so a clear role and location make your CV easier to place.",
    ],
    [
      "What training does ECFS give new staff?",
      "ECFS gives new staff structured training before deployment. You complete this training before you are placed at a client site, and once deployed you work under a site supervisor who checks work against daily checklists and quality audits, so standards stay consistent from your first shift.",
    ],
    [
      "Does ECFS provide PF and ESIC to employees?",
      "Yes, ECFS is registered for Provident Fund (PF) and ESIC. The company manages the statutory deductions and filings for its workforce, so contributions are handled on your behalf. Ask about the specific terms for your role when you discuss an opening with the team.",
    ],
    [
      "Can I apply for an ECFS job outside Gujarat?",
      "Yes, you can apply for a role outside Gujarat by naming your preferred city when you send your CV. ECFS works across India and has a regional office in Bhubaneswar, but available roles depend on the sites it currently serves in each location, so openings vary from city to city.",
    ],
  ],
};
