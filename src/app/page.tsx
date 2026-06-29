"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { PricingPreview } from "@/components/home/PricingPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
