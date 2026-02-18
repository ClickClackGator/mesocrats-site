import type { Metadata } from "next";
import Link from "next/link";
import JoinForm from "./JoinForm";

export const metadata: Metadata = { title: "Join" };

const whyJoin = [
  {
    title: "Have a Voice",
    description:
      "Members vote on policy, elect delegates, and shape the direction of the party. This isn\u2019t a mailing list. It\u2019s a seat at the table.",
  },
  {
    title: "Build Something New",
    description:
      "You\u2019re not joining an institution. You\u2019re helping build one. Every member who joins now is a founding member of the Mesocratic Party.",
  },
  {
    title: "It\u2019s Free",
    description:
      "Membership costs nothing. No dues. No fees. We believe access to a political party should never be behind a paywall.",
  },
];

export default function JoinPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            This Is Your Party. Come Build It.
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Membership is free. It takes 30 seconds. And it means you&apos;re
            part of what comes next.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Why Join the Mesocratic Party
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyJoin.map((item) => (
              <div key={item.title} className="bg-gray-light rounded-lg p-8">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="bg-gray-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">Sign Up</h2>
          <p className="text-primary/60 text-center mb-8">
            Join the Mesocratic Party in under a minute.
          </p>
          <JoinForm />
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">What Happens Next</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">You&apos;re In</h3>
                <p className="text-primary/70 text-sm leading-relaxed">
                  Once you sign up, you&apos;re a founding member of the
                  Mesocratic Party. You&apos;ll get a confirmation email with
                  your digital membership card.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Stay Connected</h3>
                <p className="text-primary/70 text-sm leading-relaxed">
                  We&apos;ll send you updates on Convention X, state organizing,
                  and opportunities to get involved. No spam. Just the stuff
                  that matters.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Use Your Voice</h3>
                <p className="text-primary/70 text-sm leading-relaxed">
                  As a member, you&apos;ll be eligible to vote on platform
                  positions, elect delegates in your state, and run for delegate
                  yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Membership Card */}
      <section className="bg-primary text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your Digital Membership Card
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Every member gets a digital membership card. It&apos;s your proof of
            membership, your ticket to participate, and your badge as a founding
            Mesocrat.
          </p>
          <div className="bg-white/10 rounded-lg p-10 inline-block">
            <p className="text-white/40 text-sm">
              Digital membership card preview coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Spread the Word */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Spread the Word</h2>
          <p className="text-primary/60 mb-8 max-w-xl mx-auto">
            Every person who joins makes the party stronger. Share the
            Mesocratic Party with someone you know who&apos;s tired of choosing
            between two bad options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/involved/volunteer"
              className="bg-accent hover:bg-accent-light text-white font-bold px-8 py-3 rounded transition-colors"
            >
              Volunteer
            </Link>
            <Link
              href="/platform"
              className="border-2 border-accent text-accent font-bold px-8 py-3 rounded hover:bg-accent hover:text-white transition-colors"
            >
              Read the Platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
