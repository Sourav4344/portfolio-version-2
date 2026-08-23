import type { Metadata } from "next";
import { profile } from "@/lib/data";
import AboutIntro from "@/components/AboutIntro";
import Timeline from "@/components/Timeline";
import EducationCards from "@/components/EducationCards";
import { CareerObjective, StrengthCards, FunFacts, ExperienceSection } from "@/components/AboutExtras";
import SkillBars from "@/components/SkillBars";
import CertificatesAchievements from "@/components/CertificatesAchievements";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name} — Electrical Engineering student and developer.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <Timeline />
      <EducationCards />
      <ExperienceSection />
      <CareerObjective />
      <StrengthCards />
      <SkillBars />
      <CertificatesAchievements />
      <FunFacts />
    </>
  );
}
