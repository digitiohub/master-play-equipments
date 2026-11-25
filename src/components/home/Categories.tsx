import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Photo } from "@/components/common/Photo";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { productsIn } from "@/data/products";
import { cn } from "@/lib/utils";

// Intentionally irregular 12-col rhythm on desktop: 7/5 · 4/4/4(tall) · 8 · 4/4/4 · 8/4
const span: Record<string, string> = {
  "multi-play-systems": "col-span-2 lg:col-span-7 lg:row-span-2",
  slides: "lg:col-span-5", swings: "lg:col-span-5",
  seesaws: "lg:col-span-4", "merry-go-rounds": "lg:col-span-4", climbers: "lg:col-span-4 lg:row-span-2",
  "exercise-games": "col-span-2 lg:col-span-8",
  "kids-zone": "lg:col-span-4", benches: "lg:col-span-4", "frp-dustbins": "lg:col-span-4",
  "outdoor-gym": "col-span-2 lg:col-span-8", "rubber-flooring": "col-span-2 lg:col-span-4",
};

export function Categories() {
  return (
    <section id="categories" className="py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Product range" title="Explore Our World of Play." accent="Play." text="Complete playground and outdoor recreation solutions designed for spaces of every size." />
          <Reveal><Button href="/products" variant="dark" size="lg" arrow>View all products</Button></Reveal>
        </div>
        <ul className="mt-14 grid auto-rows-[230px] grid-cols-2 gap-3 sm:auto-rows-[280px] sm:gap-4 lg:auto-rows-[300px] lg:grid-cols-12">
          {categories.map((c, i) => {
            const alt = productsIn(c.slug).find((p) => p.image !== c.cover)?.image;
            const contain = c.slug === "frp-dustbins";
            return (
              <Reveal as="li" key={c.slug} delay={(i % 3) * 0.08} className={cn("col-span-1", span[c.slug])}>
                <Link href={`/products/${c.slug}`} className="group relative block h-full overflow-hidden rounded-[3px] bg-navy text-white">
                  <Photo src={`/images/${c.cover}`} alt="" fill sizes="(min-width:1024px) 40vw, 50vw" className={cn("transition-transform duration-[900ms] ease-out group-hover:scale-105", contain ? "bg-white object-contain p-6 pb-24" : "object-cover")} />
                  {alt && <Photo src={`/images/${alt}`} alt="" fill sizes="(min-width:1024px) 40vw, 50vw" className={cn("opacity-0 transition-opacity duration-700 group-hover:opacity-100", contain ? "bg-white object-contain p-6 pb-24" : "object-cover")} />}
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent transition-colors duration-500 group-hover:from-navy-deep" />
                  <span className="absolute left-4 top-4 font-display text-sm font-semibold tabular-nums text-white/80 sm:left-6 sm:top-5">{String(i + 1).padStart(2, "0")}</span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
                    <div>
                      <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl lg:text-[1.65rem]">{c.name}</h3>
                      <p className="mt-2 hidden max-w-sm text-sm leading-snug text-white/75 sm:block sm:line-clamp-2">{c.short}</p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-navy transition-all duration-500 group-hover:rotate-45 group-hover:bg-orange sm:size-12">
                      <ArrowUpRight className="size-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" aria-hidden />
                    </span>
                  </div>
                  <span className="sr-only">Explore {c.name}</span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
