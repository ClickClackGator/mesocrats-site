import type { Metadata } from "next";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { formPageContentQuery } from "@/sanity/lib/queries";
import ContactForm from "./ContactForm";

/* ── Fallbacks ── */
const F = {
  heroHeadline: "Contact Us",
  heroSubheadline: "We\u2019re here. Reach out.",
  contacts: [
    {
      label: "General Inquiries",
      email: "info@mesocrats.org",
      description:
        "Questions about the party, membership, or how to get involved.",
    },
    {
      label: "Press & Media",
      email: "press@mesocrats.org",
      description:
        "Interview requests, press inquiries, and media partnerships.",
    },
    {
      label: "Candidate Inquiries",
      email: "candidates@mesocrats.org",
      description: "Interested in running for office as a Mesocrat? Start here.",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "contact" },
    { next: { revalidate: 60 } }
  );
  return {
    title: content?.heroHeadline || "Contact",
    description: content?.heroSubheadline || F.heroSubheadline,
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
      : F.contacts;

  const hasBodyContent = content?.bodyContent && content.bodyContent.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {content?.heroHeadline || F.heroHeadline}
          </h1>
          <p className="text-lg text-white/80">
            {content?.heroSubheadline || F.heroSubheadline}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            {hasBodyContent && (
              <div className="mb-6">
                <PortableTextRenderer value={content.bodyContent} />
              </div>
            )}
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Direct Contact</h2>
            <div className="space-y-6 mb-10">
              {contacts.map((c) => (
                <div key={c.email || c.label} className="bg-gray-light rounded-lg p-6">
                  <h3 className="font-bold mb-1">{c.label}</h3>
                  {c.email && (
                    <a
                      href={`mailto:${c.email}`}
                      className="text-secondary hover:underline text-sm"
                    >
                      {c.email}
                    </a>
                  )}
                  <p className="text-xs text-primary/50 mt-2">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Mailing Address */}
            <div className="mb-10">
              <h3 className="font-bold mb-3">Mailing Address</h3>
              <p className="text-sm text-primary/70 leading-relaxed">
                Mesocratic National Committee
                <br />
                P.O. Box 15523
                <br />
                Richmond, VA 23227
              </p>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-bold mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <span className="text-sm text-primary/50">X (Twitter)</span>
                <span className="text-sm text-primary/50">Instagram</span>
                <span className="text-sm text-primary/50">Facebook</span>
                <span className="text-sm text-primary/50">YouTube</span>
              </div>
              <p className="text-xs text-primary/30 mt-2">
                Social media links coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
