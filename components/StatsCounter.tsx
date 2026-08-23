"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { FolderGit2, BookOpen, Cpu, Calendar } from "lucide-react";
import { stats } from "@/lib/data";

const ICONS = [FolderGit2, BookOpen, Cpu, Calendar];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section id="stats" className="relative border-y border-white/[0.08] bg-slate-950/60 backdrop-blur-md">
      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {stats.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card glass-card-interactive group relative flex flex-col items-center justify-center rounded-2xl p-6 text-center border-white/[0.08]"
              >
                {/* Floating Icon Badge */}
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  <span className="gradient-text">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                </div>

                <div className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim group-hover:text-white transition-colors">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}