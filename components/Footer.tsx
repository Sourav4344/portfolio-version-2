"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile, navLinks } from "@/lib/data";
import SocialLinks from "./SocialLinks";
import BackToTop from "./BackToTop";
import { Sparkles, Terminal, Activity, Clock, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-slate-950/90 backdrop-blur-2xl py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        {/* Top telemetry grid */}
        <div className="grid gap-8 md:grid-cols-3 items-center pb-10 border-b border-white/[0.06]">
          {/* Brand & Status */}
          <div className="flex flex-col gap-3">
            <Link href="/" data-cursor-hover className="group inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 font-display text-sm font-bold text-primary shadow-glow-sm transition-all group-hover:border-primary">
                {profile.initials}
              </div>
              <div>
                <span className="font-display text-base font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                  Sourav<span className="text-primary">.dev</span>
                </span>
                <p className="font-mono text-[0.65rem] text-dim">Electrical Engineer &amp; Developer</p>
              </div>
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-emerald-400 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-medium">Available for Hiring &amp; Collabs</span>
            </div>
          </div>

          {/* Quick Nav Links & Terminal prompt */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor-hover
                  className="font-mono text-xs uppercase tracking-wider text-dim hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 font-mono text-[0.68rem] text-dim">
              <Activity className="h-3 w-3 text-primary animate-pulse" />
              <span>Status: All Systems Nominal</span>
              <span className="text-white/30">•</span>
              <span>12ms</span>
            </div>
          </div>

          {/* Real-time Time & Social Links */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-dim">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>Kolkata, IN • {time || "IST"}</span>
            </div>

            <SocialLinks showEmail />
          </div>
        </div>

        {/* Bottom copyright and back-to-top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-faint">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Sourav Maji. Designed &amp; engineered with precision.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block text-[0.68rem] text-dim">
              RKMGEC Purulia • West Bengal
            </span>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}