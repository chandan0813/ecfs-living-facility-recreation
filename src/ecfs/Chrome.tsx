import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { areas, company, services } from "./content";
import { ScrollEffects } from "./ScrollEffects";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export function Brand({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      to="/"
      className={`flex shrink-0 items-center ${onDark ? "w-fit rounded-2xl bg-white px-4 py-3" : ""}`}
      aria-label="Easy Clean Facility Services home"
    >
      <img
        width={1287}
        height={507}
        src="/ecfs-logo.webp"
        alt="ECFS – Easy Clean Facility Services"
        className={onDark ? "h-16 w-auto" : "h-11 w-auto sm:h-12"}
      />
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50 px-2 pt-2 sm:px-3 sm:pt-3">
      {/* Every page's <main> carries id="main". */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:rounded-xl focus:bg-card focus:p-3 focus:font-bold focus:shadow-soft"
        href="#main"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[80rem] items-center justify-between gap-3 rounded-full border border-border/70 bg-card/85 pr-2 pl-4 shadow-soft backdrop-blur-xl sm:pl-5">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {navigation.map(({ label, ...link }) => (
            <Link
              {...link}
              activeOptions={{ exact: link.to !== "/blog" }}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground aria-[current=page]:bg-secondary aria-[current=page]:text-deep-aqua xl:px-4"
              key={label}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${company.tel}`}
            className="hidden size-11 place-items-center rounded-full text-deep-aqua transition-colors hover:bg-secondary md:grid lg:hidden xl:grid"
            aria-label={`Call ${company.phone}`}
          >
            <Phone size={18} aria-hidden="true" />
          </a>
          <Link to="/contact" className="btn-pill btn-primary hidden min-h-11 px-5 sm:inline-flex">
            Free Site Assessment <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <details className="group relative lg:hidden">
            <summary
              className="grid size-11 cursor-pointer list-none place-items-center rounded-full bg-secondary text-ink transition-colors hover:bg-secondary/70"
              aria-label="Menu"
            >
              <Menu size={20} aria-hidden="true" className="group-open:hidden" />
              <X size={20} aria-hidden="true" className="hidden group-open:block" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute top-full right-0 mt-3 grid w-[min(20rem,calc(100vw-1.5rem))] gap-1 rounded-3xl border bg-card p-3 shadow-lift"
            >
              {navigation.map(({ label, ...link }) => (
                <Link
                  {...link}
                  key={label}
                  activeOptions={{ exact: link.to !== "/blog" }}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-[.95rem] font-semibold hover:bg-secondary aria-[current=page]:bg-secondary aria-[current=page]:text-deep-aqua"
                  onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}
                >
                  {label}
                  <ArrowUpRight size={16} className="opacity-40" aria-hidden="true" />
                </Link>
              ))}
              <div className="mt-2 grid gap-2 border-t pt-3">
                <Link to="/contact" className="btn-pill btn-primary w-full">
                  Free Site Assessment <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <a href={`tel:${company.tel}`} className="btn-pill btn-outline w-full">
                  <Phone size={16} aria-hidden="true" /> {company.phone}
                </a>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold tracking-[.12em] text-on-ink/70 uppercase">{title}</h2>
      <ul className="mt-4 grid gap-2.5 text-sm text-muted-on-ink">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-20 text-on-ink sm:pb-0">
      <div
        aria-hidden="true"
        className="drift-slow pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full bg-aqua/25 blur-3xl"
      />
      <div className="site-wrap relative grid gap-12 pt-16 pb-12 lg:grid-cols-[1.4fr_2.6fr] lg:gap-16 lg:pt-20">
        <div>
          <Brand onDark />
          <p className="mt-6 max-w-80 text-sm leading-relaxed text-muted-on-ink">
            Integrated facility management, housekeeping, cleaning and maintenance across{" "}
            {company.coverage.country} since {company.since}.
          </p>
          <div className="mt-6 grid gap-2.5 text-sm">
            <a
              href={`tel:${company.tel}`}
              className="glass flex w-fit items-center gap-2.5 rounded-full px-4 py-2.5 font-semibold transition-colors hover:bg-on-ink/20"
            >
              <Phone size={15} aria-hidden="true" /> {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="glass flex w-fit items-center gap-2.5 rounded-full px-4 py-2.5 font-semibold break-all transition-colors hover:bg-on-ink/20"
            >
              <Mail size={15} aria-hidden="true" /> {company.email}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          <FooterColumn title="Company">
            {navigation.map(({ label, ...link }) => (
              <li key={label}>
                <Link {...link} className="transition-colors hover:text-on-ink">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="transition-colors hover:text-on-ink"
                to="/$page"
                params={{ page: "careers" }}
              >
                Careers
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-on-ink" to="/faq">
                FAQs
              </Link>
            </li>
          </FooterColumn>
          <FooterColumn title="Services">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  className="transition-colors hover:text-on-ink"
                  to="/$page"
                  params={{ page: s.slug }}
                >
                  {s.short}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Service Areas">
            {areas.map((s) => (
              <li key={s.slug}>
                <Link
                  className="transition-colors hover:text-on-ink"
                  to="/$page"
                  params={{ page: s.slug }}
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <div>
            <h2 className="text-xs font-bold tracking-[.12em] text-on-ink/70 uppercase">Offices</h2>
            <address className="mt-4 grid gap-4 text-sm leading-relaxed text-muted-on-ink not-italic">
              <span className="flex gap-2">
                <MapPin size={15} className="mt-1 shrink-0 text-accent-on-ink" aria-hidden="true" />
                {company.head}
              </span>
              <a href="tel:+917948010848" className="transition-colors hover:text-on-ink">
                Customer care: {company.care}
              </a>
              <span>{company.hours}</span>
            </address>
          </div>
        </div>
      </div>
      <div className="relative border-t border-on-ink/10">
        <div className="site-wrap flex flex-wrap justify-between gap-4 py-6 text-xs text-muted-on-ink">
          <p>
            © 2026 {company.name} ({company.legal}) · CIN {company.cin} · GST {company.gst}
          </p>
          <div className="flex gap-5">
            <Link
              className="transition-colors hover:text-on-ink"
              to="/$page"
              params={{ page: "privacy-policy" }}
            >
              Privacy Policy
            </Link>
            <Link
              className="transition-colors hover:text-on-ink"
              to="/$page"
              params={{ page: "terms" }}
            >
              Terms
            </Link>
            <a className="transition-colors hover:text-on-ink" href="/sitemap.xml">
              Sitemap
            </a>
          </div>
        </div>
      </div>
      <MobileActionBar />
      <ScrollEffects />
    </footer>
  );
}

/** Thumb-reachable call and quote actions on small screens. */
function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-2 sm:hidden">
      <div className="flex gap-2 rounded-full border bg-card/90 p-1.5 shadow-lift backdrop-blur-xl">
        <a href={`tel:${company.tel}`} className="btn-pill btn-outline min-h-11 flex-1 px-3">
          <Phone size={16} aria-hidden="true" /> Call
        </a>
        <Link to="/contact" className="btn-pill btn-primary min-h-11 flex-[1.6] px-3">
          Free assessment <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
