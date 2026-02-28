interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  href?: string;
}

export default function Card({
  children,
  className = "",
  glowColor,
  href,
}: CardProps) {
  const baseStyles =
    "group relative rounded-xl border border-white/[0.06] bg-[#12121F] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12]";

  const glowStyles = glowColor
    ? `hover:shadow-[0_0_30px_-5px_${glowColor}]`
    : "hover:shadow-lg hover:shadow-white/5";

  if (href) {
    return (
      <a
        href={href}
        className={`block ${baseStyles} ${glowStyles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <div className={`${baseStyles} ${glowStyles} ${className}`}>
      {children}
    </div>
  );
}
