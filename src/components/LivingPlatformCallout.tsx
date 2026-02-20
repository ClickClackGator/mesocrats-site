// components/LivingPlatformCallout.tsx
//
// The "THIS IS A LIVING PLATFORM" callout block.
// Appears at the bottom of every policy page.
// Pulls text from Site Settings.

import Link from 'next/link'

interface LivingPlatformCalloutProps {
  headline?: string
  body?: string
  ctas?: Array<{ label: string; url: string }>
}

export default function LivingPlatformCallout({
  headline,
  body,
  ctas,
}: LivingPlatformCalloutProps) {
  if (!headline && !body) return null

  return (
    <section className="my-16 border border-gray-200 bg-gray-50 rounded-lg p-8 md:p-12">
      {/* Headline */}
      {headline && (
        <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
          {headline}
        </p>
      )}

      {/* Body */}
      {body && (
        <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">
          {body}
        </p>
      )}

      {/* CTAs */}
      {ctas && ctas.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {ctas.map((cta, i) => (
            <Link
              key={i}
              href={cta.url}
              className="text-sm font-medium text-secondary hover:text-secondary-light underline underline-offset-2"
            >
              {cta.label} →
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
