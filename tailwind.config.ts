import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "nb-bg": "#F8F4E3",
        "nb-surface": "#FFFFFF",
        "nb-text": "#111111",
        "nb-muted": "#555555",
        "nb-border": "#111111",
        "nb-yellow": "#FFD447",
        "nb-pink": "#FF6B9A",
        "nb-blue": "#4D96FF",
        "nb-green": "#6BCB77",
        "nb-danger": "#FF4D4D",
      },
      boxShadow: {
        hard: "4px 4px 0px #111111",
        "hard-lg": "6px 6px 0px #111111",
        "hard-yellow": "4px 4px 0px #FFD447",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      borderRadius: {
        nb: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
