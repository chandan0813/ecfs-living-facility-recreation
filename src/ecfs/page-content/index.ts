import { areaPageContent } from "./areas";
import { careersContent } from "./directories";
import { industryPageContent } from "./industries";
import { servicePageContent } from "./services";
import type { PageContent } from "./types";

export type { PageContent };

const all: Record<string, PageContent> = {
  ...servicePageContent,
  ...industryPageContent,
  ...areaPageContent,
  careers: careersContent,
};

export const pageContentFor = (slug: string): PageContent | undefined => all[slug];

/** Section titles that read naturally for each kind of detail page. */
export const pageContentTitles = (kind: string, name: string) =>
  kind === "Service Areas"
    ? {
        included: `Services available in ${name.replace(/^Facility Management in /, "")}`,
        faqs: "Local questions",
      }
    : kind === "Industries"
      ? { included: "What we cover", faqs: "Sector questions" }
      : kind === "Company"
        ? { included: "Roles we hire for", faqs: "Careers questions" }
        : { included: "What's included", faqs: "Common questions" };
