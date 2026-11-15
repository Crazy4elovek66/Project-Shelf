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
        void: "#050507",
        surface: "#0C0D12",
        elevated: "#13151E",
        hairline: "rgba(255, 255, 255, 0.09)",
        accentCyan: "#38BDF8",
        accentEmerald: "#10B981",
        accentViolet: "#8B5CF6",
        editorial: {
          bg: "#F3F4F6",
          ink: "#09090B",
          muted: "#4B5563",
          border: "rgba(9, 9, 11, 0.12)",
        },
        graphite: "#030508",
        bgDark: "#050507",
        bgCard: "#0C0D12",
        panel: "rgba(12, 13, 18, 0.65)",
        line: "rgba(255, 255, 255, 0.08)",
        pearl: "#eef3ff",
        cyanSoft: "#38BDF8",
        violetSoft: "#8B5CF6",
        emeraldSoft: "#10B981",
      },
      boxShadow: {
        glow: "0 20px 80px rgba(56, 189, 248, 0.12)",
        emeraldGlow: "0 20px 80px rgba(16, 185, 129, 0.12)",
        violetGlow: "0 20px 80px rgba(139, 92, 246, 0.14)",
        card: "0 24px 60px rgba(0, 0, 0, 0.45)",
        dock: "0 10px 40px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Arial", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "radar-spin": "radar-spin 6s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "terminal-blink": "terminal-blink 0.8s step-end infinite",
        "float": "float 5s ease-in-out infinite",
        "marquee-left": "marquee-left 32s linear infinite",
        "marquee-right": "marquee-right 32s linear infinite",
      },
      keyframes: {
        "radar-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", filter: "drop-shadow(0 0 5px rgba(56, 189, 248, 0.2))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(56, 189, 248, 0.6))" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "terminal-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
