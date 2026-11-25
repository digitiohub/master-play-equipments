import { Shape } from "@/components/common/Shapes";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy py-32 text-white">
      <Shape kind="arch" float className="right-[12%] top-[22%] size-32 text-orange" />
      <Shape kind="circle" float className="bottom-[20%] right-[30%] size-14 text-lime" />
      <Shape kind="tri" className="-bottom-10 left-[8%] size-48 text-navy-deep" />
      <div className="wrap relative">
        <p className="eyebrow text-lime">Error 404</p>
        <h1 className="mt-4 font-display text-[clamp(6rem,22vw,18rem)] font-bold leading-[.85] tracking-tighter">4<span className="text-orange">0</span>4</h1>
        <p className="mt-8 max-w-lg font-display text-2xl font-medium sm:text-3xl">This slide leads nowhere — but the playground is right this way.</p>
        <div className="mt-10 flex flex-wrap gap-3"><Button href="/" size="lg" arrow>Back to home</Button><Button href="/products" size="lg" variant="outline" className="text-white">Browse products</Button></div>
      </div>
    </section>
  );
}
