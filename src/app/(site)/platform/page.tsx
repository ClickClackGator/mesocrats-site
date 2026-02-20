import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
  pageBySlugQuery,
  allPolicyPagesQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

export const metadata: Metadata = { title: "Platform" };

/* ── Fallbacks ── */
const F = {
  heroHeadline: "This Is What We Stand For.",
  heroSubheadline: "Real positions. Real numbers. No hedging.",
  calloutHeadline: "A Platform Built by the People",
  calloutBody:
    "The positions below are the Mesocratic Party\u2019s current platform \u2014 but they\u2019re not set in stone. Every position on this page was created as a starting framework and is subject to debate, amendment, and ratification by the party\u2019s membership at Constitutional Convention X, held annually in New Orleans. The people own this platform. The politicians carry it. That\u2019s how it should be.",
  calloutLinkText: "How Our Platform Works \u2192",
  calloutLinkUrl: "/platform/how-it-works",
  livingHeadline: "This Is a Living Platform",
  livingBody:
    "This position is a starting point. The Mesocratic Party\u2019s platform is written, debated, and ratified by its members at Constitutional Convention X, held annually in New Orleans every May.",
  livingCtas: [
    { label: "Join the Party", url: "/involved/join" },
    { label: "Submit an Idea", url: "/convention" },
    { label: "Learn about CCX", url: "/convention" },
    { label: "How Our Platform Works", url: "/platform/how-it-works" },
  ],
  ctaText:
    "Want to shape these positions? Join the party and make your voice heard at Convention X.",
  ctaLabel: "Learn About Convention X",
  ctaLink: "/convention",
  positions: [
    { title: "Healthcare", tagline: "See a Doctor. Not a Bill.", summary: "Universal baseline coverage for every American, funded publicly. Private supplemental insurance for those who want more. Drug pricing reform that puts patients over profits.", href: "/platform/healthcare" },
    { title: "Tax Reform", tagline: "One Rate. No Loopholes. Done.", summary: "A flat 12.5% federal tax on all income \u2014 earned and investment. No brackets. No deductions. No games.", href: "/platform/tax-reform" },
    { title: "Digital Voting", tagline: "Your Vote. Your Phone. Your Democracy.", summary: "A modern civic platform where every American can research candidates, compare positions, track lobbying activity, and cast their vote from anywhere.", href: "/platform/digital-voting" },
    { title: "Education", tagline: "Invest in Minds. Invest in America.", summary: "Free public education from Pre-K through a bachelor\u2019s degree. Dramatically higher teacher pay. State-run schools with federal accountability.", href: "/platform/education" },
    { title: "Government Reform", tagline: "Better People. Better Rules. Better Government.", summary: "Term limits. Higher pay. A stock market ban for Congress. Federal efficiencies. The Polis Doctorate. Congressional pay reform. Lobbying transparency.", href: "/platform/government-reform" },
    { title: "Immigration", tagline: "Secure the Border. Fix the System.", summary: "Strong borders with technology and personnel. Mandatory E-Verify. Streamlined legal immigration. Earned legal status for long-term residents. Dreamer protection.", href: "/platform/immigration" },
    { title: "National Security", tagline: "Strong and Smart.", summary: "The most powerful military on earth, funded with accountability. DoD audit tied to funding. AI and next-gen investment. Alliances strengthened. No blank checks.", href: "/platform/national-security" },
    { title: "Criminal Justice", tagline: "Safe Streets. Fair System.", summary: "Fully fund police with better training. End mandatory minimums for nonviolent drug offenses. Death penalty moratorium. Marijuana reform. Record-sealing.", href: "/platform/criminal-justice" },
    { title: "Energy & Environment", tagline: "All of the Above.", summary: "Clean energy acceleration including nuclear. One-year permit shot-clock. Fossil fuels as bridge. Methane controls. Worker transition fund.", href: "/platform/energy-environment" },
    { title: "Housing", tagline: "A Home You Can Afford.", summary: "Build more homes. Ban institutional investors from buying single-family homes. Matched down-payments. Zoning reform. Housing First for homelessness.", href: "/platform/housing" },
    { title: "Veterans", tagline: "You Served Us. Now We Serve You.", summary: "7-day VA access standard. Fully digitized records. Mental health surge. Housing support. GI Bill protection. 12-month transition planning.", href: "/platform/veterans" },
    { title: "Term Limits", tagline: "Serve. Then Go Home.", summary: "12-year maximum for both House and Senate. Prospective application. Voluntary Mesocratic pledge until the amendment passes.", href: "/platform/term-limits" },
    { title: "Polis Doctorate", tagline: "Qualified to Serve.", summary: "A professional credential for federal office \u2014 free, accessible, nonpartisan. If we require credentials for doctors and lawyers, we should require them for legislators.", href: "/platform/polis-doctorate" },
    { title: "LGB Rights", tagline: "Equal Under the Law.", summary: "Marriage equality. Equal adoption rights. Federal anti-discrimination protections. Religious institutions\u2019 internal doctrine protected.", href: "/platform/lgb-rights" },
    { title: "Gun Reform", tagline: "Responsible and Protected.", summary: "Universal background checks. Due-process red-flag laws. Safe-storage incentives. Target straw purchasing. Preserve lawful ownership. No bans. No registry.", href: "/platform/gun-reform" },
  ],
};

export default async function PlatformPage() {
  const [page, policyPages, settings] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: "platform-overview" }, { next: { revalidate: 60 } }),
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

  // Map CMS policy pages to card data, fall back to hardcoded positions
  const positions =
    policyPages && policyPages.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        policyPages.map((p: any) => ({
          title: p.title,
          tagline: p.headline || p.tagline || p.title,
          summary: p.summaryDescription || "",
          href: `/platform/${p.slug?.current || ""}`,
        }))
      : F.positions;

  // Living platform callout from site settings
  const livingHeadline =
    settings?.livingPlatformHeadline || F.livingHeadline;
  const livingBody =
    settings?.livingPlatformBody || F.livingBody;
  const livingCtas =
    settings?.livingPlatformCtas?.length > 0
      ? settings.livingPlatformCtas
      : F.livingCtas;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {page?.heroHeadline || F.heroHeadline}
          </h1>
          <p className="text-lg text-white/80">
            {page?.heroSubheadline || F.heroSubheadline}
          </p>
        </div>
        {page?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-xs text-white/50">
            {page.imageCredit}
          </span>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Platform Built by the People callout */}
        <div className="bg-gray-light rounded-lg p-8 sm:p-10 mb-16">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3">
            {calloutBlock?.label || F.calloutHeadline}
          </h2>
          <p className="text-sm text-primary/70 leading-relaxed mb-3">
            {calloutBlock?.body || F.calloutBody}
          </p>
          <Link
            href={calloutBlock?.linkUrl || F.calloutLinkUrl}
            className="text-secondary font-semibold hover:underline text-sm"
          >
            {calloutBlock?.linkText || F.calloutLinkText}
          </Link>
        </div>

        {/* All policy cards */}
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
              <p className="text-sm text-primary/70 leading-relaxed flex-1">
                {pos.summary}
              </p>
              <span className="text-secondary font-semibold text-sm mt-4">
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Living Platform callout */}
        <div className="bg-gray-light rounded-lg p-8 sm:p-10 mb-16">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3">
            {livingHeadline}
          </h2>
          <p className="text-sm text-primary/70 leading-relaxed">
            {livingBody}
          </p>
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
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-primary/60 mb-4">
            {ctaSection?.body || F.ctaText}
          </p>
          <Link
            href={ctaSection?.ctaLink || F.ctaLink}
            className="inline-block bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors"
          >
            {ctaSection?.ctaLabel || F.ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
