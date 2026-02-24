export interface WhitePaperEntry {
  id: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  pdfPath: string;
}

export const whitePaperConfig: Record<string, WhitePaperEntry[]> = {
  "tax-reform": [
    {
      id: "the-12-percent-plan",
      eyebrow: "TAX REFORM WHITE PAPER",
      headline: "The 12% Plan",
      subheadline: "A Unified Flat Tax for All American Income",
      pdfPath: "/documents/the-12-percent-plan.pdf",
    },
    {
      id: "american-family-growth-credit",
      eyebrow: "FAMILY TAX CREDIT WHITE PAPER",
      headline: "The American Family Growth Credit",
      subheadline: "The Most Aggressive Pro-Family Tax Policy in the Developed World",
      pdfPath: "/documents/american-family-growth-credit.pdf",
    },
    {
      id: "corporate-codetermination-act",
      eyebrow: "WORKERS' RIGHTS WHITE PAPER",
      headline: "The Corporate Codetermination Act",
      subheadline: "Worker Representation on Corporate Boards — Modeled on Germany's Proven System",
      pdfPath: "/documents/corporate-codetermination-act.pdf",
    },
  ],
  "digital-voting": [
    {
      id: "the-civic-platform",
      eyebrow: "DIGITAL VOTING WHITE PAPER",
      headline: "The Civic Platform",
      subheadline: "A Secure, Accessible, and Verifiable Digital Voting System for American Democracy",
      pdfPath: "/documents/the-civic-platform.pdf",
    },
  ],
  "healthcare": [
    {
      id: "the-two-tier-plan",
      eyebrow: "HEALTHCARE WHITE PAPER",
      headline: "The Two-Tier Plan",
      subheadline: "Universal Baseline Coverage with a Private Supplemental Market",
      pdfPath: "/documents/the-two-tier-plan.pdf",
    },
  ],
  "education": [
    {
      id: "the-education-baseline",
      eyebrow: "EDUCATION WHITE PAPER",
      headline: "The Education Baseline",
      subheadline: "Free Public Education Through a Bachelor's Degree — and the Math to Pay for It",
      pdfPath: "/documents/the-education-baseline.pdf",
    },
  ],
  "government-reform": [
    {
      id: "the-accountability-framework",
      eyebrow: "GOVERNMENT REFORM WHITE PAPER",
      headline: "The Accountability Framework",
      subheadline: "Six Interlocking Reforms to Fix the Broken Incentive Structure of American Government",
      pdfPath: "/documents/the-accountability-framework.pdf",
    },
    {
      id: "corporate-codetermination-act",
      eyebrow: "WORKERS' RIGHTS WHITE PAPER",
      headline: "The Corporate Codetermination Act",
      subheadline: "Worker Representation on Corporate Boards — Modeled on Germany's Proven System",
      pdfPath: "/documents/corporate-codetermination-act.pdf",
    },
  ],
  "housing": [
    {
      id: "build-more-homes",
      eyebrow: "HOUSING WHITE PAPER",
      headline: "Build More Homes",
      subheadline: "A National Strategy to End the Housing Shortage, Ban Institutional Buyers, and Restore Affordability",
      pdfPath: "/documents/build-more-homes.pdf",
    },
  ],
  "term-limits": [
    {
      id: "12-years-and-out",
      eyebrow: "TERM LIMITS WHITE PAPER",
      headline: "12 Years and Out",
      subheadline: "The Case for Congressional Term Limits and the End of the Permanent Political Class",
      pdfPath: "/documents/12-years-and-out.pdf",
    },
  ],
  "criminal-justice": [
    {
      id: "safe-and-fair",
      eyebrow: "CRIMINAL JUSTICE WHITE PAPER",
      headline: "Safe and Fair",
      subheadline: "Evidence-Based Criminal Justice Reform That Reduces Crime and Saves Money",
      pdfPath: "/documents/safe-and-fair.pdf",
    },
  ],
  "energy-and-environment": [
    {
      id: "the-energy-race",
      eyebrow: "ENERGY & ENVIRONMENT WHITE PAPER",
      headline: "The Energy Race",
      subheadline: "A National Innovation Strategy for Next-Generation Energy Dominance",
      pdfPath: "/documents/the-energy-race.pdf",
    },
  ],
  "immigration": [
    {
      id: "secure-and-streamlined",
      eyebrow: "IMMIGRATION WHITE PAPER",
      headline: "Secure and Streamlined",
      subheadline: "A Border Security and Legal Immigration Framework That Actually Works",
      pdfPath: "/documents/secure-and-streamlined.pdf",
    },
  ],
  "national-security": [
    {
      id: "strong-and-accountable",
      eyebrow: "NATIONAL SECURITY WHITE PAPER",
      headline: "Strong and Accountable",
      subheadline: "A Modern Defense Strategy Built on Audit, Innovation, and Allied Burden-Sharing",
      pdfPath: "/documents/strong-and-accountable.pdf",
    },
  ],
  "gun-reform": [
    {
      id: "responsible-and-protected",
      eyebrow: "GUN REFORM WHITE PAPER",
      headline: "Responsible and Protected",
      subheadline: "Universal Background Checks, Due-Process Red-Flag Laws, and a Second Amendment That Works for Everyone",
      pdfPath: "/documents/responsible-and-protected.pdf",
    },
  ],
  "polis-doctorate": [
    {
      id: "qualified-to-govern",
      eyebrow: "POLIS DOCTORATE WHITE PAPER",
      headline: "Qualified to Govern",
      subheadline: "The Case for a Professional Credential for Federal Office",
      pdfPath: "/documents/qualified-to-govern.pdf",
    },
  ],
  "veterans": [
    {
      id: "the-service-standard",
      eyebrow: "VETERANS WHITE PAPER",
      headline: "The Service Standard",
      subheadline: "7-Day Access, Digital Modernization, and a Veterans System Built on Outcomes",
      pdfPath: "/documents/the-service-standard.pdf",
    },
  ],
  "lgb-rights": [
    {
      id: "equal-under-the-law",
      eyebrow: "LGB RIGHTS WHITE PAPER",
      headline: "Equal Under the Law",
      subheadline: "Marriage, Family, Anti-Discrimination Protections, and Religious Liberty — Without Contradiction",
      pdfPath: "/documents/equal-under-the-law.pdf",
    },
  ],
};
