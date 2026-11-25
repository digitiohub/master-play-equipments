import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { CTA } from "@/components/home/CTA";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products — Playground & Outdoor Gym Equipment",
  description: "Browse swings, slides, multi play systems, climbers, seesaws, merry-go-rounds, outdoor gym equipment, benches, FRP dustbins and rubber flooring by Master Play Equipments.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero title="The complete range of play." accent="play." text={`${categories.length} categories, ${products.length}+ models — all manufactured in Mumbai and quoted to your space.`} crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]} />
      <section className="py-16 sm:py-20"><div className="wrap"><ProductBrowser items={products} cats={categories.map((c) => ({ slug: c.slug, name: c.name }))} /></div></section>
      <CTA />
    </>
  );
}
