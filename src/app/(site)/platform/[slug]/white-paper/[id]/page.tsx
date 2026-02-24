import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import { whitePaperConfig } from "../../../whitePaperConfig";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: { slug: string; id: string }[] = [];
  for (const [slug, papers] of Object.entries(whitePaperConfig)) {
    for (const paper of papers) {
      params.push({ slug, id: paper.id });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; id: string };
}): Promise<Metadata> {
  const papers = whitePaperConfig[params.slug];
  const config = papers?.find((p) => p.id === params.id);
  if (!config) return {};
  return {
    title: `${config.headline} | The Mesocratic Party`,
    description: config.subheadline,
  };
}

export default async function WhitePaperPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const papers = whitePaperConfig[params.slug];
  const config = papers?.find((p) => p.id === params.id);
  if (!config) notFound();

  const page = await client.fetch(
    pageBySlugQuery,
    { slug: params.id },
    { next: { revalidate: 60 } }
  );

  const hasCmsContent = page?.content && page.content.length > 0;

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
          <p className="inline-block bg-white text-accent rounded-full px-3 py-1 text-sm uppercase tracking-[0.2em] font-extrabold mb-4">
            {page?.heroEyebrow || config.eyebrow}
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold mb-4">
            {page?.heroHeadline || config.headline}
          </h1>
          <p className="text-lg font-semibold text-white/90">
            {page?.heroSubheadline || config.subheadline}
          </p>
        </div>
        {page?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-[9px] text-white/50">
            {page.imageCredit}
          </span>
        )}
      </section>

      {/* Accent divider bar */}
      <div className="h-1 bg-accent" />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Download Button */}
        <div className="text-center mb-12">
          <Link
            href={config.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent hover:bg-accent-light text-white font-bold px-8 py-4 rounded transition-colors text-lg"
          >
            Download the Full White Paper (PDF)
          </Link>
        </div>

        {/* CMS Body Content */}
        {hasCmsContent && (
          <article>
            <PortableTextRenderer value={page.content} />
          </article>
        )}
      </section>
    </div>
  );
}
