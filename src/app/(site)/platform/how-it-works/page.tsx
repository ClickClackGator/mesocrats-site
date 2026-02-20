import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";

/* ── Fallbacks ── */
const F = {
  headline: "This Platform Belongs to You.",
  subheadline:
    "Every position on this site is a starting point. The Mesocratic Party\u2019s platform is written, debated, and ratified by its members \u2014 not by politicians, not by donors, and not by party insiders.",
  ctaLabel: "Join the Party \u2014 Your Voice Starts Here",
  ctaLink: "/involved/join",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "how-it-works" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || "How Our Platform Works",
    description:
      page?.seo?.metaDescription ||
      "The Mesocratic Party\u2019s platform is written, debated, and ratified by its members.",
  };
}

export default async function HowItWorksPage() {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "how-it-works" },
    { next: { revalidate: 60 } }
  );

  const hasCmsContent = page?.content && page.content.length > 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = page?.sections as any[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctaSection = sections?.find((s: any) => s._type === "ctaSection");

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {page?.heroHeadline || F.headline}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            {page?.heroSubheadline || F.subheadline}
          </p>
        </div>
        {page?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-xs text-white/50">
            {page.imageCredit}
          </span>
        )}
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {hasCmsContent ? (
          <PortableTextRenderer value={page.content} />
        ) : (
          <>
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                The Problem with Every Other Party
              </h2>
              <div className="space-y-4 text-primary/70 leading-relaxed">
                <p>
                  In the Republican and Democratic parties, the platform is written
                  by committees, approved by delegates hand-picked by party
                  leadership, and then largely ignored by the politicians who are
                  supposed to carry it out. Elected officials vote their own
                  interests, chase their own donors, and treat the party platform as
                  a suggestion, not a commitment.
                </p>
                <p>
                  The result: a political system where the people who vote for a
                  party have almost no control over what that party actually does
                  once it&apos;s in power. You vote for a platform. You get a
                  politician.
                </p>
                <p className="font-semibold text-primary">
                  The Mesocratic Party was built to fix that.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">How It Works</h2>
              <p className="text-primary/70 leading-relaxed mb-8">
                The Mesocratic platform is governed by a three-part system designed
                to keep power in the hands of the membership:
              </p>

              <div className="space-y-8">
                <div className="bg-gray-light rounded-lg p-6 sm:p-8">
                  <h3 className="text-lg font-bold mb-3">
                    1. The Founder&apos;s Starting Point (Day 1)
                  </h3>
                  <p className="text-sm text-primary/70 leading-relaxed">
                    The positions you see on this website today were written by the
                    party&apos;s founder as a starting framework &mdash; a first
                    draft of what the Mesocratic Party stands for. They represent one
                    person&apos;s best attempt to define the middle ground on the
                    issues that matter most to the American middle class. They are
                    not final. They are not permanent. They are the beginning of a
                    conversation.
                  </p>
                </div>

                <div className="bg-gray-light rounded-lg p-6 sm:p-8">
                  <h3 className="text-lg font-bold mb-3">
                    2. Constitutional Convention X (Annual, Binding)
                  </h3>
                  <p className="text-sm text-primary/70 leading-relaxed">
                    Every May, 5,000 CCX State Representatives &mdash; 100 from each
                    state, elected by Mesocratic Party members in November &mdash;
                    gather in New Orleans to debate, amend, and ratify the
                    party&apos;s official platform. This is the binding authority on
                    what the Mesocratic Party stands for. If the CCX votes to change
                    a position, it changes. If they vote to add a new one, it&apos;s
                    added. If they vote to remove one, it&apos;s gone. The platform
                    is whatever the people say it is.
                  </p>
                </div>

                <div className="bg-gray-light rounded-lg p-6 sm:p-8">
                  <h3 className="text-lg font-bold mb-3">
                    3. Digital Engagement (Year-Round, Advisory)
                  </h3>
                  <p className="text-sm text-primary/70 leading-relaxed">
                    Between conventions, every Mesocratic Party member has a voice
                    through our digital platform. Submit policy ideas. Vote on
                    priorities. Comment on proposals. Signal where you think the
                    party should go next. This input is advisory &mdash; it feeds
                    directly into the CCX agenda and shapes what the State
                    Representatives debate each May. It ensures the conversation
                    never stops, even when the convention is months away.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                What This Means for MP Politicians
              </h2>
              <div className="space-y-4 text-primary/70 leading-relaxed">
                <p className="font-semibold text-primary">
                  Mesocratic politicians are advocates for the platform, not authors
                  of it.
                </p>
                <p>
                  When a Mesocratic candidate wins a primary and enters a general
                  election, they carry the party&apos;s platform with them. That
                  platform was written by the members and ratified at CCX. The
                  politician&apos;s job is to advance it.
                </p>
                <p>
                  This does not mean they are robots. Mesocratic elected officials
                  have full latitude to use their judgment on strategy, negotiation,
                  sequencing, and the art of political discourse. They are trusted to
                  navigate the realities of Congress and state legislatures with
                  intelligence and integrity. What they do not have is permission to
                  abandon the platform. They are bound by it.
                </p>
                <p>
                  In the Republican and Democratic parties, politicians often operate
                  with their own best interests in mind &mdash; chasing donors,
                  eyeing their next election, or positioning for personal
                  advancement. Mesocratic politicians are different. They are
                  messengers and humble servants of the party&apos;s membership. They
                  focus on the art of political negotiation and debate to move the
                  people&apos;s policies forward with honor and integrity.
                </p>
                <p>
                  If a Mesocratic officeholder consistently votes against the
                  ratified platform, the membership has the power to hold them
                  accountable through the primary process. The party belongs to the
                  people. The politicians work for them.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Why This Matters
              </h2>
              <div className="space-y-4 text-primary/70 leading-relaxed mb-8">
                <p>
                  Most Americans feel like they have no real say in what their party
                  does. They vote, and then they watch politicians do whatever they
                  want for two to six years. The Mesocratic Party was designed from
                  Day 1 to make that impossible.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-light rounded-lg p-6">
                  <p className="font-semibold mb-1">You write the platform.</p>
                  <p className="text-sm text-primary/70">
                    Through CCX and digital engagement, the membership defines what
                    the party stands for.
                  </p>
                </div>
                <div className="bg-gray-light rounded-lg p-6">
                  <p className="font-semibold mb-1">You elect the messengers.</p>
                  <p className="text-sm text-primary/70">
                    Through primaries, the membership chooses who carries the
                    platform into office.
                  </p>
                </div>
                <div className="bg-gray-light rounded-lg p-6">
                  <p className="font-semibold mb-1">
                    You hold them accountable.
                  </p>
                  <p className="text-sm text-primary/70">
                    Through the primary process, the membership can replace anyone
                    who stops serving the platform.
                  </p>
                </div>
              </div>
              <p className="mt-8 text-primary/70 leading-relaxed italic">
                This party was built by one person on Day 1. It will be owned by the
                people who join it from Day 2 forward.
              </p>
            </section>
          </>
        )}

        {/* CTAs */}
        <section className="text-center space-y-4">
          <Link
            href={ctaSection?.ctaLink || F.ctaLink}
            className="inline-block bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors"
          >
            {ctaSection?.ctaLabel || F.ctaLabel}
          </Link>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaSection?.secondaryLink || "/convention"}
              className="text-secondary font-semibold hover:underline"
            >
              {ctaSection?.secondaryLabel || "Learn about Constitutional Convention X \u2192"}
            </Link>
            <Link
              href={ctaSection?.linkUrl || "/convention"}
              className="text-secondary font-semibold hover:underline"
            >
              {ctaSection?.linkText || "Submit a Policy Idea \u2192"}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
