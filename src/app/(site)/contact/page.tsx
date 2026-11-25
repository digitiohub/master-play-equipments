import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = { title: "Contact Us — Request a Quotation", description: "Contact Master Play Equipments, Borivli (W), Mumbai. Call +91 9869050766, WhatsApp, email or send an enquiry for playground equipment quotations.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <>
      <PageHero title="Let's plan your play space." accent="play" text="Call, WhatsApp or send us the details of your project — we'll respond with the right equipment and a quotation." crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <ContactSection bare />
    </>
  );
}
