"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Scale,
  Trash2,
  Check,
  Minus,
  ShoppingCart,
  Ruler,
  Weight,
  Layers,
  Lock,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { useEverestStore } from "@/store/useStore";
import { formatNPR } from "@/lib/formatters";

export function ComparisonDrawer() {
  const {
    comparisonList,
    isComparisonOpen,
    setComparisonOpen,
    removeFromCompare,
    clearComparison,
    addToCart,
    userRole
  } = useEverestStore();

  if (!isComparisonOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200 flex items-end sm:items-center justify-center p-2 sm:p-6">
      <div
        className="w-full max-w-6xl bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-950/60 border border-amber-800 text-amber-400 rounded-lg">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white font-heading">
                Steel Furniture Engineering Specification Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Comparing {comparisonList.length} of 4 maximum models side-by-side
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparisonList.length > 0 && (
              <button
                onClick={clearComparison}
                className="text-xs text-slate-400 hover:text-red-400 px-2 py-1 rounded transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setComparisonOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {comparisonList.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <Scale className="w-12 h-12 mx-auto text-slate-600 opacity-40" />
              <p className="text-sm font-semibold">No steel furniture models selected for comparison</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the compare icon on any almirah, filing cabinet, or tijori safe to benchmark steel gauges, weights, lockers, and factory prices.
              </p>
              <button
                onClick={() => setComparisonOpen(false)}
                className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
              >
                Return to Catalog
              </button>
            </div>
          ) : (
            <div className="min-w-[650px] overflow-x-auto">
              {/* Product Cards Row */}
              <div className="grid grid-cols-5 gap-3 border-b border-slate-800 pb-5">
                <div className="col-span-1 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-end pb-2">
                  Model & Overview
                </div>

                {comparisonList.map(({ product, variant }) => {
                  const price = userRole === "DEALER" ? variant.dealerPriceNpr : variant.sellingPriceNpr;
                  return (
                    <div key={variant.sku} className="col-span-1 bg-slate-950/70 p-3 rounded-xl border border-slate-800 relative flex flex-col justify-between">
                      <button
                        onClick={() => removeFromCompare(variant.sku)}
                        className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="relative w-full aspect-[4/5] bg-slate-900 rounded-lg overflow-hidden border border-slate-700/60 mb-2">
                        <Image
                          src={variant.exteriorImages[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                        <div
                          className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-slate-900"
                          style={{ backgroundColor: variant.colorHex }}
                          title={variant.colorName}
                        />
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{product.name}</h4>
                        <div className="text-[10px] text-amber-500 font-mono mt-0.5">{variant.sku}</div>
                        <div className="text-sm font-black font-mono text-amber-400 mt-1">{formatNPR(price)}</div>
                      </div>

                      <button
                        onClick={() => addToCart(product, variant, 1)}
                        className="mt-2.5 w-full bg-red-900 hover:bg-red-800 text-white text-[11px] font-bold py-1.5 rounded flex items-center justify-center gap-1 transition-colors"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Specification Comparison Rows */}
              <div className="divide-y divide-slate-800/60 text-xs">
                {/* Dimensions */}
                <div className="grid grid-cols-5 gap-3 py-3 items-center">
                  <div className="col-span-1 font-semibold text-slate-400 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-amber-500" />
                    <span>Dimensions (HxWxD)</span>
                  </div>
                  {comparisonList.map(({ variant }) => (
                    <div key={variant.sku} className="col-span-1 font-mono text-slate-200">
                      {variant.heightInches}&quot; × {variant.widthInches}&quot; × {variant.depthInches}&quot;
                    </div>
                  ))}
                </div>

                {/* Net Steel Weight */}
                <div className="grid grid-cols-5 gap-3 py-3 items-center">
                  <div className="col-span-1 font-semibold text-slate-400 flex items-center gap-1.5">
                    <Weight className="w-3.5 h-3.5 text-amber-500" />
                    <span>Net Weight (kg)</span>
                  </div>
                  {comparisonList.map(({ variant }) => (
                    <div key={variant.sku} className="col-span-1 font-mono font-bold text-amber-400">
                      {variant.weightKg} kg
                    </div>
                  ))}
                </div>

                {/* Steel Gauge */}
                <div className="grid grid-cols-5 gap-3 py-3 items-center">
                  <div className="col-span-1 font-semibold text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-500" />
                    <span>Steel Sheet Gauge</span>
                  </div>
                  {comparisonList.map(({ product, variant }) => (
                    <div key={variant.sku} className="col-span-1 text-slate-200 font-medium">
                      {product.steelGauge}
                    </div>
                  ))}
                </div>

                {/* Pre-Treatment */}
                <div className="grid grid-cols-5 gap-3 py-3 items-center">
                  <div className="col-span-1 font-semibold text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Anti-Rust Treatment</span>
                  </div>
                  {comparisonList.map(({ product, variant }) => (
                    <div key={variant.sku} className="col-span-1 text-emerald-400 font-medium text-[11px]">
                      7-Tank Hot Chemical Phosphate
                    </div>
                  ))}
                </div>

                {/* Lock Mechanism */}
                <div className="grid grid-cols-5 gap-3 py-3 items-center">
                  <div className="col-span-1 font-semibold text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Locking Mechanism</span>
                  </div>
                  {comparisonList.map(({ product, variant }) => (
                    <div key={variant.sku} className="col-span-1 text-slate-300 text-[11px]">
                      {product.lockMechanism || "Standard Precision Deadlock"}
                    </div>
                  ))}
                </div>

                {/* Security Vault Locker */}
                <div className="grid grid-cols-5 gap-3 py-3 items-center">
                  <div className="col-span-1 font-semibold text-slate-400">
                    Internal Vault Locker
                  </div>
                  {comparisonList.map(({ product, variant }) => (
                    <div key={variant.sku} className="col-span-1">
                      {product.hasLocker ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                          <Check className="w-4 h-4" /> Yes (With dual keys)
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1">
                          <Minus className="w-4 h-4" /> No
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Secret Trapdoor */}
                <div className="grid grid-cols-5 gap-3 py-3 items-center">
                  <div className="col-span-1 font-semibold text-slate-400">
                    Jewellery Trapdoor (चोर खण्ड)
                  </div>
                  {comparisonList.map(({ product, variant }) => (
                    <div key={variant.sku} className="col-span-1">
                      {product.hasSecretCompartment ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                          <Check className="w-4 h-4" /> Yes (Concealed bottom)
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1">
                          <Minus className="w-4 h-4" /> No
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Dressing Mirror */}
                <div className="grid grid-cols-5 gap-3 py-3 items-center">
                  <div className="col-span-1 font-semibold text-slate-400">
                    Full-Length Mirror
                  </div>
                  {comparisonList.map(({ product, variant }) => (
                    <div key={variant.sku} className="col-span-1">
                      {product.hasMirror ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                          <Check className="w-4 h-4" /> Saint-Gobain 5mm
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1">
                          <Minus className="w-4 h-4" /> Solid Steel Door
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
