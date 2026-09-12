import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { pages } from "@/data/content";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatPhoneDisplay, phoneTelHref, site } from "@/lib/site";

const page = pages[2];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function ContactPage() {
  const phone = formatPhoneDisplay(site.phone);
  const tel = phoneTelHref(site.phone);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact us", path: "/contact-us/" },
        ])}
      />

      <section className="border-b border-navy/10 bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg text-navy/80">
            Tell us where the project stands, what has already been completed, and
            where you need support.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold">Reach us directly</h2>
          <ul className="mt-6 space-y-3 text-navy/85">
            <li>
              Telephone:{" "}
              <a className="font-semibold underline underline-offset-4" href={tel}>
                {phone}
              </a>
            </li>
            <li>
              Email:{" "}
              <a className="font-semibold underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>Address: {site.poBox}</li>
          </ul>
          <p className="mt-6 text-sm text-navy/70">
            The mailing address is a post office box in Huntington Beach. It is
            not presented as a staffed office.
          </p>
        </div>
        <div className="rounded-sm border border-navy/10 bg-paper p-6 sm:p-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
