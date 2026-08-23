import { certificates } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Award, CheckCircle2, ShieldCheck, Trophy, Sparkles } from "lucide-react";

export default function CertificatesAchievements() {
  const verifiedAchievements = [
    {
      title: "Madhyamik Secondary State Honor",
      issuer: "West Bengal Board (WBBSE)",
      date: "2021",
      detail: "Secured 92.1% overall, demonstrating top-tier academic foundation in science and mathematics.",
    },
    {
      title: "Higher Secondary Science Excellence",
      issuer: "WBCHSE",
      date: "2023",
      detail: "Achieved 80.8% in Higher Secondary Science stream with physics, chemistry, and mathematics.",
    },
    {
      title: "IIT Delhi & PW Campus Representative",
      issuer: "TRYST IIT Delhi / PhysicsWallah",
      date: "2025–2026",
      detail: "Selected as representative connecting students to national technical symposiums and education initiatives.",
    },
  ];

  return (
    <section className="section-wrap grid gap-10 lg:grid-cols-2">
      {/* Certificates Column */}
      <div>
        <SectionHeading
          eyebrow="Credentials"
          title="Certificates &amp; Badges"
          copy="Verified industry credentials in Cloud AI, Data, and Data Science."
        />
        <div className="mt-8 flex flex-col gap-4">
          {certificates.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="glass-card glass-card-interactive flex items-start gap-4 rounded-3xl p-5 sm:p-6 border-white/[0.08]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-glow-sm">
                  <Award className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-sm font-bold text-white">{c.title}</h3>
                    <span className="font-mono text-xs text-primary font-semibold">{c.date}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-dim flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    {c.issuer}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Achievements Column */}
      <div>
        <SectionHeading
          eyebrow="Recognition"
          title="Academic Honors"
          copy="Competitive milestones and leadership distinctions achieved."
        />
        <div className="mt-8 flex flex-col gap-4">
          {verifiedAchievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="glass-card glass-card-interactive flex items-start gap-4 rounded-3xl p-5 sm:p-6 border-white/[0.08]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10 text-secondary shadow-glow-violet">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-sm font-bold text-white">{a.title}</h3>
                    <span className="font-mono text-xs text-secondary font-semibold">{a.date}</span>
                  </div>
                  <p className="mt-0.5 font-mono text-xs text-dim">{a.issuer}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{a.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}