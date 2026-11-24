// Demo testimonials and sector badges, added at the owner's request as stand-ins.
// Replace with real, approved client quotes and logos when ECFS supplies them;
// never present invented names or companies as real clients.
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type ClientLogo = {
  name: string;
  /** Absolute URL or /public path to the logo image. Omit for a text badge. */
  image?: string;
  alt?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The housekeeping team is punctual, well supervised and quick to respond. Our office has never looked better maintained.",
    name: "Demo testimonial",
    role: "Facility Manager",
    company: "Corporate office, Ahmedabad",
  },
  {
    quote:
      "One contract for cleaning, maintenance and manpower has simplified our vendor management completely.",
    name: "Demo testimonial",
    role: "Admin Head",
    company: "Manufacturing unit, Sanand",
  },
  {
    quote:
      "Trained staff, proper checklists and monthly reports — exactly the accountability we needed for our premises.",
    name: "Demo testimonial",
    role: "Operations Lead",
    company: "Healthcare facility, Bhubaneswar",
  },
];

export const clientLogos: ClientLogo[] = [
  { name: "Demo Client", image: "/demo-logos/demo-logo-1.svg" },
  { name: "Sample Corp", image: "/demo-logos/demo-logo-2.svg" },
  { name: "Placehold Co", image: "/demo-logos/demo-logo-3.svg" },
  { name: "Demo Group", image: "/demo-logos/demo-logo-4.svg" },
  { name: "Sample Ltd", image: "/demo-logos/demo-logo-5.svg" },
  { name: "Demo Inc", image: "/demo-logos/demo-logo-6.svg" },
];
