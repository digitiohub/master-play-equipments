import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Clients } from "@/components/home/Clients";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = { title: "Our Clients", description: "Organisations that have chosen Master Play Equipments for their playground and outdoor equipment.", alternates: { canonical: "/clients" } };

export default function ClientsPage() {
  return (
    <>
      <PageHero title="Trusted by organisations across India." accent="India." text="A few of the organisations we have supplied." crumbs={[{ label: "Home", href: "/" }, { label: "Our Clients" }]} />
      <Clients standalone />
      <CTA />
    </>
  );
}
