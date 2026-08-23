"use client";

import { about } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { GraduationCap, Award, BookOpen, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function EducationCards() {
  const { education } = about;

  return (
    <section className="section-wrap">
      <SectionHeading
        eyebrow="Academic Background"
        title="Education &amp; Grades"
        copy="Formal coursework in Electrical Engineering at Ramkrishna Mahato Government Engineering College (RKMGEC), Purulia."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Main Degree Card */}
        <Reveal delay={0.1}>
          <div className="glass-card glass-card-interactive h-full rounded-3xl p-6 sm:p-8 border-white/[0.08]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-glow-sm">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {education.degree}
                  </h3>
                  <p className="mt-0.5 text-sm text-dim">
                    {education.school}
                  </p>
                  <p className="font-mono text-xs text-primary font-medium">
                    {education.affiliation}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/80 px-3.5 py-1.5 font-mono text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {education.status}
              </span>
            </div>

            {/* GPA Semester Progress Bars */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between font-mono text-xs text-dim">
                <span className="uppercase tracking-wider">Semester SGPA Track (Scale of 10)</span>
                <span className="text-primary font-medium">Sem 5 Ongoing</span>
              </div>

              <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5">
                {education.semesters.map((s, i) => {
                  const isNumber = !isNaN(Number(s.value));
                  const percentage = isNumber ? (Number(s.value) / 10) * 100 : 75;

                  return (
                    <div
                      key={s.label}
                      className={`flex flex-col items-center justify-between rounded-2xl border p-3 text-center transition-all ${
                        s.latest
                          ? "border-primary/40 bg-primary/10 shadow-glow-sm"
                          : "border-white/[0.08] bg-slate-900/60"
                      }`}
                    >
                      <span className="font-mono text-[0.68rem] uppercase font-semibold text-slate-300">
                        {s.label}
                      </span>

                      {/* Vertical Progress Tube */}
                      <div className="my-3 relative h-20 w-3 rounded-full bg-slate-950/80 overflow-hidden border border-white/10">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute bottom-0 inset-x-0 rounded-full ${
                            s.latest
                              ? "bg-gradient-to-t from-primary to-highlight animate-pulse"
                              : "bg-gradient-to-t from-secondary to-primary"
                          }`}
                        />
                      </div>

                      <span className={`font-display text-xs font-bold ${s.latest ? "text-primary" : "text-white"}`}>
                        {s.value === "In progress" ? "Active" : s.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Prior Academic Foundation */}
        <Reveal delay={0.2}>
          <div className="glass-card glass-card-interactive flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8 border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/10 text-secondary">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Academic Milestones
                </h3>
              </div>

              <p className="mt-3 text-sm text-dim leading-relaxed">
                Consistent top-tier academic performance throughout secondary and higher secondary education in West Bengal.
              </p>

              <div className="mt-6 space-y-4">
                {education.prior.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-slate-900/60 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="font-display text-sm font-semibold text-white">
                        {p.label}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold text-primary">
                      {p.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs font-mono text-dim">
              <span className="text-primary font-semibold">&gt; Focus:</span> Core Power Systems, Network Theory, Digital Electronics, and Embedded Programming.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}