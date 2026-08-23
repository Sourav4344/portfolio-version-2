import { about } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Calendar, CheckCircle2, ChevronRight } from "lucide-react";

export default function Timeline() {
  return (
    <section className="section-wrap">
      <SectionHeading
        eyebrow="The Journey"
        title="Milestones &amp; Evolution"
        copy="Tracing the path from high-school academic foundation to Electrical Engineering &amp; cybersecurity."
      />
      <div className="relative mt-12 border-l border-white/10 pl-6 sm:pl-10 ml-3 sm:ml-4">
        {about.timeline.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.07} className="relative pb-10 last:pb-2">
            {/* Glowing Node on Timeline */}
            <div className="absolute -left-[calc(1.5rem+6px)] sm:-left-[calc(2.5rem+6px)] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-slate-950 shadow-glow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
            </div>

            <div className="glass-card glass-card-interactive rounded-2xl p-5 sm:p-6 border-white/[0.08]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 font-mono text-xs font-semibold text-primary">
                  <Calendar className="h-3 w-3" />
                  {item.year}
                </span>
                <span className="font-mono text-[0.62rem] text-faint uppercase tracking-wider">
                  Step 0{i + 1}
                </span>
              </div>

              <h3 className="mt-2.5 font-display text-lg font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-relaxed text-dim">
                {item.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}