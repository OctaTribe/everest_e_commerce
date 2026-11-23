"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Filter,
  X,
  SlidersHorizontal,
  Scale,
  ShoppingCart,
  Eye,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { SEED_PRODUCTS, SeedProduct, SeedProductVariant } from "@/data/seed-data";
import { useEverestStore } from "@/store/useStore";
import { formatNPR } from "@/lib/formatters";

export function ProductCatalogView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    openQuickView,
    addToCart,
    addToCompare,
    comparisonList,
    setComparisonOpen,
    removeFromCompare,
    userRole
  } = useEverestStore();

  // Active filters from URL or default
  const selectedCategory = searchParams.get("category") || "ALL";
  const selectedCoating = searchParams.get("coating") || "ALL";
  const selectedHeight = searchParams.get("height") || "ALL";
  const selectedColor = searchParams.get("color") || "ALL";
  const selectedPriceRange = searchParams.get("price") || "ALL";
  const filterLocker = searchParams.get("locker") === "true";
  const filterMirror = searchParams.get("mirror") === "true";
  const filterSecret = searchParams.get("secret") === "true";
  const sortBy = searchParams.get("sort") || "featured";

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Helper to update URL search parameters
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "ALL" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  // Local state for active variant per card
  const [activeVariants, setActiveVariants] = useState<Record<string, SeedProductVariant>>(() => {
    const init: Record<string, SeedProductVariant> = {};
    SEED_PRODUCTS.forEach((p) => {
      init[p.slug] = p.variants[0];
    });
    return init;
  });

  // Filter products
  const filteredProducts = useMemo(() => {
    return SEED_PRODUCTS.filter((product) => {
      // 1. Category Filter
      if (selectedCategory !== "ALL" && product.category !== selectedCategory) {
        return false;
      }

      // 2. Door/Locker Configuration
      if (filterLocker && !product.hasLocker) return false;
      if (filterMirror && !product.hasMirror) return false;
      if (filterSecret && !product.hasSecretCompartment) return false;

      // 3. Variant-level filters (coating, height, color, price)
      const matchingVariants = product.variants.filter((variant) => {
        if (selectedCoating !== "ALL" && variant.coatingType !== selectedCoating) {
          return false;
        }
        if (selectedHeight !== "ALL" && variant.heightInches.toString() !== selectedHeight) {
          return false;
        }
        if (selectedColor !== "ALL" && !variant.colorName.toLowerCase().includes(selectedColor.toLowerCase())) {
          return false;
        }
        if (selectedPriceRange !== "ALL") {
          const price = variant.sellingPriceNpr;
          if (selectedPriceRange === "under-25k" && price >= 25000) return false;
          if (selectedPriceRange === "25k-40k" && (price < 25000 || price > 40000)) return false;
          if (selectedPriceRange === "above-40k" && price <= 40000) return false;
        }
        return true;
      });

      return matchingVariants.length > 0;
    }).sort((a, b) => {
      const varA = activeVariants[a.slug] || a.variants[0];
      const varB = activeVariants[b.slug] || b.variants[0];

      if (sortBy === "price-low") return varA.sellingPriceNpr - varB.sellingPriceNpr;
      if (sortBy === "price-high") return varB.sellingPriceNpr - varA.sellingPriceNpr;
      if (sortBy === "weight-heavy") return varB.weightKg - varA.weightKg;
      return 0; // default featured
    });
  }, [
    selectedCategory,
    selectedCoating,
    selectedHeight,
    selectedColor,
    selectedPriceRange,
    filterLocker,
    filterMirror,
    filterSecret,
    sortBy,
    activeVariants
  ]);

  const activeFilterCount =
    (selectedCategory !== "ALL" ? 1 : 0) +
    (selectedCoating !== "ALL" ? 1 : 0) +
    (selectedHeight !== "ALL" ? 1 : 0) +
    (selectedColor !== "ALL" ? 1 : 0) +
    (selectedPriceRange !== "ALL" ? 1 : 0) +
    (filterLocker ? 1 : 0) +
    (filterMirror ? 1 : 0) +
    (filterSecret ? 1 : 0);

  return (
    <div className="bg-slate-900 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
              Everest Steel Factory Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Direct factory order with heavy highway freight dispatch from Birgunj to all 7 Provinces.
            </p>
          </div>

          {/* Sort Controls & Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold"
            >
              <Filter className="w-4 h-4 text-amber-500" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <span className="text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="bg-transparent text-white outline-none font-semibold cursor-pointer"
              >
                <option value="featured" className="bg-slate-900">Featured Models</option>
                <option value="price-low" className="bg-slate-900">Price: Low to High</option>
                <option value="price-high" className="bg-slate-900">Price: High to Low</option>
                <option value="weight-heavy" className="bg-slate-900">Heaviest Steel First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="font-bold text-sm text-white flex items-center gap-1.5 font-heading">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                <span>Filter Specifications</span>
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* 1. Category Facet */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: "ALL", label: "All Categories" },
                  { id: "HOUSEHOLD_ALMIRAH", label: "Household Almirahs" },
                  { id: "OFFICE_ALMIRAH", label: "Office Almirahs" },
                  { id: "FILING_CABINETS", label: "Filing Cabinets" },
                  { id: "OFFICE_TABLES", label: "Executive Desks" },
                  { id: "SAFES_TIJORI", label: "Safes & Tijori" },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateFilter("category", c.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === c.id
                        ? "bg-amber-600 text-white font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Coating Type Facet */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Coating Technology
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: "ALL", label: "All Coatings" },
                  { id: "POWDER_COATED", label: "Powder Coated (Hot 7-Tank)" },
                  { id: "ENAMEL_COATED", label: "Industrial Stove Enamel" },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateFilter("coating", c.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                      selectedCoating === c.id
                        ? "bg-amber-600 text-white font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Height Facet */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Almirah Height
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                {["ALL", "78", "72", "66"].map((h) => (
                  <button
                    key={h}
                    onClick={() => updateFilter("height", h)}
                    className={`py-1.5 rounded-lg border text-center transition-all ${
                      selectedHeight === h
                        ? "border-amber-500 bg-slate-800 text-amber-400 font-bold"
                        : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {h === "ALL" ? "All" : `${h}"`}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Color Swatches Facet */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Color Finish
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "ALL", label: "All", hex: "#334155" },
                  { name: "Maroon", label: "Maroon", hex: "#7F1D1D" },
                  { name: "Blue", label: "Blue", hex: "#0284C7" },
                  { name: "Brown", label: "Brown", hex: "#78350F" },
                  { name: "Grey", label: "Grey", hex: "#334155" },
                  { name: "Ivory", label: "Ivory", hex: "#FDF8F0" },
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => updateFilter("color", color.name)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[11px] ${
                      selectedColor === color.name
                        ? "border-amber-400 bg-slate-800 text-white font-bold"
                        : "border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-slate-900"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Price Range Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Price Bracket (NPR)
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: "ALL", label: "All Prices" },
                  { id: "under-25k", label: "Under NPR 25,000" },
                  { id: "25k-40k", label: "NPR 25,000 – 40,000" },
                  { id: "above-40k", label: "Above NPR 40,000" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => updateFilter("price", p.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                      selectedPriceRange === p.id
                        ? "bg-amber-600 text-white font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Door & Security Configuration Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Security Features
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={filterLocker}
                    onChange={(e) => updateFilter("locker", e.target.checked ? "true" : null)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Inner Security Locker</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={filterSecret}
                    onChange={(e) => updateFilter("secret", e.target.checked ? "true" : null)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Jewellery Trapdoor (चोर खण्ड)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={filterMirror}
                    onChange={(e) => updateFilter("mirror", e.target.checked ? "true" : null)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Saint-Gobain Dressing Mirror</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Cards Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Active Filters Pill Bar */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 font-semibold mr-1">Active Filters:</span>
                {selectedCategory !== "ALL" && (
                  <span className="inline-flex items-center gap-1 bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono text-[11px]">
                    {selectedCategory}
                    <button onClick={() => updateFilter("category", "ALL")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedCoating !== "ALL" && (
                  <span className="inline-flex items-center gap-1 bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono text-[11px]">
                    {selectedCoating}
                    <button onClick={() => updateFilter("coating", "ALL")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedHeight !== "ALL" && (
                  <span className="inline-flex items-center gap-1 bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono text-[11px]">
                    {selectedHeight}&quot;
                    <button onClick={() => updateFilter("height", "ALL")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedColor !== "ALL" && (
                  <span className="inline-flex items-center gap-1 bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono text-[11px]">
                    {selectedColor}
                    <button onClick={() => updateFilter("color", "ALL")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-slate-400 hover:text-white underline ml-auto text-[11px]"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div>
                Showing <span className="font-bold text-white">{filteredProducts.length}</span> steel models
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>All units include 5-Year Factory Warranty</span>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto opacity-40" />
                <h3 className="text-base font-bold text-white">No matching steel models found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try broadening your height, color, or price filters to see more factory models.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const activeVariant = activeVariants[product.slug] || product.variants[0];
                  const price = userRole === "DEALER" ? activeVariant.dealerPriceNpr : activeVariant.sellingPriceNpr;
                  const isCompared = comparisonList.some((item) => item.variant.sku === activeVariant.sku);

                  return (
                    <div
                      key={product.slug}
                      className="bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 shadow-xl overflow-hidden flex flex-col justify-between group transition-all"
                    >
                      {/* Top Badges */}
                      <div className="p-4 pb-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-amber-500 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded uppercase">
                            {product.category.replace(/_/g, " ")}
                          </span>
                          {product.isBestseller && (
                            <span className="text-[10px] font-bold text-red-300 bg-red-950 border border-red-800 px-2 py-0.5 rounded">
                              Bestseller
                            </span>
                          )}
                        </div>

                        <Link href={`/products/${product.slug}?sku=${activeVariant.sku}`}>
                          <h3 className="text-base font-bold text-white mt-2 group-hover:text-amber-400 transition-colors font-heading truncate">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="text-[11px] text-amber-500/80 truncate">
                          {product.nepaliName}
                        </div>
                      </div>

                      {/* Product Image Stage */}
                      <div className="relative mx-4 aspect-[4/5] bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <Image
                          src={activeVariant.exteriorImages[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-103 transition-transform"
                          sizes="300px"
                        />

                        <button
                          onClick={() => openQuickView(product, activeVariant)}
                          className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1"
                        >
                          <Eye className="w-4 h-4 text-amber-400" />
                          <span>Inspect Cutaway</span>
                        </button>

                        <div className="absolute top-2 left-2 bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded">
                          {activeVariant.sku}
                        </div>

                        <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded">
                          {activeVariant.heightInches}&quot;H • {activeVariant.weightKg} kg
                        </div>
                      </div>

                      {/* Color Swatches */}
                      <div className="px-4 pt-3">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-slate-400 text-[11px]">
                            Finish: <span className="text-slate-200 font-medium">{activeVariant.colorName}</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {activeVariant.coatingType === "POWDER_COATED" ? "Powder Coated" : "Stove Enamel"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {product.variants.map((v) => (
                            <button
                              key={v.sku}
                              onClick={() =>
                                setActiveVariants((prev) => ({ ...prev, [product.slug]: v }))
                              }
                              className={`w-4 h-4 rounded-full border transition-all ${
                                activeVariant.sku === v.sku
                                  ? "border-amber-400 scale-110 ring-2 ring-amber-500/30"
                                  : "border-slate-700"
                              }`}
                              style={{ backgroundColor: v.colorHex }}
                              title={v.colorName}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Spec summary */}
                      <div className="px-4 py-2.5 text-[11px] text-slate-400 border-t border-slate-900 mt-2 space-y-1">
                        <div className="truncate" title={product.steelGauge}>
                          Steel: <span className="text-slate-200">{product.steelGauge}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span>Vault Locker: {product.hasLocker ? "Yes" : "No"}</span>
                          <span>Mirror: {product.hasMirror ? "Saint-Gobain" : "None"}</span>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-4 bg-slate-950 border-t border-slate-800/80 rounded-b-2xl">
                        <div className="flex items-baseline justify-between mb-3">
                          <div className="font-mono text-lg font-black text-amber-400">
                            {formatNPR(price)}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            MRP <span className="line-through">{formatNPR(activeVariant.mrpNpr)}</span>
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
                            className={`col-span-1 rounded-lg flex items-center justify-center border transition-colors ${
                              isCompared
                                ? "bg-amber-600 text-white border-amber-500"
                                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                            }`}
                            title="Compare specifications"
                          >
                            <Scale className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Sticky Bottom Comparison Tray (When items selected for comparison) */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-30 bg-slate-950/95 backdrop-blur-md border-t-2 border-amber-500/80 p-3 sm:p-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-amber-950 border border-amber-800 text-amber-400 rounded-lg shrink-0">
                <Scale className="w-5 h-5" />
              </div>

              <div className="hidden sm:block">
                <div className="font-bold text-sm text-white font-heading">
                  Spec Comparison Tray ({comparisonList.length}/4)
                </div>
                <div className="text-[11px] text-slate-400">
                  Compare steel gauges, weights, lockers, and factory prices side-by-side.
                </div>
              </div>

              {/* Thumbnails of selected comparison models */}
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {comparisonList.map(({ product, variant }) => (
                  <div
                    key={variant.sku}
                    className="relative flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-1 pr-3 shrink-0"
                  >
                    <div className="relative w-8 h-10 bg-slate-950 rounded overflow-hidden">
                      <Image src={variant.exteriorImages[0]} alt={product.name} fill className="object-cover" sizes="32px" />
                    </div>
                    <div className="text-[11px]">
                      <div className="font-semibold text-white truncate max-w-[100px]">{product.name}</div>
                      <div className="text-[10px] text-amber-400 font-mono">{formatNPR(variant.sellingPriceNpr)}</div>
                    </div>
                    <button
                      onClick={() => removeFromCompare(variant.sku)}
                      className="text-slate-500 hover:text-red-400 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setComparisonOpen(true)}
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shrink-0 transition-all hover:scale-102"
            >
              <span>Launch Comparison Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
