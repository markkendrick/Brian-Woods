import type { Metadata } from "next";
import { site, toAbsoluteUrl } from "./site";

const shareImage = {
  url: toAbsoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: `${site.name} — land development consulting`,
};

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = toAbsoluteUrl(path);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}
