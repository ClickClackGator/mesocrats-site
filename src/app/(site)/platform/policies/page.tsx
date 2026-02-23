import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery, allPolicyPagesQuery } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "policies" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || undefined,
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function PolicyPositionsPage() {
  const [page, policyPages] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: "policies" }, { next: { revalidate: 60 } }),
    client.fetch(allPolicyPagesQuery, {}, { next: { revalidate: 60 } }),
  ]);

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
        {page?.heroImage && (
          <>
            <Image
              src={page.heroImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="relative max-w-3xl mx-auto text-center">
          {page?.heroEyebrow && (
            <p className="inline-block bg-white text-accent rounded-full px-3 py-1 text-sm uppercase tracking-[0.2em] font-extrabold mb-4">
              {page.heroEyebrow}
            </p>
          )}
          {page?.heroHeadline && (
            <h1 className="text-5xl sm:text-7xl font-bold mb-4">
              {page.heroHeadline}
            </h1>
          )}
          {page?.heroSubheadline && (
            <p className="text-lg font-semibold text-white/90">
              {page.heroSubheadline}
            </p>
          )}
        </div>
        {page?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-[9px] text-white/50">
            {page.imageCredit}
          </span>
        )}
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
