"use client";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Shape } from "@/components/common/Shapes";
import { SplitHeading } from "@/components/common/Reveal";
import { Magnetic } from "@/components/common/Magnetic";
import { Button } from "@/components/ui/button";
import { EnquiryButton } from "@/components/products/EnquiryButton";
import { site } from "@/lib/site";

const slides = [
  { src: "/images/MRP-50.jpg", cap: "Multi Play System-50" },
  { src: "/images/MPS26.jpg", cap: "Multi Play System-26" },
  { src: "/images/MPS-27.jpg", cap: "Multi Play System-27" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearTimeout(t);
  }, [i, reduce]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-deep text-white">
      <motion.div style={{ y }} className="absolute inset-0 -z-20 scale-110">
        <AnimatePresence initial={false}>
          <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }}>
            <motion.div className="absolute inset-0" initial={{ scale: reduce ? 1 : 1.12 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "linear" }}>
              <Image src={slides[i].src} alt={`${slides[i].cap} — playground installed by Master Play Equipments`} fill priority={i === 0} sizes="100vw" quality={85} className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/95 via-navy/70 to-navy/10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy-deep/90 to-transparent" />

      <Shape kind="arch" float className="right-[8%] top-[22%] hidden size-24 text-orange lg:block" />
      <Shape kind="circle" float className="right-[22%] top-[36%] hidden size-10 text-lime lg:block" />
      <Shape kind="tri" float className="right-[4%] top-[50%] hidden size-14 text-white/90 lg:block" />

      <div className="wrap relative flex flex-1 flex-col justify-end pb-20 pt-40 sm:pb-24 md:pt-48">
        <SplitHeading as="h1" immediate delay={0.3} accent="Possibilities" className="max-w-[16ch] text-[clamp(2.5rem,6.6vw,6rem)] font-bold leading-[.95] tracking-tight sm:max-w-[18ch]" text="Where Every Playground Becomes a World of Possibilities." />
        <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Discover thoughtfully manufactured playground and outdoor fitness equipment designed to bring communities, schools and recreational spaces to life.
        </motion.p>
        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.8 }} className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic><Button href="/products" size="lg" arrow>Explore Our Products</Button></Magnetic>
          <EnquiryButton size="lg" variant="outline" className="text-white">Request a Quote</EnquiryButton>
        </motion.div>
      </div>

      {/* experience badge */}
      <motion.div initial={reduce ? false : { opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, duration: 0.9 }} className="absolute bottom-24 right-6 hidden md:block lg:right-14">
        <div className="relative grid size-40 place-items-center rounded-full bg-orange text-navy-deep">
          <svg viewBox="0 0 160 160" className="absolute inset-0 motion-safe:animate-[spin_28s_linear_infinite]" aria-hidden>
            <defs><path id="c" d="M80 80m-62 0a62 62 0 1 1 124 0a62 62 0 1 1-124 0" /></defs>
            <text className="fill-navy-deep font-display text-[11px] font-bold uppercase tracking-[.28em]"><textPath href="#c">Years of experience · Since {site.founded} · </textPath></text>
          </svg>
          <p className="font-display text-5xl font-bold leading-none">{site.years}<span className="text-3xl">+</span></p>
        </div>
      </motion.div>

      {/* slide indicator + scroll cue */}
      <div className="wrap absolute inset-x-0 bottom-6 flex items-end justify-between">
        <div className="flex items-center gap-3 text-xs text-white/70" aria-hidden>
          <span className="relative block h-10 w-px overflow-hidden bg-white/25"><span className="absolute inset-x-0 h-1/2 bg-orange motion-safe:animate-[scroll-cue_1.8s_ease-in-out_infinite]" /></span>
          <span className="eyebrow">Scroll</span>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-white/70 sm:block" aria-live="polite">{slides[i].cap}</p>
          <div className="flex gap-2" role="group" aria-label="Hero slides">
            {slides.map((s, n) => <button key={s.src} aria-label={`Show slide ${n + 1}`} aria-current={n === i} onClick={() => setI(n)} className="grid h-6 w-8 items-center"><span className={`block h-[3px] w-full transition-colors ${n === i ? "bg-orange" : "bg-white/40"}`} /></button>)}
          </div>
        </div>
      </div>
    </section>
  );
}
