"use client";

export default function HomeJoinDonate() {
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
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="First Name"
              className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-light text-white font-bold py-3 rounded transition-colors"
            >
              I&apos;M IN
            </button>
          </form>
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
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent-light text-white font-bold px-6 py-3 rounded transition-colors whitespace-nowrap"
            >
              NOTIFY ME
            </button>
          </form>
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
