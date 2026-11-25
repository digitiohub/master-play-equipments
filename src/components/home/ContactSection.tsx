import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { EnquiryForm } from "@/components/products/EnquiryForm";
import { site, waLink } from "@/lib/site";

export function ContactSection({ bare }: { bare?: boolean }) {
  const row = "group flex items-start gap-4 border-t border-navy/15 py-5 transition-colors hover:text-orange-ink";
  const ico = "mt-1 size-5 shrink-0 text-orange-ink";
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="wrap grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {!bare && <SectionHeading eyebrow="Contact & enquiry" title="Tell us about your space." accent="space." text="Share a few details and we'll come back with the right equipment and a quotation." />}
          <Reveal className={bare ? "" : "mt-10"}>
            <address className="not-italic">
              <p className={row}><MapPin className={ico} aria-hidden /><span><span className="eyebrow block text-[11px] text-ink/50">Address</span>{site.address}</span></p>
              <a className={row} href={site.phoneHref}><Phone className={ico} aria-hidden /><span><span className="eyebrow block text-[11px] text-ink/50">Phone</span>{site.phone}</span></a>
              <a className={row} href={`mailto:${site.email}`}><Mail className={ico} aria-hidden /><span><span className="eyebrow block text-[11px] text-ink/50">Email</span><span className="break-all">{site.email}</span></span></a>
              <a className={`${row} border-b`} href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle className={ico} aria-hidden /><span><span className="eyebrow block text-[11px] text-ink/50">WhatsApp</span>Chat with our team</span></a>
            </address>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative rounded-[3px] bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,43,69,.35)] sm:p-10">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-orange via-lime to-navy" />
            <h3 className="mb-8 text-2xl font-semibold text-navy">Request a quotation</h3>
            <EnquiryForm source="contact-page" />
          </div>
        </Reveal>
      </div>
      <div className="wrap mt-20">
        <div className="relative h-[22rem] overflow-hidden rounded-[3px] bg-sand sm:h-[26rem]">
          <iframe title="Master Play Equipments on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0 grayscale transition hover:grayscale-0"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&t=m&z=15&output=embed&iwloc=near`} />
        </div>
      </div>
    </section>
  );
}
