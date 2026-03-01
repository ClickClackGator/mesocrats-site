import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "Compliance API", href: "/products/compliance" },
  { label: "Party Formation API", href: "/products/party-formation" },
  { label: "Ballot Access API", href: "/products/ballot-access" },
  { label: "Election Calendar API", href: "/products/election-calendar" },
];

const developerLinks = [
  { label: "API Reference", href: "/api-reference" },
  { label: "SDKs", href: "/sdks" },
  { label: "Prompt Library", href: "/prompt-library" },
  { label: "Sandbox", href: "/sandbox" },
  { label: "Changelog", href: "/changelog" },
];

const communityLinks = [
  { label: "GitHub", href: "https://github.com/ClickClackGator/mesocrats-site" },
  { label: "Community Forum", href: "/community" },
  { label: "Contributing Guide", href: "/contributing" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
];

export default function DevFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/MP_PartyStack_Logo.png"
                alt="PartyStack logo"
                width={20}
                height={20}
                className="h-5 w-auto"
              />
              <span className="text-sm font-semibold text-white">
                PartyStack
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              The open platform for American political technology. Build
              compliant, transparent, and accessible tools for democracy.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              by the Mesocratic National Committee
            </p>
          </div>

          {/* Products column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Developers
            </h3>
            <ul className="space-y-3">
              {developerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              {communityLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-gray-600 leading-relaxed text-center">
            Paid for by the Mesocratic National Committee. Not authorized by any
            candidate or candidate&apos;s committee.
          </p>
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-600">
            <span>PO Box 4218, Glen Allen, VA 23058</span>
            <span className="hidden sm:inline">|</span>
            <span>MIT License</span>
            <span className="hidden sm:inline">|</span>
            <a
              href="https://mesocrats.org"
              className="hover:text-gray-400 transition-colors"
            >
              mesocrats.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
