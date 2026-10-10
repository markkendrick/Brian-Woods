import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { pages, valueEngineeringFaqs } from "@/data/content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const page = pages.find((item) => item.path === "/services/value-engineering/")!;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

const savings = [
  {
    title: "Materials the agency will accept",
    summary:
      "Approved alternative materials can reduce cost. PVC pipe may be an option in place of ductile iron where the agency and the design requirements allow it.",
  },
  {
    title: "Grading instead of taller walls",
    summary:
      "Where the site has room, more grading can cost less than taller retaining walls.",
  },
  {
    title: "Shorter pipe routes",
    summary:
      "Shorter sewer or storm drain routes, or a more direct inlet connection, can reduce pipe length and simplify construction.",
  },
  {
    title: "Finishes and site features",
    summary:
      "Wall finishes, landscaping, and shade structures deserve a close look before they are locked into the plans.",
  },
];

export default function ValueEngineeringPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "Value Engineering", path: page.path },
          ]),
          serviceSchema({
            name: "Value Engineering for Land Development",
            description:
              "Review of residential land development plans, grading, walls, utility routing, materials, and bids to reduce cost while keeping function and quality.",
            path: page.path,
            serviceType: "Value engineering",
            areaServed: [
              { "@type": "AdministrativeArea", name: "Orange County, California" },
              { "@type": "AdministrativeArea", name: "Los Angeles County, California" },
              { "@type": "Place", name: "Southern California" },
            ],
          }),
          faqSchema(valueEngineeringFaqs),
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
            A practical look at the design before the budget is locked in
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Value engineering for residential land development
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-navy/85">
          {site.name} provides value engineering for residential land development
          in Orange County, Los Angeles County and across Southern California.
          Brian Woods reviews plans, grading, walls, utility routes and bids to
          cut cost without losing quality. In Corona, he chose precast arch
          culverts for two bridge crossings and spent less than conventional
          bridges would have cost. Call (760) 271-1081.
        </p>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">What it is</h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            Value engineering is a review of the design and construction approach
            that looks for ways to reduce cost while keeping the project&apos;s
            function and quality. The point is to meet the project&apos;s needs
            at a lower cost, not to strip the work down.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            It is most useful early, and again at major design milestones, before
            bids and construction commitments. Contractors who specialize in
            sewer, water, storm drain, or streets can spot different practical
            issues. Early input matters most on complex facilities such as lift
            stations, pump stations, and reservoirs, where access and sequencing
            can change the design.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Where savings come from</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {savings.map((item) => (
            <li key={item.title} className="rounded-sm border border-navy/10 bg-cream p-6">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-navy/80">{item.summary}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-navy/80">
          Agency standards can limit the choices. Every change has to be checked
          against drainage, grading, approvals, and the rest of the site design.
        </p>
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">Examples from the work</h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            In Corona, two bridge crossings were on a tight schedule. Brian
            selected large precast arch culverts with spans of about 48 feet.
            The crossings were finished in about six months, for less than the
            conventional bridge approach.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            On another project, a planned folding entry gate would have needed
            large motors and opened too slowly. Conventional sliding gates that
            opened to each side of the driveway lowered the cost and improved
            operation and expected maintenance.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            When the review turns into bidding, schedules, and field progress,{" "}
            <Link
              href="/services/land-development-project-management/"
              className="font-semibold underline underline-offset-4"
            >
              land development project management
            </Link>{" "}
            covers that work, including drone-based tracking where it helps.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Frequently asked questions</h2>
        <div className="mt-8">
          <FaqList items={valueEngineeringFaqs} />
        </div>
      </section>

      <CtaBand
        title="Want a second look at the plans or the bids?"
        body="Share the drawings, the budget, and where the costs are climbing. We can review one design milestone or a project that is already underway."
      />
    </>
  );
}
