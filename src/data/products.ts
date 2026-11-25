import catalog from "./catalog.json";
import { categories } from "./categories";
import dims from "./dims.json";
const dim = (f: string) => (dims as Record<string, number[]>)[f] ?? [4, 3];

export type Product = {
  id: string; name: string; image: string; specs: [string, string][];
  categorySlug: string; categoryName: string;
};

const raw = catalog as unknown as Record<string, { id: string; name: string; image: string; specs: [string, string][] }[] | string[]>;

export const products: Product[] = categories.flatMap((c) =>
  ((raw[c.key] ?? []) as { id: string; name: string; image: string; specs: [string, string][] }[]).map((p) => ({
    ...p, categorySlug: c.slug, categoryName: c.name,
  }))
);

export const rubberImages = (raw.rubberImages ?? []) as string[];
export const productsIn = (slug: string) => products.filter((p) => p.categorySlug === slug);
export const getProduct = (slug: string, id: string) => products.find((p) => p.categorySlug === slug && p.id === id);

// Ids picked for the home page carousel — a spread of categories with the clearest photographs.
const featuredIds = ["multi-play-system-50", "luxury-swing-pvc-frp-roof", "frp-spiral-slide-5-h", "pyramid-climber", "animal-mgr-4-seater", "sky-walker", "frp-fish-spring-rider", "frp-patti-bench", "criss-cross-climber", "mgr-frp-platform-with-leaf-roof"];
export const featured = featuredIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];

// Photographs of real installations & equipment for the gallery (studio cut-outs and CAD renders excluded).
const notPhotos = new Set(["double-pendulum", "step-trainer", "frp-spiral-slide-7-h"]);
export type GalleryImage = { src: string; alt: string; category: string; categoryName: string; w?: number; h?: number };
export const galleryImages: GalleryImage[] = [
  ...products
    .filter((p) => p.categorySlug !== "frp-dustbins" && !notPhotos.has(p.id))
    .map((p) => ({ src: `/images/${p.image}`, alt: `${p.name} — ${p.categoryName}`, category: p.categorySlug, categoryName: p.categoryName, w: dim(p.image)[0], h: dim(p.image)[1] })),
  ...rubberImages.map((f, i) => ({ src: `/images/${f}`, alt: `Rubber flooring installation ${i + 1}`, category: "rubber-flooring", categoryName: "Rubber Flooring", w: dim(f)[0], h: dim(f)[1] })),
];
