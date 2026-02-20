import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { allFaqEntriesQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = { title: "FAQ" };

const FALLBACK_ITEMS = [
  {
    question: "What is the Mesocratic Party?",
    answer:
      "The Mesocratic Party is a new American political party built to protect the middle class and hold the political center. We take real positions on real issues \u2014 healthcare, taxes, voting, infrastructure, and more \u2014 without hedging or spin. We\u2019re not left. We\u2019re not right. We\u2019re the reason the whole thing works.",
  },
  {
    question: "What does \u201CMesocratic\u201D mean?",
    answer:
      "It comes from Greek. \u201CMeso\u201D means middle. \u201CKratos\u201D means power or rule. Mesocratic literally means \u201Crule by the middle.\u201D That\u2019s us: a party where the broad, working center of this country holds the power.",
  },
  {
    question: "Is this a third party?",
    answer:
      "Yes. The Mesocratic Party is a nationally organized political party, separate from the Democrats and Republicans. We\u2019re registered as a Section 527 political organization and we\u2019re building toward ballot access in all 50 states.",
  },
  {
    question: "Are you centrist?",
    answer:
      "We\u2019re not centrist in the sense of splitting every issue down the middle. We take clear positions. On some issues, we\u2019ll agree with the left. On others, with the right. And on many, we\u2019ll chart our own path entirely. We\u2019re pragmatic, not wishy-washy.",
  },
  {
    question: "How do I join?",
    answer:
      "Go to the Join page on this site. Fill in your name, email, and zip code. That\u2019s it. Membership is free, and it takes about 30 seconds.",
  },
  {
    question: "What is Convention X?",
    answer:
      "Constitutional Convention X (CCX) is our founding convention, scheduled for May 2027 in New Orleans, Louisiana. Five thousand elected state delegates will gather to draft the party\u2019s core tenets, debate the platform, and elect national leadership. It\u2019s how the Mesocratic Party becomes official \u2014 built from the ground up by its members.",
  },
  {
    question: "How do I become a delegate?",
    answer:
      "Every state will elect 100 delegates to attend Convention X. The delegate election process will be announced as we build out state-level organizing. Join the party and sign up as a volunteer to be the first to know when delegate elections open in your state.",
  },
  {
    question: "Can I run for office as a Mesocrat?",
    answer:
      "Yes. We\u2019re actively looking for candidates at every level \u2014 local, state, and federal. Visit the Run for Office page to learn more about what we offer candidates and to express your interest.",
  },
  {
    question: "How is the party funded?",
    answer:
      "The Mesocratic National Committee is funded by individual contributions. We don\u2019t take corporate PAC money. Our donation platform is currently being built \u2014 join our email list to be notified when it launches.",
  },
  {
    question: "Is this a real party or a movement?",
    answer:
      "It\u2019s a real party. We\u2019re organized, registered, and building toward running candidates on ballots. Movements inspire. Parties govern. We intend to do both.",
  },
  {
    question: "How can I help right now?",
    answer:
      "Join the party. Volunteer. Talk to your neighbors. Share the platform. If you\u2019re in a position to organize in your state, sign up as a State Organizer on our Volunteer page. Every person who joins makes the party stronger.",
  },
];

export default async function FAQPage() {
  const entries = await client.fetch(
    allFaqEntriesQuery,
    {},
    { next: { revalidate: 60 } }
  );

  const useCms = entries && entries.length > 0;

  // Build accordion items — CMS answers are Portable Text, fallbacks are strings
  const items = useCms
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      entries.map((entry: any) => ({
        question: entry.question,
        answer: entry.answer ? (
          <PortableTextRenderer value={entry.answer} />
        ) : (
          ""
        ),
      }))
    : FALLBACK_ITEMS;

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            About
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/80">
            Straight answers. No spin.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Accordion items={items} />
      </section>
    </div>
  );
}
