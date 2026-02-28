// src/sanity/schemas/siteSettings.ts
//
// Singleton document for global site settings.
// Things like mission statement, taglines, FEC disclaimer, footer content.
// There should only ever be one of these.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',

  groups: [
    { name: 'brand', title: 'Brand & Mission', default: true },
    { name: 'footer', title: 'Footer' },
    { name: 'legal', title: 'Legal & FEC' },
    { name: 'livingPlatform', title: 'Living Platform Callout' },
    { name: 'social', title: 'Social Media' },
  ],

  fields: [
    // ── Brand ──────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'brand',
      initialValue: 'The Mesocratic Party',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement (Full)',
      type: 'text',
      rows: 4,
      group: 'brand',
      description: 'The official mission statement. Used on About page, homepage, press boilerplate.',
    }),
    defineField({
      name: 'missionStatementShort',
      title: 'Mission Statement (Short)',
      type: 'string',
      group: 'brand',
      description: 'For bios, social headers, constrained spaces.',
    }),
    defineField({
      name: 'missionBarText',
      title: 'Homepage Mission Bar Text',
      type: 'string',
      group: 'brand',
      description: 'The one-liner on the homepage mission bar.',
    }),
    defineField({
      name: 'primaryTagline',
      title: 'Primary Tagline',
      type: 'string',
      group: 'brand',
      description: 'The main tagline (e.g., "America Meets Here")',
    }),
    defineField({
      name: 'secondaryTaglines',
      title: 'Secondary Taglines',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'brand',
      description: 'Rotating taglines for different contexts',
    }),

    // ── Living Platform Callout (global default) ──
    defineField({
      name: 'livingPlatformHeadline',
      title: 'Living Platform Callout - Headline',
      type: 'string',
      group: 'livingPlatform',
      initialValue: 'THIS IS A LIVING PLATFORM',
    }),
    defineField({
      name: 'livingPlatformBody',
      title: 'Living Platform Callout - Body',
      type: 'text',
      rows: 5,
      group: 'livingPlatform',
      description: 'The default callout text that appears at the bottom of every policy page.',
    }),
    defineField({
      name: 'livingPlatformCtas',
      title: 'Living Platform CTAs',
      type: 'array',
      group: 'livingPlatform',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        },
      ],
    }),

    // ── Footer ────────────────────────────────────
    defineField({
      name: 'footerColumns',
      title: 'Footer Navigation Columns',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Column Heading', type: 'string' },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'url', title: 'URL', type: 'string' },
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'url' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'heading' },
          },
        },
      ],
    }),

    // ── Legal ──────────────────────────────────────
    defineField({
      name: 'fecDisclaimer',
      title: 'FEC Disclaimer',
      type: 'text',
      rows: 3,
      group: 'legal',
      description: 'Required on every page. "Paid for by the Mesocratic National Committee..."',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'legal',
    }),

    // ── Social Media ──────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
              },
            },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'handle', title: 'Handle', type: 'string' },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'handle' },
          },
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
