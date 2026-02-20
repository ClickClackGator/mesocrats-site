"use client";

export default function JoinForm() {
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
      <button
        type="submit"
        className="w-full bg-accent hover:bg-accent-light text-white font-bold py-3 rounded transition-colors"
      >
        I&apos;M IN
      </button>
      <p className="text-xs text-primary/40 text-center">
        By joining, you agree to our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/terms" className="underline">
          Terms of Service
        </a>
        .
      </p>
    </form>
  );
}
