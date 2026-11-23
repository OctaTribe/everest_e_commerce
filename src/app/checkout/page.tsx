"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  QrCode,
  Lock,
  Building2,
  ShoppingCart,
  Printer,
  FileText,
  Phone,
  Tag,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  RotateCcw
} from "lucide-react";
import { useEverestStore, CartItem, AVAILABLE_UPSELLS, UpsellItem } from "@/store/useStore";
import { SEED_SHIPPING_ZONES, NEPAL_DISTRICT_LOGISTICS } from "@/data/seed-data";
import { formatNPR } from "@/lib/formatters";
import { TaxInvoiceView, InvoiceData } from "@/components/invoice/TaxInvoiceView";
import { generateFonepayQR } from "@/lib/payment/fonepay";

const NEPAL_PROVINCES = [
  { id: "p1", name: "Koshi Province (Province 1)", hub: "Biratnagar" },
  { id: "p2", name: "Madhesh Province (Province 2 - Birgunj Factory Hub)", hub: "Birgunj" },
  { id: "p3", name: "Bagmati Province (Province 3 - Kathmandu Valley)", hub: "Kathmandu Valley" },
  { id: "p4", name: "Gandaki Province (Province 4)", hub: "Pokhara" },
  { id: "p5", name: "Lumbini Province (Province 5)", hub: "Butwal" },
  { id: "p6", name: "Karnali Province (Province 6)", hub: "Surkhet" },
  { id: "p7", name: "Sudurpashchim Province (Province 7)", hub: "Dhangadhi" },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const paymentQueryStatus = searchParams.get("payment");
  const txnCodeParam = searchParams.get("txn");
  const gatewayParam = searchParams.get("gateway");

  const {
    cart,
    clearCart,
    selectedZone,
    setSelectedZone,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    addUpsellToCart
  } = useEverestStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [showTaxInvoice, setShowTaxInvoice] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [warrantyCode, setWarrantyCode] = useState("");
  const [placedInvoiceData, setPlacedInvoiceData] = useState<InvoiceData | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<
    "COD_PARTIAL_ADVANCE" | "ESEWA" | "KHALTI" | "CONNECTIPS"
  >("COD_PARTIAL_ADVANCE");

  // eSewa & Khalti simulation states
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [onlineTxnCode, setOnlineTxnCode] = useState(txnCodeParam || "");
  const [fonepayUtrInput, setFonepayUtrInput] = useState("");

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    secondaryPhone: "",
    email: "",
    province: "Bagmati Province (Province 3 - Kathmandu Valley)",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    wardNo: "4",
    tole: "Baneshwor",
    landmark: "Near Apex College / Shankhamul Bridge",
    accessNotes: "Ground floor entry, 38-inch door clearance available",
  });

  // Calculate cart metrics
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWeightKg = cart.reduce((acc, item) => acc + item.weightKg * item.quantity, 0);
  const subtotalNpr = cart.reduce((acc, item) => acc + item.unitPriceNpr * item.quantity, 0);

  // Promo discount
  let discountAmountNpr = 0;
  if (appliedPromo) {
    if (appliedPromo.type === "PERCENT") {
      discountAmountNpr = Math.round((subtotalNpr * appliedPromo.value) / 100);
    } else {
      discountAmountNpr = appliedPromo.value;
    }
  }

  // Heavy freight calculation
  const baseFreight = selectedZone ? selectedZone.heavyFreightChargeNpr : 750;
  const freightTotalNpr = totalItems > 0 ? baseFreight + (totalItems - 1) * Math.round(baseFreight * 0.5) : 0;
  const grandTotalNpr = Math.max(0, subtotalNpr - discountAmountNpr + freightTotalNpr);
  const advanceRequiredNpr = Math.round(grandTotalNpr * 0.2); // 20% advance
  const codBalanceNpr = grandTotalNpr - advanceRequiredNpr;

  // Handle auto-confirmation from gateway redirect
  useEffect(() => {
    if (paymentQueryStatus === "success" && !orderPlaced) {
      const generatedOrder = `ESF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const generatedInv = `INV-2026-${Math.floor(2000 + Math.random() * 8000)}`;
      const generatedWrty = `WRTY-2026-ESF-${Math.floor(3000 + Math.random() * 7000)}`;

      setOrderNumber(generatedOrder);
      setInvoiceNumber(generatedInv);
      setWarrantyCode(generatedWrty);

      const invData: InvoiceData = {
        orderNumber: generatedOrder,
        invoiceNumber: generatedInv,
        warrantyCode: generatedWrty,
        orderDate: "2026-11-22",
        mitiBs: "2083-08-07 BS",
        customerName: customerInfo.name || "Valued Customer",
        customerPhone: customerInfo.phone || "+977-9801234567",
        customerSecondaryPhone: customerInfo.secondaryPhone,
        customerEmail: customerInfo.email,
        province: customerInfo.province,
        district: customerInfo.district,
        municipality: customerInfo.municipality,
        wardNo: customerInfo.wardNo,
        tole: customerInfo.tole,
        paymentMethod: (gatewayParam?.toUpperCase() || "ONLINE_GATEWAY") + ` (Txn: ${txnCodeParam || "VERIFIED"})`,
        paymentStatus: "PAID_FULL",
        items: [...cart],
        subtotalNpr,
        discountNpr: discountAmountNpr,
        freightNpr: freightTotalNpr,
        totalNpr: grandTotalNpr,
        destinationCity: selectedZone.cityHub,
        dispatchDays: selectedZone.estimatedDispatchDays,
      };

      setPlacedInvoiceData(invData);
      setOrderPlaced(true);
      clearCart();
    }
  }, [paymentQueryStatus, txnCodeParam, gatewayParam]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput.trim());
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput("");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    const generatedOrder = `ESF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const generatedInv = `INV-2026-${Math.floor(2000 + Math.random() * 8000)}`;
    const generatedWrty = `WRTY-2026-ESF-${Math.floor(3000 + Math.random() * 7000)}`;

    setOrderNumber(generatedOrder);
    setInvoiceNumber(generatedInv);
    setWarrantyCode(generatedWrty);

    const paymentStatus = paymentMethod === "COD_PARTIAL_ADVANCE" ? "ADVANCE_PAID" : "PAID_FULL";

    const invData: InvoiceData = {
      orderNumber: generatedOrder,
      invoiceNumber: generatedInv,
      warrantyCode: generatedWrty,
      orderDate: "2026-11-22",
      mitiBs: "2083-08-07 BS",
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerSecondaryPhone: customerInfo.secondaryPhone,
      customerEmail: customerInfo.email,
      province: customerInfo.province,
      district: customerInfo.district,
      municipality: customerInfo.municipality,
      wardNo: customerInfo.wardNo,
      tole: customerInfo.tole,
      paymentMethod:
        paymentMethod === "COD_PARTIAL_ADVANCE"
          ? "Partial COD (20% Advance Paid, 80% on Delivery)"
          : paymentMethod === "ESEWA"
          ? `eSewa (Txn: ${onlineTxnCode || "ESEWA-" + Math.floor(100000 + Math.random() * 900000)})`
          : paymentMethod === "KHALTI"
          ? `Khalti v2 (PIDX: ${onlineTxnCode || "KHLT-" + Math.floor(100000 + Math.random() * 900000)})`
          : `Fonepay/connectIPS Direct QR (Ref: ${fonepayUtrInput || "FNP-" + Math.floor(100000 + Math.random() * 900000)})`,
      paymentStatus,
      advanceAmountNpr: paymentMethod === "COD_PARTIAL_ADVANCE" ? advanceRequiredNpr : undefined,
      remainingCodNpr: paymentMethod === "COD_PARTIAL_ADVANCE" ? codBalanceNpr : undefined,
      items: [...cart],
      subtotalNpr,
      discountNpr: discountAmountNpr,
      freightNpr: freightTotalNpr,
      totalNpr: grandTotalNpr,
      destinationCity: selectedZone.cityHub,
      dispatchDays: selectedZone.estimatedDispatchDays,
    };

    setPlacedInvoiceData(invData);
    setOrderPlaced(true);
    clearCart();
  };

  // Simulated gateway triggers
  const handleSimulateEsewa = async () => {
    setIsProcessingPayment(true);
    try {
      const res = await fetch("/api/payment/esewa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotalNpr,
          transactionUuid: `ESF-SIM-${Date.now()}`,
        }),
      });
      const data = await res.json();
      setTimeout(() => {
        setIsProcessingPayment(false);
        setOnlineTxnCode(`ESEWA-TXN-${Math.floor(100000 + Math.random() * 900000)}`);
      }, 1000);
    } catch {
      setIsProcessingPayment(false);
      setOnlineTxnCode(`ESEWA-TXN-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  };

  const handleSimulateKhalti = async () => {
    setIsProcessingPayment(true);
    try {
      const res = await fetch("/api/payment/khalti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountNpr: grandTotalNpr,
          purchaseOrderId: `ESF-KHLT-${Date.now()}`,
          purchaseOrderName: "Everest Steel Furniture Order",
          customerInfo: {
            name: customerInfo.name || "Customer",
            phone: customerInfo.phone || "9800000000",
          },
        }),
      });
      const data = await res.json();
      setTimeout(() => {
        setIsProcessingPayment(false);
        setOnlineTxnCode(data.pidx || `KHLT-PIDX-${Math.floor(100000 + Math.random() * 900000)}`);
      }, 1000);
    } catch {
      setIsProcessingPayment(false);
      setOnlineTxnCode(`KHLT-PIDX-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  };

  // If order is placed and user wants to view tax invoice
  if (orderPlaced && showTaxInvoice && placedInvoiceData) {
    return (
      <div className="bg-slate-900 py-10 px-4 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <TaxInvoiceView invoice={placedInvoiceData} onClose={() => setShowTaxInvoice(false)} />
        </div>
      </div>
    );
  }

  // ORDER CONFIRMATION SCREEN
  if (orderPlaced) {
    return (
      <div className="bg-slate-900 min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full bg-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-950/80 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/50">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-500 bg-amber-950/60 border border-amber-800 px-3 py-1 rounded-full">
              <span>Order Ref: {orderNumber}</span>
              <span>•</span>
              <span>Invoice: {invoiceNumber}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading mt-2">
              Factory Direct Order Confirmed!
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Namaste <span className="text-white font-semibold">{customerInfo.name || "Valued Customer"}</span>, your steel furniture has been logged at our Birgunj works. Our dispatch coordinator will contact you prior to highway loading.
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs text-left space-y-2.5">
            <div className="flex justify-between text-slate-300">
              <span>Destination Hub:</span>
              <span className="font-semibold text-white">{selectedZone.cityHub} ({customerInfo.province})</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Primary Phone:</span>
              <span className="font-mono text-white">{customerInfo.phone || "On File"}</span>
            </div>
            {customerInfo.secondaryPhone && (
              <div className="flex justify-between text-slate-300">
                <span>Driver Secondary Phone:</span>
                <span className="font-mono text-white">{customerInfo.secondaryPhone}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>Estimated Factory Dispatch:</span>
              <span className="text-amber-400 font-mono font-semibold">{selectedZone.estimatedDispatchDays}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Payment Mode:</span>
              <span className="font-semibold text-white">
                {paymentMethod === "COD_PARTIAL_ADVANCE"
                  ? "Partial COD (20% Advance Paid, 80% on Doorstep)"
                  : paymentMethod}
              </span>
            </div>

            {paymentMethod === "COD_PARTIAL_ADVANCE" && (
              <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-800/80 text-[11px] text-amber-300 space-y-1">
                <div className="flex justify-between">
                  <span>Advance Paid via Wallet/QR:</span>
                  <span className="font-mono font-bold">{formatNPR(advanceRequiredNpr)}</span>
                </div>
                <div className="flex justify-between font-bold text-white">
                  <span>Cash Due to Truck Crew on Delivery:</span>
                  <span className="font-mono text-amber-400">{formatNPR(codBalanceNpr)}</span>
                </div>
              </div>
            )}

            <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-bold text-white">
              <span>Grand Total Amount:</span>
              <span className="font-mono text-amber-400 text-base">{formatNPR(grandTotalNpr)}</span>
            </div>
          </div>

          {/* Warranty Badge */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Official 5-Year Rust & Lock Warranty Code: <strong className="font-mono text-white">{warrantyCode}</strong>
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setShowTaxInvoice(true)}
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>View & Print Tax Invoice (PDF)</span>
            </button>

            <a
              href={`https://wa.me/9779800000000?text=${encodeURIComponent(
                `Namaste Everest Steel Birgunj. I have placed Order ${orderNumber} for delivery to ${customerInfo.district}. Please confirm dispatch timing.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Dispatch Desk</span>
            </a>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Everest Steel Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART SCREEN
  if (cart.length === 0) {
    return (
      <div className="bg-slate-900 min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="text-center space-y-4 max-w-md">
          <ShoppingCart className="w-16 h-16 mx-auto text-slate-600 opacity-40" />
          <h2 className="text-2xl font-bold text-white font-heading">
            Your Steel Furniture Cart is Empty
          </h2>
          <p className="text-xs text-slate-400">
            Select a household almirah, office cabinet, or heavy-duty tijori safe from the catalog to calculate factory-direct freight and proceed with checkout.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse Everest Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <Link href="/products" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Furniture Catalog</span>
            </Link>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
              Factory Direct Door-to-Door Checkout
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Everest Steel Furniture Udyog (Est. 2039 BS, Birgunj) • Secure Heavy Freight Dispatch Across Nepal
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>5-Year Rust Warranty Included</span>
            </div>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: ADDRESS FORM & PAYMENT GATEWAY SELECTION */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Nepal Delivery Address Box */}
            <div className="bg-slate-950 p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-base text-white font-heading flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-500" />
                  <span>1. Delivery Destination & Contact (Nepal Localized)</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Step 1 of 2
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Customer Name */}
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-300 block mb-1">
                    Full Customer / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suman Adhikari / Narayani Trading"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Primary Mobile */}
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Primary Mobile (Order Confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+977-98XXXXXXXX"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Secondary Driver Contact Mobile */}
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Secondary Phone (For Truck Freight Driver) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+977-98XXXXXXXX"
                    value={customerInfo.secondaryPhone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, secondaryPhone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-300 block mb-1">
                    Email Address (For Tax Invoice & 5-Year Warranty PDF)
                  </label>
                  <input
                    type="email"
                    placeholder="suman.adhikari@gmail.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Province Selector */}
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Province *
                  </label>
                  <select
                    value={customerInfo.province}
                    onChange={(e) => {
                      const selectedProv = e.target.value;
                      setCustomerInfo({ ...customerInfo, province: selectedProv });
                      // Find corresponding shipping zone
                      const zone = SEED_SHIPPING_ZONES.find((z) =>
                        selectedProv.toLowerCase().includes(z.provinceName.toLowerCase()) ||
                        selectedProv.toLowerCase().includes(z.cityHub.toLowerCase())
                      );
                      if (zone) setSelectedZone(zone);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500 transition-colors"
                  >
                    {NEPAL_PROVINCES.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    District *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kathmandu, Lalitpur, Parsa, Chitwan, Kaski"
                    value={customerInfo.district}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomerInfo({ ...customerInfo, district: val });
                      // Update shipping zone if matches known district
                      const match = SEED_SHIPPING_ZONES.find(
                        (z) => z.cityHub.toLowerCase() === val.toLowerCase()
                      );
                      if (match) setSelectedZone(match);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Municipality & Ward */}
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Municipality / Rural Municipality *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kathmandu Metropolitan City"
                    value={customerInfo.municipality}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, municipality: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Ward No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ward 4 / Ward 10"
                    value={customerInfo.wardNo}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, wardNo: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Tole / Landmark */}
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Tole / Chowk / Road *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Baneshwor Chowk, Shantinagar Road"
                    value={customerInfo.tole}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, tole: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Nearest Landmark (For Delivery Truck)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Opposite Prabhu Bank / Near School"
                    value={customerInfo.landmark}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, landmark: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Access Instructions for Heavy Steel Furniture */}
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-300 block mb-1">
                    Floor & Staircase Access (Heavy Almirahs & Tijoris)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2nd floor, wide staircase, elevator available, ground floor"
                    value={customerInfo.accessNotes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, accessNotes: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500 transition-colors"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Our freight crew provides ground and 1st-floor room placement.
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Gateways Selector */}
            <div className="bg-slate-950 p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-base text-white font-heading flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span>2. Payment Option (Nepal Domestic Gateways)</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Step 2 of 2
                </span>
              </div>

              {/* 4 Gateway Options Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Option 1: Partial COD (Nepal Standard for Heavy Furniture) */}
                <div
                  onClick={() => setPaymentMethod("COD_PARTIAL_ADVANCE")}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === "COD_PARTIAL_ADVANCE"
                      ? "border-amber-500 bg-slate-900 shadow-lg ring-1 ring-amber-500/50"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-amber-400" />
                        <span>Partial COD (20% Advance)</span>
                      </span>
                      <input
                        type="radio"
                        checked={paymentMethod === "COD_PARTIAL_ADVANCE"}
                        onChange={() => setPaymentMethod("COD_PARTIAL_ADVANCE")}
                        className="accent-amber-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Pay 20% ({formatNPR(advanceRequiredNpr)}) advance for wooden crating & highway truck loading; remaining 80% ({formatNPR(codBalanceNpr)}) paid in cash upon delivery.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-amber-400 font-semibold font-mono">Recommended for Heavy Steel</span>
                    <span className="text-slate-500 font-mono">Zero Risk</span>
                  </div>
                </div>

                {/* Option 2: eSewa */}
                <div
                  onClick={() => setPaymentMethod("ESEWA")}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === "ESEWA"
                      ? "border-emerald-500 bg-slate-900 shadow-lg ring-1 ring-emerald-500/50"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span>eSewa Mobile Wallet</span>
                      </span>
                      <input
                        type="radio"
                        checked={paymentMethod === "ESEWA"}
                        onChange={() => setPaymentMethod("ESEWA")}
                        className="accent-emerald-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Instant 100% online payment via eSewa ePay v2. Verified with HMAC-SHA256 signature and instant dispatch clearance.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-mono">Official Merchant Gateway</span>
                    <span className="text-slate-500 font-mono">Instant Receipt</span>
                  </div>
                </div>

                {/* Option 3: Khalti */}
                <div
                  onClick={() => setPaymentMethod("KHALTI")}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === "KHALTI"
                      ? "border-purple-500 bg-slate-900 shadow-lg ring-1 ring-purple-500/50"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-purple-400 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                        <span>Khalti Digital Wallet</span>
                      </span>
                      <input
                        type="radio"
                        checked={paymentMethod === "KHALTI"}
                        onChange={() => setPaymentMethod("KHALTI")}
                        className="accent-purple-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Pay seamlessly using Khalti ePayment v2, linked Nepal bank accounts, SCT Debit Cards, or mobile banking apps.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-purple-400 font-mono">Khalti ePayment v2</span>
                    <span className="text-slate-500 font-mono">Secure Auth</span>
                  </div>
                </div>

                {/* Option 4: connectIPS / Fonepay QR */}
                <div
                  onClick={() => setPaymentMethod("CONNECTIPS")}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === "CONNECTIPS"
                      ? "border-blue-500 bg-slate-900 shadow-lg ring-1 ring-blue-500/50"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-blue-400 flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-blue-400" />
                        <span>Fonepay / connectIPS QR</span>
                      </span>
                      <input
                        type="radio"
                        checked={paymentMethod === "CONNECTIPS"}
                        onChange={() => setPaymentMethod("CONNECTIPS")}
                        className="accent-blue-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Scan merchant QR code using any Nepal bank mobile banking app (NIC Asia, Nabil, Global IME, Sanima, etc.) or connectIPS.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-blue-400 font-mono">Inter-Bank NCHL QR</span>
                    <span className="text-slate-500 font-mono">Any Bank App</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Payment Details / Interactive Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-3">
                {paymentMethod === "COD_PARTIAL_ADVANCE" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>Partial Cash On Delivery Schedule:</span>
                      <span className="text-amber-400 font-mono">20% Advance Booking</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Because heavy steel almirahs weigh between 65kg to 160kg, our factory in Birgunj prepares custom wooden crates. The 20% advance of <strong className="text-white font-mono">{formatNPR(advanceRequiredNpr)}</strong> reserves your unit and covers highway dispatch insurance.
                    </p>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300 text-[11px]">
                      <span>Remaining 80% ({formatNPR(codBalanceNpr)})</span>
                      <span className="text-emerald-400 font-semibold">Payable to truck driver after doorstep uncrating</span>
                    </div>
                  </div>
                )}

                {paymentMethod === "ESEWA" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span className="text-emerald-400">eSewa Merchant Gateway (HMAC-SHA256):</span>
                      <span className="text-slate-400 font-mono text-[10px]">Merchant: EVEREST_STEEL</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Your payment of <strong className="text-white font-mono">{formatNPR(grandTotalNpr)}</strong> will be verified via eSewa secure test gateway.
                    </p>
                    {onlineTxnCode ? (
                      <div className="bg-emerald-950/60 border border-emerald-500/50 p-2.5 rounded-lg text-emerald-300 font-mono flex items-center justify-between">
                        <span>Authorization Verified: {onlineTxnCode}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSimulateEsewa}
                        disabled={isProcessingPayment}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all"
                      >
                        {isProcessingPayment ? "Connecting to eSewa..." : "Authorize Test eSewa Payment"}
                      </button>
                    )}
                  </div>
                )}

                {paymentMethod === "KHALTI" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span className="text-purple-400">Khalti ePayment v2 Gateway:</span>
                      <span className="text-slate-400 font-mono text-[10px]">PIDX Engine</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Initiating Khalti v2 session for <strong className="text-white font-mono">{formatNPR(grandTotalNpr)}</strong>.
                    </p>
                    {onlineTxnCode ? (
                      <div className="bg-purple-950/60 border border-purple-500/50 p-2.5 rounded-lg text-purple-300 font-mono flex items-center justify-between">
                        <span>Khalti PIDX Verified: {onlineTxnCode}</span>
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSimulateKhalti}
                        disabled={isProcessingPayment}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all"
                      >
                        {isProcessingPayment ? "Initiating Khalti v2..." : "Authorize Test Khalti Payment"}
                      </button>
                    )}
                  </div>
                )}

                {paymentMethod === "CONNECTIPS" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span className="text-blue-400">Nepal Inter-Bank Dynamic Fonepay QR:</span>
                      <span className="text-slate-400 font-mono text-[10px]">NCHL connectIPS</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {/* Visual QR Code Generator */}
                      <div className="w-28 h-28 bg-white p-2 rounded-lg flex flex-col items-center justify-center shrink-0">
                        <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-white">
                          <div className="bg-slate-900 col-span-2 row-span-2 rounded-xs"></div>
                          <div className="bg-slate-900 col-span-2"></div>
                          <div className="bg-slate-900 col-span-2 row-span-2 rounded-xs"></div>
                          <div className="bg-slate-900 col-span-2"></div>
                          <div className="bg-slate-900 col-span-2"></div>
                          <div className="bg-slate-900 col-span-2"></div>
                          <div className="bg-slate-900 col-span-2 row-span-2 rounded-xs"></div>
                          <div className="bg-slate-900 col-span-2"></div>
                          <div className="bg-slate-900 col-span-2 row-span-2 rounded-xs"></div>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-300 space-y-1 text-center sm:text-left">
                        <div className="font-bold text-white">EVEREST STEEL FURNITURE UDYOG</div>
                        <div className="text-slate-400">Merchant PAN: <strong className="text-white font-mono">300189241</strong></div>
                        <div className="text-amber-400 font-mono font-bold">Amount: {formatNPR(grandTotalNpr)}</div>
                        <p className="text-[10px] text-slate-400 pt-1">
                          Scan using NIC Asia, Nabil, Global IME, Prabhu, or connectIPS app.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter 8-digit Bank UTR / Transaction Ref"
                        value={fonepayUtrInput}
                        onChange={(e) => setFonepayUtrInput(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono text-xs outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setFonepayUtrInput(`UTR-NCHL-${Math.floor(100000 + Math.random() * 900000)}`)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-2 rounded-lg text-xs transition-colors shrink-0"
                      >
                        Simulate Bank Scan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: ORDER SUMMARY, UPSELLS, PROMO CODE & SUBMISSION */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Order Summary Box */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-base text-white font-heading">
                  Order Summary ({totalItems} Units)
                </h3>
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  {totalWeightKg} kg Total Freight
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-800/80 max-h-64 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-12 h-14 bg-slate-900 rounded border border-slate-800 overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.productName} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">{item.productName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {item.variantSku} • Qty {item.quantity}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.colorName} • {item.dimensionsSummary} ({item.weightKg} kg)
                        </div>
                      </div>
                    </div>

                    <div className="font-mono font-bold text-amber-400 shrink-0 text-right">
                      <div>{formatNPR(item.unitPriceNpr * item.quantity)}</div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        ({formatNPR(item.unitPriceNpr)} ea)
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <div className="border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>Factory Voucher / Coupon</span>
                  </span>
                  {appliedPromo && (
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-[10px] text-red-400 hover:text-red-300 font-mono underline"
                    >
                      Remove ({appliedPromo.code})
                    </button>
                  )}
                </div>

                {!appliedPromo ? (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="EVEREST2039 or BIRGUNJDIRECT"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono text-xs uppercase outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-3 py-2 rounded-lg text-xs border border-slate-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <span className="text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{promoError}</span>
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="bg-amber-950/30 border border-amber-800/80 p-2 rounded-lg flex items-center justify-between text-xs">
                    <span className="text-amber-300 font-mono font-bold">
                      {appliedPromo.code} Applied ({appliedPromo.description})
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">
                      -{formatNPR(discountAmountNpr)}
                    </span>
                  </div>
                )}
              </div>

              {/* Line-item Financial Summary */}
              <div className="space-y-2 border-t border-slate-800 pt-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Gross Product Subtotal:</span>
                  <span className="font-mono text-white font-semibold">{formatNPR(subtotalNpr)}</span>
                </div>

                {discountAmountNpr > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Voucher Discount:</span>
                    <span className="font-mono font-semibold">-{formatNPR(discountAmountNpr)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <div>
                    <span>Heavy Freight ({selectedZone.cityHub}):</span>
                    <span className="block text-[10px] text-slate-400 font-mono">
                      Birgunj Highway Trunk • {selectedZone.estimatedDispatchDays}
                    </span>
                  </div>
                  <span className="font-mono text-amber-400 font-semibold">{formatNPR(freightTotalNpr)}</span>
                </div>

                <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-bold text-white">
                  <span>Grand Total (NPR):</span>
                  <span className="font-mono text-amber-400 text-xl">{formatNPR(grandTotalNpr)}</span>
                </div>

                {paymentMethod === "COD_PARTIAL_ADVANCE" && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1 mt-2">
                    <div className="flex justify-between text-amber-400 font-bold">
                      <span>20% Booking Advance:</span>
                      <span className="font-mono">{formatNPR(advanceRequiredNpr)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>80% Doorstep Balance:</span>
                      <span className="font-mono text-white font-semibold">{formatNPR(codBalanceNpr)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all border border-red-700/60 mt-4"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Confirm & Place Factory Direct Order</span>
              </button>

              {/* Trust Details */}
              <div className="text-[11px] text-slate-400 text-center space-y-1 pt-1 border-t border-slate-900">
                <p className="flex items-center justify-center gap-1.5 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NBSM Quality Standard • PAN/VAT 300189241</span>
                </p>
                <p className="text-slate-400">📞 Birgunj Dispatch Desk Hotline: 051-521940</p>
              </div>
            </div>

            {/* Quick Upsell Strip */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Recommended Factory Accessories
              </span>
              <div className="space-y-2">
                {AVAILABLE_UPSELLS.map((upsell: UpsellItem) => (
                  <div
                    key={upsell.id}
                    className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{upsell.name}</div>
                      <div className="text-[10px] text-slate-400">{upsell.description}</div>
                      <div className="font-mono text-amber-400 font-semibold mt-0.5">
                        +{formatNPR(upsell.priceNpr)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => addUpsellToCart(upsell)}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] border border-slate-700 transition-colors shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="bg-slate-900 min-h-screen text-white p-8">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
