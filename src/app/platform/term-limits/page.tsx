import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Term Limits" };

export default function TermLimitsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Serve. Then Go Home.
          </h1>
          <p className="text-lg text-white/80">
            Public office is a tour of duty, not a career. Term limits for
            Congress and the Senate.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The average tenure of a U.S. senator is over 11 years. Some have
              served for 30, 40, even 50 years. In the House, incumbents win
              reelection at rates above 90%. Term limits are supported by roughly
              80% of Americans across party lines.
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
              <strong>Republicans</strong> have historically supported term
              limits in principle. <strong>Democrats</strong> have generally
              opposed them, arguing voters already have the power to remove
              incumbents.
            </p>
            <p className="font-semibold text-primary">
              We think 80% of America has this one right.
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
              The Mesocratic Party supports constitutional term limits for both
              chambers of Congress.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">The Proposal</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  House of Representatives: maximum of 6 terms (12 years).
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Senate: maximum of 2 terms (12 years).
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Apply prospectively: current members are grandfathered.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Mesocratic candidates will voluntarily pledge to serve no more
                  than the proposed limits &mdash; leading by example.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">What This Fixes</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Breaks the incumbency advantage that makes 90%+ of House seats
                  effectively uncontested.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Reduces seniority-based committee systems that reward longevity
                  over competence.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Creates a pipeline for new voices, new ideas, and new
                  leadership.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Weakens permanent donor-politician relationships that fuel
                  corruption and gridlock.
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
              Your representative works for you, not for their next reelection.
              Congress gets new blood on a regular cycle. The permanent political
              class dissolves.
            </p>
            <p className="font-semibold text-primary">
              Public office is a tour of duty. Serve your country. Then go home
              and live under the laws you passed.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
