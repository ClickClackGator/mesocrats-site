import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Healthcare" };

export default function HealthcarePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            See a Doctor. Not a Bill.
          </h1>
          <p className="text-lg text-white/80">
            Universal baseline coverage. Private options for those who want
            more. Drug pricing reform that puts patients first.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The United States spends more per capita on healthcare than any
              nation on earth &mdash; and gets worse outcomes than most of them.
              Roughly 27 million Americans are uninsured. Tens of millions more
              are underinsured, meaning they have coverage on paper but
              can&apos;t afford to use it. Medical debt is the leading cause of
              personal bankruptcy in this country.
            </p>
            <p>
              The system is broken in every direction: insurance companies profit
              by denying claims, pharmaceutical companies charge Americans more
              than any other country, hospitals operate on opaque pricing, and
              the average family is one serious diagnosis away from financial
              ruin. The Affordable Care Act expanded coverage to millions, but it
              did not fix the underlying cost structure. Costs continue to rise
              faster than wages.
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
              <strong>Republicans</strong> are right that market competition can
              drive innovation and efficiency in healthcare. Price transparency,
              health savings accounts, and interstate competition among insurers
              are ideas worth pursuing. Single-payer systems in other countries
              often suffer from wait times and rationing.
            </p>
            <p>
              <strong>Democrats</strong> are right that healthcare is too
              important to leave entirely to the market. The profit motive in
              insurance creates a structural incentive to deny care. Millions of
              Americans fall through the cracks because they don&apos;t qualify
              for Medicaid but can&apos;t afford private insurance.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. And we have a structure.
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
              The Mesocratic Party supports a two-tier healthcare system: a
              universal public baseline that covers every American from birth,
              and a private supplemental market for those who want more.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Tier 1: Universal Baseline Coverage (public)
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed">
                Every American is covered, from birth, for essential medical
                services. This includes primary care, emergency care,
                hospitalization, mental health, preventive care, maternal care,
                and prescription drugs. No premiums. No deductibles for baseline
                services. Funded through federal revenue. If you are an American,
                you are covered. Period.
              </p>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Tier 2: Supplemental Private Insurance (optional)
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed">
                Americans who want additional coverage &mdash; private rooms,
                elective procedures, expanded provider networks, shorter wait
                times, concierge services &mdash; can purchase supplemental
                insurance from private companies competing in an open market.
                This preserves consumer choice, drives innovation, and keeps the
                private insurance industry alive for those who want more than the
                baseline.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Drug Pricing Reform</h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-4">
                The United States pays more for prescription drugs than any
                country on earth. Americans subsidize pharmaceutical company
                profits while the same drugs are sold for a fraction of the cost
                in Canada, Europe, and everywhere else. The Mesocratic Party
                supports:
              </p>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Federal negotiation of drug prices for all medications covered
                  under the universal baseline plan. The government is the
                  largest buyer. It should negotiate like one.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Transparent pricing requirements for all pharmaceutical
                  companies operating in the United States. Americans should know
                  what a drug costs to manufacture, what other countries pay for
                  it, and what they&apos;re being charged.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Importation reform that allows Americans to purchase
                  FDA-approved medications from certified international
                  pharmacies at competitive prices.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Patent reform that prevents &ldquo;evergreening&rdquo; &mdash;
                  the practice of making minor modifications to existing drugs to
                  extend patents and block generics.
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
              If you&apos;re uninsured: you&apos;re covered. If you&apos;re
              insured through your employer and happy with your plan: you can
              keep supplemental private coverage. If you&apos;re one of the
              millions of Americans who has delayed a doctor&apos;s visit
              because you were afraid of the bill: that fear is over.
            </p>
            <p>
              No American should have to choose between their health and their
              rent. No parent should have to ration insulin for their child. No
              family should lose their home because someone got cancer.
            </p>
            <p className="font-semibold text-primary">
              Healthcare is not a luxury. It&apos;s a baseline. We&apos;re going
              to treat it like one.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
