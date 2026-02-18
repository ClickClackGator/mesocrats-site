import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Digital Voting" };

export default function DigitalVotingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Your Vote. Your Phone. Your Democracy.
          </h1>
          <p className="text-lg text-white/80">
            A modern civic platform that lets every American research, compare,
            and vote &mdash; from anywhere.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              Voter turnout in U.S. presidential elections hovers around 60%. In
              midterms, it drops to roughly 40%. In local elections &mdash; the
              ones that most directly affect your daily life &mdash; turnout can
              fall below 20%. The United States, the world&apos;s oldest
              democracy, has one of the lowest voter participation rates among
              developed nations.
            </p>
            <p>
              The reason is not apathy. It&apos;s friction. Americans vote on a
              Tuesday, during work hours, at a single physical location.
              Registration requirements vary by state. Voter ID laws vary by
              state. Early voting and mail-in options vary by state. The system
              was designed for the 18th century and never fully updated.
            </p>
            <p>
              Meanwhile, Americans bank online, file taxes online, manage their
              health records online, and conduct nearly every other important
              transaction in their lives digitally. Voting is the last civic
              function still trapped in the analog age.
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
              <strong>Republicans</strong> are right that election security is
              paramount. Every vote must be verifiable. Voter ID requirements
              exist to ensure that only eligible citizens vote. Fraud, even if
              rare, must be prevented.
            </p>
            <p>
              <strong>Democrats</strong> are right that barriers to voting
              suppress turnout, particularly among working-class and minority
              voters. Same-day registration, extended early voting, and mail-in
              options increase participation. More voters means a healthier
              democracy.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. And we think the entire debate is stuck in the
              wrong century.
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
              The Mesocratic Party supports a secure, digital civic platform that
              lets every American register, research candidates, compare
              positions, track lobbying activity, and cast their vote from any
              device, at any time, during an open voting window.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">The Platform</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  A single federal digital platform (web + mobile app) that
                  serves as the hub for all elections: federal, state, and local.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Integrated voter registration: register or update your
                  registration in under two minutes.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Candidate comparison tools: side-by-side policy positions,
                  voting records (for incumbents), donor lists, and endorsement
                  maps.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Lobbying transparency: see which lobbyists are meeting with
                  which officials, on what topics, and how money flows into
                  campaigns.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Secure digital voting with multi-factor authentication,
                  biometric verification, and end-to-end encryption.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Open voting window: voters can cast and change their vote at
                  any time during a defined period (e.g., 30 days before Election
                  Day through Election Day). Your last submission is your final
                  vote.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Security</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  End-to-end encryption for all vote data.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Multi-factor authentication (government-issued ID + biometric +
                  device verification).
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Blockchain-based audit trail: every vote is verifiable by the
                  voter, auditable by election officials, and tamper-evident.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Paper backup receipts available on demand for any voter who
                  wants one.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Open-source code: the platform&apos;s source code is publicly
                  available for independent security review.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Accessibility</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  In-person voting locations remain available for anyone who
                  prefers them, cannot access digital tools, or needs
                  accommodation.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Multilingual support: the platform operates in every language
                  currently required by the Voting Rights Act, plus additional
                  languages based on community needs.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Accessibility compliance: full support for screen readers,
                  voice navigation, and assistive technologies.
                </li>
              </ul>
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
              You can vote from your couch, your car, or your lunch break. You
              can research every candidate before you vote. You can see who&apos;s
              funding them. You can change your mind. And your vote is more
              secure than your bank account.
            </p>
            <p className="font-semibold text-primary">
              If you can file your taxes on your phone, you should be able to
              vote on your phone. It&apos;s 2026. Let&apos;s act like it.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
