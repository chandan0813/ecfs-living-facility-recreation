import { createServerFn } from "@tanstack/react-start";
import { maintenanceEnquiryInput } from "./maintenance-enquiry";

export const submitMaintenanceEnquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => maintenanceEnquiryInput.parse(input))
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("maintenance_enquiries").insert(data);
      if (!error) return { saved: true };
      console.warn("Maintenance enquiry insert failed", error.code);
    } catch {
      console.warn("Maintenance enquiry storage unavailable");
    }
    return { saved: false };
  });
