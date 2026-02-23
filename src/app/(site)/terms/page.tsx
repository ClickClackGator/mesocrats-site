import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div>
      <section className="bg-primary text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold">Terms of Service</h1>
          <p className="text-sm text-white/50 mt-2">
            Effective Date: February 2025
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose-sm space-y-8 text-primary/70 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Acceptance of Terms
          </h2>
          <p>
            By accessing or using the website mesocrats.org (the
            &ldquo;Site&rdquo;), operated by the Mesocratic National Committee
            (&ldquo;MNC,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;), you
            agree to be bound by these Terms of Service. If you do not agree to
            these terms, do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Use of the Site
          </h2>
          <p className="mb-3">
            You agree to use this Site only for lawful purposes and in a manner
            that does not infringe on the rights of others or restrict their use
            of the Site. You may not:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the Site for any unlawful purpose.</li>
            <li>Attempt to gain unauthorized access to the Site or its systems.</li>
            <li>Transmit viruses, malware, or other harmful code.</li>
            <li>Impersonate any person or entity.</li>
            <li>
              Use automated tools to scrape, collect, or harvest data from the
              Site without our written permission.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Intellectual Property
          </h2>
          <p>
            All content on this Site — including text, graphics, logos, and
            design — is the property of the Mesocratic National Committee or its
            licensors and is protected by copyright, trademark, and other
            intellectual property laws. You may not reproduce, distribute, or
            create derivative works from this content without our prior written
            consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            User-Submitted Content
          </h2>
          <p>
            By submitting any content to the Site (including form submissions,
            feedback, or ideas), you grant the MNC a non-exclusive, royalty-free,
            perpetual, irrevocable right to use, modify, publish, and distribute
            such content in connection with the party&apos;s mission and
            activities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Disclaimer of Warranties
          </h2>
          <p>
            The Site is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, whether express or
            implied. We do not warrant that the Site will be uninterrupted,
            error-free, or free of viruses or other harmful components.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, the MNC shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of the Site or any content on it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Third-Party Links
          </h2>
          <p>
            The Site may contain links to third-party websites. We are not
            responsible for the content, privacy practices, or policies of those
            sites. Accessing third-party links is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these Terms of Service at any time.
            Changes will be posted on this page with an updated effective date.
            Your continued use of the Site after changes are posted constitutes
            your acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">
            Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the Commonwealth of Virginia, without regard to its
            conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Contact</h2>
          <p>
            Questions about these Terms of Service? Contact us at{" "}
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
