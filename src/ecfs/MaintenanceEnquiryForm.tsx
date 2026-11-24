import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { enquiryLimits, maintenanceEnquiryInput } from "./maintenance-enquiry";
import { submitMaintenanceEnquiry } from "./maintenance-enquiry.functions";

export function MaintenanceEnquiryForm({ issue }: { issue: string }) {
  const save = useServerFn(submitMaintenanceEnquiry);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "failed">("idle");
  const [validationError, setValidationError] = useState("");
  const saving = status === "saving";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || status === "saved") return;
    const form = new FormData(event.currentTarget);
    const parsed = maintenanceEnquiryInput.safeParse({
      issue,
      name: form.get("name"),
      email: form.get("email"),
      city: form.get("city"),
    });
    if (!parsed.success) {
      setStatus("idle");
      setValidationError(parsed.error.issues[0]?.message ?? "Check your enquiry details.");
      return;
    }
    setValidationError("");
    setStatus("saving");
    try {
      const { saved } = await save({ data: parsed.data });
      setStatus(saved ? "saved" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section
      id="maintenance-enquiry"
      aria-labelledby="maintenance-enquiry-title"
      className="mt-8 scroll-mt-28 border-t pt-7"
    >
      <h2 id="maintenance-enquiry-title" className="text-2xl font-bold">
        Request help from ECFS
      </h2>
      {status === "saved" ? (
        <div
          className="mt-4 flex items-start gap-3 border-l-4 border-primary bg-secondary p-4"
          role="status"
        >
          <CheckCircle2 aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-primary" />
          <p>Your maintenance enquiry was received by ECFS.</p>
        </div>
      ) : (
        <>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            ECFS will receive the issue description above and your contact details. You can send an
            enquiry without getting AI recommendations.
          </p>
          <form
            onSubmit={submit}
            aria-labelledby="maintenance-enquiry-title"
            className="mt-5 space-y-4"
          >
            <fieldset disabled={saving} className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="maintenance-name">Name</Label>
                <Input
                  id="maintenance-name"
                  name="name"
                  autoComplete="name"
                  maxLength={enquiryLimits.name}
                  required
                  className="min-h-11 bg-card"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="maintenance-email">Email</Label>
                <Input
                  id="maintenance-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={enquiryLimits.email}
                  required
                  className="min-h-11 bg-card"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="maintenance-city">Facility city</Label>
                <Input
                  id="maintenance-city"
                  name="city"
                  autoComplete="address-level2"
                  maxLength={enquiryLimits.city}
                  required
                  className="min-h-11 bg-card"
                />
              </div>
            </fieldset>
            {validationError && (
              <p role="alert" className="text-sm text-destructive">
                {validationError}
              </p>
            )}
            {status === "failed" && (
              <p role="alert" className="text-sm text-destructive">
                We couldn’t confirm receipt. Your details are still here; try again or contact ECFS
                directly.
              </p>
            )}
            <Button type="submit" disabled={saving} className="min-h-11">
              {saving ? (
                <LoaderCircle aria-hidden="true" className="motion-safe:animate-spin" />
              ) : (
                <Send aria-hidden="true" />
              )}
              {saving ? "Sending enquiry…" : "Send maintenance enquiry"}
            </Button>
          </form>
        </>
      )}
    </section>
  );
}
