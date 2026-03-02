import { Metadata } from "next";
import { FileText, Download } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "White Papers | PartyStack",
  description:
    "In-depth technical documentation on the architecture, design decisions, and vision behind the Mesocratic Party's open political technology platform.",
};

/* ------------------------------------------------------------------ */
/*  White paper data                                                   */
/* ------------------------------------------------------------------ */

interface WhitePaper {
  title: string;
  description: string;
  version: string;
  date: string;
  filename: string;
  href: string;
}

// The Developer Platform white paper is always first -- it tells the story of developer.mesocrats.org
const whitePapers: WhitePaper[] = [
  {
    title: "The Developer Platform",
    description:
      "The vision and architecture behind developer.mesocrats.org -- why political technology should be open, how the PartyStack API works, the prompt engineering layer, and the open-source commitment that makes the platform available to every committee in America.",
    version: "v2.0",
    date: "March 2026",
    filename: "MP_Developer_Platform_v2.pdf",
    href: "/documents/developer/MP_Developer_Platform_v2.pdf",
  },
  {
    title: "The Mesocratic Compliance Engine",
    description:
      "A comprehensive technical white paper covering the architecture, database schema, compliance engine, FEC report generation, IRS reporting, and public API design of the MCE platform. Covers the full stack from contribution validation to .fec file export.",
    version: "v2.0",
    date: "March 2026",
    filename: "MP_The_Mesocratic_Compliance_Engine_v2.pdf",
    href: "/documents/developer/MP_The_Mesocratic_Compliance_Engine_v2.pdf",
  },
];

/* ------------------------------------------------------------------ */
/*  White paper card                                                   */
/* ------------------------------------------------------------------ */

function WhitePaperCard({ paper }: { paper: WhitePaper }) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 flex flex-col">
      <div className="mb-5">
        <FileText className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">{paper.title}</h3>

      <p className="text-sm text-gray-500 mb-4">
        Version {paper.version} -- {paper.date}
      </p>

      <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
        {paper.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 uppercase tracking-wider">
          White Paper
        </span>
        <a
          href={paper.href}
          download={paper.filename}
          className="inline-flex items-center gap-2 bg-[#4374BA] text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-[#4374BA]/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WhitePapersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-block mb-4 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 uppercase tracking-wider">
          Technical Documentation
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          White Papers
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl leading-relaxed">
          In-depth technical documentation on the architecture, design
          decisions, and vision behind the Mesocratic Party&#39;s open political
          technology platform.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {whitePapers.map((paper) => (
          <WhitePaperCard key={paper.filename} paper={paper} />
        ))}
      </div>

      {/* Bottom callout */}
      <div className="bg-[#111827]/50 border border-gray-800 rounded-xl p-8 text-center">
        <p className="text-gray-500 text-sm">
          More white papers are published as the platform grows. Check back as
          new APIs and capabilities are documented.
        </p>
      </div>
    </div>
  );
}
