import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import ConventionForm from "./ConventionForm";

const CCX_DATE = new Date("2027-05-01T00:00:00-05:00");

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "convention" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || undefined,
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function ConventionPage() {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "convention" },
    { next: { revalidate: 60 } }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = page?.sections as any[] | undefined;

  // Text sections (Why New Orleans, What Is CCX, 5000 Delegates)
  const textSections =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sections?.filter((s: any) => s._type === "textSection") || [];

  // CTA section for the registration area
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctaSection = sections?.find((s: any) => s._type === "ctaSection");

  // Background classes for alternating text sections
  const textBgs = ["", "bg-gray-light", ""];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {page?.heroImage && (
          <>
            <Image
              src={page.heroImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="relative max-w-4xl mx-auto text-center">
          {page?.heroEyebrow && (
            <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
              {page.heroEyebrow}
            </p>
          )}
          {page?.heroHeadline && (
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {page.heroHeadline}
            </h1>
          )}
          {page?.heroSubheadline && (
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              {page.heroSubheadline}
            </p>
          )}
          <CountdownTimer target={CCX_DATE} className="justify-center mb-10" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {page?.heroCta1Link && page?.heroCta1Label && (
              <a
                href={page.heroCta1Link}
                className="bg-secondary hover:bg-secondary-light text-white font-bold px-8 py-3 rounded transition-colors text-center"
              >
                {page.heroCta1Label}
              </a>
            )}
            {page?.heroCta2Link && page?.heroCta2Label && (
              <Link
                href={page.heroCta2Link}
                className="border-2 border-white/30 text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
              >
                {page.heroCta2Label}
              </Link>
            )}
          </div>
        </div>
        {page?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-xs text-white/50">
            {page.imageCredit}
          </span>
        )}
      </section>

      {/* Body content (rich text) */}
      {page?.content && page.content.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      )}

      {/* Text sections: Why New Orleans, What Is CCX, 5000 Delegates */}
      {textSections.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (section: any, i: number) => {
          const bg = textBgs[i] ?? "";
          const isPortableText = Array.isArray(section.body);

          return (
            <section
              key={section._key || i}
              className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${bg}`}
            >
              <div className="max-w-3xl mx-auto">
                {section.headline && (
                  <h2 className="text-3xl font-bold mb-6">
                    {section.headline}
                  </h2>
                )}
                {isPortableText ? (
                  <PortableTextRenderer value={section.body} />
                ) : (
                  section.body &&
                    section.body
                      .split("\n\n")
                      .map((p: string, j: number) => (
                        <p
                          key={j}
                          className="text-primary/70 leading-relaxed mb-4 last:mb-0"
                        >
                          {p}
                        </p>
                      ))
                )}
              </div>
            </section>
          );
        }
      )}

      {/* ──────────── The CCX Process — Timeline ──────────── */}
      <section className="bg-primary text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-accent-light uppercase mb-4 text-center">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">
            The CCX Process
          </h2>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-accent/40 hidden sm:block" />

            {/* Step 1 */}
            <div className="relative flex gap-6 sm:gap-8 mb-14">
              <div className="relative z-10 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold shrink-0 ring-4 ring-primary">
                1
              </div>
              <div className="pt-1">
                <p className="text-xs font-bold tracking-widest text-accent-light uppercase mb-2">
                  Join
                </p>
                <p className="text-white/80 leading-relaxed">
                  Become a registered Mesocrat. It&apos;s free and takes 30 seconds.
                </p>
                <Link
                  href="/involved/join"
                  className="inline-block mt-3 text-sm font-semibold text-secondary hover:text-secondary-light underline underline-offset-2"
                >
                  Join the Party &rarr;
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex gap-6 sm:gap-8 mb-14">
              <div className="relative z-10 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold shrink-0 ring-4 ring-primary">
                2
              </div>
              <div className="pt-1">
                <p className="text-xs font-bold tracking-widest text-accent-light uppercase mb-2">
                  Run or Vote &mdash; November
                </p>
                <p className="text-white/80 leading-relaxed">
                  Every November, each state elects 100 CCX State Representatives
                  through the Mesocratic digital voting platform. You can run as a
                  candidate or vote for who represents your state.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex gap-6 sm:gap-8">
              <div className="relative z-10 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold shrink-0 ring-4 ring-primary">
                3
              </div>
              <div className="pt-1">
                <p className="text-xs font-bold tracking-widest text-accent-light uppercase mb-2">
                  Convention &mdash; May, New Orleans
                </p>
                <p className="text-white/80 leading-relaxed">
                  5,000 elected State Reps from all 50 states convene in New
                  Orleans to draft tenets, debate the platform, and elect party
                  leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── Ways to Participate ──────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4 text-center">
            Get Involved
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 text-center">
            Ways to Participate
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-light rounded-lg p-8 sm:p-10 flex flex-col hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Run as a CCX State Rep</h3>
              <p className="text-sm text-primary/70 leading-relaxed flex-1">
                Register as a Mesocrat, then declare your candidacy for State Rep
                in your state. If your fellow Mesocrats choose you, you&apos;ll
                join 99 others from your state at CCX with a full voice and vote.
              </p>
              <Link
                href="/involved/join"
                className="inline-block mt-6 text-sm font-semibold text-secondary hover:underline"
              >
                Join the Party &rarr;
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-light rounded-lg p-8 sm:p-10 flex flex-col hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Vote for Your State Reps</h3>
              <p className="text-sm text-primary/70 leading-relaxed flex-1">
                Every registered Mesocrat can vote in their state&apos;s CCX State
                Rep election each November on the digital voting platform.
                You&apos;re choosing who represents you at the convention.
              </p>
              <Link
                href="/involved/join"
                className="inline-block mt-6 text-sm font-semibold text-secondary hover:underline"
              >
                Join to Vote &rarr;
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-light rounded-lg p-8 sm:p-10 flex flex-col hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Attend as an Observer</h3>
              <p className="text-sm text-primary/70 leading-relaxed flex-1">
                Not a State Rep? You can still come. Observer registration is open
                to anyone. You&apos;ll have access to all sessions. Voting is
                reserved for elected State Reps.
              </p>
              <Link
                href="/convention/register"
                className="inline-block mt-6 text-sm font-semibold text-secondary hover:underline"
              >
                Register &rarr;
              </Link>
            </div>

            {/* Card 4 */}
            <div className="bg-gray-light rounded-lg p-8 sm:p-10 flex flex-col hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Watch the Live Stream</h3>
              <p className="text-sm text-primary/70 leading-relaxed flex-1">
                Every session of CCX will be live-streamed. Watch tenets get
                drafted in real time. If you can&apos;t be in the room, you can
                still be part of the moment.
              </p>
              <Link
                href="/convention/register"
                className="inline-block mt-6 text-sm font-semibold text-secondary hover:underline"
              >
                Register for Updates &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── What Happens at CCX ──────────── */}
      <section className="bg-accent text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 text-center">
            What Happens at CCX
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-lg p-8 sm:p-10">
              <h3 className="text-xl font-bold mb-3">Draft &amp; Ratify the Tenets</h3>
              <p className="text-white/70 leading-relaxed text-sm">
                The foundational tenets define who we are &mdash; our
                Constitution. At the first CCX in May 2027, they&apos;ll be
                drafted and ratified. In future years, tenets may be amended by
                delegate vote.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-8 sm:p-10">
              <h3 className="text-xl font-bold mb-3">Debate the Platform</h3>
              <p className="text-white/70 leading-relaxed text-sm">
                Our published platform has positions on 15+ issues. At CCX, those
                positions are debated, refined, and officially ratified. Every
                year, new issues are introduced and existing positions are
                challenged.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-8 sm:p-10">
              <h3 className="text-xl font-bold mb-3">Elect Leadership</h3>
              <p className="text-white/70 leading-relaxed text-sm">
                Chair, Vice Chair, Treasurer, Secretary &mdash; the people who run
                the MNC and represent the party nationally. Your delegates decide
                who leads. Every year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── Term Limits Callout ──────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="border-l-4 border-accent bg-gray-light rounded-r-lg p-8 sm:p-10">
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">
              Important Rule
            </p>
            <p className="text-primary/80 leading-relaxed font-medium">
              Term limits: No CCX State Rep may attend more than once every four
              years, and no consecutive terms. New voices, every cycle. This
              isn&apos;t a party where the same insiders show up every year. CCX
              belongs to the members.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────── Registration Form ──────────── */}
      <section
        id="register"
        className="bg-gray-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-xl mx-auto">
          {ctaSection?.headline && (
            <h2 className="text-3xl font-bold mb-3 text-center">
              {ctaSection.headline}
            </h2>
          )}
          {ctaSection?.body && (
            <p className="text-primary/60 text-center mb-8">
              {ctaSection.body}
            </p>
          )}
          <ConventionForm />
        </div>
      </section>
    </div>
  );
}
