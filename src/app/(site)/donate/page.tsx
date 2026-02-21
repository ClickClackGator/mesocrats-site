import type { Metadata } from "next";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { formPageContentQuery } from "@/sanity/lib/queries";
import DonateForm from "./DonateForm";

export async function generateMetadata(): Promise<Metadata> {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "donate" },
    { next: { revalidate: 60 } }
  );
  return {
    title: content?.heroHeadline || undefined,
    description: content?.heroSubheadline || undefined,
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
          {content?.heroHeadline && (
            <h1 className="text-5xl sm:text-7xl font-bold mb-4">
              {content.heroHeadline}
            </h1>
          )}
          {content?.heroSubheadline && (
            <p className="text-lg font-semibold text-white/90 max-w-xl mx-auto">
              {content.heroSubheadline}
            </p>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          {hasBodyContent && (
            <div className="mb-8 text-left">
              <PortableTextRenderer value={content.bodyContent} />
            </div>
          )}

          <DonateForm />

          {/* FEC Disclaimer */}
          {content?.legalText && (
            <div className="mt-10 p-6 border border-primary/10 rounded-lg">
              <p className="text-xs text-primary/50 leading-relaxed">
                {content.legalText}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
