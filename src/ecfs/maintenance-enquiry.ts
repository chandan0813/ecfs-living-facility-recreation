import { z } from "zod";
import { issueInput, issueMaxLength, issueMinLength } from "./maintenance-advice";

export const enquiryLimits = { name: 100, email: 254, city: 100 } as const;

export const maintenanceEnquiryInput = issueInput.extend({
  issue: z
    .string()
    .trim()
    .min(issueMinLength, "Describe the issue above before sending an enquiry.")
    .max(issueMaxLength, `Keep the issue description under ${issueMaxLength + 1} characters.`),
  name: z.string().trim().min(1, "Enter your name.").max(enquiryLimits.name),
  email: z.string().trim().max(enquiryLimits.email).email("Enter a valid email address."),
  city: z.string().trim().min(1, "Enter your facility city.").max(enquiryLimits.city),
});
