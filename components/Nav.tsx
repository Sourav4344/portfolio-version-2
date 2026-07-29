"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import clsx from "clsx";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={clsx(
          "section-wrap flex max-w-[1200px] items-center justify-between !py-0 rounded-2xl transition-all duration-300",
          scrolled ? "glass-card px-5 py-3 shadow-glow" : "px-5 py-3 border border-transparent"
        )}
      >
        <Link href="/" data-cursor-hover className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 font-display text-sm font-bold text-primary transition-all group-hover:shadow-glow">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm tracking-wide text-white sm:block">
            Sourav<span className="text-primary">.</span>dev
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-hover
                className={clsx(
                  "relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                  active ? "text-white" : "text-dim hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.06] border border-primary/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download
            data-cursor-hover
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-base transition-all hover:bg-highlight hover:shadow-glow sm:flex"
          >
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="section-wrap !py-0 mt-2 max-w-[1200px] md:hidden"
          >
            <div className="glass-card flex flex-col gap-1 rounded-2xl p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-wide",
                    pathname === link.href ? "bg-white/[0.06] text-white" : "text-dim"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={profile.resume}
                download
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-mono text-sm uppercase tracking-wide text-base"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
