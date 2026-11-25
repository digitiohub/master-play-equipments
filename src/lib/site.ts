// All business details below are taken from the existing masterplayequipments.com.
export const site = {
  name: "Master Play Equipments",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.masterplayequipments.com",
  tagline: "Creating Spaces Where Play, Fitness and Imagination Come Together.",
  phone: "+91 98690 50766",
  phoneHref: "tel:+919869050766",
  whatsapp: "919869050766",
  email: "masterequipments90@gmail.com",
  address: "C-315, Satyam Apartments, Link Road, Borivli (W), Mumbai 400 091",
  founded: 1990,
  years: 27, // as stated on the existing website ("from last 27 years")
  mapQuery: "Satyam Apartments, Link Road, Borivali West, Mumbai 400091",
};
export const waLink = (text = "Hello Master Play Equipments, I would like to enquire about playground equipment.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
