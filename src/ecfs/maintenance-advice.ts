import { z } from "zod";
import { findBlogPost } from "./blog";

export const issueMinLength = 20;
export const issueMaxLength = 1200;

export const issueInput = z.object({
  issue: z.string().trim().min(issueMinLength).max(issueMaxLength),
});

export const adviceOutput = z.object({
  summary: z.string().trim().min(1).max(380),
  steps: z.array(z.string().trim().min(1).max(320)).min(1).max(5),
  guideSlugs: z.array(z.string()).max(3),
});

export function resolveGuideSlugs(slugs: readonly string[]) {
  return [...new Set(slugs)].flatMap((slug) => {
    const guide = findBlogPost(slug);
    return guide ? [{ slug: guide.slug, title: guide.title, description: guide.description }] : [];
  });
}

// A hazard term preceded by a simple negation ("no smoke", "without sparks") is not a hazard.
const notNegated = String.raw`(?<!\b(?:no|not|without)\s+)`;
const hazardTerms = [
  String.raw`active fire`,
  String.raw`visible flames?`,
  // Smoke itself, but not a mention of the detector or alarm hardware (chirping, low battery).
  String.raw`smoke(?!\s+(?:detectors?|alarms?|sensors?|heads?)\b)`,
  // ...unless that alarm is actually sounding.
  String.raw`(?:smoke|fire)\s+(?:alarms?|detectors?)\s+(?:is\s+|are\s+|keeps?\s+|has\s+)?(?:going off|went off|sounding|ringing|triggered|activated)`,
  String.raw`sparks?`,
  String.raw`sparking`,
  String.raw`(?:gas|lpg|cng|png)\s+(?:leaks?|leaking|smells?|odou?rs?)`,
  String.raw`leaking\s+(?:gas|lpg|cng|png)`,
  String.raw`smell(?:s|ing)?\s+(?:of\s+|like\s+)?(?:gas|lpg|cng|png)`,
  String.raw`carbon monoxide`,
  String.raw`live wires?`,
  String.raw`electric shocks?`,
  String.raw`electrocut\w*`,
  String.raw`structural collapse`,
];
const hazardPattern = new RegExp(`${notNegated}\\b(?:${hazardTerms.join("|")})\\b`, "i");

export const isImmediateHazard = (issue: string) => hazardPattern.test(issue);
