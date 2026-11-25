"use client";
import { usePathname } from "next/navigation";
import { EnquiryProvider } from "@/components/products/EnquiryProvider";
import { FloatingActions, MobileBar, ScrollProgress } from "@/components/common/FloatingActions";
import { Navbar } from "./Navbar";

// Public-site chrome; the admin area renders bare.
export function Chrome({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  if (usePathname().startsWith("/admin")) return <>{children}</>;
  return (
    <EnquiryProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-orange focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-deep">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main">{children}</main>
      {footer}
      <FloatingActions />
      <MobileBar />
    </EnquiryProvider>
  );
}
