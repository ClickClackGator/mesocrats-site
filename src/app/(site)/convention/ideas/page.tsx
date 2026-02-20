import type { Metadata } from "next";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { formPageContentQuery } from "@/sanity/lib/queries";
import IdeaForm from "./IdeaForm";

export async function generateMetadata(): Promise<Metadata> {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "submit-ideas" },
    { next: { revalidate: 60 } }
  );
  return {
    title: content?.heroHeadline || undefined,
    description: content?.heroSubheadline || undefined,
  };
}

export default async function SubmitIdeaPage() {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "submit-ideas" },
    { next: { revalidate: 60 } }
  );

  const hasBodyContent = content?.bodyContent && content.bodyContent.length > 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cmsCards = content?.cards as any[] | undefined;
  const hasCards = cmsCards && cmsCards.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {content?.heroHeadline && (
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {content.heroHeadline}
            </h1>
          )}
          {content?.heroSubheadline && (
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              {content.heroSubheadline}
            </p>
          )}
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
                    {c.headline && (
                      <h3 className="text-xl font-bold mb-3">
                        {c.headline}
                      </h3>
                    )}
                    {c.body && (
                      <p className="text-sm text-primary/70 leading-relaxed">
                        {c.body}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Idea Submission Form */}
      <section className="bg-gray-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <IdeaForm />
        </div>
      </section>
    </div>
  );
}
