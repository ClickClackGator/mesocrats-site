import type { Metadata } from "next";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { formPageContentQuery } from "@/sanity/lib/queries";
import ConventionForm from "../ConventionForm";

/* ── Fallbacks ── */
const F = {
  heroHeadline: "Register Your Interest",
  heroSubheadline:
    "Convention X details are still being finalized. Register now and we\u2019ll keep you updated as plans develop.",
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "ccx-register" },
    { next: { revalidate: 60 } }
  );
  return {
    title: content?.heroHeadline || "Register for Convention X",
    description: content?.heroSubheadline || F.heroSubheadline,
  };
}

export default async function ConventionRegisterPage() {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "ccx-register" },
    { next: { revalidate: 60 } }
  );

  const hasBodyContent = content?.bodyContent && content.bodyContent.length > 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cmsCards = content?.cards as any[] | undefined;
  const hasCards = cmsCards && cmsCards.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {content?.heroHeadline || F.heroHeadline}
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            {content?.heroSubheadline || F.heroSubheadline}
          </p>
        </div>
      </section>

      {/* CMS Body Content */}
      {hasBodyContent && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <PortableTextRenderer value={content.bodyContent} />
          </div>
        </section>
      )}

      {/* CMS Cards */}
      {hasCards && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cmsCards.map(
                (c: { headline?: string; body?: string }, i: number) => (
                  <div key={c.headline || i} className="bg-gray-light rounded-lg p-8">
                    <h3 className="text-xl font-bold mb-3">
                      {c.headline || ""}
                    </h3>
                    <p className="text-sm text-primary/70 leading-relaxed">
                      {c.body || ""}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Registration Form */}
      <section className="bg-gray-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">
            Register Your Interest
          </h2>
          <p className="text-primary/60 text-center mb-8">
            Fill out the form below and we&apos;ll keep you updated as
            Convention X plans develop.
          </p>
          <ConventionForm />
        </div>
      </section>
    </div>
  );
}
