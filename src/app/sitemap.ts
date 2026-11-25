import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string, priority = 0.6) => ({ url: `${site.url}${p}`, lastModified: new Date(), priority });
  return [u("/", 1), u("/about"), u("/products", 0.9), u("/gallery"), u("/clients"), u("/contact", 0.8),
    ...categories.map((c) => u(`/products/${c.slug}`, 0.8)), ...products.map((p) => u(`/products/${p.categorySlug}/${p.id}`, 0.5))];
}
