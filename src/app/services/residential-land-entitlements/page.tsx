import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { entitlementFaqs, pages } from "@/data/content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const page = pages.find(
  (item) => item.path === "/services/residential-land-entitlements/",
)!;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

const coordination = [
  {
    title: "Application planning",
    summary:
      "Set the intended project, the reviewing agencies, and the studies and submittals those agencies require.",
  },
  {
    title: "Comment responses",
    summary:
      "Log each agency comment, assign it, and send back one coordinated package after checking the other drawings and reports.",
  },
  {
    title: "Conditions of approval",
    summary:
      "Turn each condition into an action, a responsible party, an estimated cost, and the milestone when it has to be done.",
  },
  {
    title: "Constructability review",
    summary:
      "Review plans for coordination, quality, and how the improvements will actually be built.",
  },
];

export default function ResidentialLandEntitlementsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "Residential Land Entitlements", path: page.path },
          ]),
          serviceSchema({
            name: "Residential Land Entitlements",
            description: page.description,
            path: page.path,
          }),
          faqSchema(entitlementFaqs),
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
            Move a residential project from a concept to the approvals that let
            it be built
          </p>
          <p className="mt-5 max-w-3xl text-navy/80">
            {site.name} helps landowners in Riverside County and across Southern
            California get residential land use approvals in place. The work
            covers the applications, agency reviews, and conditions that shape a
            subdivision or an apartment site before grading and construction can
            start.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold">
            What a land entitlement is
          </h2>
          <p className="mt-4 text-navy/80">
            An entitlement is a land use approval that allows a proposed use or
            development under stated conditions. The required approvals depend
            on the property, the project, and the local process.
          </p>
          <p className="mt-4 text-navy/80">
            Creating separate residential lots or condominium interests commonly
            involves subdivision approvals. An apartment project kept on one
            parcel may instead need a site plan, design, or other land use
            approval. Multiple homes do not, by themselves, require a
            subdivision.
          </p>
          <p className="mt-4 text-navy/80">
            The work that fits this practice includes residential subdivisions
            of 50 to 200 lots and apartment sites of about 50 to 200 units.
          </p>
        </div>
        <figure>
          <Image
            src="/images/projects/land-use-plan.jpg"
            alt="Land use plan showing residential planning areas and open space"
            width={1024}
            height={1024}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full rounded-sm bg-paper object-contain"
          />
          <figcaption className="mt-3 text-sm leading-relaxed text-navy/80">
            A land use plan showing residential areas and open space.
          </figcaption>
        </figure>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Entitlement approval and the construction permit
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            An entitlement approves the land use proposal and establishes its
            conditions. Depending on the approval, it may address site layout,
            building appearance, streets, utilities, landscaping, walls, and
            other improvements.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            A construction permit authorizes specific work under approved
            detailed plans. Entitlement approval provides the framework for
            final engineering and building plans. It does not automatically
            authorize grading or construction.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          How the approval work is coordinated
        </h2>
        <p className="mt-4 max-w-3xl text-navy/80">
          Brian Woods helps coordinate application planning, consultant
          schedules, submittals, agency comments, required hearings, and
          conditions of approval. He reviews plans for coordination, quality,
          and constructability, drawing on his engineering education,
          experience, and general contractor&apos;s background. He begins with
          the finished project in mind so planning decisions account for how
          the improvements will be built and what they will cost. Required
          professional design and approvals remain with the licensed
          professionals and the agencies.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {coordination.map((item) => (
            <li
              key={item.title}
              className="rounded-sm border border-navy/10 bg-cream p-6"
            >
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-navy/80">{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Choosing a path and keeping a schedule
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            Define the intended project, identify the reviewing agencies, and
            work with the planning team to compare the available approval paths.
            Consider the required studies, design work, environmental review,
            costs, risks, and timing, then organize them into an entitlement
            schedule. That schedule includes the required reports, applicable
            California Environmental Quality Act (CEQA) review, agency
            processing, and the final approval milestones.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            Ask the agencies to identify their prerequisites and submittal
            requirements, then put those into an approval matrix and schedule.
            The matrix shows which applications depend on earlier decisions and
            which can move forward together. The overall development concept
            usually needs to be set early, because many technical reports rely
            on that design. If the layout changes, related studies may need to
            be revised.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            Entitlement timing depends on the approval path, how complete the
            application is, technical issues, design changes, and agency
            workload. A projected approval date is an estimate until the
            required decisions are made. Keep an updated schedule that shows
            unresolved issues, key deadlines, and the critical path, meaning
            the tasks that directly control the finish date. Also identify work
            that can proceed at the same time so the project can keep moving.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Before the first planning meeting
        </h2>
        <p className="mt-4 max-w-3xl text-navy/80">
          Useful information includes parcel identification, ownership
          authorization when it is needed, a simple development concept,
          existing approvals, known constraints, and specific questions. Ask
          about allowed uses, density, applications, studies, agency
          coordination, and the expected review steps. Also try to understand
          the agency&apos;s development priorities and practical concerns. Early
          feedback helps assess the path forward. It is not a final approval.
        </p>
        <p className="mt-4 max-w-3xl text-navy/80">
          If the open question is still whether the land can support the homes
          or apartments, start with a{" "}
          <Link
            href="/services/land-development-feasibility-study/"
            className="font-semibold underline underline-offset-4"
          >
            land development feasibility study
          </Link>
          .
        </p>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Agency comments and revisions
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            Log each comment, assign it to the appropriate consultant, and set a
            response deadline. Check whether a change affects other drawings or
            reports before submitting a coordinated response. The responsible
            team members still review the technical responses and confirm that
            the revisions address the agency&apos;s concerns.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            Applications often need revisions because of incomplete information,
            conflicting drawings, missing studies, unmet standards, or changes
            to the proposed project. Revisions may also come from agency
            interpretations, design preferences, public feedback, or newly
            identified site issues. Clarify the basis for each requested change
            so the team understands the requirement and its effect on design,
            cost, and timing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Conditions of approval
        </h2>
        <p className="mt-4 max-w-3xl text-navy/80">
          Translate each condition into a required action, a responsible party,
          an estimated cost, and a completion milestone. Organize the tracking
          around the agency&apos;s deadlines, such as before grading permits,
          building permits, occupancy, and final acceptance. Other milestones,
          such as final map approval, are included when they apply. The owner
          and the project team can then see what must be finished before the
          next step.
        </p>
        <p className="mt-4 max-w-3xl text-navy/80">
          Conditions may require infrastructure improvements, additional
          studies, mitigation, fees, inspections, landscaping, or ongoing
          maintenance commitments. Each requirement needs a place in the budget,
          with a clear scope and a responsible party. Costs become more defined
          as entitlements and final engineering progress. Update the budget at
          each stage so the owner can see how new information and design
          decisions affect the total project cost.
        </p>
        <p className="mt-4 max-w-3xl text-navy/80">
          Some conditions must be cleared before grading permits, building
          permits, occupancy, or final acceptance. Those requirements can
          involve agency signoffs, utility work, outside parties, inspections,
          and supporting documents. Place those dependencies in the schedule and
          track them through completion. A project can be physically ready for
          the next stage and still be delayed if a required condition has not
          been cleared.
        </p>
        <p className="mt-4 max-w-3xl text-navy/80">
          When the approval path is a subdivision,{" "}
          <Link
            href="/services/residential-subdivision-development/"
            className="font-semibold underline underline-offset-4"
          >
            residential subdivision development
          </Link>{" "}
          covers the lots, streets, and finished-lot delivery that follow.{" "}
          <Link
            href="/services/land-development-project-management/"
            className="font-semibold underline underline-offset-4"
          >
            Land development project management
          </Link>{" "}
          keeps the later permits, budget, and construction work coordinated.
        </p>
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FaqList items={entitlementFaqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to map the approval path?"
        body="Share the parcel, what you hope to build, and any approvals or comments you already have. We will help sort the next applications, the open conditions, and the decisions that affect cost and timing."
      />
    </>
  );
}
