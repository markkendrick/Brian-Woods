import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { pages, subdivisionFaqs } from "@/data/content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const page = pages.find(
  (item) => item.path === "/services/residential-subdivision-development/",
)!;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function SubdivisionPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            {
              name: "Residential Subdivision Development",
              path: page.path,
            },
          ]),
          serviceSchema({
            name: "Residential Subdivision Development",
            description: page.description,
            path: page.path,
          }),
          faqSchema(subdivisionFaqs),
        ]}
      />

      <section className="border-b border-navy/10 bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-deep">
            Services
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-xl font-medium">
            Turn a parcel into lots, streets, and building areas that can support
            homes
          </p>
          <p className="mt-5 max-w-3xl text-navy/80">
            {site.name} helps landowners and builders in Riverside County and
            across Southern California develop residential subdivisions. The work
            covers what can be built, the approvals required, and the roads,
            drainage, utilities, and finished lots needed so home construction
            can start in sequence.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold">
            Subdivisions that match this experience
          </h2>
          <p className="mt-4 text-navy/80">
            Brian Woods has more than 40 years of residential subdivision
            experience, including hillside properties, lowland sites, drainage
            challenges, and difficult rock conditions.
          </p>
          <p className="mt-4 text-navy/80">
            The work that fits this practice includes individual residential
            lots, subdivisions of 50 to 200 lots, larger home communities, and
            master-planned communities of about 1,000 to 2,000 homes. Across that
            career, more than 13,000 residential lots and more than eight master
            plans have been part of the work. About 6,000 of those lots were
            inside master-planned communities.
          </p>
          <p className="mt-4 text-navy/80">
            A major part of subdivision work is delivering finished lots in the
            right sequence so builders can begin homes and meet their construction
            schedules.
          </p>
        </div>
        <Image
          src="/images/library/windsong-skylar-177-lots-min-4500-5500-sf.jpg"
          alt="Windsong-Skylar graded residential subdivision with 177 lots"
          width={1600}
          height={879}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-auto w-full rounded-sm object-cover"
        />
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            What subdivision development includes
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            Land development prepares the land and infrastructure. Building
            construction creates the homes. Those two parts have to be
            coordinated from the beginning.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            <li className="rounded-sm border border-navy/10 bg-cream p-6">
              <h3 className="font-display text-xl font-semibold">
                Planning and entitlements
              </h3>
              <p className="mt-3 text-navy/80">
                Study what can be built, process entitlements, and work with
                agencies on conditions that affect cost and responsibility.
              </p>
            </li>
            <li className="rounded-sm border border-navy/10 bg-cream p-6">
              <h3 className="font-display text-xl font-semibold">
                Design coordination
              </h3>
              <p className="mt-3 text-navy/80">
                Work with civil engineers and other consultants on a practical,
                functional, and cost-effective design. Value engineering reviews
                the design and construction approach to reduce costs without
                losing function or quality.
              </p>
            </li>
            <li className="rounded-sm border border-navy/10 bg-cream p-6">
              <h3 className="font-display text-xl font-semibold">
                Infrastructure
              </h3>
              <p className="mt-3 text-navy/80">
                Prepare roads, drainage, utilities, and building areas. A combined
                utility plan—sometimes called a utility furniture exhibit—is used
                to coordinate sewer, water, storm drains, dry utilities, lighting,
                and EV charging where included.
              </p>
            </li>
            <li className="rounded-sm border border-navy/10 bg-cream p-6">
              <h3 className="font-display text-xl font-semibold">
                Finished-lot delivery
              </h3>
              <p className="mt-3 text-navy/80">
                Connect site work to home construction through lot readiness,
                foundations, utility connections, utility activation, and a
                schedule builders can use.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Image
          src="/images/library/citrus-summit-drone-8-1-24.jpg"
          alt="Citrus Summit residential tract with streets, pads, and homes under construction"
          width={1600}
          height={852}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-auto w-full rounded-sm object-cover"
        />
        <div>
          <h2 className="font-display text-3xl font-semibold">
            When to bring this work in
          </h2>
          <p className="mt-4 text-navy/80">
            The best time is usually before purchasing the land or committing to
            a specific design. At that stage we can help evaluate the proposed
            homes, infrastructure needs, development fees, and other major costs.
          </p>
          <p className="mt-4 text-navy/80">
            We can also join during planning and approvals, before construction,
            or after a project has run into rising costs, missed deadlines,
            incomplete bids, utility delays, or plans that are difficult to
            build.
          </p>
          <p className="mt-4 text-navy/80">
            Related coordination is covered on{" "}
            <Link
              href="/services/land-development-project-management/"
              className="font-semibold underline underline-offset-4"
            >
              land development project management
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Decisions that change cost and time
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            Building density, street layout, grading, retaining walls, utility
            extensions, and parking can strongly affect total cost. On hillside
            or rocky sites, the amount and type of rock matters. Long off-site
            extensions for sewer, water, storm drains, or dry utilities can
            become major expenses if connection points are not identified early.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            Approvals, CEQA, utility coordination, material lead times, and owner
            decisions affect the schedule. Potholing existing utilities before
            connecting can prevent unexpected redesign during construction.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            Subdivisions may require two separate access routes. Emergency
            vehicle access can change entrances, street layout, gates, and
            construction phases. Those requirements should be confirmed early
            with the reviewing agencies and the fire authority.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            Site planning arranges buildings, roads, parking, utilities,
            drainage, and open space inside the property’s limits. A constraints
            map shows environmental areas, easements, setbacks, slopes, and
            drainage features so the remaining land can be tested for streets,
            lots, and buildings.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            Before a builder treats a lot as ready, the team should verify
            approved plans, pad elevations, geotechnical acceptance, access,
            drainage, required utility availability, inspection status, and
            construction-stage stormwater protections.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <FaqList items={subdivisionFaqs} />
        </div>
      </section>

      <CtaBand
        title="Need help developing land into a housing community?"
        body="Tell us where the property stands, what has already been completed, and whether you need help before a purchase, during approvals, or on an active subdivision."
      />
    </>
  );
}
