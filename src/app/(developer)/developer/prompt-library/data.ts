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

DONOR INFORMATION:
- First name (required)
- Last name (required)
- Street address (required)
- City (required)
- State -- dropdown with all 50 states + DC (required)
- ZIP code -- validated 5 or 9 digits (required)
- Email address (required)
- Employer name (required for contributions over $200 aggregate)
- Occupation (required for contributions over $200 aggregate)

CONTRIBUTION:
- Amount in dollars -- allow preset buttons ($25, $50, $100, $250, $500, $1000) and a custom amount field
- Enforce a maximum of $5,000 per individual per calendar year for multi-candidate PACs, or $3,300 per election for candidate committees. Display a clear error if the limit is exceeded.

ATTESTATION CHECKBOXES (all 5 required before submit):
1. "I am a United States citizen or lawfully admitted permanent resident."
2. "This contribution is made from my own personal funds and is not drawn on the account of any other person or entity."
3. "I am not a federal government contractor."
4. "I am making this contribution with my own personal credit or debit card and not with a corporate or business card."
5. "I am at least 18 years of age."

SUBMISSION:
- On submit, call POST /v1/contributions with the collected data, including a generated Idempotency-Key header to prevent duplicate charges
- Pass an attestations object: { us_citizen: true, own_funds: true, not_federal_contractor: true, not_foreign_national: true, contribution_limits_acknowledged: true }
- Use environment variable process.env.MCE_API_KEY for the Bearer token -- never hardcode the key
- Handle validation errors from the API and display them inline

CONFIRMATION PAGE:
- After successful submission, redirect to a /donate/confirmation page
- Show a receipt with: donor name, amount, date, transaction ID, and a thank-you message
- Include a "Print Receipt" button

FEC DISCLAIMER (must appear on every page):
"Paid for by [COMMITTEE NAME]. Not authorized by any candidate or candidate's committee."

Style the form with a clean, accessible design. Use proper ARIA labels, keyboard navigation, and clear error states. Mobile-responsive.

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
      "Build a Node.js script that generates a complete FEC Form 3X quarterly report with Schedule A/B, CSV exports, validation, and flagged contribution logging.",
    prompt: `Build a Node.js + TypeScript script that generates a quarterly FEC Form 3X report using the Mesocratic Compliance Engine API.

SETUP:
- Use @mesocrats/mce-sdk (npm install @mesocrats/mce-sdk)
- Read the API key from process.env.MCE_API_KEY
- Accept command-line arguments: --year (e.g. 2026) --period (e.g. Q1) --output-dir (default ./reports)

REPORT GENERATION:
1. Call GET /v1/reports with parameters:
   - year: from CLI arg
   - period: from CLI arg (Q1, Q2, Q3, Q4)
   - format: json
   - cash_on_hand_start: optionally accept via --cash-start flag (in cents)

2. Display a summary table in the terminal:
   - Total receipts (formatted as dollars)
   - Itemized receipts (contributions from donors with aggregate > $200 YTD)
   - Unitemized receipts
   - Total disbursements
   - Disbursements by category (operating, contribution, independent_expenditure, other)
   - Cash on hand (start and end, if provided)
   - Number of Schedule A entries (itemized contributions)
   - Number of Schedule B entries (itemized disbursements)
   - Number of compliance warnings

3. VALIDATION:
   - Verify that the sum of all Schedule A line amounts equals the itemized receipts total in the summary
   - Verify that itemized + unitemized = total receipts
   - Log any discrepancies as errors

4. FLAG REVIEW:
   - List all compliance warnings (donors missing employer/occupation)
   - For each warning, show: donor name, donation ID, warning type, message
   - Count total warnings and display prominently

5. FILE EXPORTS:
   - Call GET /v1/reports with format=fec to download the .fec file
   - Save to {output-dir}/mnc_{period}_{year}.fec
   - Call GET /v1/reports with format=csv&schedule=a for Schedule A CSV
   - Call GET /v1/reports with format=csv&schedule=b for Schedule B CSV
   - Call GET /v1/reports with format=csv&schedule=summary for Summary CSV
   - Save all CSVs to {output-dir}/

6. OPTIONAL -- IRS Form 8872:
   - If --include-8872 flag is passed, also call format=8872xml
   - Save to {output-dir}/form8872_mnc_{period}_{year}.xml

Print a final summary showing all generated files and their paths.

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
      "Build a webhook-driven system that sends branded follow-up emails to collect employer/occupation from contributors who cross the $200 itemization threshold, per FEC Advisory Opinion 1999-17.",
    prompt: `Build a webhook-driven best-efforts follow-up system for FEC employer/occupation compliance using Next.js 14 API routes, SendGrid, and the MCE API.

BACKGROUND:
Federal election law (52 U.S.C. 30104(b)(3)(A)) requires committees to use "best efforts" to collect employer and occupation from contributors whose aggregate contributions exceed $200 in a calendar year. Per FEC Advisory Opinion 1999-17, committees must make at least one follow-up request within 30 days.

WEBHOOK LISTENER:
1. Create a Next.js API route at /api/webhooks/mce
2. Register this endpoint with POST /v1/webhooks, subscribing to:
   - aggregate.threshold_crossed (fires when a donor crosses $200 YTD)
   - contribution.created (to check if employer/occupation is present)
3. Verify the webhook signature using the X-MCE-Signature header with HMAC-SHA256
4. Store the signing secret in process.env.MCE_WEBHOOK_SECRET

FOLLOW-UP LOGIC:
When an aggregate.threshold_crossed event is received:
1. Check if the contributor already has employer AND occupation on file
2. If both are present, no action needed -- log and skip
3. If either is missing:
   a. Check the follow-up attempts table -- has this donor been contacted before?
   b. If 0 prior attempts: send initial follow-up email immediately
   c. If 1 prior attempt: check if 30+ days have passed since last attempt. If yes, send final follow-up. If no, schedule it.
   d. If 2 prior attempts: max reached, log as "best efforts exhausted" -- do not send again

EMAIL TEMPLATE (SendGrid):
- Subject: "Action Required: Please Confirm Your Employment Information"
- From: compliance@[your-domain].org
- Branded HTML email with:
  - Committee logo and name at top
  - Personal greeting: "Dear [First Name],"
  - Explanation of why the info is needed (FEC reporting requirement)
  - Which fields are missing (employer, occupation, or both)
  - A link to a form where they can provide the info
  - Regulatory citation: 52 U.S.C. 30104(b)(3)(A)
  - FEC disclaimer footer
- Also send a plain-text fallback version

RESPONSE FORM:
- Create a page at /compliance/update-info/[token]
- Token is a signed JWT containing donor_id and expiration (90 days)
- Form collects employer name and occupation
- On submit, update the donor record via the API
- Show a thank-you confirmation

DASHBOARD:
- Create an admin page at /admin/compliance/follow-ups
- Show a table of all donors needing follow-up:
  - Donor name, email, aggregate YTD, attempts count, last attempt date, status
  - Status: "pending", "sent", "completed", "exhausted"
- Show completion rate (% of flagged donors who have responded)
- Filter by status

Use process.env.MCE_API_KEY for API auth and process.env.SENDGRID_API_KEY for email. Never hardcode secrets.

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
      "Build a full-featured Next.js treasurer dashboard with contributions, disbursements, report generation, 8872 XML export, and real-time compliance monitoring using Recharts.",
    prompt: `Build a complete treasurer dashboard for a multi-candidate political committee using Next.js 14 (App Router), TypeScript, Tailwind CSS, Recharts, and the MCE Compliance API.

OVERVIEW:
This is a full-featured internal tool for the committee treasurer to monitor finances, review contributions, manage disbursements, and generate regulatory filings. All data comes from the MCE API.

LAYOUT:
- Sidebar navigation with 4 sections: Dashboard, Contributions, Disbursements, Reports
- Top bar with committee name, current reporting period, and last-updated timestamp
- Responsive -- sidebar collapses to hamburger on mobile
- Dark mode by default with a light mode toggle

VIEW 1 -- DASHBOARD HOME:
- 4 summary stat cards at top:
  - Total Receipts YTD (dollar amount, green)
  - Total Disbursements YTD (dollar amount, red)
  - Cash on Hand (dollar amount, blue)
  - Flagged Items (count, amber if > 0)
- Line chart (Recharts): Monthly receipts vs disbursements over the current year
- Bar chart: Disbursements by category (operating, contribution, independent_expenditure, other)
- Upcoming deadlines card:
  - Next FEC quarterly filing deadline
  - Next IRS 8872 deadline
  - Days remaining with color coding (red < 7, amber < 30, green > 30)
- Recent activity feed: last 10 contributions and disbursements, interleaved chronologically

VIEW 2 -- CONTRIBUTIONS:
- Data table with columns: Date, Donor Name, City/State, Amount, Aggregate YTD, Itemized, Flags
- Sortable by any column, filterable by:
  - Date range picker
  - Itemization status (all, itemized only, unitemized only)
  - Flagged status (all, flagged only, clean only)
- Call GET /v1/contributions with appropriate filters
- Clicking a row expands inline to show full details: address, employer, occupation, Stripe charge ID, attestation status
- Flag indicators: amber dot for missing employer, red dot for missing both employer and occupation
- Pagination with cursor-based navigation
- Export button: download current filtered view as CSV

VIEW 3 -- DISBURSEMENTS:
- Data table with columns: Date, Payee, Amount, Purpose, Category
- Sortable and filterable by date range and category
- Call GET /v1/disbursements with filters
- Stripe processing fees should be visually distinguished (italic + gray text + "auto-recorded" badge)
- Pie chart (Recharts): disbursement distribution by category
- Total displayed at bottom of table

VIEW 4 -- REPORTS:
- Report generator form:
  - Year dropdown (current year and previous 2 years)
  - Period dropdown (Q1, Q2, Q3, Q4, or monthly 1-12)
  - Period type toggle (quarterly / monthly)
  - Cash on hand start (optional, in dollars -- convert to cents before API call)
- "Generate Report" button calls GET /v1/reports?format=json
- Report preview:
  - Summary card with all totals
  - Schedule A preview table (first 20 entries)
  - Schedule B preview table (first 20 entries)
  - Warnings list with amber highlight
- Download buttons:
  - "Download .fec" -- calls format=fec
  - "Download Schedule A CSV" -- calls format=csv&schedule=a
  - "Download Schedule B CSV" -- calls format=csv&schedule=b
  - "Download Summary CSV" -- calls format=csv&schedule=summary
  - "Download IRS 8872 XML" -- calls format=8872xml
- Filing status tracker: mark reports as "draft", "reviewed", "filed" (local state or database)

TECHNICAL REQUIREMENTS:
- Use @mesocrats/mce-sdk for all API calls
- API key from process.env.MCE_API_KEY -- never expose to client
- Route all API calls through Next.js API routes (server-side)
- Use SWR or React Query for data fetching with proper loading/error states
- Amounts are in cents from the API -- always convert to dollars for display using (cents / 100).toFixed(2)
- Implement proper error boundaries and fallback UI
- Add loading skeletons for all data-dependent sections

API docs: https://developer.mesocrats.org/developer/api-reference`,
  },

  /* -------------------------------------------------------------- */
  /*  5. Walk Me Through Starting a Political Party                  */
  /* -------------------------------------------------------------- */
  {
    id: "start-political-party",
    title: "Walk Me Through Starting a Political Party",
    category: "Party Formation API",
    difficulty: "Starter",
    description:
      "Get a complete step-by-step guide for forming a new political party in your state, including incorporation, IRS registration, FEC filing, and ongoing compliance requirements.",
    prompt: `Walk me through every step required to legally form a new political party in [STATE], from initial incorporation through ongoing compliance. I want a comprehensive, actionable checklist.

Cover each of these phases in detail:

PHASE 1 -- STATE INCORPORATION:
- What entity type should a political party use in [STATE]? (nonprofit corporation, unincorporated association, political committee, etc.)
- What are the specific filing requirements with the [STATE] Secretary of State?
- What documents need to be drafted?
  - Articles of Incorporation / Certificate of Formation
  - Bylaws (what must they include under [STATE] law?)
  - Organizational meeting minutes
- Filing fees and estimated timeline
- Registered agent requirements

PHASE 2 -- FEDERAL REGISTRATION:
- IRS Form 8871 (Political Organization Notice):
  - When must it be filed? (within 24 hours of establishment)
  - What information is required?
  - How to file electronically
  - EIN application (Form SS-4)
- FEC Form 1 (Statement of Organization):
  - When does a party committee need to register with the FEC?
  - Required information: committee name, address, treasurer, custodian of records, bank
  - Filing deadline and method
- State election commission registration in [STATE]:
  - What forms are required?
  - Petition or signature requirements for ballot access (if any)
  - Filing deadlines relative to elections

PHASE 3 -- FINANCIAL SETUP:
- Bank account requirements:
  - Must be a dedicated campaign/political account
  - What documentation does the bank need?
  - Recommended banks for political committees
- Payment processing:
  - Setting up online donation processing (Stripe, ActBlue, etc.)
  - PCI compliance requirements
  - Recurring donation handling

PHASE 4 -- ONGOING COMPLIANCE:
- FEC reporting:
  - Form 3X quarterly reports (Q1: Apr 15, Q2: Jul 15, Q3: Oct 15, Year-End: Jan 31)
  - Contribution limits and prohibited sources
  - Recordkeeping requirements (3 years)
- IRS reporting:
  - Form 8872 quarterly (contributions and expenditures over $200/$500)
  - Form 1120-POL (annual tax return, due Apr 15 or Mar 15 for calendar year)
  - Tax-exempt status considerations (Section 527)
- [STATE] filings:
  - State campaign finance reports
  - Annual corporate filings
  - Any state-specific requirements

PHASE 5 -- BALLOT ACCESS:
- [STATE]-specific requirements to appear on the ballot as a recognized party
- Petition signature thresholds (if applicable)
- Timeline and deadlines
- Maintaining recognized party status (vote thresholds in subsequent elections)

For each step, tell me: what to do, what form to file, where to file it, the deadline, the fee, and any gotchas to watch out for.

Note: The Party Formation API (coming Q3 2026) will automate state-by-state requirement lookups, petition tracking, and filing deadline monitoring. For now, this guide provides the manual process.

API docs: https://developer.mesocrats.org/developer/api-reference`,
  },

  /* -------------------------------------------------------------- */
  /*  6. Build a Filing Deadline Calendar Widget                     */
  /* -------------------------------------------------------------- */
  {
    id: "filing-deadline-calendar",
    title: "Build a Filing Deadline Calendar Widget",
    category: "Election Calendar API",
    difficulty: "Starter",
    description:
      "Generate a React calendar component showing FEC and IRS filing deadlines with color-coded urgency indicators, browser notifications, and calendar export.",
    prompt: `Build a React + TypeScript calendar widget that displays all FEC and IRS filing deadlines for a [COMMITTEE TYPE] registered in [STATE]. Use Tailwind CSS for styling.

DEADLINE DATA:
Include these standard deadlines for the current calendar year:

FEC Form 3X Quarterly Reports:
- Q1 Report: April 15 (covers Jan 1 -- Mar 31)
- Q2 Report: July 15 (covers Apr 1 -- Jun 30)
- Q3 Report: October 15 (covers Jul 1 -- Sep 30)
- Year-End Report: January 31 of the following year (covers Oct 1 -- Dec 31)

IRS Form 8872 Quarterly Reports:
- Q1: April 15
- Q2: July 15
- Q3: October 15
- Year-End: January 31 of the following year

IRS Form 1120-POL (Annual Tax Return):
- Due: April 15 (or March 15 for calendar-year filers who elected to file early)

FEC Form 3X Pre-Election Reports (if applicable):
- Primary pre-election: 12 days before the primary
- General pre-election: 12 days before the general election
- Post-general: 30 days after the general election

CALENDAR COMPONENT:
- Monthly grid view with navigation arrows (prev/next month)
- Deadline days are highlighted with colored dots:
  - Red: deadline is within 7 days (urgent)
  - Amber: deadline is within 30 days (approaching)
  - Green: deadline is more than 30 days away (on track)
- Clicking a deadline day opens a popover/tooltip showing:
  - Filing name (e.g. "FEC Form 3X -- Q1 Report")
  - Due date
  - Coverage period
  - Days remaining
  - Filing instructions link
- Today is highlighted with a ring/border

LIST VIEW TOGGLE:
- Button to switch between calendar grid and chronological list view
- List view shows all upcoming deadlines sorted by date
- Each row: date, filing name, coverage period, status badge (upcoming/due soon/overdue/filed)

NOTIFICATIONS:
- Request browser notification permission on first visit
- Schedule notifications at:
  - 30 days before deadline
  - 7 days before deadline
  - 1 day before deadline
- Notification text: "[Filing Name] is due in [X] days -- [Date]"

CALENDAR EXPORT:
- "Add to Google Calendar" button that generates a Google Calendar URL with the deadline as an event
- "Download .ics" button that generates an iCalendar file for import into Apple Calendar, Outlook, etc.
- Each exported event should include:
  - Title: "FEC/IRS Filing: [Filing Name]"
  - Description: coverage period and filing instructions
  - 1-day and 7-day reminders

STATE-SPECIFIC:
- If [STATE] has its own campaign finance report deadlines, include those in a separate color (blue)
- Mark state deadlines with a "State" badge in the popover

TECHNICAL:
- Pure client-side component (no backend needed for deadline data)
- Store deadline data as a typed constant array
- Calculate urgency dynamically based on current date
- Support dark mode (default) and light mode
- Mobile-responsive -- calendar grid adapts to small screens
- Accessible: keyboard navigation, ARIA labels for all interactive elements

Note: The Election Calendar API (coming 2027) will provide real-time deadline data, state-specific filings, and automatic updates when deadlines change. For now, deadlines are hardcoded in the component.

API docs: https://developer.mesocrats.org/developer/api-reference`,
  },
];
