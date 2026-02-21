import type { Metadata } from "next";
import Image from "next/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery, teamMemberByNameQuery } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "story" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || undefined,
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function StoryPage() {
  const [page, founder] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: "story" }, { next: { revalidate: 60 } }),
    client.fetch(teamMemberByNameQuery, { name: "Jack Karavich" }, { next: { revalidate: 60 } }),
  ]);

  const hasCmsContent = page?.content && page.content.length > 0;

  // Extract sections by type for timeline or other structured content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = page?.sections as any[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cardSection = sections?.find((s: any) => s._type === "cardSection");

  // Timeline from card section cards (each card: headline=year, body=event text)
  const timeline =
    cardSection?.cards && cardSection.cards.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cardSection.cards.map((c: any) => ({
          year: c.headline || "",
          event: c.body || "",
        }))
      : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {page?.heroImage && (
          <>
            <Image
              src={page.heroImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="relative max-w-3xl mx-auto text-center">
          {page?.heroEyebrow && (
            <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
              {page.heroEyebrow}
            </p>
          )}
          {page?.heroHeadline && (
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {page.heroHeadline}
            </h1>
          )}
          {page?.heroSubheadline && (
            <p className="text-lg font-semibold text-white/80">
              {page.heroSubheadline}
            </p>
          )}
        </div>
        {page?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-xs text-white/50">
            {page.imageCredit}
          </span>
        )}
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {hasCmsContent && (
          <PortableTextRenderer value={page.content} />
        )}

        {/* The Founder — CMS bio */}
        {(founder?.image || founder?.bio) && (
          <section>
            {founder.image && (
              <div className="mb-6">
                <Image
                  src={founder.image}
                  alt={founder.name || "Founder"}
                  width={400}
                  height={500}
                  className="rounded-lg w-48 h-auto"
                />
              </div>
            )}
            {founder.bio && (
              <PortableTextRenderer value={founder.bio} />
            )}
          </section>
        )}

        {/* Timeline */}
        {timeline.length > 0 && (
          <section>
            <div className="space-y-0">
              {timeline.map((item: { year: string; event: string }, i: number) => (
                <div key={i} className="flex gap-6 pb-8 relative">
                  {/* Vertical line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[19px] top-8 bottom-0 w-px bg-primary/10" />
                  )}
                  {/* Dot */}
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 relative z-10">
                    <span className="text-white text-xs font-bold">
                      {item.year.slice(2)}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="pt-2">
                    <p className="text-sm font-semibold text-accent mb-1">
                      {item.year}
                    </p>
                    <p className="text-primary/70 leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
