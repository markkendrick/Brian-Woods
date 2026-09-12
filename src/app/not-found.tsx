import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-deep">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 max-w-xl text-navy/80">
        That address is not part of this website. Use the links below to continue.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-navy">
          Home
        </Link>
        <Link href="/contact-us/" className="rounded-sm border border-navy px-5 py-3 text-sm font-semibold">
          Contact us
        </Link>
      </div>
    </section>
  );
}
