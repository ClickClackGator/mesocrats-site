"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    label: "About",
    children: [
      { label: "Our Mission", href: "/about/mission" },
      { label: "Our Story", href: "/about/story" },
      { label: "FAQ", href: "/about/faq" },
    ],
  },
  { label: "Platform", href: "/platform" },
  { label: "CCX", href: "/convention" },
  {
    label: "Get Involved",
    children: [
      { label: "Join", href: "/involved/join" },
      { label: "Volunteer", href: "/involved/volunteer" },
    ],
  },
  { label: "Candidates", href: "/candidates/run" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "Donate", href: "/donate" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-primary text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / site name */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/mp-logo.png"
              alt="Mesocratic Party logo"
              width={36}
              height={29}
              className="h-8 w-auto"
            />
            <span className="hidden sm:inline text-xl font-bold tracking-tight">
              The Mesocratic Party
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="px-3 py-2 text-sm font-medium hover:text-accent-light transition-colors">
                    {item.label}
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full bg-white text-primary rounded shadow-lg min-w-[180px] py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-light transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    item.label === "Donate"
                      ? "bg-accent hover:bg-accent-light text-white rounded ml-2"
                      : "hover:text-accent-light"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-white/10 px-4 pb-4">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <p className="px-2 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-white/60">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-2 py-2 text-sm hover:text-accent-light transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`block px-2 py-2 text-sm transition-colors ${
                  item.label === "Donate"
                    ? "bg-accent hover:bg-accent-light text-white rounded mt-2 text-center"
                    : "hover:text-accent-light"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
