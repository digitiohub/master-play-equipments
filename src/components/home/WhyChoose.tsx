import { Reveal, SplitHeading } from "@/components/common/Reveal";
import { Photo } from "@/components/common/Photo";
import { Shape } from "@/components/common/Shapes";
import { icons } from "@/components/common/Icons";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/lib/site";

const reasons = [
  { icon: icons.years, title: `${site.years}+ years of experience`, text: `Manufacturing playground equipment since ${site.founded}, with thousands of installations behind us.` },
  { icon: icons.range, title: "A wide range of products", text: `${categories.length} categories and ${products.length}+ models — from swings and slides to multi play systems and outdoor gyms.` },
  { icon: icons.durable, title: "Quality and durability", text: "Weather-proof, non-toxic equipment. We avoid heavy use of short-life moulded plastic so clients avoid recurring costs." },
  { icon: icons.school, title: "Made for schools & shared spaces", text: "Equipment for schools, housing societies, gardens and recreation areas, with child safety as the first priority." },
  { icon: icons.states, title: "Experience across states", text: "Supplied and installed in Maharashtra, Karnataka, Tamil Nadu, Kerala, Goa, Gujarat, Madhya Pradesh, Odisha and Rajasthan." },
  { icon: icons.learn, title: "Fun that also teaches", text: "Designed from a child's perspective, combining play with learning to build skills and confidence." },
];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Shape kind="tri" className="-right-10 top-24 size-52 text-lime/30" />
      <div className="wrap grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal><p className="eyebrow mb-5 flex items-center gap-3 text-orange-ink"><span aria-hidden className="h-px w-8 bg-current" />Why Master Play</p></Reveal>
            <SplitHeading text="Why choose Master Play Equipments?" accent="choose" accentClass="text-orange-ink" className="display-lg text-navy" />
            <div className="relative mt-14 h-[26rem] sm:h-[32rem]">
              <Reveal className="absolute left-0 top-0 h-[78%] w-[62%]"><div className="relative size-full overflow-hidden rounded-t-[999px] bg-sand"><Photo src="/images/MRP-52.jpg" alt="FRP slides on a multi play system in a society garden" fill sizes="30vw" className="object-cover" /></div></Reveal>
              <Reveal delay={0.15} className="absolute bottom-0 right-0 h-[55%] w-[58%]"><div className="relative size-full overflow-hidden border-8 border-paper bg-sand"><Photo src="/images/MPS-45-copy.jpg" alt="Multi play system with spiral slide and swings" fill sizes="30vw" className="object-cover" /></div></Reveal>
              <Reveal delay={0.3} className="absolute right-[6%] top-[6%] size-24 sm:size-28"><div className="relative grid size-full place-items-center rounded-full bg-lime font-display text-navy-deep"><span className="text-3xl font-bold leading-none">{site.years}+<span className="mt-1 block text-[10px] font-semibold uppercase tracking-widest">Years</span></span></div></Reveal>
            </div>
          </div>
        </div>
        <ol className="lg:col-span-7">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-navy/15 py-8 sm:grid-cols-[5rem_1fr_auto] sm:gap-x-8 sm:py-10">
              <span className="font-display text-4xl font-bold tabular-nums text-navy/20 transition-colors group-hover:text-orange sm:text-6xl">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-2xl font-semibold text-navy sm:text-3xl">{r.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink/70">{r.text}</p>
              </div>
              <span className="hidden size-14 text-navy transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 sm:block">{r.icon("size-full")}</span>
            </Reveal>
          ))}
          <li aria-hidden className="border-t border-navy/15" />
        </ol>
      </div>
    </section>
  );
}
