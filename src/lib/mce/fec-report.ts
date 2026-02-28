// src/lib/mce/fec-report.ts
// Mesocratic Compliance Engine — FEC Report Generator
//
// Builds Schedule A (itemized contributions), Schedule B (itemized
// disbursements), and summary totals for FEC Form 3X filings.
//
// Aggregate YTD approach: query all succeeded donations from Jan 1 of
// the reporting year through the end of the period. Compute a running
// aggregate per donor chronologically. A donor is "itemized" if their
// aggregate exceeds $200 at any point; all current-period donations
// from itemized donors appear on Schedule A.
//
// TODO: Cross-period refund handling (refunds in a later period that
// reduce a prior period's aggregate below $200).

import { createClient } from '@supabase/supabase-js';
import { FEC_ITEMIZATION_THRESHOLD_CENTS } from '../fec-compliance';
import type {
  ReportingPeriod,
  ScheduleALine,
  ScheduleBLine,
  ReportSummary,
  ComplianceWarning,
  FecReport,
  GenerateReportRequest,
  PeriodType,
} from './types';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ── Helpers ──────────────────────────────────────────────────

export function centsToDollars(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// ── Reporting period ─────────────────────────────────────────

export function computeReportingPeriodDates(
  year: number,
  period: string,
  periodType: PeriodType = 'quarterly'
): ReportingPeriod {
  let startMonth: number;
  let endMonth: number;

  if (periodType === 'quarterly') {
    const quarter = period.toUpperCase();
    switch (quarter) {
      case 'Q1': startMonth = 1; endMonth = 3; break;
      case 'Q2': startMonth = 4; endMonth = 6; break;
      case 'Q3': startMonth = 7; endMonth = 9; break;
      case 'Q4': startMonth = 10; endMonth = 12; break;
      default: throw new Error(`Invalid quarter: ${period}`);
    }
  } else {
    const month = parseInt(period, 10);
    if (isNaN(month) || month < 1 || month > 12) {
      throw new Error(`Invalid month: ${period}`);
    }
    startMonth = month;
    endMonth = month;
  }

  const startDate = `${year}-${String(startMonth).padStart(2, '0')}-01`;
  const lastDay = new Date(year, endMonth, 0).getDate();
  const endDate = `${year}-${String(endMonth).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  return {
    type: periodType,
    year,
    period: periodType === 'quarterly' ? period.toUpperCase() : period,
    startDate,
    endDate,
  };
}

// ── Schedule A (Itemized Contributions) ──────────────────────

export async function buildScheduleA(
  reportingPeriod: ReportingPeriod
): Promise<{ lines: ScheduleALine[]; warnings: ComplianceWarning[] }> {
  const supabase = getSupabase();
  const { year, startDate, endDate } = reportingPeriod;
  const yearStart = `${year}-01-01`;

  // All succeeded donations from Jan 1 through end of reporting period,
  // joined with donor info, sorted chronologically for aggregate calc
  const { data: donations, error } = await supabase
    .from('donations')
    .select(`
      id,
      donor_id,
      amount_cents,
      created_at,
      donors (
        id,
        first_name,
        last_name,
        address_line1,
        city,
        state,
        zip_code,
        employer,
        occupation
      )
    `)
    .eq('status', 'succeeded')
    .gte('created_at', `${yearStart}T00:00:00Z`)
    .lte('created_at', `${endDate}T23:59:59.999Z`)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Schedule A query failed: ${error.message}`);
  if (!donations || donations.length === 0) {
    return { lines: [], warnings: [] };
  }

  // Compute running aggregate per donor chronologically
  const donorAggregates = new Map<string, number>();
  const donationAggregateAtTime = new Map<string, number>();
  const itemizedDonors = new Set<string>();

  for (const d of donations) {
    const prev = donorAggregates.get(d.donor_id) || 0;
    const newAggregate = prev + d.amount_cents;
    donorAggregates.set(d.donor_id, newAggregate);
    donationAggregateAtTime.set(d.id, newAggregate);

    if (newAggregate > FEC_ITEMIZATION_THRESHOLD_CENTS) {
      itemizedDonors.add(d.donor_id);
    }
  }

  // Filter to current-period donations from itemized donors
  const lines: ScheduleALine[] = [];
  const warnings: ComplianceWarning[] = [];
  const warnedDonors = new Set<string>();

  for (const d of donations) {
    const donationDate = d.created_at.split('T')[0];
    if (donationDate < startDate || donationDate > endDate) continue;
    if (!itemizedDonors.has(d.donor_id)) continue;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const donor = d.donors as any;
    if (!donor) continue;

    const contributorName = `${donor.last_name}, ${donor.first_name}`;

    lines.push({
      donorId: d.donor_id,
      donationId: d.id,
      contributorName,
      contributorAddress: donor.address_line1,
      contributorCity: donor.city,
      contributorState: donor.state,
      contributorZip: donor.zip_code,
      employer: donor.employer || '',
      occupation: donor.occupation || '',
      dateReceived: donationDate,
      amountCents: d.amount_cents,
      aggregateYtdCents: donationAggregateAtTime.get(d.id) || 0,
    });

    // Flag missing employer/occupation (once per donor)
    if (!warnedDonors.has(d.donor_id)) {
      const missingEmployer = !donor.employer?.trim();
      const missingOccupation = !donor.occupation?.trim();

      if (missingEmployer && missingOccupation) {
        warnings.push({
          type: 'missing_employer_occupation',
          donorId: d.donor_id,
          donorName: contributorName,
          donationId: d.id,
          message: `Itemized donor ${contributorName} is missing both employer and occupation`,
        });
        warnedDonors.add(d.donor_id);
      } else if (missingEmployer) {
        warnings.push({
          type: 'missing_employer',
          donorId: d.donor_id,
          donorName: contributorName,
          donationId: d.id,
          message: `Itemized donor ${contributorName} is missing employer`,
        });
        warnedDonors.add(d.donor_id);
      } else if (missingOccupation) {
        warnings.push({
          type: 'missing_occupation',
          donorId: d.donor_id,
          donorName: contributorName,
          donationId: d.id,
          message: `Itemized donor ${contributorName} is missing occupation`,
        });
        warnedDonors.add(d.donor_id);
      }
    }
  }

  return { lines, warnings };
}

// ── Schedule B (Itemized Disbursements) ──────────────────────

export async function buildScheduleB(
  reportingPeriod: ReportingPeriod
): Promise<ScheduleBLine[]> {
  const supabase = getSupabase();
  const { startDate, endDate } = reportingPeriod;

  const { data: disbursements, error } = await supabase
    .from('disbursements')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .gt('amount_cents', FEC_ITEMIZATION_THRESHOLD_CENTS)
    .order('date', { ascending: true });

  if (error) throw new Error(`Schedule B query failed: ${error.message}`);
  if (!disbursements || disbursements.length === 0) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return disbursements.map((d: any) => ({
    disbursementId: d.id,
    payeeName: d.payee_name,
    payeeAddress: d.payee_address_line1,
    payeeCity: d.payee_address_city,
    payeeState: d.payee_address_state,
    payeeZip: d.payee_address_zip,
    datePaid: d.date,
    amountCents: d.amount_cents,
    purpose: d.purpose,
    category: d.category,
  }));
}

// ── Summary ──────────────────────────────────────────────────

export async function buildSummary(
  scheduleA: ScheduleALine[],
  scheduleB: ScheduleBLine[],
  reportingPeriod: ReportingPeriod,
  cashOnHandStartCents?: number
): Promise<ReportSummary> {
  const supabase = getSupabase();
  const { startDate, endDate } = reportingPeriod;

  // Total of ALL succeeded donations in the period (itemized + unitemized)
  const { data: allDonations, error } = await supabase
    .from('donations')
    .select('amount_cents')
    .eq('status', 'succeeded')
    .gte('created_at', `${startDate}T00:00:00Z`)
    .lte('created_at', `${endDate}T23:59:59.999Z`);

  if (error) throw new Error(`Summary donations query failed: ${error.message}`);

  const totalReceiptsCents = (allDonations || []).reduce(
    (sum: number, d: { amount_cents: number }) => sum + d.amount_cents,
    0
  );

  const itemizedReceiptsCents = scheduleA.reduce(
    (sum, line) => sum + line.amountCents,
    0
  );

  const unitemizedReceiptsCents = totalReceiptsCents - itemizedReceiptsCents;

  // All disbursements in the period (not just itemized) for totals
  const { data: allDisbursements, error: disbError } = await supabase
    .from('disbursements')
    .select('amount_cents, category')
    .gte('date', startDate)
    .lte('date', endDate);

  if (disbError) throw new Error(`Summary disbursements query failed: ${disbError.message}`);

  const totalDisbursementsCents = (allDisbursements || []).reduce(
    (sum: number, d: { amount_cents: number }) => sum + d.amount_cents,
    0
  );

  const disbursementsByCategory: Record<string, number> = {};
  for (const d of allDisbursements || []) {
    disbursementsByCategory[d.category] =
      (disbursementsByCategory[d.category] || 0) + d.amount_cents;
  }

  const cashOnHandStart = cashOnHandStartCents ?? null;
  const cashOnHandEnd =
    cashOnHandStart !== null
      ? cashOnHandStart + totalReceiptsCents - totalDisbursementsCents
      : null;

  return {
    totalReceiptsCents,
    itemizedReceiptsCents,
    unitemizedReceiptsCents,
    totalDisbursementsCents,
    disbursementsByCategory,
    cashOnHandStartCents: cashOnHandStart,
    cashOnHandEndCents: cashOnHandEnd,
  };
}

// ── Report orchestrator ──────────────────────────────────────

export async function generateReport(
  request: GenerateReportRequest
): Promise<FecReport> {
  const period = computeReportingPeriodDates(
    request.year,
    request.period,
    request.periodType
  );

  const { lines: scheduleA, warnings } = await buildScheduleA(period);
  const scheduleB = await buildScheduleB(period);
  const summary = await buildSummary(
    scheduleA,
    scheduleB,
    period,
    request.cashOnHandStartCents
  );

  return {
    period,
    scheduleA,
    scheduleB,
    summary,
    warnings,
    generatedAt: new Date().toISOString(),
  };
}

// ── CSV Formatters ───────────────────────────────────────────

export function formatScheduleACsv(lines: ScheduleALine[]): string {
  const headers = [
    'Contributor Name',
    'Address',
    'City',
    'State',
    'ZIP',
    'Employer',
    'Occupation',
    'Date Received',
    'Amount',
    'Aggregate YTD',
    'Donor ID',
    'Donation ID',
  ];

  const rows = lines.map((l) =>
    [
      csvEscape(l.contributorName),
      csvEscape(l.contributorAddress),
      csvEscape(l.contributorCity),
      csvEscape(l.contributorState),
      csvEscape(l.contributorZip),
      csvEscape(l.employer),
      csvEscape(l.occupation),
      l.dateReceived,
      centsToDollars(l.amountCents),
      centsToDollars(l.aggregateYtdCents),
      l.donorId,
      l.donationId,
    ].join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export function formatScheduleBCsv(lines: ScheduleBLine[]): string {
  const headers = [
    'Payee Name',
    'Address',
    'City',
    'State',
    'ZIP',
    'Date Paid',
    'Amount',
    'Purpose',
    'Category',
    'Disbursement ID',
  ];

  const rows = lines.map((l) =>
    [
      csvEscape(l.payeeName),
      csvEscape(l.payeeAddress),
      csvEscape(l.payeeCity),
      csvEscape(l.payeeState),
      csvEscape(l.payeeZip),
      l.datePaid,
      centsToDollars(l.amountCents),
      csvEscape(l.purpose),
      csvEscape(l.category),
      l.disbursementId,
    ].join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export function formatSummaryCsv(summary: ReportSummary): string {
  const rows: [string, string][] = [
    ['Total Receipts', centsToDollars(summary.totalReceiptsCents)],
    ['Itemized Receipts', centsToDollars(summary.itemizedReceiptsCents)],
    ['Unitemized Receipts', centsToDollars(summary.unitemizedReceiptsCents)],
    ['Total Disbursements', centsToDollars(summary.totalDisbursementsCents)],
  ];

  for (const [category, amount] of Object.entries(summary.disbursementsByCategory)) {
    rows.push([`Disbursements - ${category}`, centsToDollars(amount)]);
  }

  if (summary.cashOnHandStartCents !== null) {
    rows.push(['Cash on Hand (Start)', centsToDollars(summary.cashOnHandStartCents)]);
  }
  if (summary.cashOnHandEndCents !== null) {
    rows.push(['Cash on Hand (End)', centsToDollars(summary.cashOnHandEndCents)]);
  }

  return ['Field,Value', ...rows.map(([k, v]) => `${csvEscape(k)},${v}`)].join('\n');
}
