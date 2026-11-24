import { expect, it } from "vitest";
import { isImmediateHazard, issueInput, resolveGuideSlugs } from "@/ecfs/maintenance-advice";

it("returns only real ECFS guide links and removes repeated recommendations", () => {
  const slug = "preventive-facility-maintenance-checklist";
  const guides = resolveGuideSlugs(["https://example.com/guide", slug, slug, "missing"]);
  expect(guides.map((guide) => guide.slug)).toEqual([slug]);
});

it("accepts a maintenance description but rejects whitespace and oversized text", () => {
  expect(issueInput.safeParse({ issue: "The meeting room AC is blowing warm air." }).success).toBe(
    true,
  );
  expect(issueInput.safeParse({ issue: " ".repeat(1200) }).success).toBe(false);
  expect(issueInput.safeParse({ issue: "x".repeat(1201) }).success).toBe(false);
});

it("flags immediate hazards for escalation instead of treating them like routine maintenance", () => {
  expect(isImmediateHazard("There is smoke coming from the electrical panel.")).toBe(true);
  expect(isImmediateHazard("The meeting room AC is blowing warm air.")).toBe(false);
});

it.each([
  "There is a strong gas smell in the kitchen near the stove.",
  "We smell LPG in the canteen area this morning.",
  "The PNG line in the pantry is leaking gas.",
  "There is a CNG leak near the generator room.",
  "The fire alarm keeps going off on the third floor.",
  "Smoke alarm is sounding in the server room.",
  "Sparks came out of the socket when the kettle was plugged in.",
])("escalates %s", (issue) => {
  expect(isImmediateHazard(issue)).toBe(true);
});

it.each([
  "The smoke detector in the pantry keeps chirping every few minutes.",
  "Smoke alarm battery low warning on floor 3.",
  "No smoke, but the AC unit is making a grinding noise.",
  "The kitchen exhaust runs without sparks but is very loud.",
  "Replace the smoke detectors in the new wing before handover.",
])("treats %s as routine maintenance", (issue) => {
  expect(isImmediateHazard(issue)).toBe(false);
});
