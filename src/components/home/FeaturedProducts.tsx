"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Photo } from "@/components/common/Photo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/products/EnquiryProvider";
import type { Product } from "@/data/products";

function Card({ p, cls }: { p: Product; cls: string }) {
  const { open } = useEnquiry();
  return (
    <li className={`group shrink-0 ${cls}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-navy-deep">
        <Photo src={`/images/${p.image}`} alt={`${p.name} — ${p.categoryName}`} fill sizes="(min-width:640px) 352px, 78vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Button size="sm" className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100" onClick={() => open(p.name)}>Quick enquiry</Button>
      </div>
      <p className="eyebrow mt-5 text-lime">{p.categoryName}</p>
      <h3 className="mt-2 text-xl font-semibold leading-snug">{p.name}</h3>
      <p className="mt-1 text-sm text-white/60">{p.specs.filter(([k]) => /age|capacity/i.test(k)).map(([k, v]) => `${k}: ${v}`).join(" · ") || "Request a quotation"}</p>
      <button onClick={() => open(p.name)} className="mt-4 inline-flex items-center gap-2 font-display text-[15px] font-semibold text-orange transition hover:gap-3">Enquire now <ArrowRight className="size-4" aria-hidden /></button>
    </li>
  );
}

const heading = <SectionHeading light eyebrow="Featured products" title="Built to be played on." accent="played" text="A selection from our catalogue, photographed on real sites. Every product is quoted to your space." />;

export function FeaturedProducts({ items }: { items: Product[] }) {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width:1024px)");
    const f = () => setWide(m.matches); f(); m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return wide && !reduce ? <Pinned items={items} /> : <Swipe items={items} />;
}

// Desktop: section is taller than the viewport; the title stays pinned while page scroll drives the cards sideways.
function Pinned({ items }: { items: Product[] }) {
  const outer = useRef<HTMLElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [dist, setDist] = useState(0);
  const measure = useCallback(() => { if (view.current && track.current) setDist(Math.max(0, track.current.scrollWidth - view.current.clientWidth)); }, []);
  useEffect(() => { measure(); window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure); }, [measure]);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  return (
    <section ref={outer} aria-label="Featured products" className="bg-navy text-white" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-[72px]">
        <div className="relative z-10 w-[min(32rem,38vw)] shrink-0 self-stretch bg-navy py-12 pl-[max(3rem,calc((100vw-1360px)/2+3rem))] pr-8">
          <div className="flex h-full flex-col justify-center">
            {heading}
            <div className="mt-10 flex items-center gap-5">
              <div aria-hidden className="h-px flex-1 bg-white/20"><motion.div className="h-full origin-left bg-orange" style={{ scaleX: scrollYProgress }} /></div>
              <Button href="/products" variant="outline" size="sm" arrow className="text-white">Full catalogue</Button>
            </div>
          </div>
        </div>
        <div ref={view} className="min-w-0 flex-1 self-center overflow-hidden">
          <motion.ul ref={track} style={{ x }} className="flex w-max gap-6 pr-[max(3rem,calc((100vw-1360px)/2+3rem))]">
            {items.map((p) => <Card key={p.id} p={p} cls="w-[19rem] xl:w-[21rem]" />)}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

// Mobile / reduced motion: native swipe carousel with arrow controls.
function Swipe({ items }: { items: Product[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ p: 0, start: true, end: false });
  const update = useCallback(() => {
    const el = track.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPos({ p: max > 0 ? el.scrollLeft / max : 0, start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
  }, []);
  useEffect(() => { update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update); }, [update]);
  const move = (d: number) => { const el = track.current!; el.scrollBy({ left: d * (el.querySelector("li")!.clientWidth + 24), behavior: "smooth" }); };
  const ctl = "grid size-12 place-items-center rounded-full border border-white/30 text-white transition hover:bg-orange hover:text-navy-deep hover:border-orange disabled:opacity-30 disabled:pointer-events-none";
  return (
    <section aria-label="Featured products" className="bg-navy py-24 text-white sm:py-32">
      <div className="wrap flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        {heading}
        <div className="flex gap-3"><button aria-label="Previous products" className={ctl} disabled={pos.start} onClick={() => move(-1)}><ArrowLeft className="size-5" /></button><button aria-label="Next products" className={ctl} disabled={pos.end} onClick={() => move(1)}><ArrowRight className="size-5" /></button></div>
      </div>
      <ul ref={track} onScroll={update} tabIndex={0} className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((p) => <Card key={p.id} p={p} cls="w-[78vw] snap-start sm:w-[22rem]" />)}
      </ul>
      <div className="wrap mt-10 flex items-center gap-6">
        <div aria-hidden className="h-px flex-1 bg-white/20"><div className="h-full origin-left bg-orange transition-transform" style={{ transform: `scaleX(${Math.max(0.08, pos.p)})` }} /></div>
        <Button href="/products" variant="outline" size="sm" arrow className="text-white">Browse full catalogue</Button>
      </div>
    </section>
  );
}
