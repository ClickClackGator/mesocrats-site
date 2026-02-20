"use client";

export default function DonateForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Email Address"
        className="flex-1 border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        type="submit"
        className="bg-accent hover:bg-accent-light text-white font-bold px-6 py-3 rounded transition-colors whitespace-nowrap"
      >
        NOTIFY ME
      </button>
    </form>
  );
}
