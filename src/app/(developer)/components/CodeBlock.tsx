"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = "typescript",
  title,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="rounded-lg border border-white/[0.06] bg-[#0D0D1A] overflow-hidden font-dev-mono">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="text-xs text-gray-500">{title}</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-600 uppercase tracking-wider">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
      {!title && (
        <div className="flex justify-end px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
          <button
            onClick={handleCopy}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-gray-600 w-8 shrink-0 text-right mr-4">
                    {i + 1}
                  </span>
                )}
                <span className="text-gray-300">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
