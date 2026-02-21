import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "how-it-works" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || undefined,
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function HowItWorksPage() {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "how-it-works" },
    { next: { revalidate: 60 } }
  );

  const hasCmsContent = page?.content && page.content.length > 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = page?.sections as any[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctaSection = sections?.find((s: any) => s._type === "ctaSection");

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
          {page?.heroHeadline && (
            <h1 className="text-5xl sm:text-7xl font-bold mb-6">
              {page.heroHeadline}
            </h1>
          )}
          {page?.heroSubheadline && (
            <p className="text-lg font-semibold text-white/80 leading-relaxed">
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {hasCmsContent && (
          <PortableTextRenderer value={page.content} />
        )}

        {/* CTAs */}
        {ctaSection && (
          <section className="text-center space-y-4">
            {ctaSection.ctaLink && ctaSection.ctaLabel && (
              <Link
                href={ctaSection.ctaLink}
                className="inline-block bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors"
              >
                {ctaSection.ctaLabel}
              </Link>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaSection.secondaryLink && ctaSection.secondaryLabel && (
                <Link
                  href={ctaSection.secondaryLink}
                  className="text-secondary font-semibold hover:underline"
                >
                  {ctaSection.secondaryLabel}
                </Link>
              )}
              {ctaSection.linkUrl && ctaSection.linkText && (
                <Link
                  href={ctaSection.linkUrl}
                  className="text-secondary font-semibold hover:underline"
                >
                  {ctaSection.linkText}
                </Link>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
