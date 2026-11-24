import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { blogTopics, findBlogPost, relatedBlogPosts } from "@/ecfs/blog";
import { Footer, Header } from "@/ecfs/Chrome";
import { company } from "@/ecfs/content";
import { AssessmentBand, PhotoMasthead } from "@/ecfs/PageVisuals";
import { pagesForGuide } from "@/ecfs/related";
import { breadcrumbs, headMeta, pageUrl, schemaScript } from "@/ecfs/seo";

const blogDirectory = { name: "Blog", path: "/blog" } as const;
export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = findBlogPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData: post }) => {
    if (!post)
      return {
        meta: [{ title: "Article unavailable | ECFS" }, { name: "robots", content: "noindex" }],
      };
    const path = `/blog/${post.slug}`;
    return {
      ...headMeta(`${post.title} | ECFS`, post.description, path, "article", post.image),
      scripts: [
        schemaScript([
          breadcrumbs(post.title, path, blogDirectory),
          {
            "@type": "Article",
            headline: post.title,
            description: post.description,
            mainEntityOfPage: pageUrl(path),
            publisher: { "@type": "Organization", name: company.name },
          },
        ]),
      ],
    };
  },
  component: Article,
});

function Article() {
  const post = Route.useLoaderData();
  const related = relatedBlogPosts(post);
  const pages = pagesForGuide(post.slug);
  return (
    <>
      <Header />
      <main id="main">
        <article>
          <PhotoMasthead
            title={post.title}
            description={post.description}
            label={blogTopics[post.topics[0]]}
            parent={blogDirectory}
            image={post.image}
          />
          <div className="site-wrap max-w-3xl space-y-10 py-12 md:py-20">
            <nav aria-label="Article topics" className="flex flex-wrap gap-2">
              {post.topics.map((topic) => (
                <Link
                  key={topic}
                  to="/blog"
                  search={{ topic }}
                  className="inline-flex min-h-9 items-center rounded-full bg-secondary px-4 text-sm font-semibold text-deep-aqua transition-colors hover:bg-aqua hover:text-on-ink"
                >
                  {blogTopics[topic]}
                </Link>
              ))}
            </nav>
            {post.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-extrabold md:text-3xl">{section.title}</h2>
                {section.text && (
                  <p className="mt-4 text-[1.05rem] leading-[1.8] text-foreground/80">
                    {section.text}
                  </p>
                )}
                {section.checklist && (
                  <ul className="mt-5 grid gap-2.5">
                    {section.checklist.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 rounded-2xl border bg-card p-4 leading-relaxed text-foreground/85"
                      >
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-aqua text-on-ink">
                          <Check size={14} strokeWidth={3} aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {pages.length > 0 && (
              <aside className="border-t pt-10" aria-labelledby="related-services">
                <h2 id="related-services" className="text-2xl font-extrabold">
                  How ECFS can help
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {pages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        to="/$page"
                        params={{ page: page.slug }}
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-full border bg-card px-4 text-sm font-semibold transition-colors hover:border-aqua hover:text-deep-aqua"
                      >
                        {page.name} <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
            {related.length > 0 && (
              <aside className="border-t pt-10" aria-labelledby="related-guides">
                <h2 id="related-guides" className="text-2xl font-extrabold">
                  Related guides
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {related.map((other) => (
                    <li key={other.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: other.slug }}
                        className="card-lift group flex h-full flex-col p-5"
                      >
                        <span className="flex items-start justify-between gap-3 font-bold">
                          {other.title}
                          <ArrowUpRight
                            size={17}
                            className="mt-0.5 shrink-0 text-deep-aqua transition-transform group-hover:rotate-45"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {other.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </article>
        <AssessmentBand />
      </main>
      <Footer />
    </>
  );
}
