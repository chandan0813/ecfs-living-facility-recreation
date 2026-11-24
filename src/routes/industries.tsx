import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header } from "@/ecfs/Chrome";
import { photos } from "@/ecfs/imagery";
import { AssessmentBand, DetailFaqs, DetailOverview, PhotoMasthead } from "@/ecfs/PageVisuals";
import { directoryContent } from "@/ecfs/page-content/directories";
import { sitePages } from "@/ecfs/site-pages";
import { faqPageSchema, headMeta, schemaScript } from "@/ecfs/seo";
import { Industries } from "@/ecfs/Sections";

const page = sitePages["industries"];
const copy = directoryContent["industries"];
export const Route = createFileRoute("/industries")({
  head: () => ({
    ...headMeta(`${page.headline} | ECFS`, page.description, "/industries"),
    scripts: [schemaScript([faqPageSchema(copy.faqs)])],
  }),
  component: IndustriesPage,
});
function IndustriesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PhotoMasthead
          title={page.headline}
          description={page.description}
          label={page.name}
          image={photos.office}
        />
        <Industries directory />
        <DetailOverview heading={copy.heading} paragraphs={copy.overview} />
        <DetailFaqs title="Questions about sectors" faqs={copy.faqs} />
        <AssessmentBand />
      </main>
      <Footer />
    </>
  );
}
