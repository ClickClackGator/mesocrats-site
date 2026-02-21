import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allPolicyPagesQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Policy Positions | The Mesocratic Party",
  description: "Real positions. Real numbers. No hedging.",
};

export default async function PolicyPositionsPage() {
  const policyPages = await client.fetch(
    allPolicyPagesQuery,
    {},
    { next: { revalidate: 60 } }
  );

  const positions =
    policyPages && policyPages.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        policyPages.map((p: any) => ({
          title: p.title,
          tagline: p.headline || p.tagline || p.title,
          summary: p.summaryDescription || "",
          href: `/platform/${p.slug?.current || ""}`,
        }))
      : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            THE MESOCRATIC PLATFORM
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold mb-4">
            Policy Positions
          </h1>
          <p className="text-lg font-semibold text-white/90">
            Real positions. Real numbers. No hedging.
          </p>
        </div>
      </section>

      {/* All policy cards */}
      {positions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {positions.map((pos: any, i: number) => (
              <Link
                key={pos.title || i}
                href={pos.href}
                className="bg-gray-light rounded-lg p-8 flex flex-col hover:shadow-lg transition-shadow"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                  {pos.title}
                </span>
                <h3 className="text-xl font-bold mb-3">{pos.tagline}</h3>
                {pos.summary && (
                  <p className="text-sm text-primary/70 leading-relaxed flex-1">
                    {pos.summary}
                  </p>
                )}
                <span className="text-secondary font-semibold text-sm mt-4">
                  Read more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
