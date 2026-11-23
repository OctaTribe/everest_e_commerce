"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  Truck,
  Building2,
  FileSpreadsheet,
  ArrowLeft,
  ShieldCheck,
  Factory,
  Flame,
  Gauge,
  Phone,
  LogOut,
  ChevronRight,
  Menu,
  X,
  UserCheck
} from "lucide-react";
import { DEFAULT_ADMIN_USER, UserRole } from "@/lib/auth/admin-auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole>("ADMIN");

  const NAV_ITEMS = [
    {
      name: "Executive Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: "Live",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      name: "Product & Variant Matrix",
      href: "/admin/products",
      icon: Boxes,
      badge: "6 Models",
      badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
    },
    {
      name: "Order & Dispatch Pipeline",
      href: "/admin/orders",
      icon: Truck,
      badge: "5 Active",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
    {
      name: "B2B RFQ & Dealer CRM",
      href: "/admin/b2b",
      icon: Building2,
      badge: "3 Pending",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* TOP FACTORY OPERATIONAL STATUS BAR */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-900 border border-amber-500 flex flex-col items-center justify-center font-black text-white text-[10px]">
              <span>2039</span>
              <span className="text-[6px] text-amber-400">BS</span>
            </div>
            <div>
              <div className="font-heading font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                <span>EVEREST STEEL</span>
                <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-800">
                  FACTORY ADMIN
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Birgunj Industrial Works • Operations Dashboard
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Live Plant Line Metrics (Desktop) */}
        <div className="hidden lg:flex items-center gap-5 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Plant Shift 1 (06:00 - 14:00)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>7-Tank Phosphating: 65°C</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Gauge className="w-3.5 h-3.5 text-blue-400" />
            <span>Powder Oven: 200°C</span>
          </div>
        </div>

        {/* Right: Role Switcher & Storefront Link */}
        <div className="flex items-center gap-3">
          
          {/* Role Indicator / Switcher for dev demo */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-[11px]">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Role:</span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              className="bg-transparent text-amber-400 font-bold font-mono outline-none cursor-pointer"
            >
              <option value="ADMIN" className="bg-slate-900 text-white">ADMIN (Plant Director)</option>
              <option value="DEALER" className="bg-slate-900 text-white">DEALER (Wholesale)</option>
              <option value="CUSTOMER" className="bg-slate-900 text-white">CUSTOMER (Retail)</option>
            </select>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Storefront</span>
          </Link>
        </div>

      </header>

      {/* MAIN CONTAINER: SIDEBAR + CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col justify-between p-4 shrink-0">
          <div className="space-y-6">
            
            {/* Division Badge */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Logged In Operator</div>
              <div className="font-bold text-white mt-0.5">{DEFAULT_ADMIN_USER.name}</div>
              <div className="text-[11px] text-amber-400 font-mono">{DEFAULT_ADMIN_USER.designation}</div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-slate-500 font-bold px-2 mb-2">
                Factory Management
              </div>

              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-amber-600/10 text-amber-400 border border-amber-600/30 shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Gate Pass Shortcut */}
            <div className="bg-gradient-to-br from-red-950/60 to-slate-950 p-3.5 rounded-xl border border-red-900/40 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Highway Gate Pass Desk</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Issue Birgunj security seal challan for outgoing freight trucks along East-West Highway.
              </p>
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-bold hover:underline"
              >
                <span>Open Dispatch Pipeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Plant Hotline */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono space-y-1">
            <div>Birgunj Central: 051-521940</div>
            <div>Security Desk: Gate #2 Ext 104</div>
          </div>
        </aside>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden flex">
            <div className="w-72 bg-slate-900 p-5 flex flex-col justify-between border-r border-slate-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-heading font-black text-sm text-white">OPERATIONS MENU</span>
                  <button onClick={() => setMobileNavOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Exit to Storefront</span>
                </Link>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileNavOpen(false)}></div>
          </div>
        )}

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          {children}
        </main>

      </div>

    </div>
  );
}
