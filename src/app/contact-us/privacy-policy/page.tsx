import { JsonLd } from "@/components/JsonLd";
import { pages } from "@/data/content";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const page = pages[3];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact us", path: "/contact-us/" },
          { name: "Privacy Policy", path: "/contact-us/privacy-policy/" },
        ])}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-semibold">{page.h1}</h1>
        <p className="mt-6 text-sm text-navy/65">
          The live page used theme placeholder labels. Those labels are kept
          below, followed by the current business details that replace the empty
          fields.
        </p>

        <h2 className="mt-10 font-display text-2xl font-semibold">Data Controller</h2>
        <p className="mt-3 text-navy/85">{site.name}</p>

        <h2 className="mt-8 font-display text-2xl font-semibold">Collected Personal Data</h2>
        <p className="mt-3 text-navy/85">
          Name, email address, phone number when provided, and the message
          submitted through the contact form.
        </p>

        <h2 className="mt-8 font-display text-2xl font-semibold">Purpose of collecting data</h2>
        <p className="mt-3 text-navy/85">
          To respond to project inquiries and related follow-up. Contact details:
          {site.email}, {site.phone}, {site.poBox}.
        </p>
      </article>
    </>
  );
}
