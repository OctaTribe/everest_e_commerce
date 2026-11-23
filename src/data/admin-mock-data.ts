import { SEED_PRODUCTS, SeedProduct, SeedProductVariant } from "@/data/seed-data";

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  province: string;
  items: {
    productName: string;
    variantSku: string;
    colorName: string;
    dimensionsSummary: string;
    quantity: number;
    unitPriceNpr: number;
    totalPriceNpr: number;
    weightKg: number;
  }[];
  subtotalNpr: number;
  freightNpr: number;
  discountNpr: number;
  totalNpr: number;
  paymentMethod: string;
  paymentStatus: "UNPAID" | "ADVANCE_PAID" | "PAID_FULL";
  advancePaidNpr: number;
  balanceDueNpr: number;
  orderStatus:
    | "PENDING_PAYMENT"
    | "CONFIRMED"
    | "IN_FABRICATION"
    | "IN_QC_INSPECTION"
    | "DISPATCHED_FROM_BIRGUNJ"
    | "DELIVERED_INSTALLED"
    | "CANCELLED";
  orderDate: string;
  mitiBs: string;
  estimatedDispatch: string;
  challanNumber?: string;
  warrantyCode?: string;
  notes?: string;
}

export interface AdminB2BQuote {
  id: string;
  quoteNumber: string;
  organizationName: string;
  organizationType: "BANK_FINANCIAL" | "SCHOOL_COLLEGE" | "HOSPITAL_CLINIC" | "GOVERNMENT_OFFICE" | "COMMERCIAL_ENTERPRISE";
  contactPerson: string;
  designation: string;
  phone: string;
  email: string;
  panNumber: string;
  destinationCity: string;
  totalUnits: number;
  totalWeightKg: number;
  grossListNpr: number;
  discountPercent: number;
  discountAmountNpr: number;
  subsidizedFreightNpr: number;
  netTenderNpr: number;
  status: "NEW" | "UNDER_REVIEW" | "QUOTE_SENT" | "CLOSED";
  requestedDate: string;
  customRequirements: string;
  items: {
    productName: string;
    quantity: number;
    specs: string;
    unitPriceNpr: number;
  }[];
}

export interface AdminDealerApplication {
  id: string;
  firmName: string;
  panVatNumber: string;
  legalStructure: string;
  ownerName: string;
  contactPhone: string;
  contactEmail: string;
  city: string;
  province: string;
  showroomAddress: string;
  showroomSqFt: number;
  warehouseSqFt: number;
  unloadingRamp: string;
  yearsInBusiness: number;
  currentBrandsHandled: string;
  initialStockBudgetNpr: number;
  projectedMonthlyUnits: number;
  creditFacilityRequested: boolean;
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  appliedDate: string;
  adminNotes?: string;
  assignedCreditLimitNpr?: number;
}

export interface DispatchChallan {
  challanNumber: string;
  orderNumber: string;
  driverName: string;
  driverPhone: string;
  vehicleNo: string;
  driverLicenseNo: string;
  crateCount: number;
  totalWeightKg: number;
  dispatchDateTime: string;
  destinationHub: string;
  consigneeName: string;
  consigneePhone: string;
  securityOfficerName: string;
  factorySealNumber: string;
}

// -------------------------------------------------------------
// INITIAL REPOSITORY OF ORDERS
// -------------------------------------------------------------
export const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "ord-101",
    orderNumber: "ESF-2026-9041",
    customerName: "Suman Adhikari",
    customerPhone: "+977-9851029384",
    customerEmail: "suman.adhikari@gmail.com",
    shippingAddress: "Baneshwor-4, Shantinagar Road",
    shippingCity: "Kathmandu Valley",
    province: "Bagmati Province",
    items: [
      {
        productName: "Sansaar Model 78\" Household Almirah",
        variantSku: "ESF-SAN-78-PW-MRN",
        colorName: "Maroon",
        dimensionsSummary: "78\"H × 40\"W × 21\"D",
        quantity: 1,
        unitPriceNpr: 32800,
        totalPriceNpr: 32800,
        weightKg: 85,
      },
    ],
    subtotalNpr: 32800,
    freightNpr: 850,
    discountNpr: 1500,
    totalNpr: 32150,
    paymentMethod: "COD_PARTIAL_ADVANCE",
    paymentStatus: "ADVANCE_PAID",
    advancePaidNpr: 6430,
    balanceDueNpr: 25720,
    orderStatus: "IN_FABRICATION",
    orderDate: "2026-11-21",
    mitiBs: "2083-08-06 BS",
    estimatedDispatch: "2026-11-23",
    warrantyCode: "WRTY-2026-ESF-9041",
    notes: "Ground floor bedroom. Customer requested brass computerized key set.",
  },
  {
    id: "ord-102",
    orderNumber: "ESF-2026-9042",
    customerName: "Bishal Shrestha",
    customerPhone: "+977-9841238910",
    customerEmail: "bishal.shrestha@nepaltech.com",
    shippingAddress: "New Road, Ward 8",
    shippingCity: "Pokhara",
    province: "Gandaki Province",
    items: [
      {
        productName: "Janki Bridal Model Almirah",
        variantSku: "ESF-JAN-78-PW-PNK",
        colorName: "Pink",
        dimensionsSummary: "78\"H × 48\"W × 22\"D",
        quantity: 1,
        unitPriceNpr: 36500,
        totalPriceNpr: 36500,
        weightKg: 105,
      },
      {
        productName: "Commercial Bank Tijori Heavy Safe 36\"",
        variantSku: "ESF-TIJ-36-EN-GRY",
        colorName: "Classic Grey",
        dimensionsSummary: "36\"H × 24\"W × 22\"D",
        quantity: 1,
        unitPriceNpr: 45000,
        totalPriceNpr: 45000,
        weightKg: 180,
      },
    ],
    subtotalNpr: 81500,
    freightNpr: 1950,
    discountNpr: 4000,
    totalNpr: 79450,
    paymentMethod: "ESEWA",
    paymentStatus: "PAID_FULL",
    advancePaidNpr: 79450,
    balanceDueNpr: 0,
    orderStatus: "DISPATCHED_FROM_BIRGUNJ",
    orderDate: "2026-11-20",
    mitiBs: "2083-08-05 BS",
    estimatedDispatch: "2026-11-22",
    challanNumber: "CH-2026-0814",
    warrantyCode: "WRTY-2026-ESF-9042",
    notes: "Combo wedding package. Wooden crated and loaded onto Birgunj-Pokhara Night Highway Freight.",
  },
  {
    id: "ord-103",
    orderNumber: "ESF-2026-9043",
    customerName: "Kamala Devi Agrawal",
    customerPhone: "+977-9855018920",
    customerEmail: "agrawalkamala@gmail.com",
    shippingAddress: "Main Road, Adarshnagar",
    shippingCity: "Birgunj",
    province: "Madhesh Province",
    items: [
      {
        productName: "Ladies Gents Split Almirah (48\")",
        variantSku: "ESF-LG-78-PW-WBL",
        colorName: "Water Blue",
        dimensionsSummary: "78\"H × 48\"W × 21\"D",
        quantity: 1,
        unitPriceNpr: 40500,
        totalPriceNpr: 40500,
        weightKg: 110,
      },
    ],
    subtotalNpr: 40500,
    freightNpr: 450,
    discountNpr: 0,
    totalNpr: 40950,
    paymentMethod: "CONNECTIPS",
    paymentStatus: "PAID_FULL",
    advancePaidNpr: 40950,
    balanceDueNpr: 0,
    orderStatus: "DELIVERED_INSTALLED",
    orderDate: "2026-11-19",
    mitiBs: "2083-08-04 BS",
    estimatedDispatch: "2026-11-19",
    challanNumber: "CH-2026-0801",
    warrantyCode: "WRTY-2026-ESF-9043",
    notes: "Factory local delivery via factory mini-truck. Installed on 2nd floor with mirror alignment complete.",
  },
  {
    id: "ord-104",
    orderNumber: "ESF-2026-9044",
    customerName: "Pradeep KC",
    customerPhone: "+977-9847029104",
    customerEmail: "pradeep.kc@butwaltraders.com",
    shippingAddress: "Traffic Chowk, Highway Side",
    shippingCity: "Butwal",
    province: "Lumbini Province",
    items: [
      {
        productName: "4-Drawer Anti-Tilt Heavy Filing Cabinet",
        variantSku: "ESF-FC-4D-PW-GRY",
        colorName: "Classic Grey",
        dimensionsSummary: "52\"H × 18\"W × 25\"D",
        quantity: 3,
        unitPriceNpr: 18500,
        totalPriceNpr: 55500,
        weightKg: 156,
      },
      {
        productName: "Everest Pradhan 60\" Officer Table",
        variantSku: "ESF-TB-60-PW-BRN",
        colorName: "Brown",
        dimensionsSummary: "60\"W × 36\"D × 30\"H",
        quantity: 2,
        unitPriceNpr: 24500,
        totalPriceNpr: 49000,
        weightKg: 116,
      },
    ],
    subtotalNpr: 104500,
    freightNpr: 2400,
    discountNpr: 5000,
    totalNpr: 101900,
    paymentMethod: "COD_PARTIAL_ADVANCE",
    paymentStatus: "ADVANCE_PAID",
    advancePaidNpr: 20380,
    balanceDueNpr: 81520,
    orderStatus: "CONFIRMED",
    orderDate: "2026-11-22",
    mitiBs: "2083-08-07 BS",
    estimatedDispatch: "2026-11-24",
    warrantyCode: "WRTY-2026-ESF-9044",
    notes: "Law chamber office setup. Awaiting 7-tank hot phosphate pre-treatment batch.",
  },
  {
    id: "ord-105",
    orderNumber: "ESF-2026-9045",
    customerName: "Dr. Anupama Thapa",
    customerPhone: "+977-9852033481",
    customerEmail: "anupama.thapa@bpkihs.edu.np",
    shippingAddress: "Hospital Road, Ward 1",
    shippingCity: "Dharan / Biratnagar",
    province: "Koshi Province",
    items: [
      {
        productName: "Standard Office Steel Almirah (4-Shelf)",
        variantSku: "ESF-OFC-72-PW-IVR",
        colorName: "Ivory",
        dimensionsSummary: "72\"H × 36\"W × 19\"D",
        quantity: 2,
        unitPriceNpr: 19800,
        totalPriceNpr: 39600,
        weightKg: 136,
      },
    ],
    subtotalNpr: 39600,
    freightNpr: 1800,
    discountNpr: 0,
    totalNpr: 41400,
    paymentMethod: "KHALTI",
    paymentStatus: "PAID_FULL",
    advancePaidNpr: 41400,
    balanceDueNpr: 0,
    orderStatus: "IN_QC_INSPECTION",
    orderDate: "2026-11-21",
    mitiBs: "2083-08-06 BS",
    estimatedDispatch: "2026-11-23",
    warrantyCode: "WRTY-2026-ESF-9045",
    notes: "Clinic medical records storage. Powder coat inspection and lock calibration in progress.",
  },
];

// -------------------------------------------------------------
// INITIAL REPOSITORY OF B2B RFQ QUOTES
// -------------------------------------------------------------
export const INITIAL_ADMIN_B2B_QUOTES: AdminB2BQuote[] = [
  {
    id: "rfq-201",
    quoteNumber: "B2B-2026-0089",
    organizationName: "Nepal SBI Bank Ltd. (Regional Expansion)",
    organizationType: "BANK_FINANCIAL",
    contactPerson: "Binita Poudel",
    designation: "Chief Procurement Officer",
    phone: "+977-9851088776",
    email: "procurement@nepalsbi.com.np",
    panNumber: "300012398",
    destinationCity: "Kathmandu Valley (Multiple Branches)",
    totalUnits: 35,
    totalWeightKg: 3250,
    grossListNpr: 875000,
    discountPercent: 15,
    discountAmountNpr: 131250,
    subsidizedFreightNpr: 14500,
    netTenderNpr: 758250,
    status: "UNDER_REVIEW",
    requestedDate: "2026-11-21",
    customRequirements: "Master-key locking mechanism for 4-drawer filing cabinets. RAL 7035 light grey electrostatic finish.",
    items: [
      {
        productName: "4-Drawer Anti-Tilt Heavy Filing Cabinet",
        quantity: 20,
        specs: "52\"H × 18\"W × 25\"D • Telescopic ball-bearing slides",
        unitPriceNpr: 18500,
      },
      {
        productName: "Commercial Bank Tijori Heavy Safe 36\"",
        quantity: 5,
        specs: "36\"H × 24\"W × 22\"D • 180kg Mass • Dual Key Lever Vault Lock",
        unitPriceNpr: 45000,
      },
      {
        productName: "Everest Pradhan 60\" Officer Table",
        quantity: 10,
        specs: "60\"W × 36\"D × 30\"H • Dual pedestal 6 drawers",
        unitPriceNpr: 24500,
      },
    ],
  },
  {
    id: "rfq-202",
    quoteNumber: "B2B-2026-0090",
    organizationName: "Tribhuvan University Central Hostel",
    organizationType: "SCHOOL_COLLEGE",
    contactPerson: "Prof. Dipendra Neupane",
    designation: "Campus Warden",
    phone: "+977-9841293847",
    email: "hostel@tu.edu.np",
    panNumber: "300481920",
    destinationCity: "Kirtipur, Kathmandu",
    totalUnits: 50,
    totalWeightKg: 2750,
    grossListNpr: 825000,
    discountPercent: 20,
    discountAmountNpr: 165000,
    subsidizedFreightNpr: 12000,
    netTenderNpr: 672000,
    status: "NEW",
    requestedDate: "2026-11-22",
    customRequirements: "Heavy 18-gauge steel bunk beds with anti-corrosion chemical dip for student hostel blocks.",
    items: [
      {
        productName: "Heavy Dual-Tier Steel Bunk Bed (Hostels)",
        quantity: 50,
        specs: "78\"L × 36\"W × 66\"H • Tubular reinforced frame with safety guardrails",
        unitPriceNpr: 16500,
      },
    ],
  },
  {
    id: "rfq-203",
    quoteNumber: "B2B-2026-0091",
    organizationName: "Bir Hospital New Medical Wing",
    organizationType: "HOSPITAL_CLINIC",
    contactPerson: "Er. Rameshwor Yadav",
    designation: "Hospital Engineering Director",
    phone: "+977-9851044556",
    email: "engineering@birhospital.gov.np",
    panNumber: "300192841",
    destinationCity: "Mahabouddha, Kathmandu",
    totalUnits: 30,
    totalWeightKg: 1350,
    grossListNpr: 425000,
    discountPercent: 12,
    discountAmountNpr: 51000,
    subsidizedFreightNpr: 8500,
    netTenderNpr: 382500,
    status: "QUOTE_SENT",
    requestedDate: "2026-11-18",
    customRequirements: "Stainless steel top bedside lockers with silent magnetic latches for post-op ICU rooms.",
    items: [
      {
        productName: "Hospital Bedside Medicine Cupboard",
        quantity: 20,
        specs: "32\"H × 16\"W × 16\"D • SS-304 Top with lower lockable compartment",
        unitPriceNpr: 9500,
      },
      {
        productName: "Standard Office Steel Almirah (4-Shelf)",
        quantity: 10,
        specs: "72\"H × 36\"W × 19\"D • 20-Gauge CRCA Steel",
        unitPriceNpr: 19800,
      },
    ],
  },
];

// -------------------------------------------------------------
// INITIAL REPOSITORY OF DEALER APPLICATIONS
// -------------------------------------------------------------
export const INITIAL_ADMIN_DEALERS: AdminDealerApplication[] = [
  {
    id: "dlr-app-301",
    firmName: "Narayani Steel Traders & Display Center",
    panVatNumber: "302847591",
    legalStructure: "PVT_LTD",
    ownerName: "Gopal Prasad Khetan",
    contactPhone: "+977-9851044556",
    contactEmail: "khetan.traders@gmail.com",
    city: "Kathmandu",
    province: "Bagmati Province",
    showroomAddress: "Teku Industrial Area, Ward 12, Kathmandu",
    showroomSqFt: 2200,
    warehouseSqFt: 3500,
    unloadingRamp: "YES",
    yearsInBusiness: 18,
    currentBrandsHandled: "Local Fabricators, Featherlite, Godrej",
    initialStockBudgetNpr: 3500000,
    projectedMonthlyUnits: 40,
    creditFacilityRequested: true,
    status: "APPROVED",
    appliedDate: "2026-11-10",
    adminNotes: "Established furniture importer with dedicated Teku warehouse. Granted Tier-1 dealer margin (22%) and 30-day revolving credit.",
    assignedCreditLimitNpr: 1500000,
  },
  {
    id: "dlr-app-302",
    firmName: "Annapurna Metal & Decor Hub",
    panVatNumber: "301982475",
    legalStructure: "PROPRIETORSHIP",
    ownerName: "Tara Nath Bastola",
    contactPhone: "+977-9856023411",
    contactEmail: "bastola.annapurna@gmail.com",
    city: "Pokhara",
    province: "Gandaki Province",
    showroomAddress: "New Road, Ward 8, Pokhara",
    showroomSqFt: 1800,
    warehouseSqFt: 2400,
    unloadingRamp: "YES",
    yearsInBusiness: 12,
    currentBrandsHandled: "Nilkamal, Local Sheet fabricators",
    initialStockBudgetNpr: 2000000,
    projectedMonthlyUnits: 25,
    creditFacilityRequested: true,
    status: "SUBMITTED",
    appliedDate: "2026-11-20",
    adminNotes: "Under review. Showroom inspection scheduled for Pokhara New Road location.",
  },
  {
    id: "dlr-app-303",
    firmName: "Chitwan Metal & Wooden House",
    panVatNumber: "303491823",
    legalStructure: "PARTNERSHIP",
    ownerName: "Sunil Shrestha & Bros",
    contactPhone: "+977-9855019823",
    contactEmail: "chitwan.metal@yahoo.com",
    city: "Narayangarh / Bharatpur",
    province: "Bagmati Province",
    showroomAddress: "Lion's Chowk, Narayangarh",
    showroomSqFt: 3000,
    warehouseSqFt: 4500,
    unloadingRamp: "YES",
    yearsInBusiness: 15,
    currentBrandsHandled: "Bira Furniture, Local wooden and steel units",
    initialStockBudgetNpr: 3000000,
    projectedMonthlyUnits: 35,
    creditFacilityRequested: false,
    status: "APPROVED",
    appliedDate: "2026-11-15",
    adminNotes: "High-traffic location at Lion's Chowk Narayangarh. Exclusive dealer agreement signed for Chitwan-Nawalparasi corridor.",
    assignedCreditLimitNpr: 2000000,
  },
  {
    id: "dlr-app-304",
    firmName: "Karnali Furniture Mart",
    panVatNumber: "305102938",
    legalStructure: "PROPRIETORSHIP",
    ownerName: "Dhan Bahadur Budha",
    contactPhone: "+977-9848019283",
    contactEmail: "karnali.furniture@gmail.com",
    city: "Birendranagar / Surkhet",
    province: "Karnali Province",
    showroomAddress: "Main Bazar, Surkhet",
    showroomSqFt: 850,
    warehouseSqFt: 900,
    unloadingRamp: "RESTRICTED",
    yearsInBusiness: 3,
    currentBrandsHandled: "Plastic molded chairs, local tin almirahs",
    initialStockBudgetNpr: 800000,
    projectedMonthlyUnits: 8,
    creditFacilityRequested: true,
    status: "SUBMITTED",
    appliedDate: "2026-11-22",
    adminNotes: "Pending credit assessment. Showroom area is below the 1,200 sq ft franchise guideline.",
  },
];

// -------------------------------------------------------------
// LIVE REVENUE & FACTORY THROUGHPUT KPI METRICS
// -------------------------------------------------------------
export const ADMIN_MONTHLY_REVENUE_CHART = [
  { month: "Jestha", revenueLakhs: 84.5, units: 285, b2bOrders: 14 },
  { month: "Ashadh", revenueLakhs: 92.0, units: 310, b2bOrders: 18 },
  { month: "Shrawan", revenueLakhs: 78.2, units: 260, b2bOrders: 12 },
  { month: "Bhadra", revenueLakhs: 105.4, units: 345, b2bOrders: 22 },
  { month: "Ashwin (Dashain)", revenueLakhs: 168.0, units: 580, b2bOrders: 34 },
  { month: "Kartik (Tihar/Chhath)", revenueLakhs: 142.5, units: 490, b2bOrders: 28 },
  { month: "Mangsir (Current)", revenueLakhs: 118.8, units: 410, b2bOrders: 25 },
];

export const ADMIN_CATEGORY_SALES_CHART = [
  { name: "Household Almirahs (संसार/जानकी)", share: 48, revenueNpr: 5702400, color: "#7F1D1D" },
  { name: "Office Filing Cabinets", share: 22, revenueNpr: 2613600, color: "#334155" },
  { name: "Heavy Tijori Safes (तजोरी)", share: 18, revenueNpr: 2138400, color: "#B45309" },
  { name: "Executive Tables & Institutional", share: 12, revenueNpr: 1425600, color: "#0F766E" },
];

export const FACTORY_PRODUCTION_THROUGHPUT = [
  { stage: "CRCA Sheet Shear & Press", activeUnits: 34, capacityPercent: 92, status: "ON_SCHEDULE" },
  { stage: "7-Tank Hot Phosphating Anti-Rust", activeUnits: 28, capacityPercent: 88, status: "OPTIMAL" },
  { stage: "Electrostatic Powder Coating (200°C)", activeUnits: 26, capacityPercent: 95, status: "PEAK" },
  { stage: "Locking & 5-Year QC Inspection", activeUnits: 18, capacityPercent: 78, status: "INSPECTION" },
  { stage: "Wooden Crate Highway Truck Loading", activeUnits: 14, capacityPercent: 82, status: "DISPATCHING" },
];

export const HIGHWAY_DISPATCH_FEED = [
  {
    truckNo: "Na 5 Kha 8941",
    driver: "Hari Bahadur Thapa",
    destination: "Kathmandu Valley Hub (Teku)",
    cargo: "16x Sansaar & Janki Almirahs, 6x Tijoris",
    dispatchedTime: "Today 05:30 AM",
    currentLocation: "Hetauda Bypass (Chure Pass)",
    status: "EN_ROUTE",
  },
  {
    truckNo: "Na 6 Kha 3102",
    driver: "Manoj Chaudhary",
    destination: "Pokhara New Road Hub",
    cargo: "12x Household Almirahs, 8x Filing Cabinets",
    dispatchedTime: "Yesterday 08:00 PM",
    currentLocation: "Mugling-Abukhaireni Highway",
    status: "OUT_FOR_DELIVERY",
  },
  {
    truckNo: "Na 4 Kha 7490",
    driver: "Sanjay Shah",
    destination: "Butwal Traffic Chowk Hub",
    cargo: "10x Office Tables, 14x 4-Drawer Cabinets",
    dispatchedTime: "Today 09:15 AM",
    currentLocation: "Narayangarh Lion's Chowk Crossing",
    status: "EN_ROUTE",
  },
];
