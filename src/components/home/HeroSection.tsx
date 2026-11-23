"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Factory,
  ShieldCheck,
  Flame,
  Layers,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Info,
  Lock,
  Search,
  CheckCircle2,
  Check
} from "lucide-react";
import { SEED_PRODUCTS } from "@/data/seed-data";
import { useEverestStore } from "@/store/useStore";
import { formatNPR } from "@/lib/formatters";

interface Hotspot {
  id: string;
  x: string; // percentage
  y: string;
  label: string;
  nepaliLabel: string;
  description: string;
  metric: string;
}

const HERO_HOTSPOTS: Hotspot[] = [
  {
    id: "lock",
    x: "48%",
    y: "47%",
    label: "7-Lever Anti-Theft Lock",
    nepaliLabel: "७-लिभर अनपिकेबल ब्रास लक",
    description: "Solid brass unpickable tumbler mechanism with computerized duplicate-proof keys and 3-way hardened steel shoot bolts.",
    metric: "Manganese Hardened Drill Plate"
  },
  {
    id: "anti-rust",
    x: "24%",
    y: "82%",
    label: "Hot Chemical Anti-Rust Immersion",
    nepaliLabel: "७-ट्याङ्क तातो केमिकल ट्रिटमेन्ट",
    description: "Deep chemical bath at 65°C: alkaline degreasing, acid derusting, and crystalline zinc phosphate conversion.",
    metric: "1000+ Hr Salt-Spray Tested"
  },
  {
    id: "gauge",
    x: "82%",
    y: "28%",
    label: "20-Gauge CRCA Prime Steel",
    nepaliLabel: "२० गेज प्राइम टाटा CRCA शिट",
    description: "Cold-rolled close annealed prime steel sheets from Tata/Jindal with zero sheet impurities or welding ripples.",
    metric: "65 kg UDL Load Per Shelf"
  }
];

export function HeroSection() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HERO_HOTSPOTS[0]);
  const { openQuickView, setSearchOpen, userRole } = useEverestStore();
  const flagship = SEED_PRODUCTS[0];
  const flagshipVariant = flagship.variants[0];

  const currentPrice = userRole === "DEALER" ? flagshipVariant.dealerPriceNpr : flagshipVariant.sellingPriceNpr;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 py-16 lg:py-24 steel-grid-bg">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Conversion-First Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-amber-600/70 rounded-full px-3.5 py-1 text-xs text-amber-400 shadow-xl backdrop-blur-md">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-semibold tracking-wide">
                Established 2039 BS (1983 AD) • Birgunj, Nepal
              </span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-slate-300 font-mono text-[11px]">
                Nepal&apos;s Benchmark Steel Manufacturer
              </span>
            </div>

            {/* Architectural Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-heading">
              Engineered in Steel. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Built for Generations.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-sans">
              Factory-Direct Almirahs, Office Systems & Heavy-Duty Tijoris Delivered Across Nepal.
              Manufactured with 20/22 Gauge Tata CRCA sheet steel, 7-tank hot phosphate chemical anti-rust immersion, and 5-year lock & rust warranty.
            </p>

            {/* Core Superiority Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">7-Tank Hot Chemical</div>
                  <div className="text-[10px] text-slate-400">Zero Rust Guarantee</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">20-Gauge CRCA Steel</div>
                  <div className="text-[10px] text-slate-400">Tata Prime Cold Rolled</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">5-Year Warranty</div>
                  <div className="text-[10px] text-slate-400">Lock & Structure Assured</div>
                </div>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <Link
                href="/products?category=HOUSEHOLD_ALMIRAH"
                className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-xl flex items-center gap-2 text-sm transition-all border border-red-700/60"
              >
                <span>Shop Household Almirahs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/quote"
                className="bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-5 py-3.5 rounded-xl text-sm transition-colors flex items-center gap-2"
              >
                <Factory className="w-4 h-4 text-amber-400" />
                <span>Request B2B / Office Quote</span>
              </Link>

              <button
                onClick={() => setSearchOpen(true)}
                className="text-amber-400 hover:text-amber-300 text-xs font-semibold px-2 py-2 flex items-center gap-1 hover:underline"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search by SKU or 78&quot; Height</span>
              </button>
            </div>
          </div>

          {/* Right: High-Impact Showcase with Interactive Hotspot Pins */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md aspect-[3/4] bg-gradient-to-b from-slate-800 to-slate-950 rounded-2xl border-2 border-slate-700/80 shadow-2xl p-4 overflow-hidden group">
              
              {/* Blueprint Grid Watermark */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Main Flagship Almirah Image */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={flagshipVariant.exteriorImages[0]}
                  alt="Everest Sansaar Model Almirah - Interactive Engineering Hotspots"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />

                {/* Hotspot Indicator Pill Top */}
                <div className="absolute top-3 left-3 bg-slate-950/95 border border-amber-600/80 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click Pins to Inspect Engineering</span>
                </div>

                {/* Interactive Hotspot Pins */}
                {HERO_HOTSPOTS.map((spot) => {
                  const isActive = activeHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(spot)}
                      onMouseEnter={() => setActiveHotspot(spot)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 focus:outline-none"
                      style={{ left: spot.x, top: spot.y }}
                      title={spot.label}
                    >
                      <div className="relative flex items-center justify-center">
                        <span
                          className={`absolute w-8 h-8 rounded-full animate-ping opacity-75 ${
                            isActive ? "bg-amber-400" : "bg-red-500"
                          }`}
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-xl transition-all ${
                            isActive
                              ? "bg-amber-500 text-slate-950 scale-125 ring-4 ring-amber-500/40"
                              : "bg-red-700 text-white hover:scale-110"
                          }`}
                        >
                          +
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Dynamic Hotspot Information Card Bottom Overlay */}
                {activeHotspot && (
                  <div className="absolute bottom-3 inset-x-3 bg-slate-950/95 backdrop-blur-md p-3.5 rounded-xl border border-amber-500/80 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150 z-30">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                          Engineering Hotspot • {activeHotspot.metric}
                        </div>
                        <h4 className="text-sm font-bold text-white font-heading mt-0.5">
                          {activeHotspot.label}
                        </h4>
                        <div className="text-[10px] text-amber-400/90 font-medium">
                          {activeHotspot.nepaliLabel}
                        </div>
                      </div>

                      <button
                        onClick={() => openQuickView(flagship, flagshipVariant)}
                        className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded border border-slate-700 shrink-0"
                      >
                        Cutaway
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                      {activeHotspot.description}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Flagship: Sansaar Model 78&quot;</span>
                      <span className="text-amber-400 font-bold">{formatNPR(currentPrice)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
