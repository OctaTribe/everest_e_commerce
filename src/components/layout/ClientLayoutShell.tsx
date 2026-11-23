"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TrustBar } from "@/components/layout/TrustBar";
import { MegaMenuHeader } from "@/components/layout/MegaMenuHeader";
import { Footer } from "@/components/layout/Footer";
import { InstantSearchModal } from "@/components/modals/InstantSearchModal";
import { QuickViewModal } from "@/components/modals/QuickViewModal";
import { CartDrawer } from "@/components/drawers/CartDrawer";
import { ComparisonDrawer } from "@/components/drawers/ComparisonDrawer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";

export function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <TrustBar />
      <MegaMenuHeader />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Global Interactive Overlays & Sticky Omnichannel Widget */}
      {mounted && (
        <>
          <InstantSearchModal />
          <QuickViewModal />
          <CartDrawer />
          <ComparisonDrawer />
          <WhatsAppWidget />
        </>
      )}
    </div>
  );
}
