import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Stats } from "@/components/home/Stats";
import { Strengths } from "@/components/home/Strengths";
import { CTA } from "@/components/home/CTA";
import { Photo } from "@/components/common/Photo";
import { MaskReveal, Reveal } from "@/components/common/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Playground Equipment Manufacturers in Mumbai",
  description: `Master Play Equipments has manufactured playground and outdoor gym equipment in Mumbai since ${site.founded}, supplying schools, societies and institutions across India.`,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero title="Built for Play. Designed for Possibilities." accent="Possibilities." text={`A Mumbai manufacturer of playground equipment since ${site.founded} — earning the faith of clients across India through best-quality equipment at reasonable prices.`} crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <section className="py-24 sm:py-32">
        <div className="wrap grid items-start gap-16 lg:grid-cols-12">
          <MaskReveal className="relative aspect-[5/4] overflow-hidden rounded-[3px] bg-sand lg:col-span-6 lg:sticky lg:top-28">
            <Photo src="/images/MRP-50.jpg" alt="Play area with tunnel slide, swings and rubber flooring" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </MaskReveal>
          <div className="space-y-6 text-lg leading-relaxed text-ink/75 lg:col-span-6 lg:pl-10">
            <Reveal><p className="font-display text-2xl font-medium leading-snug text-navy sm:text-3xl">Master Play Equipments is a renowned playground equipment manufacturing company based in Mumbai since {site.founded}.</p></Reveal>
            <Reveal><p>For {site.years} years we have earned not only the name but also the faith of our prestigious clients across India, through our goal of manufacturing the best-quality equipment at the most reasonable prices.</p></Reveal>
            <Reveal><p>We make all types of outdoor playground equipment — swings, FRP slides, seesaws, merry-go-rounds, climbers, kids range, exercise range, benches, FRP dustbins, rock-climbing walls, rubber flooring, multi-activity play units and outdoor gym equipment — in modern designs.</p></Reveal>
            <Reveal><p>We have manufactured, supplied and installed thousands of pieces of equipment, not only in Mumbai and Maharashtra but also in Karnataka, Tamil Nadu, Kerala, Goa, Gujarat, Madhya Pradesh, Odisha, Rajasthan and Saurashtra.</p></Reveal>
            <Reveal><p>We keep giving users friendly, innovative designs from time to time. Best quality, durability, child safety as the first priority, and attractive designs and colour combinations — achieved through our skilled technical staff. We deliberately avoid heavy use of moulded plastic, because of its short life and the recurring expense it brings to clients.</p></Reveal>
          </div>
        </div>
      </section>
      <Stats />
      <Strengths />
      <CTA />
    </>
  );
}
