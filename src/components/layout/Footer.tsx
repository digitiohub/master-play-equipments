import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Shape } from "@/components/common/Shapes";
import { categories } from "@/data/categories";
import { site, waLink } from "@/lib/site";

const quick = [["Home", "/"], ["About Us", "/about"], ["All Products", "/products"], ["Our Projects", "/gallery"], ["Our Clients", "/clients"], ["Contact", "/contact"]];

export function Footer() {
  const h = "eyebrow mb-5 text-lime";
  const a = "text-white/70 transition hover:text-orange";
  return (
    <footer className="relative overflow-hidden bg-navy-deep pb-24 pt-20 text-white md:pb-10">
      <Shape kind="quarter" className="-right-16 -top-16 size-64 text-navy" />
      <Shape kind="ring" className="-bottom-24 left-1/3 size-72 text-navy/70" />
      <div className="wrap relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm leading-relaxed text-white/70">Manufacturers of playground and outdoor fitness equipment in Mumbai since {site.founded} — supplying schools, housing societies, developers and institutions across India.</p>
            <p className="mt-6 font-display text-xl font-semibold text-orange">We Create Fun n Thrill</p>
          </div>
          <div><h2 className={h}>Products</h2><ul className="grid gap-2.5 text-[15px]">{categories.map((c) => <li key={c.slug}><Link className={a} href={`/products/${c.slug}`}>{c.name}</Link></li>)}</ul></div>
          <div><h2 className={h}>Quick links</h2><ul className="grid gap-2.5 text-[15px]">{quick.map(([l, href]) => <li key={href}><Link className={a} href={href}>{l}</Link></li>)}</ul></div>
          <div>
            <h2 className={h}>Contact</h2>
            <ul className="grid gap-4 text-[15px] text-white/75">
              <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />{site.address}</li>
              <li><a className="flex items-center gap-3 hover:text-orange" href={site.phoneHref}><Phone className="size-4 text-orange" aria-hidden />{site.phone}</a></li>
              <li><a className="flex items-center gap-3 break-all hover:text-orange" href={`mailto:${site.email}`}><Mail className="size-4 shrink-0 text-orange" aria-hidden />{site.email}</a></li>
              <li><a className="flex items-center gap-3 hover:text-orange" href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4 text-orange" aria-hidden />Chat on WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Master Play Equipments. All rights reserved.</p>
          <p>Borivli (W), Mumbai · Serving customers across India</p>
        </div>
      </div>
    </footer>
  );
}
