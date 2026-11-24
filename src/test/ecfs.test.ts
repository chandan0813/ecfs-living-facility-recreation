import { describe, expect, it } from "vitest";
import { company, faqs, guaranteeHours, process, services } from "@/ecfs/content";
import { enquiryUrl } from "@/ecfs/enquiry";
import { coverageArea, homeSchema } from "@/ecfs/seo";

describe("ECFS brief", () => {
  it("uses 2018 as the operating start", () => expect(company.since).toBe(2018));
  it("uses PAN India service coverage in site data and search metadata", () => {
    expect(company.coverage).toEqual({ label: "PAN India", country: "India" });
    expect(coverageArea).toEqual({ "@type": "Country", name: "India" });
    const graph = JSON.parse(homeSchema.children)["@graph"];
    expect(
      graph.find((node: { "@type": string }) => node["@type"] === "ProfessionalService")
        ?.areaServed,
    ).toEqual(coverageArea);
  });
  it("offers re-service for issues reported within 24 hours", () =>
    expect(guaranteeHours).toBe(24));
  it("includes exactly the six primary services", () =>
    expect(services.map((s) => s.slug)).toEqual([
      "integrated-facility-management",
      "housekeeping-services",
      "commercial-cleaning",
      "mep-maintenance",
      "pest-control",
      "manpower-payroll",
    ]));
  it("starts the five-step process with a free site assessment", () => {
    expect(process).toHaveLength(5);
    expect(process[0]?.[0]).toBe("Free site assessment");
  });
  it("uses the same nine supplied FAQ answers in the structured data", () => {
    const graph = JSON.parse(homeSchema.children)["@graph"];
    const items = graph.find((node: { "@type": string }) => node["@type"] === "FAQPage").mainEntity;
    expect(items).toHaveLength(9);
    expect(
      items.map((v: { name: string; acceptedAnswer: { text: string } }) => [
        v.name,
        v.acceptedAnswer.text,
      ]),
    ).toEqual(faqs);
  });
  it("prepares a callback for the supplied enquiries number without dropping the city or service", () => {
    const input = new FormData();
    for (const [key, value] of Object.entries({
      name: "Asha",
      phone: "+91 98765 43210",
      service: "Integrated Pest Control",
      city: "Ahmedabad",
      message: "Office & pantry",
    }))
      input.set(key, value);
    const link = new URL(enquiryUrl(input));
    expect(link.origin + link.pathname).toBe("https://wa.me/917790042133");
    expect(link.searchParams.get("text")).toContain(
      "Service: Integrated Pest Control\nCity: Ahmedabad\nMessage: Office & pantry",
    );
  });
});
