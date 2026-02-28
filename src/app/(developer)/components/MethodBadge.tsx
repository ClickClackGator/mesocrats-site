interface MethodBadgeProps {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

const methodStyles: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  POST: "bg-[#4374BA]/15 text-[#6B9FE8] border-[#4374BA]/30",
  PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  PATCH: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  DELETE: "bg-[#EE2C24]/15 text-[#F06B65] border-[#EE2C24]/30",
};

export default function MethodBadge({ method }: MethodBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold font-dev-mono border ${methodStyles[method]}`}
    >
      {method}
    </span>
  );
}
