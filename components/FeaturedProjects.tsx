import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section-wrap">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          copy="A few things I've built while learning — from static sites to tools people actually use."
        />
        <Reveal delay={0.1}>
          <Link
            href="/projects"
            data-cursor-hover
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-highlight"
          >
            All Projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
