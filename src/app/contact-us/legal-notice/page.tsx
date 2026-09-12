import { JsonLd } from "@/components/JsonLd";
import { pages } from "@/data/content";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const page = pages[4];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function LegalNoticePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact us", path: "/contact-us/" },
          { name: "Legal Notice", path: "/contact-us/legal-notice/" },
        ])}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-semibold">{page.h1}</h1>
        <p className="mt-6 text-sm text-navy/65">
          The live legal page used unfilled theme placeholders. Those headings
          are preserved. Verified business details are shown where they exist.
          Business ID, VAT, and regulatory-authority numbers were not published
          on the current site and are not invented here.
        </p>

        <h2 className="mt-10 font-display text-2xl font-semibold">Name of company</h2>
        <p className="mt-3 text-navy/85">{site.legalName}</p>

        <h2 className="mt-8 font-display text-2xl font-semibold">Registered office</h2>
        <p className="mt-3 text-navy/85">{site.poBox}</p>

        <h2 className="mt-8 font-display text-2xl font-semibold">Contact details</h2>
        <p className="mt-3 text-navy/85">
          {site.email}
          <br />
          {site.phone}
        </p>

        <h2 className="mt-8 font-display text-2xl font-semibold">Business ID no.</h2>
        <p className="mt-3 text-navy/85">Not published on the current website.</p>

        <h2 className="mt-8 font-display text-2xl font-semibold">VAT no.</h2>
        <p className="mt-3 text-navy/85">Not published on the current website.</p>

        <h2 className="mt-8 font-display text-2xl font-semibold">Regulatory authority</h2>
        <p className="mt-3 text-navy/85">Not published on the current website.</p>
      </article>
    </>
  );
}
