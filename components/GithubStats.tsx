import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Github } from "lucide-react";

const USERNAME = "Sourav4344";

export default function GithubStats() {
  return (
    <section className="section-wrap">
      <SectionHeading
        eyebrow="Live From GitHub"
        title="Contribution Overview"
        copy="Pulled live from GitHub — updates automatically as new commits land."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="glass-card overflow-hidden rounded-2xl p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&hide_border=true&bg_color=00000000&title_color=38BDF8&icon_color=8B5CF6&text_color=A3ADC2&count_private=true`}
            alt="Sourav Maji's GitHub stats"
            className="w-full"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={0.1} className="glass-card overflow-hidden rounded-2xl p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&hide_border=true&bg_color=00000000&title_color=38BDF8&text_color=A3ADC2`}
            alt="Most used languages"
            className="w-full"
            loading="lazy"
          />
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-6 glass-card overflow-hidden rounded-2xl p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/38BDF8/${USERNAME}`}
          alt="GitHub contribution graph"
          className="w-full"
          loading="lazy"
        />
      </Reveal>

      <Reveal delay={0.2} className="mt-6 flex justify-center">
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-white hover:border-primary hover:text-primary"
        >
          <Github className="h-4 w-4" /> View all repositories
        </a>
      </Reveal>
    </section>
  );
}
