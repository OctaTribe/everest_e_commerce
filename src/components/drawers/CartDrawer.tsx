"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShoppingCart,
  Trash2,
  Truck,
  ShieldCheck,
  ArrowRight,
  Info,
  CreditCard,
  Building,
  CheckCircle2,
  Tag,
  Plus,
  Sparkles
} from "lucide-react";
import { useEverestStore, AVAILABLE_UPSELLS } from "@/store/useStore";
import { SEED_SHIPPING_ZONES } from "@/data/seed-data";
import { formatNPR } from "@/lib/formatters";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    selectedZone,
    setSelectedZone,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    addUpsellToCart
  } = useEverestStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWeightKg = cart.reduce((acc, item) => acc + item.weightKg * item.quantity, 0);
  const subtotalNpr = cart.reduce((acc, item) => acc + item.unitPriceNpr * item.quantity, 0);

  // Freight calculation
  const baseFreight = selectedZone ? selectedZone.heavyFreightChargeNpr : 500;
  let freightTotalNpr = totalItems > 0 ? baseFreight + (totalItems - 1) * (baseFreight * 0.6) : 0;

  // Promo calculation
  let discountNpr = 0;
  if (appliedPromo) {
    if (appliedPromo.type === "PERCENT") {
      discountNpr = Math.round(subtotalNpr * appliedPromo.value);
    } else if (appliedPromo.type === "FIXED_DISCOUNT") {
      discountNpr = Math.min(appliedPromo.value, subtotalNpr);
    } else if (appliedPromo.type === "FREIGHT_DISCOUNT") {
      freightTotalNpr = Math.max(0, freightTotalNpr - appliedPromo.value);
      discountNpr = appliedPromo.value;
    }
  }

  const grandTotalNpr = Math.max(0, subtotalNpr - (appliedPromo?.type === "FREIGHT_DISCOUNT" ? 0 : discountNpr) + freightTotalNpr);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-red-950 border border-red-800 text-red-400 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white font-heading">
                  Factory Freight Cart
                </h3>
                <p className="text-xs text-slate-400">
                  {totalItems} {totalItems === 1 ? "unit" : "units"} • {totalWeightKg} kg total steel
                </p>
              </div>
            </div>

            <button
              onClick={() => setCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <ShoppingCart className="w-12 h-12 mx-auto text-slate-600 opacity-40" />
                <p className="text-sm font-semibold">Your steel furniture cart is empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our authentic almirahs, filing cabinets, and tijori safes built at the Birgunj plant.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-20 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <div
                      className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-slate-900 shadow-sm"
                      style={{ backgroundColor: item.colorHex }}
                      title={item.colorName}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="text-sm font-bold text-white truncate font-heading">
                      {item.productName}
                    </h4>

                    {/* Formatted Variant Specs */}
                    <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-amber-400 font-mono">
                      <span>{item.variantSku}</span>
                      <span>•</span>
                      <span className="text-slate-300">{item.colorName}</span>
                    </div>

                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {item.dimensionsSummary} ({item.weightKg} kg)
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-mono font-bold text-white text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-amber-400">
                          {formatNPR(item.unitPriceNpr * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2.5 right-2.5 text-slate-500 hover:text-red-400 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}

            {/* UPSELL CROSS-SELL STRIP (e.g. Brass Padlock, Monsoon Camphor Kit) */}
            {cart.length > 0 && (
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-amber-600/40 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recommended Factory Accessories:</span>
                </div>

                <div className="space-y-2">
                  {AVAILABLE_UPSELLS.map((upsell) => {
                    const alreadyInCart = cart.some((c) => c.productId === upsell.id);
                    return (
                      <div
                        key={upsell.id}
                        className="flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate">{upsell.name}</div>
                          <div className="text-[10px] text-amber-400 font-mono">+{formatNPR(upsell.priceNpr)}</div>
                        </div>

                        <button
                          onClick={() => addUpsellToCart(upsell)}
                          disabled={alreadyInCart}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                            alreadyInCart
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                          }`}
                        >
                          {alreadyInCart ? "Added" : "+ Add"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PROMO CODE INPUT */}
            {cart.length > 0 && (
              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>Apply Factory Promo Code:</span>
                  </span>
                  {appliedPromo && (
                    <button
                      onClick={removePromoCode}
                      className="text-[10px] text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {appliedPromo ? (
                  <div className="p-2 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold">{appliedPromo.code}</span>
                      <span className="text-[10px] block text-emerald-400">{appliedPromo.description}</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400">-{formatNPR(discountNpr)}</span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. EVEREST2039 or BIRGUNJDIRECT"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white uppercase font-mono outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <div className={`text-[10px] ${promoMessage.isError ? "text-red-400" : "text-emerald-400"}`}>
                    {promoMessage.text}
                  </div>
                )}
              </div>
            )}

            {/* Nepal Shipping Zone Selection Box */}
            {cart.length > 0 && (
              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Heavy Freight Shipping Hub:</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">From Birgunj</span>
                </div>

                <select
                  value={selectedZone.cityHub}
                  onChange={(e) => {
                    const found = SEED_SHIPPING_ZONES.find((z) => z.cityHub === e.target.value);
                    if (found) setSelectedZone(found);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-200 outline-none focus:border-amber-500 font-sans"
                >
                  {SEED_SHIPPING_ZONES.map((zone) => (
                    <option key={zone.cityHub} value={zone.cityHub}>
                      {zone.cityHub} ({zone.provinceName}) — {formatNPR(zone.heavyFreightChargeNpr)}
                    </option>
                  ))}
                </select>

                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Dispatch Timeline:</span>
                  <span className="text-amber-400 font-mono font-bold text-[10px]">
                    {selectedZone.estimatedDispatchDays}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 space-y-3.5">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items):</span>
                  <span className="font-mono text-white font-semibold">{formatNPR(subtotalNpr)}</span>
                </div>

                {discountNpr > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Savings:</span>
                    <span className="font-mono font-semibold">- {formatNPR(discountNpr)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Heavy Highway Freight ({totalWeightKg} kg):</span>
                  <span className="font-mono text-amber-400 font-semibold">{formatNPR(freightTotalNpr)}</span>
                </div>

                <div className="border-t border-slate-800 pt-2 flex justify-between text-sm sm:text-base font-bold text-white">
                  <span>Total Payable (NPR):</span>
                  <span className="font-mono text-amber-400 text-lg">{formatNPR(grandTotalNpr)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all border border-red-700/60"
              >
                <span>Proceed to Nepal Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
