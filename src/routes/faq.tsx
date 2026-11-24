import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header } from "@/ecfs/Chrome";
import { AssessmentBand, PhotoMasthead } from "@/ecfs/PageVisuals";
import { sitePages } from "@/ecfs/site-pages";
import { headMeta, faqSchema, breadcrumbs, schemaScript } from "@/ecfs/seo";
import { FAQ } from "@/ecfs/Sections";

const page = sitePages["faq"];
export const Route = createFileRoute("/faq")({
  head: () => ({
    ...headMeta(`${page.headline} | ECFS`, page.description, "/faq"),
    scripts: [schemaScript([breadcrumbs(page.name, "/faq"), faqSchema])],
  }),
  component: FaqPage,
});
function FaqPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PhotoMasthead title={page.headline} description={page.description} label={page.name} />
        <FAQ directory />
        <AssessmentBand />
      </main>
      <Footer />
    </>
  );
}
