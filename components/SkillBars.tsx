"use client";

import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { motion } from "framer-motion";

function Bar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-white">{name}</span>
        <span className="font-mono text-xs text-primary">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-highlight"
        />
      </div>
    </div>
  );
}

export default function SkillBars() {
  return (
    <section id="skills" className="section-wrap">
      <SectionHeading
        eyebrow="Toolbox"
        title="Skills"
        copy="Self-assessed proficiency, honest about what's still developing."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 0.08}>
            <div className="glass-card h-full rounded-2xl p-6">
              <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {group.label}
              </h3>
              <div className="flex flex-col gap-4">
                {group.skills.map((s, i) => (
                  <Bar key={s.name} name={s.name} level={s.level} delay={i * 0.08} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
