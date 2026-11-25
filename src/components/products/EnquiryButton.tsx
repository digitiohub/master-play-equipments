"use client";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "./EnquiryProvider";
import type { ComponentProps } from "react";

export function EnquiryButton({ product, children, ...p }: { product?: string; children: React.ReactNode } & Omit<ComponentProps<typeof Button>, "onClick" | "href">) {
  const { open } = useEnquiry();
  return <Button {...p} onClick={() => open(product)}>{children}</Button>;
}
