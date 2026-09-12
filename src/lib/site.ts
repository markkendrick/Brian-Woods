const PRODUCTION_SITE_URL = "https://www.landdevspec.net";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    const withProtocol = /^https?:\/\//i.test(raw)
      ? raw
      : `https://${raw.replace(/^\/+/, "")}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      return PRODUCTION_SITE_URL;
    }
  }
  if (process.env.NODE_ENV === "production") return PRODUCTION_SITE_URL;
  return "http://localhost:3000";
}

export const site = {
  name: "Land Development Specialists LLC",
  shortName: "Land Development Specialists",
  legalName: "Land Development Specialists LLC",
  founder: "Brian Woods",
  description:
    "Plan and manage successful development projects with a trusted land development consultant in Huntington Beach and Los Angeles. Explore professional solutions today!",
  url: resolveSiteUrl(),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "brian@landDevSpec.net",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "(760) 271-1081",
  poBox: "P.O. Box 5833, Huntington Beach, CA 92615",
  locality: "Huntington Beach",
  region: "CA",
  postalCode: "92615",
  country: "US",
  serviceArea: "Southern California",
  logoPath: "/images/brand/logo.jpg",
  logoWidth: 1024,
  logoHeight: 341,
  logoAlt: "Land Developpment Specialist LLC",
  footerLogoPath: "/images/brand/logo-stacked.jpg",
  footerLogoWidth: 1024,
  footerLogoHeight: 341,
  verification: "qt6BZBTht6J8LrOp4nDTJLAqQq7r6KwOOE3vhxvk-JQ",
  analyticsId: "G-ELK6NKXXZY",
};

export function isStagingHost(url = site.url): boolean {
  return /hostingersite\.com|localhost|127\.0\.0\.1/i.test(url);
}

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, `${site.url}/`).toString();
}

function phoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

export function formatPhoneDisplay(phone: string): string {
  const local = phoneDigits(phone);
  if (local.length === 10) {
    return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
  }
  return phone;
}

export function phoneTelHref(phone: string): string {
  const local = phoneDigits(phone);
  if (local.length === 10) return `tel:+1${local}`;
  return local ? `tel:${local}` : "";
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/about-us/", label: "About Us" },
  { href: "/contact-us/", label: "Contact us" },
] as const;
