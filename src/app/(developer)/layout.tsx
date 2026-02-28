import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import DevNavBar from "./components/DevNavBar";
import DevFooter from "./components/DevFooter";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default:
      "developer.mesocrats.org -- The Open Platform for American Political Technology",
    template: "%s | developer.mesocrats.org",
  },
  description:
    "Open-source political technology APIs, SDKs, and prompt libraries. Build compliant, transparent, and accessible tools for democracy with the Mesocratic Compliance Engine.",
};

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${dmSans.variable} ${jetbrainsMono.variable} font-dev-sans bg-[#0A0A15] text-white min-h-screen`}
    >
      <DevNavBar />
      <main className="pt-16">{children}</main>
      <DevFooter />
    </div>
  );
}
