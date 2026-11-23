"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Shield, ArrowUpRight, ArrowRight, Layers, Tag, Ruler } from "lucide-react";
import { useEverestStore } from "@/store/useStore";
import { SEED_PRODUCTS, SeedProduct, SeedProductVariant } from "@/data/seed-data";
import { formatNPR } from "@/lib/formatters";

interface SearchResultItem {
  product: SeedProduct;
  variant: SeedProductVariant;
  matchReason: string;
}

export function InstantSearchModal() {
  const { isSearchOpen, setSearchOpen, openQuickView, userRole } = useEverestStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens & register keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape" && isSearchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm("");
    }
  }, [isSearchOpen]);

  // Real-time fuzzy / SKU / Dimension / Gauge matching
  const searchResults: SearchResultItem[] = useMemo(() => {
    if (!searchTerm.trim()) {
      // Default recommended flagship models
      return SEED_PRODUCTS.slice(0, 4).map((p) => ({
        product: p,
        variant: p.variants[0],
        matchReason: "Flagship Everest Model",
      }));
    }

    const term = searchTerm.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    for (const product of SEED_PRODUCTS) {
      if (selectedCategory !== "ALL" && product.category !== selectedCategory) {
        continue;
      }

      for (const variant of product.variants) {
        let matched = false;
        let matchReason = "";

        // 1. SKU Exact/Partial Match (e.g., "ESF-SAN", "78-MRN")
        if (variant.sku.toLowerCase().includes(term)) {
          matched = true;
          matchReason = `Exact SKU Match: ${variant.sku}`;
        }
        // 2. Dimension Match (e.g. 78, 72, 40, 21, 66)
        else if (
          variant.heightInches.toString() === term ||
          variant.widthInches.toString() === term ||
          `${variant.heightInches}"`.includes(term) ||
          `${variant.heightInches} inch`.includes(term)
        ) {
          matched = true;
          matchReason = `Dimension Match: ${variant.heightInches}" Height`;
        }
        // 3. Product Name or Nepali Name Match
        else if (
          product.name.toLowerCase().includes(term) ||
          product.nepaliName.toLowerCase().includes(term) ||
          product.slug.includes(term)
        ) {
          matched = true;
          matchReason = "Model Name Match";
        }
        // 4. Color Name Match (e.g. Maroon, Blue, Grey)
        else if (variant.colorName.toLowerCase().includes(term)) {
          matched = true;
          matchReason = `Color Finish: ${variant.colorName}`;
        }
        // 5. Gauge Match (e.g. "20 gauge", "crca", "18 gauge")
        else if (product.steelGauge.toLowerCase().includes(term)) {
          matched = true;
          matchReason = `Steel Gauge: ${product.steelGauge}`;
        }

        if (matched) {
          results.push({ product, variant, matchReason });
        }
      }
    }

    return results;
  }, [searchTerm, selectedCategory]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-slate-800 p-4 gap-3 bg-slate-950/60">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by model (e.g. Sansaar, Janki), SKU (ESF-SAN-78), dimension (78&quot;), or steel gauge..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base outline-none font-medium"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setSearchOpen(false)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2.5 py-1.5 rounded font-mono border border-slate-700 shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills & Suggested Dimension Chips */}
        <div className="flex flex-wrap items-center gap-1.5 px-4 py-2.5 bg-slate-950/30 border-b border-slate-800/80 text-xs overflow-x-auto">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Quick Filter:
          </span>

          {[
            { id: "ALL", label: "All Categories" },
            { id: "HOUSEHOLD_ALMIRAH", label: "Household Almirahs" },
            { id: "OFFICE_ALMIRAH", label: "Office Almirahs" },
            { id: "FILING_CABINETS", label: "Filing Cabinets" },
            { id: "SAFES_TIJORI", label: "Safes & Tijori" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? "bg-amber-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}

          {/* Quick Dimension Triggers */}
          <div className="flex items-center gap-1 ml-auto text-slate-400 text-[11px]">
            <Ruler className="w-3 h-3 text-slate-500" />
            <span>Popular:</span>
            {["78\"", "72\"", "4 Drawer", "Tijori"].map((dim) => (
              <button
                key={dim}
                onClick={() => setSearchTerm(dim.replace('"', ""))}
                className="text-amber-400 hover:underline font-mono"
              >
                {dim}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-slate-800/50">
          {searchResults.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" />
              <p className="text-sm font-semibold">No steel furniture matches found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for &quot;Sansaar&quot;, &quot;Janki&quot;, &quot;78&quot;&quot;, &quot;ESF-SAN&quot;, or &quot;20 Gauge&quot;.
              </p>
            </div>
          ) : (
            searchResults.map(({ product, variant, matchReason }) => (
              <div
                key={`${product.slug}-${variant.sku}`}
                className="pt-2.5 first:pt-0 flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-slate-800/60 transition-colors group"
              >
                {/* Product Thumbnail & Basic Specs */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-14 h-16 sm:w-16 sm:h-20 bg-slate-950 rounded border border-slate-700/80 overflow-hidden shrink-0">
                    <Image
                      src={variant.exteriorImages[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="64px"
                    />
                    <div
                      className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-slate-900 shadow-sm"
                      style={{ backgroundColor: variant.colorHex }}
                      title={variant.colorName}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </span>
                      <span className="text-[10px] font-mono text-amber-500 bg-amber-950/60 border border-amber-800 px-1 rounded">
                        {variant.sku}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded font-mono">
                        {variant.heightInches}&quot;H × {variant.widthInches}&quot;W
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {product.nepaliName} • {product.steelGauge}
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <span className="text-slate-400 font-medium">
                        Finish: <span className="text-slate-300">{variant.colorName}</span>
                      </span>
                      <span>•</span>
                      <span className="text-slate-400">Weight: {variant.weightKg} kg</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline text-amber-400/90 font-mono text-[10px]">
                        [{matchReason}]
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Quick Action */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 shrink-0 text-right">
                  <div>
                    <div className="text-sm sm:text-base font-bold font-mono text-amber-400">
                      {formatNPR(
                        userRole === "DEALER" ? variant.dealerPriceNpr : variant.sellingPriceNpr
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono line-through">
                      MRP {formatNPR(variant.mrpNpr)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        openQuickView(product, variant);
                      }}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-700 transition-colors"
                    >
                      Quick View
                    </button>

                    <Link
                      href={`/products/${product.slug}?sku=${variant.sku}`}
                      onClick={() => setSearchOpen(false)}
                      className="p-1.5 bg-red-900 hover:bg-red-800 text-white rounded transition-colors"
                      title="View full specs"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Factory Direct Dispatch • 5-Year Lock & Rust Warranty</span>
          </div>

          <div className="font-mono text-slate-400">
            {searchResults.length} {searchResults.length === 1 ? "match" : "matches"} found
          </div>
        </div>
      </div>
    </div>
  );
}
