// src/sanity/schemas/page.ts
//
// Generic page schema for static pages: Mission, Story, Convention X, Homepage, etc.
// Uses a flexible sections array so each page can have different content blocks.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: () => '📄',

  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    // ── Identification ────────────────────────────
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title (e.g., "Our Mission", "Convention X")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used in the URL. "home" is the homepage.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      description: 'Helps the frontend know which layout to use',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'About', value: 'about' },
          { title: 'Convention X', value: 'convention' },
          { title: 'Platform Overview', value: 'platform-overview' },
          { title: 'How Our Platform Works', value: 'platform-governance' },
          { title: 'Action Page', value: 'action' },
          { title: 'Generic', value: 'generic' },
        ],
      },
    }),

    // ── Hero Section ──────────────────────────────
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow Text',
      type: 'string',
      description: 'Small caps text above the headline (e.g., "ABOUT THE MESOCRATIC PARTY")',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'imageCredit',
      title: 'Hero Image Credit',
      type: 'string',
      description: 'e.g. "Photo by Chris Henry on Unsplash"',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta1Label',
      title: 'Hero CTA 1 - Label',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta1Link',
      title: 'Hero CTA 1 - Link',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta2Label',
      title: 'Hero CTA 2 - Label',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta2Link',
      title: 'Hero CTA 2 - Link',
      type: 'string',
      group: 'hero',
    }),

    // ── Flexible Content Sections ─────────────────
    defineField({
      name: 'content',
      title: 'Page Body Content',
      type: 'array',
      group: 'content',
      description: 'Main page content in rich text',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
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
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    description: 'Internal (/platform) or external (https://...)',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Required for accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),

    // ── Structured Sections (cards, CTAs, etc.) ───
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      group: 'content',
      description: 'Structured content blocks (cards, callouts, CTAs)',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            { name: 'label', title: 'Section Label', type: 'string' },
            { name: 'headline', title: 'Headline', type: 'string' },
            { name: 'subheadline', title: 'Subheadline', type: 'string' },
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: { title: 'headline', subtitle: 'label' },
          },
        },
        {
          type: 'object',
          name: 'cardSection',
          title: 'Card Section',
          fields: [
            { name: 'headline', title: 'Section Headline', type: 'string' },
            { name: 'subheadline', title: 'Section Subheadline', type: 'string' },
            {
              name: 'cards',
              title: 'Cards',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'icon', title: 'Icon', type: 'string' },
                    { name: 'headline', title: 'Card Headline', type: 'string' },
                    { name: 'body', title: 'Card Body', type: 'text', rows: 4 },
                    { name: 'linkText', title: 'Link Text', type: 'string' },
                    { name: 'linkUrl', title: 'Link URL', type: 'string' },
                  ],
                  preview: {
                    select: { title: 'headline' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'headline' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Card Section' }
            },
          },
        },
        {
          type: 'object',
          name: 'ctaSection',
          title: 'CTA Section',
          fields: [
            { name: 'label', title: 'Section Label / Eyebrow', type: 'string' },
            { name: 'headline', title: 'Headline', type: 'string' },
            { name: 'body', title: 'Body', type: 'text', rows: 3 },
            { name: 'ctaLabel', title: 'Button Label', type: 'string' },
            { name: 'ctaLink', title: 'Button Link', type: 'string' },
            { name: 'secondaryLabel', title: 'Secondary Link Label', type: 'string' },
            { name: 'secondaryLink', title: 'Secondary Link URL', type: 'string' },
          ],
          preview: {
            select: { title: 'headline' },
          },
        },
        {
          type: 'object',
          name: 'calloutBlock',
          title: 'Callout Block',
          fields: [
            { name: 'label', title: 'Label (e.g., "A PLATFORM BUILT BY THE PEOPLE")', type: 'string' },
            { name: 'body', title: 'Body Text', type: 'text', rows: 5 },
            { name: 'linkText', title: 'Link Text', type: 'string' },
            { name: 'linkUrl', title: 'Link URL', type: 'string' },
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
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

  preview: {
    select: {
      title: 'title',
      subtitle: 'heroHeadline',
      media: 'heroImage',
    },
  },
})
