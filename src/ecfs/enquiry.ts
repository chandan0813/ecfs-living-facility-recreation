import { company } from "./content";

export function enquiryUrl(fields: FormData) {
  const values = ["name", "phone", "service", "city", "message"].map((key) =>
    String(fields.get(key) ?? "").trim(),
  );
  const [name, phone, service, city, message] = values;
  const body = `Hello ECFS, I’d like to request a free facility assessment and callback.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nCity: ${city}\nMessage: ${message || "—"}`;
  return `https://wa.me/${company.tel.slice(1)}?text=${encodeURIComponent(body)}`;
}
