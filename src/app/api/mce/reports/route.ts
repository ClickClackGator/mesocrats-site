// src/app/api/mce/reports/route.ts
// Mesocratic Compliance Engine — FEC Report API
//
// GET /api/mce/reports?year=2026&period=Q1&format=json
//
// Secured with MCE_REPORT_API_KEY env var (Bearer token or x-api-key header).
// Returns FEC Form 3X data as JSON (with embedded CSV + .fec), downloadable
// CSV, .fec electronic filing format, or IRS Form 8872 XML.

import { NextRequest, NextResponse } from 'next/server';
import {
  generateReport,
  formatScheduleACsv,
  formatScheduleBCsv,
  formatSummaryCsv,
} from '@/lib/mce/fec-report';
import { generateFECFile } from '@/lib/mce/fec-formatter';
import { generate8872XML } from '@/lib/mce/form8872';
import { writeAuditLog } from '@/lib/mce/audit';
import type { PeriodType } from '@/lib/mce/types';
import type { Form8872FilingType, Form8872ReportType } from '@/lib/mce/form8872';

function mapPeriodTo8872ReportType(
  period: string,
  periodType: PeriodType
): Form8872ReportType {
  if (periodType === 'monthly') return 'MonthlyReport';
  switch (period.toUpperCase()) {
    case 'Q1': return 'FirstQuarterlyReport';
    case 'Q2': return 'SecondQuarterlyReport';
    case 'Q3': return 'ThirdQuarterlyReport';
    case 'Q4': return 'YearEndReport';
    default: return 'FirstQuarterlyReport';
  }
}

function isAuthorized(request: NextRequest): boolean {
  const apiKey = process.env.MCE_REPORT_API_KEY;
  if (!apiKey) return false;

  const bearerToken = request.headers
    .get('authorization')
    ?.replace('Bearer ', '');
  const headerKey = request.headers.get('x-api-key');

  return bearerToken === apiKey || headerKey === apiKey;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const period = searchParams.get('period');
  const periodType = (searchParams.get('periodType') || 'quarterly') as PeriodType;
  const format = searchParams.get('format') || 'json';
  const schedule = searchParams.get('schedule');
  const cashOnHandStart = searchParams.get('cashOnHandStart');

  if (!year || !period) {
    return NextResponse.json(
      { error: 'Missing required parameters: year, period' },
      { status: 400 }
    );
  }

  const yearNum = parseInt(year, 10);
  if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2100) {
    return NextResponse.json({ error: 'Invalid year' }, { status: 400 });
  }

  try {
    const report = await generateReport({
      year: yearNum,
      period,
      periodType,
      cashOnHandStartCents: cashOnHandStart
        ? parseInt(cashOnHandStart, 10)
        : undefined,
    });

    // Write audit log entry (fire-and-forget)
    writeAuditLog(
      'fec_reports',
      `${year}_${period}`,
      'create',
      null,
      {
        year: yearNum,
        period,
        periodType,
        format,
        scheduleACount: report.scheduleA.length,
        scheduleBCount: report.scheduleB.length,
        warningCount: report.warnings.length,
      },
      request.headers.get('x-forwarded-for') || null
    );

    // FEC electronic filing format
    if (format === 'fec') {
      const fecContent = generateFECFile(report);
      const filename = `mnc_${period.toLowerCase()}_${year}.fec`;
      return new Response(fecContent, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // IRS Form 8872 XML
    if (format === '8872xml') {
      const filingType = (searchParams.get('filingType') || 'InitalReport') as Form8872FilingType;
      const reportType = mapPeriodTo8872ReportType(period, periodType);
      const xmlContent = generate8872XML(report, {
        filingType,
        reportType,
        custodianName: searchParams.get('custodianName') || undefined,
        contactPerson: searchParams.get('contactPerson') || undefined,
        email: searchParams.get('email') || undefined,
      });
      const filename = `form8872_mnc_${period.toLowerCase()}_${year}.xml`;
      return new Response(xmlContent, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // CSV download
    if (format === 'csv') {
      let csvContent: string;
      let filename: string;

      switch (schedule) {
        case 'a':
          csvContent = formatScheduleACsv(report.scheduleA);
          filename = `schedule_a_${year}_${period}.csv`;
          break;
        case 'b':
          csvContent = formatScheduleBCsv(report.scheduleB);
          filename = `schedule_b_${year}_${period}.csv`;
          break;
        case 'summary':
          csvContent = formatSummaryCsv(report.summary);
          filename = `summary_${year}_${period}.csv`;
          break;
        default:
          return NextResponse.json(
            { error: 'For CSV format, schedule parameter is required: a, b, or summary' },
            { status: 400 }
          );
      }

      return new Response(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // JSON (default) — full report + CSV strings + .fec content
    const response = {
      report,
      csv: {
        scheduleA: formatScheduleACsv(report.scheduleA),
        scheduleB: formatScheduleBCsv(report.scheduleB),
        summary: formatSummaryCsv(report.summary),
      },
      fec: generateFECFile(report),
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error('[MCE Reports] Error generating report:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
