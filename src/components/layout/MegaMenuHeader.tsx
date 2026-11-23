"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Scale,
  Menu,
  X,
  ChevronDown,
  Shield,
  Layers,
  Archive,
  Lock,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useEverestStore } from "@/store/useStore";
import { formatNPR } from "@/lib/formatters";

export function MegaMenuHeader() {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    cart,
    setCartOpen,
    comparisonList,
    setComparisonOpen,
    setSearchOpen,
    userRole
  } = useEverestStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.unitPriceNpr * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Birgunj Heritage Badge */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-12 h-12 bg-gradient-to-br from-red-900 via-red-800 to-slate-900 border-2 border-amber-500/80 rounded-sm flex flex-col items-center justify-center shadow-lg group-hover:border-amber-400 transition-colors">
              <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">ESTD</span>
              <span className="text-xs font-black tracking-tight text-white">2039</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-600 rounded-full border border-slate-900 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">🇳🇵</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading">
                  EVEREST
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-amber-500 font-heading">
                  STEEL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  Furniture Udyog • Birgunj
                </span>
                <span className="hidden sm:inline-block text-[9px] bg-red-950 text-red-300 border border-red-800/80 px-1 rounded font-medium">
                  नेपालको गौरव
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation with Mega Menus */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* 1. Household Almirahs */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu("household")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                  activeMegaMenu === "household"
                    ? "text-amber-400 bg-slate-800/80"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Layers className="w-4 h-4 text-red-500" />
                <span>Household Almirahs</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Mega Menu Dropdown */}
              {activeMegaMenu === "household" && (
                <div className="absolute top-full -left-20 w-[780px] bg-slate-900 border border-slate-700/80 rounded-lg shadow-2xl p-6 mt-1 grid grid-cols-12 gap-6 z-50">
                  {/* Left Column: Popular Models */}
                  <div className="col-span-4 border-r border-slate-800 pr-4 space-y-3">
                    <div className="text-xs font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Iconic Birgunj Models</span>
                    </div>

                    <ul className="space-y-1.5 text-xs">
                      <li>
                        <Link
                          href="/products/sansaar-model-almirah"
                          className="block p-2 rounded hover:bg-slate-800/70 group"
                        >
                          <div className="font-bold text-slate-100 group-hover:text-amber-400 flex items-center justify-between">
                            <span>Sansaar Model (संसार)</span>
                            <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800/80 px-1 rounded">
                              #1 Bestseller
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            78&quot; dressing mirror, inner vault locker, secret trapdoor
                          </p>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/products/janki-model-bridal-almirah"
                          className="block p-2 rounded hover:bg-slate-800/70 group"
                        >
                          <div className="font-bold text-slate-100 group-hover:text-amber-400 flex items-center justify-between">
                            <span>Janki Bridal (जानकी)</span>
                            <span className="text-[10px] text-red-400">विवाह दराज</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            Embossed floral border, dual lockers, bridal dowry favorite
                          </p>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/products/ladies-gents-split-wardrobe"
                          className="block p-2 rounded hover:bg-slate-800/70 group"
                        >
                          <div className="font-bold text-slate-100 group-hover:text-amber-400">
                            Ladies Gents Split (जोडी)
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            Extra-wide 48&quot; frame with dedicated his & her wings
                          </p>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/products/radha-krishna-model-almirah"
                          className="block p-2 rounded hover:bg-slate-800/70 group"
                        >
                          <div className="font-bold text-slate-100 group-hover:text-amber-400">
                            Radha Krishna (राधा कृष्ण)
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            Classic double-door with dual keys and 3 full shelves
                          </p>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/products/3-door-1-locker-mirror-almirah"
                          className="block p-2 rounded hover:bg-slate-800/70 group"
                        >
                          <div className="font-bold text-slate-100 group-hover:text-amber-400">
                            3-Door Master Almirah
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            54&quot; expansive master unit with central Belgian mirror
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Middle Column: Room & Use Cases */}
                  <div className="col-span-4 border-r border-slate-800 pr-4 space-y-3">
                    <div className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      Shop by Use-Case
                    </div>

                    <ul className="space-y-2 text-xs">
                      <li>
                        <Link
                          href="/category/household?use=master-bedroom"
                          className="flex items-center justify-between p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <span>Master Bedroom Sets</span>
                          <span className="text-[11px] text-slate-500 font-mono">78&quot; Height</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/category/household?use=bridal"
                          className="flex items-center justify-between p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <span>Bridal Wedding Packages</span>
                          <span className="text-[11px] text-amber-500 font-medium">शुभ विवाह</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/category/household?use=compact"
                          className="flex items-center justify-between p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <span>Compact Living & Apartments</span>
                          <span className="text-[11px] text-slate-500 font-mono">66&quot; - 72&quot;</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/category/household?use=heavy-duty"
                          className="flex items-center justify-between p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <span>Heavy 20-Gauge CRCA Series</span>
                          <span className="text-[11px] text-emerald-400 font-mono">Tata Sheet</span>
                        </Link>
                      </li>
                    </ul>

                    <div className="pt-2 border-t border-slate-800">
                      <Link
                        href="/category/household"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                      >
                        <span>View All Household Almirahs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Factory Pre-Treatment Quality Showcase */}
                  <div className="col-span-4 bg-slate-950/70 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                        <Shield className="w-3 h-3" />
                        <span>Birgunj Anti-Rust Standard</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-2 font-heading">
                        7-Tank Hot Chemical Phosphating
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Every sheet undergoes hot degreasing, acid derusting, and zinc phosphate bath at 65°C before 200°C baked powder coating.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Zero Rust Guarantee (5 Years)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Office & Filing */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu("office")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                  activeMegaMenu === "office"
                    ? "text-amber-400 bg-slate-800/80"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Archive className="w-4 h-4 text-slate-400" />
                <span>Office & Filing</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeMegaMenu === "office" && (
                <div className="absolute top-full left-0 w-[580px] bg-slate-900 border border-slate-700/80 rounded-lg shadow-2xl p-5 mt-1 grid grid-cols-2 gap-4 z-50">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Office Storage
                    </div>
                    <Link
                      href="/products/standard-office-steel-almirah"
                      className="block p-2 rounded hover:bg-slate-800"
                    >
                      <div className="font-bold text-sm text-white">Standard Office Almirah</div>
                      <div className="text-xs text-slate-400">4 adjustable shelves, 3-way shoot bolt</div>
                    </Link>
                    <Link
                      href="/products/executive-office-desk-pradhan"
                      className="block p-2 rounded hover:bg-slate-800"
                    >
                      <div className="font-bold text-sm text-white">Everest Pradhan Desk (5x3&apos;)</div>
                      <div className="text-xs text-slate-400">Twin-pedestal steel executive table</div>
                    </Link>
                  </div>

                  <div className="space-y-2 border-l border-slate-800 pl-4">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Heavy Filing Cabinets
                    </div>
                    <Link
                      href="/products/filing-cabinet-4-drawer"
                      className="block p-2 rounded hover:bg-slate-800"
                    >
                      <div className="font-bold text-sm text-white">4-Drawer Filing Cabinet</div>
                      <div className="text-xs text-slate-400">Anti-tilt safety with central lock</div>
                    </Link>
                    <Link
                      href="/products/filing-cabinet-5-drawer"
                      className="block p-2 rounded hover:bg-slate-800"
                    >
                      <div className="font-bold text-sm text-white">5-Drawer Archive Cabinet</div>
                      <div className="text-xs text-slate-400">High-capacity legal document storage</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Safes & Tijori */}
            <Link
              href="/category/safes"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/50 rounded-md transition-colors"
            >
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Safes & Tijori</span>
            </Link>

            {/* 4. B2B & Dealership */}
            <Link
              href="/b2b"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/50 rounded-md transition-colors"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>B2B Dealership</span>
            </Link>

            {/* 5. Bulk Quote Request */}
            <Link
              href="/quote"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 rounded-md transition-colors border border-amber-800/50"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Bulk Quote (10+ Units)</span>
            </Link>
          </nav>

          {/* Right Actions: Instant Search + Compare + Cart + Role Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Instant Search Bar Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-inner"
              title="Instant Search by Model, SKU, Dimension, or Gauge (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline text-slate-400">Search model, SKU, 78&quot;...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Product Comparison Drawer Trigger */}
            <button
              onClick={() => setComparisonOpen(true)}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Compare Specifications (Gauges, Lockers, Dimensions)"
            >
              <Scale className="w-5 h-5" />
              {comparisonList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {comparisonList.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2.5 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white px-3 sm:px-3.5 py-2 rounded-lg font-semibold text-xs sm:text-sm shadow-md hover:shadow-red-900/40 transition-all border border-red-700/50"
              title="Open Heavy Freight Cart Drawer"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 font-mono text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>

              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-[10px] text-red-200 font-medium">Cart</span>
                <span className="font-mono text-xs font-bold text-white">
                  {totalCartCount > 0 ? formatNPR(cartSubtotal) : "NPR 0"}
                </span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 py-4 px-2 space-y-3 bg-slate-950/90 rounded-b-xl">
            <div className="text-xs font-bold text-amber-500 uppercase px-3">Categories</div>
            <div className="grid grid-cols-1 gap-1 text-sm">
              <Link
                href="/products/sansaar-model-almirah"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
              >
                <span>Sansaar Model Almirah (संसार)</span>
                <span className="text-xs text-amber-400">#1 Bestseller</span>
              </Link>
              <Link
                href="/products/janki-model-bridal-almirah"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-slate-800 text-slate-200"
              >
                Janki Bridal Almirah (जानकी)
              </Link>
              <Link
                href="/products/ladies-gents-split-wardrobe"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-slate-800 text-slate-200"
              >
                Ladies Gents Split Almirah (जोडी)
              </Link>
              <Link
                href="/products/standard-office-steel-almirah"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-slate-800 text-slate-200"
              >
                Standard Office Almirah
              </Link>
              <Link
                href="/products/filing-cabinet-4-drawer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-slate-800 text-slate-200"
              >
                Heavy Filing Cabinets (4 & 5 Drawer)
              </Link>
              <Link
                href="/products/everest-heavy-tijori-safe-36"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-slate-800 text-slate-200"
              >
                Safes & Tijori (180kg - 260kg)
              </Link>
              <Link
                href="/b2b"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-slate-800 text-emerald-400 font-semibold"
              >
                Authorized Dealership (PAN/VAT)
              </Link>
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-amber-950 text-amber-400 font-semibold"
              >
                Bulk Institutional Quote (10+ Units)
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
