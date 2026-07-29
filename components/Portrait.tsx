"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Portrait() {
  return (
    <div className="relative mx-auto flex h-full w-full items-center justify-center">
      {/* ambient glow */}
      <div
        className="absolute h-[78%] w-[78%] rounded-full bg-copper/25 blur-[70px]"
        aria-hidden
      />
      <div
        className="absolute h-[55%] w-[55%] rounded-full bg-arc/15 blur-[60px]"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.9, delay: 0.4 },
          scale: { duration: 0.9, delay: 0.4 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
        className="relative aspect-square w-[68%] max-w-[320px]"
      >
        {/* slow rotating dashed orbit ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] animate-[spin_22s_linear_infinite]"
          aria-hidden
        >
          <circle
            cx="100"
            cy="100"
            r="96"
            fill="none"
            stroke="#e8a34d"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            strokeDasharray="2 10"
          />
        </svg>

        {/* counter-rotating fine ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute -inset-2.5 h-[calc(100%+1.25rem)] w-[calc(100%+1.25rem)] animate-[spin_30s_linear_infinite_reverse]"
          aria-hidden
        >
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="#6fe3ff"
            strokeOpacity="0.35"
            strokeWidth="0.8"
            strokeDasharray="1 6"
          />
        </svg>

        {/* photo frame */}
        <div className="absolute inset-0 overflow-hidden rounded-full border border-copper/40 bg-panel shadow-[0_0_40px_-6px_rgba(232,163,77,0.45)]">
          <Image
            src="/images/sourav-profile.png"
            alt="Sourav Maji"
            fill
            priority
            sizes="320px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>

        {/* corner accent nodes */}
        <span className="absolute -right-1 top-6 h-1.5 w-1.5 rounded-full bg-arc shadow-[0_0_8px_2px_rgba(111,227,255,0.8)]" />
        <span className="absolute -left-1 bottom-10 h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_8px_2px_rgba(232,163,77,0.8)]" />
      </motion.div>
    </div>
  );
}
