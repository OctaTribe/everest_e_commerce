"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Factory, Award, Truck, Phone, Briefcase, Settings } from "lucide-react";
import { useEverestStore } from "@/store/useStore";

export function TrustBar() {
  const { userRole, setUserRole } = useEverestStore();

  return (
    <div className="bg-slate-950 text-slate-300 border-b border-slate-800 text-xs py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Manufacturing Heritage Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] sm:text-xs">
          <div className="inline-flex items-center gap-1.5 font-medium text-amber-500">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span>40+ Years Heritage (Est. 2039 BS)</span>
          </div>

          <span className="hidden sm:inline text-slate-700">|</span>

          <div className="inline-flex items-center gap-1.5 text-slate-300">
            <Factory className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Factory-Direct from Birgunj, Nepal</span>
          </div>

          <span className="hidden sm:inline text-slate-700">|</span>

          <div className="inline-flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>5-Year Rust & Lock Warranty (7-Tank Pre-Treatment)</span>
          </div>

          <span className="hidden lg:inline text-slate-700">|</span>

          <div className="hidden lg:inline-flex items-center gap-1.5 text-slate-400">
            <Truck className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span>Heavy Freight to All 7 Provinces</span>
          </div>
        </div>

        {/* Right: Hotline & B2B Dealer Mode Switcher */}
        <div className="flex items-center gap-4 shrink-0 text-[11px] sm:text-xs">
          <a
            href="tel:+97751521940"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
          >
            <Phone className="w-3 h-3 text-amber-500" />
            <span>Birgunj HQ: 051-521940</span>
          </a>

          {/* Quick toggle to demonstrate Dealer Wholesale pricing vs Customer D2C */}
          <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded px-2 py-0.5">
            <Briefcase className="w-3 h-3 text-amber-400" />
            <span className="text-slate-400 hidden sm:inline">Pricing Mode:</span>
            <button
              onClick={() => setUserRole(userRole === "DEALER" ? "CUSTOMER" : "DEALER")}
              className={`font-semibold px-1.5 py-0.5 rounded transition-all ${
                userRole === "DEALER"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
              title="Toggle between Retail D2C Factory Direct Price and Verified B2B Wholesale Dealer Price"
            >
              {userRole === "DEALER" ? "B2B Dealer (Wholesale)" : "Retail D2C"}
            </button>
          </div>

          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-amber-500 hover:text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded transition-colors"
          >
            <Settings className="w-3 h-3" />
            <span>Factory Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
