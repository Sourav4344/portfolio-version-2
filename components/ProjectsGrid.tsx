"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import clsx from "clsx";

const FILTERS = ["All", "Web", "AI", "Cybersecurity", "Python", "College", "Open Source"];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter)),
    [filter]
  );

  const active = projects.find((p) => p.id === activeId) ?? null;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            data-cursor-hover
            className={clsx(
              "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors",
              filter === f
                ? "border-primary bg-primary/10 text-primary"
                : "border-line text-dim hover:border-primary/40 hover:text-white"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setActiveId(p.id)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-dim">No projects in this category yet.</p>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-base/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl p-7 shadow-glow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-primary">{active.id}</span>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-white">{active.title}</h3>
                </div>
                <button
                  onClick={() => setActiveId(null)}
                  aria-label="Close"
                  data-cursor-hover
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-dim hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-dim">{active.description}</p>

              <div className="mt-5">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary">Features</div>
                <ul className="mt-2 space-y-1.5">
                  {active.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-white">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-highlight" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary">Challenges</div>
                <p className="mt-2 text-sm text-dim">{active.challenges}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {active.stack.map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] text-primary">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                {active.github && (
                  <a href={active.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-white hover:border-primary">
                    <Github className="h-4 w-4" /> Code
                  </a>
                )}
                {active.live && (
                  <a href={active.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-base hover:bg-highlight">
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {!active.github && !active.live && (
                  <span className="font-mono text-xs text-faint">Private project — not publicly deployed</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
