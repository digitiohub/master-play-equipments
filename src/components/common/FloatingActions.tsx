"use client";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, MessageCircle, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { site, waLink } from "@/lib/site";
import { useEnquiry } from "@/components/products/EnquiryProvider";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-orange" />;
}

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 700);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="pointer-events-none fixed bottom-[5.25rem] right-4 z-[60] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {show && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
            className="group pointer-events-auto grid size-12 place-items-center rounded-full bg-navy text-white shadow-lg transition hover:bg-orange hover:text-navy-deep">
            <ArrowUp className="size-5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="pointer-events-auto relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105">
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-[pulse-ring_2.4s_ease-out_infinite]" />
        <svg viewBox="0 0 32 32" className="relative size-7" fill="currentColor" aria-hidden><path d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.12.55 4.18 1.6 6L4 29l8.17-1.57a12 12 0 0 0 3.87.64C22.67 28.07 28 22.67 28 16.04 28 9.4 22.67 3 16.04 3zm0 22.04c-1.2 0-2.38-.3-3.42-.87l-.5-.27-4.85.93.97-4.72-.3-.52a9.97 9.97 0 0 1-1.5-5.28c0-5.5 4.48-9.98 9.99-9.98 5.5 0 9.98 4.48 9.98 9.98 0 5.52-4.47 9.98-9.98 9.98zm5.48-7.47c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.2 5.08 4.5.7.3 1.26.48 1.7.62.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35z" /></svg>
      </a>
    </div>
  );
}

// Sticky bottom bar on mobile: Call · WhatsApp · Enquire
export function MobileBar() {
  const { open } = useEnquiry();
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold tracking-wide";
  return (
    <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-[59] flex border-t border-white/10 bg-navy pb-[env(safe-area-inset-bottom)] text-white md:hidden">
      <a href={site.phoneHref} className={item}><Phone className="size-5" aria-hidden />Call</a>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className={`${item} border-x border-white/10`}><MessageCircle className="size-5" aria-hidden />WhatsApp</a>
      <button onClick={() => open()} className={`${item} bg-orange text-navy-deep`}><Send className="size-5" aria-hidden />Enquire</button>
    </nav>
  );
}
