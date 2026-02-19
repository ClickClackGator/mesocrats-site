// sanity.config.ts
// Place in project root

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'mesocratic-party',
  title: 'Mesocratic Party CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
    visionTool(), // GROQ query playground — useful for testing queries
  ],

  schema: {
    types: schemaTypes,
  },
})
