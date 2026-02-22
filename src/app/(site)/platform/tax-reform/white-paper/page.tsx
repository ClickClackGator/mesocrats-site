import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "12-5-percent-plan" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || "The 12.5% Plan | The Mesocratic Party",
    description:
      page?.seo?.metaDescription ||
      "A Unified Flat Tax for Federal Income and Capital Gains",
  };
}

export default async function WhitePaperPage() {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "12-5-percent-plan" },
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
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            {page?.heroEyebrow || "TAX REFORM WHITE PAPER"}
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold mb-4">
            {page?.heroHeadline || "The 12.5% Plan"}
          </h1>
          <p className="text-lg font-semibold text-white/90">
            {page?.heroSubheadline ||
              "A Unified Flat Tax for Federal Income and Capital Gains"}
          </p>
        </div>
        {page?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-[9px] text-white/50">
            {page.imageCredit}
          </span>
        )}
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Download Button */}
        <div className="text-center mb-12">
          <Link
            href="/documents/the-12-5-percent-plan.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent hover:bg-accent-light text-white font-bold px-8 py-4 rounded transition-colors text-lg"
          >
            Download the Full White Paper (PDF)
          </Link>
        </div>

        {/* CMS Body Content */}
        {hasCmsContent && (
          <article>
            <PortableTextRenderer value={page.content} />
          </article>
        )}
      </section>
    </div>
  );
}
