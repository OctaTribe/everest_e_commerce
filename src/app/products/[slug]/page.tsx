import { SEED_PRODUCTS } from "@/data/seed-data";
import { ProductDetailView } from "./ProductDetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return SEED_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = SEED_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Everest Steel Furniture Udyog",
    };
  }

  return {
    title: `${product.name} (${product.nepaliName}) | Everest Steel Furniture (Birgunj)`,
    description: `${product.tagline}. ${product.steelGauge}, 7-tank hot chemical anti-rust immersion, 5-year warranty. Delivered direct from Birgunj works.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = SEED_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
