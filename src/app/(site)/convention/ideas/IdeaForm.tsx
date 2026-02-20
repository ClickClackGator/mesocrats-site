"use client";

export default function IdeaForm() {
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
        <option value="">Policy Area</option>
        <option value="healthcare">Healthcare</option>
        <option value="economy">Economy & Jobs</option>
        <option value="taxes">Tax Reform</option>
        <option value="education">Education</option>
        <option value="infrastructure">Infrastructure</option>
        <option value="immigration">Immigration</option>
        <option value="housing">Housing</option>
        <option value="environment">Climate & Energy</option>
        <option value="other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Idea Title (brief summary)"
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <textarea
        placeholder="Describe your policy idea..."
        rows={6}
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
      />
      <button
        type="submit"
        className="w-full bg-accent hover:bg-accent-light text-white font-bold py-3 rounded transition-colors"
      >
        SUBMIT IDEA
      </button>
    </form>
  );
}
