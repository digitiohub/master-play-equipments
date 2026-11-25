"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export type LightboxImage = { src: string; alt: string; caption?: string };

export function Lightbox({ images, index, onClose, onIndex }: { images: LightboxImage[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const [dir, setDir] = useState(1);
  const n = images.length;
  const go = useCallback((d: number) => { setDir(d); onIndex(((index ?? 0) + d + n) % n); }, [index, n, onIndex]);
  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [index, go]);
  const cur = index === null ? null : images[index];
  const btn = "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-navy-deep/60 text-white backdrop-blur transition hover:bg-orange hover:text-navy-deep";
  return (
    <Dialog.Root open={index !== null} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay fixed inset-0 z-[90] bg-navy-deep/95" />
        <Dialog.Content aria-describedby={undefined} className="fixed inset-0 z-[91] flex flex-col outline-none">
          <Dialog.Title className="sr-only">{cur?.alt ?? "Image viewer"}</Dialog.Title>
          <div className="flex items-center justify-between px-5 py-4 text-white">
            <p className="eyebrow text-white/60">{index !== null && `${index + 1} / ${n}`}</p>
            <Dialog.Close aria-label="Close image viewer" className="grid size-11 place-items-center rounded-full border border-white/25 transition hover:bg-orange hover:text-navy-deep"><X className="size-5" /></Dialog.Close>
          </div>
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              {cur && (
                <motion.div key={cur.src} custom={dir} className="absolute inset-0 p-4 sm:px-20"
                  initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -60 }} transition={{ duration: 0.35 }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={(_, i) => { if (i.offset.x < -80) go(1); else if (i.offset.x > 80) go(-1); }}>
                  <div className="relative h-full w-full"><Image src={cur.src} alt={cur.alt} fill sizes="100vw" className="select-none object-contain" priority draggable={false} /></div>
                </motion.div>
              )}
            </AnimatePresence>
            {n > 1 && (<>
              <button aria-label="Previous image" onClick={() => go(-1)} className={`${btn} left-3 sm:left-5`}><ChevronLeft className="size-6" /></button>
              <button aria-label="Next image" onClick={() => go(1)} className={`${btn} right-3 sm:right-5`}><ChevronRight className="size-6" /></button>
            </>)}
          </div>
          <p className="px-5 py-4 text-center font-display text-lg text-white">{cur?.caption ?? cur?.alt}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
