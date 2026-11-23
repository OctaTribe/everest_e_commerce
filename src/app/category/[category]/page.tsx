import { CategoryView } from "./CategoryView";
import type { Metadata } from "next";

export function generateStaticParams() {
  return [
    { category: "household" },
    { category: "office" },
    { category: "filing" },
    { category: "tables" },
    { category: "safes" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category.toUpperCase()} Steel Furniture | Everest Steel Furniture Udyog (Birgunj)`,
    description: `Direct factory catalog for ${category} heavy steel furniture. 40+ years heritage, 7-tank hot phosphate anti-rust treatment, 5-year warranty.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <CategoryView categorySlug={category} />;
}
