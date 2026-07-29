import { about } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Briefcase } from "lucide-react";

export function CareerObjective() {
  return (
    <section className="section-wrap">
      <SectionHeading
        eyebrow="Direction"
        title="Career Objective"
        copy="What I'm actually working toward while I finish the degree."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {about.objective.map((o, i) => (
          <Reveal key={o.title} delay={i * 0.07}>
            <div className="glass-card h-full rounded-2xl p-6">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-white">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{o.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function StrengthCards() {
  return (
    <section className="section-wrap">
      <SectionHeading eyebrow="How I Work" title="Strengths" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {about.strengths.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="glass-card flex items-start gap-4 rounded-2xl p-6">
              <span className="h-2 w-2 shrink-0 translate-y-2 rounded-full bg-highlight shadow-glow" />
              <div>
                <h3 className="font-display text-base font-semibold text-white">{s.title}</h3>
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
  return (
    <section className="section-wrap">
      <SectionHeading eyebrow="Off The Clock" title="Fun Facts" align="center" />
      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.funFacts.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.05}>
            <div className="glass-card rounded-2xl p-5 text-center">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-faint">{f.label}</div>
              <div className="mt-2 font-display text-sm font-semibold text-white">{f.value}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section className="section-wrap">
      <SectionHeading eyebrow="Experience" title="Internships & Training" />
      {about.experience.length === 0 ? (
        <Reveal delay={0.1} className="mt-10">
          <div className="glass-card flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
            <Briefcase className="h-6 w-6 text-primary/60" />
            <p className="max-w-sm text-sm text-dim">
              No internships, campus ambassador roles, or formal training programs listed yet.
            </p>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
              TODO — add experience
            </span>
          </div>
        </Reveal>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {about.experience.map((e, i) => (
            <Reveal key={e.title + e.org} delay={i * 0.07}>
              <div className="glass-card flex items-start gap-4 rounded-2xl p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Briefcase className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-white">{e.title}</h3>
                  <p className="text-sm text-primary">{e.org}</p>
                  <p className="mt-1 font-mono text-xs text-faint">{e.duration}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
