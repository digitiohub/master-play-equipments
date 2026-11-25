import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  // Playground geometry: arch (slide), circle (ball), triangle (climber roof).
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M4 44V24a14 14 0 0 1 28 0v20z" fill="#FF8738" />
      <circle cx="37" cy="12" r="7" fill="#A6D957" />
      <path d="M26 44l9-17 9 17z" fill="currentColor" />
    </svg>
  );
}
export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Master Play Equipments — home" className={cn("flex items-center gap-3", light ? "text-white" : "text-navy", className)}>
      <LogoMark className="size-10 shrink-0" />
      <span className="font-display leading-none">
        <span className="block text-[1.35rem] font-bold tracking-tight">MASTER PLAY</span>
        <span className="mt-1 block text-[.62rem] font-semibold tracking-[.32em] opacity-75">EQUIPMENTS</span>
      </span>
    </Link>
  );
}
