"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "INIT KERNEL::PORTFOLIO_OS v2.8",
  "MOUNTING /dev/circuits...",
  "LOADING IDENTITY MODULE...",
  "CALIBRATING VOLTAGE RAILS...",
  "HANDSHAKE COMPLETE",
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1900;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      setLineIndex(Math.min(LINES.length - 1, Math.floor((pct / 100) * LINES.length)));
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setHidden(true);
          setTimeout(onDone, 700);
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-base"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              className="relative h-24 w-24"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(56,189,248,0.15)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - progress / 100)}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-primary">
                {progress}%
              </div>
            </motion.div>

            <div className="font-display text-2xl tracking-[0.3em] text-white">
              SOURAV<span className="text-primary">.</span>MAJI
            </div>

            <div className="h-5 font-mono text-[0.65rem] tracking-[0.2em] text-dim">
              {LINES[lineIndex]}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
