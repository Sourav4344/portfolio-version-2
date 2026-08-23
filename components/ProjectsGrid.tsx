"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Github, ExternalLink, Search, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import clsx from "clsx";

const FILTERS = ["All", "Web", "Mobile", "Cybersecurity", "Personal", "College"];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = filter === "All" || p.categories.includes(filter);
      const matchesSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.stack.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  const active = projects.find((p) => p.id === activeId) ?? null;

  return (
    <>
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const count =
              f === "All"
                ? projects.length
                : projects.filter((p) => p.categories.includes(f)).length;

            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor-hover
                className={clsx(
                  "flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                  filter === f
                    ? "border-primary bg-primary/15 text-primary font-bold shadow-glow-sm"
                    : "border-white/[0.08] bg-slate-950/40 text-dim hover:border-primary/40 hover:text-white"
                )}
              >
                <span>{f}</span>
                <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[0.62rem] text-slate-300">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dim" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stack or title..."
            className="w-full rounded-full border border-white/10 bg-slate-900/80 py-2 pl-10 pr-4 text-xs text-white placeholder-dim outline-none backdrop-blur-md transition-all focus:border-primary/50 focus:shadow-glow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-dim hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Projects */}
      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpen={() => setActiveId(p.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="glass-card mt-12 flex flex-col items-center justify-center rounded-3xl p-12 text-center border-white/[0.08]">
          <Layers className="h-10 w-10 text-primary/40 mb-3" />
          <h4 className="font-display text-base font-bold text-white">No projects found</h4>
          <p className="mt-1 text-sm text-dim">
            Try adjusting your search query or switching category filters.
          </p>
          <button
            onClick={() => {
              setFilter("All");
              setSearch("");
            }}
            className="mt-4 font-mono text-xs text-primary underline hover:text-highlight"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Project Architectural Inspector Modal */}
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
              {/* Modal Header */}
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
    </>
  );
}