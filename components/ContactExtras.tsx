"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, FileDown, ChevronDown, Check, X as XIcon } from "lucide-react";
import { profile, faqs } from "@/lib/data";
import SocialLinks from "./SocialLinks";
import Reveal from "./Reveal";

export function ContactInfo() {
  const rows = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone / WhatsApp", value: profile.phone, href: profile.whatsapp },
    { icon: MapPin, label: "Location", value: profile.location, href: undefined },
  ];

  return (
    <div className="glass-card rounded-2xl p-7">
      <h3 className="font-display text-lg font-semibold text-white">Contact Info</h3>
      <div className="mt-5 flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <r.icon className="h-4 w-4" />
            </span>
            <div>
              <div className="font-mono text-[0.6rem] uppercase tracking-wide text-faint">{r.label}</div>
              {r.href ? (
                <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm text-white hover:text-primary">
                  {r.value}
                </a>
              ) : (
                <span className="text-sm text-white">{r.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-line pt-6">
        <div className="mb-3 font-mono text-[0.6rem] uppercase tracking-wide text-faint">Elsewhere</div>
        <SocialLinks showEmail />
      </div>
    </div>
  );
}

export function ResumeCard() {
  return (
    <div className="gradient-border relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent p-7">
      <h3 className="font-display text-lg font-semibold text-white">Resume</h3>
      <p className="mt-2 text-sm text-dim">Get the full breakdown of coursework, skills, and projects in one document.</p>
      <a
        href={profile.resume}
        download
        data-cursor-hover
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-base transition-all hover:bg-highlight hover:shadow-glow"
      >
        <FileDown className="h-4 w-4" /> Download PDF
      </a>
    </div>
  );
}

export function AvailabilityCard() {
  const items = [
    { label: "Available for Internship", ok: profile.availability.internship },
    { label: "Available for Freelancing", ok: profile.availability.freelance },
    { label: "Open Source Collaboration", ok: profile.availability.openSource },
  ];
  return (
    <div className="glass-card rounded-2xl p-7">
      <h3 className="font-display text-lg font-semibold text-white">Status</h3>
      <div className="mt-4 flex flex-col gap-3">
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-2.5 text-sm">
            {i.ok ? (
              <Check className="h-4 w-4 text-highlight" />
            ) : (
              <XIcon className="h-4 w-4 text-faint" />
            )}
            <span className={i.ok ? "text-white" : "text-faint"}>{i.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-dim">{profile.availability.hiring}</p>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-wrap">
      <Reveal className="max-w-2xl">
        <div className="eyebrow">Common Questions</div>
        <h2 className="font-display text-3xl font-semibold text-white">FAQ</h2>
      </Reveal>
      <div className="mt-8 flex flex-col gap-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <div className="glass-card overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                data-cursor-hover
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-display text-sm font-medium text-white">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }}>
                  <ChevronDown className="h-4 w-4 shrink-0 text-primary" />
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
                    <p className="px-6 pb-4 text-sm leading-relaxed text-dim">{f.a}</p>
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
