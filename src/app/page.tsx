import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            The Mesocratic Party
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {/* Content coming soon */}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/involved/join"
              className="bg-white text-accent font-semibold px-8 py-3 rounded hover:bg-gray-light transition-colors"
            >
              Join the Party
            </Link>
            <Link
              href="/platform"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-colors"
            >
              Read Our Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-light rounded-lg p-8">
            <h2 className="text-xl font-bold mb-3">Our Mission</h2>
            <p className="text-sm text-primary/70 mb-4">
              {/* Content coming soon */}
            </p>
            <Link
              href="/about/mission"
              className="text-accent font-medium text-sm hover:underline"
            >
              Learn more &rarr;
            </Link>
          </div>
          <div className="bg-gray-light rounded-lg p-8">
            <h2 className="text-xl font-bold mb-3">Convention</h2>
            <p className="text-sm text-primary/70 mb-4">
              {/* Content coming soon */}
            </p>
            <Link
              href="/convention"
              className="text-accent font-medium text-sm hover:underline"
            >
              Learn more &rarr;
            </Link>
          </div>
          <div className="bg-gray-light rounded-lg p-8">
            <h2 className="text-xl font-bold mb-3">Run for Office</h2>
            <p className="text-sm text-primary/70 mb-4">
              {/* Content coming soon */}
            </p>
            <Link
              href="/candidates/run"
              className="text-accent font-medium text-sm hover:underline"
            >
              Learn more &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
