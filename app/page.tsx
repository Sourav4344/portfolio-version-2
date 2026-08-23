"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import FeaturedProjects from "@/components/FeaturedProjects";
import TechCarousel from "@/components/TechCarousel";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Hero />
      <StatsCounter />
      <FeaturedProjects />
      <TechCarousel />
      <Testimonials />
    </>
  );
}