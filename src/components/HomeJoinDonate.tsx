"use client";

import { useState } from "react";

export default function HomeJoinDonate() {
  const [joinEmail, setJoinEmail] = useState("");
  const [joinFirstName, setJoinFirstName] = useState("");
  const [joinZip, setJoinZip] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [joinError, setJoinError] = useState("");

  const [donateEmail, setDonateEmail] = useState("");
  const [donateLoading, setDonateLoading] = useState(false);
  const [donateSuccess, setDonateSuccess] = useState(false);
  const [donateError, setDonateError] = useState("");

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setJoinLoading(true);
    setJoinError("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: joinEmail,
          firstName: joinFirstName || undefined,
          metadata: joinZip ? { zipCode: joinZip } : undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setJoinSuccess(true);
    } catch (err) {
      setJoinError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setJoinLoading(false);
    }
  }

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setDonateLoading(true);
    setDonateError("");
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: donateEmail }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setDonateSuccess(true);
    } catch (err) {
      setDonateError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setDonateLoading(false);
    }
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Join side */}
      <div className="bg-white py-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <h2 className="text-3xl font-bold mb-3">
            This Is Your Party. Come Build It.
          </h2>
          <p className="text-primary/60 mb-8">
            Membership is free. It takes 30 seconds. And it means you&apos;re
            part of what comes next.
          </p>
          {joinSuccess ? (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold mb-2">You&apos;re In!</h3>
              <p className="text-primary/60">
                Welcome to the Mesocratic Party.
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleJoin}>
              <input
                type="text"
                placeholder="First Name"
                value={joinFirstName}
                onChange={(e) => setJoinFirstName(e.target.value)}
                className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={joinEmail}
                onChange={(e) => setJoinEmail(e.target.value)}
                className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={joinZip}
                onChange={(e) => setJoinZip(e.target.value)}
                className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {joinError && (
                <p className="text-red-600 text-sm">{joinError}</p>
              )}
              <button
                type="submit"
                disabled={joinLoading}
                className="w-full bg-accent hover:bg-accent-light text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
              >
                {joinLoading ? "SUBMITTING..." : "I'M IN"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Donate side */}
      <div className="bg-primary text-white py-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-md mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold mb-3">Fund the Middle Ground.</h2>
          <p className="text-white/70 mb-6">
            We&apos;re building the donation platform now. When it launches,
            every dollar will go directly to building this party and getting
            Mesocrats on ballots.
          </p>
          <p className="text-white/70 mb-8">
            Join our email list to be the first to know when donations open.
          </p>
          {donateSuccess ? (
            <div className="py-4">
              <p className="text-white font-bold">
                You&apos;re on the list! We&apos;ll notify you when donations
                open.
              </p>
            </div>
          ) : (
            <>
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={handleDonate}
              >
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={donateEmail}
                  onChange={(e) => setDonateEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  disabled={donateLoading}
                  className="bg-accent hover:bg-accent-light text-white font-bold px-6 py-3 rounded transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {donateLoading ? "..." : "NOTIFY ME"}
                </button>
              </form>
              {donateError && (
                <p className="text-red-400 text-sm mt-2">{donateError}</p>
              )}
            </>
          )}
          <p className="text-xs text-white/40 mt-4 leading-relaxed">
            Paid for by the Mesocratic National Committee. Not authorized by any
            candidate or candidate&apos;s committee. Contributions or gifts to
            the Mesocratic National Committee are not tax deductible.
          </p>
        </div>
      </div>
    </section>
  );
}
