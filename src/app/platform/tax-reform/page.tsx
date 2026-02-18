import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Tax Reform" };

export default function TaxReformPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            One Rate. No Loopholes. Done.
          </h1>
          <p className="text-lg text-white/80">
            12.5% on everything you earn. That&apos;s the entire tax code.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The federal tax code is over 4 million words long. Americans spend
              more than 6.5 billion hours per year on tax compliance. The total
              cost of that compliance exceeds $400 billion annually &mdash; money
              that produces nothing, employs no one productively, and exists
              solely to navigate a system designed to be navigated by those who
              can afford to hire navigators.
            </p>
            <p>
              The system has seven tax brackets, three capital gains rates, an
              Alternative Minimum Tax, dozens of deductions, hundreds of credits,
              and thousands of rules that change depending on who you are, what
              you earn, and how good your accountant is. The stated top rate is
              37%. The average American actually pays about 14%. The wealthiest
              Americans, with the best tax attorneys, often pay less than that.
            </p>
            <p className="font-semibold text-primary">
              The complexity is the inequality.
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
              <strong>Republicans</strong> are right that lower tax rates
              stimulate economic growth, attract investment, and allow Americans
              to keep more of what they earn. They&apos;re right that the tax
              code is too complex and that it punishes productivity.
            </p>
            <p>
              <strong>Democrats</strong> are right that the wealthy exploit
              loopholes to pay lower effective rates than working families.
              They&apos;re right that deductions for mortgage interest, state
              taxes, and charitable giving disproportionately benefit the rich.
              They&apos;re right that the system isn&apos;t fair.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. And we have a number.
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
              The Mesocratic Party proposes a flat federal tax rate of 12.5% on
              all individual income &mdash; earned income and capital gains
              alike. One rate. One rule. Applied equally to every American.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">How we got to 12.5%</h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                We didn&apos;t invent a number. We looked at six years of IRS
                data (2017&ndash;2022) and asked one question: what does the
                federal government actually collect from individual income taxes,
                as a percentage of reported income?
              </p>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                The answer: approximately 14%.
              </p>
              <p className="text-sm text-primary/70 leading-relaxed">
                But that 14% is calculated on Adjusted Gross Income &mdash; a
                reduced number that reflects income after deductions and
                loopholes have already shrunk it. When you eliminate all
                deductions and apply a flat rate to the full, expanded tax base,
                12.5% generates the same revenue the government collects today.
              </p>
              <p className="text-sm font-semibold text-primary mt-3">
                We looked at what the country already collects, made it honest,
                and dropped it a point. The math did the talking.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">What this eliminates</h3>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="pl-4 border-l-2 border-accent">
                  All seven individual income tax brackets
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  All itemized deductions (SALT, mortgage interest, charitable,
                  medical)
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  The Alternative Minimum Tax
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Preferential capital gains rates (0%, 15%, 20%)
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  The carried interest loophole
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  The Net Investment Income Tax (3.8% surtax)
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  The Qualified Business Income deduction
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">What this preserves</h3>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="pl-4 border-l-2 border-accent">
                  A personal exemption of $20,000 per individual ($40,000 for
                  married couples) &mdash; income below this threshold is not
                  taxed
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  The Earned Income Tax Credit (EITC) &mdash; protecting working
                  families at the bottom of the income scale
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  The Child Tax Credit (CTC)
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Tax-deferred retirement accounts (401k, IRA) &mdash;
                  contributions remain pre-tax; distributions taxed at 12.5%
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Capital gains: one rate for all income
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                Under the current system, investment income is taxed at lower
                rates than work income. A hedge fund manager can pay a lower
                effective rate than a nurse. The carried interest loophole lets
                private equity firms reclassify ordinary income as capital gains
                to cut their tax bill.
              </p>
              <p className="text-sm text-primary/70 leading-relaxed">
                The 12.5% Plan ends this. Income is income. A dollar earned from
                a paycheck and a dollar earned from a stock sale are the same
                dollar. Both are taxed at 12.5%. The loophole doesn&apos;t need
                to be closed &mdash; it ceases to exist.
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
              If you earn under $20,000 (or $40,000 married): you pay nothing.
              If you&apos;re a middle-class worker: your rate drops and your
              taxes fit on a postcard. If you&apos;re wealthy: you pay the same
              rate as everyone else, on all your income, with no loopholes. If
              you&apos;re a taxpayer who&apos;s sick of a rigged system:
              it&apos;s unrigged.
            </p>
            <p className="font-semibold text-primary">
              One rate. No loopholes. The IRS already collects about 14%. We made
              it 12.5% and made it honest. That&apos;s the plan.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
