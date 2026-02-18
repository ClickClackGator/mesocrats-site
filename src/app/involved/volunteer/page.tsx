import type { Metadata } from "next";
import VolunteerForm from "./VolunteerForm";

export const metadata: Metadata = { title: "Volunteer" };

const tracks = [
  {
    title: "State Organizer",
    description:
      "Lead the Mesocratic Party in your state. Build local teams, coordinate events, and prepare your state for delegate elections ahead of Convention X.",
  },
  {
    title: "Digital Ambassador",
    description:
      "Spread the word online. Share content, engage in conversations, and help grow the party\u2019s presence on social media and digital platforms.",
  },
  {
    title: "Event Volunteer",
    description:
      "Help plan and run local meetups, town halls, and organizing events in your area. Great for people who like getting things done in person.",
  },
  {
    title: "Ballot Access",
    description:
      "Help get the Mesocratic Party on the ballot in your state. This includes petition drives, signature collection, and navigating state election requirements.",
  },
  {
    title: "Content & Creative",
    description:
      "Writers, designers, video creators, and storytellers. Help create the content that explains who we are and why it matters.",
  },
  {
    title: "Skills-Based",
    description:
      "Lawyers, accountants, developers, data analysts, project managers \u2014 if you have a professional skill that could help build a political party, we need you.",
  },
];

export default function VolunteerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Volunteer</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Pick a track. Use your skills. Help build the party from the
            ground up.
          </p>
        </div>
      </section>

      {/* Volunteer Tracks */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Choose Your Track
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <div
                key={track.title}
                className="bg-gray-light rounded-lg p-8"
              >
                <h3 className="text-xl font-bold mb-3">{track.title}</h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  {track.description}
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
            Tell us what you&apos;re interested in. We&apos;ll match you with
            the right opportunities.
          </p>
          <VolunteerForm tracks={tracks.map((t) => t.title)} />
        </div>
      </section>
    </div>
  );
}
