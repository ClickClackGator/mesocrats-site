// app/studio/[[...tool]]/page.tsx
//
// This embeds Sanity Studio at mesocrats.org/studio
// Access the CMS by visiting: https://mesocrats.org/studio

'use client'

import React from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
