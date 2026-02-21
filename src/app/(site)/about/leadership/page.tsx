import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { leadersQuery } from "@/sanity/lib/queries";
import {
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Leadership | The Mesocratic Party",
  description: "Meet the leadership of the Mesocratic Party.",
};

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
  photo?: string;
  socialLinks?: SocialLinks;
}

const socialConfig: {
  key: keyof SocialLinks;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "twitter", label: "Twitter", icon: Twitter },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "youtube", label: "YouTube", icon: Youtube },
  { key: "tiktok", label: "TikTok", icon: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.84 2.84 0 0 1 .84.13v-3.5a6.37 6.37 0 0 0-.84-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.88a8.28 8.28 0 0 0 4.76 1.5V6.93a4.85 4.85 0 0 1-1-.24Z" />
    </svg>
  )},
  { key: "pinterest", label: "Pinterest", icon: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.18 1.78 2.18 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.2 0 1.03.4 2.13.89 2.73a.36.36 0 0 1 .08.34l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.78 2.74-7.25 7.9-7.25 4.15 0 7.37 2.96 7.37 6.92 0 4.12-2.6 7.43-6.21 7.43-1.21 0-2.35-.63-2.74-1.37l-.75 2.84c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0Z" />
    </svg>
  )},
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "website", label: "Website", icon: Globe },
];

export default async function LeadershipPage() {
  const leaders: Leader[] = await client.fetch(
    leadersQuery,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-accent text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/60">
            ABOUT THE MESOCRATIC PARTY
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold mb-4">Leadership</h1>
        </div>
      </section>

      {/* Leaders Grid */}
      {leaders && leaders.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div key={leader._id} className="text-center">
                {leader.photo ? (
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={leader.photo}
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
                          className="text-primary/40 hover:text-accent transition-colors"
                        >
                          <Icon className="w-4 h-4" />
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
