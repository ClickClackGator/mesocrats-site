import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Energy & Environment" };

export default function EnergyEnvironmentPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            All of the Above.
          </h1>
          <p className="text-lg text-white/80">
            Clean energy AND energy independence. Protect the planet AND protect
            American jobs.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The United States is the world&apos;s largest oil and gas
              producer. Fossil fuels still account for roughly 60% of U.S.
              electricity generation. At the same time, global temperatures are
              rising, extreme weather events are increasing in frequency and
              severity, and the economic costs of climate change &mdash; property
              damage, agricultural disruption, health impacts &mdash; are
              measured in hundreds of billions of dollars per year.
            </p>
            <p>
              The transition to clean energy is happening whether anyone likes it
              or not. Solar and wind are now cheaper than coal in most markets.
              The question is not whether the transition happens. The question is
              whether America leads it or gets left behind.
            </p>
            <p>
              Meanwhile, millions of American jobs depend on the fossil fuel
              industry. Entire communities in Appalachia, Texas, the Permian
              Basin, and beyond are built on oil, gas, and coal. Any energy
              policy that treats those workers and communities as acceptable
              casualties is not serious policy. It&apos;s ideology.
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
              <strong>Republicans</strong> are right that energy independence
              matters, that fossil fuels are not going away overnight, and that
              killing domestic energy production while importing from adversaries
              is self-defeating.
            </p>
            <p>
              <strong>Democrats</strong> are right that climate change is real,
              that human activity is the primary driver, and that the costs of
              inaction far exceed the costs of action.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. And we think the false choice between economy
              and environment is the biggest lie in American politics.
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
              The Mesocratic Party supports an all-of-the-above energy strategy
              that accelerates the transition to clean energy while protecting
              energy workers and maintaining energy independence throughout the
              transition.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Clean Energy Acceleration
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Massively invest in solar, wind, nuclear, and advanced energy
                  storage.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Treat nuclear energy as what it is: the most reliable,
                  highest-output, zero-carbon energy source available. Build new
                  plants. Modernize existing ones. Invest in small modular
                  reactors (SMRs). Include nuclear in all clean energy credits
                  and incentives.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in grid modernization. The U.S. electrical grid is
                  aging infrastructure built for a different era. Upgrade it.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Permitting Reform</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  One-year permit shot-clock for all energy projects &mdash;
                  nuclear, renewables, and fossil alike. Concurrent federal
                  reviews, not sequential.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Apply the shot-clock to grid infrastructure and transmission
                  lines, not just generation.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Fossil Fuel Transition (Not Elimination)
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Maintain domestic oil and gas production during the transition.
                  Energy independence is a national security imperative.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Natural gas as a bridge fuel: cleaner than coal, available now,
                  and a realistic path to lower emissions while renewable
                  capacity scales.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Allow low-leak fossil projects as bridge infrastructure during
                  the transition, with strong methane controls. Methane is 80
                  times more potent than CO2 over 20 years &mdash; controlling it
                  is one of the fastest, cheapest ways to reduce emissions.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Workers &amp; Communities
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Create a dedicated Energy Transition Fund for fossil fuel
                  workers and communities. Job retraining, relocation assistance,
                  economic development grants, and pension protection.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Prioritize clean energy manufacturing and construction in
                  communities currently dependent on fossil fuels.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  No worker left behind. This is a policy commitment, not a
                  talking point.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Environmental Protection
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Protect public lands and waterways. Conservation is a
                  conservative value &mdash; literally.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Enforce the Clean Air Act and Clean Water Act.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in climate resilience: flood defenses, wildfire
                  management, drought-resistant agriculture, coastal
                  infrastructure.
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
              If you work in energy: your job is protected during the transition,
              and new opportunities are coming. If you care about the climate:
              real investment in clean energy with nuclear at the center. If
              you&apos;re paying an electric bill: a grid that&apos;s cleaner,
              more reliable, and built on projects that can actually get
              permitted.
            </p>
            <p className="font-semibold text-primary">
              Protect the planet. Protect the paycheck. Stop pretending you
              can&apos;t do both.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
