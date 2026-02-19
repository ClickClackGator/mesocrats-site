// src/sanity/lib/client.ts

import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-19', // Use today's date for latest API features
  useCdn: true, // Enable CDN for fast reads; disable for real-time preview
})

// Preview client (no CDN, uses token for draft content)
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-19',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
