import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Footer, Header } from "@/ecfs/Chrome";
import { photos } from "@/ecfs/imagery";
import { AssessmentBand, AssessmentLink, DetailList, PhotoMasthead } from "@/ecfs/PageVisuals";
import { aboutPage } from "@/ecfs/pages";
import { ManagingDirector, Process, Proof } from "@/ecfs/Sections";
import { VideoShowcase } from "@/ecfs/Media";
import { breadcrumbs, headMeta, managingDirectorSchema, schemaScript } from "@/ecfs/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...headMeta(`${aboutPage.name} | ECFS`, aboutPage.text, "/about"),
    scripts: [schemaScript([breadcrumbs("About", "/about"), managingDirectorSchema])],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Header />
      <main id="main">
        <PhotoMasthead
          title={aboutPage.name}
          description={aboutPage.text}
          label="About"
          image={photos.supervision}
        >
          <AssessmentLink tone="light" />
        </PhotoMasthead>
        {aboutPage.lines && <DetailList title="Our company" lines={aboutPage.lines} />}
        <ManagingDirector />
        <Proof />
        <Process />
        <VideoShowcase />
        <div className="site-wrap flex flex-wrap gap-3 pb-6">
          <Link to="/services" className="btn-pill btn-outline">
            Explore our services <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/$page" params={{ page: "careers" }} className="btn-pill btn-outline">
            Careers at ECFS <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <AssessmentBand />
      </main>
      <Footer />
    </>
  );
}
