import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { managementFaqs, pages } from "@/data/content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const page = pages[6];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

const managementServices = [
  {
    title: "Project Planning & Controls",
    summary:
      "Establish priorities, milestones, responsibilities, sequencing, and the working schedule used to manage the project.",
  },
  {
    title: "Budget & Schedule Management",
    summary:
      "Maintain visibility into development costs and timing as approvals, bids, project conditions, and construction requirements change.",
  },
  {
    title: "Consultant & Agency Coordination",
    summary:
      "Coordinate consultants, agency requirements, submittals, reviews, approvals, and related dependencies. Review consultant work for quality and recommend personnel or engineer replacement when necessary.",
  },
  {
    title: "Bid Management & Cost Review",
    summary:
      "Coordinate competitive bidding, review costs, evaluate sequencing, and identify practical value-engineering opportunities before construction commitments are made.",
  },
  {
    title: "Construction Coordination",
    summary:
      "Keep infrastructure work, construction schedules, sequencing, and active project requirements coordinated as approved plans move into the field.",
  },
  {
    title: "Progress Tracking",
    summary:
      "Monitor milestones and construction activity against detailed schedules. Use drone-based site monitoring where appropriate to maintain visibility into field progress.",
  },
];

const process = [
  {
    title: "1. Review the Project",
    summary:
      "Assess available plans, budgets, schedules, approvals, consultants, and known project issues.",
  },
  {
    title: "2. Establish Priorities",
    summary:
      "Identify immediate decisions, responsibilities, dependencies, and upcoming milestones.",
  },
  {
    title: "3. Coordinate the Work",
    summary:
      "Keep consultants, agencies, approvals, bidding, and construction activity connected to the project plan.",
  },
  {
    title: "4. Track and Adjust",
    summary:
      "Monitor progress, timing, costs, and changes that could affect upcoming work.",
  },
];

export default function ProjectManagementPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            {
              name: "Land Development Project Management",
              path: "/services/land-development-project-management/",
            },
          ]),
          serviceSchema({
            name: "Land Development Project Management",
            description: page.description,
            path: page.path,
          }),
          faqSchema(managementFaqs),
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
            Keep the Project Plan, People, Budget, and Schedule Working Together
          </p>
          <p className="mt-5 max-w-3xl text-navy/80">
            Keep your development organized around clear priorities, defined
            responsibilities, and a working schedule. {site.name} provides land
            development project management in Riverside and across Southern
            California, coordinating consultants, approvals, budgets, bidding,
            and construction activity from one stage to the next. Set priorities.
            Track cost and timing. Keep every participant clear on
            responsibilities and next steps.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold">
            Bring Structure and Control to Your Development Project
          </h2>
          <p className="mt-4 text-navy/80">
            Strong project management creates visibility across the entire
            development. Responsibilities stay defined, milestones stay in view,
            and decisions are made with their effect on later work in mind.
          </p>
          <p className="mt-4 text-navy/80">
            For land development project management in Riverside, we keep the
            project organized around four essentials:
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-navy/80">
            <li>Set clear priorities for upcoming decisions and deadlines.</li>
            <li>Define responsibilities across consultants and project participants.</li>
            <li>Track budgets and schedules against project milestones.</li>
            <li>Manage dependencies before delays begin affecting later work.</li>
          </ul>
        </div>
        <Image
          src="/images/projects/home-hero.jpg"
          alt="Bridge construction over a canyon with crane and steel girders"
          width={1366}
          height={1025}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-auto w-full rounded-sm object-cover"
        />
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Land Development Project Management Services
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            Our land development management services in Anaheim and throughout
            Southern California focus on the controls, coordination, and
            follow-through required to keep development progressing.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {managementServices.map((item) => (
              <li key={item.title} className="rounded-sm border border-navy/10 bg-cream p-6">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-navy/80">{item.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          A Clear Management Process From Day One
        </h2>
        <p className="mt-4 max-w-3xl text-navy/80">
          Start with where the project stands today. Build the management plan
          around what needs to happen next.
        </p>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {process.map((item) => (
            <li key={item.title} className="rounded-sm bg-cream-deep p-6">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-navy/80">{item.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Permit readiness and horizontal construction
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            Permit readiness means the approvals for a specific phase are issued
            and the conditions for starting that work are satisfied, including
            applicable fees, bonds, inspections, and approved drawing revisions.
            Submitting an application does not authorize construction.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            Horizontal work includes clearing, demolition, grading, pads,
            retaining walls, utilities, drainage, roads, and sidewalks. Work
            generally begins with clearing and rough grading. Deep drainage
            facilities and buried basins may go in before other utilities.
            Sewer, remaining storm drain work, water, dry utilities, and streets
            follow in a coordinated sequence.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            A constructability review checks whether the design can be built
            with the available space, access, materials, equipment, and
            sequence. Plans should show manhole elevations, pipe invert
            elevations, and inlet and outlet elevations so contractors are not
            left guessing.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            One example is a South Corona master-planned community. The first
            phase included 540 lots and was completed in about nine months.
            Rough grading took about two to two and a half months, with
            production sometimes reaching about 100,000 cubic yards a day. The
            work depended on overlapping crews in separate areas while keeping
            access and quality coordinated.
          </p>
        </div>
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Add Oversight Where the Project Needs It Most
          </h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            Project management does not have to begin at acquisition. Bring us in
            when consultant coordination becomes difficult, schedules need tighter
            control, approvals begin affecting later work, or the project is
            preparing to enter construction.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            For land development management in Corona, we can review the current
            position, assess consultant performance where needed, establish
            immediate priorities, and create stronger coordination around the
            work ahead.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Development Leadership Behind the Management
        </h2>
        <p className="mt-4 max-w-3xl text-navy/80">
          Land Development Specialists brings more than 40 years of land
          development experience, including 13,000 lots entitled and constructed,
          8+ master plans developed, and senior leadership with public and
          private builders. That includes Vice President-level land development
          roles with D.R. Horton, Foremost Communities, Pulte/Del Webb, and
          Richmond American Homes.
        </p>
        <p className="mt-4 max-w-3xl text-navy/80">
          That experience gives clients working with a land development
          consultant in Los Angeles practical insight into how budgets,
          approvals, sequencing, infrastructure, and construction decisions
          affect one another.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Frequently Asked Questions</h2>
        <div className="mt-8">
          <FaqList items={managementFaqs} />
        </div>
      </section>

      <CtaBand
        title="Get experienced oversight on your development project"
        body="We support development teams throughout Riverside, Corona, Anaheim, Long Beach, Los Angeles, and surrounding Southern California communities. Tell us what is underway, what needs attention, and where stronger coordination is required."
      />
    </>
  );
}
