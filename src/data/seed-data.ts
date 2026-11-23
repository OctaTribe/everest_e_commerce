// Authentic Everest Steel Furniture Udyog (Birgunj, Nepal) Product Catalog & Manufacturing Dataset
// Established 2039/2040 BS - Birgunj Industrial Corridor

export interface SeedProductVariant {
  sku: string;
  coatingType: "POWDER_COATED" | "ENAMEL_COATED";
  colorName: string;
  colorHex: string;
  heightInches: number;
  widthInches: number;
  depthInches: number;
  weightKg: number;
  mrpNpr: number;
  sellingPriceNpr: number;
  dealerPriceNpr: number;
  stockQty: number;
  isPopular?: boolean;
  exteriorImages: string[];
  interiorCutawayImage: string;
  dimensionBlueprintImage: string;
}

export interface SeedProduct {
  slug: string;
  name: string;
  nepaliName: string;
  tagline: string;
  baseDescription: string;
  category: "HOUSEHOLD_ALMIRAH" | "OFFICE_ALMIRAH" | "FILING_CABINETS" | "OFFICE_TABLES" | "SAFES_TIJORI" | "INSTITUTIONAL";
  warrantyYears: number;
  preTreatment: "HOT_CHEMICAL" | "COLD_CHEMICAL";
  steelGauge: string;
  sheetSource: string;
  hasLocker: boolean;
  hasMirror: boolean;
  hasSecretCompartment: boolean;
  lockMechanism: string;
  isBestseller: boolean;
  isFeatured: boolean;
  variants: SeedProductVariant[];
}

export interface SeedShippingZone {
  provinceNumber: number;
  provinceName: string;
  cityHub: string;
  coverageAreas: string;
  heavyFreightChargeNpr: number;
  estimatedDispatchDays: string;
}

export const SEED_SHIPPING_ZONES: SeedShippingZone[] = [
  {
    provinceNumber: 2,
    provinceName: "Madhesh Province",
    cityHub: "Birgunj Factory Hub",
    coverageAreas: "Birgunj, Parsa, Bara Industrial Corridor, Kalaiya, Simara, Raxaul border corridor",
    heavyFreightChargeNpr: 500,
    estimatedDispatchDays: "1 Day (Same-Day Factory Dispatch Available)",
  },
  {
    provinceNumber: 3,
    provinceName: "Bagmati Province",
    cityHub: "Chitwan / Narayangarh",
    coverageAreas: "Bharatpur, Narayangarh, Ratnanagar, Hetauda Industrial Zone, Tandi",
    heavyFreightChargeNpr: 1200,
    estimatedDispatchDays: "1 - 2 Days via Mahendra Highway",
  },
  {
    provinceNumber: 3,
    provinceName: "Bagmati Province",
    cityHub: "Kathmandu Valley",
    coverageAreas: "Kathmandu Ring Road, Lalitpur (Patan), Bhaktapur, Kirtipur, Budhanilkantha",
    heavyFreightChargeNpr: 1800,
    estimatedDispatchDays: "2 - 3 Days (Direct Express Freight from Birgunj)",
  },
  {
    provinceNumber: 4,
    provinceName: "Gandaki Province",
    cityHub: "Pokhara Valley",
    coverageAreas: "Pokhara, Lekhnath, Damauli, Syangja, Baglung, Beni corridor",
    heavyFreightChargeNpr: 2200,
    estimatedDispatchDays: "2 - 4 Days via Prithvi Highway",
  },
  {
    provinceNumber: 5,
    provinceName: "Lumbini Province",
    cityHub: "Butwal / Bhairahawa",
    coverageAreas: "Butwal, Bhairahawa, Tilottama, Kapilvastu, Sunwal, Bardaghat",
    heavyFreightChargeNpr: 1900,
    estimatedDispatchDays: "2 - 3 Days via East-West Highway",
  },
  {
    provinceNumber: 1,
    provinceName: "Koshi Province",
    cityHub: "Biratnagar / Itahari",
    coverageAreas: "Biratnagar, Itahari, Dharan, Damak, Birtamod, Jhapa Hub",
    heavyFreightChargeNpr: 2400,
    estimatedDispatchDays: "3 - 4 Days via Mahendra Highway",
  },
  {
    provinceNumber: 6,
    provinceName: "Karnali & Sudurpashchim",
    cityHub: "Nepalgunj / Dhangadhi Hub",
    coverageAreas: "Nepalgunj, Kohalpur, Surkhet Birendranagar, Dhangadhi, Mahendranagar",
    heavyFreightChargeNpr: 3200,
    estimatedDispatchDays: "4 - 6 Days (Secured Wooden Crate Transport)",
  },
];

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    slug: "sansaar-model-almirah",
    name: "Sansaar Model Almirah",
    nepaliName: "संसार मोडल प्रिमियम स्टील दराज",
    tagline: "The Household Benchmark in Nepalese Families Since 2039 BS",
    baseDescription:
      "Everest Steel's crowning masterpiece manufactured continuously for over four decades in Birgunj. Engineered with high-tensile 20/22 Gauge Tata CRCA steel sheet, hot 7-tank chemical anti-rust phosphating, and electrostatically baked powder coat. Features double front doors, a high-clarity 5mm Saint-Gobain full-length dressing mirror, heavy dual-lever inner vault locker, saree hanging rail, stainless steel bangle rods, and Everest's legendary hidden bottom jewellery trapdoor (चोर खण्ड).",
    category: "HOUSEHOLD_ALMIRAH",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "20/22 Heavy Gauge Prime Tata CRCA Steel",
    sheetSource: "Prime Tata Steel / Jindal Cold-Rolled Close Annealed (CRCA)",
    hasLocker: true,
    hasMirror: true,
    hasSecretCompartment: true,
    lockMechanism: "Everest Ultra 6-Lever Solid Brass Tumbler Mechanism with 2 Duplicate-Proof Computerized Keys",
    isBestseller: true,
    isFeatured: true,
    variants: [
      {
        sku: "ESF-SAN-78-MRN",
        coatingType: "POWDER_COATED",
        colorName: "Warm Almirah Maroon",
        colorHex: "#7F1D1D",
        heightInches: 78,
        widthInches: 40,
        depthInches: 21,
        weightKg: 88,
        mrpNpr: 38500,
        sellingPriceNpr: 32800,
        dealerPriceNpr: 27500,
        stockQty: 24,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-SAN-78-EN-MRN",
        coatingType: "ENAMEL_COATED",
        colorName: "Warm Almirah Maroon",
        colorHex: "#7F1D1D",
        heightInches: 78,
        widthInches: 40,
        depthInches: 21,
        weightKg: 86,
        mrpNpr: 34000,
        sellingPriceNpr: 28900,
        dealerPriceNpr: 24200,
        stockQty: 14,
        exteriorImages: [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-SAN-78-BLU",
        coatingType: "POWDER_COATED",
        colorName: "Royal Water Blue",
        colorHex: "#0284C7",
        heightInches: 78,
        widthInches: 40,
        depthInches: 21,
        weightKg: 88,
        mrpNpr: 38500,
        sellingPriceNpr: 32800,
        dealerPriceNpr: 27500,
        stockQty: 18,
        exteriorImages: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-SAN-78-BRN",
        coatingType: "POWDER_COATED",
        colorName: "Hammered Metallic Brown",
        colorHex: "#78350F",
        heightInches: 78,
        widthInches: 40,
        depthInches: 21,
        weightKg: 88,
        mrpNpr: 38500,
        sellingPriceNpr: 32800,
        dealerPriceNpr: 27500,
        stockQty: 12,
        exteriorImages: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-SAN-72-MRN",
        coatingType: "POWDER_COATED",
        colorName: "Warm Almirah Maroon",
        colorHex: "#7F1D1D",
        heightInches: 72,
        widthInches: 38,
        depthInches: 20,
        weightKg: 78,
        mrpNpr: 34500,
        sellingPriceNpr: 29800,
        dealerPriceNpr: 24800,
        stockQty: 15,
        exteriorImages: [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-SAN-66-MRN",
        coatingType: "POWDER_COATED",
        colorName: "Warm Almirah Maroon",
        colorHex: "#7F1D1D",
        heightInches: 66,
        widthInches: 36,
        depthInches: 19,
        weightKg: 68,
        mrpNpr: 31000,
        sellingPriceNpr: 26500,
        dealerPriceNpr: 22000,
        stockQty: 10,
        exteriorImages: [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "janki-model-bridal-almirah",
    name: "Janki Model Bridal Almirah",
    nepaliName: "जानकी मोडल ब्राइडल विवाह दराज",
    tagline: "The Traditional Choice for Nepalese Weddings & Heritage Homes",
    baseDescription:
      "Crafted specifically for bridal dowry and traditional family rooms in Nepal. Features ornate architectural border moldings, embossed floral corner medallions, dual internal security lockers (one for bridal jewellery and gold certificates, one for family cash), four heavy gauge fold-shelves, double door wardrobe hanging bay, and an extra deep bottom drawer for heavy winter quilts (सिरक/डसना). Treated with 7-tank hot phosphate chemical anti-corrosion for multi-generational durability.",
    category: "HOUSEHOLD_ALMIRAH",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "20 Gauge Heavy Prime CRCA Sheet",
    sheetSource: "Tata Steel Prime Cold-Rolled",
    hasLocker: true,
    hasMirror: true,
    hasSecretCompartment: true,
    lockMechanism: "Dual Everest High-Security Brass Levers with Concealed Padlock Hasp",
    isBestseller: true,
    isFeatured: true,
    variants: [
      {
        sku: "ESF-JAN-78-MRN",
        coatingType: "POWDER_COATED",
        colorName: "Imperial Bridal Maroon",
        colorHex: "#7F1D1D",
        heightInches: 78,
        widthInches: 42,
        depthInches: 22,
        weightKg: 95,
        mrpNpr: 43000,
        sellingPriceNpr: 36500,
        dealerPriceNpr: 30500,
        stockQty: 16,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-JAN-78-IVR",
        coatingType: "POWDER_COATED",
        colorName: "Antique Ivory & Gold",
        colorHex: "#FDF8F0",
        heightInches: 78,
        widthInches: 42,
        depthInches: 22,
        weightKg: 95,
        mrpNpr: 43000,
        sellingPriceNpr: 36500,
        dealerPriceNpr: 30500,
        stockQty: 8,
        exteriorImages: [
          "https://images.unsplash.com/photo-1540518614846-7ede433c4550?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "ladies-gents-split-wardrobe",
    name: "Ladies Gents Model Almirah",
    nepaliName: "लेडिज जेन्ट्स मोडल जोडी दराज",
    tagline: "Dedicated His & Her Twin Compartments in a Solid 4-Foot Steel Frame",
    baseDescription:
      "Engineered specifically for master bedrooms and couples who demand organized personal space. The Left Wing (Gents) includes a full-height suit hanger section, belt & tie rack, and watch organizer drawer. The Right Wing (Ladies) features a dedicated saree tier, dual-locking jewellery vault, stainless bangle rods, and cosmetic shelf. Built with reinforced 18/20 gauge heavy CRCA steel to withstand heavy loads without sag.",
    category: "HOUSEHOLD_ALMIRAH",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "18/20 Gauge Extra Heavy CRCA Steel",
    sheetSource: "Jindal Steel & Power CRCA Prime",
    hasLocker: true,
    hasMirror: true,
    hasSecretCompartment: true,
    lockMechanism: "Independent Left & Right Everest Multi-Bolt Locking Bars",
    isBestseller: true,
    isFeatured: true,
    variants: [
      {
        sku: "ESF-LG-78-MRN",
        coatingType: "POWDER_COATED",
        colorName: "Warm Almirah Maroon",
        colorHex: "#7F1D1D",
        heightInches: 78,
        widthInches: 48,
        depthInches: 22,
        weightKg: 118,
        mrpNpr: 47500,
        sellingPriceNpr: 40500,
        dealerPriceNpr: 34200,
        stockQty: 10,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-LG-78-GRY",
        coatingType: "POWDER_COATED",
        colorName: "Architectural Slate Grey",
        colorHex: "#334155",
        heightInches: 78,
        widthInches: 48,
        depthInches: 22,
        weightKg: 118,
        mrpNpr: 47500,
        sellingPriceNpr: 40500,
        dealerPriceNpr: 34200,
        stockQty: 14,
        exteriorImages: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "radha-krishna-model-almirah",
    name: "Radha Krishna Model Almirah",
    nepaliName: "राधा कृष्ण मोडल स्टील दराज",
    tagline: "Timeless Traditional Double-Door Steel Wardrobe with Dual Keys",
    baseDescription:
      "The classic Everest Steel design that built the brand's reputation across the Terai and Kathmandu. Built with standard 20/22 gauge steel, double front doors with brass keyhole escutcheon, double inner locker with dual husband-wife keys, 3 wide full-width storage shelves, and bottom footwear storage. Clean, robust, and virtually indestructible.",
    category: "HOUSEHOLD_ALMIRAH",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "20/22 Gauge Tata CRCA Steel",
    sheetSource: "Tata CRCA Sheets",
    hasLocker: true,
    hasMirror: false,
    hasSecretCompartment: false,
    lockMechanism: "Everest 6-Lever Brass Heavy Deadbolt Mechanism",
    isBestseller: false,
    isFeatured: false,
    variants: [
      {
        sku: "ESF-RK-72-MRN",
        coatingType: "POWDER_COATED",
        colorName: "Traditional Maroon",
        colorHex: "#7F1D1D",
        heightInches: 72,
        widthInches: 38,
        depthInches: 20,
        weightKg: 75,
        mrpNpr: 32000,
        sellingPriceNpr: 27500,
        dealerPriceNpr: 23200,
        stockQty: 20,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-RK-72-BRN",
        coatingType: "POWDER_COATED",
        colorName: "Hammered Bronze Brown",
        colorHex: "#78350F",
        heightInches: 72,
        widthInches: 38,
        depthInches: 20,
        weightKg: 75,
        mrpNpr: 32000,
        sellingPriceNpr: 27500,
        dealerPriceNpr: 23200,
        stockQty: 15,
        exteriorImages: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "3-door-1-locker-mirror-almirah",
    name: "3 Door 1 Locker Mirror Almirah",
    nepaliName: "३ ढोके १ लकर ऐना स्टील दराज",
    tagline: "Grand 4.5-Foot Triple-Door Master Wardrobe for Large Residences",
    baseDescription:
      "The largest residential steel wardrobe engineered by Everest Steel. Features 3 full-height vertical doors with a central Belgian silver-backed dressing mirror. Left unit provides 4 wide compartments; right unit houses full-hang capacity with heavy internal steel vault locker. Finished with pure polyester powder coat baked in automated Birgunj conveyor ovens.",
    category: "HOUSEHOLD_ALMIRAH",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "18/20 Gauge Heavy Structural CRCA Sheet",
    sheetSource: "Jindal CRCA Prime Cold Rolled",
    hasLocker: true,
    hasMirror: true,
    hasSecretCompartment: true,
    lockMechanism: "Dual Master Shootbolt Locking System with Central Interlock",
    isBestseller: false,
    isFeatured: true,
    variants: [
      {
        sku: "ESF-3D-78-MRN",
        coatingType: "POWDER_COATED",
        colorName: "Deep Almirah Maroon",
        colorHex: "#7F1D1D",
        heightInches: 78,
        widthInches: 54,
        depthInches: 22,
        weightKg: 135,
        mrpNpr: 56000,
        sellingPriceNpr: 48500,
        dealerPriceNpr: 41000,
        stockQty: 8,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-3D-78-BLU",
        coatingType: "POWDER_COATED",
        colorName: "Royal Water Blue",
        colorHex: "#0284C7",
        heightInches: 78,
        widthInches: 54,
        depthInches: 22,
        weightKg: 135,
        mrpNpr: 56000,
        sellingPriceNpr: 48500,
        dealerPriceNpr: 41000,
        stockQty: 6,
        exteriorImages: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "standard-office-steel-almirah",
    name: "Standard Office Steel Almirah",
    nepaliName: "स्ट्यान्डर्ड सरकारी तथा कार्यालय दराज",
    tagline: "Heavy-Duty 4-Shelf Document Storage Approved for Government & Banks",
    baseDescription:
      "The undisputed standard for corporate offices, law firms, banking institutions, and Nepal Government ministries. Includes 4 adjustable heavy load-bearing shelves tested to 65 kg UDL per shelf. 3-way shoot bolt locking system with unpickable Everest cylinder lock. Electrostatically powder coated in scratch-resistant Industrial Slate Grey.",
    category: "OFFICE_ALMIRAH",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "20/22 Gauge Heavy CRCA Steel",
    sheetSource: "Tata CRCA Sheets",
    hasLocker: false,
    hasMirror: false,
    hasSecretCompartment: false,
    lockMechanism: "3-Way Active Steel Shoot-Bolt Deadlock with Brass Cylinder",
    isBestseller: true,
    isFeatured: true,
    variants: [
      {
        sku: "ESF-OFF-78-GRY",
        coatingType: "POWDER_COATED",
        colorName: "Industrial Slate Grey",
        colorHex: "#334155",
        heightInches: 78,
        widthInches: 36,
        depthInches: 19,
        weightKg: 72,
        mrpNpr: 24500,
        sellingPriceNpr: 19800,
        dealerPriceNpr: 16500,
        stockQty: 35,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-OFF-78-IVR",
        coatingType: "POWDER_COATED",
        colorName: "Office Smoke Ivory",
        colorHex: "#FDF8F0",
        heightInches: 78,
        widthInches: 36,
        depthInches: 19,
        weightKg: 72,
        mrpNpr: 24500,
        sellingPriceNpr: 19800,
        dealerPriceNpr: 16500,
        stockQty: 20,
        exteriorImages: [
          "https://images.unsplash.com/photo-1540518614846-7ede433c4550?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "filing-cabinet-4-drawer",
    name: "Heavy-Duty 4 Drawer Filing Cabinet",
    nepaliName: "४ घर भएको हेभी फाइलिङ क्याबिनेट",
    tagline: "Precision Telescopic Sliders with Anti-Tilt Central Gang Locking",
    baseDescription:
      "Designed for high-traffic office document management. Accommodates standard Foolscap and A4 suspension files. Features German-engineered heavy-duty 3-stage ball-bearing runners rated for 50,000 extension cycles at 40 kg per drawer. Equipped with automatic anti-tilt safety (locks remaining drawers when one is extended) and central master key.",
    category: "FILING_CABINETS",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "20 Gauge Heavy Structural CRCA Steel",
    sheetSource: "Tata Steel Prime",
    hasLocker: false,
    hasMirror: false,
    hasSecretCompartment: false,
    lockMechanism: "Single Turn Central Gang-Lock Locking All 4 Drawers Simultaneously",
    isBestseller: true,
    isFeatured: true,
    variants: [
      {
        sku: "ESF-FC-4D-GRY",
        coatingType: "POWDER_COATED",
        colorName: "Classic Grey",
        colorHex: "#475569",
        heightInches: 54,
        widthInches: 18.5,
        depthInches: 25,
        weightKg: 58,
        mrpNpr: 22500,
        sellingPriceNpr: 18200,
        dealerPriceNpr: 15200,
        stockQty: 25,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "filing-cabinet-5-drawer",
    name: "Heavy-Duty 5 Drawer Filing Cabinet",
    nepaliName: "५ घर भएको हेभी फाइलिङ क्याबिनेट",
    tagline: "Maximum Density Archive Storage for Legal & Financial Institutions",
    baseDescription:
      "5-tier high-capacity vertical archival cabinet engineered from heavy 20-gauge CRCA sheet steel. Full telescopic drawer travel with sound-dampening rubber bumpers, label index holders, and recessed full-width aluminum grab handles.",
    category: "FILING_CABINETS",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "20 Gauge CRCA Sheet Steel",
    sheetSource: "Tata Steel Prime",
    hasLocker: false,
    hasMirror: false,
    hasSecretCompartment: false,
    lockMechanism: "Everest Central Interlocking Plunger System",
    isBestseller: false,
    isFeatured: false,
    variants: [
      {
        sku: "ESF-FC-5D-GRY",
        coatingType: "POWDER_COATED",
        colorName: "Industrial Slate Grey",
        colorHex: "#334155",
        heightInches: 66,
        widthInches: 18.5,
        depthInches: 25,
        weightKg: 72,
        mrpNpr: 27000,
        sellingPriceNpr: 22500,
        dealerPriceNpr: 18900,
        stockQty: 18,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "executive-office-desk-pradhan",
    name: "Everest Pradhan Executive Desk (5x3 Ft)",
    nepaliName: "एभरेष्ट प्रधान एक्जिक्युटिभ अफिस टेबल",
    tagline: "Heavy-Gauge Steel Structure with Scratch-Proof Teak Laminate Top",
    baseDescription:
      "Prestigious executive steel desk designed for business owners, directors, and head administrators. Built with a twin-pedestal heavy steel frame: Left pedestal includes 3 smooth utility drawers with central master lock; Right pedestal features 1 deep legal file drawer and 1 lockable cupboard. Heavy welded box legs with leveling glides and cable conduit grommet.",
    category: "OFFICE_TABLES",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "18/20 Gauge Box-Steel Frame & Drawers",
    sheetSource: "Prime CRCA Sheet with 25mm Action TESA Prelam Board",
    hasLocker: true,
    hasMirror: false,
    hasSecretCompartment: false,
    lockMechanism: "Dual-Side Master Lock with Duplicate Foldable Keys",
    isBestseller: true,
    isFeatured: true,
    variants: [
      {
        sku: "ESF-TBL-EX-60-TEK",
        coatingType: "POWDER_COATED",
        colorName: "Slate Grey with Natural Teak Top",
        colorHex: "#334155",
        heightInches: 30,
        widthInches: 60,
        depthInches: 36,
        weightKg: 68,
        mrpNpr: 28500,
        sellingPriceNpr: 23800,
        dealerPriceNpr: 19800,
        stockQty: 15,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "everest-heavy-tijori-safe-36",
    name: "Everest Heavy Tijori Safe 36\"",
    nepaliName: "एभरेष्ट हेभी तिजोरी सेफ (३६ इन्च डबल डोर)",
    tagline: "Multi-Bend Fire-Retardant Steel Vault with Solid 28mm Shooting Bolts",
    baseDescription:
      "Everest Steel's heavy vault safe manufactured to protect gold jewellery, commercial cash receipts, land deeds (लालपुर्जा), and confidential contracts. Features a 6mm solid drill-resistant high-carbon steel front door plate, multi-bend 14-gauge double-walled body insulated with proprietary fire-retardant heat barrier, four 28mm solid hardened cylindrical shooting bolts, and dual key control.",
    category: "SAFES_TIJORI",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "6mm Solid Front Door Plate + 14 Gauge Double Insulated Body",
    sheetSource: "SAIL / Tata Heavy Structural Steel Plate",
    hasLocker: true,
    hasMirror: false,
    hasSecretCompartment: true,
    lockMechanism: "Dual Key Dual-Control 8-Lever Brass Locks + Secondary Internal Trap Lock",
    isBestseller: true,
    isFeatured: true,
    variants: [
      {
        sku: "ESF-TIJ-36-GRY",
        coatingType: "POWDER_COATED",
        colorName: "Armored Steel Grey",
        colorHex: "#1E293B",
        heightInches: 36,
        widthInches: 24,
        depthInches: 24,
        weightKg: 180,
        mrpNpr: 58000,
        sellingPriceNpr: 49500,
        dealerPriceNpr: 42000,
        stockQty: 10,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        sku: "ESF-TIJ-36-MRN",
        coatingType: "POWDER_COATED",
        colorName: "Vault Maroon",
        colorHex: "#7F1D1D",
        heightInches: 36,
        widthInches: 24,
        depthInches: 24,
        weightKg: 180,
        mrpNpr: 58000,
        sellingPriceNpr: 49500,
        dealerPriceNpr: 42000,
        stockQty: 6,
        exteriorImages: [
          "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "commercial-jeweller-tijori-safe-42",
    name: "Commercial Jeweller Tijori Safe 42\"",
    nepaliName: "सुनचाँदी व्यवसायी तथा बैंक तिजोरी सेफ (४२ इन्च)",
    tagline: "260 Kg Heavy Fortress with Automatic Relocking Device",
    baseDescription:
      "Engineered specifically for jewellers, microfinances, cooperatives, and high-security premises. Weighing a formidable 260 kg, this heavy safe features 10mm solid door slab, 5-point shooting deadbolts, relocking device triggered automatically under mechanical/torch attack, and dual independently keyed brass locks.",
    category: "SAFES_TIJORI",
    warrantyYears: 5,
    preTreatment: "HOT_CHEMICAL",
    steelGauge: "10mm Solid Door Slab with 12 Gauge Reinforced Composite Body",
    sheetSource: "High-Tensile Industrial Plate & CRCA",
    hasLocker: true,
    hasMirror: false,
    hasSecretCompartment: true,
    lockMechanism: "Automatic Mechanical Relocker with Dual Dual-Control High-Security Keys",
    isBestseller: false,
    isFeatured: true,
    variants: [
      {
        sku: "ESF-TIJ-42-ARM",
        coatingType: "POWDER_COATED",
        colorName: "Armored Slate Black",
        colorHex: "#0F172A",
        heightInches: 42,
        widthInches: 26,
        depthInches: 26,
        weightKg: 260,
        mrpNpr: 84000,
        sellingPriceNpr: 72000,
        dealerPriceNpr: 61000,
        stockQty: 4,
        isPopular: true,
        exteriorImages: [
          "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop"
        ],
        interiorCutawayImage: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop",
        dimensionBlueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  }
];

export const DEMO_DEALER_APPLICATIONS = [
  {
    businessName: "Narayani Steel Traders & Furniture Showroom",
    panVatNumber: "302847591",
    ownerName: "Binod Kumar Shrestha",
    contactPhone: "+977-9855021489",
    contactEmail: "narayani.traders@gmail.com",
    showroomLocation: "Main Road, Birgunj-8, Parsa",
    city: "Birgunj",
    province: "Madhesh Province",
    yearsInBusiness: 18,
    estimatedMonthlyVolume: "25-35 Units / Month",
    status: "APPROVED" as const
  },
  {
    businessName: "Pokhara Modern Steel Depo",
    panVatNumber: "601938472",
    ownerName: "Keshav Raj Baral",
    contactPhone: "+977-9856034120",
    contactEmail: "pokhara.steeldepo@gmail.com",
    showroomLocation: "Prithvi Chowk, Pokhara-9",
    city: "Pokhara",
    province: "Gandaki Province",
    yearsInBusiness: 12,
    estimatedMonthlyVolume: "20-30 Units / Month",
    status: "APPROVED" as const
  }
];

export const DEMO_BULK_QUOTES = [
  {
    quoteNumber: "B2B-2026-0042",
    organizationName: "Tribhuvan University Central Hostel",
    organizationType: "SCHOOL_COLLEGE" as const,
    contactPerson: "Prof. Dr. Rameshwor Bhattarai",
    designation: "Hostel Warden & Procurement Head",
    contactPhone: "+977-9841289045",
    contactEmail: "warden.tu@edu.np",
    deliveryCity: "Kirtipur, Kathmandu",
    deliveryAddress: "TU Central Campus Hostel Complex, Kirtipur",
    customRequirements: "Requirement of 60 Units Standard Office Almirahs and 40 Units 4-Drawer Heavy Filing Cabinets in Slate Grey finish with hot chemical anti-rust coating.",
    status: "QUOTE_SENT" as const,
    items: [
      {
        productName: "Standard Office Steel Almirah",
        quantity: 60,
        preferredGauge: "20 Gauge Heavy CRCA",
        preferredCoating: "POWDER_COATED",
        notes: "Numbered keys and individual label holders"
      },
      {
        productName: "Heavy-Duty 4 Drawer Filing Cabinet",
        quantity: 40,
        preferredGauge: "20 Gauge Structural",
        preferredCoating: "POWDER_COATED",
        notes: "Anti-tilt safety mechanism mandatory"
      }
    ]
  }
];

export interface SeedComboDeal {
  id: string;
  title: string;
  nepaliTitle: string;
  tagline: string;
  productSlugs: string[];
  includedItems: string[];
  originalPriceNpr: number;
  comboPriceNpr: number;
  savingsNpr: number;
  badge: string;
  image: string;
  benefits: string[];
}

export const SEED_COMBOS: SeedComboDeal[] = [
  {
    id: "bridal-master-suite-combo",
    title: "Bridal Master Suite Setup",
    nepaliTitle: "विवाह ब्राइडल दराज तथा तिजोरी कम्बो",
    tagline: "The Traditional Nepali Wedding Setup: 3-Door Dressing Almirah + Heavy Tijori Safe",
    productSlugs: ["3-door-1-locker-mirror-almirah", "everest-heavy-tijori-safe-36"],
    includedItems: [
      '3-Door 1-Locker Mirror Master Almirah (54"W × 78"H, Warm Maroon)',
      'Everest Heavy Tijori Safe 36" (180 kg Double-Door Armored Vault)'
    ],
    originalPriceNpr: 98000,
    comboPriceNpr: 86500,
    savingsNpr: 11500,
    badge: "Save NPR 11,500",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    benefits: [
      "Heavy Freight Transit Included to Kathmandu, Pokhara & Chitwan",
      "Reinforced Wooden Crate Packaging for Zero Scratches",
      "Two Separate 5-Year Factory Warranty Booklets",
      "Dual Keys & Master Computerized Duplicate Sets"
    ]
  },
  {
    id: "new-home-essential-duo",
    title: "New Home Heritage Duo",
    nepaliTitle: "घरायसी दम्पती दराज र तिजोरी सेट",
    tagline: "Nepal's #1 Selling Household Wardrobe Paired with Floor-Anchored Security Safe",
    productSlugs: ["sansaar-model-almirah", "everest-heavy-tijori-safe-36"],
    includedItems: [
      'Sansaar Model Almirah (78"H × 40"W, Saint-Gobain Mirror, Jewellery Trapdoor)',
      'Everest Heavy Tijori Safe 36" (180 kg Drill-Resistant Fire Vault)'
    ],
    originalPriceNpr: 82300,
    comboPriceNpr: 73800,
    savingsNpr: 8500,
    badge: "Save NPR 8,500",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop",
    benefits: [
      "Choice of Warm Maroon or Royal Water Blue Finishes",
      "Factory-Direct Dispatch in 24-48 Hours",
      "Free Ground Floor Placement & Leveling Setup",
      "Both Items Co-Ordinated in Matching Baked Powder Coat"
    ]
  },
  {
    id: "executive-office-startup-setup",
    title: "Executive Office Startup Trio",
    nepaliTitle: "कर्पोरेट अफिस कम्प्लिट फर्निचर सेट",
    tagline: "Turnkey Corporate Package: Executive Desk + 4-Drawer File Archive + Office Almirah",
    productSlugs: ["executive-office-desk-pradhan", "filing-cabinet-4-drawer", "standard-office-steel-almirah"],
    includedItems: [
      'Everest Pradhan Executive Desk (60"W × 36"D × 30"H with Teak Board)',
      'Heavy-Duty 4-Drawer Filing Cabinet (Anti-Tilt Ball Bearing Slides)',
      'Standard Office Steel Almirah (4 Adjustable Shelves, 3-Way Shoot Bolt)'
    ],
    originalPriceNpr: 61800,
    comboPriceNpr: 54000,
    savingsNpr: 7800,
    badge: "Save NPR 7,800",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop",
    benefits: [
      "All units keyed alike or master-keyed by request",
      "Tax Invoice with Nepal VAT / PAN for Business Expense",
      "Industrial Slate Grey scratch-resistant powder coat",
      "Heavy load rating: 65 kg per shelf & 40 kg per file drawer"
    ]
  }
];

export interface SeedTimelineItem {
  yearBs: string;
  yearAd: string;
  title: string;
  description: string;
  milestone: string;
}

export const SEED_TIMELINE: SeedTimelineItem[] = [
  {
    yearBs: "२०३९ साल",
    yearAd: "1983 AD",
    title: "Founding in Birgunj Industrial Area",
    description: "Established by master steel craftsmen in Parsa, Birgunj. Started with manual hand fly-presses, cold-rolled sheets, and custom almirahs for local merchant families.",
    milestone: "The First Everest Workshop"
  },
  {
    yearBs: "२०४८ साल",
    yearAd: "1992 AD",
    title: "7-Tank Hot Chemical Phosphate Immersion",
    description: "Introduced Nepal's first 7-tank hot phosphate chemical pre-treatment plant to permanently solve the problem of humidity rust in the Terai and monsoon climates.",
    milestone: "The Anti-Rust Breakthrough"
  },
  {
    yearBs: "२०५६ साल",
    yearAd: "2000 AD",
    title: "Launch of Sansaar Model Almirah",
    description: "Designed Nepal's legendary household almirah featuring dual husband-wife lockers, stainless steel bangle rods, secret floor trapdoors, and Saint-Gobain dressing mirrors.",
    milestone: "Nepal's Benchmark Wardrobe"
  },
  {
    yearBs: "२०६८ साल",
    yearAd: "2011 AD",
    title: "200°C Automated Powder Coating Line",
    description: "Commissioned an automated continuous overhead conveyor powder coating system with high-temperature curing ovens, eliminating paint odor and paint chipping.",
    milestone: "Modern Factory Automation"
  },
  {
    yearBs: "२०७६ साल",
    yearAd: "2019 AD",
    title: "Nationwide Bank & Institutional Fleet",
    description: "Crossed 50,000+ units delivered to Nepal Government ministries, commercial bank branches, and university hostels across all 7 provinces.",
    milestone: "Institutional Trust Standard"
  },
  {
    yearBs: "२०८३ साल",
    yearAd: "2026 AD",
    title: "Factory-Direct Digital Commerce Era",
    description: "Launched Nepal's first direct-from-factory e-commerce platform, delivering heavy steel wardrobes and tijori safes directly from Birgunj to family doorsteps.",
    milestone: "40+ Years of Steel Mastery"
  }
];

export interface SeedClientLogo {
  name: string;
  category: string;
  badge: string;
}

export const SEED_INSTITUTIONAL_CLIENTS: SeedClientLogo[] = [
  { name: "Nepal SBI Bank Ltd.", category: "Commercial Banking", badge: "240+ Branches Supplied" },
  { name: "Rastriya Banijya Bank", category: "State Commercial Bank", badge: "Vault Safes & Almirahs" },
  { name: "Tribhuvan University (TU)", category: "Higher Education", badge: "Hostels & Central Library" },
  { name: "Agricultural Development Bank", category: "Development Banking", badge: "Branch Document Systems" },
  { name: "Birgunj Metropolitan City", category: "Municipal Government", badge: "Official Municipal Office" },
  { name: "Narayani Hospital (Birgunj)", category: "Healthcare", badge: "Ward Cupboards & Safes" },
  { name: "Armed Police Force (APF) Welfare", category: "Security Directorate", badge: "Barracks & Office Gear" },
  { name: "National Life Insurance Co.", category: "Insurance & Finance", badge: "Fireproof Archival Cabinets" }
];

export interface SeedCustomerReview {
  id: string;
  customerName: string;
  city: string;
  modelPurchased: string;
  rating: number;
  yearsUsed: string;
  date: string;
  reviewText: string;
  verifiedBuyer: boolean;
}

export const SEED_REVIEWS: SeedCustomerReview[] = [
  {
    id: "rev-1",
    customerName: "Rajan K. Shrestha",
    city: "Baluwatar, Kathmandu",
    modelPurchased: "Sansaar Model Almirah 78\" (Warm Maroon)",
    rating: 5,
    yearsUsed: "14 Years in Family",
    date: "Asoj 2081",
    reviewText: "My father bought our first Everest Sansaar almirah from Birgunj back in 2058 BS. It has survived three house moves without a single screw loosening or hinge squeaking. Last month, I ordered a new 78\" Sansaar in Warm Maroon for my own home—the heavy 20-gauge steel and the computerized brass key are unmatched compared to cheap plywood or light Chinese wardrobes.",
    verifiedBuyer: true
  },
  {
    id: "rev-2",
    customerName: "Pooja Gurung",
    city: "New Road, Pokhara",
    modelPurchased: "Janki Model Bridal Almirah 78\"",
    rating: 5,
    yearsUsed: "Wedding Dowry (2 Years)",
    date: "Mangsir 2082",
    reviewText: "My parents gifted me the Janki Bridal model for my wedding. The embossed floral borders and the dual lockers (one for my bridal jewellery and one for documents) make it look regal in our master bedroom. The secret trapdoor at the bottom gives incredible peace of mind when we travel outside Pokhara.",
    verifiedBuyer: true
  },
  {
    id: "rev-3",
    customerName: "Er. Rameshwar Neupane",
    city: "Bharatpur-10, Chitwan",
    modelPurchased: "Everest Heavy Tijori Safe 36\"",
    rating: 5,
    yearsUsed: "3 Years",
    date: "Chaitra 2081",
    reviewText: "At 180 kilograms, this safe is a literal fortress. The delivery team from Birgunj arrived with hydraulic lift assistance and anchored it securely into our reinforced concrete floor. The solid 28mm cylindrical bolts and dual key control make it far superior to generic electronic safes that fail when batteries die.",
    verifiedBuyer: true
  },
  {
    id: "rev-4",
    customerName: "Advocate Suman Adhikari",
    city: "Adarshnagar, Birgunj",
    modelPurchased: "Heavy-Duty 4 Drawer Filing Cabinet",
    rating: 5,
    yearsUsed: "8 Years in Law Chambers",
    date: "Bhadra 2082",
    reviewText: "Our law office holds thousands of case files and client land deeds. The telescopic runners on this cabinet slide like butter even when packed with 40 kg of paper per drawer. The anti-tilt safety system that locks the other drawers when one is extended is an engineering touch you don't find elsewhere.",
    verifiedBuyer: true
  }
];

export interface DistrictLogisticsInfo {
  city: string;
  province: string;
  freightNpr: number;
  dispatchDays: string;
  freeRoomPlacement: boolean;
  transitRoute: string;
}

export const NEPAL_DISTRICT_LOGISTICS: DistrictLogisticsInfo[] = [
  { city: "Birgunj (Factory Base)", province: "Madhesh Province", freightNpr: 500, dispatchDays: "Same Day / 24 Hours", freeRoomPlacement: true, transitRoute: "Direct from Factory Warehouse" },
  { city: "Kathmandu Valley (Ring Road)", province: "Bagmati Province", freightNpr: 1800, dispatchDays: "2 - 3 Days", freeRoomPlacement: true, transitRoute: "Tribhuvan Highway Express Truck" },
  { city: "Lalitpur (Patan / Kupondole)", province: "Bagmati Province", freightNpr: 1800, dispatchDays: "2 - 3 Days", freeRoomPlacement: true, transitRoute: "Tribhuvan Highway Express Truck" },
  { city: "Bhaktapur / Suryabinayak", province: "Bagmati Province", freightNpr: 1800, dispatchDays: "2 - 3 Days", freeRoomPlacement: true, transitRoute: "Tribhuvan Highway Express Truck" },
  { city: "Pokhara Valley", province: "Gandaki Province", freightNpr: 2200, dispatchDays: "2 - 4 Days", freeRoomPlacement: false, transitRoute: "Prithvi Highway via Mugling" },
  { city: "Chitwan / Narayangarh", province: "Bagmati Province", freightNpr: 1200, dispatchDays: "1 - 2 Days", freeRoomPlacement: true, transitRoute: "Mahendra Highway Direct Corridor" },
  { city: "Hetauda Industrial Zone", province: "Bagmati Province", freightNpr: 1000, dispatchDays: "1 Day", freeRoomPlacement: true, transitRoute: "Tribhuvan Highway Shuttle" },
  { city: "Butwal / Tilottama", province: "Lumbini Province", freightNpr: 1900, dispatchDays: "2 - 3 Days", freeRoomPlacement: false, transitRoute: "East-West Highway Express" },
  { city: "Bhairahawa (Gautam Buddha)", province: "Lumbini Province", freightNpr: 1900, dispatchDays: "2 - 3 Days", freeRoomPlacement: false, transitRoute: "East-West Highway Express" },
  { city: "Janakpurdham", province: "Madhesh Province", freightNpr: 1400, dispatchDays: "1 - 2 Days", freeRoomPlacement: true, transitRoute: "Mahendra Highway South Corridor" },
  { city: "Biratnagar / Itahari", province: "Koshi Province", freightNpr: 2400, dispatchDays: "3 - 4 Days", freeRoomPlacement: false, transitRoute: "Mahendra Highway East Freight" },
  { city: "Dharan Clock Tower Area", province: "Koshi Province", freightNpr: 2500, dispatchDays: "3 - 4 Days", freeRoomPlacement: false, transitRoute: "Koshi Highway North Route" },
  { city: "Nepalgunj / Kohalpur", province: "Lumbini / Banke", freightNpr: 3200, dispatchDays: "4 - 6 Days", freeRoomPlacement: false, transitRoute: "Mid-Western Crate Transport" },
  { city: "Dhangadhi / Kailali", province: "Sudurpashchim", freightNpr: 3400, dispatchDays: "5 - 7 Days", freeRoomPlacement: false, transitRoute: "Far-Western Crate Transport" }
];

