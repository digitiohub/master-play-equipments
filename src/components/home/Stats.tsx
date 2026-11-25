import { Counter } from "@/components/common/Counter";
import { Reveal } from "@/components/common/Reveal";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/lib/site";

// Every figure is either stated on the existing website or computed from the product data.
const stats = [
  { n: site.years, suffix: "+", label: "Years of experience", note: `Manufacturing since ${site.founded}` },
  { n: categories.length, label: "Product categories", note: "Play, fitness and outdoor furniture" },
  { n: products.length, suffix: "+", label: "Product models", note: "Listed in our catalogue" },
  { n: 9, label: "Indian states served", note: "Maharashtra to Tamil Nadu, Gujarat to Odisha" },
];

export function Stats() {
  return (
    <section aria-label="Master Play at a glance" className="relative border-b border-navy/10 bg-paper">
      <div className="wrap">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={`py-10 pr-4 sm:py-14 ${i % 2 ? "pl-5 sm:pl-8" : ""} ${i > 0 ? "lg:border-l lg:border-navy/10 lg:pl-10" : ""} ${i === 2 ? "border-t border-navy/10 lg:border-t-0" : ""} ${i === 3 ? "border-t border-navy/10 lg:border-t-0" : ""} ${i === 1 || i === 3 ? "border-l border-navy/10" : ""}`}>
              <dd className={`font-display font-bold leading-none tracking-tight text-navy text-[clamp(2.4rem,5.4vw,5rem)]`}>
                <Counter to={s.n} suffix={s.suffix} />
              </dd>
              <dt className="mt-3 font-display text-base font-semibold text-orange-ink sm:text-lg">{s.label}</dt>
              <p className="mt-1 hidden text-sm text-ink/60 sm:block">{s.note}</p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
