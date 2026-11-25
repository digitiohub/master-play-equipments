import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { About } from "@/components/home/About";
import { Strengths } from "@/components/home/Strengths";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChoose } from "@/components/home/WhyChoose";
import { GalleryGrid } from "@/components/home/GalleryGrid";
import { Clients } from "@/components/home/Clients";
import { CTA } from "@/components/home/CTA";
import { ContactSection } from "@/components/home/ContactSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { featured, galleryImages } from "@/data/products";

const pick = ["MRP-50.jpg", "MPS26.jpg", "IMG-20181101-WA0002.jpg", "MPS-27.jpg", "MRP-52.jpg", "IMG-20160623-WA0002.jpg", "MPS-45-copy.jpg", "garden-view1.png"];
const preview = pick.map((f) => galleryImages.find((g) => g.src.endsWith(f))).filter((g): g is NonNullable<typeof g> => !!g);

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Strengths />
      <Categories />
      <FeaturedProducts items={featured} />
      <WhyChoose />
      <section className="bg-paper pb-24 sm:pb-32">
        <div className="wrap">
          <div className="mb-14 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Project gallery" title="Bringing Play Spaces to Life." accent="Life." text="Real equipment, photographed where it was installed." />
            <Button href="/gallery" variant="dark" size="lg" arrow>Open full gallery</Button>
          </div>
          <GalleryGrid images={preview} />
        </div>
      </section>
      <Clients />
      <CTA />
      <ContactSection />
    </>
  );
}
