import type { Metadata } from "next";
import Image from "next/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery, teamMemberByNameQuery } from "@/sanity/lib/queries";

/* ── Fallbacks ── */
const F = {
  eyebrow: "About",
  headline: "Our Story",
  subheadline: "How the Mesocratic Party came to be.",
  timeline: [
    { year: "2024", event: "Jack Karavich begins drafting the Mesocratic platform and founding documents." },
    { year: "2025", event: "The Mesocratic National Committee is formed as a Section 527 organization in Virginia." },
    { year: "2025", event: "mesocrats.org launches. Party membership opens nationwide." },
    { year: "2026", event: "State organizing begins. Volunteer teams form in all 50 states." },
    { year: "2027", event: "Constitutional Convention X convenes in New Orleans with 5,000 elected delegates." },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "story" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || "Our Story",
    description:
      page?.seo?.metaDescription ||
      "How the Mesocratic Party came to be.",
  };
}

export default async function StoryPage() {
  const [page, founder] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: "story" }, { next: { revalidate: 60 } }),
    client.fetch(teamMemberByNameQuery, { name: "Jack Karavich" }, { next: { revalidate: 60 } }),
  ]);

  const hasCmsContent = page?.content && page.content.length > 0;

  // Extract sections by type for timeline or other structured content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = page?.sections as any[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cardSection = sections?.find((s: any) => s._type === "cardSection");

  // Timeline from card section cards (each card: headline=year, body=event text)
  const timeline =
    cardSection?.cards && cardSection.cards.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cardSection.cards.map((c: any) => ({
          year: c.headline || "",
          event: c.body || "",
        }))
      : F.timeline;

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            {page?.heroEyebrow || F.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {page?.heroHeadline || F.headline}
          </h1>
          <p className="text-lg text-white/80">
            {page?.heroSubheadline || F.subheadline}
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {hasCmsContent ? (
          <PortableTextRenderer value={page.content} />
        ) : (
          <>
            {/* The Problem */}
            <section>
              <h2 className="text-2xl font-bold mb-4">The Problem</h2>
              <p className="text-primary/70 leading-relaxed mb-4">
                For decades, American politics has been drifting toward the edges.
                Both major parties cater to their loudest, most extreme voices while
                the majority of Americans — the people in the middle who just want
                things to work — get ignored.
              </p>
              <p className="text-primary/70 leading-relaxed mb-4">
                The cost of living keeps climbing. Healthcare is a maze. The tax code
                is rigged. Infrastructure is crumbling. And every election cycle, we
                get the same promises, the same arguments, and the same nothing.
              </p>
              <p className="text-primary/70 leading-relaxed">
                The middle class doesn&apos;t have a party. Until now.
              </p>
            </section>

            {/* The Idea */}
            <section>
              <h2 className="text-2xl font-bold mb-4">The Idea</h2>
              <p className="text-primary/70 leading-relaxed mb-4">
                What if there was a party that started from the middle? Not a
                compromise between two extremes, but a party built from scratch
                around the needs, values, and common sense of ordinary working
                Americans?
              </p>
              <p className="text-primary/70 leading-relaxed mb-4">
                A party that took real positions on real issues. That said what it
                believed plainly. That didn&apos;t hedge, didn&apos;t pander, and
                didn&apos;t play the game of telling each audience what they wanted
                to hear.
              </p>
              <p className="text-primary/70 leading-relaxed">
                That&apos;s the Mesocratic Party.
              </p>
            </section>
          </>
        )}

        {/* The Founder — CMS bio or fallback */}
        <section>
          <h2 className="text-2xl font-bold mb-4">The Founder</h2>
          {founder?.image && (
            <div className="mb-6">
              <Image
                src={founder.image}
                alt={founder.name || "Founder"}
                width={400}
                height={500}
                className="rounded-lg w-48 h-auto"
              />
            </div>
          )}
          {founder?.bio ? (
            <PortableTextRenderer value={founder.bio} />
          ) : (
            <>
              <p className="text-primary/70 leading-relaxed mb-4">
                Jack Karavich is a software engineer, entrepreneur, and lifelong
                resident of the American middle class. He grew up watching politics
                get louder, meaner, and less useful — and decided to do something
                about it.
              </p>
              <p className="text-primary/70 leading-relaxed mb-4">
                Jack didn&apos;t come from politics. He came from building things.
                He saw the same problems everyone sees — a broken healthcare system,
                a rigged tax code, crumbling infrastructure, and a political class
                that answers to donors instead of voters. And he asked a simple
                question: what would a political party look like if you built it
                today, from scratch, for the people who actually keep this country
                running?
              </p>
              <p className="text-primary/70 leading-relaxed">
                The answer is the Mesocratic Party.
              </p>
            </>
          )}
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Timeline</h2>
          <div className="space-y-0">
            {timeline.map((item: { year: string; event: string }, i: number) => (
              <div key={i} className="flex gap-6 pb-8 relative">
                {/* Vertical line */}
                {i < timeline.length - 1 && (
                  <div className="absolute left-[19px] top-8 bottom-0 w-px bg-primary/10" />
                )}
                {/* Dot */}
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 relative z-10">
                  <span className="text-white text-xs font-bold">
                    {item.year.slice(2)}
                  </span>
                </div>
                {/* Content */}
                <div className="pt-2">
                  <p className="text-sm font-semibold text-accent mb-1">
                    {item.year}
                  </p>
                  <p className="text-primary/70 leading-relaxed">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
