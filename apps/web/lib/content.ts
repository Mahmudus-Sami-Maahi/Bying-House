import {
  BadgeCheck,
  Boxes,
  ClipboardCheck,
  Compass,
  Droplets,
  Eye,
  Factory,
  FileText,
  Gem,
  Globe,
  Handshake,
  HeartHandshake,
  Layers,
  Leaf,
  MessageCircle,
  Microscope,
  Palette,
  PenTool,
  Recycle,
  Ruler,
  Scissors,
  SearchCheck,
  Shirt,
  Sparkles,
  Sprout,
  SwatchBook,
  Target,
  Truck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { img } from "./images";

/*
 * Editorial content for every page. Figures, testimonials and certification
 * claims below are representative placeholders — review and replace them with
 * MetaMax's verified numbers before launch.
 */

type Item = { icon: LucideIcon; title: string; body: string };

export const nav = [
  {
    label: "Company",
    children: [
      { href: "/about", label: "About Us", description: "Our story, mission and values" },
      { href: "/managing-director", label: "Managing Director", description: "Leadership message & vision" },
      { href: "/sustainability", label: "Sustainability", description: "Responsible sourcing & ethics" },
      { href: "/partnerships", label: "Global Partnerships", description: "Working with international buyers" },
    ],
  },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Collections" },
  { href: "/custom-design", label: "Design & Development" },
  { href: "/manufacturing", label: "Manufacturing & Quality" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: 40, suffix: "+", label: "Partner factories", detail: "Audited knit, woven, denim & sweater units" },
  { value: 2.5, suffix: "M+", decimals: 1, label: "Pieces shipped yearly", detail: "Across fashion, basics and kidswear" },
  { value: 20, suffix: "+", label: "Export markets", detail: "Europe, North America, Asia-Pacific & more" },
  { value: 98, suffix: "%", label: "On-time delivery", detail: "Measured against confirmed ex-factory dates" },
];

export const pillars = [
  "Reliable Apparel Sourcing Partner",
  "Quality-Driven Manufacturing",
  "Custom Apparel Development",
  "Ethical & Responsible Production",
  "Consistent Quality Assurance",
  "Transparent Communication",
  "Long-Term Business Partnerships",
];

export const services: (Item & { slug: string; points: string[] })[] = [
  {
    slug: "apparel-sourcing",
    icon: SearchCheck,
    title: "Apparel Sourcing",
    body: "We match every programme to the right factory from our vetted network — balancing capability, capacity, compliance and cost.",
    points: ["Factory matching by product & price point", "Capacity planning for seasonal peaks", "Competitive FOB costing"],
  },
  {
    slug: "manufacturing-coordination",
    icon: Factory,
    title: "Garment Manufacturing Coordination",
    body: "A single point of contact for every factory involved, so your orders move with one plan, one timeline and one standard.",
    points: ["Multi-factory programme management", "Critical-path & T&A tracking", "Weekly production reporting"],
  },
  {
    slug: "custom-design",
    icon: PenTool,
    title: "Custom Clothing Design",
    body: "Our design team turns mood boards and references into commercial, manufacturable garments that fit your brand DNA.",
    points: ["Trend research & concept boards", "Flat sketches & artwork", "Range planning support"],
  },
  {
    slug: "product-development",
    icon: Sparkles,
    title: "Fashion Product Development",
    body: "From first idea to production-ready style: pattern development, fit refinement and cost engineering in one workflow.",
    points: ["Pattern making & grading", "Fit sessions & comments", "Cost engineering"],
  },
  {
    slug: "fabric-sourcing",
    icon: SwatchBook,
    title: "Fabric Sourcing & Selection",
    body: "Access to spinning, knitting, weaving and dyeing partners for conventional, organic and recycled materials.",
    points: ["Fabric & trim libraries", "Lab dips & strike-offs", "Certified sustainable inputs"],
  },
  {
    slug: "sampling",
    icon: Scissors,
    title: "Sampling & Prototyping",
    body: "Fast, accurate sampling — proto, fit, salesman, size-set and pre-production — so decisions are made on real garments.",
    points: ["Proto samples in 7–10 days", "Salesman sample runs", "Size-set & PP approval"],
  },
  {
    slug: "merchandising",
    icon: Layers,
    title: "Merchandising",
    body: "Experienced merchandisers manage approvals, costing, trims and documentation so nothing falls between the cracks.",
    points: ["Tech pack & BOM management", "Trims & packaging approvals", "Order documentation"],
  },
  {
    slug: "production-management",
    icon: Workflow,
    title: "Production Management",
    body: "On-floor teams follow cutting, sewing, washing and finishing daily, resolving issues before they become delays.",
    points: ["Daily line monitoring", "Bottleneck resolution", "Ex-factory date control"],
  },
  {
    slug: "quality-assurance",
    icon: Microscope,
    title: "Quality Assurance",
    body: "Independent QA at every stage — from fabric inspection to final AQL audit — against your specifications.",
    points: ["Inline & pre-final inspections", "AQL 2.5 final audits", "Measurement & lab testing"],
  },
  {
    slug: "compliance",
    icon: ClipboardCheck,
    title: "Compliance & Factory Auditing",
    body: "We only produce in factories that meet social, safety and environmental standards, and we verify it continuously.",
    points: ["Social & structural audit review", "Corrective action follow-up", "Chemical (RSL/MRSL) management"],
  },
  {
    slug: "shipping",
    icon: Truck,
    title: "Packaging & Shipment Coordination",
    body: "Retail-ready packaging, labelling and logistics coordination to your warehouse — by sea, air or sea-air.",
    points: ["Barcode, hangtag & polybag compliance", "FOB, CIF & DDP terms", "Booking, documents & tracking"],
  },
];

export const process = [
  { step: "01", title: "Inquiry & brief", body: "Share your tech pack, references, target price and quantities. We respond within one business day." },
  { step: "02", title: "Costing & factory match", body: "We propose the best-fit factory, fabric options and a transparent FOB quotation." },
  { step: "03", title: "Development & sampling", body: "Proto and fit samples, lab dips and trims are developed and approved with you." },
  { step: "04", title: "Bulk production", body: "Materials are booked and production runs with daily monitoring and inline QC." },
  { step: "05", title: "Final inspection", body: "Independent AQL audit, measurement checks and packing verification before release." },
  { step: "06", title: "Shipment & aftercare", body: "We coordinate logistics and documents, then review the programme for the next season." },
];

export const standards = [
  { name: "amfori BSCI", note: "Social compliance" },
  { name: "WRAP", note: "Responsible production" },
  { name: "Sedex / SMETA", note: "Ethical trade audits" },
  { name: "OEKO-TEX® 100", note: "Tested for harmful substances" },
  { name: "GOTS", note: "Organic textiles" },
  { name: "GRS", note: "Recycled content" },
  { name: "Better Cotton", note: "Sustainable cotton sourcing" },
  { name: "ISO 9001", note: "Quality management" },
];

export const markets = [
  "United Kingdom",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Scandinavia",
  "Poland",
  "United States",
  "Canada",
  "Australia",
  "Japan",
  "United Arab Emirates",
  "South Africa",
];

export const testimonials = [
  {
    quote:
      "MetaMax brought structure to our Bangladesh programme. Communication is clear, samples arrive on time and bulk quality matches what we approved.",
    name: "Head of Sourcing",
    company: "Fashion retailer, United Kingdom",
  },
  {
    quote:
      "Their team handled fabric development, fit and compliance documentation for our organic basics line. It felt like an extension of our own office.",
    name: "Product Director",
    company: "Sustainable lifestyle brand, Germany",
  },
  {
    quote:
      "We moved our denim and fleece orders to MetaMax two seasons ago. On-time delivery and transparent costing are why we keep growing with them.",
    name: "Import Manager",
    company: "Wholesale apparel importer, Canada",
  },
  {
    quote:
      "Fast proto turnaround and honest feedback on what is achievable at our price point. Exactly what a growing brand needs from a sourcing partner.",
    name: "Founder",
    company: "Streetwear label, Australia",
  },
];

export const values: Item[] = [
  { icon: Gem, title: "Quality without compromise", body: "We measure success by the garments your customers receive, not by the orders we ship." },
  { icon: MessageCircle, title: "Transparent communication", body: "Honest timelines, open costing and proactive updates — good news and bad news alike." },
  { icon: HeartHandshake, title: "Ethical responsibility", body: "Safe workplaces, fair treatment and responsible chemistry are non-negotiable." },
  { icon: Handshake, title: "Long-term partnership", body: "We invest in understanding your brand so every season gets better than the last." },
];

export const whyUs: Item[] = [
  { icon: Users, title: "Your team in Bangladesh", body: "Merchandisers, technicians and QA specialists on the ground, working in your time zone when it matters." },
  { icon: Factory, title: "Vetted factory network", body: "Specialist partners for knit, woven, denim, sweater and outerwear — matched to each order." },
  { icon: BadgeCheck, title: "Quality you can verify", body: "Documented inspections at every stage, with photo reports and AQL results shared with you." },
  { icon: Globe, title: "Export-ready expertise", body: "Experience with retail compliance, labelling, testing and logistics for major global markets." },
  { icon: Target, title: "Competitive, honest pricing", body: "Open-book costing and smart value engineering without cutting corners." },
  { icon: Compass, title: "Design-led thinking", body: "We bring ideas to the table — fabrics, finishes and styles that elevate your range." },
];

export const customDesign: Item[] = [
  { icon: PenTool, title: "Custom apparel design", body: "Original designs developed around your brand identity, target customer and price architecture." },
  { icon: Compass, title: "Fashion concept development", body: "Trend direction, mood boards and capsule concepts translated into commercial ranges." },
  { icon: SwatchBook, title: "Fabric & material selection", body: "Curated fabric options with hand-feel swatches, test reports and sustainability credentials." },
  { icon: Palette, title: "Colour customisation", body: "Pantone-matched lab dips, yarn-dyed palettes and colour-fastness verified for your market." },
  { icon: Sparkles, title: "Print, embroidery & embellishment", body: "Screen, digital, puff and foil prints; flat, 3D and chenille embroidery; beading and applique." },
  { icon: Ruler, title: "Custom sizing & specifications", body: "Graded size charts, fit blocks and tolerances engineered to your customers' body profiles." },
  { icon: FileText, title: "Tech packs & design development", body: "Complete tech packs with flats, BOM, construction details and measurement specs." },
  { icon: Shirt, title: "Sampling & prototype presentation", body: "Physical or virtual sample presentations with fit comments and improvement suggestions." },
  { icon: Boxes, title: "Private-label & OEM solutions", body: "Your brand, your labels, your packaging — produced end-to-end under your name." },
];

export const manufacturing: Item[] = [
  { icon: Shirt, title: "Knit & circular knitting", body: "Tees, polos, fleece and activewear from vertically integrated knit composites." },
  { icon: Layers, title: "Woven & shirting", body: "Shirts, bottoms, dresses and utility wovens with precision cutting and finishing." },
  { icon: Droplets, title: "Denim & washing", body: "Laser, ozone and eco-wash laundries for authentic, lower-impact denim." },
  { icon: Sparkles, title: "Sweater & flat knitting", body: "Computerised flat-knitting from 3GG to 14GG with linking and hand finishing." },
  { icon: Factory, title: "Outerwear & technical", body: "Padded, seam-sealed and multi-layer constructions in specialised facilities." },
  { icon: Eye, title: "Print, embroidery & wash", body: "In-house and partner print, embroidery and garment-wash units for added value." },
];

export const qualitySteps = [
  { title: "Fabric inspection", body: "4-point system inspection, shade banding and shrinkage testing before cutting." },
  { title: "Pre-production meeting", body: "Approved samples, specs and risks reviewed with factory management and line supervisors." },
  { title: "Inline inspection", body: "Daily checks on sewing lines catch workmanship and measurement issues early." },
  { title: "Pre-final audit", body: "Inspection at 80% packing to confirm quality, measurement and packaging accuracy." },
  { title: "Final AQL inspection", body: "Random sampling to AQL 2.5 (or your standard) with full photo report before shipment." },
  { title: "Lab testing", body: "Third-party testing for colour-fastness, dimensional stability, pilling and chemicals." },
];

export const sustainability: (Item & { image: string })[] = [
  { icon: Leaf, title: "Responsible sourcing", body: "We prioritise mills and factories with credible environmental and social certifications, and we trace inputs to origin where possible.", image: img.fabricRolls },
  { icon: Recycle, title: "Sustainable fabrics", body: "Organic and Better Cotton, recycled polyester and nylon, Tencel™, linen and hemp — offered as standard options, not exceptions.", image: img.whiteTextile },
  { icon: Droplets, title: "Eco-conscious production", body: "Low-water washing, laser and ozone denim finishing, and factories investing in solar power and effluent treatment.", image: img.jeansStacks },
  { icon: HeartHandshake, title: "Ethical labour practices", body: "Safe buildings, fair wages, regulated hours and freedom of association — verified through recognised audit programmes.", image: img.sewingWoman },
  { icon: Sprout, title: "Environmental responsibility", body: "Chemical management aligned with ZDHC MRSL, waste reduction in cutting rooms and consolidated shipments to cut emissions.", image: img.fabricSorting },
];

export const partnership: Item[] = [
  { icon: Users, title: "International buyers & sourcing partners", body: "We work with brands, retailers, wholesalers, importers and sourcing offices — as a direct partner or an extension of your team." },
  { icon: Globe, title: "Global market experience", body: "Product, labelling and testing requirements for Europe, the UK, North America, Australia, Japan and the Middle East." },
  { icon: Truck, title: "Worldwide shipment coordination", body: "Sea, air and sea-air solutions with trusted forwarders, from FOB Chattogram to DDP at your door." },
  { icon: Handshake, title: "Long-term partnership approach", body: "Season-on-season reviews, joint planning and continuous improvement — not one-off transactions." },
  { icon: Boxes, title: "B2B collaboration opportunities", body: "Private label, OEM programmes, capsule collaborations and agency partnerships for overseas offices." },
];

export const mdMessage = {
  headline: "“Every garment we ship carries our name and your reputation. We treat both with the same care.”",
  paragraphs: [
    "When international brands look to Bangladesh, they are looking for more than capacity. They need a partner who understands their customers, respects their standards and communicates with complete honesty. That is the partner MetaMax Fashions was built to be.",
    "Our role is to make sourcing simple for our clients. We bring the right factories, materials and people together, and we stay accountable from the first sketch to the final shipment. When something is not right, we say so early — and we fix it.",
    "Bangladesh's apparel industry has transformed itself into one of the safest and most capable manufacturing bases in the world. Our commitment is to help our partners benefit from that progress while pushing further on quality, sustainability and fair treatment of every worker in our supply chain.",
    "I personally invite you to visit us in Dhaka, meet our team and see our partner factories. I am confident you will find a company that is ready to grow with you for many seasons to come.",
  ],
  philosophy: [
    { title: "Integrity first", body: "Commitments are only made when they can be kept." },
    { title: "Close to the floor", body: "Leadership stays involved in production, not just meetings." },
    { title: "People make quality", body: "Investing in skilled, respected teams creates better garments." },
    { title: "Think in seasons, not orders", body: "Every decision is made with the long-term partnership in mind." },
  ],
  vision:
    "To be the most trusted sourcing partner for international fashion brands in South Asia — known for consistent quality, responsible production and the kind of transparency that turns suppliers into partners.",
};
