import type { Metadata } from "next";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { formPageContentQuery } from "@/sanity/lib/queries";
import ContactForm from "./ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "contact" },
    { next: { revalidate: 60 } }
  );
  return {
    title: content?.heroHeadline || undefined,
    description: content?.heroSubheadline || undefined,
  };
}

export default async function ContactPage() {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "contact" },
    { next: { revalidate: 60 } }
  );

  // CMS cards map to direct contact entries
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cmsCards = content?.cards as any[] | undefined;
  const contacts =
    cmsCards && cmsCards.length > 0
      ? cmsCards.map((c: { icon?: string; headline?: string; body?: string }) => ({
          label: c.headline || "",
          email: c.icon || "", // icon field repurposed for email
          description: c.body || "",
        }))
      : [];

  const hasBodyContent = content?.bodyContent && content.bodyContent.length > 0;

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
            <p className="text-lg text-white/80">
              {content.heroSubheadline}
            </p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            {hasBodyContent && (
              <div className="mb-6">
                <PortableTextRenderer value={content.bodyContent} />
              </div>
            )}
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            {contacts.length > 0 && (
              <div className="space-y-6 mb-10">
                {contacts.map((c) => (
                  <div key={c.email || c.label} className="bg-gray-light rounded-lg p-6">
                    {c.label && (
                      <h3 className="font-bold mb-1">{c.label}</h3>
                    )}
                    {c.email && (
                      <a
                        href={`mailto:${c.email}`}
                        className="text-secondary hover:underline text-sm"
                      >
                        {c.email}
                      </a>
                    )}
                    {c.description && (
                      <p className="text-xs text-primary/50 mt-2">
                        {c.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
