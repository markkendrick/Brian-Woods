import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { pages, services } from "@/data/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const page = pages[5];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
          ]),
          serviceSchema({
            name: "Land Development Services",
            description: page.description,
            path: page.path,
          }),
        ]}
      />

      <section className="border-b border-navy/10 bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-3xl text-lg text-navy/80">
            Dedicated service pages cover feasibility and due diligence,
            residential subdivision development, and land development project
            management. The topics below are the service areas described across
            the site.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ul className="grid gap-6">
          {services.map((service) => (
            <li key={service.title} className="rounded-sm border border-navy/10 bg-paper p-6">
              <h2 className="font-display text-2xl font-semibold">{service.title}</h2>
              <p className="mt-3 max-w-3xl text-navy/80">{service.summary}</p>
              <Link
                href={service.href}
                className="mt-4 inline-block font-semibold underline underline-offset-4"
              >
                {service.href === "/services/land-development-project-management/"
                  ? "Open the project management page"
                  : service.href === "/services/residential-subdivision-development/"
                    ? "Open the subdivision page"
                    : service.href === "/services/land-development-feasibility-study/"
                      ? "Open the feasibility page"
                      : "Discuss this service"}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Need help with one phase or the full process?"
        body="We can support acquisition review, approvals, value engineering, or construction coordination without requiring involvement in every phase."
      />
    </>
  );
}
