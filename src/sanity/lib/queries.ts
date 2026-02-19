// src/sanity/lib/queries.ts
//
// All GROQ queries for fetching content from Sanity.
// Centralized here so they're easy to find and maintain.

// ============================================================
// SITE SETTINGS (singleton)
// ============================================================

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    missionStatement,
    missionStatementShort,
    primaryTagline,
    secondaryTaglines,
    fecDisclaimer,
    footerContent,
    "heroImage": heroImage.asset->url,
  }
`

// ============================================================
// HOMEPAGE
// ============================================================

export const homepageQuery = `
  *[_type == "page" && slug.current == "home"][0] {
    title,
    heroHeadline,
    heroSubheadline,
    heroCta1Label,
    heroCta1Link,
    heroCta2Label,
    heroCta2Link,
    "heroImage": heroImage.asset->url,
    missionBarText,
    sections[] {
      _type,
      _key,
      headline,
      subheadline,
      body,
      cards[] {
        icon,
        headline,
        body,
        linkText,
        linkUrl,
      },
      ctaLabel,
      ctaLink,
    }
  }
`

// ============================================================
// POLICY PAGES
// ============================================================

// Get all policy pages (for the Platform Overview grid)
export const allPolicyPagesQuery = `
  *[_type == "policyPage"] | order(order asc) {
    _id,
    title,
    slug,
    headline,
    tagline,
    icon,
    category,
    order,
    summaryDescription,
  }
`

// Get a single policy page by slug
export const policyPageBySlugQuery = `
  *[_type == "policyPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    headline,
    tagline,
    icon,
    category,
    "heroImage": heroImage.asset->url,
    realitySection,
    othersSaySection,
    whereWeStandSection,
    whatItMeansSection,
    livingPlatformCallout,
  }
`

// ============================================================
// GENERIC PAGES (Mission, Story, Convention X, etc.)
// ============================================================

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroHeadline,
    heroSubheadline,
    heroEyebrow,
    "heroImage": heroImage.asset->url,
    content,
    sections[] {
      _type,
      _key,
      headline,
      subheadline,
      body,
      cards[] {
        icon,
        headline,
        body,
        linkText,
        linkUrl,
      },
      ctaLabel,
      ctaLink,
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage,
    },
  }
`

// ============================================================
// FAQ
// ============================================================

export const allFaqEntriesQuery = `
  *[_type == "faqEntry"] | order(order asc) {
    _id,
    question,
    answer,
    order,
    category,
  }
`

// ============================================================
// NEWS / BLOG
// ============================================================

// Latest N posts (for homepage, sidebar, etc.)
export const latestNewsQuery = `
  *[_type == "newsPost" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    "author": author->{ name, title, "image": image.asset->url },
    "coverImage": coverImage.asset->url,
  }
`

// Single news post by slug
export const newsPostBySlugQuery = `
  *[_type == "newsPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    category,
    "author": author->{ name, title, bio, "image": image.asset->url },
    "coverImage": coverImage.asset->url,
    seo {
      metaTitle,
      metaDescription,
      ogImage,
    },
  }
`

// All news posts (for the news landing page)
export const allNewsPostsQuery = `
  *[_type == "newsPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    "author": author->{ name, title, "image": image.asset->url },
    "coverImage": coverImage.asset->url,
  }
`

// ============================================================
// TEAM / LEADERSHIP
// ============================================================

export const allTeamMembersQuery = `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    title,
    bio,
    "image": image.asset->url,
    order,
  }
`

// ============================================================
// FORM PAGE CONTENT
// ============================================================

export const formPageContentQuery = `
  *[_type == "formPageContent" && formType == $formType][0] {
    _id,
    formType,
    heroHeadline,
    heroSubheadline,
    bodyContent,
    cards[] {
      icon,
      headline,
      body,
    },
    ctaLabel,
    legalText,
    confirmationHeadline,
    confirmationBody,
  }
`
