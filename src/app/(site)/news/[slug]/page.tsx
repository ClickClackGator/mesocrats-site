import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { newsPostBySlugQuery } from "@/sanity/lib/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { categoryLabel, formatNewsDate } from "@/lib/utils";

interface NewsPostData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: unknown[] | null;
  publishedAt: string | null;
  category: string | null;
  author: {
    name: string;
    title: string;
    bio: unknown[] | null;
    image: string | null;
  } | null;
  coverImage: string | null;
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
    ogImage: unknown | null;
  } | null;
}

// ── Static Params ──────────────────────────────────
export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "newsPost" && !(_id in path("drafts.**"))]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 60 } }
  );
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

// ── Dynamic Metadata ───────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: NewsPostData | null = await client.fetch(
    newsPostBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
  };
}

// ── Page ───────────────────────────────────────────
export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: NewsPostData | null = await client.fetch(
    newsPostBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!post) notFound();

  const hasBody = post.body && post.body.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            {categoryLabel(post.category)}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <p className="text-white/70 text-sm">
            {formatNewsDate(post.publishedAt)}
            {post.author && <> &middot; {post.author.name}</>}
          </p>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Excerpt as lead paragraph */}
        {post.excerpt && (
          <p className="text-lg text-primary/70 leading-relaxed mb-8 font-medium">
            {post.excerpt}
          </p>
        )}

        {hasBody ? (
          <PortableTextRenderer value={post.body!} />
        ) : (
          <p className="text-primary/50 italic">
            Full article coming soon.
          </p>
        )}

        {/* Author Bio */}
        {post.author && (
          <div className="mt-16 pt-8 border-t border-primary/10">
            <div className="flex items-start gap-4">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={56}
                  height={56}
                  className="rounded-full w-14 h-14 object-cover"
                />
              )}
              <div>
                <p className="font-bold">{post.author.name}</p>
                {post.author.title && (
                  <p className="text-sm text-primary/60">
                    {post.author.title}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Back to News */}
        <div className="mt-12">
          <Link
            href="/news"
            className="text-accent font-semibold hover:underline"
          >
            &larr; Back to News
          </Link>
        </div>
      </article>
    </div>
  );
}
