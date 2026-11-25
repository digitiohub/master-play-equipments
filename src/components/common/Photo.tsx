"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

// next/image with a graceful fallback panel if the file is missing or fails to load.
export function Photo({ className, alt, ...p }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return <div role="img" aria-label={alt} className={cn("absolute inset-0 grid place-items-center bg-sand text-navy/30 eyebrow", className)}>Master Play</div>;
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...p} />;
}
