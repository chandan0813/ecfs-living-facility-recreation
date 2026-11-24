import atrium from "@/assets/ecfs-blue-atrium.webp";
import cleaning from "@/assets/ecfs-blue-cleaning.webp";
import exterior from "@/assets/ecfs-blue-exterior.webp";
import facility from "@/assets/ecfs-blue-facility.webp";
import healthcare from "@/assets/ecfs-blue-healthcare.webp";
import industrial from "@/assets/ecfs-blue-industrial.webp";
import maintenance from "@/assets/ecfs-blue-maintenance.webp";
import office from "@/assets/ecfs-blue-office.webp";
import retail from "@/assets/ecfs-blue-retail.webp";
import supervision from "@/assets/ecfs-blue-supervision.webp";
import managingDirector from "@/assets/ecfs-md-prafulla-behera.webp";

export type FacilityImage = { url: string; alt: string };
export const photos = {
  atrium: {
    url: atrium,
    alt: "Illustrative scene of mechanized floor cleaning in a modern commercial atrium",
  },
  cleaning: {
    url: cleaning,
    alt: "Illustrative scene of a cleaner using a walk-behind floor scrubber",
  },
  exterior: {
    url: exterior,
    alt: "Illustrative exterior of a contemporary commercial building",
  },
  facility: {
    url: facility,
    alt: "Illustrative architectural model of office, industrial and healthcare facilities",
  },
  healthcare: {
    url: healthcare,
    alt: "Illustrative scene of a daylight-filled hospital corridor",
  },
  industrial: { url: industrial, alt: "Illustrative interior of a logistics facility" },
  maintenance: {
    url: maintenance,
    alt: "Illustrative scene of a technician inspecting commercial mechanical equipment",
  },
  office: { url: office, alt: "Illustrative interior of a contemporary workplace" },
  retail: { url: retail, alt: "Illustrative interior of a multi-level shopping centre" },
  supervision: {
    url: supervision,
    alt: "Illustrative scene of two site supervisors reviewing a checklist",
  },
} satisfies Record<string, FacilityImage>;

export const portraits = {
  managingDirector: {
    url: managingDirector,
    alt: "Portrait of Mr. Prafulla Behera, Managing Director of ECFS, in a dark suit at the ECFS office",
  },
} satisfies Record<string, FacilityImage>;

const featurePhotos: Record<string, FacilityImage> = {
  "integrated-facility-management": photos.office,
  "housekeeping-services": photos.cleaning,
  "commercial-cleaning": photos.atrium,
  "mep-maintenance": photos.maintenance,
  "manpower-payroll": photos.supervision,
  "specialised-cleaning": photos.cleaning,
  "pantry-office-support": photos.office,
  gardening: photos.exterior,
  "facility-management-for-offices": photos.office,
  "facility-management-for-factories": photos.industrial,
  "facility-management-for-hospitals": photos.healthcare,
  "facility-management-for-retail": photos.retail,
  "facility-management-for-malls": photos.retail,
  "facility-management-for-education": photos.exterior,
  "facility-management-for-societies": photos.exterior,
  about: photos.supervision,
  careers: photos.supervision,
};
export function imageFor(slug: string, kind?: string) {
  return featurePhotos[slug] ?? (kind === "Service Areas" ? photos.exterior : undefined);
}
