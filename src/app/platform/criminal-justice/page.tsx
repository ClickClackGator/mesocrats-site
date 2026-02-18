import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Criminal Justice" };

export default function CriminalJusticePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Safe Streets. Fair System.
          </h1>
          <p className="text-lg text-white/80">
            Tough on crime. Tough on the reasons crime happens.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The United States has the highest incarceration rate in the world.
              Roughly 1.9 million Americans are behind bars &mdash; more than
              any other country, including China and India, which have
              populations four times larger. The U.S. represents 4% of the
              world&apos;s population and 20% of its prisoners.
            </p>
            <p>
              The system costs taxpayers over $80 billion per year at the federal
              and state level. Recidivism rates hover around 44% within the
              first year of release and roughly 70% within five years.
              Incarceration devastates families, particularly in Black and Latino
              communities, where the impact is disproportionate by every measure.
            </p>
            <p>
              At the same time, violent crime &mdash; while down significantly
              from its 1990s peaks &mdash; remains a daily reality in many
              American communities. People have a right to feel safe. Victims
              deserve justice. Law enforcement officers deserve support and
              accountability in equal measure.
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
              <strong>Republicans</strong> are right that public safety is
              non-negotiable. They&apos;re right that victims matter, that laws
              must be enforced, and that communities need police officers who can
              do their jobs.
            </p>
            <p>
              <strong>Democrats</strong> are right that the system is riddled
              with racial disparities. They&apos;re right that mass
              incarceration is expensive, ineffective, and disproportionately
              impacts communities of color. They&apos;re right that the root
              causes of crime &mdash; poverty, lack of opportunity, addiction,
              mental illness &mdash; must be addressed.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. Safe communities and a fair system are the same
              goal.
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
              The Mesocratic Party believes in public safety AND criminal justice
              reform. These are not in tension. A system that locks people up
              without addressing why they commit crimes is a system that
              guarantees more crime.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Public Safety &amp; Policing
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Fully fund local police departments. Communities need officers
                  on the street. &ldquo;Defund the police&rdquo; was never
                  serious policy, and we won&apos;t pretend it was.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in officer training: de-escalation, mental health
                  response, community policing. Better training makes better
                  cops.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Establish national standards for use of force and training.
                  Good officers want these standards because they protect the
                  profession.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Mandatory body cameras for all law enforcement officers, with
                  independent oversight of footage in use-of-force incidents.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Deploy co-responder mental-health teams alongside police for
                  crisis calls. Not every 911 call needs a badge and a gun
                  &mdash; some need a badge and a counselor.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Limit no-knock warrants to the most extreme circumstances with
                  judicial oversight. The default should be knock-and-announce.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Diversify police recruitment to reflect the communities
                  officers serve. Performance-based federal grants to departments
                  that meet training, transparency, and accountability
                  benchmarks.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Sentencing &amp; Incarceration Reform
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  End mandatory minimum sentences for nonviolent drug offenses.
                  Judges should judge. That&apos;s their job.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand drug courts and mental health courts that divert
                  nonviolent offenders into treatment instead of prison.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in reentry programs: job training, housing assistance,
                  mentorship. Reducing recidivism is the most cost-effective
                  public safety investment there is.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand record-sealing for nonviolent offenses. A mistake at 19
                  should not disqualify someone from a job at 35.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Keep tough penalties for violent crimes. Reform is not about
                  going soft. It&apos;s about being smart with where we spend $80
                  billion a year.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Death Penalty</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  National moratorium on the death penalty pending comprehensive
                  forensic reforms. The system has executed innocent people.
                  Until we can guarantee that it won&apos;t happen again, we
                  should pause.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Reserve capital punishment for the rarest and most extreme
                  cases, with heightened proof standards beyond current
                  requirements.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Invest in forensic science modernization &mdash; DNA evidence
                  protocols, lab accreditation, and independent review of
                  questionable convictions.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Marijuana</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Deschedule marijuana at the federal level and regulate it like
                  alcohol.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expunge federal records for low-level marijuana offenses.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Strict youth protections: age restrictions, marketing limits,
                  and DUI enforcement.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Allow states to set their own regulatory frameworks within a
                  federal baseline.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Root Causes</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Address the connection between poverty and crime by investing
                  in education, job training, and economic opportunity in
                  underserved communities.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Treat addiction as a public health issue, not a criminal one.
                  Fund treatment. Fund prevention.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand access to mental health services, especially in
                  communities with high rates of violence and incarceration.
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
              If you live in a community struggling with crime: more officers,
              better trained, with co-responder mental-health teams and the
              resources they need. If you&apos;ve been caught in the system for a
              nonviolent offense: a path to rebuild your life, including
              record-sealing. If you&apos;re a taxpayer: a system that actually
              reduces crime instead of just warehousing people at $40,000 a year
              per inmate.
            </p>
            <p className="font-semibold text-primary">
              Lock up the people who are dangerous. Help the people who can be
              helped. Stop pretending those are the same group.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
