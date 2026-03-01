"use client";

import { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import Badge from "../../components/Badge";
import CodeBlock from "../../components/CodeBlock";

/* ------------------------------------------------------------------ */
/*  Tab types                                                          */
/* ------------------------------------------------------------------ */

type Language = "typescript" | "python" | "ruby";

const tabs: { id: Language; label: string; badge: string; badgeVariant: "green" | "purple" | "red" }[] = [
  { id: "typescript", label: "TypeScript / JavaScript", badge: "GA", badgeVariant: "green" },
  { id: "python", label: "Python", badge: "Coming Q3", badgeVariant: "purple" },
  { id: "ruby", label: "Ruby", badge: "Coming Q4", badgeVariant: "red" },
];

/* ------------------------------------------------------------------ */
/*  Code examples                                                      */
/* ------------------------------------------------------------------ */

const installExamples = {
  npm: `npm install @mesocrats/mce-sdk`,
  yarn: `yarn add @mesocrats/mce-sdk`,
  pnpm: `pnpm add @mesocrats/mce-sdk`,
};

const quickStartCode = `import { MesocraticClient } from "@mesocrats/mce-sdk";

const mce = new MesocraticClient({
  apiKey: process.env.MCE_API_KEY,
  // baseUrl: "https://api.mesocrats.org" (default)
  // sandbox: true (uses test data, no real filings)
});`;

const listContributionsCode = `// List itemized contributions for Q1 2026
const contributions = await mce.contributions.list({
  year: 2026,
  period: "Q1",
  itemized: true,
  limit: 50,
});

for (const c of contributions.data) {
  const dollars = (c.amount_cents / 100).toFixed(2);
  console.log(
    c.contributor_name,
    "-- $" + dollars,
    c.itemized ? "(itemized)" : "(unitemized)"
  );
}

// Paginate through all results
if (contributions.has_more) {
  const nextPage = await mce.contributions.list({
    year: 2026,
    period: "Q1",
    cursor: contributions.next_cursor,
  });
}`;

const generateReportCode = `// Generate FEC Form 3X for Q1 2026
const report = await mce.reports.generate({
  year: 2026,
  period: "Q1",
  format: "json",
  cashOnHandStart: 1500000, // $15,000.00
});

console.log("Total receipts:", report.summary.totalReceiptsCents);
console.log("Schedule A entries:", report.scheduleA.length);
console.log("Warnings:", report.warnings.length);

// Download the .fec electronic filing
const fecFile = await mce.reports.generate({
  year: 2026,
  period: "Q1",
  format: "fec",
});

await fs.writeFile("./filings/mnc_q1_2026.fec", fecFile);

// Generate IRS Form 8872 XML
const xml = await mce.reports.generate({
  year: 2026,
  period: "Q1",
  format: "8872xml",
  filingType: "InitalReport",
});

await fs.writeFile("./filings/form8872_q1_2026.xml", xml);`;

const recordDisbursementCode = `// Record a disbursement
const disbursement = await mce.disbursements.create({
  payee_name: "Capitol Printing Co.",
  amount_cents: 125000, // $1,250.00
  date: "2026-02-10",
  purpose: "Printing and mailing -- Q1 fundraising letters",
  category: "operating",
  payee_address_line1: "900 E Broad St",
  payee_address_city: "Richmond",
  payee_address_state: "VA",
  payee_address_zip: "23219",
  check_number: "1042",
});

console.log("Recorded:", disbursement.id);`;

const webhookVerificationCode = `import { MesocraticClient } from "@mesocrats/mce-sdk";
import { NextRequest, NextResponse } from "next/server";

const mce = new MesocraticClient({
  apiKey: process.env.MCE_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-mce-signature") || "";

  // Verify HMAC-SHA256 signature
  const isValid = mce.webhooks.verifySignature({
    payload: body,
    signature,
    secret: process.env.MCE_WEBHOOK_SECRET!,
  });

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  switch (event.type) {
    case "contribution.created":
      console.log("New contribution:", event.data.id);
      break;

    case "aggregate.threshold_crossed":
      console.log("Donor crossed $200:", event.data.donor_id);
      // Trigger best-efforts follow-up
      break;

    case "compliance.deadline_approaching":
      console.log("Deadline in", event.data.days_remaining, "days");
      break;
  }

  return NextResponse.json({ received: true });
}`;

/* ------------------------------------------------------------------ */
/*  TypeScript tab content                                             */
/* ------------------------------------------------------------------ */

function TypeScriptTab() {
  return (
    <div className="space-y-10">
      {/* Package info card */}
      <div className="rounded-xl border border-white/[0.06] bg-[#12121F] p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white font-dev-mono">
            @mesocrats/mce-sdk
          </h2>
          <Badge text="v1.0.0" variant="green" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
              Package
            </p>
            <p className="text-gray-300 font-dev-mono text-xs">
              @mesocrats/mce-sdk
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
              License
            </p>
            <p className="text-gray-300">MIT</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
              TypeScript
            </p>
            <p className="text-gray-300">Full types included</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
              Node.js
            </p>
            <p className="text-gray-300">&gt;= 18.0.0</p>
          </div>
        </div>
      </div>

      {/* Installation */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Installation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CodeBlock code={installExamples.npm} language="bash" title="npm" />
          <CodeBlock code={installExamples.yarn} language="bash" title="yarn" />
          <CodeBlock
            code={installExamples.pnpm}
            language="bash"
            title="pnpm"
          />
        </div>
      </div>

      {/* Quick Start */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Quick Start</h3>
        <CodeBlock
          code={quickStartCode}
          language="typescript"
          title="Initialize the client"
        />
      </div>

      {/* Usage examples */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Usage Examples</h3>
        <div className="space-y-6">
          <CodeBlock
            code={listContributionsCode}
            language="typescript"
            title="List contributions"
            showLineNumbers
          />
          <CodeBlock
            code={generateReportCode}
            language="typescript"
            title="Generate a report"
            showLineNumbers
          />
          <CodeBlock
            code={recordDisbursementCode}
            language="typescript"
            title="Record a disbursement"
            showLineNumbers
          />
          <CodeBlock
            code={webhookVerificationCode}
            language="typescript"
            title="Webhook verification (Next.js API route)"
            showLineNumbers
          />
        </div>
      </div>

      {/* OpenAPI spec */}
      <div className="rounded-xl border border-white/[0.06] bg-[#12121F] p-6">
        <h3 className="text-lg font-bold text-white mb-2">
          OpenAPI Specification
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          Machine-readable API description conforming to OpenAPI 3.1. Use it to
          generate client libraries, mock servers, or import into Postman,
          Insomnia, or any OpenAPI-compatible tool.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/developer/api-reference"
            className="inline-flex items-center px-4 py-2.5 rounded-lg border border-white/[0.08] text-sm font-medium text-gray-300 hover:bg-white/[0.04] hover:text-white transition-colors"
          >
            View Spec
          </a>
          <a
            href="/developer/openapi.json"
            className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#4374BA] text-sm font-medium text-white hover:bg-[#4374BA]/90 transition-colors"
          >
            Download JSON
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Coming soon tab content                                            */
/* ------------------------------------------------------------------ */

function ComingSoonTab({
  language,
  packageName,
  registry,
  timeline,
}: {
  language: string;
  packageName: string;
  registry: string;
  timeline: string;
}) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
          <span className="text-3xl font-dev-mono text-gray-500">
            {"{ }"}
          </span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          {language} SDK Coming Soon
        </h2>
        <p className="text-sm text-gray-500 font-dev-mono mb-1">
          {packageName}
        </p>
        <p className="text-sm text-gray-500 mb-2">{registry}</p>
        <Badge text={timeline} variant="purple" size="md" />
        <p className="text-sm text-gray-400 mt-6 leading-relaxed">
          In the meantime, use the REST API directly or the prompt templates in
          our Prompt Library.
        </p>
        <a
          href="/developer/prompt-library"
          className="inline-flex items-center gap-1.5 mt-4 text-sm text-[#4374BA] hover:text-[#6B9FE8] transition-colors"
        >
          Browse the Prompt Library
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5.25 3.5L8.75 7L5.25 10.5" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SDKsPage() {
  const [activeTab, setActiveTab] = useState<Language>("typescript");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <SectionHeader
        eyebrow="Client Libraries"
        title="SDKs & Libraries"
        subtitle="Official client libraries for the MCE platform. Fully typed, well-documented, and designed to get you from zero to first API call in minutes."
      />

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-white/[0.06] pb-2 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-white/[0.06] text-white font-semibold"
                : "text-gray-400 hover:text-gray-300 hover:bg-white/[0.03]"
            }`}
          >
            {tab.label}
            <Badge text={tab.badge} variant={tab.badgeVariant} />
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "typescript" && <TypeScriptTab />}
      {activeTab === "python" && (
        <ComingSoonTab
          language="Python"
          packageName="mesocrats-compliance"
          registry="PyPI"
          timeline="Coming Q3 2026"
        />
      )}
      {activeTab === "ruby" && (
        <ComingSoonTab
          language="Ruby"
          packageName="mesocrats-compliance"
          registry="RubyGems"
          timeline="Coming Q4 2026"
        />
      )}
    </div>
  );
}
