import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://mesocrats.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Mesocratic Party — Where America Meets",
    template: "%s | The Mesocratic Party",
  },
  description:
    "The Mesocratic Party is a new political party for the common-sense middle. We believe in pragmatic, evidence-based policy that puts people over partisanship.",
  keywords: [
    "Mesocratic Party",
    "centrist political party",
    "moderate politics",
    "third party",
    "common sense",
    "bipartisan",
    "political reform",
    "pragmatic policy",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "The Mesocratic Party",
    url: siteUrl,
    title: "The Mesocratic Party — Where America Meets",
    description:
      "A new political party for the common-sense middle. Pragmatic, evidence-based policy that puts people over partisanship.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "The Mesocratic Party — Where America Meets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mesocrats",
    title: "The Mesocratic Party — Where America Meets",
    description:
      "A new political party for the common-sense middle. Pragmatic, evidence-based policy that puts people over partisanship.",
    images: ["/images/og-default.jpg"],
  },
};

// Organization JSON-LD structured data
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Mesocratic Party",
  url: siteUrl,
  logo: `${siteUrl}/images/mp-logo-m.png`,
  description:
    "A new political party for the common-sense middle. Pragmatic, evidence-based policy that puts people over partisanship.",
  sameAs: [
    "https://twitter.com/mesocrats",
    "https://www.facebook.com/mesocrats",
    "https://www.instagram.com/mesocrats",
    "https://www.youtube.com/@mesocrats",
    "https://www.linkedin.com/company/mesocrats",
    "https://www.tiktok.com/@mesocrats",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "General Inquiry",
    url: `${siteUrl}/contact`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Plausible Analytics */}
        <Script
          defer
          data-domain="mesocrats.org"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
