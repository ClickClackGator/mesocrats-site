import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div>
      <section className="bg-primary text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-white/50 mt-2">
            Effective Date: February 2025
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose-sm space-y-8 text-primary/70 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Introduction</h2>
          <p>
            The Mesocratic National Committee (&ldquo;MNC,&rdquo;
            &ldquo;we,&rdquo; &ldquo;our&rdquo;) operates the website
            mesocrats.org. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website
            or interact with our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Information We Collect
          </h2>
          <p className="mb-3">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, mailing
              address, zip code, phone number, occupation, and employer name when
              you sign up, volunteer, donate, or contact us.
            </li>
            <li>
              <strong>Contribution Information:</strong> As required by federal
              law, we collect and report the name, mailing address, occupation,
              and employer of individuals whose contributions exceed $200 in an
              election cycle.
            </li>
            <li>
              <strong>Usage Data:</strong> IP address, browser type, pages
              visited, time and date of visit, and other diagnostic data
              collected automatically through cookies and similar technologies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To process memberships, volunteer signups, and event registrations.</li>
            <li>To communicate with you about party news, events, and opportunities.</li>
            <li>To comply with federal and state campaign finance reporting requirements.</li>
            <li>To improve our website, services, and communications.</li>
            <li>To respond to your inquiries and requests.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Sharing Your Information
          </h2>
          <p className="mb-3">
            We do not sell your personal information. We may share information
            in the following circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Legal Requirements:</strong> Contribution data is reported
              to the Federal Election Commission (FEC) as required by law and is
              publicly available.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party service providers who assist us in operating our
              website and conducting our activities.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may disclose information
              when required by law or to protect our rights and the safety of
              others.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Cookies and Tracking
          </h2>
          <p>
            We use cookies and similar tracking technologies to analyze website
            traffic and improve your experience. You can configure your browser
            to refuse cookies, though some features of the site may not function
            properly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal
            information. However, no method of electronic storage or transmission
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your
            personal information by contacting us at{" "}
            <a
              href="mailto:info@mesocrats.org"
              className="text-secondary hover:underline"
            >
              info@mesocrats.org
            </a>
            . Please note that certain information required by campaign finance
            law cannot be deleted from FEC filings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated effective date. Your continued
            use of the site after changes are posted constitutes your acceptance
            of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Contact</h2>
          <p>
            Questions about this Privacy Policy? Contact us at{" "}
            <a
              href="mailto:info@mesocrats.org"
              className="text-secondary hover:underline"
            >
              info@mesocrats.org
            </a>{" "}
            or by mail at:
          </p>
          <p className="mt-2">
            Mesocratic National Committee
            <br />
            P.O. Box 15523
            <br />
            Richmond, VA 23227
          </p>
        </section>
      </article>
    </div>
  );
}
