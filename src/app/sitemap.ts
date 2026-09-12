import type { MetadataRoute } from "next";
import { pages } from "@/data/content";
import { isStagingHost, toAbsoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isStagingHost()) return [];

  return pages.map((page) => ({
    url: toAbsoluteUrl(page.path),
    changeFrequency: "monthly",
    priority: page.path === "/" ? 1 : 0.7,
  }));
}
