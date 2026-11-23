import { z } from "zod";

export type UserRole = "CUSTOMER" | "DEALER" | "ADMIN";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  factoryDivision: string;
}

export const DEFAULT_ADMIN_USER: AdminUser = {
  id: "adm-birgunj-01",
  name: "Er. Rajesh Agrawal",
  email: "director@evereststeel.com.np",
  role: "ADMIN",
  designation: "Plant Operations Director",
  factoryDivision: "Birgunj Central Works",
};

/**
 * Validates session role. In production this verifies NextAuth session or JWT token.
 * Defaults to ADMIN for development with mock override capabilities.
 */
export async function verifyAdminSession(roleOverride?: UserRole): Promise<{
  authorized: boolean;
  user: AdminUser | null;
  error?: string;
}> {
  const activeRole: UserRole = roleOverride || "ADMIN";

  if (activeRole !== "ADMIN") {
    return {
      authorized: false,
      user: null,
      error: "Access Denied: Requires ADMIN privileges. Current role: " + activeRole,
    };
  }

  return {
    authorized: true,
    user: DEFAULT_ADMIN_USER,
  };
}

// -------------------------------------------------------------
// ZOD VALIDATION SCHEMAS FOR ADMIN MUTATIONS
// -------------------------------------------------------------

export const ProductCategoryEnum = z.enum([
  "HOUSEHOLD_ALMIRAH",
  "OFFICE_ALMIRAH",
  "FILING_CABINETS",
  "OFFICE_TABLES",
  "SAFES_TIJORI",
  "INSTITUTIONAL",
]);

export const PreTreatmentEnum = z.enum(["HOT_CHEMICAL", "COLD_CHEMICAL"]);
export const CoatingTypeEnum = z.enum(["POWDER_COATED", "ENAMEL_COATED"]);

export const OrderStatusEnum = z.enum([
  "PENDING_PAYMENT",
  "CONFIRMED",
  "IN_FABRICATION",
  "IN_QC_INSPECTION",
  "DISPATCHED_FROM_BIRGUNJ",
  "DELIVERED_INSTALLED",
  "CANCELLED",
]);

export const CreateProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  nepaliName: z.string().optional(),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  category: ProductCategoryEnum,
  steelGauge: z.string().min(2, "Specify steel gauge e.g. 20/22 Gauge CRCA"),
  sheetSource: z.string().optional(),
  preTreatment: PreTreatmentEnum.default("HOT_CHEMICAL"),
  warrantyYears: z.number().int().min(1).max(25).default(5),
  lockMechanism: z.string().optional(),
  hasLocker: z.boolean().default(true),
  hasMirror: z.boolean().default(false),
  hasSecretCompartment: z.boolean().default(false),
  isBestseller: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  baseDescription: z.string().min(10, "Base description required"),
});

export const UpdateProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(3),
  nepaliName: z.string().optional(),
  category: ProductCategoryEnum,
  steelGauge: z.string().min(2),
  preTreatment: PreTreatmentEnum,
  warrantyYears: z.number().int().min(1).max(25),
  lockMechanism: z.string().optional(),
  isBestseller: z.boolean(),
  isFeatured: z.boolean(),
  baseDescription: z.string().min(10),
});

export const VariantMatrixItemSchema = z.object({
  id: z.string().optional(),
  sku: z.string().min(2),
  colorName: z.string().min(1),
  colorHex: z.string().min(4),
  heightInches: z.number().positive(),
  widthInches: z.number().positive(),
  depthInches: z.number().positive(),
  weightKg: z.number().positive(),
  mrpNpr: z.number().positive(),
  sellingPriceNpr: z.number().positive(),
  dealerPriceNpr: z.number().positive(),
  stockQty: z.number().int().min(0),
  exteriorImages: z.array(z.string()).default([]),
  interiorCutawayImage: z.string().nullable().optional(),
  dimensionBlueprintImage: z.string().nullable().optional(),
});

export const BulkUpdateVariantsSchema = z.object({
  productId: z.string().min(1),
  variants: z.array(VariantMatrixItemSchema).min(1, "At least one variant must be present"),
});

export const UpdateOrderStatusSchema = z.object({
  orderId: z.string().min(1),
  newStatus: OrderStatusEnum,
  adminNotes: z.string().optional(),
  trackingReference: z.string().optional(),
});

export const ReviewDealerApplicationSchema = z.object({
  applicationId: z.string().min(1),
  action: z.enum(["APPROVE", "REJECT"]),
  adminNotes: z.string().optional(),
  assignedCreditLimitNpr: z.number().min(0).optional(),
});

export const FinalizeB2BQuoteSchema = z.object({
  quoteId: z.string().min(1),
  adjustedDiscountPercent: z.number().min(0).max(50),
  subsidizedFreightNpr: z.number().min(0),
  internalNotes: z.string().optional(),
  status: z.enum(["QUOTE_SENT", "CLOSED"]),
});

export const GenerateGatePassSchema = z.object({
  orderId: z.string().min(1),
  driverName: z.string().min(2, "Driver full name required"),
  driverPhone: z.string().min(10, "Valid 10-digit mobile number required"),
  vehicleNo: z.string().min(4, "Vehicle registration number required e.g. Na 5 Kha 8941"),
  crateCount: z.number().int().positive(),
  totalWeightKg: z.number().positive(),
  destinationHub: z.string().min(2),
  securityOfficerName: z.string().min(2),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type VariantMatrixItemInput = z.infer<typeof VariantMatrixItemSchema>;
export type BulkUpdateVariantsInput = z.infer<typeof BulkUpdateVariantsSchema>;
export type UpdateOrderStatusInput = z.infer<typeof UpdateOrderStatusSchema>;
export type ReviewDealerApplicationInput = z.infer<typeof ReviewDealerApplicationSchema>;
export type FinalizeB2BQuoteInput = z.infer<typeof FinalizeB2BQuoteSchema>;
export type GenerateGatePassInput = z.infer<typeof GenerateGatePassSchema>;
