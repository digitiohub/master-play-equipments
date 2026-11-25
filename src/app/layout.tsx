import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Chrome } from "@/components/layout/Chrome";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Master Play Equipments — Playground & Outdoor Gym Equipment Manufacturers, Mumbai", template: "%s | Master Play Equipments" },
  description: "Manufacturers of playground equipment, FRP slides, swings, multi play systems, outdoor gym equipment, benches and rubber flooring in Mumbai since 1990. Supplying schools, societies and institutions across India.",
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", images: [{ url: "/images/MRP-50.jpg", width: 1419, height: 1014, alt: "Playground installed by Master Play Equipments" }] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#142B45", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, url: site.url, telephone: "+919869050766", email: site.email,
  foundingDate: String(site.founded), image: `${site.url}/images/MRP-50.jpg`,
  address: { "@type": "PostalAddress", streetAddress: "C-315, Satyam Apartments, Link Road, Borivli (W)", addressLocality: "Mumbai", postalCode: "400091", addressCountry: "IN" },
  description: "Manufacturer of playground equipment and outdoor gym equipment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${inter.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Chrome footer={<Footer />}>{children}</Chrome>
      </body>
    </html>
  );
}
