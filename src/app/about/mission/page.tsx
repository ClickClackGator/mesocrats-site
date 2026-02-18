import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our Mission" };

export default function MissionPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            About
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg text-white/80">
            Why we exist and what we&apos;re building.
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* The Belief */}
        <section>
          <h2 className="text-2xl font-bold mb-4">The Belief</h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            The middle class is the greatest invention in American history.
          </p>
          <p className="text-primary/70 leading-relaxed mb-4">
            It wasn&apos;t an accident. It was built — by workers, entrepreneurs,
            teachers, builders, and millions of ordinary people who believed that
            if you worked hard, you could live well. That belief is the engine of
            this country. And right now, that engine is stalling.
          </p>
          <p className="text-primary/70 leading-relaxed">
            Wages haven&apos;t kept up with costs. Housing is out of reach.
            Healthcare is a gamble. And the two major parties are too busy
            fighting each other to fix any of it. The Mesocratic Party exists
            because someone needs to protect the middle — and nobody else is
            doing it.
          </p>
        </section>

        {/* What Mesocratic Means */}
        <section>
          <h2 className="text-2xl font-bold mb-4">What &ldquo;Mesocratic&rdquo; Means</h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            The word comes from Greek: <em>meso</em> means &ldquo;middle&rdquo;
            and <em>kratos</em> means &ldquo;power&rdquo; or &ldquo;rule.&rdquo;
          </p>
          <p className="text-primary/70 leading-relaxed">
            Mesocratic literally means &ldquo;rule by the middle.&rdquo;
            That&apos;s the idea. Not rule by the far left. Not rule by the far
            right. Power held by the broad, working, productive center of this
            country — the people who actually make things run.
          </p>
        </section>

        {/* What We Are / What We're Not */}
        <section>
          <h2 className="text-2xl font-bold mb-4">What We Are</h2>
          <ul className="space-y-3 text-primary/70 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">+</span>
              A political party built for the middle class.
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">+</span>
              Pragmatic. Evidence-based. Solutions-first.
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">+</span>
              Willing to take real positions and defend them.
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">+</span>
              Open to anyone who believes the middle matters.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">What We&apos;re Not</h2>
          <ul className="space-y-3 text-primary/70 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-primary/30 font-bold shrink-0">&ndash;</span>
              A centrist think tank that won&apos;t pick a side.
            </li>
            <li className="flex gap-3">
              <span className="text-primary/30 font-bold shrink-0">&ndash;</span>
              A protest movement. We&apos;re building, not tearing down.
            </li>
            <li className="flex gap-3">
              <span className="text-primary/30 font-bold shrink-0">&ndash;</span>
              A home for extremists of any stripe.
            </li>
          </ul>
        </section>

        {/* The Fulcrum */}
        <section>
          <h2 className="text-2xl font-bold mb-4">The Fulcrum</h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            Think of American politics like a seesaw. The left pushes down on
            one end. The right pushes down on the other. And the whole thing
            swings wildly back and forth while the rest of us just try to hold on.
          </p>
          <p className="text-primary/70 leading-relaxed">
            The Mesocratic Party isn&apos;t on either end. We&apos;re the
            fulcrum. The fixed point in the middle that the whole system balances
            on. Without the center, nothing works. We&apos;re here to make sure
            the center holds.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="bg-gray-light rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Mission Statement</h2>
          <p className="text-primary/80 leading-relaxed text-lg">
            The Mesocratic Party exists to protect the American middle class, to
            hold the political center with real positions and real solutions, and
            to build a party where everyday Americans have genuine power over the
            decisions that shape their lives.
          </p>
        </section>

        {/* Organization Info */}
        <section>
          <h2 className="text-2xl font-bold mb-4">The Mesocratic National Committee</h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            The Mesocratic Party is organized through the Mesocratic National
            Committee (MNC), a political organization registered under Section
            527 of the Internal Revenue Code.
          </p>
          <div className="bg-gray-light rounded-lg p-6 text-sm text-primary/60 space-y-2">
            <p><strong className="text-primary">Organization:</strong> Mesocratic National Committee</p>
            <p><strong className="text-primary">Type:</strong> Section 527 Political Organization</p>
            <p><strong className="text-primary">EIN:</strong> 39-3411870</p>
            <p><strong className="text-primary">State of Formation:</strong> Virginia</p>
          </div>
        </section>
      </article>
    </div>
  );
}
