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
        graphite: "#080A10",
        panel: "rgba(255, 255, 255, 0.055)",
        line: "rgba(255, 255, 255, 0.12)",
        muted: "#9AA4B2",
        pearl: "#EEF3FF",
        cyanSoft: "#6EE7F9",
        violetSoft: "#BCA7FF",
        emeraldSoft: "#7DD3A7",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(110, 231, 249, 0.12)",
        card: "0 24px 60px rgba(0, 0, 0, 0.28)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
