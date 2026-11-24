import { readFileSync } from "node:fs";
import path from "node:path";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { blogPosts } from "@/ecfs/blog";
import { pageContentFor } from "@/ecfs/page-content";
import { areaPageContent } from "@/ecfs/page-content/areas";
import { industryPageContent } from "@/ecfs/page-content/industries";
import { servicePageContent } from "@/ecfs/page-content/services";
import { Contact } from "@/ecfs/Contact";
import { managingDirector } from "@/ecfs/content";
import { details } from "@/ecfs/pages";
import { ManagingDirector } from "@/ecfs/Sections";
import { headMeta, siteOrigin } from "@/ecfs/seo";

describe("Managing Director profile", () => {
  it("shows the MD's name, role, write-up and portrait", () => {
    render(<ManagingDirector />);
    expect(screen.getByRole("heading", { name: managingDirector.heading })).toBeInTheDocument();
    expect(screen.getByText(managingDirector.name)).toBeInTheDocument();
    expect(screen.getByText(/Managing Director, ECFS Private Limited/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Prafulla Behera/ })).toBeInTheDocument();
    for (const para of managingDirector.bio) expect(screen.getByText(para)).toBeInTheDocument();
  });
});

describe("Callback form", () => {
  function fill(form: HTMLFormElement, values: Record<string, string>) {
    for (const [name, value] of Object.entries(values)) {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;
      fireEvent.change(field, { target: { value } });
    }
  }
  const valid = {
    name: "Test Person",
    phone: "+91 77900 42133",
    service: "Integrated Facility Management",
    city: "Ahmedabad",
  };

  it("does not prepare a WhatsApp message when required fields are only spaces", () => {
    const { container } = render(<Contact />);
    const form = container.querySelector("form")!;
    fill(form, { ...valid, name: "    ", city: "   " });
    fireEvent.submit(form);
    expect(screen.queryByRole("link", { name: /Send in WhatsApp/ })).not.toBeInTheDocument();
    expect((form.elements.namedItem("name") as HTMLInputElement).value).toBe("");
    expect((form.elements.namedItem("city") as HTMLInputElement).value).toBe("");
  });

  it("prepares a WhatsApp message with the entered details", () => {
    const { container } = render(<Contact />);
    const form = container.querySelector("form")!;
    fill(form, valid);
    fireEvent.submit(form);
    const link = screen.getByRole("link", { name: /Send in WhatsApp/ });
    const message = decodeURIComponent(link.getAttribute("href")!.split("text=")[1]!);
    expect(message).toContain("Name: Test Person");
    expect(message).toContain("City: Ahmedabad");
  });
});

describe("Search and sharing metadata", () => {
  const meta = (m: ReturnType<typeof headMeta>, key: string) =>
    m.meta.find((x) => ("property" in x ? x.property : "name" in x ? x.name : "") === key) as
      { content: string } | undefined;

  it("gives every page an absolute share image", () => {
    const m = headMeta("Title", "Description", "/");
    expect(meta(m, "og:image")?.content).toMatch(new RegExp(`^${siteOrigin}/`));
    expect(meta(m, "twitter:image")?.content).toBe(meta(m, "og:image")?.content);
    expect(meta(m, "og:image:alt")?.content).toBeTruthy();
  });

  it("lets an article use its own photo as the share image", () => {
    const post = blogPosts[0]!;
    const m = headMeta(post.title, post.description, `/blog/${post.slug}`, "article", post.image);
    expect(meta(m, "og:image:alt")?.content).toBe(post.image.alt);
  });

  it.each([
    ...details.map((d) => [`/${d.slug}`, d.text] as const),
    ...blogPosts.map((p) => [`/blog/${p.slug}`, p.description] as const),
  ])("keeps the %s description a usable search-snippet length", (_path, text) => {
    expect(text.length).toBeGreaterThanOrEqual(65);
    expect(text.length).toBeLessThanOrEqual(160);
  });

  it("points crawlers to the sitemap", () => {
    const robots = readFileSync(path.resolve(__dirname, "../../public/robots.txt"), "utf8");
    expect(robots).toContain(`Sitemap: ${siteOrigin}/sitemap.xml`);
  });
});

describe("Detail page content", () => {
  const contentPages = details.filter((d) =>
    ["Services", "Industries", "Service Areas"].includes(d.kind),
  );

  it.each(contentPages.map((d) => [d.slug]))("gives /%s an overview, list and FAQs", (slug) => {
    const content = pageContentFor(slug);
    expect(content).toBeDefined();
    const words = content!.overview.join(" ").split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(150);
    expect(content!.included.length).toBeGreaterThanOrEqual(5);
    expect(content!.faqs.length).toBeGreaterThanOrEqual(3);
  });

  it("has no copy for pages that don't exist", () => {
    const slugs = new Set(details.map((d) => d.slug));
    const keys = Object.keys({ ...servicePageContent, ...industryPageContent, ...areaPageContent });
    expect(keys.filter((key) => !slugs.has(key))).toEqual([]);
  });

  it("keeps the 24/7 promise limited to contracted clients", () => {
    const text = JSON.stringify([servicePageContent, industryPageContent, areaPageContent]);
    const sentences = text.split(/(?<=[.?!])\s+/).filter((s) => s.includes("24/7"));
    for (const sentence of sentences) {
      if (sentence.trim().endsWith("?")) continue;
      expect(sentence).toMatch(/contract/i);
    }
  });
});

describe("Internal links and llms.txt", () => {
  it("only links to pages and guides that exist", async () => {
    const { relationMaps } = await import("@/ecfs/related");
    const pages = new Set(details.map((d) => d.slug));
    const guides = new Set(blogPosts.map((p) => p.slug));
    const { guidesByPage, ...pageMaps } = relationMaps;
    for (const map of Object.values(pageMaps))
      for (const [from, to] of Object.entries(map)) {
        expect(pages.has(from), from).toBe(true);
        for (const slug of to) expect(pages.has(slug), `${from} -> ${slug}`).toBe(true);
      }
    for (const [from, to] of Object.entries(guidesByPage)) {
      expect(pages.has(from), from).toBe(true);
      for (const slug of to) expect(guides.has(slug), `${from} -> ${slug}`).toBe(true);
    }
  });

  it("gives every service, industry and area page some related links", async () => {
    const { relatedLinks, relatedServices } = await import("@/ecfs/related");
    for (const d of details.filter((x) =>
      ["Services", "Industries", "Service Areas"].includes(x.kind),
    )) {
      expect(relatedLinks(d.slug).length, d.slug).toBeGreaterThan(0);
      expect(relatedServices(d.slug).length, d.slug).toBe(3);
    }
  });

  it("lists every page and guide in llms.txt", async () => {
    const { llmsText } = await import("@/routes/llms[.]txt");
    const text = llmsText();
    for (const d of details.filter((x) => x.kind !== "Legal"))
      expect(text, d.slug).toContain(`${siteOrigin}/${d.slug}`);
    for (const p of blogPosts) expect(text, p.slug).toContain(`${siteOrigin}/blog/${p.slug}`);
  });
});
