import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "group/btn inline-flex items-center justify-center gap-2.5 font-display font-semibold tracking-tight rounded-[3px] transition-colors duration-300 disabled:opacity-60 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary: "bg-orange text-navy-deep hover:bg-lime",
        dark: "bg-navy text-white hover:bg-orange hover:text-navy-deep",
        light: "bg-white text-navy hover:bg-lime",
        outline: "border border-current text-current hover:bg-white hover:text-navy hover:border-white",
        ghost: "text-current hover:text-orange",
      },
      size: { md: "h-12 px-6 text-[15px]", lg: "h-14 px-7 text-base", sm: "h-10 px-4 text-sm" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type Props = VariantProps<typeof button> & {
  href?: string; arrow?: boolean; className?: string; children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant, size, href, arrow, className, children, ...rest }: Props) {
  const cls = cn(button({ variant, size }), className);
  const inner = (<>{children}{arrow && <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />}</>);
  if (href) {
    const external = /^(https?:|tel:|mailto:)/.test(href);
    return external
      ? <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
      : <Link href={href} className={cls}>{inner}</Link>;
  }
  return <button className={cls} {...rest}>{inner}</button>;
}
