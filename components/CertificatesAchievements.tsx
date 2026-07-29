import { certificates, achievements } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Award, Medal } from "lucide-react";

function EmptyState({ icon: Icon, label }: { icon: typeof Award; label: string }) {
  return (
    <div className="glass-card flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
      <Icon className="h-6 w-6 text-primary/60" />
      <p className="max-w-sm text-sm text-dim">Nothing added here yet — ready for the first one.</p>
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">TODO — add {label}</span>
    </div>
  );
}

export default function CertificatesAchievements() {
  return (
    <section className="section-wrap grid gap-14 lg:grid-cols-2">
      <div>
        <SectionHeading eyebrow="Proof of Work" title="Certificates" />
        <div className="mt-8 flex flex-col gap-4">
          {certificates.length === 0 ? (
            <Reveal delay={0.1}>
              <EmptyState icon={Award} label="certificates" />
            </Reveal>
          ) : (
            certificates.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="glass-card flex items-start gap-4 rounded-2xl p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Award className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-white">{c.title}</h3>
                    <p className="text-sm text-dim">{c.issuer}</p>
                    <p className="mt-1 font-mono text-xs text-faint">{c.date}</p>
                  </div>
                </div>
              </Reveal>
            ))
          )}
        </div>
      </div>
      <div>
        <SectionHeading eyebrow="Milestones" title="Achievements" />
        <Reveal delay={0.1} className="mt-8">
          {achievements.length === 0 && <EmptyState icon={Medal} label="achievements" />}
        </Reveal>
      </div>
    </section>
  );
}
