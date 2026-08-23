"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Sparkles } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import clsx from "clsx";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
        scrolled ? "py-2.5 sm:py-3.5" : "py-4 sm:py-6"
      )}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div
          className={clsx(
            "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "glass-card border-white/10 bg-slate-950/80 shadow-glass backdrop-blur-xl"
              : "border border-white/[0.06] bg-slate-950/40 backdrop-blur-md"
          )}
        >
          {/* Logo with interactive avatar badge */}
          <Link href="/" data-cursor-hover className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent font-display text-sm font-bold text-primary shadow-glow-sm transition-all group-hover:border-primary group-hover:shadow-glow">
              <span>{profile.initials}</span>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-base bg-emerald-500" />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                Sourav<span className="text-primary">.dev</span>
              </span>
              <span className="hidden font-mono text-[0.62rem] text-dim sm:inline-block">
                EE • Security • Web
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor-hover
                  className={clsx(
                    "relative flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-all",
                    active ? "text-white font-medium" : "text-dim hover:text-white"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 shadow-glow-sm"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  {"live" in link && link.live && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                    </span>
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions & Mobile trigger */}
          <div className="flex items-center gap-2.5">
            {/* Status indicator */}
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[0.65rem] uppercase tracking-wider">Open to Work</span>
            </div>

            {/* Resume button */}
            <a
              href={profile.resume}
              download
              data-cursor-hover
              className="group relative hidden sm:inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-highlight to-secondary px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] font-semibold text-slate-950 shadow-glow transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <FileText className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
              <span>Resume</span>
              <Sparkles className="h-3 w-3 opacity-70" />
            </a>

            {/* Mobile menu toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-primary/40 md:hidden"
            >
              {open ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-[1240px] px-4 md:hidden"
          >
            <div className="glass-card flex flex-col gap-1.5 rounded-3xl p-4 border border-primary/20 bg-slate-950/95 shadow-glass">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 font-mono text-xs uppercase tracking-wider transition-all",
                    pathname === link.href
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-white font-medium border border-primary/30"
                      : "text-dim hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {"live" in link && link.live && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                      </span>
                    )}
                    <span>{link.label}</span>
                  </div>
                  {pathname === link.href && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </Link>
              ))}

              <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center justify-between px-2 py-1 text-emerald-400 font-mono text-xs">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Internships
                  </span>
                  <span className="text-dim">2026</span>
                </div>
                <a
                  href={profile.resume}
                  download
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-4 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold text-slate-950 shadow-glow"
                >
                  <FileText className="h-4 w-4" /> Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}