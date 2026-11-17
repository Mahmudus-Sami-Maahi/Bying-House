export const INQUIRY_TYPES = ["quotation", "sample", "partnership", "general"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const inquiryLabels: Record<InquiryType, { tab: string; title: string; prompt: string }> = {
  quotation: {
    tab: "Request a quotation",
    title: "Request a quotation",
    prompt: "Describe the styles, fabrics, target price, quantities per style/colour and delivery window.",
  },
  sample: {
    tab: "Request a sample",
    title: "Request a sample",
    prompt: "Tell us which product you would like sampled, your reference or tech pack, and the sample type (proto, fit, salesman).",
  },
  partnership: {
    tab: "Start a partnership",
    title: "Start a sourcing partnership",
    prompt: "Tell us about your business, product categories, annual volumes and what you look for in a sourcing partner.",
  },
  general: {
    tab: "General inquiry",
    title: "Send us a message",
    prompt: "How can we help?",
  },
};
