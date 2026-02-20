"use client";

export default function VolunteerForm({ tracks }: { tracks: string[] }) {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
        />
      </div>
      <input
        type="email"
        placeholder="Email Address"
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
      />
      <input
        type="text"
        placeholder="Zip Code"
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
      />
      <select className="w-full border border-primary/20 rounded px-4 py-3 text-sm text-primary/60 focus:outline-none focus:ring-2 focus:ring-accent bg-white">
        <option value="">Select a volunteer track</option>
        {tracks.map((track) => (
          <option key={track} value={track}>
            {track}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Tell us about yourself and why you want to volunteer (optional)"
        rows={4}
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white resize-none"
      />
      <button
        type="submit"
        className="w-full bg-cta hover:bg-cta-light text-white font-bold py-3 rounded transition-colors"
      >
        SIGN UP TO VOLUNTEER
      </button>
    </form>
  );
}
