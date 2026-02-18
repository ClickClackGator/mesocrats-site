import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Government Reform" };

export default function GovernmentReformPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Better People. Better Rules. Better Government.
          </h1>
          <p className="text-lg text-white/80">
            Term limits. Higher pay. A stock market ban. Lobbying transparency.
            The Polis Doctorate. A government that works.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The federal government employs roughly 2.9 million civilians across
              hundreds of agencies. The annual federal budget exceeds $6.5
              trillion. And the system that manages all of this &mdash; the
              people, the rules, the incentives &mdash; hasn&apos;t been
              meaningfully reformed in decades.
            </p>
            <p>
              Members of Congress earn $174,000 while managing a $6.5 trillion
              enterprise. They&apos;re allowed to trade individual stocks while
              writing the laws that affect those stocks. There are no term
              limits. There are no professional qualifications. Lobbyists spend
              over $4 billion per year influencing legislation, and the revolving
              door between government and industry spins freely.
            </p>
            <p>
              The incentive structure is broken. The people who run the country
              are underpaid, unaccountable, and operating in a system designed
              for a different era.
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
              <strong>Republicans</strong> are right that the federal government
              is too large, too slow, and too expensive. Agencies duplicate
              functions. Regulations pile up. Bureaucracy expands while
              efficiency contracts.
            </p>
            <p>
              <strong>Democrats</strong> are right that government serves
              essential functions and that the answer isn&apos;t to destroy
              institutions but to make them work better. Gutting agencies without
              a plan doesn&apos;t make government smaller &mdash; it makes it
              worse.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. And we have a plan.
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
              The Mesocratic Party supports a comprehensive overhaul of how the
              federal government operates &mdash; starting with the people who
              run it, the rules they operate under, and the incentives that drive
              their behavior.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                1. Federal Government Efficiencies
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Every federal agency should undergo a zero-based review:
                  justify every dollar, every function, every position from
                  scratch. Not to destroy government, but to rebuild it around
                  what actually works.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Consolidate overlapping agencies and functions. There is no
                  reason for 17 different intelligence agencies and dozens of
                  overlapping regulatory bodies.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Push administrative functions to the states wherever possible.
                  The federal government should set standards, distribute
                  funding, and audit results. The states should execute.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in digital modernization. The federal government still
                  runs critical systems on technology from the 1970s. Upgrade the
                  infrastructure and reduce the headcount needed to maintain
                  legacy systems.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">2. Term Limits</h3>
              <p className="text-sm text-primary/70 leading-relaxed">
                House: 6 terms (12 years). Senate: 2 terms (12 years). Applied
                prospectively. See the dedicated{" "}
                <a
                  href="/platform/term-limits"
                  className="text-accent hover:underline"
                >
                  Term Limits
                </a>{" "}
                page for the full position.
              </p>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                3. Congressional Pay Reform
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                Members of Congress currently earn $174,000 per year &mdash; a
                salary that has been frozen since 2009. The Mesocratic Party
                supports raising congressional pay to $500,000 per year for all
                members of Congress &mdash; House and Senate alike.
              </p>
              <p className="text-sm font-semibold text-primary mb-3">
                Here&apos;s why:
              </p>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="pl-4 border-l-2 border-accent">
                  It eliminates the financial incentive to trade stocks, take
                  lobbyist favors, or leverage public service for private gain.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  It makes public service accessible to people who aren&apos;t
                  already wealthy. Right now, Congress is a millionaire&apos;s
                  club &mdash; because only millionaires can afford to take the
                  job.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  It attracts better talent. You want the best people running the
                  country? Pay them like it.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  It removes the excuse. At $500,000 per year, no member of
                  Congress can claim they need outside income, stock trades, or
                  lobbyist relationships to make ends meet.
                </li>
              </ul>
              <div className="mt-4 bg-white rounded p-4 text-sm text-primary/70">
                <p>
                  <strong>Proposed cost:</strong> 535 members &times; $500,000 =
                  $267.5 million per year
                </p>
                <p>
                  <strong>Additional cost:</strong> $174.4 million per year
                </p>
                <p>
                  <strong>Cost per American taxpayer:</strong> approximately
                  $1.13 per year
                </p>
                <p className="mt-2 font-semibold text-primary">
                  For about a dollar a year per taxpayer, you get a Congress that
                  doesn&apos;t need to trade stocks, take bribes, or serve for
                  40 years to build personal wealth. That&apos;s the best deal
                  in government.
                </p>
              </div>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                4. Congressional Stock Market Ban
              </h3>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="pl-4 border-l-2 border-accent">
                  Members of Congress, their spouses, and their dependent
                  children should be banned from trading individual stocks,
                  options, or futures while in office and for two years after
                  leaving.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Investments must be placed in blind trusts, broad-market index
                  funds, or Treasury securities.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Violations are subject to fines equal to the full value of the
                  prohibited transaction, plus referral for insider trading
                  investigation.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Full financial disclosure, updated quarterly and publicly
                  available online in real time.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                5. The Polis Doctorate (PD)
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed">
                A professional credential for federal office. See the dedicated{" "}
                <a
                  href="/platform/polis-doctorate"
                  className="text-accent hover:underline"
                >
                  Polis Doctorate
                </a>{" "}
                page for the full position.
              </p>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                6. Lobbying Transparency
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                Lobbying is protected by the First Amendment. But secrecy is not.
                The Mesocratic Party supports full transparency in how lobbyists
                interact with government:
              </p>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="pl-4 border-l-2 border-accent">
                  Real-time public disclosure of all lobbying contacts with
                  federal officials. Every meeting, every call, every dollar
                  &mdash; visible to the public within 48 hours.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  A five-year cooling-off period before former members of
                  Congress or senior executive branch officials can register as
                  lobbyists.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  A searchable, public database of all lobbying activity, linked
                  to campaign contributions and legislative outcomes. Americans
                  should be able to trace the line from a lobbying dollar to a
                  legislative vote.
                </li>
              </ul>
            </div>

            <div className="bg-white border border-primary/10 rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">The Through Line</h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                All six reforms share a single principle:
              </p>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="pl-4 border-l-2 border-primary">
                  <strong>Pay them well</strong> &mdash; so they don&apos;t need
                  outside income.
                </li>
                <li className="pl-4 border-l-2 border-primary">
                  <strong>Ban their conflicts</strong> &mdash; so they
                  can&apos;t profit from their position.
                </li>
                <li className="pl-4 border-l-2 border-primary">
                  <strong>Require credentials</strong> &mdash; so they&apos;re
                  qualified to serve.
                </li>
                <li className="pl-4 border-l-2 border-primary">
                  <strong>Impose term limits</strong> &mdash; so they don&apos;t
                  stay forever.
                </li>
                <li className="pl-4 border-l-2 border-primary">
                  <strong>Demand efficiency</strong> &mdash; so government works
                  for you, not for itself.
                </li>
                <li className="pl-4 border-l-2 border-primary">
                  <strong>Show everything</strong> &mdash; so you can see
                  who&apos;s working and who&apos;s not.
                </li>
              </ul>
              <p className="text-sm font-semibold text-primary mt-4">
                We&apos;re not just changing policies. We&apos;re changing the
                people and the system that make the policies.
              </p>
            </div>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
