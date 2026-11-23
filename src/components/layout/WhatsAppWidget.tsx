"use client";

import React, { useState } from "react";
import { MessageSquare, X, Phone, CheckCircle2, Factory, Sparkles, Send } from "lucide-react";
import { usePathname } from "next/navigation";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isProductPage = pathname?.startsWith("/products/");
  const productName = isProductPage
    ? pathname.replace("/products/", "").replace(/-/g, " ").toUpperCase()
    : "Everest Steel Furniture Lineup";

  const defaultMessage = isProductPage
    ? `Namaste Everest Steel Birgunj! I am currently viewing ${productName} on your website. I have questions regarding delivery timeline, color finish availability, and factory pricing.`
    : `Namaste Everest Steel Birgunj! I am browsing your online factory store and would like to inquire about household almirahs and delivery to my city.`;

  const [message, setMessage] = useState(defaultMessage);

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/9779855021000?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-slate-900 border-2 border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-950 via-red-900 to-slate-900 p-4 border-b border-red-800/60 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow">
                <span>💬</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight font-heading">
                  Birgunj Factory Helpdesk
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-mono">
                  <span>● Online</span>
                  <span>•</span>
                  <span>Factory Direct Dispatch</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-slate-950/90 text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300 leading-relaxed text-[11px] space-y-1.5">
              <p className="font-semibold text-white flex items-center gap-1">
                <Factory className="w-3.5 h-3.5 text-amber-500" />
                <span>Everest Steel Furniture Udyog (Est. 2039 BS)</span>
              </p>
              <p className="text-slate-400">
                Talk directly with our Birgunj production engineers for custom steel gauges, lock master keys, bulk institutional discounts, or freight schedules.
              </p>
            </div>

            {/* Editable pre-filled message */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Your Inquiry Message:
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 text-xs outline-none focus:border-emerald-500 resize-none font-sans"
              />
            </div>

            {/* Direct hotline reminder */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
              <a
                href="tel:+97751521940"
                className="hover:text-amber-400 flex items-center gap-1 font-mono"
              >
                <Phone className="w-3 h-3 text-amber-500" />
                <span>Call Factory: 051-521940</span>
              </a>
              <span className="text-[10px] text-slate-500">Sun-Fri 8am-6pm</span>
            </div>

            {/* Send WhatsApp Button */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Trigger Floating Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl border-2 border-emerald-400/50 hover:scale-105 transition-all"
        title="Talk to Birgunj Factory Expert on WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
        </div>

        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-medium text-emerald-100 flex items-center gap-1">
            <span>Talk to Birgunj Factory Expert</span>
          </span>
          <span className="text-xs font-black tracking-wide">WhatsApp Desk</span>
        </div>
      </button>
    </div>
  );
}
