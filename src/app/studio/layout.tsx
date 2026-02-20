import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesocratic Party CMS",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
