import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { pages } from "@/data/content";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const page = pages[1];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us/" },
        ])}
      />

      <section className="border-b border-navy/10 bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-deep">
            About
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-3xl text-lg text-navy/80">
            Professionals in land development, working with tracts and large
            master-planned communities.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold">
            Professionals in Land Development
          </h2>
          <p className="mt-5 text-navy/85">
            At {site.name}, we bring more than 40 years of hands-on experience in
            the real estate development sector. On tracts or large master plans.
          </p>
          <p className="mt-4 text-navy/85">
            We assist clients through land acquisition, entitlements, and
            construction. Value engineering reviews the design and construction
            approach to reduce costs while keeping the project’s function and
            quality.
          </p>
          <p className="mt-4 text-navy/85">
            Brian Woods leads the work. His career began in England with a degree
            in civil and structural design. He moved to Southern California in
            1982. The work since then includes more than 13,000 residential lots,
            more than eight master-planned communities, and a California Class A
            General Engineering Contractor license. About 20 years of that
            career were in senior leadership with public builders, including
            Vice President-level land development roles with D.R. Horton,
            Foremost Communities, Pulte/Del Webb, and Richmond American Homes.
          </p>
          <Link
            href="/services/"
            className="mt-6 inline-block font-semibold underline underline-offset-4"
          >
            Review services
          </Link>
        </div>
        <div className="grid gap-4">
          <Image
            src="/images/projects/graded-lots.jpg"
            alt="Aerial view of graded residential pads, new roads, and a hillside development"
            width={1024}
            height={1024}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full rounded-sm object-cover"
          />
          <Image
            src="/images/projects/about-2.jpg"
            alt="Aerial view of earthwork and infrastructure on a large land development site"
            width={768}
            height={768}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full rounded-sm object-cover"
          />
        </div>
      </section>

      <CtaBand
        title="Need assistance to develop your land?"
        body="Let our expertise assist you in any phase of land development. With decades of experience, we're here to make your project a success."
      />
    </>
  );
}
