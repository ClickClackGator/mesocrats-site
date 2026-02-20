const CATEGORY_LABELS: Record<string, string> = {
  'party-news': 'Party News',
  'policy': 'Policy',
  'ccx-updates': 'CCX Updates',
  'candidates': 'Candidates',
  'opinion': 'Opinion',
  'state-updates': 'State Updates',
}

export function categoryLabel(slug: string | undefined | null): string {
  if (!slug) return 'News'
  return CATEGORY_LABELS[slug] || slug
}

export function formatNewsDate(isoDate: string | undefined | null): string {
  if (!isoDate) return 'Coming Soon'
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
