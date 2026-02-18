import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "How Our Platform Works" };

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            This Platform Belongs to You.
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Every position on this site is a starting point. The Mesocratic
            Party&apos;s platform is written, debated, and ratified by its
            members &mdash; not by politicians, not by donors, and not by party
            insiders.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
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

        {/* CTAs */}
        <section className="text-center space-y-4">
          <Link
            href="/involved/join"
            className="inline-block bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors"
          >
            Join the Party &mdash; Your Voice Starts Here
          </Link>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/convention"
              className="text-accent font-semibold hover:underline"
            >
              Learn about Constitutional Convention X &rarr;
            </Link>
            <Link
              href="/convention"
              className="text-accent font-semibold hover:underline"
            >
              Submit a Policy Idea &rarr;
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
