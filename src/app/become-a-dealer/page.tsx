"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Award,
  Factory,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Truck,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Percent,
  Warehouse,
  Boxes,
  Briefcase,
  ChevronRight,
  Printer
} from "lucide-react";
import { formatNPR } from "@/lib/formatters";

interface VerifiedDealer {
  id: string;
  firmName: string;
  city: string;
  province: string;
  address: string;
  phone: string;
  sqFt: number;
  establishedYear: number;
  isFactoryOutlet?: boolean;
}

const VERIFIED_NEPAL_DEALERS: VerifiedDealer[] = [
  {
    id: "dlr-birgunj-hq",
    firmName: "Everest Steel Central Factory Outlet",
    city: "Birgunj",
    province: "Madhesh Province",
    address: "Bypass Road, Industrial Zone, Birgunj",
    phone: "051-521940 / 9801234567",
    sqFt: 5500,
    establishedYear: 2039,
    isFactoryOutlet: true,
  },
  {
    id: "dlr-ktm-teku",
    firmName: "Narayani Steel Traders & Display Center",
    city: "Kathmandu",
    province: "Bagmati Province",
    address: "Teku Industrial Area, Ward 12, Kathmandu",
    phone: "01-4261890 / 9851044556",
    sqFt: 2200,
    establishedYear: 2052,
  },
  {
    id: "dlr-ktm-putali",
    firmName: "Capital Furniture & Safe Mart",
    city: "Kathmandu",
    province: "Bagmati Province",
    address: "Putalisadak Chowk, Opposite Star Mall",
    phone: "01-4439812",
    sqFt: 1800,
    establishedYear: 2058,
  },
  {
    id: "dlr-pokhara-newroad",
    firmName: "Annapurna Steel & Home Decor",
    city: "Pokhara",
    province: "Gandaki Province",
    address: "New Road, Ward 8, Pokhara",
    phone: "061-532104 / 9856023411",
    sqFt: 2600,
    establishedYear: 2056,
  },
  {
    id: "dlr-chitwan-narayangarh",
    firmName: "Chitwan Metal & Wooden House",
    city: "Narayangarh / Bharatpur",
    province: "Bagmati Province",
    address: "Lion's Chowk, Narayangarh, Chitwan",
    phone: "056-571290 / 9855019823",
    sqFt: 3000,
    establishedYear: 2049,
  },
  {
    id: "dlr-butwal-traffic",
    firmName: "Lumbini Steel Furniture Udyog (Authorized Dealer)",
    city: "Butwal",
    province: "Lumbini Province",
    address: "Traffic Chowk, Main Highway Road, Butwal",
    phone: "071-540891 / 9857024190",
    sqFt: 2400,
    establishedYear: 2061,
  },
  {
    id: "dlr-biratnagar-main",
    firmName: "Koshi Metal Industries & Showroom",
    city: "Biratnagar",
    province: "Koshi Province",
    address: "Main Road, Ward 3, Biratnagar",
    phone: "021-528400 / 9852033481",
    sqFt: 2800,
    establishedYear: 2048,
  },
  {
    id: "dlr-nepalgunj-surkhet",
    firmName: "Bheri Steel Furniture Suppliers",
    city: "Nepalgunj",
    province: "Lumbini Province",
    address: "Surkhet Road, Karkando Chowk, Nepalgunj",
    phone: "081-523190 / 9858012904",
    sqFt: 2100,
    establishedYear: 2065,
  },
];

export default function BecomeADealerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [dealerDossierId, setDealerDossierId] = useState("");
  const [selectedProvinceFilter, setSelectedProvinceFilter] = useState("ALL");

  const [formData, setFormData] = useState({
    businessName: "",
    panVatNumber: "",
    legalStructure: "PROPRIETORSHIP",
    ownerName: "",
    contactPhone: "",
    contactEmail: "",
    showroomAddress: "",
    city: "Kathmandu",
    province: "Bagmati Province",
    showroomSqFt: "1500",
    warehouseSqFt: "2500",
    unloadingRamp: "YES",
    yearsInBusiness: "6",
    currentBrandsHandled: "Local Fabricators, Featherlite, Godrej",
    initialStockBudgetNpr: "1500000",
    projectedMonthlyUnits: "25",
    creditFacilityRequired: "YES",
  });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      const generatedId = `DLR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setDealerDossierId(generatedId);
      setSubmitted(true);
    }
  };

  const filteredDealers = selectedProvinceFilter === "ALL"
    ? VERIFIED_NEPAL_DEALERS
    : VERIFIED_NEPAL_DEALERS.filter((d) => d.province.toLowerCase().includes(selectedProvinceFilter.toLowerCase()));

  return (
    <div className="bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-950/80 border border-amber-800 px-3.5 py-1 rounded-full uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Authorized Dealership & Showroom Franchise</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
            Partner With Nepal&apos;s Pioneer Steel Furniture Brand
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Expand your furniture business with Everest Steel Furniture Udyog (Est. 2039 BS, Birgunj). Authorized dealers receive guaranteed wholesale margins, district exclusivity, showroom branding kits, and direct factory highway freight.
          </p>
        </div>

        {/* 4 CORE DEALERSHIP ADVANTAGES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/80 flex items-center justify-center text-amber-400">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white font-heading">18% – 25% Wholesale Margins</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Substantial wholesale margins below D2C retail price with guaranteed quarterly performance rebates.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white font-heading">Guaranteed District Exclusivity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strict territorial non-compete protection ensuring no other authorized dealer operates within your commercial radius.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/80 flex items-center justify-center text-blue-400">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white font-heading">Priority 48-Hour Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard dealer stock orders dispatched within 48 hours from our central Birgunj manufacturing facility.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/80 flex items-center justify-center text-purple-400">
              <Warehouse className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white font-heading">Showroom Display & Sample Kit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complimentary cutaway display almirahs, chemical phosphating proof samples, acrylic branding boards, and brochures.
            </p>
          </div>
        </div>

        {/* 2-COLUMN SECTION: DEALER APPLICATION WIZARD & VERIFIED DEALER LOCATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* LEFT 7 COLS: MULTI-STEP APPLICATION WIZARD */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 bg-emerald-950/80 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500 bg-amber-950/60 border border-amber-800 px-3 py-1 rounded-full">
                    <span>Application Dossier: {dealerDossierId}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-2">
                    Dealership Application Lodged
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.ownerName}</span> from{" "}
                    <span className="text-white font-semibold">{formData.businessName}</span>.
                    Our Birgunj Dealer Relations Officer will verify your IRD PAN/VAT credentials (<span className="font-mono text-white">{formData.panVatNumber}</span>) and contact you within 24 business hours.
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-left space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Proposed Territory:</span>
                    <span className="font-semibold text-white">{formData.city}, {formData.province}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Showroom Area:</span>
                    <span className="font-mono text-white">{formData.showroomSqFt} Sq. Ft.</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Projected Volume:</span>
                    <span className="font-mono text-amber-400 font-semibold">{formData.projectedMonthlyUnits} Units / Month</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Dealer Dossier Summary</span>
                  </button>

                  <Link
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl border border-slate-700 transition-colors"
                  >
                    <span>Return to Homepage</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNextStep} className="space-y-5">
                
                {/* Step Indicator Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white font-heading">
                      Authorized Dealer Onboarding Form
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {currentStep === 1 && "Step 1 of 3: IRD Business Identity & Legal Registration"}
                      {currentStep === 2 && "Step 2 of 3: Showroom & Warehouse Logistics"}
                      {currentStep === 3 && "Step 3 of 3: Commercial Capital & Projected Volume"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStep === 1 ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"}`}>1</span>
                    <span className="text-slate-600">/</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStep === 2 ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"}`}>2</span>
                    <span className="text-slate-600">/</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStep === 3 ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"}`}>3</span>
                  </div>
                </div>

                {/* STEP 1: BUSINESS REGISTRATION */}
                {currentStep === 1 && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">
                        Registered Business / Firm Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Narayani Steel Traders Pvt. Ltd."
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Nepal PAN / VAT Number (9 Digits) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 302948571"
                          value={formData.panVatNumber}
                          onChange={(e) => setFormData({ ...formData, panVatNumber: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Firm Legal Structure *
                        </label>
                        <select
                          value={formData.legalStructure}
                          onChange={(e) => setFormData({ ...formData, legalStructure: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                        >
                          <option value="PROPRIETORSHIP">Sole Proprietorship</option>
                          <option value="PARTNERSHIP">Partnership Firm</option>
                          <option value="PVT_LTD">Private Limited (Pvt. Ltd.)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Proprietor / Managing Director Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={formData.ownerName}
                          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Direct Mobile / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+977-98XXXXXXXX"
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">
                        Official Firm Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="info@narayanisteel.com.np"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: SHOWROOM & WAREHOUSE LOGISTICS */}
                {currentStep === 2 && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Target Dealership City / District *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pokhara, Chitwan, Butwal"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Province *
                        </label>
                        <select
                          value={formData.province}
                          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                        >
                          <option value="Koshi Province">Koshi Province</option>
                          <option value="Madhesh Province">Madhesh Province</option>
                          <option value="Bagmati Province">Bagmati Province</option>
                          <option value="Gandaki Province">Gandaki Province</option>
                          <option value="Lumbini Province">Lumbini Province</option>
                          <option value="Karnali Province">Karnali Province</option>
                          <option value="Sudurpashchim Province">Sudurpashchim Province</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">
                        Exact Showroom Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Main Road, Near Traffic Chowk"
                        value={formData.showroomAddress}
                        onChange={(e) => setFormData({ ...formData, showroomAddress: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Showroom Floor Display Area (Sq. Ft.) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 1500"
                          value={formData.showroomSqFt}
                          onChange={(e) => setFormData({ ...formData, showroomSqFt: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Dedicated Warehouse Storage (Sq. Ft.) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2500"
                          value={formData.warehouseSqFt}
                          onChange={(e) => setFormData({ ...formData, warehouseSqFt: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">
                        Heavy Truck (6-Wheel / 10-Wheel) Unloading Dock Access *
                      </label>
                      <select
                        value={formData.unloadingRamp}
                        onChange={(e) => setFormData({ ...formData, unloadingRamp: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                      >
                        <option value="YES">Yes, direct highway truck parking & ground dock</option>
                        <option value="RESTRICTED">Restricted daytime access (evening unloading only)</option>
                        <option value="EXTERNAL">Warehouse located in outer commercial perimeter</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 3: FINANCIAL CAPITAL & VOLUME */}
                {currentStep === 3 && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Years in Furniture / Building Material Trade *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.yearsInBusiness}
                          onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Projected Monthly Steel Units (Almirahs + Safes) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.projectedMonthlyUnits}
                          onChange={(e) => setFormData({ ...formData, projectedMonthlyUnits: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">
                        Initial Stock Inventory Capital Allocation (NPR) *
                      </label>
                      <select
                        value={formData.initialStockBudgetNpr}
                        onChange={(e) => setFormData({ ...formData, initialStockBudgetNpr: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                      >
                        <option value="1000000">NPR 10 to 15 Lakhs (Tier 3 Regional Showroom)</option>
                        <option value="2500000">NPR 20 to 30 Lakhs (Tier 2 City Main Hub)</option>
                        <option value="5000000">NPR 40 Lakhs+ (Tier 1 Metro Flagship Exclusive)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">
                        Current Brands or Furniture Categories Handled
                      </label>
                      <input
                        type="text"
                        value={formData.currentBrandsHandled}
                        onChange={(e) => setFormData({ ...formData, currentBrandsHandled: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">
                        Revolving 30-Day Factory Credit Facility Required?
                      </label>
                      <select
                        value={formData.creditFacilityRequired}
                        onChange={(e) => setFormData({ ...formData, creditFacilityRequired: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                      >
                        <option value="YES">Yes, request credit terms after initial advance order</option>
                        <option value="NO">No, 100% advance bank transfer against dispatch Challan</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Wizard Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-900 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-xl transition-all border border-red-700/60"
                  >
                    <span>{currentStep === 3 ? "Submit Dealership Dossier" : "Continue to Next Step"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT 5 COLS: VERIFIED DEALERS DIRECTORY & PROVINCE FILTER */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-base text-white font-heading flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Existing Verified Dealer Network</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Authorized showrooms across 7 provinces in Nepal
                  </p>
                </div>
              </div>

              {/* Province Filter Pills */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {["ALL", "Bagmati", "Gandaki", "Madhesh", "Lumbini", "Koshi"].map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setSelectedProvinceFilter(prov)}
                    className={`px-2.5 py-1 rounded-lg border transition-colors ${
                      selectedProvinceFilter === prov
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {prov === "ALL" ? "All Provinces" : prov}
                  </button>
                ))}
              </div>

              {/* Dealers List */}
              <div className="divide-y divide-slate-800/80 max-h-[460px] overflow-y-auto space-y-3 pr-1">
                {filteredDealers.map((dealer) => (
                  <div key={dealer.id} className="pt-3 first:pt-0 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        {dealer.isFactoryOutlet && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-950 border border-red-700 text-red-300 font-mono font-bold">
                            HQ Outlet
                          </span>
                        )}
                        <span>{dealer.firmName}</span>
                      </span>
                      <span className="text-[10px] font-mono text-amber-400">
                        Est. {dealer.establishedYear} BS
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{dealer.address} ({dealer.city})</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                      <span>Floor: {dealer.sqFt} Sq. Ft.</span>
                      <span className="text-slate-300">📞 {dealer.phone.split("/")[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wholesale Pricing Teaser Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Representative Wholesale Margin Schedule
              </span>
              <div className="divide-y divide-slate-800 text-xs">
                <div className="py-2 flex items-center justify-between">
                  <span className="text-slate-300">Sansaar Model 78&quot; (संसार)</span>
                  <div className="text-right font-mono">
                    <span className="text-slate-500 line-through text-[10px] mr-2">D2C NPR 32,800</span>
                    <span className="text-amber-400 font-bold">Dealer NPR 27,500</span>
                  </div>
                </div>

                <div className="py-2 flex items-center justify-between">
                  <span className="text-slate-300">Janki Bridal 78&quot; (जानकी)</span>
                  <div className="text-right font-mono">
                    <span className="text-slate-500 line-through text-[10px] mr-2">D2C NPR 36,500</span>
                    <span className="text-amber-400 font-bold">Dealer NPR 30,500</span>
                  </div>
                </div>

                <div className="py-2 flex items-center justify-between">
                  <span className="text-slate-300">Commercial Safe 36&quot; (तजोरी)</span>
                  <div className="text-right font-mono">
                    <span className="text-slate-500 line-through text-[10px] mr-2">D2C NPR 45,000</span>
                    <span className="text-amber-400 font-bold">Dealer NPR 37,500</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
