import { testimonials } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const items = [...testimonials, ...testimonials];

  return (
    <section className="relative border-y border-line py-16">
      <div className="section-wrap !py-0">
        <SectionHeading eyebrow="Word on the Street" title="Testimonials" align="center" />
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" />

        <div className="flex w-max animate-marquee gap-6 [animation-duration:60s] hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="glass-card w-[320px] shrink-0 rounded-2xl p-6"
            >
              <Quote className="h-5 w-5 text-primary/60" />
              <p className="mt-4 text-sm leading-relaxed text-dim">&quot;{t.quote}&quot;</p>
              <div className="mt-5 border-t border-line pt-4">
                <div className="font-display text-sm font-semibold text-white">{t.name}</div>
                <div className="font-mono text-[0.65rem] uppercase tracking-wide text-primary">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
