"use client";

import HeroSection from "@/components/about/HeroSection";
import ValueSection from "@/components/about/ValueSection";
import TeamSection from "@/components/about/TeamSection";
import StorySection from "@/components/about/StorySection";
import CtaSection from "@/components/about/CtaSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StorySection />
      <ValueSection />
      <TeamSection />
      <CtaSection />
    </div>
  );
};

export default About;
