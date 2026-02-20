"use client";

export default function ConventionForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <input
        type="email"
        placeholder="Email Address"
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <select className="w-full border border-primary/20 rounded px-4 py-3 text-sm text-primary/60 focus:outline-none focus:ring-2 focus:ring-accent">
        <option value="">Select Your State</option>
        {[
          "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
          "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
          "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
          "Maine","Maryland","Massachusetts","Michigan","Minnesota",
          "Mississippi","Missouri","Montana","Nebraska","Nevada",
          "New Hampshire","New Jersey","New Mexico","New York",
          "North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
          "Pennsylvania","Rhode Island","South Carolina","South Dakota",
          "Tennessee","Texas","Utah","Vermont","Virginia","Washington",
          "West Virginia","Wisconsin","Wyoming",
        ].map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select className="w-full border border-primary/20 rounded px-4 py-3 text-sm text-primary/60 focus:outline-none focus:ring-2 focus:ring-accent">
        <option value="">I&apos;m interested in...</option>
        <option value="delegate">Running as a Delegate</option>
        <option value="volunteer">Volunteering at Convention X</option>
        <option value="attend">Attending as a Guest</option>
        <option value="updates">Just Keep Me Updated</option>
      </select>
      <button
        type="submit"
        className="w-full bg-accent hover:bg-accent-light text-white font-bold py-3 rounded transition-colors"
      >
        REGISTER MY INTEREST
      </button>
    </form>
  );
}
