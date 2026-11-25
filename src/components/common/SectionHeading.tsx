import { cn } from "@/lib/utils";
import { Reveal, SplitHeading } from "./Reveal";

export function SectionHeading({ eyebrow, title, accent, text, light, className, align = "left" }: { eyebrow: string; title: string; accent?: string; text?: string; light?: boolean; className?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal><p className={cn("eyebrow mb-5 flex items-center gap-3", align === "center" && "justify-center", light ? "text-lime" : "text-orange-ink")}><span aria-hidden className="h-px w-8 bg-current" />{eyebrow}</p></Reveal>
      <SplitHeading text={title} accent={accent} accentClass={light ? "text-orange" : "text-orange-ink"} className={cn("display-lg", light ? "text-white" : "text-navy")} />
      {text && <Reveal delay={0.15}><p className={cn("mt-6 max-w-xl text-lg leading-relaxed", align === "center" && "mx-auto", light ? "text-white/75" : "text-ink/70")}>{text}</p></Reveal>}
    </div>
  );
}
