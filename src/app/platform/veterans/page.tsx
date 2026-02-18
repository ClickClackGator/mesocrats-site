import type { Metadata } from "next";
import LivingPlatform from "@/components/LivingPlatform";

export const metadata: Metadata = { title: "Veterans" };

export default function VeteransPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            You Served Us. Now We Serve You.
          </h1>
          <p className="text-lg text-white/80">
            World-class healthcare, mental health support, housing, education,
            and a real transition to civilian life. Not promises. Standards.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Reality */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Reality</h2>
          <div className="space-y-4 text-primary/70 leading-relaxed">
            <p>
              Roughly 18 million veterans live in the United States. They signed
              a blank check to this country, payable up to and including their
              lives. And in return, too many of them come home to a VA system
              that makes them wait months for an appointment, a benefits process
              buried in paperwork, a mental health crisis that kills more than 17
              veterans per day by suicide, and a transition to civilian life that
              leaves them without clear career pathways, stable housing, or
              adequate support.
            </p>
            <p>
              The VA has made real progress in recent years. But progress is not
              enough when veterans are still dying in parking lots waiting for
              care, still homeless on American streets, and still fighting
              bureaucracies harder than anything they faced overseas.
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
              <strong>Republicans</strong> are right that veterans should have
              the choice to seek care outside the VA when the VA can&apos;t
              deliver. <strong>Democrats</strong> are right that the VA needs to
              be fully funded, not privatized.
            </p>
            <p className="font-semibold text-primary">
              We agree with both. Veterans don&apos;t need ideology. They need a
              system that works.
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
              The Mesocratic Party believes veterans have earned the best
              healthcare, support, and opportunities this country can provide
              &mdash; and that &ldquo;best&rdquo; should be measured by
              outcomes, not rhetoric.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                VA Healthcare: Access Standards
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  7-day access standard for primary care. If the VA cannot see a
                  veteran within 7 days, the veteran is automatically authorized
                  for community care at VA expense.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  14-day access standard for specialty care. Same rule.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Fully fund VA staffing to meet these standards internally.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand telehealth for veterans in rural areas.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">Mental Health</h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Mental health surge: dramatically increase VA mental health
                  providers.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Same-day mental health access for veterans in crisis.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand the Veterans Crisis Line with faster response times and
                  follow-up protocols.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Fund research into PTSD, traumatic brain injury, and military
                  sexual trauma.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Remove barriers to mental health care: no stigma, no career
                  penalties, no bureaucratic gatekeeping.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Digital Modernization
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Fully digitized veteran records &mdash; a single portal for
                  medical history, benefits status, claims progress, education
                  benefits, and disability rating.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Interoperability between VA and civilian healthcare systems.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Modernize the claims and appeals process with AI-assisted
                  processing and human oversight.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Veterans Housing &amp; Homelessness
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                On any given night, roughly 35,000 veterans are homeless. That
                number should be zero.
              </p>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Housing First approach for homeless veterans.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand HUD-VASH vouchers and permanent supportive housing.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Dedicated VA navigators for housing benefits.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Education &amp; GI Bill
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Protect and strengthen the GI Bill. No cuts. No erosion.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Crack down on predatory for-profit colleges that target
                  veterans.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Expand GI Bill to cover trade certifications,
                  apprenticeships, and entrepreneurship programs.
                </li>
              </ul>
            </div>

            <div className="bg-gray-light rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-3">
                Military-to-Civilian Transition
              </h3>
              <ul className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <li className="pl-4 border-l-2 border-accent">
                  Begin transition planning 12 months before separation, not 90
                  days.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Federal licensing reciprocity for military-trained
                  professionals.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Dedicated employer partnerships and hiring pipelines.
                </li>
                <li className="pl-4 border-l-2 border-accent">
                  Entrepreneurship support: small business loans, mentorship,
                  startup incubators for veteran-owned businesses.
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
              If you&apos;re a veteran: a VA that sees you in 7 days or sends
              you to someone who will. A single digital portal. Mental health
              care without stigma. Housing support. A protected GI Bill. A real
              transition process.
            </p>
            <p className="font-semibold text-primary">
              You wrote a blank check to this country. We intend to honor it.
            </p>
          </div>
        </section>
      </div>

      <LivingPlatform />
    </div>
  );
}
