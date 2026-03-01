/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type Difficulty = "Starter" | "Intermediate" | "Advanced";

export type Category =
  | "Compliance API"
  | "Party Formation API"
  | "Election Calendar API";

export interface PromptTemplate {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  description: string;
  prompt: string;
}

/* ------------------------------------------------------------------ */
/*  Templates                                                          */
/* ------------------------------------------------------------------ */

export const templates: PromptTemplate[] = [
  /* -------------------------------------------------------------- */
  /*  1. Build an FEC-Compliant Donation Form                        */
  /* -------------------------------------------------------------- */
  {
    id: "fec-donation-form",
    title: "Build an FEC-Compliant Donation Form",
    category: "Compliance API",
    difficulty: "Starter",
    description:
      "Generate a complete web donation form with all FEC-required fields, attestation checkboxes, contribution limit enforcement, and a confirmation receipt page.",
    prompt: `Build me an FEC-compliant online donation form for a [COMMITTEE TYPE] called [COMMITTEE NAME] using Next.js 14 (App Router), TypeScript, and Tailwind CSS.

The form must collect all fields required by the Federal Election Commission:

DONOR INFORMATION (used to create a contributor via POST /api/v1/contributors):
- first_name (required)
- last_name (required)
- address_line1 (required)
- city (required)
- state -- dropdown with all 50 states + DC (required)
- zip_code -- validated 5 or 9 digits (required)
- email (required)
- employer (required for contributions over $200 aggregate)
- occupation (required for contributions over $200 aggregate)

CONTRIBUTION AMOUNT:
- Amount in dollars -- allow preset buttons ($25, $50, $100, $250, $500, $1000) and a custom amount field
- Convert to cents before sending to the API (amount_cents field)
- Check limits first by calling GET /api/v1/compliance/limits -- the response returns limits in cents:
  { data: { committee_type: "pac", limits: { individual_per_year: 500000 }, itemization_threshold: 20000 } }
- Display a clear error if the contribution would exceed the limit

ATTESTATION CHECKBOXES (all 5 required before submit -- these map to API boolean fields):
1. "I am a United States citizen or lawfully admitted permanent resident." -> citizenship_attested
2. "This contribution is made from my own personal funds." -> personal_funds_attested
3. "I am not a federal government contractor." -> non_contractor_attested
4. "I am making this contribution with my own personal credit or debit card." -> personal_card_attested
5. "I am at least 18 years of age." -> age_attested

SUBMISSION FLOW:
1. First, create the contributor: POST /api/v1/contributors with the donor fields above
   - The response returns { data: { id: "...", committee_id: "...", ... } }
   - Save the returned contributor id
2. Then, create the contribution: POST /api/v1/contributions with:
   {
     contributor_id: "<id from step 1>",
     amount_cents: 5000,
     date_received: "2026-03-01",
     contribution_type: "individual",
     payment_method: "credit_card",
     citizenship_attested: true,
     personal_funds_attested: true,
     non_contractor_attested: true,
     personal_card_attested: true,
     age_attested: true
   }
   - The response includes aggregate data: { aggregate: { calendar_year: 2026, total_cents: 5000, contribution_count: 1, itemization_required: false } }
3. Use Authorization: Bearer <token> header with process.env.MCE_API_KEY -- never hardcode the key
4. Handle validation errors from the API and display them inline

CONFIRMATION PAGE:
- After successful submission, redirect to a /donate/confirmation page
- Show a receipt with: donor name, amount, date, transaction ID (from response data.id), and a thank-you message
- Include a "Print Receipt" button

FEC DISCLAIMER (must appear on every page):
"Paid for by [COMMITTEE NAME]. Not authorized by any candidate or candidate's committee."

Style the form with a clean, accessible design. Use proper ARIA labels, keyboard navigation, and clear error states. Mobile-responsive.

Base URL: https://developer.mesocrats.org/api/v1
API docs: https://developer.mesocrats.org/developer/api-reference`,
  },

  /* -------------------------------------------------------------- */
  /*  2. Generate a Quarterly FEC Report                             */
  /* -------------------------------------------------------------- */
  {
    id: "quarterly-fec-report",
    title: "Generate a Quarterly FEC Report",
    category: "Compliance API",
    difficulty: "Intermediate",
    description:
      "Build a Node.js script that creates a quarterly FEC report, pulls contribution and disbursement data, and displays a compliance summary.",
    prompt: `Build a Node.js + TypeScript script that generates a quarterly FEC report using the PartyStack Compliance API.

SETUP:
- Read the API key from process.env.MCE_API_KEY
- Accept command-line arguments: --coverage-start (e.g. 2026-01-01) --coverage-end (e.g. 2026-03-31) --deadline (e.g. 2026-04-15)
- Base URL: https://developer.mesocrats.org/api/v1

REPORT CREATION:
1. Create a report by calling POST /api/v1/reports with:
   {
     report_type: "quarterly",
     coverage_start: "2026-01-01",
     coverage_end: "2026-03-31",
     filing_deadline: "2026-04-15"
   }
   - Authorization: Bearer <MCE_API_KEY>
   - Response format: { data: { id, committee_id, report_type, coverage_start, coverage_end, filing_deadline, status: "draft", ... } }

2. List all reports: GET /api/v1/reports
   - Returns: { data: [{ id, report_type, coverage_start, coverage_end, filing_deadline, status, ... }] }

DATA GATHERING:
3. Fetch all contributions in the period: GET /api/v1/contributions
   - Response: { data: [...], pagination: { page, limit, total, total_pages } }
   - Each contribution includes: amount_cents, date_received, contribution_type, aggregate_ytd_cents, itemized, contributor_id

4. Fetch all disbursements in the period: GET /api/v1/disbursements
   - Response: { data: [...], pagination: { page, limit, total, total_pages } }
   - Each disbursement includes: payee_name, amount_cents, date, purpose, category

5. Fetch compliance limits: GET /api/v1/compliance/limits
   - Returns: { data: { committee_type, cycle, limits: { individual_per_year, pac_per_year, party_per_year }, itemization_threshold } }

SUMMARY DISPLAY:
- Display a summary table in the terminal:
  - Total contributions (sum of amount_cents, formatted as dollars)
  - Number of itemized contributions (where itemized: true)
  - Number of unitemized contributions (where itemized: false)
  - Total disbursements (sum of amount_cents)
  - Disbursements by category (operating, etc.)
  - Number of contributions and disbursements
  - Report status

COMPLIANCE CHECKS:
- For each contribution, check if aggregate_ytd_cents exceeds the limit from /api/v1/compliance/limits
- List any contributors missing employer or occupation (from GET /api/v1/contributors)
- Flag contributions where itemized: true but contributor is missing required fields

Print a final summary showing the report ID, status, and any compliance warnings.

Handle all errors gracefully -- network failures, auth errors, invalid parameters. Use descriptive console output with timestamps.

API docs: https://developer.mesocrats.org/developer/api-reference`,
  },

  /* -------------------------------------------------------------- */
  /*  3. Set Up Best-Efforts Follow-Up Emails                       */
  /* -------------------------------------------------------------- */
  {
    id: "best-efforts-followup",
    title: "Set Up Best-Efforts Follow-Up Emails",
    category: "Compliance API",
    difficulty: "Intermediate",
    description:
      "Build a scheduled job that identifies contributors crossing the $200 itemization threshold who are missing employer/occupation, and sends branded follow-up emails per FEC Advisory Opinion 1999-17.",
    prompt: `Build a best-efforts follow-up system for FEC employer/occupation compliance using Next.js 14 API routes, SendGrid, and the PartyStack Compliance API.

BACKGROUND:
Federal election law (52 U.S.C. 30104(b)(3)(A)) requires committees to use "best efforts" to collect employer and occupation from contributors whose aggregate contributions exceed $200 in a calendar year. Per FEC Advisory Opinion 1999-17, committees must make at least one follow-up request within 30 days.

SCHEDULED JOB (runs daily via cron or Vercel Cron):
1. Fetch all contributions: GET /api/v1/contributions
   - Response: { data: [{ contributor_id, amount_cents, aggregate_ytd_cents, itemized, ... }], pagination: { page, limit, total, total_pages } }
   - Handle pagination by following total_pages

2. Identify contributions where itemized: true or aggregate_ytd_cents > 20000 (the $200 itemization threshold from GET /api/v1/compliance/limits, where itemization_threshold: 20000 in cents)

3. For each flagged contributor_id, fetch their details: GET /api/v1/contributors
   - Response includes: { data: [{ id, first_name, last_name, email, employer, occupation, match_key, ... }] }
   - Check if employer AND occupation are both filled in

4. If either field is missing:
   a. Check the follow-up attempts table (your own database) -- has this contributor been contacted before?
   b. If 0 prior attempts: send initial follow-up email immediately
   c. If 1 prior attempt and 30+ days since last: send final follow-up
   d. If 2 prior attempts: max reached, log as "best efforts exhausted"

EMAIL TEMPLATE (SendGrid):
- Subject: "Action Required: Please Confirm Your Employment Information"
- From: compliance@[your-domain].org
- Branded HTML email with:
  - Committee logo and name at top
  - Personal greeting: "Dear [first_name],"
  - Explanation of why the info is needed (FEC reporting requirement)
  - Which fields are missing (employer, occupation, or both)
  - A link to a form where they can provide the info
  - Regulatory citation: 52 U.S.C. 30104(b)(3)(A)
  - FEC disclaimer footer
- Also send a plain-text fallback version

RESPONSE FORM:
- Create a page at /compliance/update-info/[token]
- Token is a signed JWT containing contributor_id and expiration (90 days)
- Form collects employer name and occupation
- On submit, display a thank-you confirmation (store the update in your own database for now)

DASHBOARD:
- Create an admin page at /admin/compliance/follow-ups
- Show a table of all contributors needing follow-up:
  - Name (first_name + last_name), email, aggregate_ytd_cents (formatted as dollars), attempts count, last attempt date, status
  - Status: "pending", "sent", "completed", "exhausted"
- Show completion rate (% of flagged contributors who have responded)
- Filter by status

Use process.env.MCE_API_KEY for API auth and process.env.SENDGRID_API_KEY for email. Never hardcode secrets.

Base URL: https://developer.mesocrats.org/api/v1
API docs: https://developer.mesocrats.org/developer/api-reference`,
  },

  /* -------------------------------------------------------------- */
  /*  4. Create a Treasurer Dashboard                                */
  /* -------------------------------------------------------------- */
  {
    id: "treasurer-dashboard",
    title: "Create a Treasurer Dashboard",
    category: "Compliance API",
    difficulty: "Advanced",
    description:
      "Build a full-featured Next.js treasurer dashboard with contributions, disbursements, compliance limits, report management, and real-time monitoring using Recharts.",
    prompt: `Build a complete treasurer dashboard for a political committee using Next.js 14 (App Router), TypeScript, Tailwind CSS, Recharts, and the PartyStack Compliance API.

OVERVIEW:
This is a full-featured internal tool for the committee treasurer to monitor finances, review contributions, manage disbursements, and create regulatory filings. All data comes from the PartyStack API.

Base URL: https://developer.mesocrats.org/api/v1
Auth: Authorization: Bearer <process.env.MCE_API_KEY>

LAYOUT:
- Sidebar navigation with 5 sections: Dashboard, Contributions, Disbursements, Compliance, Reports
- Top bar with committee name (from GET /api/v1/committees) and last-updated timestamp
- Responsive -- sidebar collapses to hamburger on mobile
- Dark mode by default with a light mode toggle

VIEW 1 -- DASHBOARD HOME:
- 4 summary stat cards at top:
  - Total Receipts YTD (dollar amount, green) -- sum from GET /api/v1/contributions
  - Total Disbursements YTD (dollar amount, red) -- sum from GET /api/v1/disbursements
  - Cash on Hand (receipts minus disbursements, blue)
  - Compliance Flags (count of contributors missing employer/occupation, amber if > 0)
- Line chart (Recharts): Monthly receipts vs disbursements over the current year
- Bar chart: Disbursements by category (operating, etc.)
- Recent activity feed: last 10 contributions and disbursements, interleaved chronologically

VIEW 2 -- CONTRIBUTIONS:
- Data table with columns: Date, Contributor ID, Amount, Aggregate YTD, Itemized, Payment Method
- Call GET /api/v1/contributions -- returns:
  { data: [{ id, contributor_id, amount_cents, date_received, contribution_type, payment_method, aggregate_ytd_cents, itemized, ... }], pagination: { page, limit, total, total_pages } }
- Clicking a row expands to show full details: all attestation booleans, stripe_charge_id, frequency, ip_address
- All amounts are in cents from the API -- convert to dollars for display using (cents / 100).toFixed(2)
- Pagination using the pagination object from the response

VIEW 3 -- DISBURSEMENTS:
- Data table with columns: Date, Payee, Amount, Purpose, Category
- Call GET /api/v1/disbursements -- returns:
  { data: [{ id, payee_name, payee_address, amount_cents, date, purpose, category, check_number, ... }], pagination: { ... } }
- Pie chart (Recharts): disbursement distribution by category
- Total displayed at bottom of table

VIEW 4 -- COMPLIANCE:
- Fetch limits: GET /api/v1/compliance/limits -- returns:
  { data: { committee_type, cycle, limits: { individual_per_year: 500000, pac_per_year: 500000, party_per_year: 500000 }, itemization_threshold: 20000 } }
- Display current limits as a reference card (all values in cents, display as dollars)
- Show itemization threshold ($200) and explain when contributor details become required
- List contributors from GET /api/v1/contributors -- check for missing employer/occupation fields
- Flag contributors whose contributions have aggregate_ytd_cents > itemization_threshold but are missing required fields

VIEW 5 -- REPORTS:
- Report creator form:
  - report_type: "quarterly" (dropdown)
  - coverage_start: date picker (YYYY-MM-DD)
  - coverage_end: date picker (YYYY-MM-DD)
  - filing_deadline: date picker (YYYY-MM-DD)
- "Create Report" button calls POST /api/v1/reports with those fields
  - Response: { data: { id, committee_id, report_type, coverage_start, coverage_end, filing_deadline, status: "draft", ... } }
- Report list: GET /api/v1/reports -- shows all created reports with their status
- Each report card shows: report_type, coverage period, filing_deadline, status badge (draft/filed)

TECHNICAL REQUIREMENTS:
- Route all API calls through Next.js API routes (server-side) to protect the API key
- API key from process.env.MCE_API_KEY -- never expose to client
- Use SWR or React Query for data fetching with proper loading/error states
- Implement proper error boundaries and fallback UI
- Add loading skeletons for all data-dependent sections

API docs: https://developer.mesocrats.org/developer/api-reference`,
  },

  /* -------------------------------------------------------------- */
  /*  5. Track Contribution Limits                                   */
  /* -------------------------------------------------------------- */
  {
    id: "track-contribution-limits",
    title: "Track Contribution Limits",
    category: "Compliance API",
    difficulty: "Starter",
    description:
      "Build a React component that displays FEC contribution limits, tracks aggregate totals per contributor, and warns when contributions approach or exceed legal maximums.",
    prompt: `Build a React + TypeScript contribution limit tracker component using Tailwind CSS and the PartyStack Compliance API.

OVERVIEW:
This component shows how much each contributor has given year-to-date, their remaining capacity under FEC limits, and warnings when they approach the maximum. It helps committees stay compliant with federal contribution limits.

Base URL: https://developer.mesocrats.org/api/v1
Auth: Authorization: Bearer <process.env.MCE_API_KEY>

FEC CONTRIBUTION LIMITS (2025-2026 cycle):
- Individual to PAC: $5,000/year (500000 cents)
- Individual to national party: $41,300/year
- Individual to candidate: $3,300/election
- PAC to PAC: $5,000/year
- Itemization threshold: $200 (20000 cents) -- contributions above this aggregate require detailed reporting

STEP 1 -- FETCH LIMITS:
Call GET /api/v1/compliance/limits
Response:
{
  "data": {
    "committee_type": "pac",
    "cycle": "2025-2026",
    "limits": {
      "individual_per_year": 500000,
      "pac_per_year": 500000,
      "party_per_year": 500000
    },
    "itemization_threshold": 20000
  }
}
All values are in cents. Convert to dollars for display.

STEP 2 -- FETCH CONTRIBUTIONS:
Call GET /api/v1/contributions
Response:
{
  "data": [{
    "contributor_id": "c2cb6703-...",
    "amount_cents": 5000,
    "aggregate_ytd_cents": 5000,
    "itemized": false,
    "contribution_type": "individual",
    ...
  }],
  "pagination": { "page": 1, "limit": 50, "total": 1, "total_pages": 1 }
}
The aggregate_ytd_cents field tracks the cumulative total for that contributor in the calendar year.

STEP 3 -- FETCH CONTRIBUTORS:
Call GET /api/v1/contributors to get contributor names and details.
Response:
{
  "data": [{
    "id": "c2cb6703-...",
    "first_name": "John",
    "last_name": "Doe",
    "full_name": "John Doe",
    "employer": "Acme Corp",
    "occupation": "Engineer",
    ...
  }],
  "pagination": { ... }
}

COMPONENT FEATURES:
- Limit reference card: show the committee's limits from the API (individual_per_year, pac_per_year, party_per_year) formatted as dollars
- Contributor table: name, aggregate YTD (from contributions), limit, remaining capacity, progress bar
- Progress bar color coding:
  - Green: < 75% of limit used
  - Amber: 75-90% of limit used
  - Red: > 90% of limit used
- Itemization indicator: show a badge when a contributor's aggregate exceeds the itemization_threshold (20000 cents / $200)
- Alert banner when any contributor is within $500 of their limit
- Handle the case where a new contribution would exceed the limit -- show a clear error

VALIDATION ON NEW CONTRIBUTIONS:
When creating a new contribution via POST /api/v1/contributions, the response includes:
{
  "data": {
    "aggregate_ytd_cents": 5000,
    "itemized": false,
    "aggregate": {
      "calendar_year": 2026,
      "total_cents": 5000,
      "contribution_count": 1,
      "itemization_required": false
    }
  }
}
Use the aggregate data to update the limit tracker in real time after each contribution.

Style with Tailwind CSS, dark mode by default. Mobile-responsive.

API docs: https://developer.mesocrats.org/developer/api-reference`,
  },

  /* -------------------------------------------------------------- */
  /*  6. Build a Committee Setup Wizard                              */
  /* -------------------------------------------------------------- */
  {
    id: "committee-setup-wizard",
    title: "Build a Committee Setup Wizard",
    category: "Compliance API",
    difficulty: "Starter",
    description:
      "Generate a step-by-step wizard that creates and configures a new political committee via the API, with committee type selection, treasurer info, and mailing address.",
    prompt: `Build a multi-step committee setup wizard using Next.js 14 (App Router), TypeScript, and Tailwind CSS with the PartyStack Compliance API.

OVERVIEW:
This wizard walks a user through creating a new political committee. It collects the required information step by step and creates the committee via the API. The API key gets permanently bound to the committee on creation.

Base URL: https://developer.mesocrats.org/api/v1
Auth: Authorization: Bearer <process.env.MCE_API_KEY>

STEP 1 -- COMMITTEE TYPE:
Let the user choose a committee type with descriptions:
- "pac" -- Political Action Committee (multi-candidate)
- "party" -- Political Party Committee
- "candidate" -- Candidate Committee
- "super_pac" -- Independent Expenditure-Only Committee
- "hybrid_pac" -- Hybrid PAC (with separate segregated fund)
Show a brief explanation of each type and its FEC filing requirements.

STEP 2 -- COMMITTEE DETAILS:
Collect:
- name (required) -- The committee's official name
- legal_name (optional) -- If different from the display name
- committee_type (from step 1, required)
- treasurer_name (required) -- Full name of the designated treasurer
- treasurer_address (optional) -- Treasurer's personal address
- mailing_address (required) -- Committee's official mailing address
- filing_frequency (optional) -- "quarterly" or "monthly" (default: quarterly)
- fec_id (optional) -- If already registered with the FEC
- ein (optional) -- IRS Employer Identification Number

STEP 3 -- REVIEW & CREATE:
- Display a summary of all entered information
- "Create Committee" button calls POST /api/v1/committees with:
  {
    "name": "Test Committee for Democracy",
    "committee_type": "pac",
    "treasurer_name": "Jane Smith",
    "mailing_address": "123 Test St, Washington, DC 20001"
  }
  Optional fields can also be included: legal_name, fec_id, ein, treasurer_address, filing_frequency.

- Response format:
  {
    "data": {
      "id": "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
      "owner_user_id": "1fb69979-79fb-478c-b344-a86a80d149f6",
      "name": "Test Committee for Democracy",
      "legal_name": null,
      "fec_id": null,
      "ein": null,
      "committee_type": "pac",
      "treasurer_name": "Jane Smith",
      "treasurer_address": null,
      "mailing_address": "123 Test St, Washington, DC 20001",
      "filing_frequency": "quarterly",
      "created_at": "2026-03-01T23:07:43.730245+00:00",
      "updated_at": "2026-03-01T23:07:43.730245+00:00"
    }
  }

STEP 4 -- CONFIRMATION:
- Show success message with the committee ID
- Explain that this API key is now permanently bound to this committee
- Verify by calling GET /api/v1/committees -- should return the committee data
- Show next steps: "You can now create contributors, record contributions, track disbursements, and generate reports."
- Link to API docs for each next step

IMPORTANT NOTES:
- An API key can only be bound to ONE committee. If the key is already bound, POST /api/v1/committees returns: { "error": "This API key is already bound to a committee" }
- Handle this error gracefully -- show the existing committee info instead
- Check if a committee already exists on load: GET /api/v1/committees -- if it returns data, skip to a "Committee Already Configured" view showing the existing details

WIZARD UI:
- Progress indicator showing current step (1/4, 2/4, etc.)
- Back/Next navigation between steps
- Form validation before allowing progression
- Animated transitions between steps
- Dark mode by default, styled with Tailwind CSS
- Mobile-responsive

API docs: https://developer.mesocrats.org/developer/api-reference`,
  },
];
