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
    name: "System",
    endpoints: [
      { id: "health", method: "GET", path: "/v1/health" },
    ],
  },
  {
    name: "Committees",
    endpoints: [
      { id: "get-committee", method: "GET", path: "/v1/committees" },
      { id: "create-committee", method: "POST", path: "/v1/committees" },
    ],
  },
  {
    name: "Contributors",
    endpoints: [
      { id: "list-contributors", method: "GET", path: "/v1/contributors" },
      { id: "create-contributor", method: "POST", path: "/v1/contributors" },
    ],
  },
  {
    name: "Contributions",
    endpoints: [
      { id: "list-contributions", method: "GET", path: "/v1/contributions" },
      { id: "create-contribution", method: "POST", path: "/v1/contributions" },
      { id: "get-contribution", method: "GET", path: "/v1/contributions/:id" },
    ],
  },
  {
    name: "Disbursements",
    endpoints: [
      { id: "list-disbursements", method: "GET", path: "/v1/disbursements" },
      { id: "create-disbursement", method: "POST", path: "/v1/disbursements" },
    ],
  },
  {
    name: "Compliance",
    endpoints: [
      { id: "get-limits", method: "GET", path: "/v1/compliance/limits" },
    ],
  },
  {
    name: "Reports",
    endpoints: [
      { id: "list-reports", method: "GET", path: "/v1/reports" },
      { id: "create-report", method: "POST", path: "/v1/reports" },
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
  /*  GET /v1/health                                                  */
  /* -------------------------------------------------------------- */
  "health": {
    id: "health",
    method: "GET",
    path: "/v1/health",
    title: "Health check",
    category: "System",
    description:
      "Returns API status, version, and database connectivity. No authentication required.",
    auth: "None. This endpoint is public.",
    parameters: [],
    requestExample: `curl -X GET "https://developer.mesocrats.org/api/v1/health"`,
    responseExample: JSON.stringify(
      {
        status: "ok",
        version: "1.0.0",
        timestamp: "2026-03-01T12:00:00.000Z",
        database: "connected",
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  GET /v1/committees                                              */
  /* -------------------------------------------------------------- */
  "get-committee": {
    id: "get-committee",
    method: "GET",
    path: "/v1/committees",
    title: "Get your committee",
    category: "Committees",
    description:
      "Returns the committee bound to this API key, or null if the key is not yet bound to a committee. Does not require committee binding -- useful for checking key status.",
    auth: "Bearer token required.",
    parameters: [],
    requestExample: `curl -X GET "https://developer.mesocrats.org/api/v1/committees" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here"`,
    responseExample: JSON.stringify(
      {
        data: {
          id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          owner_user_id: "f0e1d2c3-b4a5-6789-0abc-def123456789",
          name: "Virginia Democratic Committee",
          legal_name: "Virginia Democratic Committee Inc.",
          fec_id: "C00123456",
          ein: "54-1234567",
          committee_type: "state_party",
          treasurer_name: "Jane Smith",
          treasurer_address: "P.O. Box 1234, Richmond, VA 23218",
          mailing_address: "P.O. Box 1234, Richmond, VA 23218",
          filing_frequency: "quarterly",
          created_at: "2026-01-15T10:00:00Z",
          updated_at: "2026-01-15T10:00:00Z",
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  POST /v1/committees                                             */
  /* -------------------------------------------------------------- */
  "create-committee": {
    id: "create-committee",
    method: "POST",
    path: "/v1/committees",
    title: "Create a committee",
    category: "Committees",
    description:
      "Creates a new committee and binds it to this API key. The key must not already be bound to a committee (returns 409 if it is). This is typically the first call after generating an API key.",
    auth: "Bearer token required. Key must NOT already be bound to a committee.",
    parameters: [
      {
        name: "name",
        type: "string",
        required: true,
        description: "Committee display name.",
      },
      {
        name: "committee_type",
        type: "string",
        required: false,
        description:
          'Committee type. One of: "national_party", "state_party", "pac", "super_pac", "candidate". Default: "national_party".',
      },
      {
        name: "legal_name",
        type: "string",
        required: false,
        description: "Full legal name of the committee.",
      },
      {
        name: "fec_id",
        type: "string",
        required: false,
        description: "FEC committee ID if registered (e.g., C00123456).",
      },
      {
        name: "ein",
        type: "string",
        required: false,
        description: "IRS Employer Identification Number.",
      },
      {
        name: "treasurer_name",
        type: "string",
        required: false,
        description: "Name of the committee treasurer.",
      },
      {
        name: "treasurer_address",
        type: "string",
        required: false,
        description: "Mailing address of the treasurer.",
      },
      {
        name: "mailing_address",
        type: "string",
        required: false,
        description: "Committee mailing address.",
      },
      {
        name: "filing_frequency",
        type: "string",
        required: false,
        description:
          'FEC filing frequency. One of: "quarterly", "monthly", "semiannual". Default: "quarterly".',
      },
    ],
    requestExample: `curl -X POST "https://developer.mesocrats.org/api/v1/committees" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Virginia Democratic Committee",
    "committee_type": "state_party",
    "legal_name": "Virginia Democratic Committee Inc.",
    "fec_id": "C00123456",
    "treasurer_name": "Jane Smith",
    "filing_frequency": "quarterly"
  }'`,
    responseExample: JSON.stringify(
      {
        data: {
          id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          owner_user_id: "f0e1d2c3-b4a5-6789-0abc-def123456789",
          name: "Virginia Democratic Committee",
          legal_name: "Virginia Democratic Committee Inc.",
          fec_id: "C00123456",
          ein: null,
          committee_type: "state_party",
          treasurer_name: "Jane Smith",
          treasurer_address: null,
          mailing_address: null,
          filing_frequency: "quarterly",
          created_at: "2026-01-15T10:00:00Z",
          updated_at: "2026-01-15T10:00:00Z",
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  GET /v1/contributors                                            */
  /* -------------------------------------------------------------- */
  "list-contributors": {
    id: "list-contributors",
    method: "GET",
    path: "/v1/contributors",
    title: "List contributors",
    category: "Contributors",
    description:
      "Returns a paginated list of contributors for this committee. Supports case-insensitive search across full_name, email, and last_name. Results are ordered by created_at descending.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [
      {
        name: "page",
        type: "integer",
        required: false,
        description: "Page number. Default: 1.",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Results per page. Range: 1--250. Default: 50.",
      },
      {
        name: "search",
        type: "string",
        required: false,
        description:
          "Case-insensitive search against full_name, email, or last_name.",
      },
    ],
    requestExample: `curl -X GET "https://developer.mesocrats.org/api/v1/contributors?search=smith&limit=10" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here"`,
    responseExample: JSON.stringify(
      {
        data: [
          {
            id: "c1d2e3f4-a5b6-7890-cdef-123456789abc",
            committee_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            entity_type: "individual",
            first_name: "Jane",
            last_name: "Smith",
            full_name: "Jane Smith",
            email: "jane.smith@example.com",
            address_line1: "123 Main St",
            address_line2: null,
            city: "Richmond",
            state: "VA",
            zip_code: "23220",
            employer: "Acme Corp",
            occupation: "Software Engineer",
            match_key: "smith_23220",
            created_at: "2026-02-01T09:00:00Z",
            updated_at: "2026-02-01T09:00:00Z",
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          total_pages: 1,
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  POST /v1/contributors                                           */
  /* -------------------------------------------------------------- */
  "create-contributor": {
    id: "create-contributor",
    method: "POST",
    path: "/v1/contributors",
    title: "Create a contributor",
    category: "Contributors",
    description:
      "Creates a new contributor record for this committee. Automatically generates match_key (lowercase last_name + zip_code) for fuzzy matching and full_name from first_name + last_name if not provided.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [
      {
        name: "first_name",
        type: "string",
        required: true,
        description: "Contributor first name.",
      },
      {
        name: "last_name",
        type: "string",
        required: true,
        description: "Contributor last name.",
      },
      {
        name: "full_name",
        type: "string",
        required: false,
        description:
          "Full display name. Auto-generated from first_name + last_name if omitted.",
      },
      {
        name: "entity_type",
        type: "string",
        required: false,
        description:
          'Entity type: "individual", "organization", or "committee". Default: "individual".',
      },
      {
        name: "email",
        type: "string",
        required: false,
        description: "Email address.",
      },
      {
        name: "address_line1",
        type: "string",
        required: false,
        description: "Street address.",
      },
      {
        name: "city",
        type: "string",
        required: false,
        description: "City.",
      },
      {
        name: "state",
        type: "string",
        required: false,
        description: "Two-letter US state abbreviation.",
      },
      {
        name: "zip_code",
        type: "string",
        required: false,
        description:
          "ZIP code. Used with last_name to generate match_key for contributor matching.",
      },
      {
        name: "employer",
        type: "string",
        required: false,
        description:
          "Employer name. Required by FEC for itemized contributions (aggregate > $200).",
      },
      {
        name: "occupation",
        type: "string",
        required: false,
        description:
          "Occupation. Required by FEC for itemized contributions (aggregate > $200).",
      },
    ],
    requestExample: `curl -X POST "https://developer.mesocrats.org/api/v1/contributors" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@example.com",
    "address_line1": "123 Main St",
    "city": "Richmond",
    "state": "VA",
    "zip_code": "23220",
    "employer": "Acme Corp",
    "occupation": "Software Engineer"
  }'`,
    responseExample: JSON.stringify(
      {
        data: {
          id: "c1d2e3f4-a5b6-7890-cdef-123456789abc",
          committee_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          entity_type: "individual",
          first_name: "Jane",
          last_name: "Smith",
          full_name: "Jane Smith",
          email: "jane.smith@example.com",
          address_line1: "123 Main St",
          address_line2: null,
          city: "Richmond",
          state: "VA",
          zip_code: "23220",
          employer: "Acme Corp",
          occupation: "Software Engineer",
          match_key: "smith_23220",
          created_at: "2026-02-01T09:00:00Z",
          updated_at: "2026-02-01T09:00:00Z",
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  GET /v1/contributions                                           */
  /* -------------------------------------------------------------- */
  "list-contributions": {
    id: "list-contributions",
    method: "GET",
    path: "/v1/contributions",
    title: "List contributions",
    category: "Contributions",
    description:
      "Returns a paginated list of contributions for this committee. Supports filtering by date range, contributor, and itemization status. Results are ordered by date_received descending.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [
      {
        name: "page",
        type: "integer",
        required: false,
        description: "Page number. Default: 1.",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Results per page. Range: 1--250. Default: 50.",
      },
      {
        name: "start_date",
        type: "string",
        required: false,
        description:
          "Filter contributions received on or after this date (YYYY-MM-DD).",
      },
      {
        name: "end_date",
        type: "string",
        required: false,
        description:
          "Filter contributions received on or before this date (YYYY-MM-DD).",
      },
      {
        name: "contributor_id",
        type: "string (uuid)",
        required: false,
        description: "Filter contributions by contributor UUID.",
      },
      {
        name: "itemized",
        type: "string",
        required: false,
        description:
          'Filter by itemization status. "true" returns only itemized contributions (aggregate YTD > $200). "false" returns only unitemized.',
      },
    ],
    requestExample: `curl -X GET "https://developer.mesocrats.org/api/v1/contributions?start_date=2026-01-01&end_date=2026-03-31&itemized=true&limit=2" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here"`,
    responseExample: JSON.stringify(
      {
        data: [
          {
            id: "d1e2f3a4-b5c6-7890-abcd-ef1234567890",
            committee_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            contributor_id: "c1d2e3f4-a5b6-7890-cdef-123456789abc",
            amount_cents: 5000,
            date_received: "2026-03-15",
            contribution_type: "individual",
            payment_method: "credit_card",
            stripe_charge_id: "ch_3abc123def456",
            frequency: "one_time",
            citizenship_attested: true,
            personal_funds_attested: true,
            non_contractor_attested: true,
            personal_card_attested: true,
            age_attested: true,
            ip_address: "192.168.1.1",
            aggregate_ytd_cents: 25000,
            itemized: true,
            report_id: null,
            created_at: "2026-03-15T14:30:00Z",
          },
        ],
        pagination: {
          page: 1,
          limit: 2,
          total: 47,
          total_pages: 24,
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  POST /v1/contributions                                          */
  /* -------------------------------------------------------------- */
  "create-contribution": {
    id: "create-contribution",
    method: "POST",
    path: "/v1/contributions",
    title: "Record a contribution",
    category: "Contributions",
    description:
      "Records a new contribution. Validates that the contributor belongs to this committee, enforces FEC contribution limits based on committee type (national_party: $41,300/yr, state_party: $10,000/yr, pac: $5,000/yr, candidate: $3,300/yr, super_pac: unlimited), updates the contributor's year-to-date aggregate, and sets the itemization flag when the aggregate exceeds $200. Returns the contribution with aggregate info.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [
      {
        name: "contributor_id",
        type: "string (uuid)",
        required: true,
        description:
          "UUID of the contributor. Must belong to this committee.",
      },
      {
        name: "amount_cents",
        type: "integer",
        required: true,
        description:
          "Contribution amount in cents. Minimum: 100 ($1.00).",
      },
      {
        name: "date_received",
        type: "string",
        required: true,
        description: "Date the contribution was received (YYYY-MM-DD).",
      },
      {
        name: "contribution_type",
        type: "string",
        required: false,
        description:
          'Type of contribution. Default: "individual". Other values: "pac", "party_transfer", "other".',
      },
      {
        name: "payment_method",
        type: "string",
        required: false,
        description:
          'Payment method: "credit_card", "check", "wire", "other".',
      },
      {
        name: "stripe_charge_id",
        type: "string",
        required: false,
        description: "Stripe charge ID if processed via Stripe.",
      },
      {
        name: "frequency",
        type: "string",
        required: false,
        description:
          'Contribution frequency. Default: "one_time". Other values: "monthly", "quarterly".',
      },
      {
        name: "citizenship_attested",
        type: "boolean",
        required: false,
        description: "US citizenship attestation. Default: false.",
      },
      {
        name: "personal_funds_attested",
        type: "boolean",
        required: false,
        description: "Personal funds attestation. Default: false.",
      },
      {
        name: "non_contractor_attested",
        type: "boolean",
        required: false,
        description: "Not a federal contractor attestation. Default: false.",
      },
      {
        name: "personal_card_attested",
        type: "boolean",
        required: false,
        description: "Personal card attestation. Default: false.",
      },
      {
        name: "age_attested",
        type: "boolean",
        required: false,
        description: "Age attestation. Default: false.",
      },
      {
        name: "ip_address",
        type: "string",
        required: false,
        description:
          "Contributor IP address. Falls back to x-forwarded-for header if omitted.",
      },
    ],
    requestExample: `curl -X POST "https://developer.mesocrats.org/api/v1/contributions" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contributor_id": "c1d2e3f4-a5b6-7890-cdef-123456789abc",
    "amount_cents": 5000,
    "date_received": "2026-03-15",
    "contribution_type": "individual",
    "payment_method": "credit_card",
    "stripe_charge_id": "ch_3abc123def456",
    "citizenship_attested": true,
    "personal_funds_attested": true,
    "non_contractor_attested": true,
    "personal_card_attested": true,
    "age_attested": true
  }'`,
    responseExample: JSON.stringify(
      {
        data: {
          id: "d1e2f3a4-b5c6-7890-abcd-ef1234567890",
          committee_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          contributor_id: "c1d2e3f4-a5b6-7890-cdef-123456789abc",
          amount_cents: 5000,
          date_received: "2026-03-15",
          contribution_type: "individual",
          payment_method: "credit_card",
          stripe_charge_id: "ch_3abc123def456",
          frequency: "one_time",
          citizenship_attested: true,
          personal_funds_attested: true,
          non_contractor_attested: true,
          personal_card_attested: true,
          age_attested: true,
          ip_address: "192.168.1.1",
          aggregate_ytd_cents: 25000,
          itemized: true,
          report_id: null,
          created_at: "2026-03-15T14:30:00Z",
          aggregate: {
            calendar_year: 2026,
            total_cents: 25000,
            contribution_count: 5,
            itemization_required: true,
          },
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  GET /v1/contributions/:id                                       */
  /* -------------------------------------------------------------- */
  "get-contribution": {
    id: "get-contribution",
    method: "GET",
    path: "/v1/contributions/:id",
    title: "Get a contribution",
    category: "Contributions",
    description:
      "Returns a single contribution by ID, scoped to this committee. Returns 404 if the contribution doesn't exist or belongs to a different committee.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [
      {
        name: "id",
        type: "string (uuid)",
        required: true,
        description: "Contribution UUID (path parameter).",
      },
    ],
    requestExample: `curl -X GET "https://developer.mesocrats.org/api/v1/contributions/d1e2f3a4-b5c6-7890-abcd-ef1234567890" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here"`,
    responseExample: JSON.stringify(
      {
        data: {
          id: "d1e2f3a4-b5c6-7890-abcd-ef1234567890",
          committee_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          contributor_id: "c1d2e3f4-a5b6-7890-cdef-123456789abc",
          amount_cents: 5000,
          date_received: "2026-03-15",
          contribution_type: "individual",
          payment_method: "credit_card",
          stripe_charge_id: "ch_3abc123def456",
          frequency: "one_time",
          citizenship_attested: true,
          personal_funds_attested: true,
          non_contractor_attested: true,
          personal_card_attested: true,
          age_attested: true,
          ip_address: "192.168.1.1",
          aggregate_ytd_cents: 25000,
          itemized: true,
          report_id: null,
          created_at: "2026-03-15T14:30:00Z",
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  GET /v1/disbursements                                           */
  /* -------------------------------------------------------------- */
  "list-disbursements": {
    id: "list-disbursements",
    method: "GET",
    path: "/v1/disbursements",
    title: "List disbursements",
    category: "Disbursements",
    description:
      "Returns a paginated list of disbursements for this committee. Supports filtering by date range and category. Results are ordered by date descending.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [
      {
        name: "page",
        type: "integer",
        required: false,
        description: "Page number. Default: 1.",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Results per page. Range: 1--250. Default: 50.",
      },
      {
        name: "start_date",
        type: "string",
        required: false,
        description: "Filter disbursements on or after this date (YYYY-MM-DD).",
      },
      {
        name: "end_date",
        type: "string",
        required: false,
        description:
          "Filter disbursements on or before this date (YYYY-MM-DD).",
      },
      {
        name: "category",
        type: "string",
        required: false,
        description:
          'Filter by category. One of: "operating", "contribution_to_candidate", "independent_expenditure", "coordinated_expenditure", "other".',
      },
    ],
    requestExample: `curl -X GET "https://developer.mesocrats.org/api/v1/disbursements?start_date=2026-01-01&end_date=2026-03-31&category=operating" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here"`,
    responseExample: JSON.stringify(
      {
        data: [
          {
            id: "e1f2a3b4-c5d6-7890-abcd-ef1234567890",
            committee_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            payee_name: "Capitol Printing Co.",
            payee_address: "900 E Broad St, Richmond, VA 23219",
            amount_cents: 125000,
            date: "2026-02-10",
            purpose: "Printing and mailing -- Q1 fundraising letters",
            category: "operating",
            check_number: "1042",
            receipt_url: null,
            report_id: null,
            created_at: "2026-02-10T16:45:00Z",
          },
        ],
        pagination: {
          page: 1,
          limit: 50,
          total: 1,
          total_pages: 1,
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  POST /v1/disbursements                                          */
  /* -------------------------------------------------------------- */
  "create-disbursement": {
    id: "create-disbursement",
    method: "POST",
    path: "/v1/disbursements",
    title: "Record a disbursement",
    category: "Disbursements",
    description:
      "Records a new disbursement (expenditure) for the committee. Validates required fields and category. All disbursements are written to the audit log.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [
      {
        name: "payee_name",
        type: "string",
        required: true,
        description: "Name of the payee (vendor, contractor, or recipient).",
      },
      {
        name: "amount_cents",
        type: "integer",
        required: true,
        description:
          "Disbursement amount in cents. Minimum: 1 ($0.01).",
      },
      {
        name: "date",
        type: "string",
        required: true,
        description: "Date of the disbursement (YYYY-MM-DD).",
      },
      {
        name: "purpose",
        type: "string",
        required: true,
        description:
          "FEC-compliant expenditure purpose description.",
      },
      {
        name: "category",
        type: "string",
        required: false,
        description:
          'Disbursement category. One of: "operating", "contribution_to_candidate", "independent_expenditure", "coordinated_expenditure", "other". Default: "operating".',
      },
      {
        name: "payee_address",
        type: "string",
        required: false,
        description: "Payee address.",
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
    requestExample: `curl -X POST "https://developer.mesocrats.org/api/v1/disbursements" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "payee_name": "Capitol Printing Co.",
    "amount_cents": 125000,
    "date": "2026-02-10",
    "purpose": "Printing and mailing -- Q1 fundraising letters",
    "category": "operating",
    "payee_address": "900 E Broad St, Richmond, VA 23219",
    "check_number": "1042"
  }'`,
    responseExample: JSON.stringify(
      {
        data: {
          id: "e1f2a3b4-c5d6-7890-abcd-ef1234567890",
          committee_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          payee_name: "Capitol Printing Co.",
          payee_address: "900 E Broad St, Richmond, VA 23219",
          amount_cents: 125000,
          date: "2026-02-10",
          purpose: "Printing and mailing -- Q1 fundraising letters",
          category: "operating",
          check_number: "1042",
          receipt_url: null,
          report_id: null,
          created_at: "2026-02-10T16:45:00Z",
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  GET /v1/compliance/limits                                       */
  /* -------------------------------------------------------------- */
  "get-limits": {
    id: "get-limits",
    method: "GET",
    path: "/v1/compliance/limits",
    title: "Get FEC contribution limits",
    category: "Compliance",
    description:
      "Returns the FEC contribution limits for this committee's type for the 2025-2026 election cycle. All limit values are in cents. Null means unlimited (e.g., super PACs). Also returns the $200 itemization threshold.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [],
    requestExample: `curl -X GET "https://developer.mesocrats.org/api/v1/compliance/limits" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here"`,
    responseExample: JSON.stringify(
      {
        data: {
          committee_type: "pac",
          cycle: "2025-2026",
          limits: {
            individual_per_year: 500000,
            pac_per_year: 500000,
            party_per_year: 500000,
          },
          itemization_threshold: 20000,
        },
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  GET /v1/reports                                                 */
  /* -------------------------------------------------------------- */
  "list-reports": {
    id: "list-reports",
    method: "GET",
    path: "/v1/reports",
    title: "List reports",
    category: "Reports",
    description:
      "Returns all reports for this committee. Supports filtering by status and report type. Results are ordered by coverage_start descending. Not paginated -- returns all matching rows.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [
      {
        name: "status",
        type: "string",
        required: false,
        description:
          'Filter by report status. One of: "draft", "review", "submitted", "accepted", "rejected".',
      },
      {
        name: "report_type",
        type: "string",
        required: false,
        description:
          'Filter by report type. One of: "quarterly", "monthly", "semiannual", "year_end", "amendment".',
      },
    ],
    requestExample: `curl -X GET "https://developer.mesocrats.org/api/v1/reports?status=draft" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here"`,
    responseExample: JSON.stringify(
      {
        data: [
          {
            id: "f1a2b3c4-d5e6-7890-abcd-ef1234567890",
            committee_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            report_type: "quarterly",
            coverage_start: "2026-01-01",
            coverage_end: "2026-03-31",
            filing_deadline: "2026-04-15",
            status: "draft",
            fec_file_path: null,
            fec_confirmation_number: null,
            created_at: "2026-04-01T10:00:00Z",
            updated_at: "2026-04-01T10:00:00Z",
          },
        ],
      },
      null,
      2,
    ),
  },

  /* -------------------------------------------------------------- */
  /*  POST /v1/reports                                                */
  /* -------------------------------------------------------------- */
  "create-report": {
    id: "create-report",
    method: "POST",
    path: "/v1/reports",
    title: "Create a report",
    category: "Reports",
    description:
      "Creates a new report in draft status. Coverage start must be before coverage end. All reports are written to the audit log.",
    auth: "Bearer token required. Key must be bound to a committee.",
    parameters: [
      {
        name: "coverage_start",
        type: "string",
        required: true,
        description:
          "Report period start date (YYYY-MM-DD). Must be before coverage_end.",
      },
      {
        name: "coverage_end",
        type: "string",
        required: true,
        description:
          "Report period end date (YYYY-MM-DD). Must be after coverage_start.",
      },
      {
        name: "report_type",
        type: "string",
        required: false,
        description:
          'Report type. One of: "quarterly", "monthly", "semiannual", "year_end", "amendment". Default: "quarterly".',
      },
      {
        name: "filing_deadline",
        type: "string",
        required: false,
        description: "Filing deadline date (YYYY-MM-DD).",
      },
    ],
    requestExample: `curl -X POST "https://developer.mesocrats.org/api/v1/reports" \\
  -H "Authorization: Bearer mce_live_sk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "coverage_start": "2026-01-01",
    "coverage_end": "2026-03-31",
    "report_type": "quarterly",
    "filing_deadline": "2026-04-15"
  }'`,
    responseExample: JSON.stringify(
      {
        data: {
          id: "f1a2b3c4-d5e6-7890-abcd-ef1234567890",
          committee_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          report_type: "quarterly",
          coverage_start: "2026-01-01",
          coverage_end: "2026-03-31",
          filing_deadline: "2026-04-15",
          status: "draft",
          fec_file_path: null,
          fec_confirmation_number: null,
          created_at: "2026-04-01T10:00:00Z",
          updated_at: "2026-04-01T10:00:00Z",
        },
      },
      null,
      2,
    ),
  },
};
