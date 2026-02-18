import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Education" };

export default function EducationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Invest in Minds. Invest in America.
          </h1>
          <p className="text-lg text-white/80">
            Free public education from Pre-K through a bachelor&apos;s degree.
            Pay teachers what they&apos;re worth.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The United States once had the best-educated workforce in the
              world. That is no longer true. American students rank 36th in math
              and 13th in reading among OECD countries. Teacher shortages are at
              record levels. Public school funding varies wildly by ZIP code
              &mdash; creating a system where the quality of your education
              depends on where you were born.
            </p>
            <p>
              Higher education has become a debt machine. The average student
              loan balance exceeds $37,000. Total student debt in the United
              States surpasses $1.7 trillion. An entire generation is starting
              adult life in a financial hole that delays homeownership, family
              formation, and wealth building &mdash; the very things that define
              the middle class.
            </p>
            <p>
              And the people we trust to educate our children &mdash; teachers
              &mdash; are among the most underpaid professionals in the country.
              The average public school teacher salary is roughly $65,000, which
              in many states and metro areas is barely a living wage. We ask
              teachers to shape the future of the nation and pay them like we
              don&apos;t mean it.
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
              <strong>Republicans</strong> are right that the federal Department
              of Education has grown too large, too bureaucratic, and too
              disconnected from the communities it&apos;s supposed to serve.
              Education works best when decisions are made closer to students,
              not farther away. Local control matters.
            </p>
            <p>
              <strong>Democrats</strong> are right that education is a public
              good and that access to quality schooling should not depend on your
              parents&apos; income or your neighborhood&apos;s property tax base.
              Public investment in education is an investment in the
              country&apos;s future.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. And we&apos;re willing to pay for it.
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
              The Mesocratic Party supports free public education from Pre-K
              through a bachelor&apos;s degree at any public university in
              America. We support a dramatic increase in teacher pay at every
              level. And we support shrinking the Department of Education while
              strengthening state-run schools.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Teacher Pay</h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                The Mesocratic Party supports a dramatic increase in teacher
                compensation at every level &mdash; elementary, secondary, and
                post-secondary. We want teaching to be one of the most desirable
                professions in the country. The only way to get there is to pay
                accordingly.
              </p>
              <p className="text-sm text-primary/70 leading-relaxed">
                When you raise teacher pay, you attract better candidates. When
                you attract better candidates, you improve outcomes. When you
                improve outcomes, you build a stronger workforce, a stronger
                economy, and a stronger country. It&apos;s not complicated.
                It&apos;s just underfunded.
              </p>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Shrink the Department of Education. Strengthen state schools.
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                The federal government&apos;s role in education should be
                funding, accountability, and support &mdash; not
                micromanagement. The Department of Education should be smaller,
                leaner, and focused on three things:
              </p>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="pl-4 border-l-2 border-accent">
                  Distributing federal education funding to states based on
                  transparent, outcome-based formulas.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Setting minimum national standards (not curricula) for
                  literacy, numeracy, and graduation rates.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Ensuring civil rights compliance in all publicly funded
                  schools.
                </li>
              </ul>
              <p className="text-sm text-primary/70 leading-relaxed mt-3">
                Everything else &mdash; curriculum, hiring, school operations,
                and local policy &mdash; stays with the states and school
                districts.
              </p>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Free Public College</h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                The Mesocratic Party supports eliminating tuition at public
                universities for all American students. This is not a radical
                idea. It&apos;s how public education already works from
                kindergarten through 12th grade. We&apos;re extending the same
                principle four more years.
              </p>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="pl-4 border-l-2 border-accent">
                  Tuition-free education at any public college or university in
                  the student&apos;s home state.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Room, board, and living expenses are the student&apos;s
                  responsibility (via work, family, or existing aid programs).
                  This is about eliminating the tuition barrier, not creating a
                  free ride.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Private universities are unaffected. This is a public
                  investment in public institutions.
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
              If you&apos;re a parent: your child can attend any public
              university in your state, tuition-free. If you&apos;re a teacher:
              you&apos;re finally paid what you&apos;re worth. If you&apos;re a
              student: you start your adult life without a $37,000 anchor around
              your neck. If you&apos;re a taxpayer: you&apos;re investing in the
              workforce, the economy, and the country&apos;s future.
            </p>
            <p className="font-semibold text-primary">
              The best investment America can make is in its own people. Pay the
              teachers. Free the students. Watch what happens.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
