import Image from "next/image";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { clients } from "@/data/clients";

export function Clients({ standalone }: { standalone?: boolean }) {
  return (
    <section className="bg-sand py-24 sm:py-28">
      <div className="wrap">
        {!standalone && <SectionHeading eyebrow="Clients & trust" title="Trusted by organisations across India." accent="India." text="A few of the organisations that have chosen Master Play Equipments." />}
        <ul className={`${standalone ? "" : "mt-14"} grid grid-cols-2 gap-px overflow-hidden rounded-[3px] bg-navy/10 md:grid-cols-3`}>
          {clients.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 0.06} className="group grid h-40 place-items-center bg-white p-8 sm:h-52">
              <div className="relative h-full w-full">
                <Image src={`/images/${c.logo}`} alt={c.name} fill sizes="(min-width:768px) 25vw, 45vw" className="object-contain opacity-60 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
