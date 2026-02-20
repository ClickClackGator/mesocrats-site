import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import HomeJoinDonate from "@/components/HomeJoinDonate";
import { client } from "@/sanity/lib/client";
import {
  homepageQuery,
  siteSettingsQuery,
  latestNewsQuery,
} from "@/sanity/lib/queries";
import { categoryLabel, formatNewsDate } from "@/lib/utils";

const CCX_DATE = new Date("2027-05-01T00:00:00-05:00");

/* ── Fallbacks (current hardcoded text, used when Sanity returns null) ── */
const F = {
  heroEyebrow: "The Mesocratic Party",
  heroHeadline: "Where America Meets.",
  heroSubheadline:
    "We\u2019re not left. We\u2019re not right. We\u2019re the reason the whole thing works. The Mesocratic Party exists to protect the middle class and hold the middle ground that keeps this country together.",
  heroCta1Label: "JOIN US",
  heroCta1Link: "/involved/join",
  heroCta2Label: "SEE WHERE WE STAND",
  heroCta2Link: "/platform",
  missionBarText:
    "The middle class is the greatest invention in American history. We\u2019re here to protect it.",
  policyHeadline: "Where We Stand",
  policySubheadline: "Real positions. No hedging. Here are three of them.",
  policyCards: [
    {
      headline: "See a Doctor. Not a Bill.",
      body: "Healthcare in America is broken. Not because we lack talented doctors or advanced hospitals, but because the system between you and your care has turned into a profit machine. We believe every American deserves to see a doctor without wondering if the visit will bankrupt them.\n\nWe support a hybrid public-private healthcare system. A strong public option that covers every citizen. Private insurance for those who want more. Price transparency on every bill. And real limits on pharmaceutical price gouging.",
    },
    {
      headline: "One Rate. No Loopholes. Done.",
      body: "The tax code is 7,000 pages long. Nobody reads it. Everyone games it. The wealthiest Americans and the biggest corporations hire armies of accountants to pay less, while working families get squeezed. That\u2019s not a tax system. That\u2019s a con.\n\nWe support a simplified flat consumption tax that replaces the current federal income tax system. Everyone pays the same rate. No deductions. No loopholes. No games. Essential goods like groceries and medicine are exempt. The math is simple. The result is fair.",
    },
    {
      headline: "Your Vote. Your Phone. Your Democracy.",
      body: "You can file your taxes from your couch. You can deposit a check with your phone. You can do everything important in your life from a device in your pocket \u2014 except vote. That\u2019s not a technology problem. It\u2019s a power problem.\n\nWe support building a secure, verified digital voting system. Blockchain-backed. Identity-verified. Auditable. Not to replace in-person voting, but to add a path that makes participation possible for every citizen. When more people vote, better leaders win.",
    },
  ],
  ccxLabel: "May 2027 \u00b7 New Orleans, Louisiana",
  ccxHeadline: "Constitutional Convention X",
  ccxBody:
    "In 1787, fifty-five people gathered in Philadelphia and built a country. They didn\u2019t agree on everything. They argued. They compromised. And they wrote the most enduring framework for self-governance the world has ever seen.\n\nIn May 2027, we\u2019re going to do something inspired by that spirit. Convention X will bring 5,000 elected state representatives to New Orleans to draft the party\u2019s core tenets, debate policy, and elect national leadership. This isn\u2019t a rally. It\u2019s a working convention.\n\nEvery state sends 100 delegates. Every delegate is elected by their neighbors. And what they build together becomes the foundation of the Mesocratic Party.",
  ccxCtaLabel: "GET INVOLVED",
  ccxCtaLink: "/convention",
  ccxSecondaryLabel: "Submit your ideas for the platform \u2192",
  ccxSecondaryLink: "/convention",
  compareHeadline: "See How We Compare",
  compareSubheadline:
    "Pick an issue. See where the Democrats, Republicans, and Mesocrats actually stand. Side by side. No spin.",
  news: [
    { title: "The Mesocratic Party Launches", category: "party-news", publishedAt: null, slug: null },
    { title: "Convention X: What to Expect", category: "ccx-updates", publishedAt: null, slug: null },
    { title: "15 Positions, Zero Spin", category: "policy", publishedAt: null, slug: null },
  ],
};

export default async function Home() {
  const [homepage, settings, news] = await Promise.all([
    client.fetch(homepageQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(latestNewsQuery, { limit: 3 }, { next: { revalidate: 60 } }),
  ]);

  // Extract structured sections by type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = homepage?.sections as any[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cardSection = sections?.find((s: any) => s._type === "cardSection");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctaSection = sections?.find((s: any) => s._type === "ctaSection");
  const compareSection = sections?.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (s: any) => s._type === "textSection" || s._type === "calloutBlock"
  );

  const policyCards = cardSection?.cards?.length
    ? cardSection.cards
    : F.policyCards;

  const newsItems =
    news && news.length > 0 ? news : F.news;

  return (
    <div>
      {/* ──────────── 1. Hero ──────────── */}
      <section className="bg-accent text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm sm:text-base uppercase tracking-[0.25em] font-semibold mb-4 text-white/70">
            {homepage?.heroEyebrow || F.heroEyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {homepage?.heroHeadline || F.heroHeadline}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {homepage?.heroSubheadline || F.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={homepage?.heroCta1Link || F.heroCta1Link}
              className="bg-white text-accent font-bold px-8 py-3 rounded hover:bg-gray-light transition-colors text-center"
            >
              {homepage?.heroCta1Label || F.heroCta1Label}
            </Link>
            <Link
              href={homepage?.heroCta2Link || F.heroCta2Link}
              className="border-2 border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
            >
              {homepage?.heroCta2Label || F.heroCta2Label}
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────── 2. Mission Bar ──────────── */}
      <section className="bg-gray-light py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-4">
          <Image
            src="/logo-black.png"
            alt="Mesocratic Party logo"
            width={40}
            height={40}
            className="h-10 w-auto shrink-0"
          />
          <p className="text-xl sm:text-2xl font-semibold leading-relaxed">
            {settings?.missionBarText || F.missionBarText}
          </p>
        </div>
      </section>

      {/* ──────────── 3. Three Policy Cards ──────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {cardSection?.headline || F.policyHeadline}
            </h2>
            <p className="text-primary/60 max-w-xl mx-auto">
              {cardSection?.subheadline || F.policySubheadline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {policyCards.map((card: any, i: number) => (
              <div key={card._key || i} className="bg-gray-light rounded-lg p-8">
                <h3 className="text-xl font-bold mb-3">
                  {card.headline}
                </h3>
                {(card.body || "").split("\n\n").map((paragraph: string, j: number) => (
                  <p
                    key={j}
                    className={`text-sm text-primary/70 leading-relaxed${
                      j < (card.body || "").split("\n\n").length - 1 ? " mb-4" : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/platform"
              className="text-accent font-semibold hover:underline"
            >
              We have positions on 15 issues. See our full platform &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────── 4. CCX Section ──────────── */}
      <section className="bg-primary text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            {ctaSection?.label || F.ccxLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {ctaSection?.headline || F.ccxHeadline}
          </h2>
          {(ctaSection?.body || F.ccxBody).split("\n\n").map((p: string, i: number) => (
            <p
              key={i}
              className="text-white/80 leading-relaxed mb-4 max-w-2xl mx-auto"
            >
              {p}
            </p>
          ))}

          <div className="flex justify-center mb-10 mt-4">
            <CountdownTimer target={CCX_DATE} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaSection?.ctaLink || F.ccxCtaLink}
              className="bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors text-center"
            >
              {ctaSection?.ctaLabel || F.ccxCtaLabel}
            </Link>
            <Link
              href={ctaSection?.secondaryLink || F.ccxSecondaryLink}
              className="border-2 border-white/30 text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
            >
              {ctaSection?.secondaryLabel || F.ccxSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────── 5. Compare Widget Preview ──────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            {compareSection?.headline || F.compareHeadline}
          </h2>
          <p className="text-primary/60 mb-10 max-w-xl mx-auto">
            {compareSection?.subheadline || F.compareSubheadline}
          </p>
          <div className="bg-gray-light rounded-lg p-12 flex items-center justify-center min-h-[200px]">
            <p className="text-primary/40 font-medium">
              Interactive comparison widget coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────── 6. Latest News ──────────── */}
      <section className="bg-gray-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">Latest</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {newsItems.map((article: any, i: number) => {
              const card = (
                <div key={article._id || i} className="bg-white rounded-lg p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {categoryLabel(article.category)}
                  </span>
                  <h3 className="text-lg font-bold mt-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-primary/40">
                    {formatNewsDate(article.publishedAt)}
                  </p>
                </div>
              );

              if (article.slug?.current) {
                return (
                  <Link
                    key={article._id || i}
                    href={`/news/${article.slug.current}`}
                    className="block"
                  >
                    {card}
                  </Link>
                );
              }

              return card;
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/news"
              className="text-accent font-semibold hover:underline"
            >
              See all news &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────── 7. Join + Donate Split ──────────── */}
      <HomeJoinDonate />
    </div>
  );
}
