// app/platform/[slug]/page.tsx
//
// EXAMPLE: Dynamic policy page that fetches content from Sanity.
// This replaces hardcoded policy page content with CMS-driven content.
// Adapt this pattern to your existing page structure.

import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { policyPageBySlugQuery, allPolicyPagesQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import LivingPlatformCallout from '@/components/LivingPlatformCallout'
import type { Metadata } from 'next'

// ── Types ─────────────────────────────────────────
interface PolicyPageData {
  _id: string
  title: string
  slug: { current: string }
  headline: string
  tagline: string
  icon: string
  category: string
  heroImage: string | null
  realitySection: any[]
  othersSaySection: any[]
  whereWeStandSection: any[]
  whatItMeansSection: any[]
  livingPlatformCallout: {
    useDefault: boolean
    customText?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

interface SiteSettingsData {
  livingPlatformHeadline: string
  livingPlatformBody: string
  livingPlatformCtas: Array<{ label: string; url: string }>
  fecDisclaimer: string
}

// ── Data Fetching ─────────────────────────────────
async function getPolicyPage(slug: string): Promise<PolicyPageData | null> {
  return client.fetch(
    policyPageBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  )
}

async function getSiteSettings(): Promise<SiteSettingsData> {
  return client.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 300 } }
  )
}

// ── Static Params (for build-time generation) ─────
export async function generateStaticParams() {
  const pages = await client.fetch(
    `*[_type == "policyPage"]{ "slug": slug.current }`
  )
  return pages.map((page: { slug: string }) => ({ slug: page.slug }))
}

// ── Dynamic Metadata ──────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await getPolicyPage(params.slug)
  if (!page) return {}
  return {
    title: page.seo?.metaTitle || `${page.title} | Mesocratic Party`,
    description:
      page.seo?.metaDescription || page.tagline || `The Mesocratic Party's position on ${page.title}`,
  }
}

// ── Page Component ────────────────────────────────
export default async function PolicyPage({
  params,
}: {
  params: { slug: string }
}) {
  const [page, siteSettings] = await Promise.all([
    getPolicyPage(params.slug),
    getSiteSettings(),
  ])

  if (!page) notFound()

  return (
    <main>
      {/* ── Hero ────────────────────────────────── */}
      <section
        className="relative py-20 md:py-32 bg-gray-900 text-white"
        style={
          page.heroImage
            ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${page.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Section label */}
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
            THE MESOCRATIC POSITION
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {page.headline}
          </h1>
          {page.tagline && (
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {page.tagline}
            </p>
          )}
        </div>
      </section>

      {/* ── Content ─────────────────────────────── */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* THE REALITY */}
        {page.realitySection && (
          <section className="mb-16">
            <p className="text-xs font-bold tracking-widest text-[#2B5797] uppercase mb-6">
              THE REALITY
            </p>
            <PortableTextRenderer value={page.realitySection} />
          </section>
        )}

        {/* WHAT OTHERS SAY */}
        {page.othersSaySection && (
          <section className="mb-16">
            <p className="text-xs font-bold tracking-widest text-[#2B5797] uppercase mb-6">
              WHAT OTHERS SAY
            </p>
            <PortableTextRenderer value={page.othersSaySection} />
          </section>
        )}

        {/* WHERE WE STAND */}
        {page.whereWeStandSection && (
          <section className="mb-16">
            <p className="text-xs font-bold tracking-widest text-[#2B5797] uppercase mb-6">
              WHERE WE STAND
            </p>
            <PortableTextRenderer value={page.whereWeStandSection} />
          </section>
        )}

        {/* WHAT IT MEANS FOR YOU */}
        {page.whatItMeansSection && (
          <section className="mb-16">
            <p className="text-xs font-bold tracking-widest text-[#2B5797] uppercase mb-6">
              WHAT IT MEANS FOR YOU
            </p>
            <PortableTextRenderer value={page.whatItMeansSection} />
          </section>
        )}

        {/* ── Living Platform Callout ───────────── */}
        <LivingPlatformCallout
          headline={siteSettings.livingPlatformHeadline}
          body={
            page.livingPlatformCallout?.useDefault === false &&
            page.livingPlatformCallout?.customText
              ? page.livingPlatformCallout.customText
              : siteSettings.livingPlatformBody
          }
          ctas={siteSettings.livingPlatformCtas}
        />

        {/* ── FEC Disclaimer ────────────────────── */}
        <p className="text-xs text-gray-400 text-center mt-12">
          {siteSettings.fecDisclaimer ||
            'Paid for by the Mesocratic National Committee. Not authorized by any candidate or candidate\'s committee.'}
        </p>
      </article>
    </main>
  )
}
