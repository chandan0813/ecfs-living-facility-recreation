import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  MessageCircleQuestion,
  Phone,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { imageFor, photos, portraits } from "./imagery";
import {
  differentiators,
  faqs,
  industries,
  managingDirector,
  process,
  secondary,
  services,
  company,
} from "./content";

export function SectionTag({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={
        tone === "dark"
          ? "glass mb-5 inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2.5 text-xs font-bold tracking-[.04em] text-on-ink uppercase"
          : "eyebrow mb-5"
      }
    >
      <span
        className={`size-1.5 rounded-full ${tone === "dark" ? "bg-aqua-hot" : "bg-aqua"}`}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

function SectionHeader({
  tag,
  title,
  lead,
  link,
}: {
  tag: string;
  title: React.ReactNode;
  lead?: string;
  link?: { to: "/services" | "/industries"; label: string };
}) {
  return (
    <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
      <div className="max-w-2xl">
        <SectionTag>{tag}</SectionTag>
        <h2 className="section-title">{title}</h2>
        {lead && <p className="section-lead mt-4 max-w-xl">{lead}</p>}
      </div>
      {link && (
        <Link to={link.to} className="btn-pill btn-outline">
          {link.label} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

type DirectoryItem = {
  slug: string;
  name: string;
  text: string;
  category?: string;
  icon?: typeof ArrowUpRight;
};

export function DirectoryCards({ items }: { items: DirectoryItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {items.map(({ slug, name, text, category, icon: Icon }) => {
        const photo = imageFor(slug);
        return (
          <Link
            key={slug}
            to="/$page"
            params={{ page: slug }}
            className="card-lift reveal group flex flex-col overflow-hidden p-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[.95rem] bg-secondary">
              {photo ? (
                <img
                  src={photo.url}
                  alt={photo.alt}
                  width={826}
                  height={460}
                  loading="lazy"
                  decoding="async"
                  className="reveal-img size-full object-cover transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transition-none"
                />
              ) : (
                <div className="brand-panel grid size-full place-items-center text-on-ink">
                  {Icon && <Icon size={48} strokeWidth={1.25} aria-hidden="true" />}
                </div>
              )}
              {category && (
                <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-[.7rem] font-bold text-deep-aqua backdrop-blur">
                  {category}
                </span>
              )}
              <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-card text-ink shadow-soft transition-all duration-300 group-hover:bg-aqua group-hover:text-on-ink">
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
            </div>
            <div className="flex flex-1 flex-col px-4 pt-5 pb-4">
              <h3 className="text-lg font-bold leading-snug md:text-xl">{name}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

const featuredServices = [
  "integrated-facility-management",
  "housekeeping-services",
  "mep-maintenance",
].flatMap((slug) => services.filter((item) => item.slug === slug));
const otherServices = services.filter((s) => !featuredServices.includes(s));
const featuredIndustries = [
  "facility-management-for-offices",
  "facility-management-for-factories",
  "facility-management-for-hospitals",
].flatMap((slug) => industries.filter((item) => item.slug === slug));

function BentoServices() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
        {featuredServices.map(({ slug, name, text, category }, i) => {
          const photo = imageFor(slug);
          const big = i === 0;
          return (
            <Link
              key={slug}
              to="/$page"
              params={{ page: slug }}
              data-tilt
              className={`reveal group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink p-6 text-on-ink shadow-soft transition-shadow hover:shadow-lift md:p-7 ${big ? "md:col-span-2 lg:row-span-2 lg:min-h-[34rem]" : "lg:min-h-0"}`}
            >
              {photo && (
                <img
                  src={photo.url}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="reveal-img absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transition-none"
                />
              )}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
              <span className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-on-ink/15 backdrop-blur transition-all duration-300 group-hover:bg-on-ink group-hover:text-ink">
                <ArrowUpRight
                  size={19}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
              {category && (
                <span className="mb-3 w-fit rounded-full bg-aqua px-3 py-1 text-[.7rem] font-bold">
                  {category}
                </span>
              )}
              <h3
                className={`font-extrabold leading-tight ${big ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"}`}
              >
                {name}
              </h3>
              <p
                className={`mt-3 max-w-xl text-sm leading-relaxed text-on-ink/80 ${big ? "md:text-base" : "line-clamp-2"}`}
              >
                {text}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="reveal mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-semibold text-muted-foreground">Also:</span>
        {[...otherServices, ...secondary].map(({ slug, name }) => (
          <Link
            key={slug}
            to="/$page"
            params={{ page: slug }}
            className="rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-aqua hover:text-deep-aqua"
          >
            {name}
          </Link>
        ))}
      </div>
    </>
  );
}

export function Services({ directory = false }: { directory?: boolean }) {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="site-wrap">
        {directory ? (
          <SectionHeader
            tag="Core services"
            title="Everything your facility needs."
            lead="Soft services, technical maintenance and manpower, available individually or together under one contract."
          />
        ) : (
          <SectionHeader
            tag="What we do"
            title="Services for every part of your facility."
            lead="From daily housekeeping to 24/7 technical support, delivered by trained teams with a named supervisor."
            link={{ to: "/services", label: "View all services" }}
          />
        )}
        {directory ? <DirectoryCards items={services} /> : <BentoServices />}
        {directory && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-extrabold md:text-3xl">Additional services</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {secondary.map(({ slug, name, text }) => (
                <Link
                  key={slug}
                  to="/$page"
                  params={{ page: slug }}
                  className="card-lift group flex gap-4 p-5 md:p-6"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold">{name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-deep-aqua transition-transform group-hover:rotate-45"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function Industries({ directory = false }: { directory?: boolean }) {
  return (
    <section id="industries" className="px-2 sm:px-3">
      <div className="glow-backdrop mx-auto max-w-[110rem] rounded-[1.75rem] border py-16 sm:rounded-[2.25rem] md:py-24">
        <div className="site-wrap">
          {directory ? (
            <SectionHeader
              tag="Industries"
              title="Explore your sector."
              lead="Programmes shaped around the hygiene, safety and uptime standards of each type of site."
            />
          ) : (
            <SectionHeader
              tag="Who we serve"
              title="Built for the way your site runs."
              lead="Offices, factories and hospitals each need different standards, schedules and skills. We plan for yours."
              link={{ to: "/industries", label: "View all industries" }}
            />
          )}
          <DirectoryCards items={directory ? industries : featuredIndustries} />
        </div>
      </div>
    </section>
  );
}

export function WhyECFS() {
  return (
    <section id="why-ecfs" className="px-2 py-16 sm:px-3 md:py-24">
      <div className="brand-panel relative mx-auto max-w-[110rem] overflow-hidden rounded-[1.75rem] py-16 text-on-ink sm:rounded-[2.25rem] md:py-24">
        <div
          aria-hidden="true"
          className="drift pointer-events-none absolute -top-40 -left-32 size-[30rem] rounded-full bg-aqua-hot/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="drift-slow pointer-events-none absolute -right-40 -bottom-40 size-[34rem] rounded-full bg-aqua/30 blur-3xl"
        />
        <div className="site-wrap relative grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div className="reveal" data-reveal="left">
            <SectionTag tone="dark">Why ECFS</SectionTag>
            <h2 className="section-title">One partner. Clear accountability.</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-on-ink/75">
              Your premises, your hygiene standards and your staff compliance, managed as one
              operation with a single point of contact.
            </p>
            <div className="relative mt-8 overflow-hidden rounded-3xl">
              <img
                src={photos.supervision.url}
                alt={photos.supervision.alt}
                width={826}
                height={460}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-on-ink/15 bg-ink/75 p-3.5 backdrop-blur-md">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-aqua-hot">
                  <BadgeCheck size={20} aria-hidden="true" />
                </span>
                <p className="text-sm leading-snug">
                  <strong className="block">Named site supervisor</strong>
                  <span className="text-on-ink/75">Daily checklists and monthly reviews</span>
                </p>
              </div>
            </div>
            <Link to="/about" className="btn-pill btn-light mt-8">
              About ECFS <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid content-start gap-3 sm:grid-cols-2 sm:gap-4">
            {differentiators.map(([Icon, title, text]) => (
              <div
                className="glass reveal rounded-2xl p-5 transition-colors hover:bg-on-ink/15"
                key={title}
              >
                <span className="mb-4 grid size-11 place-items-center rounded-xl bg-on-ink/12 text-accent-on-ink">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-on-ink/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="py-16 md:py-24">
      <div className="site-wrap">
        <div className="reveal mb-12 max-w-2xl">
          <SectionTag>How we work</SectionTag>
          <h2 className="section-title">From assessment to audit, in five steps.</h2>
        </div>
        <ol className="reveal-watch relative grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <span
            aria-hidden="true"
            className="draw-line absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-aqua/0 via-aqua/40 to-aqua/0 xl:block"
          />
          {process.map(([name, text], i) => (
            <li key={name} className="card-lift reveal relative p-6">
              <span className="relative mb-5 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-aqua to-aqua-hot font-display text-lg font-extrabold text-on-ink shadow-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ManagingDirector() {
  const md = managingDirector;
  return (
    <section id="managing-director" className="py-16 md:py-24">
      <div className="site-wrap">
        <div className="card-lift reveal grid overflow-hidden md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <figure className="relative m-0 aspect-[4/5] md:aspect-auto md:min-h-full">
            <img
              src={portraits.managingDirector.url}
              alt={portraits.managingDirector.alt}
              width={720}
              height={900}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-top"
            />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-ink/75 px-4 py-3 text-on-ink backdrop-blur-md">
              <span className="block font-display text-lg font-bold">{md.name}</span>
              <span className="block text-xs font-bold tracking-wide text-on-ink/75 uppercase">
                {md.role}, {company.legal}
              </span>
            </figcaption>
          </figure>
          <div className="p-7 md:p-10 lg:p-12">
            <SectionTag>Leadership</SectionTag>
            <h2 className="section-title">{md.heading}</h2>
            <div className="mt-6 grid gap-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {md.bio.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {md.pillars.map(([title, text]) => (
                <li key={title} className="rounded-2xl bg-secondary/70 p-4">
                  <span className="block font-display font-bold text-deep-aqua">{title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Proof() {
  return (
    <section id="proof" className="py-16 md:py-24">
      <div className="site-wrap">
        <SectionTag>Company &amp; compliance</SectionTag>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card-lift reveal p-7 md:p-9">
            <h2 className="section-title">Compliance on every deployment.</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              Incorporated under the Companies Act, 2013. Led by Managing Director Mr. Prafulla
              Behera.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-secondary px-3.5 py-2">CIN {company.cin}</span>
              <span className="rounded-full bg-secondary px-3.5 py-2">GST {company.gst}</span>
            </div>
          </div>
          <div className="card-lift reveal p-7 md:p-9">
            <ul className="grid gap-3">
              {[
                "Registered for PF and ESIC",
                "Staff background verification and training",
                "Bonded and insured operations",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-secondary/70 p-3.5 text-sm font-bold"
                >
                  <span className="icon-chip size-9 rounded-xl bg-card">
                    <ShieldCheck size={18} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Mission:</strong> Deliver lasting value through
              quality service. <strong className="text-foreground">Vision:</strong> Set the regional
              standard for integrated facility management.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-bold text-deep-aqua">
              <BadgeCheck size={18} aria-hidden="true" /> Service · Quality · Value
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ({ directory = false }: { directory?: boolean }) {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="site-wrap grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div className="reveal lg:sticky lg:top-28 lg:self-start" data-reveal="left">
          <SectionTag>Common questions</SectionTag>
          <h2 className="section-title">
            {directory ? "All questions, answered." : "Facility management FAQs."}
          </h2>
          <div className="mt-8 rounded-3xl border bg-secondary/60 p-6">
            <span className="icon-chip mb-4 bg-card">
              <MessageCircleQuestion size={20} aria-hidden="true" />
            </span>
            <p className="font-bold">Still have a question?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Talk to our team. We usually answer the same working day.
            </p>
            <a href={`tel:${company.tel}`} className="btn-pill btn-primary mt-5">
              <Phone size={16} aria-hidden="true" /> {company.phone}
            </a>
          </div>
        </div>
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
              <p className="px-5 pb-5 pr-10 text-sm leading-relaxed text-muted-foreground md:px-6 md:text-[.95rem]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
