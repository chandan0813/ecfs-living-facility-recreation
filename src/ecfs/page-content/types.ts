/**
 * Long-form copy for a service, industry or service-area detail page.
 * The same entries feed the visible page and its FAQPage structured data, so they never drift.
 */
export type PageContent = {
  /** Heading for the overview section, e.g. "Housekeeping that fits your site". */
  heading: string;
  /** Two or three short paragraphs. */
  overview: readonly string[];
  /** Five to seven concrete items shown under "What's included" (or "What we cover"). */
  included: readonly string[];
  /** Three or four question-and-answer pairs specific to this page. */
  faqs: readonly (readonly [question: string, answer: string])[];
};
