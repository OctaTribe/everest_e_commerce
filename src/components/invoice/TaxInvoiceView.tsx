"use client";

import React from "react";
import { Printer, Download, CheckCircle2, ShieldCheck, Factory, Award, ArrowLeft } from "lucide-react";
import { formatNPR } from "@/lib/formatters";
import { CartItem } from "@/store/useStore";
import { DistrictLogisticsInfo } from "@/data/seed-data";

export interface InvoiceData {
  orderNumber: string;
  invoiceNumber: string;
  warrantyCode: string;
  orderDate: string;
  mitiBs: string;
  customerName: string;
  customerPhone: string;
  customerSecondaryPhone?: string;
  customerEmail?: string;
  province: string;
  district: string;
  municipality: string;
  wardNo: string;
  tole: string;
  paymentMethod: string;
  paymentStatus: "PAID_FULL" | "ADVANCE_PAID" | "PENDING";
  advanceAmountNpr?: number;
  remainingCodNpr?: number;
  items: CartItem[];
  subtotalNpr: number;
  discountNpr: number;
  freightNpr: number;
  totalNpr: number;
  destinationCity: string;
  dispatchDays: string;
}

export function TaxInvoiceView({
  invoice,
  onClose,
}: {
  invoice: InvoiceData;
  onClose?: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  const vatAmountNpr = (invoice.subtotalNpr - invoice.discountNpr) * 0.13;

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
              <span>Back to Confirmation</span>
            </button>
          )}
          <span className="text-xs font-bold text-amber-500 font-mono">
            TAX INVOICE & 5-YEAR WARRANTY DOSSIER
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Invoice / PDF</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE INVOICE SHEET (A4 Structured) */}
      <div className="p-6 sm:p-10 bg-slate-900 print:bg-white print:text-black rounded-2xl border border-slate-800 print:border-none print:p-0 space-y-6 mt-4">
        
        {/* Invoice Header: Birgunj Plant Details */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-800 print:border-gray-300 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-red-900 border-2 border-amber-500 rounded flex flex-col items-center justify-center font-black text-white text-xs print:border-black print:bg-red-800">
                <span>2039</span>
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

            <div className="text-xs text-slate-400 print:text-gray-600 leading-relaxed pt-2 space-y-0.5">
              <div>Factory: Birgunj Industrial Area (BIE), Parsa, Madhesh Province, Nepal</div>
              <div>Kathmandu Depot: Teku / Koteshwor Corridor, Kathmandu</div>
              <div className="font-mono">Tel: +977-51-521940 / +977-9855021000 | Email: billing@evereststeel.com.np</div>
              <div className="font-bold text-amber-400 print:text-black font-mono">
                Nepal IRD PAN / VAT Registration: 300189241
              </div>
            </div>
          </div>

          <div className="sm:text-right space-y-1.5 shrink-0 bg-slate-950/80 print:bg-gray-100 p-4 rounded-xl border border-slate-800 print:border-gray-300 text-xs font-mono">
            <div className="text-sm font-black text-white print:text-black">TAX INVOICE (कर बिजक)</div>
            <div><span className="text-slate-400 print:text-gray-600">Invoice No:</span> <strong className="text-amber-400 print:text-black">{invoice.invoiceNumber}</strong></div>
            <div><span className="text-slate-400 print:text-gray-600">Order Ref:</span> <strong>{invoice.orderNumber}</strong></div>
            <div><span className="text-slate-400 print:text-gray-600">Date (AD):</span> {invoice.orderDate}</div>
            <div><span className="text-slate-400 print:text-gray-600">मिति (BS):</span> {invoice.mitiBs}</div>
          </div>
        </div>

        {/* Billed To / Shipping Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-slate-950/40 print:bg-gray-50 p-4 rounded-xl border border-slate-800/80 print:border-gray-200">
          <div className="space-y-1">
            <div className="font-bold text-amber-400 print:text-black uppercase tracking-wider text-[10px]">
              Customer & Delivery Address:
            </div>
            <div className="font-bold text-sm text-white print:text-black">{invoice.customerName}</div>
            <div className="text-slate-300 print:text-gray-700">
              {invoice.tole}, Ward No. {invoice.wardNo}, {invoice.municipality}
            </div>
            <div className="text-slate-300 print:text-gray-700">
              District: {invoice.district}, {invoice.province}
            </div>
            <div className="font-mono text-slate-400 print:text-gray-600 pt-1">
              Primary Mobile: <strong>{invoice.customerPhone}</strong>
              {invoice.customerSecondaryPhone && ` | Alt: ${invoice.customerSecondaryPhone}`}
            </div>
          </div>

          <div className="space-y-1 sm:text-right">
            <div className="font-bold text-amber-400 print:text-black uppercase tracking-wider text-[10px]">
              Freight Logistics & Payment:
            </div>
            <div className="text-slate-300 print:text-gray-700">
              Dispatch Destination: <strong>{invoice.destinationCity}</strong>
            </div>
            <div className="text-slate-300 print:text-gray-700">
              Lead Time: <strong>{invoice.dispatchDays}</strong>
            </div>
            <div className="text-slate-300 print:text-gray-700">
              Payment Gateway: <strong>{invoice.paymentMethod.replace(/_/g, " ")}</strong>
            </div>
            <div className="pt-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                invoice.paymentStatus === "PAID_FULL"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800 print:bg-gray-200 print:text-black"
                  : "bg-amber-950 text-amber-300 border border-amber-800 print:bg-gray-200 print:text-black"
              }`}>
                STATUS: {invoice.paymentStatus.replace(/_/g, " ")}
              </span>
            </div>
          </div>
        </div>

        {/* Itemized Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-700 print:border-black bg-slate-950/80 print:bg-gray-100 font-bold uppercase text-[10px] text-slate-400 print:text-black">
                <th className="p-2.5">S.N.</th>
                <th className="p-2.5">Model Description & Engineering Specs</th>
                <th className="p-2.5">SKU Code</th>
                <th className="p-2.5 text-center">Qty</th>
                <th className="p-2.5 text-right">Unit Price (NPR)</th>
                <th className="p-2.5 text-right">Total (NPR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 print:divide-gray-300">
              {invoice.items.map((item, idx) => (
                <tr key={item.id} className="text-slate-200 print:text-black">
                  <td className="p-2.5 font-mono">{idx + 1}</td>
                  <td className="p-2.5">
                    <div className="font-bold text-white print:text-black">{item.productName}</div>
                    <div className="text-[11px] text-slate-400 print:text-gray-600 font-mono">
                      {item.colorName} • {item.dimensionsSummary} • {item.steelGauge} • {item.weightKg} kg
                    </div>
                  </td>
                  <td className="p-2.5 font-mono text-amber-400 print:text-black">{item.variantSku}</td>
                  <td className="p-2.5 text-center font-mono font-bold">{item.quantity}</td>
                  <td className="p-2.5 text-right font-mono">{formatNPR(item.unitPriceNpr, false)}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-white print:text-black">
                    {formatNPR(item.unitPriceNpr * item.quantity, false)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost Summary Breakdown */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t-2 border-slate-800 print:border-gray-400 pt-4 text-xs">
          
          {/* Terms & Payment Notes */}
          <div className="space-y-1.5 max-w-sm text-slate-400 print:text-gray-600 text-[11px] leading-relaxed">
            <div className="font-bold text-white print:text-black">Commercial Terms & Warranty:</div>
            <div>• All units treated with Everest 7-tank hot phosphate chemical anti-rust immersion @ 65°C.</div>
            <div>• Free ground-floor hydraulic lift placement included for factory dispatch orders.</div>
            <div>• Goods once dispatched are insured under Birgunj highway transit coverage.</div>
          </div>

          {/* Totals Table */}
          <div className="w-full sm:w-72 space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-slate-400 print:text-gray-600">
              <span>Item Subtotal:</span>
              <span className="text-white print:text-black">{formatNPR(invoice.subtotalNpr)}</span>
            </div>

            {invoice.discountNpr > 0 && (
              <div className="flex justify-between text-emerald-400 print:text-black">
                <span>Promo Discount:</span>
                <span>- {formatNPR(invoice.discountNpr)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-400 print:text-gray-600">
              <span>Heavy Highway Freight:</span>
              <span className="text-amber-400 print:text-black">{formatNPR(invoice.freightNpr)}</span>
            </div>

            <div className="flex justify-between text-slate-500 print:text-gray-500 text-[10px]">
              <span>Includes 13% Nepal VAT:</span>
              <span>({formatNPR(vatAmountNpr)})</span>
            </div>

            <div className="border-t-2 border-slate-700 print:border-black pt-2 flex justify-between font-bold text-sm text-white print:text-black">
              <span>Grand Total:</span>
              <span className="text-amber-400 print:text-black text-base">{formatNPR(invoice.totalNpr)}</span>
            </div>

            {invoice.paymentStatus === "ADVANCE_PAID" && (
              <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between text-emerald-400 print:text-black">
                  <span>20% Advance Paid Online:</span>
                  <span>{formatNPR(invoice.advanceAmountNpr || 0)}</span>
                </div>
                <div className="flex justify-between text-amber-400 print:text-black font-bold">
                  <span>80% Balance on Truck COD:</span>
                  <span>{formatNPR(invoice.remainingCodNpr || 0)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* OFFICIAL 5-YEAR FACTORY WARRANTY CERTIFICATE STAMP */}
        <div className="p-5 bg-slate-950 print:bg-gray-100 rounded-2xl border-2 border-dashed border-amber-600/70 print:border-gray-500 mt-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-400 print:text-black font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>OFFICIAL 5-YEAR FACTORY RUST & LOCK WARRANTY CERTIFICATE</span>
              </div>
              <div className="text-[11px] text-slate-300 print:text-gray-700 leading-relaxed">
                This document certifies that the steel models listed herein are guaranteed against structural corrosion, lock failure, and hinge sagging under normal residential/office usage for a period of 5 years from delivery date.
              </div>
              <div className="font-mono text-xs text-amber-400 print:text-black font-bold pt-1">
                Certificate Verification ID: {invoice.warrantyCode}
              </div>
            </div>

            {/* Official Factory Stamp */}
            <div className="w-28 h-28 rounded-full border-2 border-red-700 text-red-500 print:text-red-800 print:border-red-800 flex flex-col items-center justify-center text-center p-2 rotate-[-12deg] shrink-0 font-bold text-[9px] uppercase leading-tight select-none">
              <span>★ EVEREST STEEL ★</span>
              <span className="text-[11px] font-black my-0.5">PASSED Q.C.</span>
              <span>BIRGUNJ PLANT</span>
              <span className="text-[7px]">ESTD 2039 BS</span>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="flex justify-between items-end pt-10 text-xs font-mono text-slate-400 print:text-black">
          <div className="text-center">
            <div className="w-40 border-b border-slate-700 print:border-black mb-1" />
            <div>Customer Signature</div>
          </div>

          <div className="text-center">
            <div className="w-48 border-b border-slate-700 print:border-black mb-1 font-bold text-white print:text-black">
              Er. P. K. Sharma
            </div>
            <div>Authorized Factory Signatory (Birgunj)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
