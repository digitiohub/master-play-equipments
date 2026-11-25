import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Photo } from "@/components/common/Photo";
import { ProductCard } from "@/components/products/ProductCard";
import { EnquiryButton } from "@/components/products/EnquiryButton";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/home/CTA";
import { getProduct, products, productsIn } from "@/data/products";
import { site, waLink } from "@/lib/site";

type P = { params: Promise<{ category: string; product: string }> };
export const generateStaticParams = () => products.map((p) => ({ category: p.categorySlug, product: p.id }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) return {};
  return { title: `${p.name} — ${p.categoryName}`, description: `${p.name} by Master Play Equipments, Mumbai. ${p.specs.map(([k, v]) => `${k}: ${v}`).slice(0, 3).join(". ")}. Request a quotation.`, alternates: { canonical: `/products/${p.categorySlug}/${p.id}` }, openGraph: { images: [`/images/${p.image}`] } };
}

export default async function ProductPage({ params }: P) {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) notFound();
  const related = productsIn(p.categorySlug).filter((x) => x.id !== p.id).slice(0, 4);
  const ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, category: p.categoryName, image: `${site.url}/images/${p.image}`, brand: { "@type": "Brand", name: site.name }, manufacturer: { "@type": "Organization", name: site.name } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero title={p.name} crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: p.categoryName, href: `/products/${p.categorySlug}` }, { label: p.name }]} />
      <section className="py-16 sm:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[3px] bg-sand lg:sticky lg:top-28 lg:self-start">
            <Photo src={`/images/${p.image}`} alt={`${p.name} — ${p.categoryName}`} fill priority sizes="(min-width:1024px) 50vw, 100vw" className={p.categorySlug === "frp-dustbins" ? "bg-white object-contain p-8" : "object-cover"} />
          </div>
          <div>
            <p className="eyebrow text-orange-ink">Specifications</p>
            {p.specs.length ? (
              <dl className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
                {p.specs.map(([k, v]) => (<div key={k} className="grid grid-cols-[10rem_1fr] gap-4 py-4"><dt className="text-ink/60">{k}</dt><dd className="font-medium text-navy">{v}</dd></div>))}
              </dl>
            ) : <p className="mt-4 text-ink/70">Detailed specifications are available on request.</p>}
            <p className="mt-6 text-sm text-ink/60">Dimensions and configurations can be adapted to your site. Pricing is provided on quotation.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <EnquiryButton size="lg" arrow product={p.name}>Enquire now</EnquiryButton>
              <Button size="lg" variant="dark" href={waLink(`Hello Master Play Equipments, I'd like to enquire about: ${p.name} (${p.categoryName}).`)}><MessageCircle className="size-4" aria-hidden />WhatsApp</Button>
              <Button size="lg" variant="ghost" href={site.phoneHref} className="text-navy"><Phone className="size-4" aria-hidden />{site.phone}</Button>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-sand py-20"><div className="wrap"><h2 className="display-md mb-10 text-navy">More in {p.categoryName}</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{related.map((r) => <li key={r.id}><ProductCard p={r} showCategory={false} /></li>)}</ul></div></section>
      )}
      <CTA />
    </>
  );
}
