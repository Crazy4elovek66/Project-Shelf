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
        void: "#050505",
        surface: "#0B0B0D",
        elevated: "#121215",
        hairline: "rgba(255, 255, 255, 0.12)",
        primary: "#FAFAFA",
        secondary: "#A1A1AA",
        muted: "#71717A",
        // Backward-compatible tokens if any component accesses them
        bgDark: "#050505",
        bgCard: "#0B0B0D",
        panel: "rgba(11, 11, 13, 0.85)",
        pearl: "#FAFAFA",
        cyanSoft: "#FAFAFA",
        violetSoft: "#A1A1AA",
        emeraldSoft: "#E4E4E7",
      },
      boxShadow: {
        hairline: "0 0 0 1px rgba(255, 255, 255, 0.12)",
        subtle: "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
        keycap: "0 3px 0 0 rgba(255, 255, 255, 0.25), 0 4px 12px rgba(0, 0, 0, 0.6)",
        keycapPressed: "0 1px 0 0 rgba(255, 255, 255, 0.25), 0 2px 6px rgba(0, 0, 0, 0.6)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"],
        sans: ["var(--font-mono)", "var(--font-space-grotesk)", "monospace"],
      },
      animation: {
        "terminal-blink": "terminal-blink 0.8s step-end infinite",
        "marquee-left": "marquee-left 28s linear infinite",
        "marquee-right": "marquee-right 28s linear infinite",
        "keycap-press": "keycap-press 4s ease-in-out infinite",
      },
      keyframes: {
        "terminal-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "keycap-press": {
          "0%, 85%, 100%": { transform: "translateY(0)" },
          "90%, 95%": { transform: "translateY(2px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
