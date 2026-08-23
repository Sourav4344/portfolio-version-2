"use client";

import { motion } from "framer-motion";

export default function WaveDivider() {
  return (
    <div className="relative mx-auto max-w-[1180px] px-[6%]" aria-hidden>
      <svg viewBox="0 0 1000 60" className="block h-10 w-full" preserveAspectRatio="none">
        <path
          d="M0,30 C40,30 40,8 80,8 C120,8 120,52 160,52 C200,52 200,30 240,30 L400,30 C440,30 440,8 480,8 C520,8 520,52 560,52 C600,52 600,30 640,30 L1000,30"
          fill="none"
          stroke="rgba(232,163,77,0.35)"
          strokeWidth="1.5"
        />
        <motion.circle
          r="4"
          fill="#6fe3ff"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            offsetPath:
              "path('M0,30 C40,30 40,8 80,8 C120,8 120,52 160,52 C200,52 200,30 240,30 L400,30 C440,30 440,8 480,8 C520,8 520,52 560,52 C600,52 600,30 640,30 L1000,30')",
            filter: "drop-shadow(0 0 6px #6fe3ff)",
          }}
        />
      </svg>
    </div>
  );
}
