"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  onOpen,
  index = 0,
}: {
  project: Project;
  onOpen?: () => void;
  index?: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="glass-card group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative mb-5 h-36 overflow-hidden rounded-xl border border-line bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-4xl font-bold text-white/10">{project.id}</span>
            <div className="absolute inset-0 bg-grid bg-[size:20px_20px] opacity-30" />
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
        <span className="whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-wide text-faint">
          {project.timeline}
        </span>
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-dim">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((t) => (
          <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] text-primary">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div className="flex gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-dim hover:text-primary">
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-dim hover:text-primary">
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        {onOpen && (
          <button
            onClick={onOpen}
            data-cursor-hover
            className="flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-wide text-primary transition-colors hover:text-highlight"
          >
            Details <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
