import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import HomeJoinDonate from "@/components/HomeJoinDonate";

const CCX_DATE = new Date("2027-05-01T00:00:00-05:00");

export default function Home() {
  return (
    <div>
      {/* ──────────── 1. Hero ──────────── */}
      <section className="bg-accent text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm sm:text-base uppercase tracking-[0.25em] font-semibold mb-4 text-white/70">
            The Mesocratic Party
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Where America Meets.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            We&apos;re not left. We&apos;re not right. We&apos;re the reason
            the whole thing works. The Mesocratic Party exists to protect the
            middle class and hold the middle ground that keeps this country
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/involved/join"
              className="bg-white text-accent font-bold px-8 py-3 rounded hover:bg-gray-light transition-colors text-center"
            >
              JOIN US
            </Link>
            <Link
              href="/platform"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
            >
              SEE WHERE WE STAND
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
            The middle class is the greatest invention in American history.
            We&apos;re here to protect it.
          </p>
        </div>
      </section>

      {/* ──────────── 3. Three Policy Cards ──────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Where We Stand
            </h2>
            <p className="text-primary/60 max-w-xl mx-auto">
              Real positions. No hedging. Here are three of them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Healthcare */}
            <div className="bg-gray-light rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                See a Doctor. Not a Bill.
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-4">
                Healthcare in America is broken. Not because we lack talented
                doctors or advanced hospitals, but because the system between you
                and your care has turned into a profit machine. We believe every
                American deserves to see a doctor without wondering if the visit
                will bankrupt them.
              </p>
              <p className="text-sm text-primary/70 leading-relaxed">
                We support a hybrid public-private healthcare system. A strong
                public option that covers every citizen. Private insurance for
                those who want more. Price transparency on every bill. And real
                limits on pharmaceutical price gouging.
              </p>
            </div>

            {/* Tax Reform */}
            <div className="bg-gray-light rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                One Rate. No Loopholes. Done.
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-4">
                The tax code is 7,000 pages long. Nobody reads it. Everyone
                games it. The wealthiest Americans and the biggest corporations
                hire armies of accountants to pay less, while working families
                get squeezed. That&apos;s not a tax system. That&apos;s a con.
              </p>
              <p className="text-sm text-primary/70 leading-relaxed">
                We support a simplified flat consumption tax that replaces the
                current federal income tax system. Everyone pays the same rate.
                No deductions. No loopholes. No games. Essential goods like
                groceries and medicine are exempt. The math is simple. The
                result is fair.
              </p>
            </div>

            {/* Digital Voting */}
            <div className="bg-gray-light rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                Your Vote. Your Phone. Your Democracy.
              </h3>
              <p className="text-sm text-primary/70 leading-relaxed mb-4">
                You can file your taxes from your couch. You can deposit a check
                with your phone. You can do everything important in your life
                from a device in your pocket &mdash; except vote. That&apos;s
                not a technology problem. It&apos;s a power problem.
              </p>
              <p className="text-sm text-primary/70 leading-relaxed">
                We support building a secure, verified digital voting system.
                Blockchain-backed. Identity-verified. Auditable. Not to replace
                in-person voting, but to add a path that makes participation
                possible for every citizen. When more people vote, better
                leaders win.
              </p>
            </div>
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
            May 2027 &middot; New Orleans, Louisiana
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Constitutional Convention X
          </h2>
          <p className="text-white/80 leading-relaxed mb-4 max-w-2xl mx-auto">
            In 1787, fifty-five people gathered in Philadelphia and built a
            country. They didn&apos;t agree on everything. They argued. They
            compromised. And they wrote the most enduring framework for
            self-governance the world has ever seen.
          </p>
          <p className="text-white/80 leading-relaxed mb-4 max-w-2xl mx-auto">
            In May 2027, we&apos;re going to do something inspired by that
            spirit. Convention X will bring 5,000 elected state representatives
            to New Orleans to draft the party&apos;s core tenets, debate policy,
            and elect national leadership. This isn&apos;t a rally. It&apos;s a
            working convention.
          </p>
          <p className="text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
            Every state sends 100 delegates. Every delegate is elected by their
            neighbors. And what they build together becomes the foundation of
            the Mesocratic Party.
          </p>

          <div className="flex justify-center mb-10">
            <CountdownTimer target={CCX_DATE} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/convention"
              className="bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors text-center"
            >
              GET INVOLVED
            </Link>
            <Link
              href="/convention"
              className="border-2 border-white/30 text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
            >
              Submit your ideas for the platform &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────── 5. Compare Widget Preview ──────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            See How We Compare
          </h2>
          <p className="text-primary/60 mb-10 max-w-xl mx-auto">
            Pick an issue. See where the Democrats, Republicans, and Mesocrats
            actually stand. Side by side. No spin.
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
            {[
              {
                category: "Announcement",
                title: "The Mesocratic Party Launches",
                date: "Coming Soon",
              },
              {
                category: "Convention",
                title: "Convention X: What to Expect",
                date: "Coming Soon",
              },
              {
                category: "Platform",
                title: "15 Positions, Zero Spin",
                date: "Coming Soon",
              },
            ].map((article) => (
              <div key={article.title} className="bg-white rounded-lg p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-2">{article.title}</h3>
                <p className="text-sm text-primary/40">{article.date}</p>
              </div>
            ))}
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
