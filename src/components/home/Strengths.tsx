import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Photo } from "@/components/common/Photo";
import { icons } from "@/components/common/Icons";

const items = [
  { n: "01", title: "Quality & Excellence", icon: icons.quality, img: "MRP-52.jpg", alt: "Rubber-floored play area with multi play system", shape: "rounded-t-[999px]", offset: "", tint: "bg-lime/25 hover:bg-lime/40",
    text: "We strive for the highest quality in everything we make. Our products are manufactured in accordance with international quality standards." },
  { n: "02", title: "Our Equipment", icon: icons.equipment, img: "garden-view1.png", alt: "Yellow FRP spiral slide on a lawn", shape: "rounded-[3px]", offset: "lg:mt-14", tint: "bg-orange/20 hover:bg-orange/35",
    text: "Weather-proof, non-toxic, attractive and colourful — durable, elegant and completely safe. Equipment made to be played on, year after year." },
  { n: "03", title: "Child-Centric Design", icon: icons.child, img: "car-spring-rider.jpg", alt: "Red FRP truck spring rider", shape: "rounded-[999px]", offset: "lg:mt-28", tint: "bg-navy/10 hover:bg-navy/20",
    text: "Designed from a child's perspective, every piece blends fun with learning — play that builds coordination, confidence and imagination." },
];

export function Strengths() {
  return (
    <section className="bg-sand py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading eyebrow="Our core strengths" title="Made well. Made to last. Made for children." accent="children." />
        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.12} className={it.offset}>
              <article className={`group relative flex h-full flex-col overflow-hidden rounded-[3px] p-7 text-navy transition-colors duration-500 sm:p-9 ${it.tint}`}>
                <div className="flex items-start justify-between">
                  <span className="font-display text-7xl font-bold leading-none text-navy/15 transition-colors group-hover:text-navy/30">{it.n}</span>
                  <span className="size-14 text-navy transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">{it.icon("size-full")}</span>
                </div>
                <div className={`relative mt-8 aspect-[4/3] w-full overflow-hidden bg-white ${it.shape}`}>
                  <Photo src={`/images/${it.img}`} alt={it.alt} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="mt-8 text-3xl font-semibold leading-tight">{it.title}</h3>
                <p className="mt-4 leading-relaxed text-ink/75">{it.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
