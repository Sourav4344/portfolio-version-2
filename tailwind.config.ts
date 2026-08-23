import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#030712",
        "base-dark": "#02040a",
        surface: "#070c1b",
        surface2: "#0d1428",
        panel: "#0a0f24",
        panel2: "#101738",
        line: "rgba(148, 163, 255, 0.12)",
        "line-bright": "rgba(0, 240, 255, 0.3)",
        primary: "#00F0FF",
        "primary-hover": "#38BDF8",
        secondary: "#818CF8",
        accent: "#A855F7",
        highlight: "#38BDF8",
        emerald: {
          glow: "#10B981",
        },
        ink: "#FFFFFF",
        dim: "#94A3B8",
        faint: "#64748B",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px)",
        dots: "radial-gradient(rgba(129, 140, 248, 0.15) 1px, transparent 1px)",
        aurora:
          "radial-gradient(60% 50% at 20% 15%, rgba(0, 240, 255, 0.16) 0%, transparent 70%), radial-gradient(55% 45% at 85% 25%, rgba(129, 140, 248, 0.18) 0%, transparent 70%), radial-gradient(45% 40% at 50% 90%, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(180deg, rgba(13, 20, 40, 0.75), rgba(7, 12, 27, 0.85))",
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(0, 240, 255, 0.35)",
        "glow-sm": "0 0 15px -3px rgba(0, 240, 255, 0.25)",
        "glow-violet": "0 0 25px -5px rgba(129, 140, 248, 0.35)",
        "glow-purple": "0 0 25px -5px rgba(168, 85, 247, 0.35)",
        "glow-emerald": "0 0 20px -4px rgba(16, 185, 129, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "inner-glow": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marqueeReverse 32s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        pulseSlow: "pulseSlow 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        radar: "radar 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        radar: {
          "0%": { transform: "scale(0.95)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;