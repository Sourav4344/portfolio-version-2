import { about } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Briefcase, Target, ShieldCheck, Compass, Coffee, Terminal, Sparkles, CheckCircle2 } from "lucide-react";

export function CareerObjective() {
  const OBJECTIVE_ICONS = [Target, ShieldCheck, Compass, Sparkles];

  return (
    <section className="section-wrap">
      <SectionHeading
        eyebrow="Direction &amp; Focus"
        title="Career Objectives"
        copy="Clear goals and strategic roadmap across software systems and cybersecurity."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {about.objective.map((o, i) => {
          const Icon = OBJECTIVE_ICONS[i % OBJECTIVE_ICONS.length];
          return (
            <Reveal key={o.title} delay={i * 0.07}>
              <div className="glass-card glass-card-interactive flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7 border-white/[0.08]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-primary">0{i + 1}</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="font-display text-base font-bold text-white">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dim">{o.copy}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function StrengthCards() {
  return (
    <section className="section-wrap">
      <SectionHeading
        eyebrow="Work Ethic"
        title="Core Strengths"
        copy="Principles and engineering instincts brought to every build and team."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {about.strengths.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="glass-card glass-card-interactive flex items-start gap-4 rounded-3xl p-6 sm:p-7 border-white/[0.08]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-dim">{s.copy}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FunFacts() {
  const FACT_ICONS = [Coffee, Terminal, Sparkles, Compass];

  return (
    <section className="section-wrap">
      <SectionHeading eyebrow="Off The Clock" title="Fun Facts &amp; Rituals" align="center" />
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.funFacts.map((f, i) => {
          const Icon = FACT_ICONS[i % FACT_ICONS.length];
          return (
            <Reveal key={f.label} delay={i * 0.05}>
              <div className="glass-card glass-card-interactive rounded-3xl p-6 text-center border-white/[0.08]">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10 text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint font-medium">
                  {f.label}
                </div>
                <div className="mt-2 font-display text-sm font-bold text-white">{f.value}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section className="section-wrap">
      <SectionHeading
        eyebrow="Leadership &amp; Roles"
        title="Experience &amp; Ambassadorship"
        copy="Active campus representation and community leadership roles."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {about.experience.map((e, i) => (
          <Reveal key={e.title + e.org} delay={i * 0.07}>
            <div className="glass-card glass-card-interactive flex items-start gap-4 rounded-3xl p-6 sm:p-7 border-white/[0.08]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-glow-sm">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-white">{e.title}</h3>
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[0.62rem] text-primary">
                    Verified Role
                  </span>
                </div>
                <p className="mt-0.5 font-display text-sm text-primary font-medium">{e.org}</p>
                <p className="mt-1.5 font-mono text-xs text-faint">{e.duration}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}