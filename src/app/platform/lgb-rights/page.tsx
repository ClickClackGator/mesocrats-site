import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "LGB Rights" };

export default function LGBRightsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Equal Under the Law.
          </h1>
          <p className="text-lg text-white/80">
            Marriage. Family. Protection from discrimination. For every American.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              Same-sex marriage is settled law. But legal recognition and lived
              equality are not the same thing. In many states, it is still legal
              to fire someone, deny them housing, or refuse them service because
              of their sexual orientation. Federal anti-discrimination
              protections for LGB Americans remain incomplete.
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
              <strong>Republicans</strong> are right that religious liberty
              matters. Houses of worship should not be compelled to perform
              ceremonies that violate their doctrine.
            </p>
            <p>
              <strong>Democrats</strong> are right that anti-discrimination
              protections should cover sexual orientation in employment, housing,
              and public accommodations.
            </p>
            <p className="font-semibold text-primary">We agree with both.</p>
          </div>
        </section>

        {/* Where We Stand */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Where We Stand
          </h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The Mesocratic Party supports full legal equality for lesbian, gay,
              and bisexual Americans &mdash; including marriage, adoption, and
              protection from discrimination &mdash; with respect for religious
              institutions&apos; internal doctrinal practices.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Marriage &amp; Family
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Marriage equality is settled law and we fully support it.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Equal adoption rights for LGB individuals and couples in every
                  state.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Protect the Respect for Marriage Act.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Anti-Discrimination Protections
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Federal baseline anti-discrimination protections covering
                  sexual orientation in employment, housing, and public
                  accommodations.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Anti-bullying protections in schools.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Streamlined legal processes for name changes and document
                  updates.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Religious Liberty</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Protect the right of religious institutions to follow their own
                  doctrine regarding marriage ceremonies and internal practices.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Religious liberty does not extend to commercial discrimination.
                  A business open to the public serves the public.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Promote mediation frameworks for good-faith conflicts rather
                  than litigation-first approaches.
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
              If you&apos;re an LGB American: full legal equality regardless of
              what state you live in. If you&apos;re a person of faith: your
              church&apos;s doctrine is protected. If you&apos;re anyone else: a
              country where the law treats people equally.
            </p>
            <p className="font-semibold text-primary">
              Equal under the law. Period.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
