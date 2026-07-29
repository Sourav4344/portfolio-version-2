import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#050816",
        panel: "#0a0e24",
        panel2: "#0d1230",
        line: "rgba(148, 163, 255, 0.14)",
        primary: "#38BDF8",
        secondary: "#8B5CF6",
        highlight: "#00E5FF",
        ink: "#FFFFFF",
        dim: "#A3ADC2",
        faint: "#6B7394",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)",
        aurora:
          "radial-gradient(50% 40% at 20% 15%, rgba(56,189,248,0.20) 0%, transparent 70%), radial-gradient(45% 40% at 85% 20%, rgba(139,92,246,0.20) 0%, transparent 70%), radial-gradient(40% 35% at 50% 100%, rgba(0,229,255,0.10) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56,189,248,0.15), 0 8px 40px -8px rgba(56,189,248,0.25)",
        "glow-violet": "0 0 0 1px rgba(139,92,246,0.18), 0 8px 40px -8px rgba(139,92,246,0.30)",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulseSlow 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
