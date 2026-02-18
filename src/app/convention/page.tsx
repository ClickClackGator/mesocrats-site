import type { Metadata } from "next";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import ConventionForm from "./ConventionForm";

export const metadata: Metadata = { title: "Convention X" };

const CCX_DATE = new Date("2027-05-01T00:00:00-05:00");

const whatHappens = [
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
];

export default function ConventionPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            May 2027 &middot; New Orleans, Louisiana
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Constitutional Convention X
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Where the Mesocratic Party becomes official. 5,000 delegates.
            50 states. One convention.
          </p>
          <CountdownTimer target={CCX_DATE} className="justify-center mb-10" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#register"
              className="bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors text-center"
            >
              REGISTER YOUR INTEREST
            </a>
            <Link
              href="/involved/join"
              className="border-2 border-white/30 text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
            >
              Join the Party First
            </Link>
          </div>
        </div>
      </section>

      {/* Why New Orleans */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why New Orleans</h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            New Orleans is a city that has always been about mixing things
            together and making something new. Jazz was born here — not from one
            tradition, but from many. Blues, gospel, ragtime, brass bands, and
            street music all collided in this city and created something the
            world had never heard.
          </p>
          <p className="text-primary/70 leading-relaxed mb-4">
            That&apos;s the spirit of the Mesocratic Party. We&apos;re not one
            ideology. We&apos;re a mix — practical, creative, built from
            different traditions and united by the belief that the middle is
            where the real work gets done.
          </p>
          <p className="text-primary/70 leading-relaxed">
            New Orleans is resilient, creative, and unapologetically itself.
            There&apos;s no better place to build something new.
          </p>
        </div>
      </section>

      {/* What Is Convention X */}
      <section className="bg-gray-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">What Is Convention X?</h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            In 1787, fifty-five delegates met in Philadelphia to write the
            Constitution. They didn&apos;t agree on everything. They argued.
            They compromised. And they built a nation.
          </p>
          <p className="text-primary/70 leading-relaxed mb-4">
            Convention X draws from that spirit. Five thousand delegates — 100
            from each state — will gather in New Orleans to formally establish
            the Mesocratic Party. They&apos;ll draft the core tenets. Debate the
            platform. And elect the party&apos;s first national leadership.
          </p>
          <p className="text-primary/70 leading-relaxed">
            This isn&apos;t a rally. It&apos;s a working convention. The
            delegates do the work. And what they build together becomes the
            foundation of a new political party.
          </p>
        </div>
      </section>

      {/* 5000 State Reps */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            5,000 Delegates. 50 States. Equal Voice.
          </h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            Every state sends exactly 100 delegates. It doesn&apos;t matter if
            your state has 500,000 people or 50 million. The Mesocratic Party
            believes in equal state representation at the founding level.
          </p>
          <p className="text-primary/70 leading-relaxed">
            Delegates are elected by party members in their state. Not appointed
            by insiders. Not chosen by donors. Elected by the people who joined
            the party. That&apos;s how you build a party from the ground up.
          </p>
        </div>
      </section>

      {/* What Happens at CCX */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            What Happens at Convention X
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatHappens.map((item) => (
              <div
                key={item.title}
                className="bg-white/10 rounded-lg p-8"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">How to Participate</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Join the Party</h3>
                <p className="text-primary/70 text-sm leading-relaxed">
                  Membership is free and takes 30 seconds. You must be a member
                  to participate in delegate elections.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Run for Delegate (or Vote)</h3>
                <p className="text-primary/70 text-sm leading-relaxed">
                  When delegate elections open in your state, you can either run
                  for a delegate seat or vote for the candidates you believe in.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Attend Convention X</h3>
                <p className="text-primary/70 text-sm leading-relaxed">
                  If elected, you&apos;ll travel to New Orleans in May 2027 to
                  represent your state and help build the Mesocratic Party from
                  the ground up.
                </p>
              </div>
            </div>
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
            Register Your Interest
          </h2>
          <p className="text-primary/60 text-center mb-8">
            Convention X details are still being finalized. Register now and
            we&apos;ll keep you updated as plans develop.
          </p>
          <ConventionForm />
        </div>
      </section>
    </div>
  );
}
