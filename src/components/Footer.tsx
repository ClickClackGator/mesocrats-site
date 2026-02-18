import Link from "next/link";

const footerLinks = [
  {
    heading: "About",
    links: [
      { label: "Our Mission", href: "/about/mission" },
      { label: "Our Story", href: "/about/story" },
      { label: "FAQ", href: "/about/faq" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Join", href: "/involved/join" },
      { label: "Volunteer", href: "/involved/volunteer" },
      { label: "Run for Office", href: "/candidates/run" },
      { label: "Donate", href: "/donate" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Convention", href: "/convention" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "FEC Disclosures", href: "/disclosures" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerLinks.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                {section.heading}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
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

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* FEC Disclaimer */}
          <p className="text-xs text-white/50 leading-relaxed mb-4">
            Paid for by the Mesocratic National Committee. Not authorized by
            any candidate or candidate&apos;s committee.
          </p>

          {/* Copyright */}
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} The Mesocratic Party. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
