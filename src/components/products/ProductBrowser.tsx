"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { EnquiryButton } from "./EnquiryButton";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductBrowser({ items, cats }: { items: Product[]; cats: { slug: string; name: string }[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((p) => (cat === "all" || p.categorySlug === cat) && (!t || `${p.name} ${p.categoryName}`.toLowerCase().includes(t)));
  }, [items, q, cat]);
  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-navy/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div role="search" className="relative w-full max-w-md">
          <label htmlFor="psearch" className="eyebrow mb-1 block text-[11px] text-ink/60">Search products</label>
          <Search className="pointer-events-none absolute bottom-3.5 left-0 size-5 text-navy/50" aria-hidden />
          <input id="psearch" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. spiral slide, bench, gym" className="w-full border-0 border-b-2 border-navy/20 bg-transparent py-3 pl-8 text-base placeholder:text-ink/40 focus:border-orange focus:outline-none" />
        </div>
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {[{ slug: "all", name: "All" }, ...cats].map((c) => (
            <button key={c.slug} aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)} className={cn("h-10 rounded-[3px] border px-3.5 font-display text-sm font-semibold transition", cat === c.slug ? "border-navy bg-navy text-white" : "border-navy/20 text-navy hover:border-navy")}>{c.name}</button>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-ink/60" aria-live="polite">{list.length} product{list.length === 1 ? "" : "s"}</p>
      {list.length ? (
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <li key={`${p.categorySlug}/${p.id}`}><ProductCard p={p} /></li>)}
        </ul>
      ) : (
        <div className="py-24 text-center"><p className="text-xl font-semibold text-navy">No products match &ldquo;{q}&rdquo;.</p><p className="mt-2 text-ink/60">Can&apos;t find what you need? We can quote for custom requirements.</p><EnquiryButton className="mt-6" product={q || undefined}>Ask our team</EnquiryButton></div>
      )}
    </div>
  );
}
