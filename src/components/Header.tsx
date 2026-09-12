"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src={site.logoPath}
            alt={site.logoAlt}
            width={site.logoWidth}
            height={site.logoHeight}
            className="h-12 w-auto max-w-[16rem] object-contain sm:h-14 sm:max-w-[20rem]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold tracking-wide ${
                isCurrent(pathname, item.href) ? "text-navy" : "text-navy/75 hover:text-navy"
              }`}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact-us/"
            className="rounded-sm bg-gold px-4 py-2 text-sm font-semibold text-navy hover:bg-gold-deep"
          >
            Discuss Your Project
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-sm border border-navy px-3 py-2 text-sm font-semibold lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-navy/10 px-4 py-4 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-semibold"
                onClick={() => setOpen(false)}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact-us/"
              className="mt-2 inline-flex w-fit rounded-sm bg-gold px-4 py-2 text-sm font-semibold text-navy"
              onClick={() => setOpen(false)}
            >
              Discuss Your Project
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
