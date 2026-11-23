"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Building2,
  Factory,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  School,
  Landmark,
  Hospital,
  Building,
  Plus,
  Minus,
  Download,
  Printer,
  Sparkles,
  Truck,
  Award
} from "lucide-react";
import { formatNPR } from "@/lib/formatters";
import { ProformaQuoteView, ProformaQuoteData, BulkQuoteItem } from "@/components/invoice/ProformaQuoteView";

const INSTITUTIONAL_CATALOG: BulkQuoteItem[] = [
  {
    id: "bulk-office-almirah",
    name: "Standard Office Steel Almirah (4-Shelf)",
    category: "OFFICE_ALMIRAH",
    specs: "72\"H × 36\"W × 19\"D • 20-Gauge CRCA Steel • 3-Point Deadbolt • 4 Adjustable Shelves",
    unitPriceNpr: 19800,
    quantity: 10,
    weightKg: 68,
  },
  {
    id: "bulk-filing-4dr",
    name: "4-Drawer Anti-Tilt Heavy Filing Cabinet",
    category: "FILING_CABINETS",
    specs: "52\"H × 18\"W × 25\"D • Telescopic Ball Bearing Slides • Central Lock • Legal File Suspension",
    unitPriceNpr: 18500,
    quantity: 5,
    weightKg: 52,
  },
  {
    id: "bulk-filing-5dr",
    name: "5-Drawer Archive Heavy Document Cabinet",
    category: "FILING_CABINETS",
    specs: "64\"H × 18\"W × 25\"D • Heavy Duty Suspension • Counterweight Anti-Tip Mechanism",
    unitPriceNpr: 22500,
    quantity: 0,
    weightKg: 65,
  },
  {
    id: "bulk-pradhan-desk",
    name: "Everest Pradhan 60\" Officer Executive Table",
    category: "OFFICE_TABLES",
    specs: "60\"W × 36\"D × 30\"H • Dual Pedestal 6 Drawers • Scratch-Resistant Teak Top • Cable Port",
    unitPriceNpr: 24500,
    quantity: 4,
    weightKg: 58,
  },
  {
    id: "bulk-tijori-safe",
    name: "Commercial Bank Tijori Heavy Safe 36\"",
    category: "SAFES_TIJORI",
    specs: "36\"H × 24\"W × 22\"D • 180kg Mass • Double Key Lever Vault Lock • Secret Base Locker",
    unitPriceNpr: 45000,
    quantity: 1,
    weightKg: 180,
  },
  {
    id: "bulk-hostel-bunk",
    name: "Heavy Dual-Tier Steel Bunk Bed (Hostels & Campuses)",
    category: "INSTITUTIONAL",
    specs: "78\"L × 36\"W × 66\"H • 18-Gauge Round/Square Tubular Steel • Safety Rails • Integrated Ladder",
    unitPriceNpr: 16500,
    quantity: 0,
    weightKg: 55,
  },
  {
    id: "bulk-student-bench",
    name: "3-Seater Metallic Student Desk Bench",
    category: "INSTITUTIONAL",
    specs: "48\"W × 18\"D × 30\"H • Heavy CRCA Square Tube Frame • Hardwood Pre-Laminated Top • Book Shelf",
    unitPriceNpr: 12000,
    quantity: 0,
    weightKg: 38,
  },
  {
    id: "bulk-hospital-cupboard",
    name: "Hospital Bedside Medicine Cupboard",
    category: "INSTITUTIONAL",
    specs: "32\"H × 16\"W × 16\"D • Stainless Steel Top • Lockable Medicine Drawer • Lower Storage Cabinet",
    unitPriceNpr: 9500,
    quantity: 0,
    weightKg: 24,
  },
];

export default function BulkOrdersPage() {
  const [items, setItems] = useState<BulkQuoteItem[]>(INSTITUTIONAL_CATALOG);
  const [showProforma, setShowProforma] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedQuoteData, setGeneratedQuoteData] = useState<ProformaQuoteData | null>(null);

  const [formData, setFormData] = useState({
    organizationName: "Nepal SBI Bank Ltd.",
    organizationType: "BANK_FINANCIAL",
    contactPerson: "Ram Prasad Shrestha",
    designation: "Head of General Administration",
    contactPhone: "+977-9851029384",
    contactEmail: "admin@nepalsbi.com.np",
    panNumber: "300012398",
    destinationDistrict: "Kathmandu Valley (Central Office & Branches)",
    customRequirements: "Master-key locking system across all 4-drawer filing cabinets. RAL 7035 Powder Coat finish.",
  });

  // Calculate quantities & totals
  const totalUnits = items.reduce((acc, it) => acc + it.quantity, 0);
  const totalWeightKg = items.reduce((acc, it) => acc + it.weightKg * it.quantity, 0);
  const totalWeightTons = Math.round((totalWeightKg / 1000) * 10) / 10;
  const subtotalNpr = items.reduce((acc, it) => acc + it.unitPriceNpr * it.quantity, 0);

  // Determine Tiered Volume Discount
  let discountPercent = 0;
  let discountTierName = "Standard Pricing (Under 10 Units)";
  let nextTierThreshold = 10;
  let nextTierDiscount = 10;

  if (totalUnits >= 50) {
    discountPercent = 20;
    discountTierName = "20% Factory Direct Tender Discount (50+ Units)";
    nextTierThreshold = 50;
    nextTierDiscount = 20;
  } else if (totalUnits >= 25) {
    discountPercent = 15;
    discountTierName = "15% Institutional Bulk Discount (25-49 Units)";
    nextTierThreshold = 50;
    nextTierDiscount = 20;
  } else if (totalUnits >= 10) {
    discountPercent = 10;
    discountTierName = "10% Commercial Volume Discount (10-24 Units)";
    nextTierThreshold = 25;
    nextTierDiscount = 15;
  }

  const unitsNeededForNextTier = Math.max(0, nextTierThreshold - totalUnits);

  const discountAmountNpr = Math.round((subtotalNpr * discountPercent) / 100);
  const taxableValueNpr = subtotalNpr - discountAmountNpr;
  const vatAmountNpr = Math.round(taxableValueNpr * 0.13); // 13% Nepal VAT
  const freightNpr = totalUnits > 0 ? Math.max(2500, Math.round(totalWeightKg * 4.5)) : 0;
  const grandTotalNpr = taxableValueNpr + vatAmountNpr + freightNpr;

  const handleQuantityChange = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const newQty = Math.max(0, it.quantity + delta);
          return { ...it, quantity: newQty };
        }
        return it;
      })
    );
  };

  const handleDirectQtyInput = (id: string, val: number) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          return { ...it, quantity: Math.max(0, isNaN(val) ? 0 : val) };
        }
        return it;
      })
    );
  };

  const generateProformaData = (): ProformaQuoteData => {
    const selectedItems = items.filter((it) => it.quantity > 0);
    const quoteNum = `PRF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      quoteNumber: quoteNum,
      date: "2026-11-22",
      mitiBs: "2083-08-07 BS",
      validUntil: "30 Days from Issuance",
      organizationName: formData.organizationName,
      organizationType: formData.organizationType,
      contactPerson: formData.contactPerson,
      designation: formData.designation,
      phone: formData.contactPhone,
      email: formData.contactEmail,
      panNumber: formData.panNumber,
      destinationDistrict: formData.destinationDistrict,
      items: selectedItems,
      discountTierName,
      discountPercent,
      subtotalNpr,
      discountAmountNpr,
      vatAmountNpr,
      freightNpr,
      totalNpr: grandTotalNpr,
      notes: formData.customRequirements,
    };
  };

  const handleGenerateProforma = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalUnits === 0) {
      alert("Please select at least 1 unit in the catalog to generate a proforma quotation.");
      return;
    }
    const data = generateProformaData();
    setGeneratedQuoteData(data);
    setShowProforma(true);
    setSubmitted(true);
  };

  if (showProforma && generatedQuoteData) {
    return (
      <div className="bg-slate-900 py-10 px-4 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <ProformaQuoteView quote={generatedQuoteData} onClose={() => setShowProforma(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-950/80 border border-amber-800 px-3.5 py-1 rounded-full uppercase">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Institutional & Tender Procurement Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
            B2B Bulk Steel Furniture & Tender Estimator
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Supplying Nepal Government ministries, banking headquarters, universities, community hospitals, and corporate archives directly from our Birgunj works (Est. 2039 BS).
          </p>
        </div>

        {/* Tiered Discount Visual Banner */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm text-white font-heading">
                  Automatic Tiered Volume Discounts (Factory Direct from Birgunj)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Current order: <strong className="text-white font-mono">{totalUnits} Units</strong> • Current Tier: <strong className="text-amber-400">{discountTierName}</strong>
              </p>
            </div>

            {totalUnits < 50 && (
              <div className="bg-amber-950/60 border border-amber-800 px-3 py-1.5 rounded-xl text-xs text-amber-300 font-mono">
                Add <strong>{unitsNeededForNextTier} more units</strong> to unlock <strong>{nextTierDiscount}% Discount</strong>
              </div>
            )}
          </div>

          {/* Tier Progress Steps */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs">
            <div className={`p-3 rounded-xl border transition-all ${
              totalUnits >= 10 && totalUnits < 25
                ? "bg-amber-950/40 border-amber-500 text-white font-bold"
                : totalUnits >= 25
                ? "bg-slate-900 border-slate-700 text-slate-300"
                : "bg-slate-950 border-slate-800 text-slate-500"
            }`}>
              <div className="font-mono text-sm font-bold text-amber-400">10% Off</div>
              <div className="text-[11px] mt-0.5">10 to 24 Units</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Commercial Volume</div>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              totalUnits >= 25 && totalUnits < 50
                ? "bg-amber-950/40 border-amber-500 text-white font-bold"
                : totalUnits >= 50
                ? "bg-slate-900 border-slate-700 text-slate-300"
                : "bg-slate-950 border-slate-800 text-slate-500"
            }`}>
              <div className="font-mono text-sm font-bold text-amber-400">15% Off</div>
              <div className="text-[11px] mt-0.5">25 to 49 Units</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Institutional Tier</div>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              totalUnits >= 50
                ? "bg-emerald-950/40 border-emerald-500 text-white font-bold shadow-lg shadow-emerald-950/40"
                : "bg-slate-950 border-slate-800 text-slate-500"
            }`}>
              <div className="font-mono text-sm font-bold text-emerald-400">20% Off</div>
              <div className="text-[11px] mt-0.5">50+ Units</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Direct Tender Tier</div>
            </div>
          </div>
        </div>

        {/* MAIN ESTIMATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: INTERACTIVE ITEM SELECTOR */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Configure Project Line Items</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {items.filter(i => i.quantity > 0).length} of {items.length} Models Selected
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.quantity > 0
                      ? "bg-slate-950 border-slate-700 shadow-md"
                      : "bg-slate-950/60 border-slate-800/80 hover:border-slate-800"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{item.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-400">
                          {item.weightKg} kg / unit
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                        {item.specs}
                      </p>
                      <div className="text-xs font-mono font-bold text-amber-400">
                        {formatNPR(item.unitPriceNpr)} <span className="text-slate-500 font-normal">per unit (list)</span>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                      <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden p-0.5">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity === 0}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <input
                          type="number"
                          min={0}
                          value={item.quantity}
                          onChange={(e) => handleDirectQtyInput(item.id, parseInt(e.target.value))}
                          className="w-12 text-center bg-transparent text-white font-mono font-bold text-xs outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-24 text-right font-mono font-bold text-white text-xs">
                        {formatNPR(item.unitPriceNpr * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Birgunj Quality Assurance Card */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 mt-6">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Birgunj Factory Tender Documentation Provided</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tender specifications, tax invoices (13% VAT Bills), Manufacturer Authorization Letters (MAL), NBSM physical compliance sheets, and 5-Year Rust & Lock Warranty certificates are issued directly by Everest Steel Furniture Udyog, Birgunj.
              </p>
            </div>
          </div>

          {/* RIGHT 5 COLS: SUMMARY & PROFORMA RFQ GENERATOR */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Financial Matrix Card */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-base text-white font-heading">
                  Tender Estimate Breakdown
                </h3>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {totalUnits} Units • {totalWeightTons} Tons
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Gross Catalog Subtotal:</span>
                  <span className="font-mono text-white font-semibold">{formatNPR(subtotalNpr)}</span>
                </div>

                {discountAmountNpr > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Volume Discount ({discountPercent}%):</span>
                    <span className="font-mono">-{formatNPR(discountAmountNpr)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Taxable Base Value:</span>
                  <span className="font-mono text-white">{formatNPR(taxableValueNpr)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Nepal Government VAT (13%):</span>
                  <span className="font-mono text-white">{formatNPR(vatAmountNpr)}</span>
                </div>

                <div className="flex justify-between">
                  <div>
                    <span>Subsidized Highway Freight:</span>
                    <span className="block text-[10px] text-slate-400 font-mono">
                      Birgunj to {formData.destinationDistrict.split(" ")[0]}
                    </span>
                  </div>
                  <span className="font-mono text-amber-400 font-semibold">{formatNPR(freightNpr)}</span>
                </div>

                <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-bold text-white">
                  <span>Estimated Tender Total:</span>
                  <span className="font-mono text-amber-400 text-xl">{formatNPR(grandTotalNpr)}</span>
                </div>

                {discountAmountNpr > 0 && (
                  <div className="bg-emerald-950/40 border border-emerald-600/40 p-2.5 rounded-xl text-emerald-300 text-[11px] font-mono text-center">
                    Total Institutional Savings: <strong>{formatNPR(discountAmountNpr)}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Institutional RFQ Form */}
            <form onSubmit={handleGenerateProforma} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
              <div>
                <h3 className="font-bold text-base text-white font-heading">
                  Generate Instant Proforma Invoice
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your institution&apos;s details to create a formal, print-ready quotation PDF for your procurement committee.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Organization / Bank / Institution Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">
                      Organization Category *
                    </label>
                    <select
                      value={formData.organizationType}
                      onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                    >
                      <option value="BANK_FINANCIAL">Bank / Microfinance / Cooperative</option>
                      <option value="SCHOOL_COLLEGE">School / Campus / University</option>
                      <option value="HOSPITAL_CLINIC">Hospital / Medical Center</option>
                      <option value="GOVERNMENT_OFFICE">Ministry / Municipal Office</option>
                      <option value="COMMERCIAL_ENTERPRISE">Commercial Enterprise / NGO</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">
                      Nepal PAN / VAT No.
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 300012398"
                      value={formData.panNumber}
                      onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">
                      Direct Mobile / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Destination District / Delivery Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destinationDistrict}
                    onChange={(e) => setFormData({ ...formData, destinationDistrict: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Custom Specifications (Lockers, RAL Colors, Key Master Systems)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.customRequirements}
                    onChange={(e) => setFormData({ ...formData, customRequirements: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={totalUnits === 0}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-40"
              >
                <Printer className="w-4 h-4" />
                <span>Generate Official Proforma Quote (Print / PDF)</span>
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                Instantly generates a formal proforma quotation on official Everest Steel letterhead with authorized signatory stamp.
              </p>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
