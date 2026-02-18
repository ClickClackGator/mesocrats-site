import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Gun Reform" };

export default function GunReformPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Responsible and Protected.
          </h1>
          <p className="text-lg text-white/80">
            Protect the Second Amendment. Protect your kids. We can do both.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              The United States has more guns than people &mdash; roughly 400
              million firearms. Gun violence kills more than 45,000 Americans per
              year. The debate has been stuck for decades.
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
              <strong>Republicans</strong> are right that the Second Amendment is
              a constitutional right and that the vast majority of gun owners are
              law-abiding citizens.
            </p>
            <p>
              <strong>Democrats</strong> are right that universal background
              checks have overwhelming public support and that common-sense
              regulations can save lives.
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
              The Mesocratic Party supports the Second Amendment and supports
              common-sense gun safety measures.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Universal Background Checks
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Require background checks for every gun sale &mdash; including
                  private sales, gun shows, and online transactions.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Modernize and fully fund NICS.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Incentivize states to submit complete records.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Red-Flag Laws (Extreme Risk Protection Orders)
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Support due-process red-flag laws with judicial review, time
                  limits, and a clear path to restoration of rights.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Due process is non-negotiable.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Fund state-level implementation.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Safe Storage &amp; Straw Purchasing
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Safe-storage incentives: tax credits for safes, trigger locks,
                  and secure storage.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Crack down on straw purchasing with strengthened federal
                  penalties.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Target illegal gun trafficking networks.
                </li>
              </ul>
            </div>

            <div className="bg-white border border-primary/10 rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">What We Will Not Do</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-primary">
                  We will not support a ban on any class of firearms owned by
                  law-abiding Americans.
                </li>
                <li className="pl-4 border-l-2 border-primary">
                  We will not support a national gun registry.
                </li>
                <li className="pl-4 border-l-2 border-primary">
                  We will not demonize gun owners.
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
              If you&apos;re a gun owner: your rights are protected. If
              you&apos;re a parent: common-sense measures that keep guns out of
              dangerous hands. If you&apos;re tired of the same argument going
              nowhere: a party that will actually do something without violating
              the Constitution.
            </p>
            <p className="font-semibold text-primary">
              Protect the right. Protect the people. Stop pretending you
              can&apos;t do both.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
