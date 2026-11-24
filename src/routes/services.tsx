import { createFileRoute, Link } from "@tanstack/react-router";
import { maintenanceChecklistSlug } from "@/ecfs/blog";
import { Footer, Header } from "@/ecfs/Chrome";
import { photos } from "@/ecfs/imagery";
import { AssessmentBand, DetailFaqs, DetailOverview, PhotoMasthead } from "@/ecfs/PageVisuals";
import { directoryContent } from "@/ecfs/page-content/directories";
import { sitePages } from "@/ecfs/site-pages";
import { faqPageSchema, headMeta, schemaScript } from "@/ecfs/seo";
import { Services } from "@/ecfs/Sections";
import { VideoShowcase } from "@/ecfs/Media";

const page = sitePages["services"];
const copy = directoryContent["services"];
export const Route = createFileRoute("/services")({
  head: () => ({
    ...headMeta(`${page.headline} | ECFS`, page.description, "/services"),
    scripts: [schemaScript([faqPageSchema(copy.faqs)])],
  }),
  component: ServicesPage,
});
function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PhotoMasthead
          title={page.headline}
          description={page.description}
          label={page.name}
          image={photos.maintenance}
        />
        <Services directory />
        <DetailOverview heading={copy.heading} paragraphs={copy.overview} />
        <DetailFaqs title="Questions about our services" faqs={copy.faqs} />
        <VideoShowcase />
        <div className="site-wrap pb-6">
          <Link
            to="/blog/$slug"
            params={{ slug: maintenanceChecklistSlug }}
            className="btn-pill btn-outline"
          >
            Read: Facility maintenance checklist
          </Link>
        </div>
        <AssessmentBand />
      </main>
      <Footer />
    </>
  );
}
