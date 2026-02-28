// src/lib/mce/fec-formatter.ts
// Mesocratic Compliance Engine — FEC Electronic Filing Format Generator
//
// Generates pipe-delimited .fec files compatible with the FEC's
// electronic filing system (format version 8.4).
//
// Format rules:
//   - Fields separated by pipe character (|)
//   - Dates formatted as MMDDYYYY
//   - Amounts formatted as decimal (e.g. 1500.00)
//   - Transaction IDs: "SA-" or "SB-" + first 8 chars of UUID

import { centsToDollars } from './fec-report';
import type { FecReport, ScheduleALine, ScheduleBLine } from './types';

const DELIMITER = '|';

function fecDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${month}${day}${year}`;
}

function transactionId(prefix: string, uuid: string): string {
  return `${prefix}${uuid.replace(/-/g, '').substring(0, 8).toUpperCase()}`;
}

export function generateFECHeader(): string {
  return [
    'HDR',
    'FEC',
    '8.4',
    'Mesocratic Compliance Engine',
    '1.0',
  ].join(DELIMITER);
}

export function generateF3XLine(report: FecReport): string {
  const fields = [
    'F3XN',                                                       // Form type
    'C00000000',                                                  // Committee FEC ID (placeholder)
    'Mesocratic National Committee',                               // Committee name
    '',                                                           // Change of address
    fecDate(report.period.startDate),                              // Coverage from
    fecDate(report.period.endDate),                                // Coverage through
    '',                                                           // Qualified committee
    '',                                                           // Treasurer last name
    '',                                                           // Treasurer first name
    '',                                                           // Treasurer middle name
    '',                                                           // Treasurer prefix
    '',                                                           // Treasurer suffix
    fecDate(report.generatedAt.split('T')[0]),                     // Date signed
    centsToDollars(report.summary.totalReceiptsCents),              // Total contributions
    centsToDollars(report.summary.itemizedReceiptsCents),           // Itemized
    centsToDollars(report.summary.unitemizedReceiptsCents),         // Unitemized
    centsToDollars(report.summary.totalDisbursementsCents),         // Total disbursements
    report.summary.cashOnHandStartCents !== null
      ? centsToDollars(report.summary.cashOnHandStartCents) : '',  // Cash on hand start
    report.summary.cashOnHandEndCents !== null
      ? centsToDollars(report.summary.cashOnHandEndCents) : '',    // Cash on hand end
  ];

  return fields.join(DELIMITER);
}

export function generateScheduleALines(lines: ScheduleALine[]): string[] {
  return lines.map((line) => {
    const nameParts = line.contributorName.split(', ');
    const fields = [
      'SA11AI',                                  // Form type (individual contributions)
      'C00000000',                               // Filer FEC ID
      transactionId('SA-', line.donationId),     // Transaction ID
      '',                                        // Back reference tran ID
      '',                                        // Back reference sched name
      'IND',                                     // Entity type (individual)
      nameParts[0] || '',                        // Last name
      nameParts[1] || '',                        // First name
      '',                                        // Middle name
      '',                                        // Prefix
      '',                                        // Suffix
      line.contributorAddress,                   // Street 1
      '',                                        // Street 2
      line.contributorCity,                      // City
      line.contributorState,                     // State
      line.contributorZip,                       // ZIP
      '',                                        // Election code
      '',                                        // Election description
      fecDate(line.dateReceived),                // Contribution date
      centsToDollars(line.amountCents),           // Contribution amount
      centsToDollars(line.aggregateYtdCents),     // Aggregate YTD
      line.employer,                             // Contributor employer
      line.occupation,                           // Contributor occupation
      '',                                        // Memo code
      '',                                        // Memo text
    ];
    return fields.join(DELIMITER);
  });
}

export function generateScheduleBLines(lines: ScheduleBLine[]): string[] {
  return lines.map((line) => {
    const fields = [
      'SB21B',                                   // Form type (operating expenditures)
      'C00000000',                               // Filer FEC ID
      transactionId('SB-', line.disbursementId), // Transaction ID
      '',                                        // Back reference tran ID
      '',                                        // Back reference sched name
      'ORG',                                     // Entity type
      line.payeeName,                            // Payee organization name
      '',                                        // Last name
      '',                                        // First name
      '',                                        // Middle name
      '',                                        // Prefix
      '',                                        // Suffix
      line.payeeAddress,                         // Street 1
      '',                                        // Street 2
      line.payeeCity,                            // City
      line.payeeState,                           // State
      line.payeeZip,                             // ZIP
      '',                                        // Election code
      '',                                        // Election description
      fecDate(line.datePaid),                    // Expenditure date
      centsToDollars(line.amountCents),           // Expenditure amount
      '',                                        // Semi-annual bundled refund
      line.purpose,                              // Purpose of disbursement
      line.category,                             // Category code
      '',                                        // Memo code
      '',                                        // Memo text
    ];
    return fields.join(DELIMITER);
  });
}

export function generateFECFile(report: FecReport): string {
  const lines: string[] = [
    generateFECHeader(),
    generateF3XLine(report),
    ...generateScheduleALines(report.scheduleA),
    ...generateScheduleBLines(report.scheduleB),
  ];
  return lines.join('\n');
}
