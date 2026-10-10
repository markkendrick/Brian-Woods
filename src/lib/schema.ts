import { site, toAbsoluteUrl } from "./site";

export function organizationId(): string {
  return `${site.url.replace(/\/$/, "")}/#organization`;
}

export function personId(): string {
  return `${site.url.replace(/\/$/, "")}/#brian-woods`;
}

function schemaTelephone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const local = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (local.length === 10) {
    return `+1-${local.slice(0, 3)}-${local.slice(3, 6)}-${local.slice(6)}`;
  }
  return phone;
}

const southernCaliforniaCounties = [
  { "@type": "AdministrativeArea", "name": "Orange County, California" },
  { "@type": "AdministrativeArea", "name": "Riverside County, California" },
  { "@type": "AdministrativeArea", "name": "Los Angeles County, California" },
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId(),
    name: site.name,
    url: toAbsoluteUrl("/"),
    telephone: schemaTelephone(site.phone),
    email: site.email,
    slogan: "Transforming Land Into Thriving Communities",
    description:
      "Land development consulting for developers, homebuilders, and landowners in Southern California: acquisition due diligence and feasibility, residential entitlements (CEQA, mapping), subdivision development, value engineering, construction management, and project management.",
    address: {
      "@type": "PostalAddress",
      postOfficeBoxNumber: "5833",
      addressLocality: site.locality,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    areaServed: southernCaliforniaCounties,
    knowsAbout: [
      "Land development consulting",
      "Land acquisition due diligence",
      "Land development feasibility studies",
      "Residual land value",
      "Residential land entitlements",
      "CEQA review coordination",
      "Tentative tract maps",
      "Conditions of approval",
      "Residential subdivision development",
      "Master-planned communities",
      "Value engineering",
      "Construction management",
      "Land development project management",
    ],
    founder: { "@id": personId() },
    employee: { "@id": personId() },
    logo: toAbsoluteUrl(site.logoPath),
    image: toAbsoluteUrl(site.logoPath),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(),
    name: site.founder,
    jobTitle: site.jobTitle,
    worksFor: { "@id": organizationId() },
    url: toAbsoluteUrl("/about-us/"),
    description:
      "Principal of Land Development Specialists LLC. More than 40 years in land development, including VP-level land development roles with D.R. Horton, Foremost Communities, Pulte/Del Webb, and Richmond American Homes. More than 13,000 residential lots and 8+ master plans.",
    knowsAbout: [
      "Land development",
      "Residential entitlements",
      "Master-planned communities",
      "Value engineering",
      "Construction management",
      "Subdivision infrastructure",
    ],
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
  serviceType,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string | string[];
  areaServed?: { "@type": string; name: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    ...(serviceType ? { serviceType } : {}),
    description,
    url: toAbsoluteUrl(path),
    provider: { "@id": organizationId() },
    areaServed: areaServed ?? [{ "@type": "Place", name: "Southern California" }],
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
