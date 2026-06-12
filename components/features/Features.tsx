"use client";

import AddFeatures from "@/components/features/AddFeatures";
import CtaSection from "@/components/features/CtaSection";
import HeroSection from "@/components/features/HeroSection";
import MainSection from "@/components/features/MainSection";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MainSection />
      <AddFeatures />
      <CtaSection />
    </div>
  );
};
export default Features;
