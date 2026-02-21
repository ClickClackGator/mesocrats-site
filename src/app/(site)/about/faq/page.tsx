import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { allFaqEntriesQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = { title: "FAQ" };

export default async function FAQPage() {
  const entries = await client.fetch(
    allFaqEntriesQuery,
    {},
    { next: { revalidate: 60 } }
  );

  const hasEntries = entries && entries.length > 0;

  // Build accordion items from CMS
  const items = hasEntries
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      entries.map((entry: any) => ({
        question: entry.question,
        answer: entry.answer ? (
          <PortableTextRenderer value={entry.answer} />
        ) : (
          ""
        ),
      }))
    : [];

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      {items.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Accordion items={items} />
        </section>
      )}
    </div>
  );
}
