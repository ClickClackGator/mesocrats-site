// src/lib/mce/committee-config.ts
// Mesocratic Compliance Engine — Committee Configuration
//
// Canonical committee details used by IRS Form 8872 and other
// compliance filings. Single source of truth for org identity.

export interface USAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CommitteeConfig {
  name: string;
  ein: string;
  dateEstablished: string; // YYYY-MM-DD
  email: string;
  mailingAddress: USAddress;
  custodianName: string;
  contactPerson: string;
}

export const MNC_COMMITTEE: CommitteeConfig = {
  name: 'Mesocratic National Committee',
  ein: '93-3411870',
  dateEstablished: '2026-02-25',
  email: 'info@mesocrats.org',
  mailingAddress: {
    addressLine1: 'PO Box 4218',
    city: 'Glen Allen',
    state: 'VA',
    zipCode: '23058',
  },
  custodianName: '',   // TODO: fill in treasurer name
  contactPerson: '',   // TODO: fill in contact name
};
