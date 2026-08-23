import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Github, ExternalLink, Activity } from "lucide-react";

const USERNAME = "Sourav4344";

export default function GithubStats() {
  return (
    <section className="section-wrap">
      <SectionHeading
        eyebrow="Open Source Pulse"
        title="Live GitHub Activity"
        copy="Real-time telemetry pulled directly from public and private GitHub contributions."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="glass-card glass-card-interactive overflow-hidden rounded-3xl p-5 sm:p-6 border-white/[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&hide_border=true&bg_color=00000000&title_color=00F0FF&icon_color=818CF8&text_color=94A3B8&count_private=true`}
            alt="Sourav Maji's GitHub stats"
            className="w-full"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={0.1} className="glass-card glass-card-interactive overflow-hidden rounded-3xl p-5 sm:p-6 border-white/[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&hide_border=true&bg_color=00000000&title_color=00F0FF&text_color=94A3B8`}
            alt="Most used languages"
            className="w-full"
            loading="lazy"
          />
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-6 glass-card glass-card-interactive overflow-hidden rounded-3xl p-5 sm:p-6 border-white/[0.08]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/00F0FF/${USERNAME}`}
          alt="GitHub contribution graph"
          className="w-full filter invert hue-rotate-180 brightness-110 opacity-90"
          loading="lazy"
        />
      </Reveal>

      <Reveal delay={0.2} className="mt-8 flex justify-center">
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-6 py-3 font-mono text-xs uppercase tracking-wider font-semibold text-white transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-glow-sm"
        >
          <Github className="h-4 w-4 text-primary" />
          <span>Explore All Repositories on GitHub</span>
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}