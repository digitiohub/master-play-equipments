"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Photo } from "@/components/common/Photo";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { site, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useEnquiry } from "@/components/products/EnquiryProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products", mega: true },
  { href: "/gallery", label: "Our Projects" },
  { href: "/clients", label: "Our Clients" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const path = usePathname();
  const { open } = useEnquiry();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);
  const [acc, setAcc] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { setMega(false); setMenu(false); }, [path]);
  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); setMenu(false); } };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.documentElement.style.overflow = ""; };
  }, [menu]);

  const solid = scrolled || mega;
  const isActive = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  const hover = (v: boolean) => { clearTimeout(timer.current); timer.current = setTimeout(() => setMega(v), v ? 60 : 160); };

  return (
    <header className="fixed inset-x-0 top-0 z-[65]" onMouseLeave={() => hover(false)}>
      {/* announcement / contact strip */}
      <div className={cn("hidden overflow-hidden bg-navy-deep text-[13px] text-white/80 transition-[max-height,opacity] duration-300 md:block", scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100")}>
        <div className="wrap flex h-10 items-center justify-between">
          <p className="flex items-center gap-2"><span aria-hidden className="size-1.5 rounded-full bg-lime" />Manufacturing playground equipment in Mumbai since {site.founded}</p>
          <div className="flex items-center gap-6">
            <a href={site.phoneHref} className="flex items-center gap-2 transition hover:text-orange"><Phone className="size-3.5" aria-hidden />{site.phone}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition hover:text-orange"><Mail className="size-3.5" aria-hidden />{site.email}</a>
          </div>
        </div>
      </div>

      <div className={cn("transition-[background-color,box-shadow,backdrop-filter] duration-500", solid ? "bg-paper/95 text-navy shadow-[0_1px_0_rgba(20,43,69,.1)] backdrop-blur-md" : "bg-transparent text-white")}>
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <Logo light={!solid} />
          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <div key={l.href} className="relative" onMouseEnter={() => l.mega && hover(true)}>
                {l.mega ? (
                  <div className="flex items-center gap-1">
                    <Link href={l.href} className="navlink relative py-2 text-[15px] font-medium">{l.label}<Underline on={isActive(l.href)} /></Link>
                    <button aria-label="Toggle products menu" aria-expanded={mega} aria-controls="mega" onClick={() => setMega((v) => !v)} className="grid size-6 place-items-center"><ChevronDown className={cn("size-4 transition-transform", mega && "rotate-180")} aria-hidden /></button>
                  </div>
                ) : (
                  <Link href={l.href} className="navlink relative py-2 text-[15px] font-medium" onMouseEnter={() => hover(false)}>{l.label}<Underline on={isActive(l.href)} /></Link>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden h-11 sm:inline-flex" arrow onClick={() => open()}>Get a Quote</Button>
            <button aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu((v) => !v)} className="grid size-11 place-items-center lg:hidden">
              <Menu className="size-7" aria-hidden />
            </button>
          </div>
        </div>

        {/* mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div id="mega" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} onMouseEnter={() => hover(true)}
              className="absolute inset-x-0 top-full hidden border-t border-navy/10 bg-paper text-navy shadow-2xl lg:block">
              <div className="wrap grid grid-cols-[18rem_1fr] gap-12 py-10">
                <div className="flex flex-col justify-between border-r border-navy/10 pr-10">
                  <div>
                    <p className="eyebrow text-orange-ink">Our range</p>
                    <p className="mt-3 text-2xl font-semibold leading-tight">Complete play &amp; outdoor fitness solutions.</p>
                  </div>
                  <Link href="/products" className="mt-8 inline-flex items-center gap-2 font-display font-semibold hover:text-orange-ink">View all products <ArrowRight className="size-4" aria-hidden /></Link>
                </div>
                <ul className="grid grid-cols-3 gap-x-8 gap-y-1">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/products/${c.slug}`} className="group flex items-center gap-4 rounded-[3px] p-2 transition hover:bg-white">
                        <span className="relative size-14 shrink-0 overflow-hidden rounded-[3px] bg-sand"><Photo src={`/images/${c.cover}`} alt="" fill sizes="56px" className={cn("object-cover transition-transform duration-500 group-hover:scale-110", c.slug === "frp-dustbins" && "object-contain p-1")} /></span>
                        <span className="font-display text-[15px] font-semibold leading-tight">{c.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* mobile full-screen panel */}
      <AnimatePresence>
        {menu && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[66] flex flex-col overflow-y-auto bg-navy text-white lg:hidden">
            <div className="wrap flex h-[72px] shrink-0 items-center justify-between"><Logo light /><button aria-label="Close menu" onClick={() => setMenu(false)} className="grid size-11 place-items-center"><X className="size-7" aria-hidden /></button></div>
            <nav aria-label="Mobile" className="wrap flex-1 py-6">
              <ul>
                {links.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }} className="border-b border-white/10">
                    {l.mega ? (
                      <>
                        <div className="flex items-center justify-between">
                          <Link href={l.href} className="py-4 font-display text-3xl font-semibold">{l.label}</Link>
                          <button aria-label="Show product categories" aria-expanded={acc} onClick={() => setAcc((v) => !v)} className="grid size-11 place-items-center"><ChevronDown className={cn("size-6 transition-transform", acc && "rotate-180")} aria-hidden /></button>
                        </div>
                        <AnimatePresence initial={false}>
                          {acc && (
                            <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="grid grid-cols-2 gap-x-4 overflow-hidden pb-4">
                              {categories.map((c) => <li key={c.slug}><Link href={`/products/${c.slug}`} className="block py-2.5 text-[15px] text-white/75 hover:text-orange">{c.name}</Link></li>)}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={l.href} className={cn("block py-4 font-display text-3xl font-semibold", isActive(l.href) && "text-orange")}>{l.label}</Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="wrap grid gap-3 pb-8">
              <Button size="lg" arrow onClick={() => { setMenu(false); open(); }}>Get a Quote</Button>
              <div className="grid grid-cols-2 gap-3">
                <Button size="lg" variant="outline" href={waLink()}><MessageCircle className="size-4" aria-hidden />WhatsApp</Button>
                <Button size="lg" variant="outline" href={site.phoneHref}><Phone className="size-4" aria-hidden />Call</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Underline({ on }: { on: boolean }) {
  return (
    <>
      {on && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-orange" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
      {!on && <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-current opacity-60 transition-transform duration-300 group-hover:scale-x-100 [.navlink:hover_&]:scale-x-100" />}
    </>
  );
}
