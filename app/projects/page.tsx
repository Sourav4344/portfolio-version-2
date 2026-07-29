import type { Metadata } from "next";
import { profile } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ProjectsGrid from "@/components/ProjectsGrid";
import GithubStats from "@/components/GithubStats";

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects built by ${profile.name} — web apps, tools, and a cybersecurity lab.`,
};

export default function ProjectsPage() {
  return (
    <>
      <section className="section-wrap !pb-0">
        <SectionHeading
          eyebrow="Work"
          title="Projects"
          copy="Everything here is real and either live, private, or in progress — filter by category or open a card for details."
        />
      </section>

      <section className="section-wrap">
        <ProjectsGrid />
      </section>

      <GithubStats />
    </>
  );
}
