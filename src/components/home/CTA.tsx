import { Photo } from "@/components/common/Photo";
import { Shape } from "@/components/common/Shapes";
import { Reveal, SplitHeading } from "@/components/common/Reveal";
import { Magnetic } from "@/components/common/Magnetic";
import { EnquiryButton } from "@/components/products/EnquiryButton";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-28 text-white sm:py-40">
      <Photo src="/images/MPS-45-copy.jpg" alt="" fill sizes="100vw" quality={80} className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy/85 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/90 to-navy/40" />
      <Shape kind="arch" float className="right-[10%] top-12 size-28 text-orange" />
      <Shape kind="circle" float className="bottom-16 right-[28%] size-12 text-lime" />
      <Shape kind="ring" className="-bottom-20 -left-20 size-72 text-white/10" />
      <div className="wrap relative">
        <SplitHeading text="Let's Build Something Extraordinary Together." accent="Extraordinary" className="display-xl max-w-[15ch]" />
        <Reveal delay={0.2}><p className="mt-8 max-w-xl text-lg text-white/80">Planning a playground, school recreation area, or outdoor fitness space? Let&apos;s find the right equipment for your project.</p></Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic><EnquiryButton size="lg" arrow>Request a Quote</EnquiryButton></Magnetic>
          <Button size="lg" variant="outline" href={site.phoneHref} className="text-white">Talk to Our Team</Button>
        </Reveal>
      </div>
    </section>
  );
}
