"use client";

import { useState } from "react";

export default function DonateForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <p className="text-center font-bold py-4">
        You&apos;re on the list! We&apos;ll notify you when donations open.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email Address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-secondary hover:bg-secondary-light text-white font-bold px-6 py-3 rounded transition-colors whitespace-nowrap disabled:opacity-50"
      >
        {loading ? "..." : "NOTIFY ME"}
      </button>
      {error && (
        <p className="text-red-600 text-sm sm:col-span-2">{error}</p>
      )}
    </form>
  );
}
