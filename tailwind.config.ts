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
        graphite: "#030508",
        bgDark: "#030508",
        bgCard: "#070a13",
        panel: "rgba(7, 10, 19, 0.45)",
        line: "rgba(255, 255, 255, 0.06)",
        muted: "#94a3b8",
        pearl: "#eef3ff",
        cyanSoft: "#00f2fe",
        violetSoft: "#9d4edd",
        emeraldSoft: "#10b981",
        accentRose: "#ff007f",
        accentPurple: "#b044ff",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(110, 231, 249, 0.12)",
        card: "0 24px 60px rgba(0, 0, 0, 0.28)",
        cyanGlow: "0 0 20px rgba(0, 242, 254, 0.15)",
        violetGlow: "0 0 20px rgba(157, 78, 221, 0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Arial", "sans-serif"],
      },
      animation: {
        "radar-spin": "radar-spin 6s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "terminal-blink": "terminal-blink 0.8s step-end infinite",
        "marquee-vertical": "marquee-vertical 20s linear infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        "radar-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", filter: "drop-shadow(0 0 5px rgba(0, 242, 254, 0.2))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(0, 242, 254, 0.6))" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "terminal-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "marquee-vertical": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
