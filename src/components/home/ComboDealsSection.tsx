"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Award,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Eye,
  Scale
} from "lucide-react";
import { SEED_COMBOS, SeedComboDeal, SEED_PRODUCTS, SeedProductVariant } from "@/data/seed-data";
import { useEverestStore } from "@/store/useStore";
import { formatNPR } from "@/lib/formatters";

export function ComboDealsSection() {
  const { addComboToCart, openQuickView, addToCart, addToCompare, userRole } = useEverestStore();
  const [selectedComboId, setSelectedComboId] = useState<string>(SEED_COMBOS[0].id);
  const [comboAddedNotice, setComboAddedNotice] = useState<string | null>(null);

  const selectedCombo = SEED_COMBOS.find((c) => c.id === selectedComboId) || SEED_COMBOS[0];

  const handleAddCombo = (combo: SeedComboDeal) => {
    addComboToCart(combo);
    setComboAddedNotice(combo.id);
    setTimeout(() => setComboAddedNotice(null), 2500);
  };

  const bestSellers = SEED_PRODUCTS.filter((p) => p.isBestseller);
  const [bestsellerVariants, setBestsellerVariants] = useState<Record<string, SeedProductVariant>>(() => {
    const init: Record<string, SeedProductVariant> = {};
    bestSellers.forEach((p) => {
      init[p.slug] = p.variants[0];
    });
    return init;
  });

  return (
    <section className="py-16 lg:py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. NEWLYWED & HOME SETUP COMBOS */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Birgunj Factory Bundles • Furniture Hub Strategy</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight">
                Newlywed & Home Setup Combos
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Bundle Everest&apos;s matching wardrobe with an armored tijori safe. Save up to NPR 11,500 with zero middleman showroom markup.
              </p>
            </div>

            {/* Combo Navigation Pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              {SEED_COMBOS.map((combo) => (
                <button
                  key={combo.id}
                  onClick={() => setSelectedComboId(combo.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    selectedComboId === combo.id
                      ? "bg-red-900 text-white shadow-md border border-red-700"
                      : "bg-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <span>{combo.title}</span>
                  <span className="ml-1.5 text-[10px] text-amber-300 font-mono">({combo.badge})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Featured Combo Showcase Card */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl border-2 border-amber-600/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Red glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-950/30 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Image Stage */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/11] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                  <Image
                    src={selectedCombo.image}
                    alt={selectedCombo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-red-950/90 border border-red-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{selectedCombo.badge}</span>
                  </div>

                  {/* Bottom Bar: Free Crate Transit */}
                  <div className="absolute bottom-3 inset-x-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Truck className="w-4 h-4" />
                      <span>Heavy Highway Freight Included</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Wooden Crate Transit</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing, Items & Action */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded">
                    Bundled Suite Package
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-2">
                    {selectedCombo.title}
                  </h3>
                  <div className="text-sm font-semibold text-amber-500/90">
                    {selectedCombo.nepaliTitle}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 italic">
                    &ldquo;{selectedCombo.tagline}&rdquo;
                  </p>
                </div>

                {/* Included Products List */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1.5">
                    What&apos;s Included in This Bundle:
                  </div>

                  <ul className="space-y-2 text-xs">
                    {selectedCombo.includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                  {selectedCombo.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Block */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-mono">
                      Individual Retail Total:{" "}
                      <span className="line-through">{formatNPR(selectedCombo.originalPriceNpr)}</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 mt-0.5">
                      {formatNPR(selectedCombo.comboPriceNpr)}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-1 rounded text-xs font-bold font-mono">
                      {selectedCombo.badge}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">Ex-Birgunj Factory</div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => handleAddCombo(selectedCombo)}
                    className="flex-1 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all border border-red-700/60"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>
                      {comboAddedNotice === selectedCombo.id ? "Combo Added to Cart!" : "Add Complete Bundle to Cart"}
                    </span>
                  </button>

                  <a
                    href={`https://wa.me/9779855021000?text=${encodeURIComponent(
                      `Namaste Everest Steel! I am interested in the ${selectedCombo.title} (${formatNPR(
                        selectedCombo.comboPriceNpr
                      )}). Could you confirm delivery to my city?`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors font-semibold text-xs flex items-center gap-1.5"
                    title="Inquire via WhatsApp"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. BEST SELLERS CAROUSEL / GRID */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Household Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Everest Best Sellers Across Nepal
              </h2>
            </div>

            <Link
              href="/products?bestsellers=true"
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All Bestsellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellers.slice(0, 4).map((product) => {
              const activeVariant = bestsellerVariants[product.slug] || product.variants[0];
              const price = userRole === "DEALER" ? activeVariant.dealerPriceNpr : activeVariant.sellingPriceNpr;

              return (
                <div
                  key={product.slug}
                  className="bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-slate-700 shadow-xl overflow-hidden flex flex-col justify-between group transition-all"
                >
                  {/* Top Bar */}
                  <div className="p-3 pb-1 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-red-300 bg-red-950 border border-red-800 px-1.5 py-0.5 rounded">
                      #1 Bestseller
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {activeVariant.heightInches}&quot;H
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative mx-3 aspect-[4/5] bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                    <Image
                      src={activeVariant.exteriorImages[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform"
                      sizes="250px"
                    />

                    <button
                      onClick={() => openQuickView(product, activeVariant)}
                      className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1"
                    >
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-3.5 space-y-2">
                    <div>
                      <h4 className="font-bold text-sm text-white truncate font-heading group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 truncate">
                        {product.steelGauge}
                      </div>
                    </div>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1.5">
                      {product.variants.slice(0, 4).map((v) => (
                        <button
                          key={v.sku}
                          onClick={() =>
                            setBestsellerVariants((prev) => ({ ...prev, [product.slug]: v }))
                          }
                          className={`w-4 h-4 rounded-full border transition-all ${
                            activeVariant.sku === v.sku
                              ? "border-amber-400 scale-110"
                              : "border-slate-700"
                          }`}
                          style={{ backgroundColor: v.colorHex }}
                          title={v.colorName}
                        />
                      ))}
                    </div>

                    {/* Price & Add */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <div className="font-mono font-bold text-amber-400 text-sm">
                        {formatNPR(price)}
                      </div>

                      <button
                        onClick={() => addToCart(product, activeVariant, 1)}
                        className="bg-red-900 hover:bg-red-800 text-white text-xs font-bold p-2 rounded-lg flex items-center gap-1 transition-colors"
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
