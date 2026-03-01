"use client";

import { useState } from "react";
import Badge from "../../components/Badge";
import CodeBlock from "../../components/CodeBlock";

/* ------------------------------------------------------------------ */
/*  Mock response data                                                 */
/* ------------------------------------------------------------------ */

const mockResponses: Record<string, Record<string, string>> = {
  GET: {
    "/v1/contributions": JSON.stringify(
      {
        object: "list",
        data: [
          {
            id: "don_test_a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            object: "contribution",
            donor_id: "dnr_test_1111-2222-3333-4444",
            contributor_name: "Testworth, Alice",
            contributor_city: "Arlington",
            contributor_state: "VA",
            contributor_zip: "22201",
            employer: "Test Corp",
            occupation: "QA Engineer",
            date_received: "2026-03-10",
            amount_cents: 5000,
            aggregate_ytd_cents: 5000,
            itemized: false,
            payment_method: "card",
            stripe_charge_id: "ch_test_abc123",
            created_at: "2026-03-10T10:00:00Z",
          },
          {
            id: "don_test_b2c3d4e5-f6a7-8901-bcde-f12345678901",
            object: "contribution",
            donor_id: "dnr_test_5555-6666-7777-8888",
            contributor_name: "Mockington, Bob",
            contributor_city: "Richmond",
            contributor_state: "VA",
            contributor_zip: "23220",
            employer: "Mock Industries",
            occupation: "Product Manager",
            date_received: "2026-02-28",
            amount_cents: 25000,
            aggregate_ytd_cents: 25000,
            itemized: true,
            payment_method: "card",
            stripe_charge_id: "ch_test_def456",
            created_at: "2026-02-28T14:30:00Z",
          },
          {
            id: "don_test_c3d4e5f6-a7b8-9012-cdef-123456789012",
            object: "contribution",
            donor_id: "dnr_test_9999-aaaa-bbbb-cccc",
            contributor_name: "Sandbox, Carol",
            contributor_city: "Glen Allen",
            contributor_state: "VA",
            contributor_zip: "23058",
            employer: null,
            occupation: null,
            date_received: "2026-01-15",
            amount_cents: 10000,
            aggregate_ytd_cents: 10000,
            itemized: false,
            payment_method: "card",
            stripe_charge_id: "ch_test_ghi789",
            created_at: "2026-01-15T09:00:00Z",
          },
        ],
        has_more: false,
        next_cursor: null,
        total_count: 3,
      },
      null,
      2,
    ),
    "/v1/disbursements": JSON.stringify(
      {
        object: "list",
        data: [
          {
            id: "dis_test_d4e5f6a7-b8c9-0123-def0-234567890123",
            object: "disbursement",
            payee_name: "Stripe, Inc.",
            payee_address_line1: "354 Oyster Point Blvd",
            payee_address_city: "South San Francisco",
            payee_address_state: "CA",
            payee_address_zip: "94080",
            amount_cents: 175,
            date: "2026-03-10",
            purpose:
              "Payment processing fee for donation ch_test_abc123",
            category: "operating",
            check_number: null,
            receipt_url: null,
            created_at: "2026-03-10T10:00:01Z",
          },
          {
            id: "dis_test_e5f6a7b8-c9d0-1234-ef01-345678901234",
            object: "disbursement",
            payee_name: "Stripe, Inc.",
            payee_address_line1: "354 Oyster Point Blvd",
            payee_address_city: "South San Francisco",
            payee_address_state: "CA",
            payee_address_zip: "94080",
            amount_cents: 753,
            date: "2026-02-28",
            purpose:
              "Payment processing fee for donation ch_test_def456",
            category: "operating",
            check_number: null,
            receipt_url: null,
            created_at: "2026-02-28T14:30:01Z",
          },
          {
            id: "dis_test_f6a7b8c9-d0e1-2345-f012-456789012345",
            object: "disbursement",
            payee_name: "Keystone Consulting Group",
            payee_address_line1: "1200 K St NW",
            payee_address_city: "Washington",
            payee_address_state: "DC",
            payee_address_zip: "20005",
            amount_cents: 250000,
            date: "2026-01-20",
            purpose: "Compliance consulting -- Q1 filing preparation",
            category: "operating",
            check_number: "1001",
            receipt_url: null,
            created_at: "2026-01-20T11:00:00Z",
          },
        ],
        has_more: false,
        next_cursor: null,
        total_count: 3,
      },
      null,
      2,
    ),
    "/v1/reports": JSON.stringify(
      {
        object: "report",
        id: "rpt_test_a7b8c9d0-e1f2-3456-0123-567890123456",
        type: "FEC_3X",
        period: {
          type: "quarterly",
          year: 2026,
          period: "Q1",
          startDate: "2026-01-01",
          endDate: "2026-03-31",
        },
        summary: {
          totalReceiptsCents: 40000,
          itemizedReceiptsCents: 25000,
          unitemizedReceiptsCents: 15000,
          totalDisbursementsCents: 250928,
          disbursementsByCategory: {
            operating: 250928,
          },
          cashOnHandStartCents: null,
          cashOnHandEndCents: null,
        },
        schedule_a_count: 1,
        schedule_b_count: 3,
        warnings_count: 1,
        status: "draft",
        download_urls: {
          fec: "/v1/reports?year=2026&period=Q1&format=fec",
          csv_a: "/v1/reports?year=2026&period=Q1&format=csv&schedule=a",
          csv_b: "/v1/reports?year=2026&period=Q1&format=csv&schedule=b",
          xml_8872: "/v1/reports?year=2026&period=Q1&format=8872xml",
        },
        generatedAt: "2026-04-01T12:00:00Z",
      },
      null,
      2,
    ),
  },
  POST: {
    "/v1/contributions": JSON.stringify(
      {
        object: "contribution",
        id: "don_test_new_1234-5678-9abc-def0-123456789abc",
        donor_id: "dnr_test_1111-2222-3333-4444",
        contributor_name: "Testworth, Alice",
        amount_cents: 5000,
        aggregate_ytd_cents: 10000,
        itemized: false,
        status: "accepted",
        stripe_charge_id: "ch_test_new_xyz",
        stripe_fee_cents: 175,
        attestations_verified: true,
        compliance: {
          within_limits: true,
          annual_limit_cents: 500000,
          remaining_cents: 490000,
        },
        created_at: "2026-03-20T15:00:00Z",
      },
      null,
      2,
    ),
    "/v1/disbursements": JSON.stringify(
      {
        object: "disbursement",
        id: "dis_test_new_abcd-ef01-2345-6789-abcdef012345",
        payee_name: "Office Supply Co.",
        amount_cents: 8500,
        date: "2026-03-20",
        purpose: "Office supplies -- printer paper and toner",
        category: "operating",
        status: "recorded",
        created_at: "2026-03-20T15:00:00Z",
      },
      null,
      2,
    ),
    "/v1/reports": JSON.stringify(
      {
        object: "report",
        id: "rpt_test_new_1234-5678-9abc-def0",
        type: "FEC_3X",
        period: { type: "quarterly", year: 2026, period: "Q1" },
        status: "accepted",
        generatedAt: "2026-03-20T15:00:00Z",
      },
      null,
      2,
    ),
  },
};

/* ------------------------------------------------------------------ */
/*  Endpoint options                                                   */
/* ------------------------------------------------------------------ */

const endpointOptions = [
  "/v1/contributions",
  "/v1/disbursements",
  "/v1/reports",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SandboxPage() {
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [endpoint, setEndpoint] = useState(endpointOptions[0]);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse(mockResponses[method]?.[endpoint] || "{}");
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-medium uppercase tracking-widest text-[#4374BA] mb-3">
          Interactive playground
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          API Sandbox
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl">
          Test API endpoints with pre-loaded sandbox data. No API key required
          -- responses are simulated with realistic test data.
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
                    onClick={() => setMethod(m)}
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
                {endpointOptions.map((ep) => (
                  <option key={ep} value={ep} className="bg-[#12121F]">
                    {ep}
                  </option>
                ))}
              </select>
            </div>

            {/* API Key display */}
            <div className="mb-6">
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                API Key
              </label>
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5">
                <code className="text-sm font-dev-mono text-gray-300 flex-1">
                  mce_test_sandbox_key
                </code>
                <Badge text="Sandbox" variant="green" />
              </div>
            </div>

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

          {/* Sandbox test data card */}
          <div className="rounded-xl border border-white/[0.06] bg-[#12121F] p-6">
            <h3 className="text-sm font-semibold text-white mb-3">
              Sandbox Test Data
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              The sandbox is pre-loaded with synthetic data for a test
              committee:
            </p>
            <div className="space-y-2 font-dev-mono text-xs text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Committee</span>
                <span>Test National Committee</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">FEC ID</span>
                <span>C00000000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">EIN</span>
                <span>00-0000000</span>
              </div>
              <div className="border-t border-white/[0.06] my-3" />
              <div className="flex justify-between">
                <span className="text-gray-500">Contributors</span>
                <span>3 test donors</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Contributions</span>
                <span>3 records ($50 -- $250)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Disbursements</span>
                <span>3 records ($1.75 -- $2,500)</span>
              </div>
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
