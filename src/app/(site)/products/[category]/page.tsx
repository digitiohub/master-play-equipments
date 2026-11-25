import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { EnquiryButton } from "@/components/products/EnquiryButton";
import { GalleryGrid } from "@/components/home/GalleryGrid";
import { CTA } from "@/components/home/CTA";
import { Photo } from "@/components/common/Photo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { categories, getCategory } from "@/data/categories";
import { galleryImages, productsIn } from "@/data/products";
import { waLink } from "@/lib/site";

type P = { params: Promise<{ category: string }> };
export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return { title: `${c.name} — Manufacturers in Mumbai`, description: `${c.intro} Enquire for a quotation from Master Play Equipments.`, alternates: { canonical: `/products/${c.slug}` }, openGraph: { images: [`/images/${c.cover}`] } };
}

export default async function CategoryPage({ params }: P) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const items = productsIn(c.slug);
  const gallery = galleryImages.filter((g) => g.category === c.slug);
  const related = categories.filter((x) => x.slug !== c.slug).slice(0, 4);
  return (
    <>
      <PageHero title={c.name} text={c.intro} image={`/images/${c.cover}`} contain={c.slug === "frp-dustbins"} crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: c.name }]}>
        <EnquiryButton size="lg" arrow product={c.name}>Request a quote</EnquiryButton>
        <Button size="lg" variant="outline" href={waLink(`Hello Master Play Equipments, I'd like to enquire about ${c.name}.`)} className="text-white">WhatsApp us</Button>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="wrap">
          {items.length > 0 ? (
            <>
              <SectionHeading eyebrow={`${items.length} products`} title={`${c.name} range`} text="Specifications are as listed by the manufacturer. Sizes, colours and configurations can be tailored to your site — ask for a quotation." />
              <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
                {items.map((p) => <li key={p.id}><ProductCard p={p} showCategory={false} /></li>)}
              </ul>
            </>
          ) : (
            <>
              <SectionHeading eyebrow="Installations" title="Floors that make play brighter." accent="brighter." text="Rubber flooring is planned and quoted per site. Here are installations we have completed — share your area and we'll propose patterns and colours." />
              <div className="mt-14"><GalleryGrid images={gallery} /></div>
              <div className="mt-14"><EnquiryButton size="lg" arrow product={c.name}>Get a flooring quote</EnquiryButton></div>
            </>
          )}
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="wrap">
          <p className="eyebrow mb-8 text-orange-ink">More from Master Play</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/products/${r.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-navy text-white">
                  <Photo src={`/images/${r.cover}`} alt="" fill sizes="25vw" className={r.slug === "frp-dustbins" ? "bg-white object-contain p-6 pb-20" : "object-cover transition-transform duration-700 group-hover:scale-105"} />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4"><h3 className="font-display text-lg font-semibold leading-tight">{r.name}</h3><ArrowUpRight className="size-5 shrink-0 text-orange" aria-hidden /></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </>
  );
}
