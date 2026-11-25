"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "p" | "section" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </M>
  );
}

// Staggered word-by-word heading reveal. `lines` may contain a {accent} marker via the accent prop.
export function SplitHeading({ text, className, accent, accentClass = "text-orange", as: Tag = "h2", delay = 0, immediate }: { text: string; className?: string; accent?: string; accentClass?: string; as?: "h1" | "h2" | "h3"; delay?: number; immediate?: boolean }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const accentWords = new Set((accent ?? "").split(" "));
  const trigger = immediate ? { animate: { opacity: 1, y: "0%" } } : { whileInView: { opacity: 1, y: "0%" }, viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[.2em] -mb-[.2em]">
          <motion.span className={cn("inline-block", accentWords.has(w.replace(/[.,]/g, "")) && accent && accentClass)} initial={reduce ? false : { opacity: 0, y: "105%" }} {...trigger} transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}>
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

// Image mask reveal (clip-path wipe) with slight settle zoom.
export function MaskReveal({ children, className, from = "bottom" }: { children: React.ReactNode; className?: string; from?: "bottom" | "left" }) {
  const reduce = useReducedMotion();
  const hidden = from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
  return (
    <motion.div className={className} initial={reduce ? false : { clipPath: hidden }} whileInView={{ clipPath: "inset(0 0 0 0)" }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 1.2, ease }}>
      {children}
    </motion.div>
  );
}
