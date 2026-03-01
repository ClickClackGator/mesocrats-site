"use client";

import { useState, useMemo } from "react";
import Badge from "../../components/Badge";
import CodeBlock from "../../components/CodeBlock";

/* ------------------------------------------------------------------ */
/*  Endpoint configuration                                             */
/* ------------------------------------------------------------------ */

interface EndpointInfo {
  path: string;
  methods: ("GET" | "POST")[];
}

const endpoints: EndpointInfo[] = [
  { path: "/api/v1/health", methods: ["GET"] },
  { path: "/api/v1/committees", methods: ["GET", "POST"] },
  { path: "/api/v1/contributors", methods: ["GET", "POST"] },
  { path: "/api/v1/contributions", methods: ["GET", "POST"] },
  { path: "/api/v1/disbursements", methods: ["GET", "POST"] },
  { path: "/api/v1/compliance/limits", methods: ["GET"] },
  { path: "/api/v1/reports", methods: ["GET", "POST"] },
];

/* ------------------------------------------------------------------ */
/*  Example request bodies (POST endpoints)                            */
/* ------------------------------------------------------------------ */

const requestBodies: Record<string, string> = {
  "/api/v1/committees": JSON.stringify(
    {
      name: "Test Committee for Democracy",
      committee_type: "pac",
      treasurer_name: "Jane Smith",
      mailing_address: "123 Test St, Washington, DC 20001",
    },
    null,
    2,
  ),
  "/api/v1/contributors": JSON.stringify(
    {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      address_line1: "456 Main St",
      city: "Richmond",
      state: "VA",
      zip_code: "23220",
      employer: "Acme Corp",
      occupation: "Engineer",
    },
    null,
    2,
  ),
  "/api/v1/contributions": JSON.stringify(
    {
      contributor_id: "c2cb6703-a1d2-4e77-9440-22ca4485f510",
      amount_cents: 5000,
      date_received: "2026-03-01",
      contribution_type: "individual",
      payment_method: "credit_card",
      citizenship_attested: true,
      personal_funds_attested: true,
      non_contractor_attested: true,
      personal_card_attested: true,
      age_attested: true,
    },
    null,
    2,
  ),
  "/api/v1/disbursements": JSON.stringify(
    {
      payee_name: "Office Supply Co",
      payee_address: "789 Commerce Ave, Richmond, VA 23219",
      amount_cents: 15000,
      date: "2026-03-01",
      purpose: "Office supplies for committee operations",
      category: "operating",
    },
    null,
    2,
  ),
  "/api/v1/reports": JSON.stringify(
    {
      report_type: "quarterly",
      coverage_start: "2026-01-01",
      coverage_end: "2026-03-31",
      filing_deadline: "2026-04-15",
    },
    null,
    2,
  ),
};

/* ------------------------------------------------------------------ */
/*  Example responses                                                   */
/* ------------------------------------------------------------------ */

const exampleResponses: Record<string, Record<string, string>> = {
  GET: {
    "/api/v1/health": JSON.stringify(
      {
        status: "ok",
        version: "1.0.0",
        timestamp: "2026-03-01T22:56:02.552Z",
        database: "connected",
      },
      null,
      2,
    ),
    "/api/v1/committees": JSON.stringify(
      {
        data: {
          id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
          owner_user_id: "1fb69979-79fb-478c-b344-a86a80d149f6",
          name: "Test Committee for Democracy",
          legal_name: null,
          fec_id: null,
          ein: null,
          committee_type: "pac",
          treasurer_name: "Jane Smith",
          treasurer_address: null,
          mailing_address: "123 Test St, Washington, DC 20001",
          filing_frequency: "quarterly",
          created_at: "2026-03-01T23:07:43.730245+00:00",
          updated_at: "2026-03-01T23:07:43.730245+00:00",
        },
      },
      null,
      2,
    ),
    "/api/v1/contributors": JSON.stringify(
      {
        data: [
          {
            id: "c2cb6703-a1d2-4e77-9440-22ca4485f510",
            committee_id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
            entity_type: "individual",
            first_name: "John",
            last_name: "Doe",
            full_name: "John Doe",
            email: "john@example.com",
            address_line1: "456 Main St",
            address_line2: null,
            city: "Richmond",
            state: "VA",
            zip_code: "23220",
            employer: "Acme Corp",
            occupation: "Engineer",
            match_key: "doe_23220",
            created_at: "2026-03-01T23:13:28.230242+00:00",
            updated_at: "2026-03-01T23:13:28.230242+00:00",
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
    "/api/v1/contributions": JSON.stringify(
      {
        data: [
          {
            id: "728418f9-08d1-41b7-935f-7bc28cd2fa86",
            committee_id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
            contributor_id: "c2cb6703-a1d2-4e77-9440-22ca4485f510",
            amount_cents: 5000,
            date_received: "2026-03-01",
            contribution_type: "individual",
            payment_method: "credit_card",
            stripe_charge_id: null,
            frequency: "one_time",
            citizenship_attested: true,
            personal_funds_attested: true,
            non_contractor_attested: true,
            personal_card_attested: true,
            age_attested: true,
            ip_address: "108.4.77.219",
            aggregate_ytd_cents: 5000,
            itemized: false,
            report_id: null,
            created_at: "2026-03-01T23:13:55.142983+00:00",
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
    "/api/v1/disbursements": JSON.stringify(
      {
        data: [
          {
            id: "5f524567-d4b0-46de-8520-dd73dd83d5f9",
            committee_id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
            payee_name: "Office Supply Co",
            payee_address: "789 Commerce Ave, Richmond, VA 23219",
            amount_cents: 15000,
            date: "2026-03-01",
            purpose: "Office supplies for committee operations",
            category: "operating",
            check_number: null,
            receipt_url: null,
            report_id: null,
            created_at: "2026-03-01T23:14:24.542532+00:00",
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
    "/api/v1/compliance/limits": JSON.stringify(
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
    "/api/v1/reports": JSON.stringify(
      {
        data: [
          {
            id: "902c1dcc-a261-4647-a789-9c3a86e88071",
            committee_id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
            report_type: "quarterly",
            coverage_start: "2026-01-01",
            coverage_end: "2026-03-31",
            filing_deadline: "2026-04-15",
            status: "draft",
            fec_file_path: null,
            fec_confirmation_number: null,
            created_at: "2026-03-01T23:14:34.092108+00:00",
            updated_at: "2026-03-01T23:14:34.092108+00:00",
          },
        ],
      },
      null,
      2,
    ),
  },
  POST: {
    "/api/v1/committees": JSON.stringify(
      {
        data: {
          id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
          owner_user_id: "1fb69979-79fb-478c-b344-a86a80d149f6",
          name: "Test Committee for Democracy",
          legal_name: null,
          fec_id: null,
          ein: null,
          committee_type: "pac",
          treasurer_name: "Jane Smith",
          treasurer_address: null,
          mailing_address: "123 Test St, Washington, DC 20001",
          filing_frequency: "quarterly",
          created_at: "2026-03-01T23:07:43.730245+00:00",
          updated_at: "2026-03-01T23:07:43.730245+00:00",
        },
      },
      null,
      2,
    ),
    "/api/v1/contributors": JSON.stringify(
      {
        data: {
          id: "c2cb6703-a1d2-4e77-9440-22ca4485f510",
          committee_id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
          entity_type: "individual",
          first_name: "John",
          last_name: "Doe",
          full_name: "John Doe",
          email: "john@example.com",
          address_line1: "456 Main St",
          address_line2: null,
          city: "Richmond",
          state: "VA",
          zip_code: "23220",
          employer: "Acme Corp",
          occupation: "Engineer",
          match_key: "doe_23220",
          created_at: "2026-03-01T23:13:28.230242+00:00",
          updated_at: "2026-03-01T23:13:28.230242+00:00",
        },
      },
      null,
      2,
    ),
    "/api/v1/contributions": JSON.stringify(
      {
        data: {
          id: "728418f9-08d1-41b7-935f-7bc28cd2fa86",
          committee_id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
          contributor_id: "c2cb6703-a1d2-4e77-9440-22ca4485f510",
          amount_cents: 5000,
          date_received: "2026-03-01",
          contribution_type: "individual",
          payment_method: "credit_card",
          stripe_charge_id: null,
          frequency: "one_time",
          citizenship_attested: true,
          personal_funds_attested: true,
          non_contractor_attested: true,
          personal_card_attested: true,
          age_attested: true,
          ip_address: "108.4.77.219",
          aggregate_ytd_cents: 5000,
          itemized: false,
          report_id: null,
          created_at: "2026-03-01T23:13:55.142983+00:00",
          aggregate: {
            calendar_year: 2026,
            total_cents: 5000,
            contribution_count: 1,
            itemization_required: false,
          },
        },
      },
      null,
      2,
    ),
    "/api/v1/disbursements": JSON.stringify(
      {
        data: {
          id: "5f524567-d4b0-46de-8520-dd73dd83d5f9",
          committee_id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
          payee_name: "Office Supply Co",
          payee_address: "789 Commerce Ave, Richmond, VA 23219",
          amount_cents: 15000,
          date: "2026-03-01",
          purpose: "Office supplies for committee operations",
          category: "operating",
          check_number: null,
          receipt_url: null,
          report_id: null,
          created_at: "2026-03-01T23:14:24.542532+00:00",
        },
      },
      null,
      2,
    ),
    "/api/v1/reports": JSON.stringify(
      {
        data: {
          id: "902c1dcc-a261-4647-a789-9c3a86e88071",
          committee_id: "1c330ac4-f784-44d8-9f3c-c5ed5bf4a102",
          report_type: "quarterly",
          coverage_start: "2026-01-01",
          coverage_end: "2026-03-31",
          filing_deadline: "2026-04-15",
          status: "draft",
          fec_file_path: null,
          fec_confirmation_number: null,
          created_at: "2026-03-01T23:14:34.092108+00:00",
          updated_at: "2026-03-01T23:14:34.092108+00:00",
        },
      },
      null,
      2,
    ),
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SandboxPage() {
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [endpoint, setEndpoint] = useState(endpoints[0].path);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const availableEndpoints = useMemo(
    () => endpoints.filter((ep) => ep.methods.includes(method)),
    [method],
  );

  const handleMethodChange = (m: "GET" | "POST") => {
    setMethod(m);
    const available = endpoints.filter((ep) => ep.methods.includes(m));
    if (!available.some((ep) => ep.path === endpoint)) {
      setEndpoint(available[0].path);
    }
  };

  const handleSend = () => {
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse(exampleResponses[method]?.[endpoint] || "{}");
      setLoading(false);
    }, 600);
  };

  const currentRequestBody =
    method === "POST" ? requestBodies[endpoint] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-[#4374BA] mb-3">
          Interactive playground
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          API Sandbox
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl">
          Explore the PartyStack API with realistic example responses. Select an
          endpoint and method to see the exact response format the live API
          returns.
        </p>
      </div>

      {/* Info note */}
      <div className="mb-12 rounded-lg border border-[#4374BA]/20 bg-[#4374BA]/5 p-4 flex items-start gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4374BA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <p className="text-sm text-gray-300">
          These examples show real API response formats. Sign in and create an
          API key to make live requests.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Request Builder */}
        <div className="space-y-6">
          {/* Request builder card */}
          <div className="rounded-xl border border-white/[0.06] bg-[#12121F] p-6">
            <h2 className="text-lg font-bold text-white mb-5">
              Request Builder
            </h2>

            {/* Method selector */}
            <div className="mb-4">
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                Method
              </label>
              <div className="flex gap-2">
                {(["GET", "POST"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => handleMethodChange(m)}
                    className={`px-4 py-2 rounded-md text-sm font-semibold font-dev-mono transition-colors ${
                      method === m
                        ? m === "GET"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-[#4374BA]/15 text-[#6B9FE8] border border-[#4374BA]/30"
                        : "bg-white/[0.03] text-gray-500 border border-white/[0.08] hover:text-gray-300"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Endpoint selector */}
            <div className="mb-4">
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                Endpoint
              </label>
              <select
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md text-white font-dev-mono text-sm px-3 py-2.5 focus:outline-none focus:border-[#4374BA]/50 appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%236b7280' stroke-width='1.5'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                {availableEndpoints.map((ep) => (
                  <option key={ep.path} value={ep.path} className="bg-[#12121F]">
                    {ep.path}
                  </option>
                ))}
              </select>
            </div>

            {/* API Key display */}
            <div className="mb-6">
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                Authorization
              </label>
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5">
                <code className="text-sm font-dev-mono text-gray-300 flex-1">
                  Bearer mce_live_*************
                </code>
                <Badge text="Required" variant="purple" />
              </div>
            </div>

            {/* Request body (POST only) */}
            {currentRequestBody && (
              <div className="mb-6">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Request Body
                </label>
                <div className="bg-black/40 border border-white/[0.08] rounded-lg p-3 font-dev-mono text-xs leading-relaxed text-gray-300 overflow-x-auto max-h-[200px] overflow-y-auto">
                  <pre>{currentRequestBody}</pre>
                </div>
              </div>
            )}

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-sm text-white transition-colors ${
                loading
                  ? "bg-[#4374BA]/60 cursor-wait"
                  : "bg-[#4374BA] hover:bg-[#4374BA]/90"
              }`}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>

          {/* Available endpoints card */}
          <div className="rounded-xl border border-white/[0.06] bg-[#12121F] p-6">
            <h3 className="text-sm font-semibold text-white mb-3">
              Available Endpoints
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              All endpoints require an API key via the Authorization header,
              except /api/v1/health.
            </p>
            <div className="space-y-2 font-dev-mono text-xs">
              {endpoints.map((ep) => (
                <div key={ep.path} className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {ep.methods.map((m) => (
                      <span
                        key={m}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          m === "GET"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-[#4374BA]/15 text-[#6B9FE8]"
                        }`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-300">{ep.path}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Response Viewer */}
        <div>
          <div className="rounded-xl border border-white/[0.06] bg-[#12121F] p-6 sticky top-20">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-bold text-white">Response</h2>
              {response && <Badge text="200 OK" variant="green" />}
            </div>

            {!response && !loading && (
              <div className="flex items-center justify-center py-24">
                <p className="text-sm text-gray-500">
                  Send a request to see the response
                </p>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-24">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-[#4374BA] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-400">Loading...</p>
                </div>
              </div>
            )}

            {response && !loading && (
              <CodeBlock
                code={response}
                language="json"
                title={`${method} ${endpoint}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
