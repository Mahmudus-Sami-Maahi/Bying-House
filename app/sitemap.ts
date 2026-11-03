import type { MetadataRoute } from "next";
import { categories } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/custom-design", priority: 0.8, changeFrequency: "monthly" },
    { path: "/manufacturing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/managing-director", priority: 0.6, changeFrequency: "yearly" },
    { path: "/sustainability", priority: 0.7, changeFrequency: "monthly" },
    { path: "/partnerships", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), priority: p.priority, changeFrequency: p.changeFrequency })),
    ...categories.map((c) => ({
      url: absoluteUrl(`/products/${c.slug}`),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];
}
