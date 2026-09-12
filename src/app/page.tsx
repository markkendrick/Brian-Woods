import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import {
  homeFaqs,
  involvement,
  pages,
  processSteps,
  services,
  testimonials,
} from "@/data/content";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatPhoneDisplay, phoneTelHref, site } from "@/lib/site";

const page = pages[0];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function HomePage() {
  const phone = formatPhoneDisplay(site.phone);
  const tel = phoneTelHref(site.phone);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      <section className="relative isolate overflow-hidden border-b-8 border-navy">
        <Image
          src="/images/projects/home-hero.jpg"
          alt="Steel bridge girders being placed across a canyon during land development construction"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl rounded-sm bg-cream/95 p-6 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-deep">
              SERVICING SOUTHERN CALIFORNIA OVER 20 YEARS PLUS.
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy/85">
              {site.name} works with developers and landowners through land
              acquisition, plan approvals, permitting, value engineering, and
              construction management. With more than three decades of hands-on
              experience, we help evaluate risk, build realistic budgets and
              schedules, coordinate the moving parts, and keep development work
              moving toward completion.
            </p>
            <p className="mt-4 text-navy/80">
              We focus on the decisions that affect feasibility, cost, timing,
              approvals, and execution so each phase supports what comes next in
              the project.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact-us/"
                className="rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-navy hover:bg-gold-deep"
              >
                Discuss Your Project
              </Link>
              <a
                href={tel}
                className="rounded-sm border border-navy px-5 py-3 text-sm font-semibold"
              >
                Call {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
          <div className="rounded-sm border border-navy/10 bg-cream p-6">
            <p className="font-display text-4xl font-semibold">13,000</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em]">
              Lots entitled and constructed
            </p>
          </div>
          <div className="rounded-sm border border-navy/10 bg-cream p-6">
            <p className="font-display text-4xl font-semibold">8+</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em]">
              Master plans developed
            </p>
          </div>
          <div className="rounded-sm border border-navy/10 bg-cream p-6">
            <p className="font-display text-4xl font-semibold">21 Years</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em]">
              VP-level land development experience
            </p>
            <p className="mt-3 text-sm leading-relaxed text-navy/75">
              21 years experience as Vice President of Land Development for D.R.
              Horton, Foremost Communities, Pulte/Del Webb & Richmond American
              Homes.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Experience you can trust</h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-navy/85">
          With over thirty years in the industry, we specialize in land
          purchasing, plan approval, and permitting, and we keep construction
          management organized so work can stay on schedule. Value engineering
          and budgeting help keep projects efficient and cost-effective.
        </p>
        <p className="mt-4 max-w-3xl text-navy/80">
          That includes 21 years in Vice President-level land development roles
          with D.R. Horton, Foremost Communities, Pulte/Del Webb, and Richmond
          American Homes.
        </p>
        <Link href="/about-us/" className="mt-6 inline-block font-semibold underline underline-offset-4">
          Learn more about who we are
        </Link>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">What we offer</h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            From acquisition review to construction management, our team provides
            land development services in Los Angeles and across nearby Southern
            California communities.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <li key={service.title} className="rounded-sm border border-navy/10 bg-cream p-6">
                <h3 className="font-display text-2xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-navy/80">{service.summary}</p>
                <Link href={service.href} className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">
                  {service.href === "/services/land-development-project-management/"
                    ? "Project management details"
                    : "Discuss this service"}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold">
            Experience across the development process
          </h2>
          <p className="mt-4 text-navy/80">
            With more than 30 years in land development, {site.name} brings
            practical experience across acquisition, approvals, infrastructure,
            and construction.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {processSteps.map((step) => (
              <li key={step.title}>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/75">{step.summary}</p>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="/images/projects/land-use-plan.jpg"
          alt="Color-corrected land use plan showing residential planning areas, open space, and a project summary"
          width={1024}
          height={1024}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-auto w-full rounded-sm bg-paper object-contain"
        />
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">Bring us in where you need us</h2>
          <p className="mt-4 max-w-3xl text-navy/80">
            You do not need support for every phase to work with us. We can step
            in for a focused need or stay involved across multiple stages.
          </p>
          <p className="mt-4 max-w-3xl text-navy/80">
            If you need a land development consultant in or around Huntington
            Beach for one phase or broader project oversight, we can match our
            involvement to where the project needs experienced support.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {involvement.map((item) => (
              <li key={item.title} className="rounded-sm bg-cream p-6">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-navy/80">{item.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Testimonials</h2>
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <li key={item.name} className="rounded-sm border border-navy/10 bg-paper p-6">
              <blockquote className="text-navy/85">“{item.quote}”</blockquote>
              <p className="mt-4 font-semibold">{item.name}</p>
              <p className="text-sm text-navy/70">{item.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <Image
            src="/images/projects/graded-lots.jpg"
            alt="Aerial view of graded residential lots, new roads, and a hillside development site"
            width={1024}
            height={1024}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full rounded-sm object-cover"
          />
          <div>
            <h2 className="font-display text-3xl font-semibold">
              Individual sites, tracts, and master plans
            </h2>
            <p className="mt-4 text-navy/80">
              We work with individual lot owners, real estate developers,
              residential tracts, and larger master-planned projects. The scope
              can range from a focused review or approval need to ongoing
              coordination through construction.
            </p>
            <p className="mt-4 text-navy/80">
              For larger developments, that can mean managing the relationships
              between consultants, agencies, contractors, schedules, budgets, and
              field activity. The level of involvement can adjust as project
              needs change.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Frequently asked questions</h2>
        <div className="mt-8">
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <CtaBand
        title="Need assistance to develop your land?"
        body="Need land development services in Los Angeles for a property under review, an approval process already underway, or a project moving into construction? Tell us where the project stands, what has already been completed, and where you need support."
      />
    </>
  );
}
