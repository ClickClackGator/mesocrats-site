import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Immigration" };

export default function ImmigrationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Secure the Border. Fix the System.
          </h1>
          <p className="text-lg text-white/80">
            Strong borders AND a working immigration system. You can have both.
            We insist on it.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The United States immigration system is broken in every direction.
              The border is under-resourced and overwhelmed. The legal
              immigration process takes years or decades. Employers can&apos;t
              find workers. Undocumented immigrants who have lived here for
              decades exist in a permanent legal gray zone. And every two to four
              years, both parties use immigration as a weapon instead of fixing
              it.
            </p>
            <p>
              There are roughly 11 million undocumented immigrants living in the
              United States. Many have been here for 10, 20, or 30 years. They
              work. They pay taxes. Their kids go to American schools. Meanwhile,
              the legal immigration system has backlogs stretching 10&ndash;20
              years for some countries, and the asylum system is so overloaded
              that cases take years to adjudicate.
            </p>
            <p>
              The status quo serves no one.
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
              <strong>Republicans</strong> are right that border security
              matters. A country has the right and responsibility to control who
              enters. They&apos;re right that an unmanaged border creates
              security risks, strains public services, and undermines the rule
              of law.
            </p>
            <p>
              <strong>Democrats</strong> are right that immigrants are a net
              positive for the American economy. They&apos;re right that
              Dreamers &mdash; people brought here as children &mdash; deserve a
              path forward. They&apos;re right that the asylum system exists for
              a reason and that turning away legitimate refugees violates
              American values.
            </p>
            <p className="font-semibold text-primary">
              We agree with both sides. And we think the reason nothing gets
              fixed is that both parties prefer the issue to the solution.
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
              The Mesocratic Party supports strong borders AND a modernized
              legal immigration system. These are not contradictory. They are
              complementary. A secure border gives you the credibility to fix
              the system behind it.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Border Security</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Fully fund Customs and Border Protection (CBP) with modern
                  technology: sensors, drones, surveillance systems, and
                  personnel.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Complete physical barriers where terrain and data show they
                  are effective. No ideology about walls &mdash; use what works
                  where it works.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in ports of entry, where the majority of drug
                  trafficking actually occurs. More inspection technology, more
                  agents, faster processing.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Increase immigration judges to reduce the asylum backlog from
                  years to months. Rapid asylum adjudication is a border
                  security measure.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Legal Immigration Reform
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Streamline the legal immigration process. If it takes 15 years
                  to get a green card, the system is a failure, not a feature.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand work visas tied to actual labor market needs. Let
                  employers hire the workers they need through legal channels.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Create a merit-based track alongside the existing family-based
                  system &mdash; not instead of it.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Mandatory E-Verify for all employers. If you want to stop
                  illegal hiring, verify legal status at the point of
                  employment. This is the single most effective tool to reduce
                  the incentive for illegal immigration.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Undocumented Immigrants Already Here
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Earned legal status &mdash; not automatic citizenship, but a
                  clear legal path for undocumented immigrants who have been in
                  the country for 5+ years, have no serious criminal record, and
                  pay a penalty fee plus back taxes.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Permanent protection and a path to citizenship for Dreamers
                  (DACA recipients). They grew up American. They are American.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  No mass deportation of long-term, law-abiding residents.
                  It&apos;s economically destructive, logistically impossible,
                  and morally wrong.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Zero tolerance for violent criminals regardless of immigration
                  status. Public safety is non-negotiable.
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
              If you live near the border: a fully funded, technology-driven
              security system that actually works. If you&apos;re an employer:
              mandatory E-Verify and a legal immigration system that lets you
              hire the workers you need without breaking the law. If you&apos;re
              an immigrant who&apos;s been here for years playing by the rules:
              a path out of the shadows. If you&apos;re a Dreamer: you&apos;re
              home.
            </p>
            <p className="font-semibold text-primary">
              Secure the border. Fix the system. Stop using people as political
              props. That&apos;s the policy.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
