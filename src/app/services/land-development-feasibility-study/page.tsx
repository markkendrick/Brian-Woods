import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { feasibilityFaqs, pages } from "@/data/content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const page = pages.find(
  (item) => item.path === "/services/land-development-feasibility-study/",
)!;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function FeasibilityPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            {
              name: "Land Development Feasibility Study",
              path: page.path,
            },
          ]),
          serviceSchema({
            name: "Land Development Feasibility Study",
            description: page.description,
            path: page.path,
          }),
          faqSchema(feasibilityFaqs),
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
            Find out whether a property can support the homes or apartments you
            have in mind before you buy
          </p>
          <p className="mt-5 max-w-3xl text-navy/80">
            {site.name} reviews land in Riverside County and across Southern
            California before a purchase or a design commitment. The work covers
            permitted use, access, utilities, drainage, soils, environmental
            concerns, expected approvals, and total development costs, then tests
            whether the intended product fits the site and the market.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold">
            What to check before buying land
          </h2>
          <p className="mt-4 text-navy/80">
            Zoning or an advertised unit count is not enough. We check permitted
            use, legal access, title restrictions, boundaries, utilities,
            drainage, soils, environmental concerns, expected approvals, and
            total development costs.
          </p>
          <p className="mt-4 text-navy/80">
            The proposed product also needs to fit the local market. For
            apartments, that means achievable rents and the level of finish
            renters expect. For homes, it means likely selling prices and the
            quality buyers expect at those prices.
          </p>
          <p className="mt-4 text-navy/80">
            Those factors help determine whether the development costs and
            potential income support the purchase.
          </p>
        </div>
        <Image
          src="/images/library/dolfina-drone-shot-2-29-24.jpg"
          alt="Dolfina site during mass grading and pad work"
          width={1600}
          height={903}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-auto w-full rounded-sm object-cover"
        />
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            What an initial feasibility review includes
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            An initial review needs parcel records, the intended housing product,
            planning rules, available site studies, utility information, a
            preliminary lot or unit count, cost assumptions, and a proposed
            schedule. When detailed plans are not yet available, site visits,
            mapping, utility inquiries, and a preliminary street, sewer, water,
            and storm-drain layout support an initial cost range. The write-up
            should distinguish verified information from estimates, name missing
            information, and explain which findings could change the result.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            <li className="rounded-sm border border-navy/10 bg-cream p-6">
              <h3 className="font-display text-xl font-semibold">
                Homes
              </h3>
              <p className="mt-3 text-navy/80">
                Review land-use rules, usable acreage, road and emergency access,
                utilities, drainage, and ground conditions. Then test a layout
                and prepare an initial cost range. Simply dividing acreage by the
                minimum lot size can give a misleading count.
              </p>
            </li>
            <li className="rounded-sm border border-navy/10 bg-cream p-6">
              <h3 className="font-display text-xl font-semibold">
                Apartments
              </h3>
              <p className="mt-3 text-navy/80">
                Review allowed use and density, then test building placement,
                parking, circulation, open space, utilities, and fire access.
                Parking, EV charging, and stormwater storage can consume space
                and cost. Permission to build apartments does not, by itself,
                make the project financially workable.
              </p>
            </li>
            <li className="rounded-sm border border-navy/10 bg-cream p-6">
              <h3 className="font-display text-xl font-semibold">
                Residual land value
              </h3>
              <p className="mt-3 text-navy/80">
                Starting with the expected value of the finished lots, we account
                for development costs, fees, financing, and the required return
                to determine what the project can support paying for the land. A
                low asking price is not a good deal if the improvements consume
                that value.
              </p>
            </li>
            <li className="rounded-sm border border-navy/10 bg-cream p-6">
              <h3 className="font-display text-xl font-semibold">
                Written risk assessment
              </h3>
              <p className="mt-3 text-navy/80">
                Acquisition support includes site screening, consultant
                coordination, preliminary cost analysis, schedule review, and a
                written assessment of development risks, including where further
                investigation is needed.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Purchase price, full costs, and off-site work
        </h2>
        <p className="mt-4 max-w-3xl text-navy/80">
          We compare the purchase price with the full cost of approvals, site
          improvements, building construction, financing, and carrying the
          project through completion. As improvement costs increase, the residual
          value available for the land generally decreases. A seller’s price may
          not reflect those costs.
        </p>
        <p className="mt-4 max-w-3xl text-navy/80">
          Beyond the land, the model should include consultants, entitlements,
          permits, agency fees, utility charges, off-site improvements, grading,
          environmental work, construction, financing, taxes, insurance, and
          contingency. For homes or apartments, include building costs and
          selling expenses or lease-up costs.
        </p>
        <p className="mt-4 max-w-3xl text-navy/80">
          Off-site roads, drainage, and utilities can add substantial cost and
          may depend on agency approvals, property rights, or agreements with
          other owners. Agency conditions of approval can also create off-site
          obligations. Those items affect both feasibility and what the buyer can
          afford to pay for the land.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Image
          src="/images/library/360-3268.jpg"
          alt="Hillside residential tract under grading, showing how terrain affects usable land"
          width={1600}
          height={1066}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-auto w-full rounded-sm object-cover"
        />
        <div>
          <h2 className="font-display text-3xl font-semibold">
            Constraints that change the purchase
          </h2>
          <p className="mt-4 text-navy/80">
            Flatter land is generally easier to develop. Greater elevation
            changes can require more grading and retaining walls while reducing
            space for buildings. A nearby utility line does not guarantee a
            connection or available capacity.
          </p>
          <p className="mt-4 text-navy/80">
            Further investigation may be needed for uncertain access,
            contamination, undocumented fill, steep terrain, or limited utility
            capacity. Walking away may be appropriate when essential access
            cannot be secured, the intended use lacks a practical approval path,
            or development costs exceed what the project can support.
          </p>
          <p className="mt-4 text-navy/80">
            If the land can support a subdivision, the next step is often{" "}
            <Link
              href="/services/residential-subdivision-development/"
              className="font-semibold underline underline-offset-4"
            >
              residential subdivision development
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            What we need to start
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            Address, parcel number, acreage, ownership or purchase status,
            intended use, target schedule, and available budget. Surveys, title
            documents, plans, utility information, agency correspondence, and
            previous studies help if they exist. If a tentative map has been
            prepared, there may already be soils, drainage, and sewer and water
            studies. Raw land may have much less. Reviewing what exists helps
            identify gaps and avoid repeating work.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Letter of intent, due diligence, and what you receive
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            During the letter of intent stage we identify the development
            assumptions, information needs, and investigation time the buyer
            should consider, then prepare a list of issues to resolve. That list
            helps set due-diligence scope, consultants, and a realistic review
            period.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            During due diligence we use a checklist for each issue, consultant,
            report, cost, and deadline, plus an initial budget. Potential deal
            breakers come first: legal access, intended use, major site hazards,
            utility capacity, and unusually expensive improvements. Long-lead
            studies start promptly. Review meetings happen before the buyer has
            to make a contractual decision.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            At the end of an acquisition review the client receives a site
            summary, preliminary concept findings, cost and schedule ranges, key
            risks, unresolved questions, recommended next steps, and the
            consultant reports needed for the main concerns. The purpose is a
            clear basis to proceed, investigate further, reconsider the terms, or
            stop.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            A promising opportunity has a practical approval path, workable
            infrastructure, realistic costs, and homes or apartments the market
            can support. If a project depends on rising future prices or rents to
            become profitable, that needs to be clearly understood.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <FaqList items={feasibilityFaqs} />
        </div>
      </section>

      <CtaBand
        title="Need a feasibility review before you buy?"
        body="Share the address or parcel number, the intended homes or apartments, and any studies you already have. We will tell you what can be checked now and what still needs investigation."
      />
    </>
  );
}
