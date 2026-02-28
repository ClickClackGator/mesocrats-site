// src/lib/mce/contributor-matching.ts
// Mesocratic Compliance Engine — Fuzzy Contributor Matching
//
// Identifies donors who may have contributed under slightly different
// names or Stripe accounts. Groups by normalized(last_name) +
// normalized(first_name) + zip_code. Does NOT auto-merge — flags
// duplicates and combines aggregates for reporting purposes only.

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export interface DuplicateGroup {
  canonicalDonorId: string;
  duplicateDonorIds: string[];
  mergedName: string;
  mergedZip: string;
}

/**
 * Normalize a string for matching: lowercase, trim, collapse whitespace.
 */
export function normalizeString(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Find potential duplicate donors by matching on normalized
 * last_name + first_name + zip_code.
 *
 * Returns groups where 2+ donors share the same key.
 * The canonical donor is the earliest-created record.
 */
export async function findDuplicateDonors(): Promise<DuplicateGroup[]> {
  const supabase = getSupabase();

  const { data: donors, error } = await supabase
    .from('donors')
    .select('id, first_name, last_name, zip_code, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[MCE Matching] Query failed:', error.message);
    return [];
  }
  if (!donors || donors.length === 0) return [];

  // Group by normalized key
  const groups = new Map<string, typeof donors>();

  for (const donor of donors) {
    const key = [
      normalizeString(donor.last_name),
      normalizeString(donor.first_name),
      normalizeString(donor.zip_code),
    ].join('|');

    const group = groups.get(key);
    if (group) {
      group.push(donor);
    } else {
      groups.set(key, [donor]);
    }
  }

  // Return only groups with 2+ members
  const duplicates: DuplicateGroup[] = [];

  for (const members of Array.from(groups.values())) {
    if (members.length < 2) continue;

    const canonical = members[0]; // earliest created
    duplicates.push({
      canonicalDonorId: canonical.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      duplicateDonorIds: members.slice(1).map((d: any) => d.id),
      mergedName: `${canonical.last_name}, ${canonical.first_name}`,
      mergedZip: canonical.zip_code,
    });
  }

  return duplicates;
}

/**
 * Get combined aggregate YTD for a donor and any matched duplicates.
 * Queries donations for the donor + duplicate donors with matching
 * normalized name and zip code.
 */
export async function getAggregateWithMatching(
  donorId: string,
  year: number,
  endDate: string
): Promise<number> {
  const supabase = getSupabase();

  // Get the donor's identity for matching
  const { data: donor, error: donorError } = await supabase
    .from('donors')
    .select('first_name, last_name, zip_code')
    .eq('id', donorId)
    .single();

  if (donorError || !donor) {
    console.error('[MCE Matching] Donor lookup failed:', donorError?.message);
    return 0;
  }

  // Find all donors with matching normalized name + zip
  const { data: allDonors, error: matchError } = await supabase
    .from('donors')
    .select('id')
    .eq('zip_code', donor.zip_code);

  if (matchError || !allDonors) {
    console.error('[MCE Matching] Match query failed:', matchError?.message);
    return 0;
  }

  // Filter to those with matching normalized name
  const normalizedLast = normalizeString(donor.last_name);
  const normalizedFirst = normalizeString(donor.first_name);

  // We need to check names in application code since Supabase
  // doesn't support case-insensitive trimmed comparison natively
  const matchingIds: string[] = [];
  for (const d of allDonors) {
    // Re-fetch name for each candidate (we only have id from the zip query)
    matchingIds.push(d.id);
  }

  // More efficient: query donors by zip, then filter by normalized name
  const { data: candidates, error: candError } = await supabase
    .from('donors')
    .select('id, first_name, last_name')
    .eq('zip_code', donor.zip_code);

  if (candError || !candidates) {
    console.error('[MCE Matching] Candidate query failed:', candError?.message);
    return 0;
  }

  const donorIds = candidates
    .filter(
      (c) =>
        normalizeString(c.last_name) === normalizedLast &&
        normalizeString(c.first_name) === normalizedFirst
    )
    .map((c) => c.id);

  if (donorIds.length === 0) return 0;

  // Sum succeeded donations for all matching donors in the year
  const yearStart = `${year}-01-01`;

  const { data: donations, error: donationError } = await supabase
    .from('donations')
    .select('amount_cents')
    .in('donor_id', donorIds)
    .eq('status', 'succeeded')
    .gte('created_at', `${yearStart}T00:00:00Z`)
    .lte('created_at', `${endDate}T23:59:59.999Z`);

  if (donationError) {
    console.error('[MCE Matching] Donation query failed:', donationError.message);
    return 0;
  }

  return (donations || []).reduce(
    (sum: number, d: { amount_cents: number }) => sum + d.amount_cents,
    0
  );
}
