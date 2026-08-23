"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, Github, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function FeaturedProjects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const featured = projects.slice(0, 3);
  const active = projects.find((p) => p.id === activeId) ?? null;

  return (
    <section className="section-wrap">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          copy="A curated selection of shipped systems, software applications, and cybersecurity labs."
        />
        <Reveal delay={0.1}>
          <Link
            href="/projects"
            data-cursor-hover
            className="group flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] font-semibold text-primary transition-all hover:bg-primary hover:text-slate-950 hover:shadow-glow-sm"
          >
            <span>View All ({projects.length})</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            onOpen={() => setActiveId(p.id)}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-base/85 p-4 backdrop-blur-md"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-glass border-primary/20 bg-slate-950/95"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/20 px-2.5 py-0.5 font-mono text-xs text-primary font-semibold">
                      {active.id}
                    </span>
                    <span className="font-mono text-xs text-dim">{active.timeline}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                    {active.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveId(null)}
                  aria-label="Close"
                  data-cursor-hover
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-dim transition-colors hover:border-primary hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <p className="mt-5 text-[0.95rem] leading-relaxed text-slate-300">
                {active.description}
              </p>

              {/* Features List */}
              <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> Key Architectural Features
                </div>
                <ul className="mt-3 space-y-2">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Engineering Challenges */}
              <div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-secondary">
                  Challenges Solved
                </div>
                <p className="mt-2 text-sm leading-relaxed text-dim">{active.challenges}</p>
              </div>

              {/* Tech Stack */}
              <div className="mt-5">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-faint mb-2.5">
                  Technologies Used
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  {active.github && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:border-primary hover:text-primary"
                    >
                      <Github className="h-4 w-4" /> Source Code
                    </a>
                  )}
                  {active.live && (
                    <a
                      href={active.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold text-slate-950 shadow-glow transition-all hover:scale-105"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Deployment
                    </a>
                  )}
                  {!active.github && !active.live && (
                    <span className="font-mono text-xs text-faint">
                      Private system — source &amp; demo confidential
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setActiveId(null)}
                  className="font-mono text-xs text-dim hover:text-white transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}