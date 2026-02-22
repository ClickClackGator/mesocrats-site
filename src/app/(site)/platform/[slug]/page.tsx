// app/platform/[slug]/page.tsx

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { policyPageBySlugQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import LivingPlatformCallout from '@/components/LivingPlatformCallout'
import Link from 'next/link'
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
  imageCredit: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  realitySection: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  othersSaySection: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whereWeStandSection: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    { next: { revalidate: 60 } }
  )
}

// ── Static Params (for build-time generation) ─────
export async function generateStaticParams() {
  const pages = await client.fetch(
    `*[_type == "policyPage"]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 60 } }
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
    title: page.seo?.metaTitle || undefined,
    description: page.seo?.metaDescription || undefined,
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
      <section className="relative py-20 md:py-32 bg-gray-900 text-white overflow-hidden">
        {page.heroImage && (
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
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Section label */}
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
            THE MESOCRATIC POSITION
          </p>
          {page.headline && (
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              {page.headline}
            </h1>
          )}
          {page.tagline && (
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {page.tagline}
            </p>
          )}
        </div>
        {page.imageCredit && (
          <span className="absolute bottom-2 right-3 text-[9px] text-white/50">
            {page.imageCredit}
          </span>
        )}
      </section>

      {/* ── Content ─────────────────────────────── */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* THE REALITY */}
        {page.realitySection && (
          <section className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-6">
              THE REALITY
            </p>
            <PortableTextRenderer value={page.realitySection} />
          </section>
        )}

        {/* WHAT OTHERS SAY */}
        {page.othersSaySection && (
          <section className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-6">
              WHAT OTHERS SAY
            </p>
            <PortableTextRenderer value={page.othersSaySection} />
          </section>
        )}

        {/* WHERE WE STAND */}
        {page.whereWeStandSection && (
          <section className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-6">
              WHERE WE STAND
            </p>
            <PortableTextRenderer value={page.whereWeStandSection} />
          </section>
        )}

        {/* WHAT IT MEANS FOR YOU */}
        {page.whatItMeansSection && (
          <section className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-6">
              WHAT IT MEANS FOR YOU
            </p>
            <PortableTextRenderer value={page.whatItMeansSection} />
          </section>
        )}

        {/* ── White Paper Callout (Tax Reform only) ── */}
        {page.slug.current === 'tax-reform' && (
          <section className="mb-16 bg-accent rounded-lg p-8 sm:p-10 text-white">
            <p className="text-xs font-bold tracking-widest uppercase mb-3 text-white/60">
              WHITE PAPER
            </p>
            <h3 className="text-2xl font-bold mb-2">
              Read the Full White Paper
            </h3>
            <p className="text-white/80 leading-relaxed mb-6">
              The 12.5% Plan — a data-driven proposal grounded in six years of IRS data.
            </p>
            <Link
              href="/platform/tax-reform/white-paper"
              className="inline-block bg-white text-accent font-bold px-6 py-3 rounded hover:bg-gray-100 transition-colors"
            >
              Read the White Paper
            </Link>
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
        {siteSettings.fecDisclaimer && (
          <p className="text-xs text-gray-400 text-center mt-12">
            {siteSettings.fecDisclaimer}
          </p>
        )}
      </article>
    </main>
  )
}
