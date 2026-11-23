"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Archive,
  Lock,
  Building,
  School,
  ArrowRight,
  Shield,
  FileSpreadsheet
} from "lucide-react";
import { SEED_PRODUCTS } from "@/data/seed-data";

interface SpaceCategory {
  id: string;
  categoryEnum: string;
  title: string;
  nepaliTitle: string;
  subtitle: string;
  image: string;
  features: string[];
  link: string;
}

export function CategoryGrid() {
  const getProductCount = (categoryEnum: string) => {
    return SEED_PRODUCTS.filter((p) => p.category === categoryEnum).length;
  };

  const CATEGORIES: SpaceCategory[] = [
    {
      id: "household",
      categoryEnum: "HOUSEHOLD_ALMIRAH",
      title: "Household Steel Almirahs",
      nepaliTitle: "घरायसी स्टिल दराज",
      subtitle: "Master Bedroom & Bridal Wardrobes",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop",
      features: ["Saint-Gobain Dressing Mirrors", "Dual Inner Security Vaults", "Secret Jewellery Trapdoor (चोर खण्ड)"],
      link: "/products?category=HOUSEHOLD_ALMIRAH"
    },
    {
      id: "office",
      categoryEnum: "OFFICE_ALMIRAH",
      title: "Office Document Almirahs",
      nepaliTitle: "सरकारी तथा कार्यालय दराज",
      subtitle: "Government, Legal & Corporate Records",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      features: ["4 Adjustable Heavy Shelves (65 kg UDL)", "3-Way Shoot Bolt Locking", "Scratch-Resistant Slate Grey"],
      link: "/products?category=OFFICE_ALMIRAH"
    },
    {
      id: "filing",
      categoryEnum: "FILING_CABINETS",
      title: "Heavy Filing Cabinets",
      nepaliTitle: "४ र ५ घर भएको फाइलिङ क्याबिनेट",
      subtitle: "High-Traffic Legal & Tax Suspension Files",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop",
      features: ["Anti-Tilt Central Safety Interlock", "Telescopic Ball-Bearing Slides", "Fits Legal & Foolscap Folders"],
      link: "/products?category=FILING_CABINETS"
    },
    {
      id: "tables",
      categoryEnum: "OFFICE_TABLES",
      title: "Executive Steel Desks",
      nepaliTitle: "एक्जिक्युटिभ अफिस टेबल",
      subtitle: "Director Suites & Administrative Workstations",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop",
      features: ["Twin-Pedestal Box Steel Frame", "Scratch-Proof Natural Teak Top", "Master Lock Utility Drawers"],
      link: "/products?category=OFFICE_TABLES"
    },
    {
      id: "safes",
      categoryEnum: "SAFES_TIJORI",
      title: "Heavy Tijori Safes & Vaults",
      nepaliTitle: "हेभी तिजोरी सेफ (१८०-२६० केजी)",
      subtitle: "Gold Jewellery, Cash & Land Deed Protection",
      image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop",
      features: ["Solid 28mm Hardened Shooting Bolts", "Multi-Bend Fire Retardant Body", "Automatic Mechanical Relocker"],
      link: "/products?category=SAFES_TIJORI"
    },
    {
      id: "institutional",
      categoryEnum: "INSTITUTIONAL",
      title: "Institutional & Hostel Furniture",
      nepaliTitle: "स्कूल, कलेज तथा होस्टेल फर्निचर",
      subtitle: "Campuses, Hospitals & Barrack Accommodations",
      image: "https://images.unsplash.com/photo-1540518614846-7ede433c4550?q=80&w=1200&auto=format&fit=crop",
      features: ["Heavy Structural Steel Bunk Beds", "Multi-Door Student Lockers", "Custom Tender & Bulk Pricing"],
      link: "/quote"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Engineered For Every Sector in Nepal</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight">
              Shop by Space & Manufacturing Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              From traditional bridal wardrobes to 260-kilogram bank safes, explore our Birgunj factory lineup.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline"
          >
            <span>View Complete Factory Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid (2x3 or 3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const count = getProductCount(cat.categoryEnum);
            return (
              <Link
                key={cat.id}
                href={cat.link}
                className="group relative bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-amber-500/70 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Stage */}
                <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-700 text-slate-200 text-[10px] font-mono px-2 py-0.5 rounded shadow backdrop-blur-sm">
                    {count > 0 ? `${count} Signature Models` : "Custom Order"}
                  </div>

                  {/* Subtitle tag */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded">
                      {cat.subtitle}
                    </span>
                    <h3 className="text-lg font-black text-white mt-1 font-heading group-hover:text-amber-400 transition-colors">
                      {cat.title}
                    </h3>
                    <div className="text-xs text-amber-500/80 font-medium">
                      {cat.nepaliTitle}
                    </div>
                  </div>
                </div>

                {/* Features & Action Footer */}
                <div className="p-4 space-y-3 bg-slate-950 flex-1 flex flex-col justify-between">
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {cat.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-amber-400">
                    <span>Explore Models & Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
