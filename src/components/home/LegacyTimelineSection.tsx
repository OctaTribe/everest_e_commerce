"use client";

import React, { useState } from "react";
import {
  Award,
  Calendar,
  Building2,
  CheckCircle2,
  Star,
  Quote,
  Factory,
  ShieldCheck,
  ChevronRight,
  Clock
} from "lucide-react";
import {
  SEED_TIMELINE,
  SeedTimelineItem,
  SEED_INSTITUTIONAL_CLIENTS,
  SEED_REVIEWS
} from "@/data/seed-data";

export function LegacyTimelineSection() {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(0);
  const activeMilestone = SEED_TIMELINE[selectedMilestoneIndex];

  return (
    <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. INTERACTIVE 40+ YEAR TIMELINE (2039 BS TO PRESENT) */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-full uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>Birgunj Manufacturing Archive</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
              Four Decades of Steel Mastery: 2039 BS to Present
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              From manual cold rolling fly-presses in Parsa to Nepal&apos;s most advanced automated 200°C powder coating plant. Explore our journey.
            </p>
          </div>

          {/* Timeline Horizontal Year Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {SEED_TIMELINE.map((item, index) => (
              <button
                key={item.yearBs}
                onClick={() => setSelectedMilestoneIndex(index)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedMilestoneIndex === index
                    ? "bg-amber-600 text-white border-amber-400 shadow-xl scale-102"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                <div className="font-mono text-xs font-bold">{item.yearBs}</div>
                <div className={`text-[10px] ${selectedMilestoneIndex === index ? "text-amber-100" : "text-slate-500"}`}>
                  {item.yearAd}
                </div>
                <div className="text-[11px] font-semibold truncate mt-1">
                  {item.milestone}
                </div>
              </button>
            ))}
          </div>

          {/* Active Milestone Highlight Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded">
                    {activeMilestone.yearBs} ({activeMilestone.yearAd})
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    • Milestone {selectedMilestoneIndex + 1} of 6
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  {activeMilestone.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                  {activeMilestone.description}
                </p>
              </div>

              <div className="md:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-2">
                <Factory className="w-8 h-8 text-amber-500 mx-auto" />
                <h4 className="font-bold text-white text-sm font-heading">
                  Birgunj Industrial Heritage
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Continuous manufacturing under the same founding family management for 40+ years in Parsa, Nepal.
                </p>
                <div className="pt-1 text-[11px] text-emerald-400 font-mono font-semibold">
                  100% Proudly Made in Nepal
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. VERIFIED INSTITUTIONAL CLIENT LOGOS / BADGES */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Trusted by Nepal&apos;s Leading Institutions
            </h3>
            <p className="text-xs text-slate-400">
              Supplying government ministries, commercial bank vaults, and university dormitories.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SEED_INSTITUTIONAL_CLIENTS.map((client, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    {client.category}
                  </span>
                </div>

                <div className="font-bold text-sm text-white font-heading">
                  {client.name}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{client.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. AUTHENTIC CUSTOMER REVIEWS */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>Real Customer Stories Across Nepal</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              Proven in Nepalese Homes for Decades
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SEED_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Rating Stars & Usage Duration */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded">
                      {rev.yearsUsed}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &ldquo;{rev.reviewText}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{rev.customerName}</div>
                    <div className="text-[11px] text-slate-400">{rev.city}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-amber-400 font-mono">{rev.modelPurchased}</div>
                    <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Factory Buyer</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
