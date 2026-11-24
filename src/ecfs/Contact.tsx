import { useState, type FormEvent } from "react";
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, secondary, services } from "./content";
import { enquiryUrl } from "./enquiry";
const mapQuery = encodeURIComponent(company.head);
const whatsapp = `https://wa.me/${company.tel.slice(1)}`;

const channels = [
  { icon: Phone, label: "Call us", value: company.phone, href: `tel:${company.tel}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: whatsapp,
    external: true,
  },
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: Phone, label: "Customer care", value: company.care, href: "tel:+917948010848" },
];

export function Contact() {
  const [next, setNext] = useState("");
  const [map, setMap] = useState(false);
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // `required` treats spaces as a value; clear whitespace-only fields so the browser flags them.
    let blank = false;
    for (const field of form.querySelectorAll<HTMLInputElement>("input[required]")) {
      if (field.value.trim()) continue;
      field.value = "";
      blank = true;
    }
    if (blank) {
      form.reportValidity();
      return;
    }
    setNext(enquiryUrl(new FormData(form)));
  }
  return (
    <section id="contact" className="py-14 md:py-20">
      <div className="site-wrap">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
          <div>
            <p className="eyebrow mb-5">
              <span className="size-1.5 rounded-full bg-aqua" aria-hidden="true" /> Get in touch
            </p>
            <h2 className="section-title">Speak with ECFS.</h2>
            <p className="section-lead mt-4 max-w-md">
              Our team can help you scope housekeeping, maintenance or staffing for your site.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {channels.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="card-lift reveal group flex items-center gap-3.5 p-4"
                >
                  <span className="icon-chip transition-colors group-hover:bg-aqua group-hover:text-on-ink">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-muted-foreground">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-bold">{value}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-3.5 rounded-[1.25rem] border bg-secondary/60 p-4">
              <span className="icon-chip bg-card">
                <Clock3 size={19} aria-hidden="true" />
              </span>
              <p className="text-sm">
                <span className="block font-bold">{company.hours}</span>
                <span className="text-muted-foreground">24/7 response for contracted clients</span>
              </p>
            </div>
          </div>
          <form
            onSubmit={prepare}
            onChange={() => setNext("")}
            data-reveal="right"
            className="reveal grid gap-5 rounded-[1.75rem] border bg-card p-6 shadow-lift sm:p-9"
          >
            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">Request a callback</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Takes under a minute. We’ll reply on WhatsApp.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Your full name"
                  className="form-field"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Phone
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={24}
                  pattern="[+0-9\(\) .\-]{7,24}"
                  placeholder="+91"
                  className="form-field"
                />
              </label>
              <label className="grid min-w-0 gap-2 text-sm font-semibold">
                Service
                <select
                  aria-label="Service"
                  name="service"
                  required
                  defaultValue=""
                  className="form-field"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {[...services, ...secondary].map((s) => (
                    <option key={s.slug}>{s.name}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                City
                <input
                  name="city"
                  autoComplete="address-level2"
                  required
                  maxLength={80}
                  placeholder="e.g. Ahmedabad"
                  className="form-field"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold">
              Message
              <textarea
                className="form-field min-h-28 resize-y"
                name="message"
                maxLength={1200}
                placeholder="Tell us what your site needs"
              />
            </label>
            <button className="btn-pill btn-primary w-full sm:w-fit" type="submit">
              Prepare enquiry <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            {next && (
              <div role="status" className="rounded-2xl bg-secondary p-4">
                <p className="mb-3 text-sm text-muted-foreground">
                  Your message is ready. Open WhatsApp to send it to ECFS.
                </p>
                <a href={next} target="_blank" rel="noreferrer" className="btn-pill btn-primary">
                  <MessageCircle size={16} aria-hidden="true" /> Send in WhatsApp
                </a>
              </div>
            )}
          </form>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Ahmedabad head office", company.head],
              ["Bhubaneswar regional office", company.regional],
            ].map(([title, address]) => (
              <address
                key={title}
                className="card-lift reveal p-6 text-sm leading-relaxed not-italic"
              >
                <span className="icon-chip mb-4">
                  <MapPin size={19} aria-hidden="true" />
                </span>
                <h3 className="mb-1.5 text-base font-bold">{title}</h3>
                <span className="text-muted-foreground">{address}</span>
              </address>
            ))}
          </div>
          {map ? (
            <iframe
              title="Google Map of ECFS Ahmedabad head office"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
              className="min-h-56 w-full rounded-[1.25rem] border"
            />
          ) : (
            <div className="glow-backdrop grid min-h-56 place-items-center rounded-[1.25rem] border">
              <button type="button" className="btn-pill btn-outline" onClick={() => setMap(true)}>
                <MapPin size={16} aria-hidden="true" /> Show Ahmedabad office map
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
