import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Shape } from "@/components/common/Shapes";
import { SplitHeading } from "@/components/common/Reveal";
import { Photo } from "@/components/common/Photo";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {c.href ? <Link href={c.href} className="transition hover:text-orange">{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
            {i < items.length - 1 && <ChevronRight className="size-3.5" aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ title, accent, text, crumbs, image, contain, children }: { title: string; accent?: string; text?: string; crumbs?: Crumb[]; image?: string; contain?: boolean; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <Shape kind="quarter" className="-right-10 -top-10 size-56 text-navy-deep" />
      <Shape kind="circle" float className="bottom-10 right-[44%] hidden size-8 text-lime lg:block" />
      <div className={`wrap relative grid items-center gap-12 pb-16 pt-36 sm:pb-24 sm:pt-44 ${image ? "lg:grid-cols-[1.25fr_1fr]" : ""}`}>
        <div>
          {crumbs && <Breadcrumbs items={crumbs} />}
          <SplitHeading as="h1" immediate accent={accent} className="display-lg max-w-[18ch]" text={title} />
          {text && <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{text}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative mx-auto aspect-[5/4] w-full max-w-md lg:max-w-none">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] bg-orange sm:translate-x-5 sm:translate-y-5" aria-hidden />
            <div className="relative size-full overflow-hidden rounded-t-[999px] bg-white">
              <Photo src={image} alt="" fill priority sizes="(min-width:1024px) 40vw, 90vw" className={contain ? "object-contain p-8" : "object-cover"} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
