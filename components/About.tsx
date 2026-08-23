"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function About() {
  return (
    <section id="about" className="section-wrap">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="eyebrow"
      >
        ABOUT
      </motion.div>

      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        custom={1}
        className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight text-white"
      >
        The person <span className="gradient-text">behind the code</span>
      </motion.h2>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="glass-card rounded-3xl p-7 border-white/[0.08]"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              Who I Am
            </h3>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-slate-200">
              {about.who}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={3}
            className="glass-card rounded-3xl p-7 border-white/[0.08]"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
              Future Goals
            </h3>
            <ul className="mt-4 space-y-3">
              {about.goals.map((g, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {g}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
          className="glass-card rounded-3xl p-7 border-white/[0.08]"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Education
          </h3>
          <p className="mt-4 font-display text-lg font-bold text-white">
            {about.education.degree}
          </p>
          <p className="mt-1 text-sm text-dim">{about.education.school}</p>
          <p className="mt-1 font-mono text-xs text-primary">
            {about.education.status}
          </p>

          <div className="mt-8 space-y-3 border-t border-white/10 pt-5">
            {about.education.prior.map((p) => (
              <div
                key={p.label}
                className="flex items-center justify-between font-mono text-xs"
              >
                <span className="text-dim">{p.label}</span>
                <span className="text-white font-semibold">{p.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}