"use client";

export default function CandidateForm() {
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
      <input
        type="text"
        placeholder="City, State"
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <select className="w-full border border-primary/20 rounded px-4 py-3 text-sm text-primary/60 focus:outline-none focus:ring-2 focus:ring-accent">
        <option value="">What level of office interests you?</option>
        <option value="local">Local (City Council, School Board, etc.)</option>
        <option value="state">State Legislature</option>
        <option value="federal">Federal (U.S. House or Senate)</option>
        <option value="unsure">Not sure yet</option>
      </select>
      <textarea
        placeholder="Tell us a bit about yourself and why you're considering a run (optional)"
        rows={4}
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
      />
      <button
        type="submit"
        className="w-full bg-secondary hover:bg-secondary-light text-white font-bold py-3 rounded transition-colors"
      >
        SUBMIT MY INTEREST
      </button>
    </form>
  );
}
