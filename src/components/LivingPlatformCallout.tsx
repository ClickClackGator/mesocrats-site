// components/LivingPlatformCallout.tsx
//
// The "THIS IS A LIVING PLATFORM" callout block.
// Appears at the bottom of every policy page.
// Pulls default text from Site Settings, or uses custom text if provided.

import Link from 'next/link'

interface LivingPlatformCalloutProps {
  // If custom text is provided, use it. Otherwise, pass in the defaults from siteSettings.
  headline?: string
  body?: string
  ctas?: Array<{ label: string; url: string }>
}

// Default content (fallback if Sanity isn't loaded yet or fields are empty)
const DEFAULTS = {
  headline: 'THIS IS A LIVING PLATFORM',
  body: `The position on this page is a starting point — not the final word. The Mesocratic Party's platform is written, debated, and ratified by its members at Constitutional Convention X, held annually in New Orleans every May. Between conventions, members shape the agenda through year-round digital engagement. These positions will evolve as the party grows. That's not a weakness. It's the whole point.`,
  ctas: [
    { label: 'Join the Party', url: '/involved/join' },
    { label: 'Submit an Idea', url: '/convention/ideas' },
    { label: 'Learn about CCX', url: '/convention' },
    { label: 'How Our Platform Works', url: '/platform/how-it-works' },
  ],
}

export default function LivingPlatformCallout({
  headline,
  body,
  ctas,
}: LivingPlatformCalloutProps) {
  const displayHeadline = headline || DEFAULTS.headline
  const displayBody = body || DEFAULTS.body
  const displayCtas = ctas?.length ? ctas : DEFAULTS.ctas

  return (
    <section className="my-16 border border-gray-200 bg-gray-50 rounded-lg p-8 md:p-12">
      {/* Headline */}
      <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
        {displayHeadline}
      </p>

      {/* Body */}
      <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">
        {displayBody}
      </p>

      {/* Question prompt */}
      <p className="font-semibold text-gray-900 mb-4">
        Want a voice in where this policy goes next?
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4">
        {displayCtas.map((cta, i) => (
          <Link
            key={i}
            href={cta.url}
            className="text-sm font-medium text-secondary hover:text-secondary-light underline underline-offset-2"
          >
            {cta.label} →
          </Link>
        ))}
      </div>
    </section>
  )
}
