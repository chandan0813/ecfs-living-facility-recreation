import { Quote } from "lucide-react";
import { SectionTag } from "./Sections";
import { clientLogos, testimonials } from "./testimonials.ts";

export function ClientLogoMarquee() {
  if (clientLogos.length === 0) return null;
  const loop = [...clientLogos, ...clientLogos];
  return (
    <section aria-label="Our clients" className="py-10 md:py-14">
      <p className="reveal mb-7 text-center text-sm font-semibold text-muted-foreground">
        Trusted by facility teams across offices, plants and hospitals
      </p>
      <div className="logo-marquee overflow-hidden">
        <ul className="logo-marquee-track flex w-max items-center gap-14 pr-14">
          {loop.map((logo, i) => (
            <li
              key={`${logo.name}-${i}`}
              aria-hidden={i >= clientLogos.length}
              className="shrink-0"
            >
              {logo.image ? (
                <img
                  src={logo.image}
                  alt={logo.alt ?? `${logo.name} logo`}
                  width={160}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-9 w-auto object-contain opacity-55 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="font-display text-lg font-bold whitespace-nowrap text-muted-foreground">
                  {logo.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function initials(text: string) {
  return text
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonials" className="pb-16 md:pb-24">
      <div className="site-wrap">
        <div className="reveal mb-10 max-w-2xl md:mb-12">
          <SectionTag>Client feedback</SectionTag>
          <h2 className="section-title">What our clients say.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={`${t.name}-${t.company}`}
              data-tilt
              className={`reveal relative flex flex-col rounded-3xl p-7 ${
                i === 1 ? "brand-panel text-on-ink shadow-lift" : "card-lift"
              }`}
            >
              <span
                className={`grid size-11 place-items-center rounded-xl ${i === 1 ? "bg-on-ink/15" : "icon-chip"}`}
              >
                <Quote size={20} aria-hidden="true" />
              </span>
              <blockquote
                className={`mt-6 flex-1 text-base leading-relaxed font-medium ${i === 1 ? "text-on-ink/90" : "text-foreground/85"}`}
              >
                “{t.quote}”
              </blockquote>
              <figcaption
                className={`mt-7 flex items-center gap-3 border-t pt-5 ${i === 1 ? "border-on-ink/15" : ""}`}
              >
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold ${i === 1 ? "bg-on-ink text-ink" : "bg-gradient-to-br from-aqua to-aqua-hot text-on-ink"}`}
                  aria-hidden="true"
                >
                  {initials(t.role)}
                </span>
                <span>
                  <span className="block font-bold">{t.name}</span>
                  <span
                    className={`text-xs ${i === 1 ? "text-on-ink/70" : "text-muted-foreground"}`}
                  >
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
