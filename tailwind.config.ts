import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tokens pulled from the Momentum Academy logo
        navy: {
          50: "#eef2f8",
          100: "#d6e0ee",
          300: "#7f97c0",
          500: "#2d4d84",
          700: "#1A3A6B", // primary brand navy (matches existing DPP header color)
          800: "#132c52",
          900: "#0c1c36",
        },
        momentum: {
          50: "#eafaf3",
          100: "#c9f0dd",
          300: "#6dcfa8",
          500: "#2E8B72", // logo teal-green
          600: "#227a63",
          700: "#1b6350",
        },
        paper: "#F7F9F8",
        ink: "#12202B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(12, 28, 54, 0.18)",
        card: "0 2px 14px -4px rgba(12, 28, 54, 0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        rise: "rise 0.6s ease-out both",
        pulseRing: "pulseRing 1.6s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
