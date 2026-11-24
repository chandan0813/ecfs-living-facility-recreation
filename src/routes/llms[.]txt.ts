import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/ecfs/blog";
import { areas, company, faqs, guarantee, industries, secondary, services } from "@/ecfs/content";
import { aboutPage, details } from "@/ecfs/pages";
import { pageUrl } from "@/ecfs/seo";
import { sitePages } from "@/ecfs/site-pages";

type Entry = { name: string; path: string; text: string };
const list = (entries: Entry[]) =>
  entries.map(({ name, path, text }) => `- [${name}](${pageUrl(path)}): ${text}`).join("\n");

/** Plain-text site summary for AI assistants (llmstxt.org format), built from the shared site data. */
export function llmsText() {
  return [
    `# ${company.name} (ECFS)`,
    "",
    `> ${company.legal} provides integrated facility management in ${company.coverage.country}: housekeeping, commercial cleaning, MEP maintenance, pest control and PF/ESIC-compliant manpower under one contract. Operating since ${company.since}, with a head office in Ahmedabad and a regional office in Bhubaneswar.`,
    "",
    "## Key facts",
    `- Legal name: ${company.legal} (CIN ${company.cin}, GST ${company.gst})`,
    `- Operating since: ${company.since}`,
    `- Coverage: ${company.coverage.label}`,
    `- Head office: ${company.head}`,
    `- Regional office: ${company.regional}`,
    `- Phone: ${company.phone}; customer care: ${company.care}; email: ${company.email}`,
    `- Hours: ${company.hours}; 24/7 response for contracted clients`,
    "- Staff are screened, background-checked and trained; registered for PF and ESIC",
    `- Guarantee: ${guarantee}`,
    "",
    "## Main pages",
    list([
      { name: "Home", path: "/", text: "Overview of ECFS services, industries and coverage." },
      ...Object.entries(sitePages).map(([key, p]) => ({
        name: p.name,
        path: `/${key}`,
        text: p.description,
      })),
      { name: "About", path: "/about", text: aboutPage.text },
      ...details
        .filter((d) => d.slug === "careers")
        .map((d) => ({ name: d.name, path: `/${d.slug}`, text: d.text })),
    ]),
    "",
    "## Services",
    list([...services, ...secondary].map((s) => ({ ...s, path: `/${s.slug}` }))),
    "",
    "## Industries",
    list(industries.map((i) => ({ ...i, path: `/${i.slug}` }))),
    "",
    "## Service areas",
    list(areas.map((a) => ({ ...a, path: `/${a.slug}` }))),
    "",
    "## Guides",
    list(blogPosts.map((p) => ({ name: p.title, path: `/blog/${p.slug}`, text: p.description }))),
    "",
    "## Frequently asked questions",
    ...faqs.map(([q, a]) => `- ${q} ${a}`),
    "",
  ].join("\n");
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(llmsText(), { headers: { "Content-Type": "text/plain; charset=utf-8" } }),
    },
  },
});
