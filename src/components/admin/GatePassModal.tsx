"use client";

import React from "react";
import { Printer, X, ShieldCheck, Truck, Factory, CheckCircle2 } from "lucide-react";
import { DispatchChallan } from "@/data/admin-mock-data";

export function GatePassModal({
  challan,
  onClose,
}: {
  challan: DispatchChallan;
  onClose: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:fixed-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        
        {/* Header Action Buttons (Hidden when printing) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-wider">
              Birgunj Factory Gate Pass & Highway Transit Challan
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>Print Gate Pass (A4)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE GATE PASS BODY */}
        <div className="space-y-6 bg-slate-950 print:bg-white p-6 sm:p-8 rounded-2xl border border-slate-800 print:border-black print:p-0">
          
          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-700 print:border-black pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-red-900 border-2 border-amber-500 rounded flex flex-col items-center justify-center font-black text-white text-xs print:bg-black print:border-black">
                  <span>2039</span>
                  <span className="text-[7px] text-amber-400">BS</span>
                </div>
                <div>
                  <h2 className="text-xl font-black text-white print:text-black font-heading">
                    EVEREST STEEL FURNITURE UDYOG
                  </h2>
                  <div className="text-[11px] text-amber-500 print:text-black font-bold">
                    बीरगञ्ज औद्योगिक करिडोर, पर्सा, नेपाल • FACTORY GATE PASS & DISPATCH CHALLAN
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 print:text-gray-600 font-mono">
                PAN/VAT: 300189241 • Factory Security Gate No. 2 • Phone: 051-521940
              </p>
            </div>

            <div className="sm:text-right text-xs font-mono">
              <div className="bg-amber-950/80 border border-amber-800 print:border-black px-3 py-1 rounded text-amber-400 print:text-black font-bold">
                CHALLAN: {challan.challanNumber}
              </div>
              <div className="text-slate-400 print:text-black text-[11px] mt-1">
                Order Ref: <strong className="text-white print:text-black">{challan.orderNumber}</strong>
              </div>
              <div className="text-slate-400 print:text-black text-[11px]">
                Date: {new Date().toLocaleDateString("en-CA")} (2083-08-07 BS)
              </div>
            </div>
          </div>

          {/* Vehicle & Logistics Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 print:bg-gray-100 p-4 rounded-xl border border-slate-800 print:border-gray-300 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Vehicle Reg. No.</span>
              <strong className="text-white print:text-black text-sm">{challan.vehicleNo}</strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Driver Name</span>
              <strong className="text-white print:text-black">{challan.driverName}</strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Driver Contact</span>
              <strong className="text-amber-400 print:text-black">{challan.driverPhone}</strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Driver License No.</span>
              <strong className="text-slate-300 print:text-black">{challan.driverLicenseNo}</strong>
            </div>
          </div>

          {/* Cargo Inspection Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-900 print:bg-gray-50 rounded-xl border border-slate-800 print:border-gray-300">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Crate Count</span>
              <span className="text-xl font-bold font-mono text-white print:text-black">{challan.crateCount} Wooden Crates</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Heavy industrial corner edge guards intact</p>
            </div>

            <div className="p-3 bg-slate-900 print:bg-gray-50 rounded-xl border border-slate-800 print:border-gray-300">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Gross Cargo Weight</span>
              <span className="text-xl font-bold font-mono text-amber-400 print:text-black">{challan.totalWeightKg} kg</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Verified at Birgunj Factory Weighbridge</p>
            </div>

            <div className="p-3 bg-slate-900 print:bg-gray-50 rounded-xl border border-slate-800 print:border-gray-300">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Factory Tamper Seal</span>
              <span className="text-lg font-bold font-mono text-emerald-400 print:text-black">{challan.factorySealNumber}</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Security wire seal on truck container</p>
            </div>
          </div>

          {/* Highway Route Clearance */}
          <div className="p-3.5 bg-slate-900/60 print:bg-gray-50 rounded-xl border border-slate-800 print:border-gray-300 text-xs text-slate-300 print:text-gray-700 space-y-1">
            <div className="font-bold text-white print:text-black flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Authorized Transit Route: Birgunj Bypass → Hetauda → Narayangarh → {challan.destinationHub}</span>
            </div>
            <p className="text-[11px] text-slate-400 print:text-gray-600">
              Highway Police / Traffic Inspection Note: This vehicle carries prime manufactured steel furniture covered by VAT Bill and Factory Gate Clearance. All locking mechanisms sealed.
            </p>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-slate-800 print:border-black flex justify-between items-end text-xs font-mono">
            <div className="space-y-1 text-center">
              <div className="h-0.5 w-36 bg-slate-700 print:bg-black mb-1"></div>
              <span className="text-slate-400 print:text-black font-semibold">Security Officer Gate 2</span>
              <span className="text-[10px] text-slate-500 block">({challan.securityOfficerName})</span>
            </div>

            <div className="space-y-1 text-center">
              <div className="h-0.5 w-36 bg-slate-700 print:bg-black mb-1"></div>
              <span className="text-slate-400 print:text-black font-semibold">Driver Signature</span>
              <span className="text-[10px] text-slate-500 block">({challan.driverName})</span>
            </div>

            <div className="space-y-1 text-center">
              <div className="h-0.5 w-36 bg-slate-700 print:bg-black mb-1"></div>
              <span className="text-slate-400 print:text-black font-semibold">Factory Dispatch Manager</span>
              <span className="text-[10px] text-slate-500 block">Birgunj Central Works</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
