import { expect, it } from "vitest";
import { maintenanceEnquiryInput } from "@/ecfs/maintenance-enquiry";

const enquiry = {
  name: " Onsite Manager ",
  email: " manager@example.com ",
  city: " Bengaluru ",
  issue: " The meeting room AC is blowing warm air. ",
};

it("validates the contact details and original issue submitted to ECFS", () => {
  expect(maintenanceEnquiryInput.parse(enquiry)).toEqual({
    name: "Onsite Manager",
    email: "manager@example.com",
    city: "Bengaluru",
    issue: "The meeting room AC is blowing warm air.",
  });
});

it("rejects incomplete enquiries even if the adviser was not used", () => {
  expect(maintenanceEnquiryInput.safeParse({ ...enquiry, issue: " " }).success).toBe(false);
  expect(maintenanceEnquiryInput.safeParse({ ...enquiry, email: "not-an-email" }).success).toBe(
    false,
  );
});
