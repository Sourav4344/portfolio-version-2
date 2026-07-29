"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";

const colors = ["#e8a34d", "#6fe3ff", "#39ff9e"];

function Orbit({
  group,
  color,
  index,
}: {
  group: (typeof skillGroups)[number];
  color: string;
  index: number;
}) {
  const size = 260;
  const center = size / 2;
  const baseRadius = 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em]" style={{ color }}>
        {group.label}
      </h3>

      <div className="relative mx-auto" style={{ width: size, height: size }}>
        {group.skills.map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: (baseRadius + i * 34) * 2,
              height: (baseRadius + i * 34) * 2,
              left: center - (baseRadius + i * 34),
              top: center - (baseRadius + i * 34),
              borderColor: `${color}22`,
            }}
          />
        ))}

        <div
          className="absolute flex items-center justify-center rounded-full font-mono text-[0.6rem] font-bold"
          style={{
            width: 46,
            height: 46,
            left: center - 23,
            top: center - 23,
            background: `${color}18`,
            border: `1px solid ${color}55`,
            color,
          }}
        >
          {group.label.slice(0, 2).toUpperCase()}
        </div>

        {group.skills.map((skill, i) => {
          const radius = baseRadius + i * 34;
          const duration = 14 + i * 6;
          return (
            <motion.div
              key={skill.name}
              className="absolute left-1/2 top-1/2"
              style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
              animate={{ rotate: 360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="group absolute flex items-center justify-center rounded-full"
                style={{
                  width: 14 + skill.level / 8,
                  height: 14 + skill.level / 8,
                  left: radius - (14 + skill.level / 8) / 2,
                  top: -(14 + skill.level / 8) / 2 + radius - radius,
                  background: color,
                  boxShadow: `0 0 ${8 + skill.level / 10}px ${color}`,
                }}
              >
                <span
                  className="pointer-events-none absolute -top-8 whitespace-nowrap rounded bg-void px-2 py-1 font-mono text-[0.6rem] text-porcelain opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                  style={{ transform: "rotate(0deg)" }}
                >
                  {skill.name} · {skill.level}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ul className="mt-3 space-y-1.5">
        {group.skills.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center justify-between font-mono text-[0.72rem] text-porcelain/80"
          >
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: color, boxShadow: `0 0 6px ${color}` }}
              />
              {skill.name}
            </span>
            <span className="text-dim">{skill.level}%</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-wrap">
      <div className="eyebrow">SKILLS</div>
      <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-medium leading-tight text-porcelain">
        Technical <span className="text-copper">capabilities</span>
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Orbit key={group.label} group={group} color={colors[i % colors.length]} index={i} />
        ))}
      </div>
    </section>
  );
}
