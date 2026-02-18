import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join" };

export default function JoinPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        Join the Mesocratic Party
      </h1>
      <p className="text-primary/60">{/* Content coming soon */}</p>
    </section>
  );
}
