// src/lib/fec-compliance.ts
// FEC compliance validation for the Mesocratic National Committee donation system
// Per MP_Donation_System_Architecture_v1.docx Section 7

// 2025–2026 cycle limit: individual to national party committee
export const FEC_ANNUAL_LIMIT_CENTS = 44_300_00; // $44,300

// Minimum donation
export const MIN_DONATION_CENTS = 100; // $1.00

// Maximum single donation (soft cap — ISPolitical handles authoritative enforcement)
export const MAX_SINGLE_DONATION_CENTS = 44_300_00; // $44,300

// Itemization threshold
export const FEC_ITEMIZATION_THRESHOLD_CENTS = 200_00; // $200

export interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  employer: string;
  occupation: string;
  phone?: string;
}

export interface DonationInfo {
  amountCents: number;
  frequency: 'one-time' | 'monthly';
  citizenshipAttested: boolean;
  personalFundsAttested: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate donor info — required FEC fields
 * Best practice: collect employer/occupation on every donation regardless
 * of amount to avoid retroactive collection if aggregate > $200
 */
export function validateDonorInfo(donor: DonorInfo): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!donor.firstName?.trim()) errors.push('First name is required.');
  if (!donor.lastName?.trim()) errors.push('Last name is required.');
  if (!donor.email?.trim()) errors.push('Email is required.');
  if (donor.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor.email))
    errors.push('Please enter a valid email address.');
  if (!donor.addressLine1?.trim()) errors.push('Street address is required.');
  if (!donor.city?.trim()) errors.push('City is required.');
  if (!donor.state?.trim()) errors.push('State is required.');
  if (!donor.zipCode?.trim()) errors.push('ZIP code is required.');
  if (donor.zipCode && !/^\d{5}(-\d{4})?$/.test(donor.zipCode))
    errors.push('Please enter a valid ZIP code.');
  if (!donor.employer?.trim()) errors.push('Employer is required by federal law.');
  if (!donor.occupation?.trim()) errors.push('Occupation is required by federal law.');

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate donation info — amount, attestations, FEC rules
 */
export function validateDonationInfo(
  donation: DonationInfo,
  priorAnnualTotalCents: number = 0
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Amount checks
  if (!donation.amountCents || donation.amountCents < MIN_DONATION_CENTS) {
    errors.push('Minimum donation is $1.00.');
  }

  if (donation.amountCents > MAX_SINGLE_DONATION_CENTS) {
    errors.push(
      `Single donations cannot exceed $${(MAX_SINGLE_DONATION_CENTS / 100).toLocaleString()}.`
    );
  }

  // Attestation checks
  if (!donation.citizenshipAttested) {
    errors.push(
      'You must confirm that you are a United States citizen or permanent resident.'
    );
  }

  if (!donation.personalFundsAttested) {
    errors.push(
      'You must confirm this contribution is from your own personal funds.'
    );
  }

  // Annual aggregate warning (not a hard block — ISPolitical handles enforcement)
  const projectedTotal = priorAnnualTotalCents + donation.amountCents;
  if (projectedTotal > FEC_ANNUAL_LIMIT_CENTS) {
    warnings.push(
      `This donation would bring your annual total to $${(projectedTotal / 100).toLocaleString()}, ` +
      `which exceeds the $${(FEC_ANNUAL_LIMIT_CENTS / 100).toLocaleString()} annual limit ` +
      `for individual contributions to a national party committee. ` +
      `Please verify before proceeding.`
    );
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Server-side: check for duplicate submissions within a time window
 */
export function isDuplicateWindow(
  existingTimestamp: Date | string,
  windowSeconds: number = 60
): boolean {
  const existing = new Date(existingTimestamp).getTime();
  const now = Date.now();
  return now - existing < windowSeconds * 1000;
}

/**
 * Format cents to display string
 */
export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * US states for dropdown
 */
export const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' }, { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const;
