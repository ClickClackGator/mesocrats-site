import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
  pageBySlugQuery,
  allPolicyPagesQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

export const metadata: Metadata = { title: "Platform" };

export default async function PlatformPage() {
  const [page, policyPages, settings] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: "platform" }, { next: { revalidate: 60 } }),
    client.fetch(allPolicyPagesQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
  ]);

  // Extract sections by type from the page document
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = page?.sections as any[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calloutBlock = sections?.find((s: any) => s._type === "calloutBlock");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctaSection = sections?.find((s: any) => s._type === "ctaSection");

  // Map CMS policy pages to card data
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

  // Living platform callout from site settings
  const livingHeadline = settings?.livingPlatformHeadline;
  const livingBody = settings?.livingPlatformBody;
  const livingCtas =
    settings?.livingPlatformCtas?.length > 0
      ? settings.livingPlatformCtas
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Platform Built by the People callout */}
        {calloutBlock && (
          <div className="bg-gray-light rounded-lg p-8 sm:p-10 mb-16">
            {calloutBlock.label && (
              <h2 className="text-lg font-bold uppercase tracking-wide mb-3">
                {calloutBlock.label}
              </h2>
            )}
            {calloutBlock.body && (
              <p className="text-sm text-primary/70 leading-relaxed mb-3">
                {calloutBlock.body}
              </p>
            )}
            {calloutBlock.linkUrl && calloutBlock.linkText && (
              <Link
                href={calloutBlock.linkUrl}
                className="text-secondary font-semibold hover:underline text-sm"
              >
                {calloutBlock.linkText}
              </Link>
            )}
          </div>
        )}

        {/* All policy cards */}
        {positions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
        )}

        {/* Living Platform callout */}
        {(livingHeadline || livingBody) && (
          <div className="bg-gray-light rounded-lg p-8 sm:p-10 mb-16">
            {livingHeadline && (
              <h2 className="text-lg font-bold uppercase tracking-wide mb-3">
                {livingHeadline}
              </h2>
            )}
            {livingBody && (
              <p className="text-sm text-primary/70 leading-relaxed">
                {livingBody}
              </p>
            )}
            {livingCtas.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {livingCtas.map((cta: any, i: number) => (
                  <Link
                    key={cta.label || i}
                    href={cta.url || "#"}
                    className="text-secondary font-semibold hover:underline text-sm"
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        {ctaSection && (
          <div className="text-center">
            {ctaSection.body && (
              <p className="text-primary/60 mb-4">
                {ctaSection.body}
              </p>
            )}
            {ctaSection.ctaLink && ctaSection.ctaLabel && (
              <Link
                href={ctaSection.ctaLink}
                className="inline-block bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors"
              >
                {ctaSection.ctaLabel}
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
