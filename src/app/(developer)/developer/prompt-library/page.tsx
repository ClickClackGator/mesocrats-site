"use client";

import { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import Badge from "../../components/Badge";
import { templates } from "./data";
import type { Difficulty } from "./data";

/* ------------------------------------------------------------------ */
/*  How It Works                                                       */
/* ------------------------------------------------------------------ */

const steps = [
  {
    num: 1,
    title: "Choose a template",
    description: "Browse prompts by category and difficulty level.",
  },
  {
    num: 2,
    title: "Fill in the [PLACEHOLDERS]",
    description: "Replace bracketed values with your details.",
  },
  {
    num: 3,
    title: "Paste into an AI assistant",
    description: "Works with Claude.ai, ChatGPT, or any major LLM.",
  },
  {
    num: 4,
    title: "Get working code",
    description: "Receive production-ready code and step-by-step guidance.",
  },
];

function HowItWorks() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#12121F] p-6 md:p-8 mb-12">
      <h3 className="text-lg font-bold text-white mb-6">
        How the Prompt Path Works
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.num} className="flex flex-col items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#6C3393]/20 text-[#A06BC8] flex items-center justify-center text-sm font-bold shrink-0">
              {step.num}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{step.title}</p>
              <p className="text-sm text-gray-500 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter bar                                                         */
/* ------------------------------------------------------------------ */

type FilterValue = "All" | Difficulty;

const filters: FilterValue[] = ["All", "Starter", "Intermediate", "Advanced"];

function FilterBar({
  active,
  onChange,
}: {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === f
              ? "bg-white/10 text-white border border-white/15"
              : "bg-white/[0.03] text-gray-400 border border-transparent hover:bg-white/[0.06] hover:text-gray-300"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Template card                                                      */
/* ------------------------------------------------------------------ */

const difficultyVariant: Record<Difficulty, "green" | "purple" | "red"> = {
  Starter: "green",
  Intermediate: "purple",
  Advanced: "red",
};

const categoryVariant: Record<string, "blue" | "cyan"> = {
  "Compliance API": "blue",
  "Party Formation API": "cyan",
  "Election Calendar API": "cyan",
};

function TemplateCard({
  template,
  isExpanded,
  onToggle,
}: {
  template: (typeof templates)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(template.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-xl border border-white/[0.06] bg-[#12121F] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-lg hover:shadow-white/5">
      <button
        onClick={onToggle}
        className="w-full text-left p-6"
      >
        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3">
          <Badge
            text={template.category}
            variant={categoryVariant[template.category] || "blue"}
          />
          <Badge
            text={template.difficulty}
            variant={difficultyVariant[template.difficulty]}
          />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-2">
          {template.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {template.description}
        </p>

        {/* Toggle text */}
        <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-500">
          <span>
            {isExpanded ? "Click to collapse" : "Click to view prompt"}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          >
            <path d="M3 4.5L6 7.5L9 4.5" />
          </svg>
        </div>
      </button>

      {/* Expanded prompt */}
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="relative">
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`absolute top-3 right-3 z-10 px-3 py-1.5 rounded-md text-xs font-medium text-white transition-colors ${
                copied ? "bg-emerald-500" : "bg-[#6C3393] hover:bg-[#6C3393]/80"
              }`}
            >
              {copied ? "Copied!" : "Copy Prompt"}
            </button>

            {/* Prompt text */}
            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-4 pt-12 font-dev-mono text-xs leading-relaxed text-gray-200 whitespace-pre-wrap overflow-y-auto max-h-[300px]">
              {template.prompt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Security reminder                                                  */
/* ------------------------------------------------------------------ */

function SecurityReminder() {
  return (
    <div className="mt-12 rounded-lg border-l-4 border-amber-500 bg-amber-500/5 border border-amber-500/20 p-5">
      <div className="flex items-start gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-white mb-1">
            Security Reminder
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Never paste your API key directly into an AI prompt. Use environment
            variables (
            <code className="font-dev-mono text-amber-400">
              process.env.MCE_API_KEY
            </code>
            ) in all generated code. The prompts in this library are designed to
            follow this practice.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PromptLibraryPage() {
  const [filter, setFilter] = useState<FilterValue>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    filter === "All"
      ? templates
      : templates.filter((t) => t.difficulty === filter);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <SectionHeader
        eyebrow="The Prompt Path"
        title="Prompt Library"
        subtitle="Copy-paste prompt templates that work with Claude.ai, ChatGPT, and any major LLM. No API key or coding experience required -- just paste and build."
      />

      <HowItWorks />

      <FilterBar active={filter} onChange={setFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isExpanded={expandedId === template.id}
            onToggle={() => toggleExpand(template.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">
            No templates match the selected filter.
          </p>
        </div>
      )}

      <SecurityReminder />
    </div>
  );
}
