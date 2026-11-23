"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Factory,
  Truck,
  Layers,
  Ruler,
  Weight,
  ShoppingCart,
  Scale,
  CheckCircle2,
  Eye,
  Phone,
  MessageSquare,
  Lock,
  Sparkles,
  Share2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Info,
  Building,
  Check,
  Clock,
  MapPin
} from "lucide-react";
import {
  SeedProduct,
  SeedProductVariant,
  SEED_SHIPPING_ZONES,
  NEPAL_DISTRICT_LOGISTICS,
  DistrictLogisticsInfo
} from "@/data/seed-data";
import { useEverestStore } from "@/store/useStore";
import { formatNPR } from "@/lib/formatters";

export function ProductDetailView({ product }: { product: SeedProduct }) {
  const router = useRouter();
  const { addToCart, addToCompare, userRole } = useEverestStore();

  // Find or default active variant
  const [activeVariant, setActiveVariant] = useState<SeedProductVariant>(product.variants[0]);
  const [activeImageView, setActiveImageView] = useState<"exterior" | "cutaway" | "scale">("exterior");
  const [selectedCoating, setSelectedCoating] = useState<"POWDER_COATED" | "ENAMEL_COATED">(
    product.variants[0].coatingType
  );
  const [selectedHeight, setSelectedHeight] = useState<number>(product.variants[0].heightInches);
  const [selectedCity, setSelectedCity] = useState<DistrictLogisticsInfo>(NEPAL_DISTRICT_LOGISTICS[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const buyButtonRef = useRef<HTMLButtonElement>(null);

  // Sync active variant when user changes Color, Coating or Height
  const handleColorChange = (v: SeedProductVariant) => {
    setActiveVariant(v);
    setSelectedCoating(v.coatingType);
    setSelectedHeight(v.heightInches);
  };

  const handleCoatingChange = (coating: "POWDER_COATED" | "ENAMEL_COATED") => {
    setSelectedCoating(coating);
    const matching = product.variants.find(
      (v) =>
        v.coatingType === coating &&
        v.heightInches === selectedHeight &&
        v.colorName === activeVariant.colorName
    ) || product.variants.find((v) => v.coatingType === coating);
    if (matching) setActiveVariant(matching);
  };

  const handleHeightChange = (height: number) => {
    setSelectedHeight(height);
    const matching = product.variants.find(
      (v) =>
        v.heightInches === height &&
        v.coatingType === selectedCoating &&
        v.colorName === activeVariant.colorName
    ) || product.variants.find((v) => v.heightInches === height);
    if (matching) setActiveVariant(matching);
  };

  // Sticky action bar observer
  useEffect(() => {
    const handleScroll = () => {
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const price = userRole === "DEALER" ? activeVariant.dealerPriceNpr : activeVariant.sellingPriceNpr;
  const savings = activeVariant.mrpNpr - price;

  const handleAddToCart = () => {
    addToCart(product, activeVariant, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, activeVariant, quantity);
    router.push("/checkout");
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste Everest Steel Birgunj! I would like to order the ${product.name} (${activeVariant.sku}) in ${activeVariant.colorName} finish, height ${activeVariant.heightInches}". Please confirm heavy freight delivery to ${selectedCity.city}.`
  );

  return (
    <div className="bg-slate-900 py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Factory Catalog</span>
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="text-amber-500 uppercase tracking-wider hover:underline"
          >
            {product.category.replace(/_/g, " ")}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate">{product.name}</span>
        </nav>

        {/* Product Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: 3-Tab Visual Inspector */}
          <div className="lg:col-span-7 space-y-4 sticky top-24">
            
            {/* 3-Tab Selector Pill Bar */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold">
              <button
                onClick={() => setActiveImageView("exterior")}
                className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeImageView === "exterior"
                    ? "bg-slate-800 text-amber-400 shadow-md ring-1 ring-amber-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>1. Exterior Studio</span>
              </button>

              <button
                onClick={() => setActiveImageView("cutaway")}
                className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeImageView === "cutaway"
                    ? "bg-slate-800 text-amber-400 shadow-md ring-1 ring-amber-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>2. Interior Blueprint Layout</span>
              </button>

              <button
                onClick={() => setActiveImageView("scale")}
                className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeImageView === "scale"
                    ? "bg-slate-800 text-amber-400 shadow-md ring-1 ring-amber-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Ruler className="w-4 h-4" />
                <span>3. Human Scale Diagram</span>
              </button>
            </div>

            {/* Main Stage Display Area */}
            <div className="relative w-full aspect-[4/5] bg-slate-950 rounded-3xl border-2 border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
              
              {/* TAB 1: EXTERIOR STUDIO VIEW */}
              {activeImageView === "exterior" && (
                <div className="relative w-full h-full">
                  <Image
                    src={activeVariant.exteriorImages[0]}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/90 border border-slate-700 text-slate-300 font-mono text-xs px-3 py-1 rounded-md shadow">
                    Finish: {activeVariant.colorName} ({activeVariant.sku})
                  </div>
                  <div className="absolute bottom-4 left-4 bg-slate-950/90 border border-amber-600/80 text-amber-400 font-mono text-xs px-3 py-1 rounded-md shadow">
                    {activeVariant.heightInches}&quot;H × {activeVariant.widthInches}&quot;W × {activeVariant.depthInches}&quot;D • {activeVariant.weightKg} kg
                  </div>
                </div>
              )}

              {/* TAB 2: INTERIOR BLUEPRINT / SHELF & LOCKER SCHEMATIC */}
              {activeImageView === "cutaway" && (
                <div className="relative w-full h-full bg-slate-950 p-6 flex flex-col justify-between overflow-hidden">
                  <Image
                    src={activeVariant.interiorCutawayImage}
                    alt="Interior Cutaway Architecture"
                    fill
                    className="object-cover opacity-60"
                  />

                  {/* Architectural Blueprint Overlay Annotations */}
                  <div className="relative z-10 space-y-3 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-amber-500/70 text-xs">
                    <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Certified Birgunj Internal Architecture</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px] pt-1">
                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="font-bold text-white block">Top Saree Hanging Bay:</span>
                        <span className="text-slate-400">1.2&apos; heavy stainless hanger rail holds up to 25 sarees / suits.</span>
                      </div>

                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="font-bold text-emerald-400 block">Inner Vault Locker:</span>
                        <span className="text-slate-400">Dual computerized brass keys; protects cash, jewellery & land deeds.</span>
                      </div>

                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="font-bold text-amber-400 block">Secret Trapdoor (चोर खण्ड):</span>
                        <span className="text-slate-400">Concealed false bottom chamber invisible to unauthorized eyes.</span>
                      </div>

                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="font-bold text-white block">Stainless Bangle Rods:</span>
                        <span className="text-slate-400">2-tier chrome plated bangle organizer (चुरा र्याक) included.</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-xl text-center text-[11px] text-slate-300 font-mono">
                    All interior partitions stamped from 20-Gauge CRCA Sheet • Zero Sharp Burrs
                  </div>
                </div>
              )}

              {/* TAB 3: HUMAN SCALE & SPATIAL CLEARANCE DIAGRAM */}
              {activeImageView === "scale" && (
                <div className="relative w-full h-full bg-slate-950 p-6 flex flex-col justify-between text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      Architectural Ergonomics & Clearance
                    </span>
                    <h4 className="text-base font-bold text-white font-heading">
                      Human Proportion & Room Footprint Scale
                    </h4>
                  </div>

                  {/* SVG Scale Drawing */}
                  <div className="relative w-full h-64 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-end justify-center gap-12 p-4">
                    {/* Floor Line */}
                    <div className="absolute bottom-4 inset-x-4 border-b-2 border-slate-700" />

                    {/* Human Silhouette (Average 5'8" / 173 cm) */}
                    <div className="relative flex flex-col items-center z-10">
                      <div className="text-[10px] font-mono text-slate-400 mb-1">Human (5&apos;8&quot; / 173 cm)</div>
                      <div className="w-12 h-44 bg-slate-700/80 rounded-t-full border border-slate-600 flex flex-col items-center pt-2">
                        <div className="w-6 h-6 rounded-full bg-slate-500 mb-1" />
                        <div className="w-8 h-24 bg-slate-600 rounded-md" />
                      </div>
                    </div>

                    {/* Almirah Scale Box */}
                    <div className="relative flex flex-col items-center z-10">
                      <div className="text-[10px] font-mono font-bold text-amber-400 mb-1">
                        Almirah ({activeVariant.heightInches}&quot; / {(activeVariant.heightInches * 2.54).toFixed(0)} cm)
                      </div>
                      <div
                        className="bg-red-950 border-2 border-amber-500 rounded-t-lg shadow-2xl flex flex-col items-center justify-between p-2"
                        style={{
                          height: `${(activeVariant.heightInches / 78) * 180}px`,
                          width: `${(activeVariant.widthInches / 40) * 80}px`
                        }}
                      >
                        <div className="w-full flex justify-between px-1">
                          <span className="w-1 h-3 bg-amber-400/80 rounded" />
                          <span className="w-1 h-3 bg-amber-400/80 rounded" />
                        </div>
                        <div className="w-2 h-2 rounded-full bg-amber-400 my-auto" />
                        <div className="text-[9px] font-mono text-amber-300 font-bold">
                          {activeVariant.widthInches}&quot;W
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clearance Footprint Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-2">
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Door Swing Clearance:</span>
                      <span className="font-mono font-bold text-white">38&quot; (96 cm) Front Arc</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Ceiling Clearance:</span>
                      <span className="font-mono font-bold text-white">Fits 8&apos; – 10&apos; Rooms</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Net Footprint:</span>
                      <span className="font-mono font-bold text-amber-400">
                        {activeVariant.widthInches}&quot; × {activeVariant.depthInches}&quot;
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Birgunj Plant Assurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <div className="font-bold text-white">5-Year Warranty</div>
                <div className="text-[10px] text-slate-400">Lock & Rust Included</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <Factory className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <div className="font-bold text-white">7-Tank Immersion</div>
                <div className="text-[10px] text-slate-400">65°C Hot Phosphate</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <Truck className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <div className="font-bold text-white">Direct Freight</div>
                <div className="text-[10px] text-slate-400">Hydraulic Unloading</div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Configurator & Delivery Estimator */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header / Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded uppercase">
                  {product.category.replace(/_/g, " ")}
                </span>
                {product.isBestseller && (
                  <span className="text-[10px] font-bold text-red-300 bg-red-950 border border-red-800 px-2 py-0.5 rounded">
                    #1 Factory Bestseller
                  </span>
                )}
                <span className="text-xs text-slate-500 font-mono ml-auto">
                  ESTD 2039 BS
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
                {product.name}
              </h1>
              <div className="text-sm font-semibold text-amber-500/90 mt-1">
                {product.nepaliName}
              </div>
              <p className="text-xs text-slate-300 mt-2 italic leading-relaxed">
                &ldquo;{product.tagline}&rdquo;
              </p>
            </div>

            {/* Dynamic Price Box */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-baseline justify-between shadow-xl">
              <div>
                <div className="text-3xl font-black font-mono text-amber-400">
                  {formatNPR(price)}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  MRP <span className="line-through">{formatNPR(activeVariant.mrpNpr)}</span>{" "}
                  <span className="text-emerald-400 font-semibold">(Direct Factory Savings: {formatNPR(savings)})</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2.5 py-1 rounded">
                  {userRole === "DEALER" ? "B2B Wholesale Price" : "Factory-Direct D2C"}
                </span>
                <div className="text-[10px] text-slate-400 mt-1">Birgunj Plant Dispatch</div>
              </div>
            </div>

            {/* CONFIGURATOR 1: Height Selector (66", 72", 78") */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Select Wardrobe Height:{" "}
                <span className="text-amber-400 font-mono">{activeVariant.heightInches}&quot; Height</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[78, 72, 66].map((h) => {
                  const hasHeight = product.variants.some((v) => v.heightInches === h);
                  if (!hasHeight) return null;
                  return (
                    <button
                      key={h}
                      onClick={() => handleHeightChange(h)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold font-mono transition-all ${
                        activeVariant.heightInches === h
                          ? "border-amber-400 bg-slate-800 text-amber-400 shadow-md ring-1 ring-amber-500/30"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      {h}&quot; Height ({(h * 2.54).toFixed(0)} cm)
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CONFIGURATOR 2: Coating Technology (Powder vs Enamel) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-300 uppercase tracking-wider">
                  2. Coating Technology:
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {activeVariant.coatingType === "POWDER_COATED" ? "Thermoset 200°C" : "Stove Enamel"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleCoatingChange("POWDER_COATED")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeVariant.coatingType === "POWDER_COATED"
                      ? "border-amber-400 bg-slate-800 text-white shadow-md ring-1 ring-amber-500/30"
                      : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Powder Coated</span>
                    <span className="text-[10px] text-amber-400 font-mono">★ Recommended</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    7-Tank Hot Phosphate @ 65°C, 200°C baked, zero-scratch finish.
                  </div>
                </button>

                <button
                  onClick={() => handleCoatingChange("ENAMEL_COATED")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeVariant.coatingType === "ENAMEL_COATED"
                      ? "border-amber-400 bg-slate-800 text-white shadow-md ring-1 ring-amber-500/30"
                      : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Stove Enamel</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Economy</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Cold phosphate chemical derusting, heavy synthetic stove finish.
                  </div>
                </button>
              </div>
            </div>

            {/* CONFIGURATOR 3: Color Finish Swatches */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                3. Color Finish:{" "}
                <span className="text-amber-400 font-semibold">{activeVariant.colorName}</span>
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.variants.map((v) => (
                  <button
                    key={v.sku}
                    onClick={() => handleColorChange(v)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
                      activeVariant.sku === v.sku
                        ? "border-amber-400 bg-slate-800 text-white shadow-md"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-slate-900 shadow shrink-0"
                      style={{ backgroundColor: v.colorHex }}
                    />
                    <div className="text-left truncate">
                      <div className="truncate font-semibold">{v.colorName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{v.sku}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* NEPAL LOGISTICS & DELIVERY ESTIMATOR */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5 font-heading">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Nepal Logistics & Delivery Estimator</span>
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  {formatNPR(selectedCity.freightNpr)} Freight
                </span>
              </div>

              {/* City Dropdown */}
              <div>
                <select
                  value={selectedCity.city}
                  onChange={(e) => {
                    const match = NEPAL_DISTRICT_LOGISTICS.find((d) => d.city === e.target.value);
                    if (match) setSelectedCity(match);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-500 font-sans"
                >
                  {NEPAL_DISTRICT_LOGISTICS.map((d) => (
                    <option key={d.city} value={d.city}>
                      {d.city} ({d.province}) — {formatNPR(d.freightNpr)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transit Details */}
              <div className="space-y-1.5 text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Estimated Dispatch Time:</span>
                  <span className="text-amber-400 font-mono font-bold">{selectedCity.dispatchDays}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Transit Route:</span>
                  <span className="text-slate-300 font-medium">{selectedCity.transitRoute}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400">Room-Placement Service:</span>
                  <span className={`font-semibold ${selectedCity.freeRoomPlacement ? "text-emerald-400" : "text-amber-400"}`}>
                    {selectedCity.freeRoomPlacement ? "✓ Free Ground Floor Placement" : "Doorstep Unloading"}
                  </span>
                </div>
              </div>
            </div>

            {/* Purchasing Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl p-1 text-sm shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  ref={buyButtonRef}
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all border border-red-700/60"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{addedNotice ? "Added to Cart!" : "Add to Cart"}</span>
                </button>

                {/* Buy Now Direct */}
                <button
                  onClick={handleBuyNow}
                  className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3.5 px-5 rounded-xl shadow-xl text-xs sm:text-sm transition-all"
                >
                  Buy Now
                </button>

                {/* Compare */}
                <button
                  onClick={() => addToCompare(product, activeVariant)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors"
                  title="Add to Comparison Tray"
                >
                  <Scale className="w-5 h-5" />
                </button>
              </div>

              {/* Order via WhatsApp Direct Action */}
              <a
                href={`https://wa.me/9779855021000?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order via WhatsApp Direct (+977-9855021000)</span>
              </a>

              <div className="text-center text-[11px] text-slate-400">
                Ready for dispatch at Birgunj Factory Warehouse • In-Stock: {activeVariant.stockQty} Units
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM ACTION BAR (Appears on scroll past main buy button) */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t-2 border-red-800 p-3 shadow-2xl animate-in slide-in-from-bottom-4 duration-150">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Left: Product summary */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-12 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                <Image src={activeVariant.exteriorImages[0]} alt={product.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-white truncate font-heading">{product.name}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  {activeVariant.sku} • {activeVariant.colorName} • {activeVariant.heightInches}&quot;H
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="font-mono text-base font-black text-amber-400">{formatNPR(price)}</div>
                <div className="text-[10px] text-slate-400 font-mono line-through">{formatNPR(activeVariant.mrpNpr)}</div>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-red-900 hover:bg-red-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-red-700 shadow"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{addedNotice ? "Added!" : "Add to Cart"}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow"
              >
                Buy Now
              </button>

              <a
                href={`https://wa.me/9779855021000?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-3.5 rounded-xl text-xs transition-colors"
                title="Inquire on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
