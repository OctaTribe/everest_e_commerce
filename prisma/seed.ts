import { PrismaClient } from "@prisma/client";
import {
  SEED_PRODUCTS,
  SEED_SHIPPING_ZONES,
  DEMO_DEALER_APPLICATIONS,
  DEMO_BULK_QUOTES
} from "../src/data/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("=============================================================");
  console.log("🏔️ Seeding Everest Steel Furniture Udyog Database (Birgunj)");
  console.log("=============================================================");

  // 1. Clean existing records in reverse dependency order
  console.log("🧹 Clearing old data...");
  await prisma.paymentTransaction.deleteMany().catch(() => {});
  await prisma.orderItem.deleteMany().catch(() => {});
  await prisma.order.deleteMany().catch(() => {});
  await prisma.bulkQuoteItem.deleteMany().catch(() => {});
  await prisma.bulkQuoteRequest.deleteMany().catch(() => {});
  await prisma.dealerApplication.deleteMany().catch(() => {});
  await prisma.productVariant.deleteMany().catch(() => {});
  await prisma.product.deleteMany().catch(() => {});
  await prisma.shippingZone.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});

  // 2. Seed Default Administrative & Demo Accounts
  console.log("👤 Creating administrative and dealer user accounts...");
  const adminUser = await prisma.user.create({
    data: {
      name: "Everest Plant Manager (Birgunj HQ)",
      email: "factory@evereststeel.com.np",
      phone: "+977-9855012345",
      role: "ADMIN",
      isVerified: true
    }
  });

  const dealerUser = await prisma.user.create({
    data: {
      name: "Binod Kumar Shrestha",
      email: "dealer.narayani@evereststeel.com.np",
      phone: "+977-9855021489",
      role: "DEALER",
      isVerified: true
    }
  });

  const customerUser = await prisma.user.create({
    data: {
      name: "Suman Adhikari",
      email: "suman.adhikari@gmail.com",
      phone: "+977-9841398201",
      role: "CUSTOMER",
      isVerified: true
    }
  });

  // 3. Seed Shipping Zones
  console.log("🚚 Seeding Nepal freight shipping zones (Birgunj dispatch base)...");
  for (const zone of SEED_SHIPPING_ZONES) {
    await prisma.shippingZone.create({
      data: zone
    });
  }

  // 4. Seed Products and Normalized Product Variants
  console.log("🗄️ Seeding authentic Everest Steel products & variants...");
  for (const prod of SEED_PRODUCTS) {
    const createdProduct = await prisma.product.create({
      data: {
        slug: prod.slug,
        name: prod.name,
        nepaliName: prod.nepaliName,
        tagline: prod.tagline,
        baseDescription: prod.baseDescription,
        category: prod.category,
        warrantyYears: prod.warrantyYears,
        preTreatment: prod.preTreatment,
        steelGauge: prod.steelGauge,
        sheetSource: prod.sheetSource,
        hasLocker: prod.hasLocker,
        hasMirror: prod.hasMirror,
        hasSecretCompartment: prod.hasSecretCompartment,
        lockMechanism: prod.lockMechanism,
        isBestseller: prod.isBestseller,
        isFeatured: prod.isFeatured,
        variants: {
          create: prod.variants.map((v) => ({
            sku: v.sku,
            coatingType: v.coatingType,
            colorName: v.colorName,
            colorHex: v.colorHex,
            heightInches: v.heightInches,
            widthInches: v.widthInches,
            depthInches: v.depthInches,
            weightKg: v.weightKg,
            mrpNpr: v.mrpNpr,
            sellingPriceNpr: v.sellingPriceNpr,
            dealerPriceNpr: v.dealerPriceNpr,
            stockQty: v.stockQty,
            isPopular: v.isPopular ?? false,
            exteriorImages: v.exteriorImages,
            interiorCutawayImage: v.interiorCutawayImage,
            dimensionBlueprintImage: v.dimensionBlueprintImage
          }))
        }
      }
    });
    console.log(`  ✓ Product created: ${createdProduct.name} (${prod.variants.length} variants)`);
  }

  // 5. Seed Dealer Application
  console.log("🏢 Seeding verified B2B dealer profiles...");
  for (const app of DEMO_DEALER_APPLICATIONS) {
    await prisma.dealerApplication.create({
      data: {
        ...app,
        userId: app.contactEmail.includes("narayani") ? dealerUser.id : undefined
      }
    });
  }

  // 6. Seed Bulk Institutional Quote Requests
  console.log("📑 Seeding bulk institutional quote requests...");
  for (const quote of DEMO_BULK_QUOTES) {
    await prisma.bulkQuoteRequest.create({
      data: {
        quoteNumber: quote.quoteNumber,
        organizationName: quote.organizationName,
        organizationType: quote.organizationType,
        contactPerson: quote.contactPerson,
        designation: quote.designation,
        contactPhone: quote.contactPhone,
        contactEmail: quote.contactEmail,
        deliveryCity: quote.deliveryCity,
        deliveryAddress: quote.deliveryAddress,
        customRequirements: quote.customRequirements,
        status: quote.status,
        items: {
          create: quote.items.map((item) => ({
            productName: item.productName,
            quantity: item.quantity,
            preferredGauge: item.preferredGauge,
            preferredCoating: item.preferredCoating,
            notes: item.notes
          }))
        }
      }
    });
  }

  console.log("=============================================================");
  console.log("✅ Everest Steel Furniture database seeded successfully!");
  console.log("=============================================================");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
