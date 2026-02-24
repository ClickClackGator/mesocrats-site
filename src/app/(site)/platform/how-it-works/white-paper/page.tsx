import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Built the Platform | The Mesocratic Party",
  description:
    "The Research, Methodology, and Strategic Framework Behind the Mesocratic Party's Policy Positions",
};

export default function HowItWorksWhitePaperPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="inline-block bg-white text-accent rounded-full px-3 py-1 text-sm uppercase tracking-[0.2em] font-extrabold mb-4">
            WHITE PAPER
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold mb-4">
            How We Built the Platform
          </h1>
          <p className="text-lg font-semibold text-white/90">
            The Research, Methodology, and Strategic Framework Behind the
            Mesocratic Party&apos;s Policy Positions
          </p>
        </div>
      </section>

      {/* Accent divider bar */}
      <div className="h-1 bg-accent" />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Download Button */}
        <div className="text-center mb-12">
          <Link
            href="/documents/MP_How_We_Built_the_Platform_v1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent hover:bg-accent-light text-white font-bold px-8 py-4 rounded transition-colors text-lg"
          >
            Download the Full White Paper
          </Link>
        </div>
      </section>
    </div>
  );
}
