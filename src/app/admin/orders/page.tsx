"use client";

import React, { useState } from "react";
import {
  Truck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  RefreshCw,
  Phone,
  MapPin,
  CreditCard,
  Building2,
  Calendar,
  AlertCircle,
  FileText
} from "lucide-react";
import { formatNPR } from "@/lib/formatters";
import { INITIAL_ADMIN_ORDERS, AdminOrder, DispatchChallan } from "@/data/admin-mock-data";
import { updateOrderStatusAction } from "@/lib/actions/admin-actions";
import { GatePassModal } from "@/components/admin/GatePassModal";
import { WarrantyCardModal } from "@/components/admin/WarrantyCardModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Modal states
  const [activeGatePass, setActiveGatePass] = useState<DispatchChallan | null>(null);
  const [activeWarranty, setActiveWarranty] = useState<any>(null);

  const STATUS_PIPELINE = [
    { key: "PENDING_PAYMENT", label: "Pending Payment", step: 1 },
    { key: "CONFIRMED", label: "Confirmed", step: 2 },
    { key: "IN_FABRICATION", label: "In Fabrication", step: 3 },
    { key: "IN_QC_INSPECTION", label: "QC & Powder Bake", step: 4 },
    { key: "DISPATCHED_FROM_BIRGUNJ", label: "Dispatched from Birgunj", step: 5 },
    { key: "DELIVERED_INSTALLED", label: "Delivered & Installed", step: 6 },
  ];

  const handleUpdateStatus = async (orderId: string, newStatus: any) => {
    setIsUpdating(orderId);
    const res = await updateOrderStatusAction({
      orderId,
      newStatus,
      adminNotes: `Advanced to ${newStatus} by Dispatch Control.`,
    });

    if (res.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
    }
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

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.shippingCity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Birgunj Central Works • Logistics &amp; Challan Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Manufacturing &amp; Dispatch Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Stage orders through sheet metal fabrication, 7-tank hot phosphate bath, powder bake, highway gate pass, and room delivery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            Total Orders: <strong className="text-white">{orders.length}</strong>
          </span>
        </div>
      </div>

      {/* FILTER & SEARCH STRIP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search order ref, customer, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 outline-none focus:border-amber-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
          {["ALL", "CONFIRMED", "IN_FABRICATION", "IN_QC_INSPECTION", "DISPATCHED_FROM_BIRGUNJ", "DELIVERED_INSTALLED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg border transition-colors ${
                statusFilter === st
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
              }`}
            >
              {st === "ALL" ? "All Orders" : st.replace(/_/g, " ")}
            </button>
          ))}
        </div>

      </div>

      {/* ORDERS CARDS LIST */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const totalUnits = order.items.reduce((acc, i) => acc + i.quantity, 0);
          const totalWeight = order.items.reduce((acc, i) => acc + i.weightKg * i.quantity, 0);

          return (
            <div
              key={order.id}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              {/* Order Card Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-base text-amber-400">
                      {order.orderNumber}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="font-bold text-white text-sm">{order.customerName}</span>
                    <span className="text-xs font-mono text-slate-400">({order.customerPhone})</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>
                      {order.shippingAddress}, <strong>{order.shippingCity}</strong> ({order.province})
                    </span>
                  </div>
                </div>

                <div className="sm:text-right space-y-1 font-mono text-xs">
                  <div className="font-bold text-white text-base">
                    {formatNPR(order.totalNpr)}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {order.paymentMethod === "COD_PARTIAL_ADVANCE" ? (
                      <span className="text-amber-400">
                        Paid 20%: {formatNPR(order.advancePaidNpr)} • Due COD: {formatNPR(order.balanceDueNpr)}
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold">100% Fully Paid ({order.paymentMethod})</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Manufacturing Line Progress Bar */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Manufacturing &amp; Delivery Progress:</span>
                  <span className="font-bold text-amber-400 uppercase">
                    Current: {order.orderStatus.replace(/_/g, " ")}
                  </span>
                </div>

                {/* 5-Step Progress Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px] font-mono">
                  
                  {/* Step 1: Confirmed */}
                  <div
                    onClick={() => handleUpdateStatus(order.id, "CONFIRMED")}
                    className={`p-2 rounded-lg border cursor-pointer transition-all ${
                      order.orderStatus === "CONFIRMED"
                        ? "bg-blue-950/80 border-blue-500 text-blue-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    1. Order Confirmed
                  </div>

                  {/* Step 2: In Fabrication */}
                  <div
                    onClick={() => handleUpdateStatus(order.id, "IN_FABRICATION")}
                    className={`p-2 rounded-lg border cursor-pointer transition-all ${
                      order.orderStatus === "IN_FABRICATION"
                        ? "bg-amber-950/80 border-amber-500 text-amber-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    2. Fabrication Shop
                  </div>

                  {/* Step 3: 7-Tank QC & Powder Bake */}
                  <div
                    onClick={() => handleUpdateStatus(order.id, "IN_QC_INSPECTION")}
                    className={`p-2 rounded-lg border cursor-pointer transition-all ${
                      order.orderStatus === "IN_QC_INSPECTION"
                        ? "bg-purple-950/80 border-purple-500 text-purple-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    3. QC &amp; Powder Bake
                  </div>

                  {/* Step 4: Dispatched from Birgunj */}
                  <div
                    onClick={() => handleUpdateStatus(order.id, "DISPATCHED_FROM_BIRGUNJ")}
                    className={`p-2 rounded-lg border cursor-pointer transition-all ${
                      order.orderStatus === "DISPATCHED_FROM_BIRGUNJ"
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    4. Highway Dispatch
                  </div>

                  {/* Step 5: Delivered & Installed */}
                  <div
                    onClick={() => handleUpdateStatus(order.id, "DELIVERED_INSTALLED")}
                    className={`p-2 rounded-lg border cursor-pointer transition-all ${
                      order.orderStatus === "DELIVERED_INSTALLED"
                        ? "bg-emerald-600 text-slate-950 font-bold shadow-md"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    5. Delivered &amp; Installed
                  </div>

                </div>
              </div>

              {/* Items List */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-mono text-[10px] uppercase text-slate-500 font-bold">
                  Ordered Units ({totalUnits} pcs • {totalWeight} kg Total Mass):
                </div>

                <div className="divide-y divide-slate-800/80">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white">{item.quantity}x {item.productName}</span>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Color: <strong className="text-slate-300">{item.colorName}</strong> • {item.dimensionsSummary} ({item.weightKg} kg ea)
                        </div>
                      </div>
                      <div className="font-mono font-bold text-amber-400">
                        {formatNPR(item.totalPriceNpr)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Placed: {order.orderDate} ({order.mitiBs})</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Gate Pass Button */}
                  <button
                    onClick={() => handleOpenGatePass(order)}
                    className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3.5 py-2 rounded-xl text-xs border border-slate-700 transition-colors shadow-sm"
                  >
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>Issue Dispatch Challan / Gate Pass</span>
                  </button>

                  {/* Warranty Certificate Button */}
                  <button
                    onClick={() => handleOpenWarranty(order)}
                    className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs transition-colors shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Print 5-Year Warranty Card</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
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
