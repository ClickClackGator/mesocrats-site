/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface Endpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  title: string;
  category: string;
  description: string;
  auth: string;
  parameters: Parameter[];
  requestExample: string;
  responseExample: string;
}

export interface SidebarCategory {
  name: string;
  endpoints: { id: string; method: Endpoint["method"]; path: string }[];
}

/* ------------------------------------------------------------------ */
/*  Sidebar structure                                                  */
/* ------------------------------------------------------------------ */

export const overviewItems = [
  "Authentication",
  "Rate Limits",
  "Pagination",
  "Errors",
  "Versioning",
];

export const sidebarCategories: SidebarCategory[] = [
  {
    name: "Contributions",
    endpoints: [
      { id: "list-contributions", method: "GET", path: "/v1/contributions" },
      {
        id: "create-contribution",
        method: "POST",
        path: "/v1/contributions",
      },
    ],
  },
  {
    name: "Reports",
    endpoints: [
      { id: "generate-report", method: "GET", path: "/v1/reports" },
    ],
  },
  {
    name: "Disbursements",
    endpoints: [
      { id: "list-disbursements", method: "GET", path: "/v1/disbursements" },
      {
        id: "create-disbursement",
        method: "POST",
        path: "/v1/disbursements",
      },
    ],
  },
  {
    name: "Webhooks",
    endpoints: [
      { id: "register-webhook", method: "POST", path: "/v1/webhooks" },
    ],
  },
];

export const webhookEvents = [
  "contribution.created",
  "contribution.flagged",
  "contribution.refunded",
  "disbursement.created",
  "report.generated",
  "report.validated",
  "aggregate.threshold_crossed",
  "compliance.deadline_approaching",
];

/* ------------------------------------------------------------------ */
/*  Endpoint definitions                                               */
/* ------------------------------------------------------------------ */

export const endpoints: Record<string, Endpoint> = {
  /* -------------------------------------------------------------- */
  /*  GET /v1/contributions                                          */
  /* -------------------------------------------------------------- */
  "list-contributions": {
    id: "list-contributions",
    method: "GET",
    path: "/v1/contributions",
    title: "List contributions",
    category: "Contributions",
    description:
      "Returns a paginated list of contributions received by the committee. Supports filtering by reporting period, itemization status, and individual contributor. Results are ordered by date received, descending. Contributions are returned with their aggregate year-to-date totals, calculated using the MCE contributor-matching algorithm that normalizes names and groups by ZIP code.",
    auth: "Bearer token required. Include your API key in the Authorization header.",
    parameters: [
      {
        name: "period",
        type: "string",
        required: false,
        description:
          'Reporting period to filter by. Quarterly: "Q1", "Q2", "Q3", "Q4". Monthly: "1" through "12". Omit to return all periods.',
      },
      {
        name: "year",
        type: "integer",
        required: false,
        description:
          "Filter contributions by calendar year. Range: 2020--2100. Defaults to the current year.",
      },
      {
        name: "itemized",
        type: "boolean",
        required: false,
        description:
          "Filter by itemization status. When true, returns only contributions where the donor aggregate YTD exceeds $200. When false, returns only unitemized contributions.",
      },
      {
        name: "contributor_id",
        type: "string",
        required: false,
        description:
          "Filter contributions by donor UUID. Returns all contributions from this donor and any matched duplicates (same normalized name + ZIP).",
      },
      {
        name: "cursor",
        type: "string",
        required: false,
        description:
          "Pagination cursor from a previous response. Pass the next_cursor value to retrieve the next page of results.",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description:
          "Maximum number of contributions to return per page. Range: 1--100. Default: 50.",
      },
    ],
    requestExample: `curl -X GET "https://api.mesocrats.org/v1/contributions?year=2026&period=Q1&itemized=true&limit=2" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json"`,
    responseExample: JSON.stringify(
      {
        object: "list",
        data: [
          {
            id: "don_8f3a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
            object: "contribution",
            donor_id: "dnr_1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
            contributor_name: "Smith, Jane",
            contributor_address: "123 Main St",
            contributor_city: "Richmond",
            contributor_state: "VA",
            contributor_zip: "23220",
            employer: "Acme Corp",
            occupation: "Software Engineer",
            date_received: "2026-03-15",
            amount_cents: 5000,
            aggregate_ytd_cents: 25000,
            stripe_charge_id: "ch_3abc123def456",
            itemized: true,
            created_at: "2026-03-15T14:30:00Z",
          },
          {
            id: "don_9e8d7c6b-5a4f-3e2d-1c0b-a9b8c7d6e5f4",
            object: "contribution",
            donor_id: "dnr_2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
            contributor_name: "Johnson, Robert",
            contributor_address: "456 Oak Ave",
            contributor_city: "Glen Allen",
            contributor_state: "VA",
            contributor_zip: "23058",
            employer: "State University",
            occupation: "Professor",
            date_received: "2026-02-28",
            amount_cents: 20000,
            aggregate_ytd_cents: 35000,
            stripe_charge_id: "ch_4bcd234efg567",
            itemized: true,
            created_at: "2026-02-28T09:15:00Z",
          },
        ],
        has_more: true,
        next_cursor: "cur_eyJkIjoiMjAyNi0wMi0yOCJ9",
        total_count: 47,
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  POST /v1/contributions                                         */
  /* -------------------------------------------------------------- */
  "create-contribution": {
    id: "create-contribution",
    method: "POST",
    path: "/v1/contributions",
    title: "Record a contribution",
    category: "Contributions",
    description:
      "Records and validates a new contribution. Enforces FEC contribution limits for multi-candidate committees ($5,000 per individual per year). The contributor is matched against existing donors using normalized name + ZIP code matching. If the donor aggregate YTD exceeds $200, a best-efforts follow-up email is automatically sent to collect employer and occupation if missing (per 52 U.S.C. 30104(b)(3)(A)). Stripe processing fees are automatically recorded as operating disbursements.",
    auth: "Bearer token required. Idempotency-Key header recommended for safe retries.",
    parameters: [
      {
        name: "contributor_name",
        type: "string",
        required: true,
        description:
          'Full name in "Last, First" format. Used for FEC Schedule A reporting and contributor matching.',
      },
      {
        name: "contributor_address",
        type: "string",
        required: true,
        description: "Street address of the contributor.",
      },
      {
        name: "contributor_city",
        type: "string",
        required: true,
        description: "City of the contributor.",
      },
      {
        name: "contributor_state",
        type: "string",
        required: true,
        description: "Two-letter US state abbreviation.",
      },
      {
        name: "contributor_zip",
        type: "string",
        required: true,
        description:
          "5-digit or 9-digit ZIP code. Used for contributor matching and FEC filing.",
      },
      {
        name: "amount_cents",
        type: "integer",
        required: true,
        description:
          "Contribution amount in cents. Must be a positive integer. Example: 5000 = $50.00. Maximum: 500000 ($5,000.00 per FEC limits for multi-candidate PACs).",
      },
      {
        name: "email",
        type: "string",
        required: true,
        description:
          "Contributor email address. Used for best-efforts follow-up emails if employer/occupation is missing.",
      },
      {
        name: "employer",
        type: "string",
        required: false,
        description:
          'Contributor employer name. Required by FEC for itemized contributions (aggregate > $200). If omitted, a best-efforts follow-up is triggered.',
      },
      {
        name: "occupation",
        type: "string",
        required: false,
        description:
          'Contributor occupation. Required by FEC for itemized contributions (aggregate > $200). If omitted, a best-efforts follow-up is triggered.',
      },
      {
        name: "stripe_payment_intent_id",
        type: "string",
        required: true,
        description:
          "Stripe PaymentIntent ID. Used to calculate and record the processing fee as an operating disbursement (2.9% + $0.30).",
      },
      {
        name: "attestations",
        type: "object",
        required: true,
        description:
          "FEC-required attestations object with 5 boolean fields: us_citizen, own_funds, not_federal_contractor, not_foreign_national, contribution_limits_acknowledged. All must be true.",
      },
      {
        name: "Idempotency-Key",
        type: "string (header)",
        required: false,
        description:
          "Unique key for idempotent requests. If a contribution with the same key already exists, the original response is returned without creating a duplicate.",
      },
    ],
    requestExample: `curl -X POST "https://api.mesocrats.org/v1/contributions" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: idem_abc123def456" \\
  -d '{
    "contributor_name": "Smith, Jane",
    "contributor_address": "123 Main St",
    "contributor_city": "Richmond",
    "contributor_state": "VA",
    "contributor_zip": "23220",
    "amount_cents": 5000,
    "email": "jane.smith@example.com",
    "employer": "Acme Corp",
    "occupation": "Software Engineer",
    "stripe_payment_intent_id": "pi_3PxQr2abc123def456",
    "attestations": {
      "us_citizen": true,
      "own_funds": true,
      "not_federal_contractor": true,
      "not_foreign_national": true,
      "contribution_limits_acknowledged": true
    }
  }'`,
    responseExample: JSON.stringify(
      {
        object: "contribution",
        id: "don_8f3a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
        donor_id: "dnr_1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        contributor_name: "Smith, Jane",
        contributor_city: "Richmond",
        contributor_state: "VA",
        contributor_zip: "23220",
        amount_cents: 5000,
        aggregate_ytd_cents: 25000,
        itemized: true,
        stripe_charge_id: "ch_3abc123def456",
        stripe_fee_cents: 175,
        attestations_verified: true,
        best_efforts: {
          employer_occupation_complete: true,
          follow_up_required: false,
        },
        compliance: {
          within_limits: true,
          annual_limit_cents: 500000,
          remaining_cents: 475000,
        },
        created_at: "2026-03-15T14:30:00Z",
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  GET /v1/reports                                                */
  /* -------------------------------------------------------------- */
  "generate-report": {
    id: "generate-report",
    method: "GET",
    path: "/v1/reports",
    title: "Generate a report",
    category: "Reports",
    description:
      "Generates an FEC Form 3X or IRS Form 8872 report for the specified period. Returns the full report data including Schedule A (itemized receipts over $200 aggregate YTD), Schedule B (itemized disbursements), and a summary with totals. Supports multiple output formats: JSON for programmatic access, CSV for spreadsheets, FEC pipe-delimited for electronic filing, and IRS 8872 XML. All reports are logged to the immutable audit trail.",
    auth: "Bearer token required.",
    parameters: [
      {
        name: "year",
        type: "integer",
        required: true,
        description:
          "Report year. Range: 2020--2100.",
      },
      {
        name: "period",
        type: "string",
        required: true,
        description:
          'Reporting period. Quarterly: "Q1", "Q2", "Q3", "Q4". Monthly: "1" through "12".',
      },
      {
        name: "period_type",
        type: "string",
        required: false,
        description:
          'Period type. "quarterly" (default) or "monthly".',
      },
      {
        name: "format",
        type: "string",
        required: false,
        description:
          'Output format. "json" (default) returns the full report object. "csv" returns a single schedule as CSV. "fec" returns pipe-delimited FEC electronic filing format (v8.4). "8872xml" returns IRS Form 8872 XML conforming to XSD 2.3.',
      },
      {
        name: "schedule",
        type: "string",
        required: false,
        description:
          'Required when format=csv. Which schedule to export: "a" (itemized receipts), "b" (itemized disbursements), or "summary".',
      },
      {
        name: "cash_on_hand_start",
        type: "integer",
        required: false,
        description:
          "Opening cash-on-hand balance in cents. Used to calculate Line 8 (cash on hand at close of period) on Form 3X.",
      },
      {
        name: "filing_type",
        type: "string",
        required: false,
        description:
          'For format=8872xml only. Filing type: "InitalReport" (default), "AmendedReport", "FinalReport", or "ChangeOfAddress". Note: IRS schema uses "InitalReport" spelling.',
      },
      {
        name: "custodian_name",
        type: "string",
        required: false,
        description:
          "For format=8872xml only. Override the custodian/treasurer name for this filing.",
      },
      {
        name: "contact_person",
        type: "string",
        required: false,
        description:
          "For format=8872xml only. Override the contact person name for this filing.",
      },
    ],
    requestExample: `curl -X GET "https://api.mesocrats.org/v1/reports?year=2026&period=Q1&format=json" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json"`,
    responseExample: JSON.stringify(
      {
        object: "report",
        report: {
          period: {
            type: "quarterly",
            year: 2026,
            period: "Q1",
            startDate: "2026-01-01",
            endDate: "2026-03-31",
          },
          scheduleA: [
            {
              donorId: "dnr_1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
              donationId: "don_8f3a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
              contributorName: "Smith, Jane",
              contributorAddress: "123 Main St",
              contributorCity: "Richmond",
              contributorState: "VA",
              contributorZip: "23220",
              employer: "Acme Corp",
              occupation: "Software Engineer",
              dateReceived: "2026-03-15",
              amountCents: 5000,
              aggregateYtdCents: 25000,
            },
          ],
          scheduleB: [
            {
              disbursementId: "dis_7c6b5a4f-3e2d-1c0b-a9b8-c7d6e5f4a3b2",
              payeeName: "Stripe, Inc.",
              payeeAddress: "354 Oyster Point Blvd",
              payeeCity: "South San Francisco",
              payeeState: "CA",
              payeeZip: "94080",
              datePaid: "2026-03-15",
              amountCents: 175,
              purpose:
                "Payment processing fee for donation ch_3abc123def456",
              category: "operating",
            },
          ],
          summary: {
            totalReceiptsCents: 875000,
            itemizedReceiptsCents: 625000,
            unitemizedReceiptsCents: 250000,
            totalDisbursementsCents: 42500,
            disbursementsByCategory: {
              operating: 42500,
            },
            cashOnHandStartCents: null,
            cashOnHandEndCents: null,
          },
          warnings: [
            {
              type: "missing_employer_occupation",
              donorId: "dnr_3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
              donorName: "Davis, Michael",
              donationId: "don_2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a",
              message:
                "Donor Davis, Michael is missing employer and occupation (aggregate $350.00 exceeds $200 threshold)",
            },
          ],
          generatedAt: "2026-04-01T12:00:00Z",
        },
        csv: {
          scheduleA: "Contributor Name,Address,City,...",
          scheduleB: "Payee Name,Address,City,...",
          summary: "Field,Value\nTotal Receipts,8750.00\n...",
        },
        fec: "HDR|FEC|8.4|Mesocratic Compliance Engine|1.0\nF3XN|C00853234|...",
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  GET /v1/disbursements                                          */
  /* -------------------------------------------------------------- */
  "list-disbursements": {
    id: "list-disbursements",
    method: "GET",
    path: "/v1/disbursements",
    title: "List disbursements",
    category: "Disbursements",
    description:
      "Returns disbursements within a date range, ordered by date ascending. Includes all disbursement types: operating expenses, contributions to candidates, independent expenditures, and Stripe processing fees (which are automatically recorded when contributions are processed). Amounts over $200 appear on FEC Form 3X Schedule B; amounts over $500 appear on IRS Form 8872 Schedule B.",
    auth: "Bearer token required.",
    parameters: [
      {
        name: "start_date",
        type: "string",
        required: true,
        description:
          "Start of date range in YYYY-MM-DD format. Inclusive.",
      },
      {
        name: "end_date",
        type: "string",
        required: true,
        description:
          "End of date range in YYYY-MM-DD format. Inclusive.",
      },
      {
        name: "category",
        type: "string",
        required: false,
        description:
          'Filter by disbursement category. One of: "operating", "contribution", "independent_expenditure", "other".',
      },
      {
        name: "cursor",
        type: "string",
        required: false,
        description:
          "Pagination cursor from a previous response.",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description:
          "Maximum results per page. Range: 1--100. Default: 50.",
      },
    ],
    requestExample: `curl -X GET "https://api.mesocrats.org/v1/disbursements?start_date=2026-01-01&end_date=2026-03-31&category=operating" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json"`,
    responseExample: JSON.stringify(
      {
        object: "list",
        data: [
          {
            id: "dis_7c6b5a4f-3e2d-1c0b-a9b8-c7d6e5f4a3b2",
            object: "disbursement",
            payee_name: "Stripe, Inc.",
            payee_address_line1: "354 Oyster Point Blvd",
            payee_address_city: "South San Francisco",
            payee_address_state: "CA",
            payee_address_zip: "94080",
            amount_cents: 175,
            date: "2026-03-15",
            purpose:
              "Payment processing fee for donation ch_3abc123def456",
            category: "operating",
            check_number: null,
            receipt_url: null,
            created_at: "2026-03-15T14:30:01Z",
            updated_at: "2026-03-15T14:30:01Z",
          },
          {
            id: "dis_4a3b2c1d-0e9f-8a7b-6c5d-4e3f2a1b0c9d",
            object: "disbursement",
            payee_name: "Capitol Printing Co.",
            payee_address_line1: "900 E Broad St",
            payee_address_city: "Richmond",
            payee_address_state: "VA",
            payee_address_zip: "23219",
            amount_cents: 125000,
            date: "2026-02-10",
            purpose: "Printing and mailing -- Q1 fundraising letters",
            category: "operating",
            check_number: "1042",
            receipt_url: null,
            created_at: "2026-02-10T16:45:00Z",
            updated_at: "2026-02-10T16:45:00Z",
          },
        ],
        has_more: false,
        next_cursor: null,
        total_count: 2,
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  POST /v1/disbursements                                         */
  /* -------------------------------------------------------------- */
  "create-disbursement": {
    id: "create-disbursement",
    method: "POST",
    path: "/v1/disbursements",
    title: "Record a disbursement",
    category: "Disbursements",
    description:
      "Records a new disbursement (expenditure) for the committee. Validates required fields and category. Disbursements over $200 are automatically included in FEC Form 3X Schedule B as itemized expenditures. All disbursements are written to the immutable audit log. Stripe processing fees do not need to be recorded manually -- they are captured automatically when contributions are processed.",
    auth: "Bearer token required.",
    parameters: [
      {
        name: "payee_name",
        type: "string",
        required: true,
        description:
          "Name of the payee (vendor, contractor, or recipient). Trimmed of leading/trailing whitespace.",
      },
      {
        name: "amount_cents",
        type: "integer",
        required: true,
        description:
          "Disbursement amount in cents. Must be a positive integer. Example: 125000 = $1,250.00.",
      },
      {
        name: "date",
        type: "string",
        required: true,
        description:
          "Date of the disbursement in YYYY-MM-DD format.",
      },
      {
        name: "purpose",
        type: "string",
        required: true,
        description:
          'FEC-compliant expenditure purpose description. Example: "Printing and mailing -- Q1 fundraising letters".',
      },
      {
        name: "category",
        type: "string",
        required: true,
        description:
          'Disbursement category. One of: "operating", "contribution", "independent_expenditure", "other".',
      },
      {
        name: "payee_address_line1",
        type: "string",
        required: false,
        description: "Payee street address. Appears on Schedule B if disbursement is itemized.",
      },
      {
        name: "payee_address_city",
        type: "string",
        required: false,
        description: "Payee city.",
      },
      {
        name: "payee_address_state",
        type: "string",
        required: false,
        description: "Payee two-letter state abbreviation.",
      },
      {
        name: "payee_address_zip",
        type: "string",
        required: false,
        description: "Payee ZIP code.",
      },
      {
        name: "check_number",
        type: "string",
        required: false,
        description: "Check number if paid by check.",
      },
      {
        name: "receipt_url",
        type: "string",
        required: false,
        description: "URL to uploaded receipt document.",
      },
    ],
    requestExample: `curl -X POST "https://api.mesocrats.org/v1/disbursements" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "payee_name": "Capitol Printing Co.",
    "amount_cents": 125000,
    "date": "2026-02-10",
    "purpose": "Printing and mailing -- Q1 fundraising letters",
    "category": "operating",
    "payee_address_line1": "900 E Broad St",
    "payee_address_city": "Richmond",
    "payee_address_state": "VA",
    "payee_address_zip": "23219",
    "check_number": "1042"
  }'`,
    responseExample: JSON.stringify(
      {
        object: "disbursement",
        id: "dis_4a3b2c1d-0e9f-8a7b-6c5d-4e3f2a1b0c9d",
        payee_name: "Capitol Printing Co.",
        payee_address_line1: "900 E Broad St",
        payee_address_city: "Richmond",
        payee_address_state: "VA",
        payee_address_zip: "23219",
        amount_cents: 125000,
        date: "2026-02-10",
        purpose: "Printing and mailing -- Q1 fundraising letters",
        category: "operating",
        check_number: "1042",
        receipt_url: null,
        created_at: "2026-02-10T16:45:00Z",
        updated_at: "2026-02-10T16:45:00Z",
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  POST /v1/webhooks                                              */
  /* -------------------------------------------------------------- */
  "register-webhook": {
    id: "register-webhook",
    method: "POST",
    path: "/v1/webhooks",
    title: "Register a webhook",
    category: "Webhooks",
    description:
      "Registers a new webhook endpoint to receive real-time event notifications. Events are delivered via HTTP POST with an HMAC-SHA256 signature in the X-MCE-Signature header for verification. Failed deliveries are retried with exponential backoff (up to 5 attempts over 24 hours). Each webhook can subscribe to specific event types or use the wildcard \"*\" to receive all events.",
    auth: "Bearer token required.",
    parameters: [
      {
        name: "url",
        type: "string",
        required: true,
        description:
          "The HTTPS URL where events will be delivered. Must use HTTPS in production.",
      },
      {
        name: "events",
        type: "array",
        required: true,
        description:
          'Array of event types to subscribe to. Use "*" to subscribe to all events. Available events: contribution.created, contribution.flagged, contribution.refunded, disbursement.created, report.generated, report.validated, aggregate.threshold_crossed, compliance.deadline_approaching.',
      },
      {
        name: "description",
        type: "string",
        required: false,
        description:
          "Human-readable description for this webhook endpoint.",
      },
      {
        name: "metadata",
        type: "object",
        required: false,
        description:
          "Arbitrary key-value pairs attached to the webhook for your reference.",
      },
    ],
    requestExample: `curl -X POST "https://api.mesocrats.org/v1/webhooks" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.example.com/webhooks/mce",
    "events": [
      "contribution.created",
      "contribution.flagged",
      "report.generated"
    ],
    "description": "Production compliance monitor"
  }'`,
    responseExample: JSON.stringify(
      {
        object: "webhook",
        id: "whk_9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4",
        url: "https://your-app.example.com/webhooks/mce",
        events: [
          "contribution.created",
          "contribution.flagged",
          "report.generated",
        ],
        description: "Production compliance monitor",
        signing_secret: "whsec_mce_t3st_s1gn1ng_s3cr3t_k3y",
        status: "active",
        metadata: {},
        created_at: "2026-03-01T10:00:00Z",
      },
      null,
      2,
    ),
  },
};
