import type { Metadata } from "next";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { formPageContentQuery } from "@/sanity/lib/queries";
import DonateForm from "./DonateForm";

/* ── Fallbacks ── */
const F = {
  heroHeadline: "Fund the Middle Ground.",
  heroSubheadline:
    "Donations are coming soon. Join our email list to be the first to know.",
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "donate" },
    { next: { revalidate: 60 } }
  );
  return {
    title: content?.heroHeadline || "Donate",
    description: content?.heroSubheadline || F.heroSubheadline,
  };
}

export default async function DonatePage() {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "donate" },
    { next: { revalidate: 60 } }
  );

  const hasBodyContent = content?.bodyContent && content.bodyContent.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {content?.heroHeadline || F.heroHeadline}
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            {content?.heroSubheadline || F.heroSubheadline}
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          {hasBodyContent ? (
            <div className="mb-8 text-left">
              <PortableTextRenderer value={content.bodyContent} />
            </div>
          ) : (
            <div className="bg-gray-light rounded-lg p-10 mb-8">
              <p className="text-5xl mb-6">&#9888;</p>
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-primary/70 leading-relaxed mb-4">
                We&apos;re building the donation platform now. When it launches,
                every dollar will go directly to building this party and getting
                Mesocrats on ballots.
              </p>
              <p className="text-primary/70 leading-relaxed">
                Join our email list to be the first to know when donations open.
              </p>
            </div>
          )}

          <DonateForm />

          {/* FEC Disclaimer */}
          <div className="mt-10 p-6 border border-primary/10 rounded-lg">
            <p className="text-xs text-primary/50 leading-relaxed">
              {content?.legalText ||
                "Paid for by the Mesocratic National Committee (mesocrats.org). Not authorized by any candidate or candidate\u2019s committee. Contributions or gifts to the Mesocratic National Committee are not tax deductible. Federal law requires us to use our best efforts to collect and report the name, mailing address, occupation, and name of employer of individuals whose contributions exceed $200 in an election cycle."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
