import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "National Security" };

export default function NationalSecurityPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Strong and Smart.
          </h1>
          <p className="text-lg text-white/80">
            The most powerful military on earth, deployed with discipline,
            funded with accountability.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The United States spends more on defense than the next ten
              countries combined. The annual defense budget exceeds $886
              billion. America maintains roughly 750 military bases in 80
              countries. The U.S. military is the most capable fighting force
              in human history.
            </p>
            <p>
              And yet: the Department of Defense has never passed a full
              financial audit. Trillions of dollars in spending cannot be
              accounted for. Weapons programs routinely run decades late and
              billions over budget. The military-industrial complex that
              Eisenhower warned about in 1961 is alive and thriving.
            </p>
            <p>
              Meanwhile, the nature of threats has changed. Cyberwarfare,
              AI-driven weapons systems, drone technology, space-based assets,
              and information warfare are the battlefields of the future. The
              U.S. still spends like it&apos;s preparing to refight the Cold
              War.
            </p>
          </div>
        </section>

        {/* What Others Say */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            What Others Say
          </h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              <strong>Republicans</strong> are right that a strong military is
              essential to American security and global stability. They&apos;re
              right that weakness invites aggression and that America must
              maintain decisive military superiority.
            </p>
            <p>
              <strong>Democrats</strong> are right that the defense budget is
              bloated with waste, that endless wars drain American blood and
              treasure, and that diplomacy should be the first tool, not the
              last.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. Strength and discipline are not opposites.
            </p>
          </div>
        </section>

        {/* Where We Stand */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Where We Stand
          </h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The Mesocratic Party supports a strong, well-funded military that
              is accountable for every dollar it spends and that invests
              aggressively in the technologies that will define the next 50
              years of warfare.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Funding &amp; Accountability
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Maintain robust defense spending at levels necessary to ensure
                  American military superiority. We are not the party of defense
                  cuts.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Demand and enforce a clean financial audit of the Department
                  of Defense. Tie future funding increases to audit progress
                  &mdash; no clean audit, no blank check. No other federal
                  agency is allowed to fail its audit for 30 consecutive years.
                  The DoD should not be the exception.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Eliminate redundant weapons programs. When a system is 15
                  years late and $50 billion over budget, cancel it and redirect
                  the funds.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Tie defense contractor compensation to performance. Cost-plus
                  contracts that reward inefficiency must be reformed.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Next-Generation Warfare
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Massively increase investment in AI, autonomous systems, drone
                  technology, and cyber capabilities. The wars of 2040 will not
                  be fought with the weapons of 1990.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Establish the United States as the undisputed global leader in
                  military AI &mdash; with clear ethical frameworks governing
                  autonomous weapons.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in space-based defense capabilities. Space is already a
                  contested domain. Pretending otherwise is dangerous.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Strengthen cyber defense across military and civilian
                  infrastructure. A cyberattack on the power grid is as much a
                  national security threat as a missile.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Diplomacy &amp; Alliances
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Maintain and strengthen alliances (NATO, Five Eyes, Pacific
                  partnerships). America is stronger with allies than without
                  them.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Use military force as a last resort, not a first option. But
                  when force is necessary, use it decisively and with clear
                  objectives.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  No open-ended military commitments without congressional
                  authorization. The Constitution gives the power to declare war
                  to Congress, not the President.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Sustain allied burden-sharing. Our partners must invest in
                  their own defense. American taxpayers should not be the
                  world&apos;s sole security guarantor.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Veterans</h3>
              <p className="text-sm text-primary/70 leading-relaxed">
                The men and women who serve deserve more than a subsection on a
                policy page. See our dedicated{" "}
                <a
                  href="/platform/veterans"
                  className="text-accent hover:underline"
                >
                  Veterans
                </a>{" "}
                page for the full position on VA healthcare, mental health,
                education, housing, and military-to-civilian transition.
              </p>
            </div>
          </div>
        </section>

        {/* What It Means */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            What It Means for You
          </h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The most powerful military in the world, spending your money
              wisely, investing in the future instead of the past, and treating
              the people who serve with the respect they&apos;ve earned.
              Strength without waste. Power without recklessness.
            </p>
            <p className="font-semibold text-primary">
              We don&apos;t want a smaller military. We want a smarter one.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
