import { Suspense } from "react";
import { ProductCatalogView } from "./ProductCatalogView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Everest Steel Furniture Catalog | Birgunj Factory-Direct Almirahs, Desks & Safes",
  description:
    "Explore the authentic Everest Steel Furniture catalog. Compare 20-gauge Tata CRCA steel wardrobes, 7-tank hot phosphate anti-rust coating, anti-tilt filing cabinets, and tijori safes with heavy freight dispatch to all 7 provinces of Nepal.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-slate-900 min-h-screen flex items-center justify-center text-slate-400 text-sm">
          Loading Everest Steel Factory Catalog...
        </div>
      }
    >
      <ProductCatalogView />
    </Suspense>
  );
}
