// src/lib/mce/types.ts
// Mesocratic Compliance Engine — FEC Report Types

export type PeriodType = 'quarterly' | 'monthly';

export interface ReportingPeriod {
  type: PeriodType;
  year: number;
  period: string; // Q1-Q4 or 1-12
  startDate: string; // ISO date YYYY-MM-DD
  endDate: string; // ISO date YYYY-MM-DD
}

export interface ScheduleALine {
  donorId: string;
  donationId: string;
  contributorName: string; // "Last, First"
  contributorAddress: string;
  contributorCity: string;
  contributorState: string;
  contributorZip: string;
  employer: string;
  occupation: string;
  dateReceived: string; // ISO date YYYY-MM-DD
  amountCents: number;
  aggregateYtdCents: number;
}

export interface ScheduleBLine {
  disbursementId: string;
  payeeName: string;
  payeeAddress: string;
  payeeCity: string;
  payeeState: string;
  payeeZip: string;
  datePaid: string; // ISO date YYYY-MM-DD
  amountCents: number;
  purpose: string;
  category: string;
}

export interface ReportSummary {
  totalReceiptsCents: number;
  itemizedReceiptsCents: number;
  unitemizedReceiptsCents: number;
  totalDisbursementsCents: number;
  disbursementsByCategory: Record<string, number>;
  cashOnHandStartCents: number | null;
  cashOnHandEndCents: number | null;
}

export interface ComplianceWarning {
  type: 'missing_employer' | 'missing_occupation' | 'missing_employer_occupation';
  donorId: string;
  donorName: string;
  donationId: string;
  message: string;
}

export interface FecReport {
  period: ReportingPeriod;
  scheduleA: ScheduleALine[];
  scheduleB: ScheduleBLine[];
  summary: ReportSummary;
  warnings: ComplianceWarning[];
  generatedAt: string; // ISO timestamp
}

export interface GenerateReportRequest {
  year: number;
  period: string;
  periodType?: PeriodType;
  cashOnHandStartCents?: number;
}

export interface GenerateReportResponse {
  report: FecReport;
  csv: {
    scheduleA: string;
    scheduleB: string;
    summary: string;
  };
  fec: string;
}
