import type { Metadata } from "next";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import ConventionForm from "./ConventionForm";

const CCX_DATE = new Date("2027-05-01T00:00:00-05:00");

/* ── Fallbacks ── */
const F = {
  heroEyebrow: "May 2027 \u00b7 New Orleans, Louisiana",
  heroHeadline: "Constitutional Convention X",
  heroSubheadline:
    "Where the Mesocratic Party becomes official. 5,000 delegates. 50 states. One convention.",
  heroCta1Label: "REGISTER YOUR INTEREST",
  heroCta1Link: "#register",
  heroCta2Label: "Join the Party First",
  heroCta2Link: "/involved/join",
  textSections: [
    {
      headline: "Why New Orleans",
      body: "New Orleans is a city that has always been about mixing things together and making something new. Jazz was born here \u2014 not from one tradition, but from many. Blues, gospel, ragtime, brass bands, and street music all collided in this city and created something the world had never heard.\n\nThat\u2019s the spirit of the Mesocratic Party. We\u2019re not one ideology. We\u2019re a mix \u2014 practical, creative, built from different traditions and united by the belief that the middle is where the real work gets done.\n\nNew Orleans is resilient, creative, and unapologetically itself. There\u2019s no better place to build something new.",
      bg: "",
    },
    {
      headline: "What Is Convention X?",
      body: "In 1787, fifty-five delegates met in Philadelphia to write the Constitution. They didn\u2019t agree on everything. They argued. They compromised. And they built a nation.\n\nConvention X draws from that spirit. Five thousand delegates \u2014 100 from each state \u2014 will gather in New Orleans to formally establish the Mesocratic Party. They\u2019ll draft the core tenets. Debate the platform. And elect the party\u2019s first national leadership.\n\nThis isn\u2019t a rally. It\u2019s a working convention. The delegates do the work. And what they build together becomes the foundation of a new political party.",
      bg: "bg-gray-light",
    },
    {
      headline: "5,000 Delegates. 50 States. Equal Voice.",
      body: "Every state sends exactly 100 delegates. It doesn\u2019t matter if your state has 500,000 people or 50 million. The Mesocratic Party believes in equal state representation at the founding level.\n\nDelegates are elected by party members in their state. Not appointed by insiders. Not chosen by donors. Elected by the people who joined the party. That\u2019s how you build a party from the ground up.",
      bg: "",
    },
  ],
  whatHappens: [
    {
      title: "Draft the Tenets",
      description:
        "Delegates will draft and ratify the core tenets of the Mesocratic Party \u2014 the foundational principles that guide every position, every candidate, and every decision the party makes.",
    },
    {
      title: "Debate the Platform",
      description:
        "Every policy position will be debated on the convention floor. Delegates vote. The majority rules. What comes out is the official Mesocratic platform \u2014 built by the people, not handed down from the top.",
    },
    {
      title: "Elect Leadership",
      description:
        "The convention will elect the party\u2019s first national leadership \u2014 the chair, vice chair, and national committee members who will lead the Mesocratic Party into its first election cycles.",
    },
  ],
  howToSteps: [
    {
      title: "Join the Party",
      description:
        "Membership is free and takes 30 seconds. You must be a member to participate in delegate elections.",
    },
    {
      title: "Run for Delegate (or Vote)",
      description:
        "When delegate elections open in your state, you can either run for a delegate seat or vote for the candidates you believe in.",
    },
    {
      title: "Attend Convention X",
      description:
        "If elected, you\u2019ll travel to New Orleans in May 2027 to represent your state and help build the Mesocratic Party from the ground up.",
    },
  ],
  registerHeadline: "Register Your Interest",
  registerSubheadline:
    "Convention X details are still being finalized. Register now and we\u2019ll keep you updated as plans develop.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "convention" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || "Convention X",
    description:
      page?.seo?.metaDescription ||
      "Constitutional Convention X \u2014 May 2027, New Orleans. 5,000 delegates. 50 states. One convention.",
  };
}

export default async function ConventionPage() {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "convention" },
    { next: { revalidate: 60 } }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = page?.sections as any[] | undefined;

  // Text sections (Why New Orleans, What Is CCX, 5000 Delegates)
  const textSections =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sections?.filter((s: any) => s._type === "textSection") || [];

  // Card sections — first one is "What Happens", second is "How to Participate"
  const cardSections =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sections?.filter((s: any) => s._type === "cardSection") || [];
  const whatHappensSection = cardSections[0];
  const howToSection = cardSections[1];

  // CTA section for the registration area
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctaSection = sections?.find((s: any) => s._type === "ctaSection");

  // Resolve text sections — use CMS if available, else fallbacks
  const resolvedTextSections =
    textSections.length > 0
      ? textSections
      : F.textSections.map((s) => ({
          headline: s.headline,
          body: s.body,
          _bg: s.bg,
        }));

  const whatHappensCards =
    whatHappensSection?.cards && whatHappensSection.cards.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        whatHappensSection.cards.map((c: any) => ({
          title: c.headline || "",
          description: c.body || "",
        }))
      : F.whatHappens;

  const howToSteps =
    howToSection?.cards && howToSection.cards.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        howToSection.cards.map((c: any) => ({
          title: c.headline || "",
          description: c.body || "",
        }))
      : F.howToSteps;

  // Background classes for alternating text sections
  const textBgs = ["", "bg-gray-light", ""];

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            {page?.heroEyebrow || F.heroEyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {page?.heroHeadline || F.heroHeadline}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            {page?.heroSubheadline || F.heroSubheadline}
          </p>
          <CountdownTimer target={CCX_DATE} className="justify-center mb-10" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={page?.heroCta1Link || F.heroCta1Link}
              className="bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors text-center"
            >
              {page?.heroCta1Label || F.heroCta1Label}
            </a>
            <Link
              href={page?.heroCta2Link || F.heroCta2Link}
              className="border-2 border-white/30 text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
            >
              {page?.heroCta2Label || F.heroCta2Label}
            </Link>
          </div>
        </div>
      </section>

      {/* Text sections: Why New Orleans, What Is CCX, 5000 Delegates */}
      {resolvedTextSections.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (section: any, i: number) => {
          const bg = section._bg ?? textBgs[i] ?? "";
          const isPortableText = Array.isArray(section.body);

          return (
            <section
              key={section._key || i}
              className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${bg}`}
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">
                  {section.headline}
                </h2>
                {isPortableText ? (
                  <PortableTextRenderer value={section.body} />
                ) : (
                  (section.body || "")
                    .split("\n\n")
                    .map((p: string, j: number) => (
                      <p
                        key={j}
                        className="text-primary/70 leading-relaxed mb-4 last:mb-0"
                      >
                        {p}
                      </p>
                    ))
                )}
              </div>
            </section>
          );
        }
      )}

      {/* What Happens at Convention X */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            {whatHappensSection?.headline || "What Happens at Convention X"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatHappensCards.map(
              (item: { title: string; description: string }, idx: number) => (
                <div
                  key={item.title || idx}
                  className="bg-white/10 rounded-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            {howToSection?.headline || "How to Participate"}
          </h2>
          <div className="space-y-6">
            {howToSteps.map(
              (
                item: { title: string; description: string },
                idx: number
              ) => (
                <div key={item.title || idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-primary/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section
        id="register"
        className="bg-gray-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">
            {ctaSection?.headline || F.registerHeadline}
          </h2>
          <p className="text-primary/60 text-center mb-8">
            {ctaSection?.body || F.registerSubheadline}
          </p>
          <ConventionForm />
        </div>
      </section>
    </div>
  );
}
