import type { Metadata } from "next";
import Image from "next/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "mission" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || undefined,
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function MissionPage() {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "mission" },
    { next: { revalidate: 60 } }
  );

  const hasCmsContent = page?.content && page.content.length > 0;

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
            <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
              {page.heroEyebrow}
            </p>
          )}
          {page?.heroHeadline && (
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {page.heroHeadline}
            </h1>
          )}
          {page?.heroSubheadline && (
            <p className="text-lg text-white/80">
              {page.heroSubheadline}
            </p>
          )}
        </div>
        {page?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-xs text-white/50">
            {page.imageCredit}
          </span>
        )}
      </section>

      {hasCmsContent && (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <PortableTextRenderer value={page.content} />
        </article>
      )}
    </div>
  );
}
