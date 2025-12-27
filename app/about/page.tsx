"use client";

import HeroSection from "./HeroSection";
import ValueSection from "./ValueSection";
import TeamSection from "./TeamSection";
import StorySection from "./StorySection";
import CtaSection from "./CtaSection";

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
