import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Polis Doctorate" };

export default function PolisDoctoratePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Qualified to Serve.
          </h1>
          <p className="text-lg text-white/80">
            We require credentials for doctors, lawyers, teachers, and pilots.
            Why not for the people who run the country?
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              There are exactly three requirements to serve in Congress: age,
              citizenship, and residency. No education. No policy knowledge. No
              demonstrated understanding of economics, law, or the Constitution
              you swear to uphold.
            </p>
            <p>
              We require years of education for doctors, lawyers, engineers, and
              teachers. But the people who write the laws governing all of those
              professions? No qualifications required.
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
              This is a genuinely new idea. Neither party has proposed anything
              like it. Critics will argue it&apos;s elitist. We take that
              concern seriously. That&apos;s why the Polis Doctorate must be
              accessible, affordable, and open to any American citizen.
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
              The Mesocratic Party proposes the Polis Doctorate (PD): a
              professional credential for public service at the federal level.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">What It Covers</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Constitutional law and government structure
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Federal economics: fiscal policy, monetary policy, trade,
                  taxation, budgets
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Domestic policy: healthcare, education, infrastructure, energy,
                  housing, criminal justice
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Foreign policy and national security
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Ethics, conflicts of interest, and anti-corruption
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Legislative process and parliamentary procedure
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Data literacy: statistics, research methods, evidence-based
                  policy
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">How It Works</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Administered by accredited, nonpartisan institutions &mdash;
                  not by any political party.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Available online and in-person, 12&ndash;18 months to
                  complete. Designed for working adults.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Free or near-free. Federal funding covers tuition.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Required for federal office (House and Senate).
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
              Your representative actually understands the budget they&apos;re
              voting on. Your senator can read a bill and understand its
              implications.
            </p>
            <p className="font-semibold text-primary">
              If you want to govern, learn how. That&apos;s not elitism.
              That&apos;s respect for the job.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
