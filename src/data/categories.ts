export type Category = {
  slug: string;
  name: string;
  short: string; // card blurb
  intro: string; // category page intro
  cover: string; // file in /public/images
  key: string; // key inside catalog.json
};

// Order = display order on the home grid and in menus.
export const categories: Category[] = [
  { slug: "multi-play-systems", key: "multi-play-systems", name: "Multi Play Systems", cover: "MRP-50.jpg",
    short: "Slides, climbers, bridges and swings combined into one multi-activity structure.",
    intro: "Multi-activity play units that combine slides, climbers, bridges and more in a single structure — from compact units for the youngest children to large systems for 20–25 children at a time." },
  { slug: "slides", key: "slides", name: "Slides", cover: "garden-view1.png",
    short: "FRP plain, wave, twin, roller and spiral slides in 5' and 7' heights.",
    intro: "FRP slides in plain, wave, double, twin, roller and spiral designs, available in 5' and 7' heights and in red, yellow, blue, green and orange." },
  { slug: "swings", key: "swings", name: "Swings", cover: "Std-Double-Swing.jpg",
    short: "Arch, ring, twin-seater, luxury and party swings with FRP or rubber seats.",
    intro: "From standard double and arch swings to ring swings, roofed luxury swings and party swings for adults — with FRP or rubber seats." },
  { slug: "seesaws", key: "seesaws", name: "Seesaws", cover: "Animal-See-Saw.png",
    short: "Two- and four-seater seesaws, bucket seats and animal-themed FRP designs.",
    intro: "Standard 2- and 4-seater seesaws, bucket-seat models and animal seesaws in FRP — duck, fish and horse." },
  { slug: "merry-go-rounds", key: "merry-go-rounds", name: "Merry-Go-Rounds", cover: "IMG_20170525_163800.jpg",
    short: "Metal and FRP platform merry-go-rounds, seaters and animal designs.",
    intro: "Merry-go-rounds with metal or FRP platforms, seated models, animal themes and a leaf-roof variant for schools and parks." },
  { slug: "climbers", key: "climbers", name: "Climbers", cover: "6-Copy-Copy.jpg",
    short: "Net, rope, pyramid, tyre and rock-wall climbers for building strength and confidence.",
    intro: "Straight-net, rope, pyramid, circular, criss-cross, tyre, multiple and rock-net climbers that build strength, balance and confidence." },
  { slug: "exercise-games", key: "exercise-games", name: "Outdoor Exercise Equipment", cover: "DSCN7946.jpg",
    short: "Loop rungs, balance bridges, parallel bars, climbing walls and more.",
    intro: "Exercise-range equipment for children — loop rungs, FRP balance bridge, parallel bars, climbing wall, walking barrel and cross & zero." },
  { slug: "kids-zone", key: "kids-zone", name: "Kids Zone", cover: "car-spring-rider.jpg",
    short: "Spring riders, rocking riders and compact combination units for the youngest.",
    intro: "FRP spring riders, rocking riders, ding-dong boat and a 3-in-1 combination unit, designed for children up to 6 years." },
  { slug: "benches", key: "benches", name: "Benches", cover: "FRP-PATTI-BENCH.jpg",
    short: "FRP casting, patti, sleek, deluxe and family benches for parks and gardens.",
    intro: "Durable outdoor benches — FRP casting, patti, sleek, deluxe and family benches for playgrounds, gardens and public spaces." },
  { slug: "frp-dustbins", key: "frp-dustbins", name: "FRP Dustbins", cover: "dusbin1.png",
    short: "Character-themed FRP dustbins that make tidiness part of the play.",
    intro: "Character-themed FRP dustbins — chimp, pig, mouse, elephant, dog and more — that keep play areas tidy and cheerful." },
  { slug: "outdoor-gym", key: "outdoor-gym", name: "Outdoor Gym Equipment", cover: "IMG_20171213_162541.jpg",
    short: "Shoulder press, sky walker, leg press, bicycle, step trainer and combos.",
    intro: "Open-gym equipment for parks, housing societies and campuses — shoulder press, sky walker, leg press, bicycle, step trainer and combination units." },
  { slug: "rubber-flooring", key: "rubber-flooring", name: "Rubber Flooring", cover: "IMG-20150412-WA0018.jpg",
    short: "Coloured rubber flooring laid in bold patterns beneath play equipment.",
    intro: "Coloured rubber flooring installed beneath play equipment and across play areas. Every floor is planned to the space — share your area and we will quote." },
];
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
