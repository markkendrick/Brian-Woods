import { site, toAbsoluteUrl } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: toAbsoluteUrl("/"),
    email: site.email,
    telephone: site.phone,
    founder: {
      "@type": "Person",
      name: site.founder,
    },
    address: {
      "@type": "PostalAddress",
      postOfficeBoxNumber: "5833",
      addressLocality: site.locality,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    areaServed: site.serviceArea,
    logo: toAbsoluteUrl(site.logoPath),
    image: toAbsoluteUrl(site.logoPath),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: toAbsoluteUrl("/"),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: toAbsoluteUrl(path),
    provider: {
      "@type": "Organization",
      name: site.name,
      url: toAbsoluteUrl("/"),
    },
    areaServed: site.serviceArea,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
