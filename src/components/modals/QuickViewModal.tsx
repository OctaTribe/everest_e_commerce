"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShieldCheck,
  Check,
  ShoppingCart,
  Scale,
  Ruler,
  Weight,
  Layers,
  Lock,
  Eye,
  ArrowRight,
  Info
} from "lucide-react";
import { useEverestStore } from "@/store/useStore";
import { formatNPR } from "@/lib/formatters";
import { SeedProductVariant } from "@/data/seed-data";

export function QuickViewModal() {
  const {
    isQuickViewOpen,
    quickViewProduct,
    quickViewVariant,
    closeQuickView,
    addToCart,
    addToCompare,
    userRole
  } = useEverestStore();

  const [activeVariant, setActiveVariant] = useState<SeedProductVariant | null>(null);
  const [activeImageView, setActiveImageView] = useState<"exterior" | "cutaway" | "blueprint">("exterior");
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Sync active variant when quickViewVariant changes
  React.useEffect(() => {
    if (quickViewVariant) {
      setActiveVariant(quickViewVariant);
    } else if (quickViewProduct?.variants[0]) {
      setActiveVariant(quickViewProduct.variants[0]);
    }
    setActiveImageView("exterior");
    setQuantity(1);
    setAddedNotice(false);
  }, [quickViewProduct, quickViewVariant]);

  if (!isQuickViewOpen || !quickViewProduct || !activeVariant) return null;

  const currentPrice = userRole === "DEALER" ? activeVariant.dealerPriceNpr : activeVariant.sellingPriceNpr;
  const savings = activeVariant.mrpNpr - currentPrice;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, activeVariant, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const currentImage =
    activeImageView === "cutaway"
      ? activeVariant.interiorCutawayImage
      : activeImageView === "blueprint"
      ? activeVariant.dimensionBlueprintImage
      : activeVariant.exteriorImages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Viewer with Cutaway & Blueprint Tabs */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800">
          <div>
            {/* View Mode Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold mb-4">
              <button
                onClick={() => setActiveImageView("exterior")}
                className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1 transition-all ${
                  activeImageView === "exterior"
                    ? "bg-slate-800 text-amber-400 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>360° Exterior</span>
              </button>

              <button
                onClick={() => setActiveImageView("cutaway")}
                className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1 transition-all ${
                  activeImageView === "cutaway"
                    ? "bg-slate-800 text-amber-400 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Interior Cutaway</span>
              </button>

              <button
                onClick={() => setActiveImageView("blueprint")}
                className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1 transition-all ${
                  activeImageView === "blueprint"
                    ? "bg-slate-800 text-amber-400 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Blueprint</span>
              </button>
            </div>

            {/* Main Stage Image */}
            <div className="relative w-full aspect-[4/5] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
              <Image
                src={currentImage}
                alt={quickViewProduct.name}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 450px"
              />

              {/* View Overlay Tag */}
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 px-2.5 py-1 rounded text-[11px] font-mono text-slate-300">
                {activeImageView === "exterior" && `Finish: ${activeVariant.colorName}`}
                {activeImageView === "cutaway" && "Internal Security Vault & Shelf Architecture"}
                {activeImageView === "blueprint" && `${activeVariant.heightInches}"H × ${activeVariant.widthInches}"W × ${activeVariant.depthInches}"D`}
              </div>
            </div>
          </div>

          {/* Quick Technical Specs Footnote */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>5-Year Birgunj Factory Warranty</span>
            </span>
            <span className="font-mono text-amber-500 font-bold">
              {activeVariant.sku}
            </span>
          </div>
        </div>

        {/* Right Column: Specifications & Purchasing Controls */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header / Titles */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded">
                {quickViewProduct.category.replace(/_/g, " ")}
              </span>
              {quickViewProduct.isBestseller && (
                <span className="text-[10px] font-bold text-red-300 bg-red-950 border border-red-800 px-2 py-0.5 rounded">
                  #1 Factory Bestseller
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 font-heading">
              {quickViewProduct.name}
            </h2>
            <div className="text-xs text-amber-500/90 font-medium">
              {quickViewProduct.nepaliName}
            </div>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
              {quickViewProduct.baseDescription}
            </p>

            {/* Pricing Section */}
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-baseline justify-between">
              <div>
                <div className="text-2xl font-black font-mono text-amber-400">
                  {formatNPR(currentPrice)}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  MRP <span className="line-through">{formatNPR(activeVariant.mrpNpr)}</span>{" "}
                  <span className="text-emerald-400 font-semibold">(Save {formatNPR(savings)})</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                  {userRole === "DEALER" ? "B2B Wholesale Price" : "Factory-Direct Price"}
                </span>
                <div className="text-[10px] text-slate-400 mt-1">Ex-Birgunj Warehouse</div>
              </div>
            </div>

            {/* Color Swatch Selection */}
            <div className="mt-5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Available Colors & Finishes:{" "}
                <span className="text-amber-400 font-medium">{activeVariant.colorName}</span>
              </label>

              <div className="flex flex-wrap gap-2.5">
                {quickViewProduct.variants.map((v) => (
                  <button
                    key={v.sku}
                    onClick={() => setActiveVariant(v)}
                    className={`flex items-center gap-2 p-1.5 pr-3 rounded-lg border text-xs font-medium transition-all ${
                      activeVariant.sku === v.sku
                        ? "border-amber-400 bg-slate-800/90 text-white shadow-md"
                        : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-slate-900 shadow-sm shrink-0"
                      style={{ backgroundColor: v.colorHex }}
                    />
                    <span>{v.colorName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5 text-amber-500" />
                  <span>Dimensions (HxWxD)</span>
                </div>
                <div className="font-mono font-bold text-slate-200 mt-0.5">
                  {activeVariant.heightInches}&quot; × {activeVariant.widthInches}&quot; × {activeVariant.depthInches}&quot;
                </div>
              </div>

              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Weight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Net Steel Weight</span>
                </div>
                <div className="font-mono font-bold text-slate-200 mt-0.5">
                  {activeVariant.weightKg} kg (Heavy Solid Build)
                </div>
              </div>

              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Steel Gauge & Quality</span>
                </div>
                <div className="font-semibold text-slate-200 mt-0.5 truncate" title={quickViewProduct.steelGauge}>
                  {quickViewProduct.steelGauge}
                </div>
              </div>

              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Security Mechanism</span>
                </div>
                <div className="font-semibold text-slate-200 mt-0.5 truncate" title={quickViewProduct.lockMechanism}>
                  6-Lever Brass Unpickable
                </div>
              </div>
            </div>
          </div>

          {/* Action Row: Quantity + Add to Cart + Compare */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono font-bold text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm transition-all border border-red-700/60"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{addedNotice ? "Added to Cart!" : "Add to Cart"}</span>
              </button>

              {/* Compare Button */}
              <button
                onClick={() => addToCompare(quickViewProduct, activeVariant)}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
                title="Add to Comparison Drawer"
              >
                <Scale className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Product Link */}
            <div className="flex items-center justify-between text-xs pt-1">
              <Link
                href={`/products/${quickViewProduct.slug}?sku=${activeVariant.sku}`}
                onClick={closeQuickView}
                className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View Full Product Dossier & Schematics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <span className="text-slate-400">Stock: {activeVariant.stockQty} Units Ready in Birgunj</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
