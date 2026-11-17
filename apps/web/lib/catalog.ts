import { img } from "./images";

/*
 * Apparel collections. Each category gets its own SEO landing page at
 * /products/[slug]; `styles` feed the filterable product gallery.
 * MOQ and lead-time figures are typical ranges — adjust to your factory base.
 */

export interface Style {
  name: string;
  image: string;
  fabric: string;
  detail: string;
}

export interface Category {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  cover: string;
  gallery: string[];
  fabrics: string[];
  finishes: string[];
  moq: string;
  leadTime: string;
  sizes: string;
  styles: Style[];
}

export const categories: Category[] = [
  {
    slug: "t-shirts-polo-shirts",
    name: "T-shirts & Polo Shirts",
    short: "T-shirts & Polos",
    tagline: "Everyday essentials, engineered to retail standards.",
    description:
      "From 140 GSM fashion tees to heavyweight 260 GSM boxy fits and piqué polos, we develop knit tops that hold their shape, colour and hand-feel wash after wash.",
    cover: img.polos,
    gallery: [img.teeWhiteModel, img.teesFolded, img.teeGraphic, img.teesRack],
    fabrics: ["Single jersey", "Combed & ring-spun cotton", "Organic cotton (GOTS)", "Piqué", "Cotton–elastane", "Recycled polyester blends"],
    finishes: ["Screen & water-based print", "DTG & DTF print", "Embroidery", "Garment dye & enzyme wash", "Silicone soft finish"],
    moq: "1,000 pcs per style",
    leadTime: "45–60 days",
    sizes: "XXS–5XL",
    styles: [
      { name: "Classic crew-neck tee", image: img.teeWhiteModel, fabric: "180 GSM combed cotton", detail: "Side-seamed, taped shoulders" },
      { name: "Heavyweight boxy tee", image: img.teeBlack, fabric: "240 GSM cotton jersey", detail: "Dropped shoulder, ribbed neck" },
      { name: "Graphic print tee", image: img.teeGraphic, fabric: "160 GSM organic cotton", detail: "Water-based screen print" },
      { name: "Piqué polo shirt", image: img.polos, fabric: "220 GSM cotton piqué", detail: "Flat-knit collar & cuffs" },
    ],
  },
  {
    slug: "shirts-blouses",
    name: "Shirts & Blouses",
    short: "Shirts & Blouses",
    tagline: "Tailored precision for menswear and womenswear.",
    description:
      "Formal and casual shirting in poplin, oxford, twill, flannel and viscose — cut with consistent collar geometry, clean plackets and accurate pattern matching.",
    cover: img.shirtsTable,
    gallery: [img.shirtFormal, img.shirtPrinted, img.shirtFlannel, img.shirtWhiteTie],
    fabrics: ["Cotton poplin", "Oxford", "Twill", "Yarn-dyed checks", "Brushed flannel", "Viscose & linen blends"],
    finishes: ["Non-iron finish", "All-over print", "Peached finish", "Contrast stitching", "Mother-of-pearl buttons"],
    moq: "800 pcs per style",
    leadTime: "55–70 days",
    sizes: "XS–4XL · collar 14–19\"",
    styles: [
      { name: "Business poplin shirt", image: img.shirtFormal, fabric: "100s two-ply cotton poplin", detail: "Fused collar, split yoke" },
      { name: "Printed casual shirt", image: img.shirtPrinted, fabric: "Cotton–linen", detail: "All-over micro print" },
      { name: "Check flannel overshirt", image: img.shirtFlannel, fabric: "Brushed yarn-dyed flannel", detail: "Double chest pockets" },
      { name: "Classic dress shirt", image: img.shirtWhiteTie, fabric: "Easy-care cotton twill", detail: "Non-iron finish" },
    ],
  },
  {
    slug: "knitwear",
    name: "Knitwear",
    short: "Knitwear",
    tagline: "Soft structure, from fine gauge to chunky textures.",
    description:
      "Circular and flat-knit programmes spanning fine-gauge layers to textured statement pieces, with yarn sourcing from cotton and merino to recycled blends.",
    cover: img.knitCream,
    gallery: [img.knitRack, img.knitFlatlay, img.knitBeanies, img.sweaterOrange],
    fabrics: ["Cotton yarns", "Merino & wool blends", "Acrylic & recycled acrylic", "Viscose blends", "Lurex accents"],
    finishes: ["Cable & jacquard", "Pointelle", "Intarsia", "Linking & hand finishing", "Anti-pilling treatment"],
    moq: "500 pcs per style",
    leadTime: "60–75 days",
    sizes: "XS–3XL",
    styles: [
      { name: "Open-knit pullover", image: img.knitCream, fabric: "Cotton tape yarn", detail: "5GG, relaxed fit" },
      { name: "Knit accessories", image: img.knitBeanies, fabric: "Recycled acrylic", detail: "Rib beanies & scarves" },
      { name: "Layering knit set", image: img.knitFlatlay, fabric: "Wool-blend", detail: "Coordinated knit capsule" },
    ],
  },
  {
    slug: "woven-garments",
    name: "Woven Garments",
    short: "Wovens",
    tagline: "Structured fabrics, built for longevity.",
    description:
      "Shirting, bottoms, dresses and utility pieces in cotton, linen, Tencel™ and technical wovens — supported by fabric mills across Bangladesh and the region.",
    cover: img.shirtChambray,
    gallery: [img.shirtsTable, img.coatPlaid, img.denimDress, img.casualFlatlay],
    fabrics: ["Poplin & voile", "Linen & linen blends", "Tencel™ lyocell", "Canvas & drill", "Ripstop", "Seersucker"],
    finishes: ["Garment wash", "Pigment dye", "Water-repellent finish", "Pleating", "Smocking"],
    moq: "800 pcs per style",
    leadTime: "55–75 days",
    sizes: "XS–4XL",
    styles: [
      { name: "Chambray utility shirt", image: img.shirtChambray, fabric: "Indigo chambray", detail: "Garment washed" },
      { name: "Shirt dress", image: img.denimDress, fabric: "Light denim", detail: "Button-through, belted" },
      { name: "Check wool-look coat", image: img.coatPlaid, fabric: "Brushed woven check", detail: "Fully lined" },
    ],
  },
  {
    slug: "denim-jeans",
    name: "Denim & Jeans",
    short: "Denim",
    tagline: "Authentic washes with modern, responsible processes.",
    description:
      "Five-pocket jeans, jackets and skirts in rigid, comfort-stretch and recycled denim, with laser, ozone and low-water wash technology available through partner laundries.",
    cover: img.denimStack,
    gallery: [img.jeansModel, img.jeansRack, img.jeansStacks, img.denimJacket],
    fabrics: ["Rigid 12–14 oz denim", "Comfort stretch", "Recycled cotton denim", "Selvedge", "Hemp blends"],
    finishes: ["Stone & enzyme wash", "Laser finishing", "Ozone wash", "Rips & repairs", "Tint & overdye"],
    moq: "1,000 pcs per style",
    leadTime: "60–75 days",
    sizes: "Waist 24–44",
    styles: [
      { name: "Slim five-pocket jean", image: img.jeansDark, fabric: "12 oz comfort stretch", detail: "Rinse wash, branded trims" },
      { name: "Distressed straight jean", image: img.jeansModel, fabric: "13.5 oz rigid denim", detail: "Laser rips & repairs" },
      { name: "Trucker denim jacket", image: img.denimJacket, fabric: "12 oz recycled-cotton denim", detail: "Stone wash, shank buttons" },
      { name: "Denim shorts", image: img.denimShorts, fabric: "11 oz denim", detail: "Raw hem, bleach wash" },
    ],
  },
  {
    slug: "jackets-outerwear",
    name: "Jackets & Outerwear",
    short: "Outerwear",
    tagline: "Technical construction with fashion credibility.",
    description:
      "Bombers, coats, puffers, parkas and leather-look jackets with complex linings, seam-sealing and trims — produced in specialised outerwear facilities.",
    cover: img.jacketBomber,
    gallery: [img.jacketLeather, img.coatCamel, img.blazer, img.coatPlaid],
    fabrics: ["Nylon & recycled nylon", "Polyester twill", "Wool blends", "PU & faux leather", "Padding & recycled fill"],
    finishes: ["Seam taping", "DWR coating", "Quilting", "Custom zips & hardware", "Embroidered badges"],
    moq: "500 pcs per style",
    leadTime: "70–90 days",
    sizes: "XS–4XL",
    styles: [
      { name: "Flight bomber jacket", image: img.jacketBomber, fabric: "Recycled nylon twill", detail: "Rib trims, utility pocket" },
      { name: "Biker jacket", image: img.jacketLeather, fabric: "Premium PU leather", detail: "Asymmetric zip, quilted lining" },
      { name: "Tailored wrap coat", image: img.coatCamel, fabric: "Wool-blend melton", detail: "Belted, half-lined" },
      { name: "Unstructured blazer", image: img.blazer, fabric: "Stretch suiting", detail: "Soft shoulder" },
    ],
  },
  {
    slug: "sweaters",
    name: "Sweaters",
    short: "Sweaters",
    tagline: "Seasonal staples with standout yarns.",
    description:
      "Crew necks, cardigans, turtlenecks and vests in 3GG to 14GG — with full-fashioned shaping, yarn-dyed colour palettes and premium hand-feel finishes.",
    cover: img.sweaterOrange,
    gallery: [img.knitRack, img.knitCream, img.knitFlatlay, img.kidsOutfit],
    fabrics: ["Cotton & cotton–cashmere", "Lambswool", "Merino", "Recycled blends", "Mohair-look yarns"],
    finishes: ["Full-fashioned shaping", "Cable & rib", "Garment dye", "Brushed finish", "Contrast tipping"],
    moq: "500 pcs per style",
    leadTime: "60–75 days",
    sizes: "XS–3XL",
    styles: [
      { name: "Relaxed crew sweater", image: img.sweaterOrange, fabric: "7GG cotton blend", detail: "Dropped shoulder" },
      { name: "Merino layers", image: img.knitRack, fabric: "14GG merino", detail: "Fine-gauge, full-fashioned" },
      { name: "Kids' cardigan", image: img.kidsOutfit, fabric: "Soft cotton knit", detail: "Button-through" },
    ],
  },
  {
    slug: "hoodies-sweatshirts",
    name: "Hoodies & Sweatshirts",
    short: "Hoodies",
    tagline: "Fleece programmes built on weight, fit and finish.",
    description:
      "French terry and brushed fleece hoodies, crew sweatshirts and joggers from 280 to 450 GSM — with oversized, boxy and athletic fits developed to your block.",
    cover: img.hoodiesRack,
    gallery: [img.hoodieGrey, img.sweatshirtWhite, img.casualFlatlay2, img.activeTracksuit],
    fabrics: ["French terry", "Brushed back fleece", "Organic cotton fleece", "Recycled polyester blends", "Loopback heavyweight"],
    finishes: ["Puff & high-density print", "Chenille & 3D embroidery", "Acid & pigment wash", "Enzyme wash", "Woven labels"],
    moq: "800 pcs per style",
    leadTime: "50–65 days",
    sizes: "XXS–5XL",
    styles: [
      { name: "Heavyweight hoodie", image: img.hoodieGrey, fabric: "400 GSM loopback", detail: "Double-layer hood" },
      { name: "Crew sweatshirt", image: img.sweatshirtWhite, fabric: "330 GSM brushed fleece", detail: "Ribbed cuffs & hem" },
      { name: "Colour-block hoodie range", image: img.hoodiesRack, fabric: "320 GSM cotton fleece", detail: "Kangaroo pocket" },
    ],
  },
  {
    slug: "trousers-shorts",
    name: "Trousers & Shorts",
    short: "Bottoms",
    tagline: "Chinos, cargos and shorts with consistent fit.",
    description:
      "Chinos, cargo trousers, joggers and shorts produced to graded fit specifications, with attention to waistband construction, pocketing and bar-tack strength.",
    cover: img.casualFlatlay,
    gallery: [img.denimShorts, img.jeansDark, img.casualStripes, img.casualFlatlay2],
    fabrics: ["Cotton twill", "Stretch chino", "Ripstop", "Linen blends", "French terry"],
    finishes: ["Garment dye", "Peached finish", "Elastic & drawcord waists", "Utility hardware"],
    moq: "800 pcs per style",
    leadTime: "55–70 days",
    sizes: "Waist 26–44 · XS–4XL",
    styles: [
      { name: "Stretch chino", image: img.casualFlatlay, fabric: "Cotton–elastane twill", detail: "Slant pockets" },
      { name: "Five-pocket short", image: img.denimShorts, fabric: "Denim & twill", detail: "Bleach & rinse washes" },
      { name: "Weekend trouser", image: img.casualStripes, fabric: "Garment-dyed twill", detail: "Relaxed taper" },
    ],
  },
  {
    slug: "activewear-sportswear",
    name: "Activewear & Sportswear",
    short: "Activewear",
    tagline: "Performance fabrics for movement and comfort.",
    description:
      "Leggings, sports bras, training tops, tracksuits and team kits in moisture-wicking and four-way stretch fabrics, with bonded seams and reflective details.",
    cover: img.activeYoga,
    gallery: [img.activeTracksuit, img.activeFabric, img.teeBlackLogo, img.hoodieGrey],
    fabrics: ["Nylon–spandex", "Recycled polyester interlock", "Mesh", "Brushed peached jersey", "Quick-dry piqué"],
    finishes: ["Bonded & flatlock seams", "Sublimation print", "Reflective print", "Anti-odour finish", "Laser-cut ventilation"],
    moq: "1,000 pcs per style",
    leadTime: "55–70 days",
    sizes: "XXS–4XL",
    styles: [
      { name: "Studio leggings & bra set", image: img.activeYoga, fabric: "Recycled nylon–spandex", detail: "Four-way stretch, high waist" },
      { name: "Track suit", image: img.activeTracksuit, fabric: "Poly tricot", detail: "Piping & taped zip" },
      { name: "Training jogger", image: img.activeFabric, fabric: "Brushed jersey", detail: "Zip pockets" },
    ],
  },
  {
    slug: "kidswear",
    name: "Kidswear",
    short: "Kidswear",
    tagline: "Soft, safe and playful — tested for little ones.",
    description:
      "Babywear, rompers, tees, dresses and outerwear made to children's safety requirements, with OEKO-TEX® inputs, secure trims and pull-test controls.",
    cover: img.kidsFlatlay,
    gallery: [img.kidsOutfit, img.teeWhiteFlat, img.teeBlueHanger, img.knitBeanies],
    fabrics: ["Organic cotton interlock", "Single jersey", "Muslin", "Fleece", "Soft denim"],
    finishes: ["Nickel-free snaps", "Pull-tested trims", "Water-based prints", "Applique & embroidery"],
    moq: "1,000 pcs per style",
    leadTime: "50–65 days",
    sizes: "0–14 years",
    styles: [
      { name: "Printed baby tee", image: img.kidsFlatlay, fabric: "Organic cotton jersey", detail: "Envelope neck" },
      { name: "Kids' knit outfit", image: img.kidsOutfit, fabric: "Cotton knit & twill", detail: "Coordinated set" },
      { name: "Everyday kids tee", image: img.teeBlueHanger, fabric: "160 GSM cotton", detail: "Soft-hand print" },
    ],
  },
  {
    slug: "fashion-casual-wear",
    name: "Fashion & Casual Wear",
    short: "Fashion",
    tagline: "Trend-led collections, delivered with speed.",
    description:
      "Seasonal fashion and lifestyle collections for womenswear and menswear — from co-ords and dresses to capsule wardrobes — with fast sampling for trend-responsive drops.",
    cover: img.fashionTeal,
    gallery: [img.coatPlaid, img.casualMan, img.denimDress, img.rackShowroom],
    fabrics: ["Viscose & modal", "Satin & crepe", "Linen blends", "Jacquards", "Recycled synthetics"],
    finishes: ["Digital print", "Smocking & ruching", "Beading & embellishment", "Lace inserts", "Pleating"],
    moq: "500 pcs per style",
    leadTime: "45–65 days",
    sizes: "XXS–3XL",
    styles: [
      { name: "Statement wide-leg set", image: img.fashionTeal, fabric: "Striped viscose", detail: "Co-ord with crop top" },
      { name: "Check overcoat", image: img.coatPlaid, fabric: "Brushed check", detail: "Oversized silhouette" },
      { name: "Graphic lifestyle tee", image: img.casualMan, fabric: "Washed cotton jersey", detail: "Vintage print" },
      { name: "Denim shirt dress", image: img.denimDress, fabric: "Light Tencel™ denim", detail: "Belted waist" },
    ],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export const allStyles = categories.flatMap((c) =>
  c.styles.map((s) => ({ ...s, category: c.slug, categoryName: c.name })),
);
