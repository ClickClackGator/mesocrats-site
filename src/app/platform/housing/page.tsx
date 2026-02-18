import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Housing" };

export default function HousingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            A Home You Can Afford.
          </h1>
          <p className="text-lg text-white/80">
            The American Dream starts with a roof. We&apos;re going to make sure
            you can afford one.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The median home price in the United States has more than doubled
              since 2012. In many major metros, the median home now costs 6&ndash;8
              times the median household income. Mortgage rates have risen
              sharply, and even with a solid income, millions of Americans are
              locked out of homeownership.
            </p>
            <p>
              Rents are not better. More than half of renters in the U.S. spend
              over 30% of their income on housing. Homelessness has risen to over
              650,000 people on any given night.
            </p>
            <p>
              The core problem is supply. The United States is estimated to be
              3&ndash;7 million housing units short of what&apos;s needed.
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
              <strong>Republicans</strong> are right that overregulation drives
              up housing costs. They&apos;re right that the private market should
              be the primary builder of housing.
            </p>
            <p>
              <strong>Democrats</strong> are right that affordable housing
              requires public investment. They&apos;re right that institutional
              investors buying up single-family homes have warped the market.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. Housing is a supply problem with regulatory
              causes and market distortions.
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
              The Mesocratic Party&apos;s housing policy is built on one
              principle: build more homes. Fix the supply, and the market works.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Increase Housing Supply
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Federal incentives for states and municipalities that reform
                  zoning to allow higher-density housing. Tie federal
                  infrastructure funding to zoning reform.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Streamline permitting for residential construction.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in modular and prefabricated housing construction.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Open underused federal land near job centers for housing
                  development.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Protect Homebuyers &amp; Renters
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Ban institutional investors from purchasing single-family
                  homes. Housing is for families, not for hedge fund portfolios.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Federal matched down-payment program for first-time homebuyers.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand starter-home tax credits to incentivize entry-level home
                  construction.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Protect renters from predatory practices: rent transparency,
                  limits on junk fees, just-cause eviction protections.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand the Low-Income Housing Tax Credit (LIHTC).
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Homelessness</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Housing First approach: get people into stable housing, then
                  address underlying issues.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Clear encampment rules with shelter offers: communities can
                  enforce public health standards, but only when adequate shelter
                  alternatives are available.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Increase federal funding for permanent supportive housing.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in mental health and addiction treatment infrastructure.
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
              If you&apos;re trying to buy your first home: more homes, no
              institutional investors outbidding you, matched down-payment
              assistance. If you&apos;re renting: protections from predatory
              landlords. If you&apos;re a developer: less red tape.
            </p>
            <p className="font-semibold text-primary">
              Build more homes. Cut the red tape. Stop letting Wall Street outbid
              families. That&apos;s the plan.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
