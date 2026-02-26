import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A",
        accent: {
          DEFAULT: "#6c3393",
          light: "#8244ab",
          dark: "#5a2a7d",
        },
        cta: {
          DEFAULT: "#ee2c24",
          light: "#f04d46",
        },
        secondary: {
          DEFAULT: "#4374ba",
          light: "#5687c9",
        },
        "brand-purple": "#6c3393",
        gray: {
          light: "#F2F2F2",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
