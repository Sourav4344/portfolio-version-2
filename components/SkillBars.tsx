"use client";

import { useState } from "react";
import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Layout, Shield, Wrench, Terminal, Users, Sparkles } from "lucide-react";
import clsx from "clsx";

const GROUP_ICONS: Record<string, typeof Code> = {
  "Programming Languages": Code,
  "Frontend": Layout,
  "Cybersecurity": Shield,
  "Tools & Platforms": Wrench,
  "Operating Systems": Terminal,
  "Soft Skills": Users,
};

function SkillMeter({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-display text-sm font-semibold text-white group-hover:text-primary transition-colors">
          {name}
        </span>
        <span className="font-mono text-xs text-primary font-bold">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-950 border border-white/10 p-0.5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-glow-sm"
        />
      </div>
    </div>
  );
}

export default function SkillBars() {
  const [selectedGroup, setSelectedGroup] = useState<string>("All");

  const displayedGroups =
    selectedGroup === "All"
      ? skillGroups
      : skillGroups.filter((g) => g.label === selectedGroup);

  return (
    <section id="skills" className="section-wrap">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Technical Arsenal"
          title="Skills &amp; Competencies"
          copy="Engineering foundations, development tools, and offensive security capabilities."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/[0.08] bg-slate-950/60 p-1.5 backdrop-blur-md">
          <button
            onClick={() => setSelectedGroup("All")}
            className={clsx(
              "rounded-xl px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all",
              selectedGroup === "All"
                ? "bg-gradient-to-r from-primary to-secondary text-slate-950 font-bold shadow-glow-sm"
                : "text-dim hover:text-white"
            )}
          >
            All
          </button>
          {skillGroups.map((g) => (
            <button
              key={g.label}
              onClick={() => setSelectedGroup(g.label)}
              className={clsx(
                "rounded-xl px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all",
                selectedGroup === g.label
                  ? "bg-primary/20 text-primary border border-primary/40 font-bold"
                  : "text-dim hover:text-white"
              )}
            >
              {g.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {displayedGroups.map((group, gi) => {
            const Icon = GROUP_ICONS[group.label] || Sparkles;
            return (
              <motion.div
                key={group.label}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card glass-card-interactive flex flex-col justify-between rounded-3xl p-6 sm:p-7 border-white/[0.08]"
              >
                <div>
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-display text-sm font-bold text-white">
                        {group.label}
                      </h3>
                    </div>
                    <span className="font-mono text-[0.62rem] text-faint">
                      {group.skills.length} items
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-col gap-5">
                    {group.skills.map((s, i) => (
                      <SkillMeter
                        key={s.name}
                        name={s.name}
                        level={s.level}
                        delay={i * 0.08}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}