"use client";

import CtaSection from "./components/home/CtaSection";
import FeatureSection from "./components/home/FeatureSection";
import HeroSection from "./components/home/HeroSection";
import StatsSection from "./components/home/StatsSection";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <CtaSection />
    </div>
  );
};

export default Home;
