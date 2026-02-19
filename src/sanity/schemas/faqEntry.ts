// src/sanity/schemas/faqEntry.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqEntry',
  title: 'FAQ Entry',
  type: 'document',
  icon: () => '❓',

  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [
        {
          type: 'block',
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
                  { name: 'href', type: 'string', title: 'URL' },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Membership', value: 'membership' },
          { title: 'Convention X', value: 'ccx' },
          { title: 'Platform', value: 'platform' },
          { title: 'Donations', value: 'donations' },
          { title: 'Candidates', value: 'candidates' },
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
