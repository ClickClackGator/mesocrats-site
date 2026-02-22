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

  const policyCards = cardSection?.cards?.length ? cardSection.cards : [];
  const newsItems = news && news.length > 0 ? news : [];

  return (
    <div>
      {/* ──────────── 1. Hero ──────────── */}
      <section className="relative bg-accent text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {homepage?.heroImage && (
          <>
            <Image
              src={homepage.heroImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="relative max-w-4xl mx-auto text-center">
          {homepage?.heroEyebrow && (
            <p className="text-sm sm:text-base uppercase tracking-[0.25em] font-semibold mb-4 text-accent-light">
              {homepage.heroEyebrow}
            </p>
          )}
          {homepage?.heroHeadline && (
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6">
              {homepage.heroHeadline}
            </h1>
          )}
          {homepage?.heroSubheadline && (
            <p className="text-lg sm:text-xl font-semibold text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              {homepage.heroSubheadline}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {homepage?.heroCta1Link && homepage?.heroCta1Label && (
              <Link
                href={homepage.heroCta1Link}
                className="bg-cta text-white font-bold px-8 py-3 rounded hover:bg-cta-light transition-colors text-center"
              >
                {homepage.heroCta1Label}
              </Link>
            )}
            {homepage?.heroCta2Link && homepage?.heroCta2Label && (
              <Link
                href={homepage.heroCta2Link}
                className="border-2 border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
              >
                {homepage.heroCta2Label}
              </Link>
            )}
          </div>
        </div>
        {homepage?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-[9px] text-white/50">
            {homepage.imageCredit}
          </span>
        )}
      </section>

      {/* ──────────── 2. Mission Callout ──────────── */}
      {settings?.missionBarText && (
        <section className="bg-[#4374BA] py-10 sm:py-12 md:py-14 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-10">
            <Image
              src="/images/mp-gorilla-logo.png"
              alt="Mesocratic Party gorilla logo"
              width={125}
              height={125}
              className="h-[75px] w-auto md:h-[125px] shrink-0"
            />
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug text-center md:text-left">
              {settings.missionBarText}
            </p>
          </div>
        </section>
      )}

      {/* ──────────── 3. Three Policy Cards ──────────── */}
      {policyCards.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {cardSection?.headline && (
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  {cardSection.headline}
                </h2>
              )}
              {cardSection?.subheadline && (
                <p className="text-primary/60 max-w-xl mx-auto">
                  {cardSection.subheadline}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {policyCards.map((card: any, i: number) => (
                <div key={card._key || i} className="bg-gray-light rounded-lg p-8">
                  {card.headline && (
                    <h3 className="text-xl font-bold mb-3">
                      {card.headline}
                    </h3>
                  )}
                  {card.body && card.body.split("\n\n").map((paragraph: string, j: number) => (
                    <p
                      key={j}
                      className={`text-sm text-primary/70 leading-relaxed${
                        j < card.body.split("\n\n").length - 1 ? " mb-4" : ""
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
                className="text-secondary font-semibold hover:underline"
              >
                We have positions on 15 issues. See our full platform &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ──────────── 4. CCX Section ──────────── */}
      {ctaSection && (
        <section className="bg-primary text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {ctaSection.label && (
              <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
                {ctaSection.label}
              </p>
            )}
            {ctaSection.headline && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {ctaSection.headline}
              </h2>
            )}
            {ctaSection.body && ctaSection.body.split("\n\n").map((p: string, i: number) => (
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
              {ctaSection.ctaLink && ctaSection.ctaLabel && (
                <Link
                  href={ctaSection.ctaLink}
                  className="bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors text-center"
                >
                  {ctaSection.ctaLabel}
                </Link>
              )}
              {ctaSection.secondaryLink && ctaSection.secondaryLabel && (
                <Link
                  href={ctaSection.secondaryLink}
                  className="border-2 border-white/30 text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
                >
                  {ctaSection.secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ──────────── 5. Compare Widget Preview ──────────── */}
      {compareSection && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {compareSection.headline && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                {compareSection.headline}
              </h2>
            )}
            {compareSection.subheadline && (
              <p className="text-primary/60 mb-10 max-w-xl mx-auto">
                {compareSection.subheadline}
              </p>
            )}
            <div className="bg-gray-light rounded-lg p-12 flex items-center justify-center min-h-[200px]">
              <p className="text-primary/40 font-medium">
                Interactive comparison widget coming soon.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ──────────── 6. Latest News ──────────── */}
      {newsItems.length > 0 && (
        <section className="bg-gray-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10">Latest</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {newsItems.map((article: any, i: number) => {
                const card = (
                  <div key={article._id || i} className="bg-white rounded-lg p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
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
                className="text-secondary font-semibold hover:underline"
              >
                See all news &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ──────────── 7. Join + Donate Split ──────────── */}
      <HomeJoinDonate />
    </div>
  );
}
