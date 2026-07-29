"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "@/lib/data";

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: (index % 2) * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-card group relative overflow-hidden rounded-2xl p-7 transition-shadow duration-300 hover:shadow-[0_0_40px_-8px_rgba(232,163,77,0.25)]"
      >
        <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-copper/0 via-copper/0 to-arc/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-copper/15 group-hover:to-arc/10" />

        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <span className="font-mono text-[0.65rem] tracking-[0.2em] text-copper">
            PROJECT // {project.id}
          </span>
          <h3 className="mt-3 font-display text-xl text-porcelain">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-dim">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.62rem] text-porcelain/80"
              >
                {s}
              </span>
            ))}
          </div>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-arc hover:text-porcelain"
            >
              View Live →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-wrap">
      <div className="eyebrow">PROJECTS</div>
      <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-medium leading-tight text-porcelain">
        Things I&apos;ve <span className="text-copper">built</span>
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
