import { photos, type FacilityImage } from "./imagery";

export const blogTopics = {
  "commercial-cleaning": "Commercial cleaning",
  "facility-management": "Facility management",
  maintenance: "Maintenance",
} as const;

export type BlogTopic = keyof typeof blogTopics;
export const blogTopicKeys = Object.keys(blogTopics).filter(isBlogTopic);

function isBlogTopic(value: unknown): value is BlogTopic {
  return typeof value === "string" && Object.hasOwn(blogTopics, value);
}

export function validateBlogSearch(search: Record<string, unknown>): { topic?: BlogTopic } {
  const topic = search["topic"];
  return isBlogTopic(topic) ? { topic } : {};
}

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  topics: readonly [BlogTopic, ...BlogTopic[]];
  image: FacilityImage;
  legacyUrl?: true;
  sections: { title: string; text?: string; checklist?: string[] }[];
};

export const maintenanceChecklistSlug = "preventive-facility-maintenance-checklist";

export const blogPosts: BlogPost[] = [
  {
    slug: "ahmedabad-cleaning-costs",
    legacyUrl: true,
    title: "What drives commercial cleaning costs in Ahmedabad?",
    description:
      "Compare commercial cleaning quotes by scope, staffing, schedule and equipment, not just the headline price.",
    topics: ["commercial-cleaning"],
    image: photos.cleaning,
    sections: [
      {
        title: "Choose a pricing model that matches the job",
        text: "A one-off deep clean may be priced by floor area, while ongoing housekeeping can be priced per deployed staff member or as a fixed monthly contract. Ask for the unit rate and what it includes so you can compare proposals fairly.",
      },
      {
        title: "Describe the rooms and the traffic",
        text: "Two sites with the same floor area can need very different cleaning schedules. List restrooms, pantries, reception areas and high-traffic zones, then note the floor finishes, occupancy and hours when staff can work without disrupting your operations.",
      },
      {
        title: "Check what costs extra",
        text: "Ask whether machinery, consumables, supervision and relief staff are included. Façade cleaning, marble polishing and post-construction work may be quoted separately. Have each vendor price the same written scope and explain any exclusions before you compare totals.",
      },
    ],
  },
  {
    slug: "choosing-a-facility-management-company",
    legacyUrl: true,
    title: "How to choose a facility management company",
    description:
      "Know what to ask about staffing, statutory compliance and service standards before you sign a contract.",
    topics: ["facility-management", "commercial-cleaning", "maintenance"],
    image: photos.supervision,
    sections: [
      {
        title: "Start with a shared scope",
        text: "List each site, service and shift. Separate recurring tasks from occasional work and make clear who provides equipment, materials and consumables. Use the same scope for every provider you invite to quote.",
      },
      {
        title: "Ask how staffing and compliance are handled",
        text: "Find out who supervises the team, what training and checks staff receive, and how the provider covers leave or unexpected absences. Ask how applicable PF and ESIC obligations are handled and what documentation you can review.",
      },
      {
        title: "Put service levels and escalation in writing",
        text: "Agree on cleaning frequencies, inspections, reporting and a named escalation contact. Ask how quickly issues are acknowledged and how corrective work is recorded. Review the itemised proposal and the written service-level agreement together before signing.",
      },
    ],
  },
  {
    slug: maintenanceChecklistSlug,
    title: "Facility Maintenance Checklist: Preventive Tasks",
    description:
      "A preventive maintenance checklist to track HVAC, plumbing and electrical equipment and follow up faults.",
    topics: ["maintenance"],
    image: photos.maintenance,
    sections: [
      {
        title: "Make an asset register",
        text: "List critical equipment such as air-conditioning units, pumps and electrical panels. Record the asset location, model, condition, service history and responsible technician. Keep manuals and warranty information with the record.",
      },
      {
        title: "Schedule checks by risk and usage",
        text: "Use manufacturer guidance and applicable inspection requirements to set intervals. Ask site staff to report visible leaks, unusual noise or recurring faults. Leave electrical work and internal equipment inspections to qualified personnel.",
      },
      {
        title: "Preventive maintenance checklist by system",
        text: "Record the asset, date, observation and next action for each check. Set the frequency with your maintenance team; one schedule won’t suit every building.",
        checklist: [
          "HVAC: Record comfort complaints, unusual noise and visible leaks. Assign filter and equipment servicing to a qualified technician according to the manufacturer’s schedule.",
          "Plumbing and pumps: Note visible leaks, slow drains and unusual pump noise. Assign recurring faults to your maintenance team.",
          "Electrical: Log repeated trips, flickering lights or visible damage without opening panels. Refer inspection and repair to a qualified electrician.",
          "Maintenance records: Give every issue an owner and a due date. Confirm the work is complete and flag repeat faults for review.",
        ],
      },
      {
        title: "Review faults and close the loop",
        text: "Log each issue with its date, location and owner. Record the corrective work and confirm it is complete. Review repeat faults with your maintenance team to decide whether the schedule, operating conditions or equipment needs attention.",
      },
    ],
  },
  {
    slug: "housekeeping-contract-checklist",
    title: "Housekeeping contract checklist: what to agree before you sign",
    description:
      "Agree scope, staffing, materials, compliance and service levels before you sign a housekeeping contract.",
    topics: ["facility-management", "commercial-cleaning"],
    image: photos.supervision,
    sections: [
      {
        title: "What should a housekeeping contract cover?",
        text: "A housekeeping contract should set out the scope of work, staffing, materials, statutory compliance, service levels and exit terms before anyone is deployed. Most disputes with cleaning vendors start with something that was discussed but never written down, such as who buys consumables or how absences are covered. Treat the contract as the working manual for your site: if a task, standard or responsibility matters to you, it belongs in the agreement or an attached schedule rather than in an email thread.",
      },
      {
        title: "Define the scope area by area",
        text: "Walk the site with the vendor and list every area to be covered, from reception and workstations to restrooms, pantries, stairwells and parking. Record what is done in each area and how often, and separate daily housekeeping from periodic work such as deep cleaning or floor care. Attach the scope as a schedule to the contract so both sides work from the same agreed document when questions come up later in the contract.",
        checklist: [
          "List each area with its floor finish, usage and permitted cleaning hours.",
          "Mark which tasks are daily, weekly, monthly or on request.",
          "Name the periodic jobs, such as deep cleaning or façade work, that are priced separately.",
          "Record any areas that are out of scope so there is no confusion later.",
        ],
      },
      {
        title: "Agree staffing, supervision and cover",
        text: "State how many staff will be deployed on each shift, their working hours and who supervises them on site. Ask how the vendor screens, trains and uniforms its team, and what happens when someone is on leave or absent without notice. Relief staff should be part of the contract, not a favour. Agree whether you can request a change of personnel and how quickly a replacement will be provided. A named site supervisor, with an escalation contact above them, gives you a clear route when standards slip.",
      },
      {
        title: "Settle who supplies materials and equipment",
        text: "Spell out who provides cleaning chemicals, consumables such as tissue and bin liners, tools and machinery. If the vendor supplies them, ask which products or specifications it will use and how stock levels are monitored. If you supply them, agree how usage is reported so wastage is visible. List mechanized equipment such as scrubber-driers and vacuum cleaners, along with who maintains and replaces it. Clarity here keeps monthly invoices predictable and avoids arguments about who should have reordered supplies.",
      },
      {
        title: "Check statutory compliance and documentation",
        text: "Ask the vendor to confirm its PF, ESIC and GST registrations and to share proof of monthly deposits for the staff deployed at your site. Wage registers, attendance records and payslips should be available for review on request. Under contract labour rules, some obligations can extend to the principal employer if a contractor defaults, so build document checks into the contract rather than relying on assurances. Confirm the vendor carries suitable insurance and gives its staff a safety induction, and check current requirements with a qualified adviser.",
      },
      {
        title: "Put service levels, reviews and exit terms in writing",
        text: "A service-level agreement turns expectations into something you can measure. Agree how quality is checked, how complaints are logged and resolved, and how often you will meet to review performance. Include notice periods, a handover process and what happens to equipment and records if the contract ends. At ECFS, every contract follows a free site assessment and a written proposal and SLA, with supervised deployment, daily checklists, audits and monthly reviews.",
        checklist: [
          "The site supervisor completes and signs a daily checklist.",
          "Complaints are logged with agreed response and resolution times.",
          "Audits are scheduled and a review meeting is held every month.",
          "The notice period, handover steps and return of client property are written down.",
        ],
      },
    ],
  },
  {
    slug: "pf-esic-compliance-outsourced-staff",
    title: "PF and ESIC compliance when you outsource facility staff",
    description:
      "What contractors must do for PF and ESIC, and the proof to ask for when you outsource facility staff.",
    topics: ["facility-management"],
    image: photos.office,
    sections: [
      {
        title: "Who is responsible for PF and ESIC on outsourced staff?",
        text: "The contractor that employs the staff is primarily responsible for registering them under the Employees’ Provident Fund (EPF) and Employees’ State Insurance (ESIC) schemes, deducting contributions and depositing them on time. The business where the staff work, known as the principal employer, is not automatically protected, because under contract labour rules liability can extend to it if the contractor fails to pay. That is why facility and admin managers should verify PF and ESIC every month rather than treat them as a clause ticked once at the start of a contract.",
      },
      {
        title: "Understand what PF and ESIC are",
        text: "EPF is a statutory retirement savings scheme to which both employer and employee contribute a share of wages each month. ESIC is a statutory social security scheme that gives eligible employees medical care and cash benefits for sickness, maternity and workplace injury. Whether a person is covered depends on factors such as wage levels and the size of the establishment, and rates and thresholds are revised from time to time. This guide does not quote figures, so confirm the current position with a qualified adviser before relying on any number.",
      },
      {
        title: "Know what a compliant contractor should be doing",
        text: "A contractor that takes compliance seriously will hold its own registrations and follow a routine for monthly payments and filings. Ask how it enrols new joiners, how deductions appear on payslips and who in its team handles statutory returns. The answers should be specific. If the vendor is vague, or suggests that its staff are covered under someone else’s registration, treat that as a warning sign and ask for an explanation in writing before you proceed.",
        checklist: [
          "It holds its own PF and ESIC registrations and shares the registration numbers.",
          "It enrols eligible staff and gives each person their PF account and ESIC insurance numbers.",
          "It deducts employee contributions and pays the employer share as required.",
          "It deposits contributions and files returns within the prescribed timelines.",
          "It shows deductions clearly on payslips and in wage registers.",
        ],
      },
      {
        title: "Ask for proof every month",
        text: "Make document checks part of the monthly invoice process. Before approving payment, ask for the challans or electronic challan-cum-return (ECR) receipts showing PF deposits, and the matching ESIC payment confirmations, for the staff deployed at your site. Compare the names and headcount with your own attendance records. Ask for wage registers and payslips periodically and keep copies on file. Some organisations release invoices only once these documents arrive, which keeps the routine consistent. If the numbers do not match, raise it straight away rather than waiting for renewal.",
      },
      {
        title: "Build compliance into the contract",
        text: "The contract should require the vendor to comply with applicable labour laws, maintain its registrations, share proof of payment and indemnify you against losses arising from its non-compliance. Include a right to audit records and a clear consequence, such as withholding payment, if documents are not provided. An indemnity helps, but it is only as strong as the vendor behind it, so verification still matters. Ask a qualified legal or payroll adviser to review the clauses against current rules, especially if your sites are spread across several states.",
      },
      {
        title: "Compare vendors on process, not promises",
        text: "When you compare providers, ask each one to walk you through its compliance process and show sample documents with personal details masked. ECFS is registered for PF and ESIC, is GST compliant and manages the statutory deductions and filings for its workforce, alongside screening, background checks and training for deployed staff. Whichever provider you choose, keep the monthly checks in place. A clear paper trail protects the staff on your site, your organisation and the working relationship with your vendor.",
      },
    ],
  },
  {
    slug: "how-often-deep-clean-office",
    title: "How often should an office be deep cleaned?",
    description:
      "Deep cleaning frequency depends on footfall, use and layout. Plan an office schedule that fits your site.",
    topics: ["commercial-cleaning", "maintenance"],
    image: photos.atrium,
    sections: [
      {
        title: "How often should an office be deep cleaned?",
        text: "Many offices schedule a deep clean every one to three months, with high-use areas such as restrooms and pantries often covered more frequently and quieter areas less often. There is no single correct interval. The right frequency depends on how many people use the space, what happens there, the floor finishes and furnishings, and how thorough the daily housekeeping already is. A site assessment is the most reliable way to set a schedule, because it looks at your building as it is actually used rather than relying on a generic rule.",
      },
      {
        title: "Know the difference between daily cleaning and a deep clean",
        text: "Daily housekeeping keeps an office presentable: emptying bins, wiping desks and touchpoints, cleaning restrooms and mopping floors. A deep clean reaches what routine work does not, such as grout lines, the undersides of furniture, upholstery, high-level dust, vents and the build-up in carpets and hard floors. It usually needs more time, specialised equipment and access when the office is empty. Treating the two as separate tasks helps you budget properly and stops deep cleaning from being squeezed into daily shifts, where it rarely gets done well.",
      },
      {
        title: "Check the factors that change the schedule",
        text: "Use the factors below to decide whether your office needs deep cleaning more or less often than the typical range. Review them whenever the way you use the building changes, such as after a move to shift work, a rise in headcount or the opening of a new cafeteria. A schedule that suited a half-empty office may not suit one that is now full and busy every day of the week.",
        checklist: [
          "Footfall: more staff and visitors usually mean more frequent deep cleaning.",
          "Use of space: restrooms, pantries and cafeterias generally need attention more often than meeting rooms.",
          "Floors and furnishings: carpets and upholstery need periodic deep cleaning or shampooing.",
          "Operating hours: offices that run long days or several shifts have less downtime between cleans.",
          "Daily standards: strong routine housekeeping can lengthen the gap between deep cleans.",
        ],
      },
      {
        title: "Plan deep cleaning zone by zone",
        text: "Rather than cleaning the whole office at once, many facility teams split the site into zones and rotate through them. Restrooms and pantries might be deep cleaned monthly, work areas every two to three months, and carpets, upholstery and high-level surfaces on a longer cycle. A rotating plan spreads the cost across the year, reduces disruption and makes it easier to check the quality of each visit. Schedule the work for weekends, holidays or after hours so that machinery and drying time do not interfere with your teams.",
      },
      {
        title: "Add one-off deep cleans when the situation calls for it",
        text: "Some events justify a deep clean outside the normal cycle. Common examples include moving into or out of a building, finishing renovation or fit-out work, recovering from a water leak, preparing for an audit or client visit, and reopening after a long closure. Seasonal changes, such as the end of the monsoon, can also leave dust, damp or stains that routine cleaning does not remove. Build a small allowance for these occasions into your annual plan so that you are not negotiating scope and price at short notice.",
      },
      {
        title: "Review the results and adjust",
        text: "Treat the schedule as a starting point and review it against what you see. Walk the site with the supervisor after each deep clean, note any missed areas and record recurring problems such as stained carpets or dusty vents. If areas look tired well before the next visit, shorten the interval; if they stay in good condition, you may be able to extend it. ECFS begins with a free site assessment, sets deep cleaning frequencies in the proposal and SLA, and tracks them through checklists, audits and monthly reviews.",
      },
    ],
  },
];

export const findBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export function postsForTopic(topic?: BlogTopic) {
  return topic ? blogPosts.filter((post) => post.topics.includes(topic)) : blogPosts;
}

export function relatedBlogPosts(post: BlogPost) {
  return blogPosts.filter(
    (other) =>
      other.slug !== post.slug && other.topics.some((topic) => post.topics.includes(topic)),
  );
}
