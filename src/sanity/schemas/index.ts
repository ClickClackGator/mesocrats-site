// src/sanity/schemas/index.ts

import policyPage from './policyPage'
import page from './page'
import faqEntry from './faqEntry'
import newsPost from './newsPost'
import siteSettings from './siteSettings'
import teamMember from './teamMember'
import formPageContent from './formPageContent'

export const schemaTypes = [
  // Content types
  policyPage,
  page,
  newsPost,
  faqEntry,

  // People
  teamMember,

  // Settings & config
  siteSettings,
  formPageContent,
]
