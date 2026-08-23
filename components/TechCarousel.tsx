"use client";

import { techCarousel } from "@/lib/data";
import { Sparkles, Terminal } from "lucide-react";

export default function TechCarousel() {
  const items = [...techCarousel, ...techCarousel, ...techCarousel];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.08] bg-slate-950/40 py-8 sm:py-10">
      {/* Edge Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-base to-transparent" />

      {/* Marquee Row */}
      <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
        {items.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="glass-card group flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-slate-900/60 px-5 py-2.5 shadow-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:shadow-glow-sm cursor-default"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-glow transition-all" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300 group-hover:text-white font-medium">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}