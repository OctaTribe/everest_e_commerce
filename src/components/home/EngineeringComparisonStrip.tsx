"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Flame,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Factory,
  Layers,
  Sparkles,
  Info
} from "lucide-react";

export function EngineeringComparisonStrip() {
  const [activeTier, setActiveTier] = useState<"POWDER" | "ENAMEL" | "LOCAL">("POWDER");

  return (
    <section className="py-16 lg:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-full uppercase">
            <Factory className="w-3.5 h-3.5" />
            <span>Metallurgical & Coating Benchmark</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
            Why Everest Steel Outlasts Roadside Fabricators by Decades
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The secret is in the pre-treatment and thermal curing. See how Everest Steel&apos;s 7-tank hot chemical immersion compares with budget enamel and cheap local welding workshops.
          </p>
        </div>

        {/* Tier Selector Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveTier("POWDER")}
              className={`py-2 px-4 rounded-xl transition-all flex items-center gap-2 ${
                activeTier === "POWDER"
                  ? "bg-amber-600 text-white shadow-lg ring-2 ring-amber-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Everest Powder Coated (Hot Chemical)</span>
              <span className="text-[10px] bg-slate-950/60 px-1.5 py-0.5 rounded font-mono text-amber-200">
                ★ Factory Standard
              </span>
            </button>

            <button
              onClick={() => setActiveTier("ENAMEL")}
              className={`py-2 px-4 rounded-xl transition-all flex items-center gap-2 ${
                activeTier === "ENAMEL"
                  ? "bg-slate-800 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Everest Enamel (Cold Chemical)</span>
              <span className="text-[10px] text-slate-400 font-mono">Budget Line</span>
            </button>

            <button
              onClick={() => setActiveTier("LOCAL")}
              className={`py-2 px-4 rounded-xl transition-all flex items-center gap-2 ${
                activeTier === "LOCAL"
                  ? "bg-red-950 border border-red-800 text-red-300 shadow-lg"
                  : "text-slate-500 hover:text-red-400"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Roadside Sheet Fabricator</span>
            </button>
          </div>
        </div>

        {/* Active Tier Highlight Dossier */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                {activeTier === "POWDER" && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded">
                    Gold Standard: 30 to 50+ Years Lifespan
                  </span>
                )}
                {activeTier === "ENAMEL" && (
                  <span className="text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800 px-2.5 py-1 rounded">
                    Commercial Standard: 12 to 18 Years Lifespan
                  </span>
                )}
                {activeTier === "LOCAL" && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-800 px-2.5 py-1 rounded">
                    High Rust Risk: 2 to 4 Years Lifespan
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                {activeTier === "POWDER" && "7-Tank Hot Phosphate Immersion + 200°C Baked Thermoset Polyester"}
                {activeTier === "ENAMEL" && "Cold Phosphate Chemical Derusting + Synthetic Stove Enamel"}
                {activeTier === "LOCAL" && "Raw Kerosene Rag Wipe + Direct Paint Spray (Untreated Rust Inside)"}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {activeTier === "POWDER" &&
                  "At our Birgunj works, every raw sheet is submerged in a 7-stage chemical line heated to 65°C: hot alkaline degreasing, acid pickling to strip mill scale, cold rinsing, and a crystalline zinc phosphate bath that permanently alters the steel surface. Finally, pure dry polyester powder is electrostatically sprayed and cured in our 200°C conveyor tunnel for 25 minutes."}
                {activeTier === "ENAMEL" &&
                  "Our secondary industrial option utilizes cold chemical derusting and synthetic enamel. It provides solid protection for office filing and storage at a lower price point, though it lacks the diamond-hard scratch resistance of high-temperature baked powder coat."}
                {activeTier === "LOCAL" &&
                  "Cheap roadside fabricators skip chemical tanks entirely to save cost. They wipe oily steel with kerosene or diesel, trapping microscopic moisture and mill scale under the wet paint. Within 1-2 monsoons in Nepal, the paint bubbles from inside out, and bottom doors jam with rust."}
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                Technical Specifications
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pre-Treatment Bath:</span>
                  <span className="font-semibold text-white">
                    {activeTier === "POWDER" && "7-Tank Hot Chemical @ 65°C"}
                    {activeTier === "ENAMEL" && "Cold Phosphate Wash"}
                    {activeTier === "LOCAL" && "None (Kerosene Rag)"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Curing Method:</span>
                  <span className="font-semibold text-white">
                    {activeTier === "POWDER" && "200°C Automated Oven"}
                    {activeTier === "ENAMEL" && "Air Dried / Mild Stove"}
                    {activeTier === "LOCAL" && "Open Air Air-Dry"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Salt-Spray Rating:</span>
                  <span className="font-mono font-bold text-amber-400">
                    {activeTier === "POWDER" && "1,000+ Hours"}
                    {activeTier === "ENAMEL" && "250+ Hours"}
                    {activeTier === "LOCAL" && "Under 40 Hours"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Paint Odor & Off-Gassing:</span>
                  <span className="font-semibold text-emerald-400">
                    {activeTier === "POWDER" && "Zero Smell (Ready for Sarees)"}
                    {activeTier === "ENAMEL" && "Fades in 48 Hours"}
                    {activeTier === "LOCAL" && "Fumes for Months"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="p-3.5 text-slate-400 font-bold uppercase tracking-wider">Quality Metric</th>
                <th className="p-3.5 text-amber-400 font-bold bg-amber-950/30 border-l border-r border-amber-800/40">
                  Everest Powder Coated (Hot Chemical)
                </th>
                <th className="p-3.5 text-slate-300 font-bold">
                  Everest Enamel (Cold Chemical)
                </th>
                <th className="p-3.5 text-red-400 font-bold bg-red-950/20">
                  Roadside Welding Fabricator
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-300">Raw Steel Sheet Origin</td>
                <td className="p-3.5 text-white font-medium bg-amber-950/10 border-l border-r border-amber-800/30">
                  Prime Tata Steel / Jindal CRCA Sheet
                </td>
                <td className="p-3.5 text-slate-300">Prime Tata/Jindal CRCA Sheet</td>
                <td className="p-3.5 text-slate-400 bg-red-950/10">Mixed scrap, uneven gauge, reused drum sheets</td>
              </tr>

              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-300">Anti-Corrosion Phosphate Barrier</td>
                <td className="p-3.5 text-emerald-400 font-bold bg-amber-950/10 border-l border-r border-amber-800/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Crystalline Zinc Phosphate Layer</span>
                </td>
                <td className="p-3.5 text-slate-300">Basic Iron Phosphate Film</td>
                <td className="p-3.5 text-red-400 bg-red-950/10 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Zero (Rust continues under paint)</span>
                </td>
              </tr>

              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-300">Impact & Chipping Resistance</td>
                <td className="p-3.5 text-white font-medium bg-amber-950/10 border-l border-r border-amber-800/30">
                  Bends with steel without cracking or flaking
                </td>
                <td className="p-3.5 text-slate-300">Good adhesion for indoor usage</td>
                <td className="p-3.5 text-slate-400 bg-red-950/10">Chips on first door bang or broom impact</td>
              </tr>

              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-300">Locking System Standard</td>
                <td className="p-3.5 text-amber-400 font-bold bg-amber-950/10 border-l border-r border-amber-800/30">
                  Everest 6-Lever Unpickable Brass Tumbler
                </td>
                <td className="p-3.5 text-slate-300">Heavy Multi-Lever Brass Cylinder</td>
                <td className="p-3.5 text-slate-400 bg-red-950/10">Single-wafer lock pickable with hairpin/wire</td>
              </tr>

              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-300">Factory Warranty Protection</td>
                <td className="p-3.5 text-emerald-400 font-bold bg-amber-950/10 border-l border-r border-amber-800/30">
                  5-Year Lock & Rust Replacement Warranty
                </td>
                <td className="p-3.5 text-slate-300">3-Year Structure Warranty</td>
                <td className="p-3.5 text-red-400 bg-red-950/10">Zero warranty (No showroom or plant liability)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
