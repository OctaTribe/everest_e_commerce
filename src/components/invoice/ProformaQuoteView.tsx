"use client";

import React from "react";
import { Printer, ArrowLeft, ShieldCheck, Building2, CheckCircle2 } from "lucide-react";
import { formatNPR } from "@/lib/formatters";

export interface BulkQuoteItem {
  id: string;
  name: string;
  category: string;
  specs: string;
  unitPriceNpr: number;
  quantity: number;
  weightKg: number;
}

export interface ProformaQuoteData {
  quoteNumber: string;
  date: string;
  mitiBs: string;
  validUntil: string;
  organizationName: string;
  organizationType: string;
  contactPerson: string;
  designation: string;
  phone: string;
  email: string;
  panNumber?: string;
  destinationDistrict: string;
  items: BulkQuoteItem[];
  discountTierName: string;
  discountPercent: number;
  subtotalNpr: number;
  discountAmountNpr: number;
  vatAmountNpr: number;
  freightNpr: number;
  totalNpr: number;
  notes?: string;
}

export function ProformaQuoteView({
  quote,
  onClose,
}: {
  quote: ProformaQuoteData;
  onClose?: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  const totalUnits = quote.items.reduce((acc, it) => acc + it.quantity, 0);
  const totalWeightKg = quote.items.reduce((acc, it) => acc + it.weightKg * it.quantity, 0);

  return (
    <div className="bg-slate-950 p-4 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl max-w-4xl mx-auto my-6 text-slate-100 font-sans print:bg-white print:text-black print:p-0 print:border-none print:shadow-none print:m-0">
      
      {/* Top Action Bar (Hidden when printing) */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800 print:hidden">
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Estimator</span>
            </button>
          )}
          <span className="text-xs font-bold text-amber-500 font-mono">
            OFFICIAL TENDER PROFORMA QUOTATION
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Proforma (PDF)</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE PROFORMA SHEET (A4 Standard) */}
      <div className="p-6 sm:p-10 bg-slate-900 print:bg-white print:text-black rounded-2xl border border-slate-800 print:border-none print:p-0 space-y-6 mt-4">
        
        {/* Header Letterhead */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b-2 border-slate-700 print:border-black pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-900 border-2 border-amber-500 rounded flex flex-col items-center justify-center font-black text-white text-xs print:border-black print:bg-red-800">
                <span className="text-sm">2039</span>
                <span className="text-[8px] text-amber-400">BS</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white print:text-black font-heading">
                  EVEREST STEEL FURNITURE UDYOG
                </h2>
                <div className="text-xs text-amber-500 print:text-red-800 font-bold">
                  एभरेष्ट स्टील फर्निचर उद्योग • बीरगञ्ज, नेपाल
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 print:text-gray-600 max-w-md pt-1">
              Industrial Area, Bypass Road, Birgunj, Parsa, Nepal • Tel: 051-521940 / 9801234567 • Email: commercial@evereststeel.com.np
            </p>
            <div className="text-[10px] font-mono text-slate-400 print:text-black">
              IRD PAN/VAT No: <strong className="text-white print:text-black">300189241</strong> • Reg. No: 1248/039
            </div>
          </div>

          <div className="sm:text-right space-y-1 text-xs">
            <div className="inline-block bg-amber-950/80 print:bg-gray-100 border border-amber-800 print:border-black px-3 py-1 rounded text-amber-400 print:text-black font-mono font-bold uppercase">
              PROFORMA INVOICE / RFQ
            </div>
            <div className="text-slate-300 print:text-black font-mono font-bold text-sm">
              Ref: {quote.quoteNumber}
            </div>
            <div className="text-slate-400 print:text-gray-700">
              Date: {quote.date} ({quote.mitiBs})
            </div>
            <div className="text-slate-400 print:text-gray-700">
              Validity: <strong className="text-amber-400 print:text-black">{quote.validUntil}</strong>
            </div>
          </div>
        </div>

        {/* Client & Destination Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 print:bg-gray-50 p-4 rounded-xl border border-slate-800 print:border-gray-300 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-500 print:text-black mb-1">
              Quotation Prepared For:
            </div>
            <div className="font-bold text-white print:text-black text-sm">
              {quote.organizationName}
            </div>
            <div className="text-slate-300 print:text-gray-700">
              Attn: {quote.contactPerson} {quote.designation && `(${quote.designation})`}
            </div>
            {quote.panNumber && (
              <div className="text-slate-400 print:text-gray-700 font-mono">
                PAN/VAT: {quote.panNumber}
              </div>
            )}
            <div className="text-slate-400 print:text-gray-700">
              Phone: {quote.phone} • Email: {quote.email}
            </div>
          </div>

          <div className="sm:text-right">
            <div className="text-[10px] uppercase font-bold text-amber-500 print:text-black mb-1">
              Logistics & Delivery Terms:
            </div>
            <div className="text-slate-300 print:text-gray-700">
              Destination: <strong className="text-white print:text-black">{quote.destinationDistrict}</strong>
            </div>
            <div className="text-slate-300 print:text-gray-700">
              Dispatch Origin: <span className="font-semibold text-white print:text-black">Birgunj Central Works</span>
            </div>
            <div className="text-slate-300 print:text-gray-700">
              Pre-Treatment: Hot 7-Tank Chemical Phosphating (IS:6005)
            </div>
            <div className="text-slate-300 print:text-gray-700">
              Paint: Industrial Electrostatic Powder Coating (RAL Shades)
            </div>
          </div>
        </div>

        {/* Itemized Specification Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 print:border-black text-[11px] font-bold text-slate-400 print:text-black uppercase">
                <th className="py-2.5 px-2">S.N.</th>
                <th className="py-2.5 px-3">Item Description & Manufacturing Specs</th>
                <th className="py-2.5 px-2 text-center">Unit Weight</th>
                <th className="py-2.5 px-2 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Unit Rate (NPR)</th>
                <th className="py-2.5 px-3 text-right">Amount (NPR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 print:divide-gray-300 text-slate-300 print:text-black">
              {quote.items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-950/40 print:hover:bg-transparent">
                  <td className="py-2.5 px-2 font-mono text-slate-500 print:text-black">{idx + 1}</td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-white print:text-black">{item.name}</div>
                    <div className="text-[10px] text-slate-400 print:text-gray-600 font-mono mt-0.5">
                      {item.specs}
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono">{item.weightKg} kg</td>
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-white print:text-black">
                    {item.quantity}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono">{formatNPR(item.unitPriceNpr)}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-white print:text-black">
                    {formatNPR(item.unitPriceNpr * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Calculations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800 print:border-black">
          <div className="text-xs text-slate-400 print:text-gray-700 space-y-2">
            <div className="bg-slate-950 print:bg-gray-50 p-3 rounded-xl border border-slate-800 print:border-gray-300 space-y-1">
              <div className="font-bold text-white print:text-black text-xs">
                Tender Terms & Conditions:
              </div>
              <ul className="list-disc list-inside text-[11px] space-y-0.5 text-slate-400 print:text-gray-600">
                <li>Manufacturing lead time: 7 to 14 days from PO & advance receipt.</li>
                <li>Payment: 50% advance against Proforma, balance against delivery Challan.</li>
                <li>Includes 5-Year Factory Warranty against rust and locking mechanism failure.</li>
                <li>Prices inclusive of 13% Nepal VAT as required by IRD.</li>
              </ul>
            </div>
            <div className="text-[11px] font-mono text-slate-500 print:text-gray-600">
              Total Order Weight: <strong>{totalWeightKg} kg ({Math.round(totalWeightKg / 1000 * 10) / 10} Metric Tons)</strong> • Total Units: <strong>{totalUnits} Units</strong>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 print:text-black sm:pl-8">
            <div className="flex justify-between">
              <span>Gross Product Total:</span>
              <span className="font-mono">{formatNPR(quote.subtotalNpr)}</span>
            </div>

            {quote.discountAmountNpr > 0 && (
              <div className="flex justify-between text-emerald-400 print:text-black">
                <span>Tier Volume Discount ({quote.discountTierName}):</span>
                <span className="font-mono font-bold">-{formatNPR(quote.discountAmountNpr)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Taxable Value:</span>
              <span className="font-mono">
                {formatNPR(quote.subtotalNpr - quote.discountAmountNpr)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Nepal VAT (13%):</span>
              <span className="font-mono">{formatNPR(quote.vatAmountNpr)}</span>
            </div>

            <div className="flex justify-between">
              <span>Birgunj Heavy Freight (Subsidized):</span>
              <span className="font-mono">{formatNPR(quote.freightNpr)}</span>
            </div>

            <div className="border-t-2 border-slate-700 print:border-black pt-2 flex justify-between text-base font-bold text-white print:text-black">
              <span>Net Tender Value (NPR):</span>
              <span className="font-mono text-amber-400 print:text-black text-lg">
                {formatNPR(quote.totalNpr)}
              </span>
            </div>
          </div>
        </div>

        {/* Official Signatures & Seal */}
        <div className="pt-8 border-t border-slate-800 print:border-gray-300 flex justify-between items-end text-xs">
          <div className="space-y-1 text-slate-400 print:text-gray-600">
            <div className="w-20 h-20 border border-dashed border-slate-700 print:border-gray-400 rounded-full flex items-center justify-center text-[9px] text-center font-bold text-slate-500 print:text-gray-500 uppercase p-2">
              Factory Seal<br/>Everest Steel
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="font-serif italic text-base text-slate-300 print:text-black">
              N. P. Agrawal
            </div>
            <div className="h-0.5 w-40 bg-slate-700 print:bg-black ml-auto"></div>
            <div className="font-bold text-white print:text-black text-xs">
              Authorized Signatory
            </div>
            <div className="text-[10px] text-slate-400 print:text-gray-600">
              Commercial & Institutional Sales Desk<br />
              Everest Steel Furniture Udyog, Birgunj
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
