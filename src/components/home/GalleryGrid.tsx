"use client";
import { useMemo, useState } from "react";
import { Expand } from "lucide-react";
import { Photo } from "@/components/common/Photo";
import { Lightbox } from "@/components/common/Lightbox";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/data/products";

export function GalleryGrid({ images, filterable, limit }: { images: GalleryImage[]; filterable?: boolean; limit?: number }) {
  const [cat, setCat] = useState("all");
  const [idx, setIdx] = useState<number | null>(null);
  const cats = useMemo(() => { const m = new Map<string, string>(); images.forEach((i) => m.set(i.category, i.categoryName)); return [...m]; }, [images]);
  const list = useMemo(() => { const f = cat === "all" ? images : images.filter((i) => i.category === cat); return limit ? f.slice(0, limit) : f; }, [images, cat, limit]);
  return (
    <div>
      {filterable && (
        <div role="group" aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2">
          {[["all", "All"], ...cats].map(([k, label]) => (
            <button key={k} aria-pressed={cat === k} onClick={() => setCat(k)} className={cn("h-10 rounded-[3px] border px-4 font-display text-sm font-semibold transition", cat === k ? "border-navy bg-navy text-white" : "border-navy/20 text-navy hover:border-navy")}>{label}</button>
          ))}
        </div>
      )}
      <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {list.map((im, n) => (
          <li key={im.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button onClick={() => setIdx(n)} aria-label={`Open image: ${im.alt}`} className="group relative block w-full overflow-hidden rounded-[3px] bg-sand">
              <Photo src={im.src} alt={im.alt} width={im.w ?? 600} height={im.h ?? 500} sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span aria-hidden className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-left text-xs font-semibold text-white opacity-0 transition-all duration-500 group-hover:opacity-100 sm:text-sm"><span>{im.alt.split(" — ")[0]}</span><Expand className="size-4 shrink-0" /></span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={list.map((i) => ({ src: i.src, alt: i.alt }))} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </div>
  );
}
