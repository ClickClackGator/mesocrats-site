import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allNewsPostsQuery } from "@/sanity/lib/queries";
import { categoryLabel, formatNewsDate } from "@/lib/utils";

/* ── Fallbacks ── */
const F = {
  heroHeadline: "What\u2019s Happening",
  heroSubheadline:
    "News, updates, and announcements from the Mesocratic Party.",
  articles: [
    {
      category: "Announcement",
      title: "The Mesocratic Party Launches",
      excerpt:
        "A new political party built for the middle class goes live. Here\u2019s what it stands for and what comes next.",
      date: "Coming Soon",
    },
    {
      category: "Convention",
      title: "Convention X: What to Expect in New Orleans",
      excerpt:
        "5,000 delegates. 50 states. One convention. Here\u2019s how Constitutional Convention X will work.",
      date: "Coming Soon",
    },
    {
      category: "Platform",
      title: "15 Positions, Zero Spin",
      excerpt:
        "We\u2019re releasing our full platform \u2014 15 clear positions on the issues that matter most to working Americans.",
      date: "Coming Soon",
    },
  ],
};

interface NewsPost {
  _id: string;
  title: string;
  slug: { current: string } | null;
  excerpt: string;
  publishedAt: string | null;
  category: string | null;
  author: { name: string; title: string; image: string | null } | null;
  coverImage: string | null;
}

export const metadata: Metadata = {
  title: "News",
  description: F.heroSubheadline,
};

export default async function NewsPage() {
  const posts: NewsPost[] =
    (await client.fetch(allNewsPostsQuery, {}, { next: { revalidate: 60 } })) ||
    [];

  const hasPosts = posts.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {F.heroHeadline}
          </h1>
          <p className="text-lg text-white/80">{F.heroSubheadline}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {hasPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => {
              const slug = post.slug?.current;
              const inner = (
                <article
                  className="bg-gray-light rounded-lg overflow-hidden flex flex-col h-full"
                >
                  {post.coverImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {categoryLabel(post.category)}
                    </span>
                    <h2 className="text-xl font-bold mt-2 mb-3">
                      {post.title}
                    </h2>
                    <p className="text-sm text-primary/70 leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-primary/40">
                      <span>{formatNewsDate(post.publishedAt)}</span>
                      {post.author && <span>{post.author.name}</span>}
                    </div>
                  </div>
                </article>
              );

              return slug ? (
                <Link key={post._id} href={`/news/${slug}`} className="group">
                  {inner}
                </Link>
              ) : (
                <div key={post._id}>{inner}</div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {F.articles.map((article) => (
                <article
                  key={article.title}
                  className="bg-gray-light rounded-lg p-8"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {article.category}
                  </span>
                  <h2 className="text-xl font-bold mt-2 mb-3">
                    {article.title}
                  </h2>
                  <p className="text-sm text-primary/70 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-primary/40">{article.date}</p>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-primary/40">
                More news coming soon. Check back for updates.
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
