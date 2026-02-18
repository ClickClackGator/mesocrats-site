import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Platform" };

const activePositions = [
  {
    title: "Healthcare",
    tagline: "See a Doctor. Not a Bill.",
    summary:
      "A hybrid public-private system. A strong public option for every citizen. Private insurance for those who want more. Price transparency on every bill.",
  },
  {
    title: "Tax Reform",
    tagline: "One Rate. No Loopholes. Done.",
    summary:
      "A simplified flat consumption tax that replaces the federal income tax. Everyone pays the same rate. Essential goods like groceries and medicine are exempt.",
  },
  {
    title: "Digital Voting",
    tagline: "Your Vote. Your Phone. Your Democracy.",
    summary:
      "A secure, verified digital voting system. Blockchain-backed. Identity-verified. Auditable. Not to replace in-person voting, but to add a path for every citizen.",
  },
  {
    title: "Education",
    tagline: "Teach Kids to Think. Not What to Think.",
    summary:
      "Universal pre-K. Teacher pay tied to regional cost of living. Trade and vocational paths with equal funding and respect. Civic literacy as a graduation requirement.",
  },
  {
    title: "Government Reform",
    tagline: "Serve the People. Then Go Home.",
    summary:
      "Congressional term limits. A ban on stock trading by sitting members of Congress. Mandatory financial disclosure. Lobbying cooldown periods. A government that works for voters, not donors.",
  },
];

const comingSoon = [
  "Immigration",
  "Infrastructure",
  "Housing",
  "Energy & Climate",
  "Criminal Justice",
  "National Defense",
  "Small Business",
  "Technology & Privacy",
  "Social Security",
  "Gun Policy",
];

export default function PlatformPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Where We Stand
          </h1>
          <p className="text-lg text-white/80">
            15 positions. No hedging. No spin.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Active policy cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {activePositions.map((pos) => (
            <div
              key={pos.title}
              className="bg-gray-light rounded-lg p-8 flex flex-col"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                {pos.title}
              </span>
              <h3 className="text-xl font-bold mb-3">{pos.tagline}</h3>
              <p className="text-sm text-primary/70 leading-relaxed flex-1">
                {pos.summary}
              </p>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div>
          <h2 className="text-2xl font-bold mb-6">More Positions Coming</h2>
          <p className="text-primary/60 mb-8 max-w-2xl">
            We&apos;re developing detailed positions on these issues. They&apos;ll
            be debated and ratified at Convention X in May 2027.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {comingSoon.map((topic) => (
              <div
                key={topic}
                className="border border-primary/10 rounded-lg p-4 text-center"
              >
                <p className="text-sm font-medium text-primary/50">{topic}</p>
                <p className="text-xs text-primary/30 mt-1">Coming Soon</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-primary/60 mb-4">
            Want to shape these positions? Join the party and make your voice heard at Convention X.
          </p>
          <Link
            href="/convention"
            className="inline-block bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors"
          >
            Learn About Convention X
          </Link>
        </div>
      </section>
    </div>
  );
}
