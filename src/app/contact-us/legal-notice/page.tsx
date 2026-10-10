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

        <h2 className="mt-10 font-display text-2xl font-semibold">Company</h2>
        <p className="mt-3 text-navy/85">{site.legalName}</p>

        <h2 className="mt-8 font-display text-2xl font-semibold">Mailing address</h2>
        <p className="mt-3 text-navy/85">{site.poBox}</p>

        <h2 className="mt-8 font-display text-2xl font-semibold">Email</h2>
        <p className="mt-3 text-navy/85">{site.email}</p>

        <h2 className="mt-8 font-display text-2xl font-semibold">Phone</h2>
        <p className="mt-3 text-navy/85">{site.phone}</p>
      </article>
    </>
  );
}
