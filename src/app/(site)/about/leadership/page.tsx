import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery, allTeamMembersQuery } from "@/sanity/lib/queries";
import { Globe } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    pageBySlugQuery,
    { slug: "leadership" },
    { next: { revalidate: 60 } }
  );
  return {
    title: page?.seo?.metaTitle || undefined,
    description: page?.seo?.metaDescription || undefined,
  };
}

interface SocialLinks {
  twitter?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  pinterest?: string;
  linkedin?: string;
  facebook?: string;
  website?: string;
}

interface Leader {
  _id: string;
  name: string;
  title: string;
  image?: string;
  socialLinks?: SocialLinks;
}

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 010-5.78 2.84 2.84 0 01.84.13v-3.5a6.37 6.37 0 00-.84-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.88a8.28 8.28 0 004.76 1.5V6.93a4.85 4.85 0 01-1-.24z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0a12 12 0 00-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.18 1.78 2.18 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.2 0 1.03.4 2.13.89 2.73a.36.36 0 01.08.34l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.78 2.74-7.25 7.9-7.25 4.15 0 7.37 2.96 7.37 6.92 0 4.12-2.6 7.43-6.21 7.43-1.21 0-2.35-.63-2.74-1.37l-.75 2.84c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1012 0z" />
  </svg>
);

const socialConfig: {
  key: keyof SocialLinks;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "twitter", label: "X", icon: XIcon },
  { key: "instagram", label: "Instagram", icon: InstagramIcon },
  { key: "youtube", label: "YouTube", icon: YouTubeIcon },
  { key: "tiktok", label: "TikTok", icon: TikTokIcon },
  { key: "pinterest", label: "Pinterest", icon: PinterestIcon },
  { key: "linkedin", label: "LinkedIn", icon: LinkedInIcon },
  { key: "facebook", label: "Facebook", icon: FacebookIcon },
  { key: "website", label: "Website", icon: Globe },
];

export default async function LeadershipPage() {
  const [page, leaders] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: "leadership" }, { next: { revalidate: 60 } }),
    client.fetch(allTeamMembersQuery, {}, { next: { revalidate: 60 } }) as Promise<Leader[]>,
  ]);

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
            <p className="inline-block bg-white text-accent rounded-full px-3 py-1 text-sm uppercase tracking-[0.2em] font-extrabold mb-4">
              {page.heroEyebrow}
            </p>
          )}
          {page?.heroHeadline && (
            <h1 className="text-5xl sm:text-7xl font-bold mb-4">
              {page.heroHeadline}
            </h1>
          )}
          {page?.heroSubheadline && (
            <p className="text-lg font-semibold text-white/90">
              {page.heroSubheadline}
            </p>
          )}
        </div>
        {page?.imageCredit && (
          <span className="absolute bottom-2 right-3 text-[9px] text-white/50">
            {page.imageCredit}
          </span>
        )}
      </section>

      {/* Accent divider bar */}
      <div className="h-1 bg-accent" />

      {/* Leaders Grid */}
      {leaders && leaders.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div key={leader._id} className="text-center">
                {leader.image ? (
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square mb-4 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-4xl text-gray-300">
                      {leader.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h2 className="text-lg font-bold text-primary">
                  {leader.name}
                </h2>
                <p className="text-sm text-primary/60 mt-1">{leader.title}</p>
                {leader.socialLinks && (
                  <div className="flex items-center justify-center gap-3 mt-3">
                    {socialConfig.map(({ key, label, icon: Icon }) => {
                      const url = leader.socialLinks?.[key];
                      if (!url) return null;
                      return (
                        <Link
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${leader.name} on ${label}`}
                          className="text-[#1A1A1A] hover:text-[#4374BA] transition-colors"
                        >
                          <Icon className="w-5 h-5" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
