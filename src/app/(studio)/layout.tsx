import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesocratic Party CMS",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
