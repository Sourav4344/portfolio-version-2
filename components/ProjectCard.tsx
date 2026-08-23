"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight, Shield, Globe, Layers, Sparkles, Smartphone } from "lucide-react";
import type { Project } from "@/lib/data";

const CATEGORY_ICONS: Record<string, typeof Globe> = {
  Web: Globe,
  Mobile: Smartphone,
  Cybersecurity: Shield,
  AI: Sparkles,
  default: Layers,
};

export default function ProjectCard({
  project,
  onOpen,
  index = 0,
}: {
  project: Project;
  onOpen?: () => void;
  index?: number;
}) {
  const primaryCategory = project.categories[0] || "Web";
  const CatIcon = CATEGORY_ICONS[primaryCategory] || CATEGORY_ICONS.default;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="glass-card glass-card-interactive group relative flex flex-col overflow-hidden rounded-3xl p-5 sm:p-6 border-white/[0.08]"
    >
      {/* Top Media / Thumbnail Container */}
      <div className="relative mb-5 h-44 sm:h-48 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 380px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-grid bg-[size:24px_24px]">
            <span className="font-display text-5xl font-black text-white/[0.07]">{project.id}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

        {/* Floating Category & Status Chips */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-white backdrop-blur-md">
            <CatIcon className="h-3 w-3 text-primary" />
            {primaryCategory}
          </span>

          {project.live ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/80 px-2.5 py-0.5 font-mono text-[0.6rem] text-emerald-400 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-0.5 font-mono text-[0.6rem] text-dim backdrop-blur-md">
              {project.categories.includes("Cybersecurity") ? "Active Lab" : "Private Repo"}
            </span>
          )}
        </div>

        {/* Bottom Timeline Pill on Media */}
        <div className="absolute bottom-3 right-3 font-mono text-[0.62rem] text-dim bg-slate-950/70 px-2.5 py-0.5 rounded-md border border-white/10 backdrop-blur-sm">
          {project.timeline}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-dim line-clamp-2">
            {project.description}
          </p>

          {/* Key Feature Highlight */}
          {project.features && project.features.length > 0 && (
            <div className="mt-3.5 space-y-1">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="line-clamp-1">{project.features[0]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.65rem] text-primary group-hover:border-primary/30 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2 py-1 font-mono text-[0.65rem] text-dim">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  aria-label="GitHub Repository"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-dim transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  aria-label="Live Demo"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-dim transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {onOpen ? (
              <button
                onClick={onOpen}
                data-cursor-hover
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider font-semibold text-primary transition-all hover:bg-primary hover:text-slate-950 hover:shadow-glow-sm"
              >
                Details <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <a
                href={`/projects`}
                data-cursor-hover
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:text-white transition-colors"
              >
                Learn More <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}