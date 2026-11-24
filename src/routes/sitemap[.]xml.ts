import { createFileRoute } from "@tanstack/react-router";
import { details } from "@/ecfs/pages";
import { sitePagePaths } from "@/ecfs/site-pages";
import { blogPosts } from "@/ecfs/blog";
import { pageUrl } from "@/ecfs/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          "/",
          ...sitePagePaths,
          ...details.map(({ slug }) => `/${slug}`),
          "/blog",
          "/maintenance-adviser",
          ...blogPosts.map(({ slug }) => `/blog/${slug}`),
        ];
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>${pageUrl(path)}</loc></url>`).join("")}</urlset>`,
          { headers: { "Content-Type": "application/xml; charset=utf-8" } },
        );
      },
    },
  },
});
