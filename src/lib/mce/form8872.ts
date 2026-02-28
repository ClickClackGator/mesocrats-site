// src/lib/mce/form8872.ts
// Mesocratic Compliance Engine — IRS Form 8872 XML Generator
//
// Generates XML files conforming to IRS 8872Schema.xsd (version 2.3)
// for Political Organization Report of Contributions and Expenditures.
//
// Key differences from FEC Form 3X:
//   - XML format (not pipe-delimited or CSV)
//   - Expenditure itemization threshold is $500 (not $200)
//   - Contribution threshold remains $200 aggregate YTD
//   - "InitalReport" is the IRS's actual spelling (not "Initial")

import { centsToDollars } from './fec-report';
import { MNC_COMMITTEE } from './committee-config';
import type { USAddress } from './committee-config';
import type { FecReport, ScheduleALine, ScheduleBLine } from './types';

// ── Types ────────────────────────────────────────────────────

// IRS schema has a typo: "InitalReport" not "InitialReport"
export type Form8872FilingType =
  | 'InitalReport'
  | 'AmendedReport'
  | 'FinalReport'
  | 'ChangeOfAddress';

export type Form8872ReportType =
  | 'FirstQuarterlyReport'
  | 'SecondQuarterlyReport'
  | 'ThirdQuarterlyReport'
  | 'YearEndReport'
  | 'MidYearReport'
  | 'MonthlyReport';

export interface Form8872Options {
  filingType: Form8872FilingType;
  reportType: Form8872ReportType;
  custodianName?: string;
  contactPerson?: string;
  email?: string;
}

const IRS_8872_EXPENDITURE_THRESHOLD_CENTS = 500_00; // $500

// ── XML Helpers ──────────────────────────────────────────────

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function xmlEl(tag: string, value: string, maxLen?: number): string {
  const truncated = maxLen ? value.slice(0, maxLen) : value;
  return `<${tag}>${xmlEscape(truncated)}</${tag}>`;
}

function xmlAddress(tag: string, addr: USAddress, indent: string): string {
  const lines = [
    `${indent}<${tag}>`,
    `${indent}  ${xmlEl('AddressLine1', addr.addressLine1)}`,
  ];
  if (addr.addressLine2) {
    lines.push(`${indent}  ${xmlEl('AddressLine2', addr.addressLine2)}`);
  }
  lines.push(
    `${indent}  ${xmlEl('City', addr.city)}`,
    `${indent}  ${xmlEl('State', addr.state)}`,
    `${indent}  ${xmlEl('ZipCode', addr.zipCode)}`,
    `${indent}</${tag}>`
  );
  return lines.join('\n');
}

function xmlFilingType(filingType: Form8872FilingType): string {
  const lines = [
    '  <FilingType>',
    `    <${filingType}>1</${filingType}>`,
    '  </FilingType>',
  ];
  return lines.join('\n');
}

// ── Schedule A XML (Contributions ≥ $200 aggregate) ─────────

function xmlScheduleAEntry(line: ScheduleALine, indent: string): string {
  const addr: USAddress = {
    addressLine1: line.contributorAddress,
    city: line.contributorCity,
    state: line.contributorState,
    zipCode: line.contributorZip,
  };

  const lines = [
    `${indent}<ScheduleA>`,
    `${indent}  ${xmlEl('ContributorName', line.contributorName, 50)}`,
    xmlAddress('ContributorAddress', addr, `${indent}  `),
    `${indent}  ${xmlEl('ContributorEmployer', line.employer, 70)}`,
    `${indent}  ${xmlEl('ContributorOccupation', line.occupation, 70)}`,
    `${indent}  ${xmlEl('ContributionDate', line.dateReceived)}`,
    `${indent}  ${xmlEl('ContributionAmount', centsToDollars(line.amountCents))}`,
    `${indent}  ${xmlEl('AggregateContributionsYTD', centsToDollars(line.aggregateYtdCents))}`,
    `${indent}</ScheduleA>`,
  ];
  return lines.join('\n');
}

// ── Schedule B XML (Expenditures ≥ $500) ─────────────────────

function xmlScheduleBEntry(line: ScheduleBLine, indent: string): string {
  const addr: USAddress = {
    addressLine1: line.payeeAddress,
    city: line.payeeCity,
    state: line.payeeState,
    zipCode: line.payeeZip,
  };

  const lines = [
    `${indent}<ScheduleB>`,
    `${indent}  ${xmlEl('RecipientName', line.payeeName, 50)}`,
    xmlAddress('RecipientAddress', addr, `${indent}  `),
    `${indent}  ${xmlEl('RecipientEmployer', '', 70)}`,
    `${indent}  ${xmlEl('RecipientOccupation', '', 70)}`,
    `${indent}  ${xmlEl('ExpenditureDate', line.datePaid)}`,
    `${indent}  ${xmlEl('ExpenditureAmount', centsToDollars(line.amountCents))}`,
    `${indent}  ${xmlEl('ExpenditurePurpose', line.purpose, 512)}`,
    `${indent}</ScheduleB>`,
  ];
  return lines.join('\n');
}

// ── Main Generator ───────────────────────────────────────────

export function generate8872XML(
  report: FecReport,
  options: Form8872Options
): string {
  const committee = MNC_COMMITTEE;
  const custodian = options.custodianName || committee.custodianName;
  const contact = options.contactPerson || committee.contactPerson;
  const email = options.email || committee.email;

  // Schedule A: reuse FEC Schedule A (already filtered to ≥ $200 aggregate)
  const scheduleALines = report.scheduleA;

  // Schedule B: filter to ≥ $500 (IRS 8872 threshold, not FEC's $200)
  const scheduleBLines = report.scheduleB.filter(
    (line) => line.amountCents >= IRS_8872_EXPENDITURE_THRESHOLD_CENTS
  );

  const totalContributions = scheduleALines.reduce(
    (sum, l) => sum + l.amountCents, 0
  );
  const totalExpenditures = scheduleBLines.reduce(
    (sum, l) => sum + l.amountCents, 0
  );

  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<FORM8872 xmlns="http://forms.irs.gov/pofd/schema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://forms.irs.gov/pofd/schema/8872Schema.xsd">',
    `  ${xmlEl('OrganizationName', committee.name, 70)}`,
    xmlAddress('MailingAddress', committee.mailingAddress, '  '),
    xmlFilingType(options.filingType),
    `  ${xmlEl('DateEstablished', committee.dateEstablished)}`,
  ];

  if (email) {
    parts.push(`  ${xmlEl('eMail', email, 150)}`);
  }

  parts.push(
    `  ${xmlEl('CustodianName', custodian, 50)}`,
    xmlAddress('CustodianAddress', committee.mailingAddress, '  '),
    `  ${xmlEl('ContactPerson', contact, 50)}`,
    xmlAddress('ContactAddress', committee.mailingAddress, '  '),
    xmlAddress('BusinessAddress', committee.mailingAddress, '  '),
    `  ${xmlEl('PeriodBeginDate', report.period.startDate)}`,
    `  ${xmlEl('PeriodEndDate', report.period.endDate)}`,
    `  <ReportType>`,
    `    <${options.reportType}>1</${options.reportType}>`,
    `  </ReportType>`,
    `  ${xmlEl('ReportedContributions', centsToDollars(totalContributions))}`,
    `  ${xmlEl('ReportedExpenditures', centsToDollars(totalExpenditures))}`,
  );

  for (const line of scheduleALines) {
    parts.push(xmlScheduleAEntry(line, '  '));
  }

  for (const line of scheduleBLines) {
    parts.push(xmlScheduleBEntry(line, '  '));
  }

  parts.push('</FORM8872>');

  return parts.join('\n');
}

// ── Validator ────────────────────────────────────────────────

function extractElements(xml: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g');
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(xml)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

function extractElement(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? match[1] : null;
}

function checkRequired(
  xml: string,
  tag: string,
  errors: string[]
): string | null {
  const value = extractElement(xml, tag);
  if (value === null || value.trim() === '') {
    errors.push(`Missing required element: ${tag}`);
  }
  return value;
}

function checkMaxLength(
  value: string | null,
  tag: string,
  maxLen: number,
  errors: string[]
): void {
  if (value && value.length > maxLen) {
    errors.push(`${tag} exceeds max length of ${maxLen} (got ${value.length})`);
  }
}

function checkDateFormat(
  value: string | null,
  tag: string,
  errors: string[]
): void {
  if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    errors.push(`${tag} must be YYYY-MM-DD format (got "${value}")`);
  }
  if (value && value.length !== 10) {
    errors.push(`${tag} must be exactly 10 characters (got ${value.length})`);
  }
}

function checkAmountFormat(
  value: string | null,
  tag: string,
  errors: string[]
): void {
  if (value && !/^\d+\.\d{2}$/.test(value)) {
    errors.push(`${tag} must be decimal dollar format like "50.00" (got "${value}")`);
  }
}

export function validate8872XML(xml: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check root element
  if (!xml.includes('<FORM8872')) {
    errors.push('Missing root element FORM8872');
    return { valid: false, errors };
  }

  // Required top-level elements
  const orgName = checkRequired(xml, 'OrganizationName', errors);
  checkMaxLength(orgName, 'OrganizationName', 70, errors);

  checkRequired(xml, 'MailingAddress', errors);

  if (!xml.includes('<FilingType>')) {
    errors.push('Missing required element: FilingType');
  }

  const dateEstablished = checkRequired(xml, 'DateEstablished', errors);
  checkDateFormat(dateEstablished, 'DateEstablished', errors);

  const custodianName = checkRequired(xml, 'CustodianName', errors);
  checkMaxLength(custodianName, 'CustodianName', 50, errors);

  checkRequired(xml, 'CustodianAddress', errors);

  const contactPerson = checkRequired(xml, 'ContactPerson', errors);
  checkMaxLength(contactPerson, 'ContactPerson', 50, errors);

  checkRequired(xml, 'ContactAddress', errors);
  checkRequired(xml, 'BusinessAddress', errors);

  const periodBegin = checkRequired(xml, 'PeriodBeginDate', errors);
  checkDateFormat(periodBegin, 'PeriodBeginDate', errors);

  const periodEnd = checkRequired(xml, 'PeriodEndDate', errors);
  checkDateFormat(periodEnd, 'PeriodEndDate', errors);

  if (!xml.includes('<ReportType>')) {
    errors.push('Missing required element: ReportType');
  }

  const reportedContributions = checkRequired(xml, 'ReportedContributions', errors);
  checkAmountFormat(reportedContributions, 'ReportedContributions', errors);

  const reportedExpenditures = checkRequired(xml, 'ReportedExpenditures', errors);
  checkAmountFormat(reportedExpenditures, 'ReportedExpenditures', errors);

  // Validate address sub-elements in MailingAddress
  const mailingAddr = extractElement(xml, 'MailingAddress');
  if (mailingAddr) {
    checkRequired(mailingAddr, 'AddressLine1', errors);
    checkRequired(mailingAddr, 'City', errors);
    checkRequired(mailingAddr, 'State', errors);
    checkRequired(mailingAddr, 'ZipCode', errors);
  }

  // Validate Schedule A entries
  const scheduleAEntries = extractElements(xml, 'ScheduleA');
  for (let i = 0; i < scheduleAEntries.length; i++) {
    const entry = scheduleAEntries[i];
    const prefix = `ScheduleA[${i}]`;

    const name = extractElement(entry, 'ContributorName');
    checkMaxLength(name, `${prefix}.ContributorName`, 50, errors);

    const employer = extractElement(entry, 'ContributorEmployer');
    checkMaxLength(employer, `${prefix}.ContributorEmployer`, 70, errors);

    const occupation = extractElement(entry, 'ContributorOccupation');
    checkMaxLength(occupation, `${prefix}.ContributorOccupation`, 70, errors);

    const contribDate = extractElement(entry, 'ContributionDate');
    checkDateFormat(contribDate, `${prefix}.ContributionDate`, errors);

    const contribAmount = extractElement(entry, 'ContributionAmount');
    checkAmountFormat(contribAmount, `${prefix}.ContributionAmount`, errors);

    const aggregateYtd = extractElement(entry, 'AggregateContributionsYTD');
    checkAmountFormat(aggregateYtd, `${prefix}.AggregateContributionsYTD`, errors);
  }

  // Validate Schedule B entries
  const scheduleBEntries = extractElements(xml, 'ScheduleB');
  for (let i = 0; i < scheduleBEntries.length; i++) {
    const entry = scheduleBEntries[i];
    const prefix = `ScheduleB[${i}]`;

    const name = extractElement(entry, 'RecipientName');
    checkMaxLength(name, `${prefix}.RecipientName`, 50, errors);

    const recipEmployer = extractElement(entry, 'RecipientEmployer');
    checkMaxLength(recipEmployer, `${prefix}.RecipientEmployer`, 70, errors);

    const recipOccupation = extractElement(entry, 'RecipientOccupation');
    checkMaxLength(recipOccupation, `${prefix}.RecipientOccupation`, 70, errors);

    const expDate = extractElement(entry, 'ExpenditureDate');
    checkDateFormat(expDate, `${prefix}.ExpenditureDate`, errors);

    const expAmount = extractElement(entry, 'ExpenditureAmount');
    checkAmountFormat(expAmount, `${prefix}.ExpenditureAmount`, errors);

    const purpose = extractElement(entry, 'ExpenditurePurpose');
    checkMaxLength(purpose, `${prefix}.ExpenditurePurpose`, 512, errors);
  }

  return { valid: errors.length === 0, errors };
}
