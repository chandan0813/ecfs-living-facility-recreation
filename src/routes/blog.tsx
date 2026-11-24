import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Footer, Header } from "@/ecfs/Chrome";
import { blogTopicKeys, blogTopics, postsForTopic, validateBlogSearch } from "@/ecfs/blog";
import { PhotoMasthead } from "@/ecfs/PageVisuals";
import { breadcrumbs, headMeta, schemaScript } from "@/ecfs/seo";

const description =
  "Practical guides on commercial cleaning, maintenance and choosing a facility management partner.";
export const Route = createFileRoute("/blog")({
  validateSearch: validateBlogSearch,
  head: () => ({
    ...headMeta("Facility Management Blog | ECFS", description, "/blog"),
    scripts: [schemaScript([breadcrumbs("Blog", "/blog")])],
  }),
  component: Blog,
});

const chip =
  "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors";
const chipOn = "border-aqua bg-aqua text-on-ink shadow-soft";
const chipOff = "bg-card hover:border-aqua hover:text-deep-aqua";

function Blog() {
  const { topic } = Route.useSearch();
  const posts = postsForTopic(topic);
  return (
    <>
      <Header />
      <main id="main">
        <PhotoMasthead title="Facility management blog" description={description} label="Blog">
          <Link to="/maintenance-adviser" className="btn-pill btn-primary">
            <Sparkles size={16} aria-hidden="true" /> Open maintenance adviser
          </Link>
        </PhotoMasthead>
        <section className="site-wrap py-14 md:py-20" aria-labelledby="blog-guides">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="blog-guides" className="section-title">
              Guides and checklists
            </h2>
            <p role="status" className="text-sm font-semibold text-muted-foreground">
              {posts.length} {posts.length === 1 ? "guide" : "guides"}
            </p>
          </div>
          <nav aria-label="Filter guides by topic" className="mb-8 flex flex-wrap gap-2">
            <Link
              to="/blog"
              search={{}}
              activeOptions={{ exact: true, includeSearch: true }}
              resetScroll={false}
              inactiveProps={{ "aria-current": topic ? undefined : "true" }}
              className={`${chip} ${topic ? chipOff : chipOn}`}
            >
              All topics
            </Link>
            {blogTopicKeys.map((key) => (
              <Link
                key={key}
                to="/blog"
                search={{ topic: key }}
                activeOptions={{ exact: true, includeSearch: true }}
                resetScroll={false}
                className={`${chip} ${topic === key ? chipOn : chipOff}`}
              >
                {blogTopics[key]}
              </Link>
            ))}
          </nav>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="card-lift reveal group flex flex-col overflow-hidden p-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[.95rem] bg-secondary">
                  <img
                    src={post.image.url}
                    alt={post.image.alt}
                    loading="lazy"
                    className="reveal-img size-full object-cover transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transition-none"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-[.7rem] font-bold text-deep-aqua backdrop-blur">
                    {blogTopics[post.topics[0]]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-4 pt-5 pb-4">
                  <h3 className="text-lg font-bold leading-snug md:text-xl">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-deep-aqua">
                    Read guide
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform group-hover:rotate-45"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
