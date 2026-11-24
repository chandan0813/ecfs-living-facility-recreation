import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ChevronRight, Phone, Plus } from "lucide-react";
import type { FacilityImage } from "./imagery";
import type { detailDirectory } from "./pages";
import { company } from "./content";
import { delay } from "./motion";

export function AssessmentLink({
  children = "Get a free site assessment",
  tone = "primary",
}: {
  children?: React.ReactNode;
  tone?: "primary" | "light";
}) {
  return (
    <Link
      to="/contact"
      className={`btn-pill whitespace-normal ${tone === "light" ? "btn-light" : "btn-primary"}`}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function PhotoMasthead({
  title,
  description,
  label,
  image,
  parent,
  children,
}: {
  title: string;
  description: string;
  label: string;
  image?: FacilityImage | undefined;
  parent?: ReturnType<typeof detailDirectory> | { name: string; path: "/blog" };
  children?: React.ReactNode;
}) {
  const onPhoto = Boolean(image);
  return (
    <div className="px-2 pt-2 sm:px-3 sm:pt-3">
      <section
        className={`relative isolate mx-auto flex max-w-[110rem] flex-col justify-end overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] ${
          onPhoto ? "photo-hero photo-page bg-ink text-on-ink" : "glow-backdrop border"
        }`}
      >
        {image && (
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <img
              src={image.url}
              alt={image.alt}
              fetchPriority="high"
              data-parallax="0.12"
              className="hero-media size-full object-cover"
            />
          </div>
        )}
        <div className="site-wrap pt-20 pb-10 md:pt-28 md:pb-14">
          <nav
            style={delay(60)}
            className={`hero-in mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold ${onPhoto ? "text-on-ink/75" : "text-muted-foreground"}`}
            aria-label="Breadcrumb"
          >
            <Link to="/" className={onPhoto ? "hover:text-on-ink" : "hover:text-foreground"}>
              Home
            </Link>
            <ChevronRight size={13} aria-hidden="true" />
            {parent && (
              <>
                <Link
                  to={parent.path}
                  className={onPhoto ? "hover:text-on-ink" : "hover:text-foreground"}
                >
                  {parent.name}
                </Link>
                <ChevronRight size={13} aria-hidden="true" />
              </>
            )}
            <span
              aria-current="page"
              className={`rounded-full px-2.5 py-1 ${onPhoto ? "glass text-on-ink" : "bg-card text-foreground"}`}
            >
              {label}
            </span>
          </nav>
          <h1 className="hero-in hero-title max-w-[18ch] text-balance" style={delay(160)}>
            {title}
          </h1>
          <p
            style={delay(320)}
            className={`hero-in mt-5 max-w-[38rem] text-balance text-base leading-relaxed md:text-lg ${onPhoto ? "text-on-ink/85" : "text-muted-foreground"}`}
          >
            {description}
          </p>
          {children && (
            <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={delay(460)}>
              {children}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/** Readable checklist of facts for detail, about and legal pages. */
export function DetailList({ title, lines }: { title: string; lines: readonly string[] }) {
  return (
    <section className="site-wrap py-12 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <h2 className="reveal section-title">{title}</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {lines.map((line) => (
            <li
              key={line}
              className="reveal flex gap-3 rounded-2xl border bg-card p-4 text-[.95rem] leading-relaxed shadow-soft"
            >
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-aqua text-on-ink">
                <Check size={14} strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-foreground/85">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RelatedLinks({
  groups,
}: {
  groups: { title: string; links: { slug: string; name: string; to: "page" | "blog" }[] }[];
}) {
  if (!groups.length) return null;
  const chip =
    "inline-flex min-h-10 items-center gap-1.5 rounded-full border bg-card px-4 text-sm font-semibold transition-colors hover:border-aqua hover:text-deep-aqua";
  return (
    <nav aria-labelledby="explore-more" className="site-wrap pb-12 md:pb-16">
      <h2 id="explore-more" className="text-xl font-extrabold md:text-2xl">
        Explore related pages
      </h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-bold tracking-[.12em] text-muted-foreground uppercase">
              {group.title}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.links.map((link) => (
                <li key={link.slug}>
                  {link.to === "blog" ? (
                    <Link to="/blog/$slug" params={{ slug: link.slug }} className={chip}>
                      {link.name} <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  ) : (
                    <Link to="/$page" params={{ page: link.slug }} className={chip}>
                      {link.name} <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function DetailOverview({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: readonly string[];
}) {
  return (
    <section className="site-wrap pt-12 md:pt-20">
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <h2 className="reveal font-display text-2xl leading-tight font-extrabold text-balance md:text-[2rem]">
          {heading}
        </h2>
        <div className="reveal grid content-start gap-4 text-base leading-relaxed text-foreground/85 md:text-[1.05rem]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DetailFaqs({
  title,
  faqs,
}: {
  title: string;
  faqs: readonly (readonly [string, string])[];
}) {
  return (
    <section className="site-wrap py-12 md:py-20" aria-labelledby="page-faqs">
      <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <h2 id="page-faqs" className="reveal section-title">
          {title}
        </h2>
        <div className="grid content-start gap-3">
          {faqs.map(([question, answer]) => (
            <details
              key={question}
              className="reveal group rounded-2xl border bg-card transition-[border-color,box-shadow] open:border-aqua/40 open:shadow-soft"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display font-bold md:px-6">
                {question}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-deep-aqua transition-all group-open:rotate-45 group-open:bg-aqua group-open:text-on-ink">
                  <Plus size={16} aria-hidden="true" />
                </span>
              </summary>
              <p className="px-5 pr-10 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6 md:text-[.95rem]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AssessmentBand() {
  return (
    <section id="contact" className="px-2 py-10 sm:px-3 md:py-16">
      <div
        className="reveal brand-panel relative mx-auto max-w-[110rem] overflow-hidden rounded-[1.75rem] text-on-ink sm:rounded-[2.25rem]"
        data-reveal="zoom"
      >
        <div
          aria-hidden="true"
          className="drift pointer-events-none absolute -top-32 right-[10%] size-[26rem] rounded-full bg-aqua-hot/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[.07] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="site-wrap relative flex flex-col gap-8 py-14 md:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="glass mb-5 inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2.5 text-xs font-bold tracking-[.04em] uppercase">
              <span className="size-1.5 rounded-full bg-aqua-hot" aria-hidden="true" /> Plan your
              service
            </p>
            <h2 className="section-title">Start with a free site assessment.</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-on-ink/75 md:text-lg">
              No obligation. We visit, scope your premises and send an itemised proposal with an
              SLA.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AssessmentLink tone="light">Book your assessment</AssessmentLink>
            <a href={`tel:${company.tel}`} className="btn-pill btn-ghost-light">
              <Phone size={16} aria-hidden="true" /> {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
