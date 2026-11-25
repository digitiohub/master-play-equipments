"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/common/Photo";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "./EnquiryProvider";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({ p, showCategory = true }: { p: Product; showCategory?: boolean }) {
  const { open } = useEnquiry();
  const contain = p.categorySlug === "frp-dustbins";
  const key = p.specs.filter(([k]) => /age|capacity/i.test(k));
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/products/${p.categorySlug}/${p.id}`} className="relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-sand" aria-label={`View ${p.name}`}>
        <Photo src={`/images/${p.image}`} alt={`${p.name} — ${p.categoryName}`} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw" className={cn("transition-transform duration-700 group-hover:scale-105", contain ? "bg-white object-contain p-4" : "object-cover")} />
        <span aria-hidden className="absolute right-3 top-3 grid size-10 translate-y-1 place-items-center rounded-full bg-white text-navy opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight className="size-5" /></span>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        {showCategory && <p className="eyebrow text-[11px] text-orange-ink">{p.categoryName}</p>}
        <h3 className="mt-1.5 text-lg font-semibold leading-snug text-navy"><Link href={`/products/${p.categorySlug}/${p.id}`} className="hover:text-orange-ink">{p.name}</Link></h3>
        {key.length > 0 && <p className="mt-1 text-sm text-ink/60">{key.map(([k, v]) => `${k}: ${v}`).join(" · ")}</p>}
        <Button variant="dark" size="sm" className="mt-4 self-start" onClick={() => open(p.name)}>Enquire now</Button>
      </div>
    </article>
  );
}
