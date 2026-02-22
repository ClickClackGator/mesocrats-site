// components/PortableTextRenderer.tsx
//
// Custom Portable Text renderer that applies Mesocratic brand styling.
// Use this anywhere you render rich text content from Sanity.

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'

// Custom components for rendering Portable Text blocks
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-800 leading-relaxed mb-4">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-16 mb-6 pt-10 border-t border-gray-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative border-l-4 border-secondary pl-8 pr-4 py-6 my-10 bg-gray-50 rounded-r-lg">
        <span className="absolute top-3 left-3 text-4xl leading-none text-secondary/20 font-serif">&ldquo;</span>
        <div className="text-lg md:text-xl font-semibold text-gray-900 leading-relaxed italic">
          {children}
        </div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || '#'
      // Internal links use Next.js Link, external links use <a>
      if (href.startsWith('/')) {
        return (
          <Link
            href={href}
            className="text-secondary hover:text-secondary-light underline underline-offset-2"
          >
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:text-secondary-light underline underline-offset-2"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-800">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const imageUrl = urlForImage(value)?.width(1200).url()
      if (!imageUrl) return null
      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ''}
            width={1200}
            height={675}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

interface PortableTextRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[] // Portable Text array from Sanity
  className?: string
}

export default function PortableTextRenderer({
  value,
  className = '',
}: PortableTextRendererProps) {
  if (!value) return null
  return (
    <div className={`prose-mesocratic max-w-3xl ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  )
}
