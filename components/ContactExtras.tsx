"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, FileDown, ChevronDown, Check, Copy, MessageCircle, Sparkles } from "lucide-react";
import { profile, faqs } from "@/lib/data";
import SocialLinks from "./SocialLinks";
import Reveal from "./Reveal";

export function ContactInfo() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="glass-card glass-card-interactive rounded-3xl p-6 sm:p-8 border-white/[0.08]">
      <h3 className="font-display text-lg font-bold text-white">Direct Communication</h3>
      <p className="mt-1 text-xs text-dim">Feel free to copy details or start an instant chat.</p>

      <div className="mt-6 flex flex-col gap-4">
        {/* Email Row with Copy */}
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-slate-900/60 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-faint">Email</div>
              <a
                href={`mailto:${profile.email}`}
                className="text-xs font-semibold text-white hover:text-primary transition-colors truncate block max-w-[170px] sm:max-w-[220px]"
              >
                {profile.email}
              </a>
            </div>
          </div>
          <button
            onClick={() => handleCopy(profile.email, "email")}
            data-cursor-hover
            aria-label="Copy email"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-dim hover:border-primary hover:text-primary transition-colors"
          >
            {copiedKey === "email" ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* WhatsApp / Phone Row with Chat */}
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-slate-900/60 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-faint">Phone &amp; WhatsApp</div>
              <span className="text-xs font-semibold text-white">{profile.phone}</span>
            </div>
          </div>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label="Chat on WhatsApp"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-slate-900/60 p-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/10 text-secondary">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <div className="font-mono text-[0.62rem] uppercase tracking-wider text-faint">Location</div>
            <span className="text-xs font-semibold text-white">{profile.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.08] pt-5">
        <div className="mb-3 font-mono text-[0.65rem] uppercase tracking-wider text-faint font-medium">
          Digital Profiles
        </div>
        <SocialLinks showEmail />
      </div>
    </div>
  );
}

export function ResumeCard() {
  return (
    <div className="glass-card glass-card-interactive relative overflow-hidden rounded-3xl p-6 sm:p-8 border-white/[0.08] bg-gradient-to-br from-primary/10 via-secondary/10 to-slate-950">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-glow-sm">
          <FileDown className="h-5 w-5" />
        </div>
        <h3 className="font-display text-lg font-bold text-white">Full Curriculum Vitae</h3>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-dim">
        Download the verified PDF document containing complete academic transcripts, projects, and certifications.
      </p>
      <a
        href={profile.resume}
        download
        data-cursor-hover
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-mono text-xs uppercase tracking-wider font-bold text-slate-950 shadow-glow transition-all hover:scale-105"
      >
        <FileDown className="h-4 w-4" /> Download Resume PDF
      </a>
    </div>
  );
}

export function AvailabilityCard() {
  const items = [
    { label: "Software / Web Internships", ok: profile.availability.internship },
    { label: "Frontend & Full-Stack Freelance", ok: profile.availability.freelance },
    { label: "Cybersecurity & Open Source Collabs", ok: profile.availability.openSource },
  ];

  return (
    <div className="glass-card glass-card-interactive rounded-3xl p-6 sm:p-8 border-white/[0.08]">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-white">Current Status</h3>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/80 px-2.5 py-0.5 font-mono text-[0.62rem] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-3 text-xs text-slate-200">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Check className="h-3.5 w-3.5" />
            </div>
            <span>{i.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-white/[0.08] pt-4 font-mono text-xs text-dim">
        &gt; {profile.availability.hiring}
      </p>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-wrap">
      <Reveal className="max-w-2xl">
        <div className="eyebrow">Queries &amp; Answers</div>
        <h2 className="font-display text-3xl font-bold text-white">Frequently Asked Questions</h2>
        <p className="mt-2 text-sm text-dim">
          Quick clarity on availability, engineering focus, and collaborative workflow.
        </p>
      </Reveal>
      <div className="mt-8 flex flex-col gap-3 max-w-3xl">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <div className="glass-card glass-card-interactive overflow-hidden rounded-2xl border-white/[0.08]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                data-cursor-hover
                className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left"
              >
                <span className="font-display text-sm font-semibold text-white">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10"
                >
                  <ChevronDown className="h-4 w-4 text-primary" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-dim border-t border-white/[0.04] pt-3">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}