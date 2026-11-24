import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/ecfs/Chrome";
import { FacilityExperience, Hero } from "@/ecfs/Hero";
import { Services, Industries, WhyECFS, Process, FAQ } from "@/ecfs/Sections";
import { ClientLogoMarquee, Testimonials } from "@/ecfs/Testimonials.tsx";
import { AssessmentBand } from "@/ecfs/PageVisuals";
import { VideoShowcase } from "@/ecfs/Media";
import { headMeta, homeDesc, homeSchema, homeTitle } from "@/ecfs/seo";

export const Route = createFileRoute("/")({
  head: () => ({ ...headMeta(homeTitle, homeDesc, "/"), scripts: [homeSchema] }),
  component: Index,
});
function Index() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ClientLogoMarquee />
        <Services />
        <Industries />
        <WhyECFS />
        <VideoShowcase />
        <Process />
        <Testimonials />
        <FacilityExperience />
        <FAQ />
        <AssessmentBand />
      </main>
      <Footer />
    </>
  );
}
