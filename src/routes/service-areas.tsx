import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer, Header } from "@/ecfs/Chrome";
import { photos } from "@/ecfs/imagery";
import {
  AssessmentBand,
  AssessmentLink,
  DetailFaqs,
  DetailOverview,
  PhotoMasthead,
} from "@/ecfs/PageVisuals";
import { directoryContent } from "@/ecfs/page-content/directories";
import { sitePages } from "@/ecfs/site-pages";
import { faqPageSchema, headMeta, schemaScript } from "@/ecfs/seo";
import { ArrowUpRight, MapPin } from "lucide-react";
import { areas } from "@/ecfs/content";
import { SectionTag } from "@/ecfs/Sections";

const page = sitePages["service-areas"];
const copy = directoryContent["service-areas"];
export const Route = createFileRoute("/service-areas")({
  head: () => ({
    ...headMeta(`${page.headline} | ECFS`, page.description, "/service-areas"),
    scripts: [schemaScript([faqPageSchema(copy.faqs)])],
  }),
  component: ServiceAreasPage,
});
function ServiceAreasPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PhotoMasthead
          title={page.headline}
          description={page.description}
          label={page.name}
          image={photos.exterior}
        >
          <AssessmentLink tone="light" />
        </PhotoMasthead>
        <section className="site-wrap py-16 md:py-24">
          <div className="mb-10 max-w-2xl">
            <SectionTag>Locations</SectionTag>
            <h2 className="section-title">Featured service locations.</h2>
            <p className="section-lead mt-4">
              Don’t see your city below? Tell us where your site is when you request an assessment.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                to="/$page"
                params={{ page: area.slug }}
                className="card-lift reveal group flex flex-col p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="icon-chip">
                    <MapPin size={20} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={19}
                    className="text-deep-aqua transition-transform duration-300 group-hover:rotate-45"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-bold">{area.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.text}</p>
              </Link>
            ))}
          </div>
        </section>
        <DetailOverview heading={copy.heading} paragraphs={copy.overview} />
        <DetailFaqs title="Questions about coverage" faqs={copy.faqs} />
        <AssessmentBand />
      </main>
      <Footer />
    </>
  );
}
