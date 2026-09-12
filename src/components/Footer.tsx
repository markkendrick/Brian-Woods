import Image from "next/image";
import Link from "next/link";
import { formatPhoneDisplay, nav, phoneTelHref, site } from "@/lib/site";

export function Footer() {
  const phone = formatPhoneDisplay(site.phone);
  const tel = phoneTelHref(site.phone);

  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src={site.footerLogoPath}
            alt={site.logoAlt}
            width={site.footerLogoWidth}
            height={site.footerLogoHeight}
            className="h-28 w-auto max-w-[18rem] rounded-sm bg-cream object-contain p-2"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/85">
            {site.name} works with developers and landowners through acquisition,
            approvals, permitting, value engineering, and construction management.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="underline decoration-gold/50 underline-offset-2 hover:decoration-gold" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="underline decoration-gold/50 underline-offset-2 hover:decoration-gold" href="/services/land-development-project-management/">
                Land Development Project Management
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/90">
            <li>
              <a href={tel} className="underline decoration-gold/50 underline-offset-2 hover:decoration-gold">
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="underline decoration-gold/50 underline-offset-2 hover:decoration-gold">
                {site.email}
              </a>
            </li>
            <li>{site.poBox}</li>
          </ul>
          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <Link className="underline decoration-gold/50 underline-offset-2 hover:decoration-gold" href="/contact-us/privacy-policy/">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="underline decoration-gold/50 underline-offset-2 hover:decoration-gold" href="/contact-us/legal-notice/">
                Legal Notice
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15 px-4 py-4 text-center text-xs text-cream/70">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
