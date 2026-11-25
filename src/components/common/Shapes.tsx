import { cn } from "@/lib/utils";

// Decorative playground-geometry shapes. Purely visual (aria-hidden).
const shapes = {
  arch: <path d="M0 100V50a50 50 0 0 1 100 0v50z" />,
  circle: <circle cx="50" cy="50" r="50" />,
  tri: <path d="M0 100L50 0l50 100z" />,
  quarter: <path d="M0 100V0a100 100 0 0 1 100 100z" />,
  ring: <path fillRule="evenodd" d="M50 0a50 50 0 1 0 0 100A50 50 0 0 0 50 0zm0 28a22 22 0 1 1 0 44 22 22 0 0 1 0-44z" />,
};
export function Shape({ kind, className, float }: { kind: keyof typeof shapes; className?: string; float?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" fill="currentColor" className={cn("pointer-events-none absolute", float && "motion-safe:animate-[drift_9s_ease-in-out_infinite]", className)}>
      {shapes[kind]}
    </svg>
  );
}
