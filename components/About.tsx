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
        className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-medium leading-tight text-porcelain"
      >
        The person <span className="text-copper">behind the code</span>
      </motion.h2>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="glass-card rounded-2xl p-7"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-arc">
              Who I Am
            </h3>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-porcelain/90">
              {about.who}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={3}
            className="glass-card rounded-2xl p-7"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-arc">
              Future Goals
            </h3>
            <ul className="mt-4 space-y-3">
              {about.goals.map((g, i) => (
                <li key={i} className="flex items-start gap-3 text-porcelain/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
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
          className="glass-card rounded-2xl p-7"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-arc">
            Education
          </h3>
          <p className="mt-4 font-display text-lg text-porcelain">
            {about.education.degree}
          </p>
          <p className="mt-1 text-sm text-dim">{about.education.school}</p>
          <p className="mt-1 font-mono text-xs text-copper">
            {about.education.status}
          </p>

          <div className="mt-8 grid grid-cols-5 gap-2.5">
            {about.education.semesters.map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="relative mx-auto h-24 w-7 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{
                      height: s.value === "--" ? "10%" : `${Number(s.value) * 10}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.9, ease: "easeOut" }}
                    className={`absolute bottom-0 left-0 right-0 rounded-full ${
                      s.latest
                        ? "bg-gradient-to-t from-arc to-arc/40 animate-pulse"
                        : s.pending
                        ? "bg-gradient-to-t from-dim/60 to-dim/20"
                        : "bg-gradient-to-t from-copper to-copper/40"
                    }`}
                  />
                </div>
                <div className="mt-2 font-mono text-[0.62rem] text-porcelain/90">
                  {s.latest ? "ON" : s.pending ? "TBD" : s.value}
                </div>
                <div className="font-mono text-[0.56rem] uppercase tracking-wider text-dim">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-wider text-dim">
            Sem 4 result awaited · Sem 5 in progress
          </p>

          <div className="mt-8 space-y-3 border-t border-white/10 pt-5">
            {about.education.prior.map((p) => (
              <div
                key={p.label}
                className="flex items-center justify-between font-mono text-xs"
              >
                <span className="text-dim">{p.label}</span>
                <span className="text-porcelain">{p.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
