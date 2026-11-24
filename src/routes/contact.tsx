import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header } from "@/ecfs/Chrome";
import { photos } from "@/ecfs/imagery";
import { PhotoMasthead } from "@/ecfs/PageVisuals";
import { sitePages } from "@/ecfs/site-pages";
import { headMeta } from "@/ecfs/seo";
import { Contact } from "@/ecfs/Contact";

const page = sitePages["contact"];
export const Route = createFileRoute("/contact")({
  head: () => headMeta(`${page.headline} | ECFS`, page.description, "/contact"),
  component: ContactPage,
});
function ContactPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PhotoMasthead
          title={page.headline}
          description={page.description}
          label={page.name}
          image={photos.supervision}
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
