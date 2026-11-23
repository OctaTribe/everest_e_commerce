"use client";

import React from "react";
import { Printer, X, ShieldCheck, Award, Lock, Sparkles } from "lucide-react";

export function WarrantyCardModal({
  warrantyCode,
  orderNumber,
  customerName,
  productName,
  variantSku,
  onClose,
}: {
  warrantyCode: string;
  orderNumber: string;
  customerName: string;
  productName: string;
  variantSku: string;
  onClose: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:fixed-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
              Everest 5-Year Gold Rust & Lock Warranty Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>Print Warranty Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE GOLD CERTIFICATE (A4 / Landscape card) */}
        <div className="p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 print:bg-white print:text-black rounded-2xl border-2 border-amber-600/70 print:border-black space-y-6 relative overflow-hidden">
          
          {/* Watermark badge */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none print:hidden">
            <Award className="w-64 h-64 text-amber-400" />
          </div>

          {/* Letterhead */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-3 py-0.5 rounded-full uppercase">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Birgunj Quality Assurance Guarantee • Est. 2039 BS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white print:text-black tracking-tight font-heading mt-1">
              5-YEAR FACTORY WARRANTY CERTIFICATE
            </h2>
            <p className="text-xs text-amber-400 print:text-red-800 font-bold">
              एभरेष्ट स्टील फर्निचर उद्योग • बीरगञ्ज, नेपाल
            </p>
          </div>

          {/* Certificate Body */}
          <div className="bg-slate-900/90 print:bg-gray-50 p-5 rounded-xl border border-slate-800 print:border-gray-300 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-slate-400 print:text-black">Warranty Serial Code:</span>
              <span className="font-mono font-bold text-amber-400 print:text-black text-sm">{warrantyCode}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Registered Owner</span>
                <strong className="text-white print:text-black">{customerName}</strong>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Order Reference</span>
                <strong className="text-white print:text-black font-mono">{orderNumber}</strong>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Model Name</span>
                <strong className="text-slate-200 print:text-black">{productName}</strong>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block">SKU Code</span>
                <strong className="text-amber-400 print:text-black font-mono">{variantSku}</strong>
              </div>
            </div>
          </div>

          {/* Warranty Coverage Clauses */}
          <div className="space-y-1.5 text-[11px] text-slate-300 print:text-gray-700 leading-relaxed">
            <div className="font-bold text-white print:text-black flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full 60-Month Manufacturing Protection Includes:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 pl-2 text-slate-400 print:text-gray-600">
              <li><strong>Zero-Rust Guarantee:</strong> Free panel replacement if rust or paint flaking occurs under indoor ambient conditions, guaranteed by our 7-tank hot phosphate chemical pre-treatment.</li>
              <li><strong>Lock Mechanism Replacement:</strong> Complete unpickable brass cylinder or deadbolt replacement in case of mechanical defect.</li>
              <li><strong>Hinges & Telescopic Rails:</strong> Lifetime free labor service from authorized Everest Steel dealer technicians across all 7 provinces of Nepal.</li>
            </ul>
          </div>

          {/* Signature & Seal */}
          <div className="pt-6 border-t border-slate-800 print:border-black flex justify-between items-end text-xs">
            <div className="text-center space-y-1 font-mono">
              <div className="w-16 h-16 border-2 border-dashed border-amber-600/60 rounded-full flex items-center justify-center text-[8px] font-bold text-amber-400 uppercase text-center p-1 mx-auto">
                Everest Steel<br/>QA PASSED<br/>BIRGUNJ
              </div>
              <span className="text-[9px] text-slate-400 block mt-1">Official QC Seal</span>
            </div>

            <div className="text-right space-y-1 font-mono">
              <div className="font-serif italic text-base text-slate-200 print:text-black">
                R. Agrawal
              </div>
              <div className="h-0.5 w-36 bg-amber-600 print:bg-black ml-auto"></div>
              <span className="font-bold text-white print:text-black block text-xs">Er. Rajesh Agrawal</span>
              <span className="text-[10px] text-slate-400 print:text-gray-600 block">Plant Director • Birgunj Works</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
