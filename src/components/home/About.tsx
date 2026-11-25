import { MaskReveal, Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Photo } from "@/components/common/Photo";
import { Shape } from "@/components/common/Shapes";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function About() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Shape kind="circle" className="-left-24 top-10 size-72 text-sand" />
      <div className="wrap relative grid items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <MaskReveal className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-sand">
            <Photo src="/images/MPS26.jpg" alt="Multi play system with spiral slide installed in a housing society" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </MaskReveal>
          <Reveal delay={0.3} className="absolute -bottom-10 -right-2 w-[46%] sm:-right-8">
            <div className="relative aspect-square border-[10px] border-paper bg-sand shadow-xl">
              <Photo src="/images/fish-spring-rider.jpg" alt="FRP fish spring rider from the Kids Zone range" fill sizes="25vw" className="object-cover" />
            </div>
          </Reveal>
          <Shape kind="quarter" float className="-left-6 -top-6 size-24 text-orange sm:-left-10 sm:-top-10" />
          <p className="eyebrow absolute -left-3 bottom-8 hidden origin-bottom-left -rotate-90 text-navy/60 xl:block">Est. {site.founded} · Mumbai</p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading eyebrow="About Master Play" title="Built for Play. Designed for Possibilities." accent="Possibilities." />
          <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
            <p>Master Play Equipments is a Mumbai-based manufacturer of playground equipment, operating since {site.founded}. For {site.years} years we have manufactured, supplied and installed thousands of pieces of equipment — across Maharashtra, Karnataka, Tamil Nadu, Kerala, Goa, Gujarat, Madhya Pradesh, Odisha and Rajasthan.</p>
            <p>Child safety comes first, followed by durability and attractive design. We deliberately avoid heavy use of moulded plastic, whose short life brings recurring costs for our clients.</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10"><Button href="/about" variant="dark" size="lg" arrow>Discover Our Story</Button></Reveal>
        </div>
      </div>
    </section>
  );
}
