// src/sanity/schemas/policyPage.ts
//
// Schema for the 15 policy/platform pages.
// Maps to the consistent template: Reality → Others Say → Where We Stand → What It Means
// Each section uses Portable Text (rich text) for flexible formatting.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'policyPage',
  title: 'Policy Page',
  type: 'document',
  icon: () => '📋',

  // Group fields into tabs for a cleaner editing experience
  groups: [
    { name: 'core', title: 'Core Info', default: true },
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Page Content' },
    { name: 'overview', title: 'Overview Card' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    // ── Core Info ──────────────────────────────────
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title (e.g., "Healthcare")',
      group: 'core',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL path (e.g., "healthcare" → /platform/healthcare)',
      group: 'core',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'core',
      options: {
        list: [
          { title: 'Economy', value: 'economy' },
          { title: 'Rights & Freedoms', value: 'rights-freedoms' },
          { title: 'Government Reform', value: 'government-reform' },
          { title: 'National Security', value: 'national-security' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order on the Platform Overview page (1-15)',
      group: 'core',
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier (e.g., "heart-cross", "equal-sign", "ballot-phone"). Used by the frontend to render the correct icon.',
      group: 'core',
    }),

    // ── Hero Section ──────────────────────────────
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
      description: 'The bold headline (e.g., "See a Doctor. Not a Bill.")',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      type: 'text',
      rows: 2,
      description: 'The subheadline below the headline',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),

    // ── Page Content Sections ─────────────────────
    // Each section is Portable Text for full rich-text editing
    defineField({
      name: 'realitySection',
      title: 'THE REALITY',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      description: 'State the problem in plain, human terms. Data and context.',
      group: 'content',
    }),
    defineField({
      name: 'othersSaySection',
      title: 'WHAT OTHERS SAY',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      description: 'Respectfully acknowledge GOP and Dem positions. "Republicans are right that... Democrats are right that..."',
      group: 'content',
    }),
    defineField({
      name: 'whereWeStandSection',
      title: 'WHERE WE STAND',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                ],
              },
            ],
          },
        },
      ],
      description: 'The Mesocratic position. Detailed policy proposals.',
      group: 'content',
    }),
    defineField({
      name: 'whatItMeansSection',
      title: 'WHAT IT MEANS FOR YOU',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      description: 'Connect the policy to real life. "If you\'re a parent..." "If you\'re a veteran..."',
      group: 'content',
    }),

    // ── Living Platform Callout ────────────────────
    defineField({
      name: 'livingPlatformCallout',
      title: 'Living Platform Callout',
      type: 'object',
      description: 'The "This Is a Living Platform" block at the bottom. Uses defaults if left empty.',
      group: 'content',
      fields: [
        {
          name: 'useDefault',
          title: 'Use default callout',
          type: 'boolean',
          initialValue: true,
          description: 'If checked, uses the standard Living Platform text from Site Settings.',
        },
        {
          name: 'customText',
          title: 'Custom Callout Text (only if not using default)',
          type: 'text',
          rows: 4,
          hidden: ({ parent }: { parent?: { useDefault?: boolean } }) => parent?.useDefault !== false,
        },
      ],
    }),

    // ── Overview Card (for Platform grid) ──────────
    defineField({
      name: 'summaryDescription',
      title: 'Platform Overview Summary',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the Platform Overview card (2-3 sentences)',
      group: 'overview',
      validation: (Rule) => Rule.required().max(300),
    }),

    // ── SEO ────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'ogImage', title: 'Social Share Image', type: 'image' },
      ],
    }),
  ],

  // Preview config for the Studio document list
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
      media: 'heroImage',
    },
  },
})
