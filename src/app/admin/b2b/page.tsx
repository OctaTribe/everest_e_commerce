"use client";

import React, { useState } from "react";
import {
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Percent,
  Truck,
  Printer,
  ShieldCheck,
  Search,
  Filter,
  DollarSign,
  Briefcase,
  Layers,
  MapPin,
  Calendar,
  AlertCircle,
  X
} from "lucide-react";
import { formatNPR } from "@/lib/formatters";
import {
  INITIAL_ADMIN_B2B_QUOTES,
  INITIAL_ADMIN_DEALERS,
  AdminB2BQuote,
  AdminDealerApplication,
} from "@/data/admin-mock-data";
import {
  reviewDealerApplicationAction,
  finalizeB2BQuoteAction,
} from "@/lib/actions/admin-actions";
import { ProformaQuoteView } from "@/components/invoice/ProformaQuoteView";

export default function AdminB2BPage() {
  const [activeTab, setActiveTab] = useState<"RFQS" | "DEALERS">("RFQS");
  const [quotes, setQuotes] = useState<AdminB2BQuote[]>(INITIAL_ADMIN_B2B_QUOTES);
  const [dealers, setDealers] = useState<AdminDealerApplication[]>(INITIAL_ADMIN_DEALERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Quote Review Modal
  const [reviewingQuote, setReviewingQuote] = useState<AdminB2BQuote | null>(null);
  const [adjustedDiscount, setAdjustedDiscount] = useState<number>(15);
  const [adjustedFreight, setAdjustedFreight] = useState<number>(10000);
  const [printableProforma, setPrintableProforma] = useState<any>(null);

  // Review Quote Submit
  const handleFinalizeQuote = async (quoteId: string) => {
    setIsProcessing(true);
    const res = await finalizeB2BQuoteAction({
      quoteId,
      adjustedDiscountPercent: adjustedDiscount,
      subsidizedFreightNpr: adjustedFreight,
      internalNotes: "Approved by Plant Commercial Desk with subsidized highway freight.",
      status: "QUOTE_SENT",
    });

    setIsProcessing(false);
    if (res.success) {
      setQuotes((prev) =>
        prev.map((q) =>
          q.id === quoteId
            ? {
                ...q,
                discountPercent: adjustedDiscount,
                discountAmountNpr: Math.round((q.grossListNpr * adjustedDiscount) / 100),
                netTenderNpr:
                  q.grossListNpr -
                  Math.round((q.grossListNpr * adjustedDiscount) / 100) +
                  adjustedFreight,
                status: "QUOTE_SENT",
              }
            : q
        )
      );
      setReviewingQuote(null);
      alert("Tender Quote finalized and proforma PDF dispatched to client!");
    }
  };

  // Review Dealer Submit
  const handleDealerAction = async (applicationId: string, action: "APPROVE" | "REJECT") => {
    setIsProcessing(true);
    const res = await reviewDealerApplicationAction({
      applicationId,
      action,
      adminNotes: action === "APPROVE"
        ? "Credentials verified with IRD Nepal. Approved for 22% wholesale margin and 30-day factory credit."
        : "Showroom floor size does not meet 1,200 sq. ft. minimum dealer franchise requirement.",
      assignedCreditLimitNpr: action === "APPROVE" ? 1500000 : 0,
    });

    setIsProcessing(false);
    if (res.success) {
      const msg = (res.data as any)?.message || (action === "APPROVE" ? "Dealer Approved" : "Dealer Rejected");
      setDealers((prev) =>
        prev.map((d) =>
          d.id === applicationId
            ? {
                ...d,
                status: action === "APPROVE" ? "APPROVED" : "REJECTED",
                adminNotes: msg,
              }
            : d
        )
      );
      alert(msg);
    }
  };

  // Handle Printable Proforma View
  const handleOpenProformaPreview = (quote: AdminB2BQuote) => {
    const proformaData = {
      quoteNumber: quote.quoteNumber,
      date: new Date().toISOString().split("T")[0],
      mitiBs: "2083-08-07 BS",
      validUntil: "30 Days from Issuance",
      organizationName: quote.organizationName,
      organizationType: quote.organizationType,
      contactPerson: quote.contactPerson,
      designation: quote.designation,
      phone: quote.phone,
      email: quote.email,
      panNumber: quote.panNumber,
      destinationDistrict: quote.destinationCity,
      items: quote.items.map((i, idx) => ({
        id: `it-${idx}`,
        name: i.productName,
        category: "INSTITUTIONAL",
        specs: i.specs,
        unitPriceNpr: i.unitPriceNpr,
        quantity: i.quantity,
        weightKg: 65,
      })),
      discountTierName: `${quote.discountPercent}% Institutional Tender Discount`,
      discountPercent: quote.discountPercent,
      subtotalNpr: quote.grossListNpr,
      discountAmountNpr: quote.discountAmountNpr,
      vatAmountNpr: Math.round((quote.grossListNpr - quote.discountAmountNpr) * 0.13),
      freightNpr: quote.subsidizedFreightNpr,
      totalNpr: quote.netTenderNpr,
      notes: quote.customRequirements,
    };
    setPrintableProforma(proformaData);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase">
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>Commercial B2B &amp; Dealership Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Institutional Quotes &amp; Dealer CRM
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Process high-volume government/bank tenders and approve authorized showroom franchise applications.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("RFQS")}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === "RFQS"
                ? "bg-amber-600 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Institutional RFQs ({quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("DEALERS")}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === "DEALERS"
                ? "bg-amber-600 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Dealer CRM ({dealers.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INSTITUTIONAL BULK QUOTES */}
      {activeTab === "RFQS" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block">Active Tenders Pipeline</span>
              <span className="text-xl font-bold text-white mt-1 block">
                {formatNPR(quotes.reduce((acc, q) => acc + q.netTenderNpr, 0))}
              </span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block">Total Units In Negotiation</span>
              <span className="text-xl font-bold text-amber-400 mt-1 block">
                {quotes.reduce((acc, q) => acc + q.totalUnits, 0)} Steel Units
              </span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block">Total Tender Mass</span>
              <span className="text-xl font-bold text-emerald-400 mt-1 block">
                {Math.round(quotes.reduce((acc, q) => acc + q.totalWeightKg, 0) / 1000 * 10) / 10} Metric Tons
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400 text-sm">{quote.quoteNumber}</span>
                      <span className="text-slate-600">•</span>
                      <span className="font-bold text-white text-base">{quote.organizationName}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Attn: <strong>{quote.contactPerson}</strong> ({quote.designation}) • Phone: {quote.phone} • PAN: {quote.panNumber}
                    </p>
                  </div>

                  <div className="sm:text-right font-mono text-xs">
                    <div className="text-lg font-bold text-white">{formatNPR(quote.netTenderNpr)}</div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border mt-1 ${
                        quote.status === "QUOTE_SENT"
                          ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                          : quote.status === "UNDER_REVIEW"
                          ? "bg-amber-950/80 text-amber-400 border-amber-800"
                          : "bg-blue-950/80 text-blue-400 border-blue-800"
                      }`}
                    >
                      {quote.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>

                {/* Items & Specs Table */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="font-mono text-[10px] uppercase text-slate-500 font-bold">
                    Requested Line Items ({quote.totalUnits} Units):
                  </div>
                  <div className="divide-y divide-slate-800/80">
                    {quote.items.map((it, idx) => (
                      <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white">{it.quantity}x {it.productName}</span>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{it.specs}</div>
                        </div>
                        <div className="font-mono font-bold text-white">
                          {formatNPR(it.unitPriceNpr * it.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Requirements & Financials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] space-y-1">
                    <span className="font-bold text-amber-400 uppercase font-mono block">Custom Requirements:</span>
                    <p className="text-slate-400">{quote.customRequirements}</p>
                    <div className="text-[10px] text-slate-500 font-mono pt-1">
                      Destination: {quote.destinationCity}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span>Gross Catalog Total:</span>
                      <span>{formatNPR(quote.grossListNpr)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Applied Discount ({quote.discountPercent}%):</span>
                      <span>-{formatNPR(quote.discountAmountNpr)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Subsidized Highway Freight:</span>
                      <span>+{formatNPR(quote.subsidizedFreightNpr)}</span>
                    </div>
                    <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-white text-xs">
                      <span>Net Quotation:</span>
                      <span className="text-amber-400">{formatNPR(quote.netTenderNpr)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="text-[11px] text-slate-500 font-mono">
                    Logged: {quote.requestedDate}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setReviewingQuote(quote);
                        setAdjustedDiscount(quote.discountPercent);
                        setAdjustedFreight(quote.subsidizedFreightNpr);
                      }}
                      className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-3 py-1.5 rounded-lg text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <Percent className="w-3.5 h-3.5" />
                      <span>Adjust Discount &amp; Terms</span>
                    </button>

                    <button
                      onClick={() => handleOpenProformaPreview(quote)}
                      className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Proforma PDF</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AUTHORIZED DEALER CRM */}
      {activeTab === "DEALERS" && (
        <div className="space-y-4">
          <div className="space-y-4">
            {dealers.map((dealer) => (
              <div
                key={dealer.id}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-white text-base">{dealer.firmName}</span>
                      <span className="text-xs font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-950 border border-amber-800">
                        PAN: {dealer.panVatNumber}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Proprietor: <strong className="text-white">{dealer.ownerName}</strong> • Phone: {dealer.contactPhone} • Email: {dealer.contactEmail}
                    </p>
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${
                      dealer.status === "APPROVED"
                        ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                        : dealer.status === "REJECTED"
                        ? "bg-red-950/80 text-red-400 border-red-800"
                        : "bg-amber-950/80 text-amber-400 border-amber-800"
                    }`}
                  >
                    {dealer.status}
                  </span>
                </div>

                {/* Showroom & Warehouse Logistics Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Showroom Floor</span>
                    <strong className="text-white text-sm">{dealer.showroomSqFt} Sq. Ft.</strong>
                    <span className="text-[10px] text-slate-400 block">{dealer.city}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Dedicated Warehouse</span>
                    <strong className="text-white text-sm">{dealer.warehouseSqFt} Sq. Ft.</strong>
                    <span className="text-[10px] text-slate-400 block">Ramp: {dealer.unloadingRamp}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Projected Volume</span>
                    <strong className="text-amber-400 text-sm">{dealer.projectedMonthlyUnits} Units / Mo</strong>
                    <span className="text-[10px] text-slate-400 block">Est: {dealer.yearsInBusiness} Yrs in trade</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Stock Capital</span>
                    <strong className="text-emerald-400 text-sm">{formatNPR(dealer.initialStockBudgetNpr)}</strong>
                    <span className="text-[10px] text-slate-400 block">
                      Credit: {dealer.creditFacilityRequested ? "Requested" : "Prepaid"}
                    </span>
                  </div>
                </div>

                {/* Address & Admin Notes */}
                <div className="text-xs text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-500">Showroom Address:</span>{" "}
                    <strong>{dealer.showroomAddress} ({dealer.city}, {dealer.province})</strong>
                  </div>
                  {dealer.adminNotes && (
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-amber-300">
                      <strong>Admin Notes:</strong> {dealer.adminNotes}
                    </div>
                  )}
                </div>

                {/* Action Buttons for Pending Applications */}
                {dealer.status !== "APPROVED" && (
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleDealerAction(dealer.id, "REJECT")}
                      disabled={isProcessing}
                      className="bg-red-950/80 hover:bg-red-900 text-red-300 font-bold px-4 py-2 rounded-xl text-xs border border-red-800 transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject Application</span>
                    </button>

                    <button
                      onClick={() => handleDealerAction(dealer.id, "APPROVE")}
                      disabled={isProcessing}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve &amp; Upgrade Role to DEALER</span>
                    </button>
                  </div>
                )}

                {dealer.status === "APPROVED" && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-mono pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authorized Franchise Active (Role: DEALER) • 22% Wholesale Margins Unlocked</span>
                    </span>
                    <span>Credit Facility: {formatNPR(dealer.assignedCreditLimitNpr || 1500000)}</span>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADJUST B2B QUOTE TERMS MODAL */}
      {reviewingQuote && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white font-heading">
                Adjust Institutional Discount &amp; Freight
              </h3>
              <button onClick={() => setReviewingQuote(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-white">{reviewingQuote.organizationName}</div>
                <div className="text-slate-400 font-mono text-[11px]">
                  Ref: {reviewingQuote.quoteNumber} • {reviewingQuote.totalUnits} Units ({reviewingQuote.totalWeightKg} kg)
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Adjusted Tender Discount Percentage (%):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={adjustedDiscount}
                    onChange={(e) => setAdjustedDiscount(Number(e.target.value))}
                    className="flex-1 accent-amber-500"
                  />
                  <span className="font-mono font-bold text-base text-amber-400 w-12 text-right">
                    {adjustedDiscount}%
                  </span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Subsidized Highway Freight Charge (NPR):
                </label>
                <input
                  type="number"
                  value={adjustedFreight}
                  onChange={(e) => setAdjustedFreight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono font-bold outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span>Gross Catalog Total:</span>
                  <span>{formatNPR(reviewingQuote.grossListNpr)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Discount ({adjustedDiscount}%):</span>
                  <span>-{formatNPR((reviewingQuote.grossListNpr * adjustedDiscount) / 100)}</span>
                </div>
                <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-white text-xs">
                  <span>Revised Net Tender Value:</span>
                  <span className="text-amber-400">
                    {formatNPR(
                      reviewingQuote.grossListNpr -
                        (reviewingQuote.grossListNpr * adjustedDiscount) / 100 +
                        adjustedFreight
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setReviewingQuote(null)}
                className="px-4 py-2 text-slate-400 hover:text-white text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleFinalizeQuote(reviewingQuote.id)}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md"
              >
                {isProcessing ? "Processing..." : "Finalize & Send Quote"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE PROFORMA MODAL */}
      {printableProforma && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full">
            <ProformaQuoteView quote={printableProforma} onClose={() => setPrintableProforma(null)} />
          </div>
        </div>
      )}

    </div>
  );
}
