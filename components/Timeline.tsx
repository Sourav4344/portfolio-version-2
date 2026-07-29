import { about } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Timeline() {
  return (
    <section className="section-wrap">
      <SectionHeading eyebrow="The Journey" title="From Madhyamik to Ethical Hacking" />
      <div className="relative mt-12 border-l border-line pl-8 sm:pl-10">
        {about.timeline.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-primary shadow-glow sm:-left-[calc(2.5rem+5px)]" />
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{item.year}</div>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-dim">{item.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
