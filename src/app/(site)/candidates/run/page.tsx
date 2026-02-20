import type { Metadata } from "next";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { formPageContentQuery } from "@/sanity/lib/queries";
import CandidateForm from "./CandidateForm";

/* ── Fallbacks ── */
const F = {
  heroHeadline: "Run for Office",
  heroSubheadline:
    "This country needs better options. You might be one of them.",
  cards: [
    {
      title: "Platform Alignment",
      description:
        "Run on a platform that\u2019s clear, popular, and defensible. No flip-flopping. No dodging questions. You\u2019ll know exactly what you stand for because the party does too.",
    },
    {
      title: "Organizing Support",
      description:
        "We\u2019ll help you build your campaign team, connect with local volunteers, and tap into the Mesocratic network in your state.",
    },
    {
      title: "Training & Resources",
      description:
        "Campaign basics, messaging frameworks, debate prep, compliance guidance \u2014 we\u2019ll give you the tools to run a credible, competitive campaign.",
    },
    {
      title: "A National Brand",
      description:
        "You\u2019re not running alone. You\u2019re running as part of a national movement with a clear identity. That gives you a story voters haven\u2019t heard before \u2014 and want to hear.",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "run" },
    { next: { revalidate: 60 } }
  );
  return {
    title: content?.heroHeadline || "Run for Office",
    description: content?.heroSubheadline || F.heroSubheadline,
  };
}

export default async function RunPage() {
  const content = await client.fetch(
    formPageContentQuery,
    { formType: "run" },
    { next: { revalidate: 60 } }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cmsCards = content?.cards as any[] | undefined;
  const cards =
    cmsCards && cmsCards.length > 0
      ? cmsCards.map((c: { headline?: string; body?: string }) => ({
          title: c.headline || "",
          description: c.body || "",
        }))
      : F.cards;

  const hasBodyContent = content?.bodyContent && content.bodyContent.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {content?.heroHeadline || F.heroHeadline}
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            {content?.heroSubheadline || F.heroSubheadline}
          </p>
        </div>
      </section>

      {/* Why Run */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Run as a Mesocrat</h2>
          {hasBodyContent ? (
            <PortableTextRenderer value={content.bodyContent} />
          ) : (
            <>
              <p className="text-primary/70 leading-relaxed mb-4">
                Most people who should run for office never do. They think they
                don&apos;t have enough money, enough connections, or enough
                experience. But the truth is, the people who make the best elected
                officials are the ones who actually understand what everyday
                Americans deal with.
              </p>
              <p className="text-primary/70 leading-relaxed mb-4">
                The Mesocratic Party is looking for candidates at every level —
                local, state, and federal. School boards. City councils. State
                legislatures. Congress. If you believe in pragmatic, middle-class
                governance and you&apos;re willing to put your name on the line,
                we want to hear from you.
              </p>
              <p className="text-primary/70 leading-relaxed">
                You don&apos;t need to be a politician. You need to be a problem
                solver who cares about your community.
              </p>
            </>
          )}
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            What We Offer Candidates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-8">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Polis Doctorate */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The Polis Doctorate</h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            We&apos;re developing a candidate training program called the Polis
            Doctorate — a rigorous, practical curriculum that prepares
            Mesocratic candidates to run competitive campaigns and govern
            effectively.
          </p>
          <p className="text-primary/70 leading-relaxed">
            Details on the Polis Doctorate will be announced ahead of Convention
            X. If you&apos;re interested in running for office, sign up below
            and we&apos;ll keep you in the loop.
          </p>
        </div>
      </section>

      {/* Who Should Run */}
      <section className="bg-primary text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Who Should Run</h2>
          <ul className="space-y-4 text-white/80 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-accent-light font-bold shrink-0">+</span>
              People who solve problems for a living — engineers, teachers,
              nurses, small business owners, project managers.
            </li>
            <li className="flex gap-3">
              <span className="text-accent-light font-bold shrink-0">+</span>
              People who are frustrated with both parties and believe there has
              to be a better way.
            </li>
            <li className="flex gap-3">
              <span className="text-accent-light font-bold shrink-0">+</span>
              People who care more about results than ideology.
            </li>
            <li className="flex gap-3">
              <span className="text-accent-light font-bold shrink-0">+</span>
              People who can disagree without demonizing.
            </li>
            <li className="flex gap-3">
              <span className="text-accent-light font-bold shrink-0">+</span>
              People who are willing to serve their community and then go home.
            </li>
          </ul>
        </div>
      </section>

      {/* Interest Form */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">
            Express Your Interest
          </h2>
          <p className="text-primary/60 text-center mb-8">
            Thinking about running? Tell us about yourself. No commitment — just
            a conversation starter.
          </p>
          <CandidateForm />
        </div>
      </section>
    </div>
  );
}
