import { describe, expect, it } from "vitest";
import {
  blogPosts,
  findBlogPost,
  postsForTopic,
  relatedBlogPosts,
  validateBlogSearch,
} from "@/ecfs/blog";

describe("Blog discovery", () => {
  it("finds every guide that covers commercial cleaning, and only those", () => {
    const { topic } = validateBlogSearch({ topic: "commercial-cleaning" });
    expect(postsForTopic(topic).map((post) => post.slug)).toEqual([
      "ahmedabad-cleaning-costs",
      "choosing-a-facility-management-company",
      "housekeeping-contract-checklist",
      "how-often-deep-clean-office",
    ]);
  });

  it("shows all guides for an unknown topic", () => {
    const { topic } = validateBlogSearch({ topic: "missing-topic" });
    expect(postsForTopic(topic)).toHaveLength(blogPosts.length);
  });

  it("links the maintenance checklist to other maintenance guides but not the cleaning cost guide or itself", () => {
    const post = findBlogPost("preventive-facility-maintenance-checklist");
    if (!post) throw new Error("Missing maintenance checklist");
    expect(relatedBlogPosts(post).map((other) => other.slug)).toEqual([
      "choosing-a-facility-management-company",
      "how-often-deep-clean-office",
    ]);
  });

  it("keeps article addresses unique", () => {
    const slugs = blogPosts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
