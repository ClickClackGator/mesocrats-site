import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

/* ── Fallbacks ── */
const F = {
  footerColumns: [
    {
      heading: "About",
      links: [
        { label: "Our Mission", url: "/about/mission" },
        { label: "Our Story", url: "/about/story" },
        { label: "FAQ", url: "/about/faq" },
      ],
    },
    {
      heading: "Get Involved",
      links: [
        { label: "Join", url: "/involved/join" },
        { label: "Volunteer", url: "/involved/volunteer" },
        { label: "Run for Office", url: "/candidates/run" },
        { label: "Donate", url: "/donate" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Platform", url: "/platform" },
        { label: "Convention", url: "/convention" },
        { label: "News", url: "/news" },
        { label: "Contact", url: "/contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", url: "/privacy" },
        { label: "Terms of Service", url: "/terms" },
        { label: "FEC Disclosures", url: "/disclosures" },
      ],
    },
  ],
  fecDisclaimer:
    "Paid for by the Mesocratic National Committee. Not authorized by any candidate or candidate\u2019s committee.",
};

interface FooterColumn {
  heading: string;
  links: { label: string; url: string }[];
}

interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export default async function Footer() {
  const settings = await client.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 60 } }
  );

  const columns: FooterColumn[] =
    settings?.footerColumns && settings.footerColumns.length > 0
      ? settings.footerColumns
      : F.footerColumns;

  const fecDisclaimer = settings?.fecDisclaimer || F.fecDisclaimer;
  const copyrightText = settings?.copyrightText;
  const socialLinks: SocialLink[] = settings?.socialLinks || [];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {columns.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                {section.heading}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex gap-4 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {social.handle || social.platform}
              </a>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* FEC Disclaimer */}
          <p className="text-xs text-white/50 leading-relaxed mb-4">
            {fecDisclaimer}
          </p>

          {/* Copyright */}
          <p className="text-xs text-white/40">
            {copyrightText || (
              <>
                &copy; {new Date().getFullYear()} The Mesocratic Party. All
                rights reserved.
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
