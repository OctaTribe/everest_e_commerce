import React from "react";
import Link from "next/link";
import {
  Factory,
  ShieldCheck,
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  ArrowRight,
  Building
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm">
      {/* Upper Trust Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-red-950/80 border border-red-800/80 rounded-lg text-amber-500 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">40+ Years Heritage</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Pioneering steel manufacturing in Birgunj since 2039 BS (1983 AD).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">7-Tank Hot Chemical Bath</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Full anti-rust immersion treatment guaranteed against corrosion.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-amber-400 shrink-0">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Factory-Direct Pricing</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Eliminate middlemen margins. Delivered straight from Birgunj workshops.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Provinces 1 to 7 Logistics</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Heavy freight freight service with wooden crate safety packaging.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-900 border-2 border-amber-500 rounded flex flex-col items-center justify-center font-black text-white text-xs">
              <span>2039</span>
              <span className="text-[8px] text-amber-400">BS</span>
            </div>
            <div>
              <span className="font-black text-lg text-white font-heading tracking-tight">
                EVEREST STEEL
              </span>
              <span className="text-xs block text-slate-400 font-medium">
                FURNITURE UDYOG • BIRGUNJ, NEPAL
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed pr-6">
            Everest Steel Furniture Udyog is Nepal&apos;s benchmark manufacturer of heavy household wardrobes,
            high-security tijori safes, heavy-duty filing systems, and executive corporate furniture. Engineered
            with prime CRCA steel sheet, multi-lever unpickable locks, and baked powder coating.
          </p>

          <div className="text-xs text-slate-400 space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Plant: Birgunj Industrial Area (BIE), Parsa, Madhesh Province, Nepal</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Kathmandu Liaison & Showroom: Teku / Koteshwor, Kathmandu</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Factory Orders: +977-51-521940 / +977-9855021000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Inquiries: info@evereststeel.com.np</span>
            </div>
          </div>
        </div>

        {/* Column 2: Household Almirahs */}
        <div>
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
            Household Almirahs
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/products/sansaar-model-almirah" className="hover:text-amber-400 transition-colors">
                Sansaar Model (संसार दराज)
              </Link>
            </li>
            <li>
              <Link href="/products/janki-model-bridal-almirah" className="hover:text-amber-400 transition-colors">
                Janki Bridal Model (जानकी विवाह)
              </Link>
            </li>
            <li>
              <Link href="/products/ladies-gents-split-wardrobe" className="hover:text-amber-400 transition-colors">
                Ladies Gents Split (जोडी दराज)
              </Link>
            </li>
            <li>
              <Link href="/products/radha-krishna-model-almirah" className="hover:text-amber-400 transition-colors">
                Radha Krishna Classic (राधा कृष्ण)
              </Link>
            </li>
            <li>
              <Link href="/products/3-door-1-locker-mirror-almirah" className="hover:text-amber-400 transition-colors">
                3-Door Master Mirror Almirah
              </Link>
            </li>
            <li>
              <Link href="/category/household" className="text-amber-500 hover:underline inline-flex items-center gap-1 font-semibold pt-1">
                <span>View Full Lineup</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Office, Filing & Safes */}
        <div>
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
            Office & High-Security
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/products/standard-office-steel-almirah" className="hover:text-amber-400 transition-colors">
                Standard Office Almirah (4-Shelf)
              </Link>
            </li>
            <li>
              <Link href="/products/filing-cabinet-4-drawer" className="hover:text-amber-400 transition-colors">
                4-Drawer Heavy Filing Cabinet
              </Link>
            </li>
            <li>
              <Link href="/products/filing-cabinet-5-drawer" className="hover:text-amber-400 transition-colors">
                5-Drawer Archive Cabinet
              </Link>
            </li>
            <li>
              <Link href="/products/executive-office-desk-pradhan" className="hover:text-amber-400 transition-colors">
                Everest Pradhan Executive Desk
              </Link>
            </li>
            <li>
              <Link href="/products/everest-heavy-tijori-safe-36" className="hover:text-amber-400 transition-colors">
                Heavy Tijori Safe 36&quot; (180 kg)
              </Link>
            </li>
            <li>
              <Link href="/products/commercial-jeweller-tijori-safe-42" className="hover:text-amber-400 transition-colors">
                Jeweller & Bank Vault 42&quot; (260 kg)
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: B2B Dealership & Institutional */}
        <div>
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
            B2B & Institutional
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/b2b" className="hover:text-amber-400 transition-colors font-medium text-emerald-400">
                Dealer Application (PAN/VAT)
              </Link>
            </li>
            <li>
              <Link href="/quote" className="hover:text-amber-400 transition-colors font-medium text-amber-400">
                Bulk Quote Request (10+ Units)
              </Link>
            </li>
            <li>
              <Link href="/b2b#wholesale-pricing" className="hover:text-amber-400 transition-colors">
                Wholesale Price Schedules
              </Link>
            </li>
            <li>
              <Link href="/institutional/schools" className="hover:text-amber-400 transition-colors">
                School & Campus Desks
              </Link>
            </li>
            <li>
              <Link href="/institutional/hostels" className="hover:text-amber-400 transition-colors">
                Hostel Steel Bunk Beds
              </Link>
            </li>
            <li>
              <Link href="/institutional/hospitals" className="hover:text-amber-400 transition-colors">
                Hospital Ward Lockers
              </Link>
            </li>
            <li className="pt-2 border-t border-slate-800">
              <Link href="/admin" className="hover:text-amber-400 transition-colors font-mono font-bold text-amber-500">
                ⚙️ Factory Operations Dashboard (Admin)
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Nepal Standards Strip */}
      <div className="border-t border-slate-850 bg-slate-950 py-5 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div>
            © 2039–2083 BS (2026 AD) Everest Steel Furniture Udyog. All Rights Reserved.
            {" "}Birgunj, Nepal.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>PAN / VAT: 300189241</span>
            <span>•</span>
            <span>Nepal Standard Specification (NBSM Aligned)</span>
            <span>•</span>
            <span className="text-amber-500">Made in Nepal with Pride</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
