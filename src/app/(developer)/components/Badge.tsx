interface BadgeProps {
  text: string;
  variant?: "blue" | "purple" | "red" | "cyan" | "green" | "gray";
  size?: "sm" | "md";
}

const variantStyles: Record<string, string> = {
  blue: "bg-[#4374BA]/15 text-[#6B9FE8] border-[#4374BA]/30",
  purple: "bg-[#6C3393]/15 text-[#A06BC8] border-[#6C3393]/30",
  red: "bg-[#EE2C24]/15 text-[#F06B65] border-[#EE2C24]/30",
  cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  gray: "bg-white/5 text-gray-400 border-white/10",
};

export default function Badge({ text, variant = "gray", size = "sm" }: BadgeProps) {
  const sizeStyles = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${variantStyles[variant]} ${sizeStyles}`}
    >
      {text}
    </span>
  );
}
