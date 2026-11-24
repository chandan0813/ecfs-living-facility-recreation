import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowUpRight, Phone } from "lucide-react";
import { Footer, Header } from "@/ecfs/Chrome";
import { imageFor } from "@/ecfs/imagery";
import {
  AssessmentBand,
  AssessmentLink,
  DetailFaqs,
  DetailList,
  DetailOverview,
  RelatedLinks,
  PhotoMasthead,
} from "@/ecfs/PageVisuals";
import { DirectoryCards } from "@/ecfs/Sections";
import { company } from "@/ecfs/content";
import { relatedLinks, relatedServices } from "@/ecfs/related";
import { pageContentFor, pageContentTitles } from "@/ecfs/page-content";
import { detailDirectory, findDetail } from "@/ecfs/pages";
import { breadcrumbs, coverageArea, faqPageSchema, headMeta, schemaScript } from "@/ecfs/seo";
import { findBlogPost } from "@/ecfs/blog";

export const Route = createFileRoute("/$page")({
  loader: ({ params }) => {
    const article = findBlogPost(params.page);
    if (article?.legacyUrl)
      throw redirect({ to: "/blog/$slug", params: { slug: article.slug }, statusCode: 301 });
    const page = findDetail(params.page);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Page unavailable | ECFS" }, { name: "robots", content: "noindex" }],
      };
    const page = loaderData;
    const path = `/${page.slug}`;
    const title = `${page.name} | ECFS`;
    const description = page.text;
    const content = pageContentFor(page.slug);
    const structured = [
      breadcrumbs(page.name, path, detailDirectory(page.kind)),
      ...(content ? [faqPageSchema(content.faqs)] : []),
    ];
    return {
      ...headMeta(title, description, path),
      scripts: [
        schemaScript([
          ...structured,
          ...(page.kind === "Services"
            ? [
                {
                  "@type": "Service",
                  name: page.name,
                  description: page.text,
                  provider: { "@id": "/#organization" },
                  areaServed: coverageArea,
                },
              ]
            : []),
        ]),
      ],
    };
  },
  component: DetailPage,
});
function DetailPage() {
  const page = Route.useLoaderData();
  const isLegal = page.kind === "Legal";
  const image = imageFor(page.slug, page.kind);
  const hasPhoto = Boolean(image);
  const content = pageContentFor(page.slug);
  const titles = pageContentTitles(page.kind, page.name);
  return (
    <>
      <Header />
      <main id="main">
        <PhotoMasthead
          title={page.name}
          description={page.text}
          label={page.name}
          parent={detailDirectory(page.kind)}
          image={image}
        >
          {!isLegal &&
            (page.slug === "careers" ? (
              <a href={`mailto:${company.email}`} className="btn-pill btn-light">
                Email your CV <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            ) : (
              <AssessmentLink tone={hasPhoto ? "light" : "primary"} />
            ))}
          {!isLegal && (
            <a
              href={`tel:${company.tel}`}
              className={`btn-pill ${hasPhoto ? "btn-ghost-light" : "btn-outline"}`}
            >
              <Phone size={16} aria-hidden="true" />
              {company.phone}
            </a>
          )}
        </PhotoMasthead>
        {content && (
          <>
            <DetailOverview heading={content.heading} paragraphs={content.overview} />
            <DetailList title={titles.included} lines={content.included} />
          </>
        )}
        {page.lines && !content && (
          <DetailList title={isLegal ? "Details" : "What's included"} lines={page.lines} />
        )}
        {content && <DetailFaqs title={titles.faqs} faqs={content.faqs} />}
        {!isLegal && (
          <section className="site-wrap py-12 md:py-20">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="section-title">Related services</h2>
              <Link to="/services" className="btn-pill btn-outline">
                All services <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <DirectoryCards items={relatedServices(page.slug)} />
          </section>
        )}
        {!isLegal && <RelatedLinks groups={relatedLinks(page.slug)} />}
        {!isLegal && <AssessmentBand />}
      </main>
      <Footer />
    </>
  );
}
