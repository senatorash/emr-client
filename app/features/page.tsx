"use client";

import AddFeatures from "./AddFeatures";
import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MainSection />
      <AddFeatures />
      <CtaSection />
    </div>
  );
};
export default FeaturesPage;
