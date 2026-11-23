"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Truck,
  Building2,
  AlertTriangle,
  Boxes,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Plus,
  RefreshCw,
  MapPin,
  Flame,
  Award
} from "lucide-react";
import { formatNPR } from "@/lib/formatters";
import {
  INITIAL_ADMIN_ORDERS,
  INITIAL_ADMIN_B2B_QUOTES,
  FACTORY_PRODUCTION_THROUGHPUT,
  HIGHWAY_DISPATCH_FEED,
  AdminOrder,
} from "@/data/admin-mock-data";
import { SEED_PRODUCTS } from "@/data/seed-data";
import { MonthlyRevenueChart, CategorySalesChart } from "@/components/admin/AdminCharts";
import { GatePassModal } from "@/components/admin/GatePassModal";
import { WarrantyCardModal } from "@/components/admin/WarrantyCardModal";
import { updateOrderStatusAction } from "@/lib/actions/admin-actions";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS);
  const [activeGatePass, setActiveGatePass] = useState<any>(null);
  const [activeWarranty, setActiveWarranty] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Calculations
  const totalRevenueNpr = 14850000;
  const pendingDispatchesCount = orders.filter(
    (o) => o.orderStatus === "IN_FABRICATION" || o.orderStatus === "IN_QC_INSPECTION" || o.orderStatus === "CONFIRMED"
  ).length + 9;
  const activeRfqsCount = INITIAL_ADMIN_B2B_QUOTES.filter((q) => q.status === "NEW" || q.status === "UNDER_REVIEW").length + 5;

  // Find low stock variants (< 5 units)
  const lowStockVariants: { product: string; sku: string; color: string; stock: number; price: number }[] = [];
  SEED_PRODUCTS.forEach((p) => {
    p.variants.forEach((v) => {
      if (v.stockQty < 8) {
        lowStockVariants.push({
          product: p.name,
          sku: v.sku,
          color: v.colorName,
          stock: v.stockQty,
          price: v.sellingPriceNpr,
        });
      }
    });
  });

  const handleAdvanceStatus = async (orderId: string, currentStatus: string) => {
    setIsUpdating(orderId);
    let nextStatus: any = "CONFIRMED";
    if (currentStatus === "CONFIRMED") nextStatus = "IN_FABRICATION";
    else if (currentStatus === "IN_FABRICATION") nextStatus = "IN_QC_INSPECTION";
    else if (currentStatus === "IN_QC_INSPECTION") nextStatus = "DISPATCHED_FROM_BIRGUNJ";
    else if (currentStatus === "DISPATCHED_FROM_BIRGUNJ") nextStatus = "DELIVERED_INSTALLED";

    await updateOrderStatusAction({
      orderId,
      newStatus: nextStatus,
      adminNotes: "Status advanced from Operations Executive Overview.",
    });

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: nextStatus } : o))
    );
    setIsUpdating(null);
  };

  const handleOpenGatePass = (order: AdminOrder) => {
    setActiveGatePass({
      challanNumber: order.challanNumber || `CH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      orderNumber: order.orderNumber,
      driverName: "Ram Chandra Yadav",
      driverPhone: "+977-9855029104",
      vehicleNo: "Na 5 Kha 8941",
      driverLicenseNo: "DL-01-2081-39482",
      crateCount: order.items.reduce((acc, i) => acc + i.quantity, 0),
      totalWeightKg: order.items.reduce((acc, i) => acc + i.weightKg * i.quantity, 0),
      dispatchDateTime: new Date().toISOString(),
      destinationHub: order.shippingCity,
      consigneeName: order.customerName,
      consigneePhone: order.customerPhone,
      securityOfficerName: "Inspector B. K. Sah",
      factorySealNumber: `SEAL-ESF-${Math.floor(10000 + Math.random() * 90000)}`,
    });
  };

  const handleOpenWarranty = (order: AdminOrder) => {
    const item = order.items[0];
    setActiveWarranty({
      warrantyCode: order.warrantyCode || `WRTY-2026-ESF-${Math.floor(1000 + Math.random() * 9000)}`,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      productName: item ? item.productName : "Everest Steel Furniture",
      variantSku: item ? item.variantSku : "ESF-GEN-78",
    });
  };

  return (
    <div className="space-y-8">
      
      {/* EXECUTIVE GREETING & PLANT PULSE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-500 bg-amber-950/80 border border-amber-800 px-3 py-0.5 rounded-full uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Birgunj Central Works • Real-Time Plant Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Executive Operations Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Welcome, <strong className="text-white">Er. Rajesh Agrawal</strong>. All 7 pre-treatment chemical tanks running at optimal phosphate density.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition-all border border-red-700/60"
          >
            <Boxes className="w-4 h-4 text-amber-400" />
            <span>Manage Product Matrix</span>
          </Link>

          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-700 transition-colors"
          >
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Dispatch Challan Desk</span>
          </Link>
        </div>
      </div>

      {/* 4 CORE EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Revenue */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Fiscal Month Revenue</span>
            <div className="p-2 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/80">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {formatNPR(totalRevenueNpr)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <span>↑ +18.4%</span>
            <span className="text-slate-500 font-sans">vs Ashadh post-monsoon</span>
          </div>
        </div>

        {/* KPI 2: Pending Factory Dispatches */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Pending Highway Dispatches</span>
            <div className="p-2 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/80">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">
            {pendingDispatchesCount} Units
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span>14 Crated in Yard</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400">Night Freight</span>
          </div>
        </div>

        {/* KPI 3: Active B2B RFQs */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Active Institutional RFQs</span>
            <div className="p-2 rounded-xl bg-red-950/60 text-red-400 border border-red-800/80">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {activeRfqsCount} Quotes
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span className="text-emerald-400 font-bold">NPR 19.8L</span>
            <span className="text-slate-500">Tender Pipeline</span>
          </div>
        </div>

        {/* KPI 4: Low-Stock Alerts */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Low-Stock Variant Alerts</span>
            <div className="p-2 rounded-xl bg-amber-950/60 text-amber-500 border border-amber-800/80">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-red-400">
            {lowStockVariants.length} SKUs &lt; 8 Qty
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span>Maroon Sansaar &amp; Tijoris</span>
          </div>
        </div>

      </div>

      {/* CHARTS ROW: MONTHLY REVENUE & CATEGORY BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recharts Monthly Revenue Trend (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-base text-white font-heading">
                Factory Manufacturing & Revenue Velocity (2083 BS)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Monthly revenue generated in Lakhs NPR across D2C retail and B2B institutional tenders
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-400">
                Peak: Ashwin (Dashain)
              </span>
            </div>
          </div>

          <MonthlyRevenueChart />
        </div>

        {/* Right: Category Distribution & Market Share (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-white font-heading">
              Category Revenue Share
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Household vs Office vs Heavy Safes
            </p>
          </div>

          <CategorySalesChart />
        </div>

      </div>

      {/* FACTORY FLOOR THROUGHPUT STRIP */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="font-bold text-base text-white font-heading">
                Birgunj Plant Fabrication & Pre-Treatment Line Stages
              </h3>
              <p className="text-xs text-slate-400">
                Live batch throughput from Tata CRCA cold-rolled coil feeding to final inspection
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
            91% Overall Plant OEE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {FACTORY_PRODUCTION_THROUGHPUT.map((stage, idx) => (
            <div key={stage.stage} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                <span>Stage 0{idx + 1}</span>
                <span className="text-amber-400 font-bold">{stage.capacityPercent}% Cap</span>
              </div>
              <div className="font-bold text-white text-xs">{stage.stage}</div>
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-300">
                <span>Active:</span>
                <strong className="text-amber-400">{stage.activeUnits} Units</strong>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full"
                  style={{ width: `${stage.capacityPercent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT ORDERS & HIGHWAY LOGISTICS TICKER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Recent Manufacturing Pipeline Orders */}
        <div className="lg:col-span-8 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-base text-white font-heading">
                Recent Order & Fabrication Queue
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage order state, issue Gate Pass challan, or generate customer warranty certificate
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1"
            >
              <span>View All 5 Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="py-3.5 first:pt-0 last:pb-0 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{order.orderNumber}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-white">{order.customerName}</span>
                    <span className="text-[10px] font-mono text-slate-500">({order.shippingCity})</span>
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                      order.orderStatus === "CONFIRMED"
                        ? "bg-blue-950/80 text-blue-400 border-blue-800"
                        : order.orderStatus === "IN_FABRICATION"
                        ? "bg-amber-950/80 text-amber-400 border-amber-800"
                        : order.orderStatus === "IN_QC_INSPECTION"
                        ? "bg-purple-950/80 text-purple-400 border-purple-800"
                        : order.orderStatus === "DISPATCHED_FROM_BIRGUNJ"
                        ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {order.orderStatus.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-400 text-[11px]">
                  <div className="truncate max-w-md">
                    {order.items.map((i) => `${i.quantity}x ${i.productName} (${i.colorName})`).join(", ")}
                  </div>
                  <div className="font-mono font-bold text-white">
                    {formatNPR(order.totalNpr)} ({order.paymentMethod})
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => handleAdvanceStatus(order.id, order.orderStatus)}
                    disabled={isUpdating === order.id || order.orderStatus === "DELIVERED_INSTALLED"}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-colors flex items-center gap-1 disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3 h-3 ${isUpdating === order.id ? "animate-spin" : ""}`} />
                    <span>Advance Status</span>
                  </button>

                  <button
                    onClick={() => handleOpenGatePass(order)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
                  >
                    <Truck className="w-3 h-3 text-emerald-400" />
                    <span>Print Gate Pass</span>
                  </button>

                  <button
                    onClick={() => handleOpenWarranty(order)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>Warranty Card</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 Cols: Live Highway Dispatch Ticker */}
        <div className="lg:col-span-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-white font-heading flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Live Highway Transit Ticker</span>
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="space-y-3">
            {HIGHWAY_DISPATCH_FEED.map((feed) => (
              <div key={feed.truckNo} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-white">{feed.truckNo}</span>
                  <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                    {feed.status.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Driver: <strong className="text-white">{feed.driver}</strong> • To: {feed.destination}
                </div>
                <div className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{feed.currentLocation}</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Cargo: {feed.cargo}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODALS */}
      {activeGatePass && (
        <GatePassModal challan={activeGatePass} onClose={() => setActiveGatePass(null)} />
      )}

      {activeWarranty && (
        <WarrantyCardModal
          warrantyCode={activeWarranty.warrantyCode}
          orderNumber={activeWarranty.orderNumber}
          customerName={activeWarranty.customerName}
          productName={activeWarranty.productName}
          variantSku={activeWarranty.variantSku}
          onClose={() => setActiveWarranty(null)}
        />
      )}

    </div>
  );
}
