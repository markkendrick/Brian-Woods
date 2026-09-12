import Link from "next/link";

export function CtaBand({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold">{title}</h2>
          <p className="mt-4 text-cream/85">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact-us/"
            className="rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-navy hover:bg-gold-deep"
          >
            Discuss Your Project
          </Link>
          <Link
            href="/contact-us/"
            className="rounded-sm border border-cream px-5 py-3 text-sm font-semibold text-cream hover:bg-cream/10"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
