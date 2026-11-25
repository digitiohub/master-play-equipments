import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { GalleryGrid } from "@/components/home/GalleryGrid";
import { CTA } from "@/components/home/CTA";
import { galleryImages } from "@/data/products";
import { getUploadedGallery } from "@/lib/gallery";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Our Projects — Playground Installation Gallery",
  description: "Photographs of playground equipment, multi play systems, swings, slides, outdoor gyms and rubber flooring supplied and installed by Master Play Equipments.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const uploaded = await getUploadedGallery();
  const all = [...uploaded, ...galleryImages];
  return (
    <>
      <PageHero title="Bringing Play Spaces to Life." accent="Life." text="Equipment as it stands on site — in societies, schools, gardens and open gyms." crumbs={[{ label: "Home", href: "/" }, { label: "Our Projects" }]} />
      <section className="py-16 sm:py-20"><div className="wrap"><GalleryGrid images={all} filterable /></div></section>
      <CTA />
    </>
  );
}
