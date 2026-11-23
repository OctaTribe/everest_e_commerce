"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  ShieldCheck,
  Eye,
  ShoppingCart,
  Scale,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { SEED_PRODUCTS, SeedProductVariant } from "@/data/seed-data";
import { useEverestStore } from "@/store/useStore";
import { formatNPR } from "@/lib/formatters";

export function CategoryView({ categorySlug }: { categorySlug: string }) {
  const catSlug = categorySlug.toLowerCase();

  const categoryMap: Record<string, string> = {
    household: "HOUSEHOLD_ALMIRAH",
    office: "OFFICE_ALMIRAH",
    filing: "FILING_CABINETS",
    tables: "OFFICE_TABLES",
    safes: "SAFES_TIJORI",
  };

  const currentCategoryEnum = categoryMap[catSlug] || "HOUSEHOLD_ALMIRAH";
  const products = SEED_PRODUCTS.filter(
    (p) => p.category === currentCategoryEnum || catSlug === "all"
  );

  const { openQuickView, addToCart, addToCompare, userRole } = useEverestStore();
  const [activeVariants, setActiveVariants] = useState<Record<string, SeedProductVariant>>(() => {
    const initial: Record<string, SeedProductVariant> = {};
    SEED_PRODUCTS.forEach((p) => {
      initial[p.slug] = p.variants[0];
    });
    return initial;
  });

  return (
    <div className="bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Factory Catalog</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded">
              {currentCategoryEnum.replace(/_/g, " ")}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({products.length} {products.length === 1 ? "Model" : "Models"} Available)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white font-heading mt-2">
            {currentCategoryEnum === "HOUSEHOLD_ALMIRAH" && "Everest Household Steel Almirahs (घरायसी दराज)"}
            {currentCategoryEnum === "OFFICE_ALMIRAH" && "Office & Commercial Steel Almirahs (कार्यालय दराज)"}
            {currentCategoryEnum === "FILING_CABINETS" && "Heavy Filing & Document Archival Cabinets"}
            {currentCategoryEnum === "OFFICE_TABLES" && "Executive Steel Desks & Workstations"}
            {currentCategoryEnum === "SAFES_TIJORI" && "High-Security Tijori Safes & Bank Vaults (तिजोरी सेफ)"}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Factory-built in Birgunj using prime 20/22 gauge CRCA steel sheet, hot 7-tank chemical anti-rust immersion, and 6-lever unpickable brass locks.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const activeVariant = activeVariants[product.slug] || product.variants[0];
            const price = userRole === "DEALER" ? activeVariant.dealerPriceNpr : activeVariant.sellingPriceNpr;
            const savings = activeVariant.mrpNpr - price;

            return (
              <div
                key={product.slug}
                className="bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all shadow-xl overflow-hidden flex flex-col justify-between group"
              >
                <div className="p-4 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded">
                      {product.category.replace(/_/g, " ")}
                    </span>
                    {product.isBestseller && (
                      <span className="text-[10px] font-bold text-red-300 bg-red-950 border border-red-800 px-2 py-0.5 rounded">
                        #1 Bestseller
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mt-2 group-hover:text-amber-400 transition-colors font-heading">
                    {product.name}
                  </h3>
                  <div className="text-xs text-amber-500/80 font-medium font-sans">
                    {product.nepaliName}
                  </div>
                </div>

                <div className="relative mx-4 aspect-[4/5] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
                  <Image
                    src={activeVariant.exteriorImages[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />

                  <button
                    onClick={() => openQuickView(product, activeVariant)}
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs"
                  >
                    <div className="bg-slate-900/90 border border-slate-700 px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xl hover:border-amber-400 transition-colors">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Inspect Cutaway</span>
                    </div>
                  </button>

                  <div className="absolute top-2 left-2 bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded shadow">
                    {activeVariant.sku}
                  </div>

                  <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded shadow">
                    {activeVariant.heightInches}&quot;H × {activeVariant.widthInches}&quot;W
                  </div>
                </div>

                <div className="px-4 pt-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400 text-[11px]">
                      Finish: <span className="text-slate-200 font-medium">{activeVariant.colorName}</span>
                    </span>
                    <span className="text-slate-400 text-[11px] font-mono">
                      {activeVariant.weightKg} kg
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {product.variants.map((v) => (
                      <button
                        key={v.sku}
                        onClick={() => setActiveVariants((prev) => ({ ...prev, [product.slug]: v }))}
                        className={`w-5 h-5 rounded-full border transition-all ${
                          activeVariant.sku === v.sku
                            ? "border-amber-400 scale-110 ring-2 ring-amber-500/30"
                            : "border-slate-700 hover:scale-105"
                        }`}
                        style={{ backgroundColor: v.colorHex }}
                        title={`${v.colorName} (${v.sku})`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border-t border-slate-800/80 rounded-b-2xl mt-4">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <div className="text-xl font-black font-mono text-amber-400">
                        {formatNPR(price)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        MRP <span className="line-through">{formatNPR(activeVariant.mrpNpr)}</span>{" "}
                        <span className="text-emerald-400">(Save {formatNPR(savings)})</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">
                        {userRole === "DEALER" ? "Dealer Wholesale" : "Factory Direct"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    <button
                      onClick={() => addToCart(product, activeVariant, 1)}
                      className="col-span-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs transition-colors shadow-md border border-red-700/60"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => addToCompare(product, activeVariant)}
                      className="col-span-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg flex items-center justify-center border border-slate-700 transition-colors"
                      title="Compare technical specifications"
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
