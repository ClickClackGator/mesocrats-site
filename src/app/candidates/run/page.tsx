import type { Metadata } from "next";

export const metadata: Metadata = { title: "Run for Office" };

export default function RunPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Run for Office</h1>
      <p className="text-primary/60">{/* Content coming soon */}</p>
    </section>
  );
}
