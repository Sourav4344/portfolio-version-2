import { about } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { GraduationCap } from "lucide-react";

export default function EducationCards() {
  const { education } = about;

  return (
    <section className="section-wrap">
      <SectionHeading eyebrow="Education" title="Academic Record" />

      <Reveal delay={0.1} className="glass-card mt-10 rounded-2xl p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{education.degree}</h3>
              <p className="text-sm text-dim">
                {education.school} · {education.affiliation}
              </p>
            </div>
          </div>
          <span className="rounded-full border border-primary/30 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-primary">
            {education.status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
          {education.semesters.map((s) => (
            <div
              key={s.label}
              className={`rounded-xl border px-2 py-3 text-center ${
                s.latest
                  ? "border-primary/40 bg-primary/5"
                  : s.pending
                  ? "border-line bg-white/[0.02]"
                  : "border-line"
              }`}
            >
              <div className="font-mono text-[0.6rem] uppercase text-faint">{s.label}</div>
              <div className={`mt-1 font-display text-sm font-semibold ${s.pending ? "text-faint" : "text-white"}`}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-6 border-t border-line pt-5">
          {education.prior.map((p) => (
            <div key={p.label}>
              <div className="font-mono text-[0.6rem] uppercase tracking-wide text-faint">{p.label}</div>
              <div className="mt-1 text-sm text-white">{p.value}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
