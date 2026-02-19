// app/studio/[[...tool]]/layout.tsx
//
// Minimal layout for the Studio route.
// Prevents the main site layout (nav, footer) from wrapping the Studio.

export const metadata = {
  title: 'Mesocratic Party CMS',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
