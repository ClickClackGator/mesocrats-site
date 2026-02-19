// src/sanity/structure.ts
//
// Custom Studio sidebar structure.
// Organizes documents into logical groups so you can find content fast.

import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Mesocratic Party CMS')
    .items([
      // ── Site Settings (singleton) ─────────────────
      S.listItem()
        .title('⚙️ Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // ── Pages ─────────────────────────────────────
      S.listItem()
        .title('📄 Pages')
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      // ── Platform (Policy Pages) ───────────────────
      S.listItem()
        .title('📋 Platform (Policy Pages)')
        .child(
          S.documentTypeList('policyPage')
            .title('Policy Pages')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ── News ──────────────────────────────────────
      S.listItem()
        .title('📰 News & Blog')
        .child(
          S.documentTypeList('newsPost')
            .title('News Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      // ── FAQ ───────────────────────────────────────
      S.listItem()
        .title('❓ FAQ Entries')
        .child(
          S.documentTypeList('faqEntry')
            .title('FAQ Entries')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ── Team ──────────────────────────────────────
      S.listItem()
        .title('👥 Team & Leadership')
        .child(
          S.documentTypeList('teamMember')
            .title('Team Members')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // ── Form Page Content ─────────────────────────
      S.listItem()
        .title('📝 Form Page Content')
        .child(
          S.documentTypeList('formPageContent')
            .title('Form Pages')
        ),
    ])
