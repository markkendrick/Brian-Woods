import type { MetadataRoute } from "next";
import { isStagingHost, toAbsoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (isStagingHost()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: toAbsoluteUrl("/sitemap.xml"),
  };
}
