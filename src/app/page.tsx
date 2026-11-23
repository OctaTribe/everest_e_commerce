import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { EngineeringComparisonStrip } from "@/components/home/EngineeringComparisonStrip";
import { ComboDealsSection } from "@/components/home/ComboDealsSection";
import { LegacyTimelineSection } from "@/components/home/LegacyTimelineSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Interactive Engineering Hotspot Pins */}
      <HeroSection />

      {/* 2. Shop by Space & Manufacturing Category Grid */}
      <CategoryGrid />

      {/* 3. Why Everest Steel (Engineering Superiority Strip: Powder vs Enamel vs Local Workshop) */}
      <EngineeringComparisonStrip />

      {/* 4. Hottest Selling & Combo Deals (Newlywed & Home Setup Combos + Best Sellers) */}
      <ComboDealsSection />

      {/* 5. Social Proof & Legacy (40+ Year Timeline, Verified Clients & Customer Reviews) */}
      <LegacyTimelineSection />
    </div>
  );
}
