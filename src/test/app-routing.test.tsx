import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it.each([
    "/services",
    "/industries",
    "/service-areas",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/maintenance-adviser",
  ])("matches the dedicated route %s rather than the generic detail route", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path);
  });
  it("gives an article its own address under the blog", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const match = router.matchRoutes("/blog/ahmedabad-cleaning-costs").at(-1);
    expect(match?.routeId).toBe("/blog_/$slug");
    expect(match?.params).toEqual({ slug: "ahmedabad-cleaning-costs" });
  });
  it.each(["/housekeeping-services", "/facility-management-for-offices", "/careers"])(
    "preserves the original detail address %s",
    (path) => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
      const match = router.matchRoutes(path).at(-1);
      expect(match?.routeId).toBe("/$page");
      expect(match?.params).toEqual({ page: path.slice(1) });
    },
  );
});
