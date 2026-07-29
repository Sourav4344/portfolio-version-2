"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";

export default function AboutIntro() {
  const words = about.who.split(" ");

  return (
    <section className="section-wrap !pb-0 relative">
      {/* decorative floating glow */}
      <motion.div
        animate={{ y: [0, -14, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 12, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute right-0 top-10 h-32 w-32 rounded-full bg-secondary/20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="eyebrow relative"
      >
        About Me
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } },
        }}
        className="relative max-w-2xl text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-4xl"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mr-[0.3em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: words.length * 0.035 + 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-6 h-px w-40 origin-left bg-gradient-to-r from-primary via-secondary to-transparent"
      />
    </section>
  );
}