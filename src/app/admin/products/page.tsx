"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Boxes,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Save,
  Image as ImageIcon,
  ShieldCheck,
  Flame,
  ArrowRight,
  Eye,
  X,
  Layers
} from "lucide-react";
import { SEED_PRODUCTS, SeedProduct, SeedProductVariant } from "@/data/seed-data";
import { formatNPR } from "@/lib/formatters";
import {
  updateProductAction,
  createProductAction,
  bulkUpdateVariantsAction,
} from "@/lib/actions/admin-actions";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<SeedProduct[]>(SEED_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<SeedProduct | null>(SEED_PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Create Product Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    nepaliName: "",
    slug: "",
    category: "HOUSEHOLD_ALMIRAH" as any,
    steelGauge: "20/22 Gauge Heavy CRCA Steel",
    sheetSource: "Tata Steel Prime CRCA",
    preTreatment: "HOT_CHEMICAL" as any,
    warrantyYears: 5,
    lockMechanism: "Everest Heavy 6-Lever Brass Deadbolt",
    hasLocker: true,
    hasMirror: false,
    hasSecretCompartment: false,
    isBestseller: false,
    isFeatured: true,
    baseDescription: "",
  });

  // Variant Matrix In-Memory Edit State for Selected Product
  const [variantMatrix, setVariantMatrix] = useState<SeedProductVariant[]>(
    SEED_PRODUCTS[0]?.variants || []
  );

  const handleSelectProduct = (prod: SeedProduct) => {
    setSelectedProduct(prod);
    setVariantMatrix([...prod.variants]);
    setFeedbackMessage(null);
  };

  const handleVariantFieldChange = (
    variantSku: string,
    field: keyof SeedProductVariant,
    value: any
  ) => {
    setVariantMatrix((prev) =>
      prev.map((v) => (v.sku === variantSku ? { ...v, [field]: value } : v))
    );
  };

  const handleSaveVariantMatrix = async () => {
    if (!selectedProduct) return;
    setIsSaving(true);
    setFeedbackMessage(null);

    const payload = {
      productId: selectedProduct.slug,
      variants: variantMatrix.map((v) => ({
        sku: v.sku,
        colorName: v.colorName,
        colorHex: v.colorHex,
        heightInches: v.heightInches,
        widthInches: v.widthInches,
        depthInches: v.depthInches,
        weightKg: v.weightKg,
        mrpNpr: Number(v.mrpNpr),
        sellingPriceNpr: Number(v.sellingPriceNpr),
        dealerPriceNpr: Number(v.dealerPriceNpr),
        stockQty: Number(v.stockQty),
        exteriorImages: v.exteriorImages || [],
        interiorCutawayImage: v.interiorCutawayImage || null,
        dimensionBlueprintImage: v.dimensionBlueprintImage || null,
      })),
    };

    const res = await bulkUpdateVariantsAction(payload);
    setIsSaving(false);

    if (res.success) {
      setFeedbackMessage({
        type: "success",
        text: `Successfully synced pricing & stock across all ${variantMatrix.length} variants!`,
      });
      // Update local products state
      setProducts((prev) =>
        prev.map((p) =>
          p.slug === selectedProduct.slug ? { ...p, variants: [...variantMatrix] } : p
        )
      );
    } else {
      setFeedbackMessage({
        type: "error",
        text: res.error || "Failed to save variant matrix.",
      });
    }
  };

  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const res = await createProductAction(newProductData);
    setIsSaving(false);

    if (res.success) {
      alert("New Everest Steel furniture model cataloged successfully!");
      setShowCreateModal(false);
      // Reset form
      setNewProductData({
        name: "",
        nepaliName: "",
        slug: "",
        category: "HOUSEHOLD_ALMIRAH",
        steelGauge: "20/22 Gauge Heavy CRCA Steel",
        sheetSource: "Tata Steel Prime CRCA",
        preTreatment: "HOT_CHEMICAL",
        warrantyYears: 5,
        lockMechanism: "Everest Heavy 6-Lever Brass Deadbolt",
        hasLocker: true,
        hasMirror: false,
        hasSecretCompartment: false,
        isBestseller: false,
        isFeatured: true,
        baseDescription: "",
      });
    } else {
      alert(res.error || "Error cataloging product.");
    }
  };

  // Filter products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "ALL" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase">
            <Boxes className="w-4 h-4 text-amber-500" />
            <span>Industrial Inventory &amp; Spec Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Product &amp; Variant Matrix Manager
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Bulk-update retail NPR prices, wholesale dealer rates, stock levels, and cutaway blueprints without duplicate SKU drift.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition-all border border-red-700/60"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Catalog New Product</span>
        </button>
      </div>

      {/* 2-COLUMN WORKSPACE: LEFT 4 COLS PRODUCT LIST, RIGHT 8 COLS VARIANT MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT 4 COLS: MODEL SELECTOR LIST */}
        <div className="lg:col-span-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-white font-heading">
              Manufacturing Line Models ({filteredProducts.length})
            </h3>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search model name or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 outline-none focus:border-amber-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1 text-[10px]">
              {["ALL", "HOUSEHOLD_ALMIRAH", "OFFICE_ALMIRAH", "FILING_CABINETS", "SAFES_TIJORI"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-md border font-mono transition-colors ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {cat === "ALL" ? "All" : cat.replace(/_/g, " ").split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Product Items */}
          <div className="divide-y divide-slate-800/80 max-h-[580px] overflow-y-auto pr-1 space-y-1">
            {filteredProducts.map((prod) => {
              const isSelected = selectedProduct?.slug === prod.slug;
              return (
                <div
                  key={prod.slug}
                  onClick={() => handleSelectProduct(prod)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-950 border border-amber-500/60 shadow-md ring-1 ring-amber-500/30"
                      : "hover:bg-slate-950/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-white truncate">{prod.name}</div>
                      {prod.nepaliName && (
                        <div className="text-[10px] text-amber-500/90 font-medium">{prod.nepaliName}</div>
                      )}
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {prod.variants.length} Variants • {prod.steelGauge.split(" ")[0]}
                      </div>
                    </div>

                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                      {prod.category.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT 8 COLS: BULK VARIANT SPREADSHEET MATRIX */}
        <div className="lg:col-span-8 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
          
          {selectedProduct ? (
            <>
              {/* Product Header & Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-lg text-white">
                      {selectedProduct.name}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                      {selectedProduct.steelGauge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pre-treatment: <strong>{selectedProduct.preTreatment}</strong> (7-Tank Hot Chemical) • Warranty: <strong>{selectedProduct.warrantyYears} Years</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveVariantMatrix}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-lg transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? "Saving..." : "Save Variant Matrix"}</span>
                  </button>
                </div>
              </div>

              {/* Feedback Alert */}
              {feedbackMessage && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    feedbackMessage.type === "success"
                      ? "bg-emerald-950/60 border-emerald-500 text-emerald-300"
                      : "bg-red-950/60 border-red-500 text-red-300"
                  }`}
                >
                  {feedbackMessage.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span>{feedbackMessage.text}</span>
                </div>
              )}

              {/* Interactive Variant Spreadsheet Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                      <th className="py-2.5 px-2">Color / Swatch</th>
                      <th className="py-2.5 px-2">SKU Code</th>
                      <th className="py-2.5 px-2">Dimensions &amp; Wt</th>
                      <th className="py-2.5 px-2">Selling Price (रू)</th>
                      <th className="py-2.5 px-2">Dealer Wholesale (रू)</th>
                      <th className="py-2.5 px-2">Stock Qty</th>
                      <th className="py-2.5 px-2 text-center">Media Assets</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {variantMatrix.map((variant) => (
                      <tr key={variant.sku} className="hover:bg-slate-950/40">
                        
                        {/* Swatch & Color */}
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded-full border border-slate-700 shrink-0 shadow-sm"
                              style={{ backgroundColor: variant.colorHex }}
                            ></span>
                            <span className="font-bold text-white whitespace-nowrap">{variant.colorName}</span>
                          </div>
                        </td>

                        {/* SKU */}
                        <td className="py-3 px-2 font-mono text-[11px] text-slate-400">
                          {variant.sku}
                        </td>

                        {/* Dimensions & Weight */}
                        <td className="py-3 px-2 text-[11px] font-mono text-slate-300 whitespace-nowrap">
                          {variant.heightInches}&quot; × {variant.widthInches}&quot; ({variant.weightKg}kg)
                        </td>

                        {/* D2C Selling Price NPR Input */}
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={variant.sellingPriceNpr}
                            onChange={(e) =>
                              handleVariantFieldChange(variant.sku, "sellingPriceNpr", Number(e.target.value))
                            }
                            className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-amber-400 font-mono font-bold outline-none focus:border-amber-500"
                          />
                        </td>

                        {/* B2B Dealer Wholesale Price NPR Input */}
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={variant.dealerPriceNpr}
                            onChange={(e) =>
                              handleVariantFieldChange(variant.sku, "dealerPriceNpr", Number(e.target.value))
                            }
                            className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-emerald-400 font-mono font-bold outline-none focus:border-emerald-500"
                          />
                        </td>

                        {/* Stock Qty Input */}
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min={0}
                              value={variant.stockQty}
                              onChange={(e) =>
                                handleVariantFieldChange(variant.sku, "stockQty", Number(e.target.value))
                              }
                              className={`w-14 bg-slate-950 border rounded-lg px-2 py-1 text-xs font-mono font-bold outline-none ${
                                variant.stockQty < 5
                                  ? "border-red-500 text-red-400"
                                  : variant.stockQty < 10
                                  ? "border-amber-500 text-amber-400"
                                  : "border-slate-700 text-white"
                              }`}
                            />
                            <span className="text-[10px] text-slate-500">pcs</span>
                          </div>
                        </td>

                        {/* Technical Blueprint & Cutaway Image Links */}
                        <td className="py-3 px-2 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <span
                              title={variant.interiorCutawayImage ? "Cutaway blueprint assigned" : "No cutaway"}
                              className={`w-6 h-6 rounded flex items-center justify-center text-[10px] ${
                                variant.interiorCutawayImage
                                  ? "bg-amber-950 text-amber-400 border border-amber-800"
                                  : "bg-slate-800 text-slate-500"
                              }`}
                            >
                              <Layers className="w-3.5 h-3.5" />
                            </span>

                            <span
                              title={variant.dimensionBlueprintImage ? "Scale blueprint assigned" : "No blueprint"}
                              className={`w-6 h-6 rounded flex items-center justify-center text-[10px] ${
                                variant.dimensionBlueprintImage
                                  ? "bg-blue-950 text-blue-400 border border-blue-800"
                                  : "bg-slate-800 text-slate-500"
                              }`}
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Instructions */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>💡 Wholesale rates apply automatically to verified accounts with role <strong>DEALER</strong>.</span>
                <span className="font-mono text-amber-400 font-semibold">{variantMatrix.length} Variants Loaded</span>
              </div>
            </>
          ) : (
            <div className="py-20 text-center text-slate-500 font-mono text-xs">
              Select a model from the left column to edit its variant matrix.
            </div>
          )}

        </div>

      </div>

      {/* CREATE NEW PRODUCT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <h3 className="font-bold text-lg text-white font-heading">
                  Catalog New Everest Steel Model
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Register a new manufacturing blueprint into the factory database
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Model Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sansaar Model 78&quot;"
                    value={newProductData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                      setNewProductData({ ...newProductData, name, slug });
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Model Name (Nepali)</label>
                  <input
                    type="text"
                    placeholder="e.g. संसार मोडल स्टील दराज"
                    value={newProductData.nepaliName}
                    onChange={(e) => setNewProductData({ ...newProductData, nepaliName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Product Category *</label>
                  <select
                    value={newProductData.category}
                    onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                  >
                    <option value="HOUSEHOLD_ALMIRAH">Household Almirah (घरको दराज)</option>
                    <option value="OFFICE_ALMIRAH">Office Almirah (अफिस दराज)</option>
                    <option value="FILING_CABINETS">Filing Cabinets (फाइलिङ क्याबिनेट)</option>
                    <option value="OFFICE_TABLES">Office Tables (अफिस टेबल)</option>
                    <option value="SAFES_TIJORI">Safes Tijori (तजोरी)</option>
                    <option value="INSTITUTIONAL">Institutional / Hostel</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Steel Gauge Specification *</label>
                  <input
                    type="text"
                    required
                    value={newProductData.steelGauge}
                    onChange={(e) => setNewProductData({ ...newProductData, steelGauge: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Pre-Treatment Anti-Rust Process *</label>
                  <select
                    value={newProductData.preTreatment}
                    onChange={(e) => setNewProductData({ ...newProductData, preTreatment: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                  >
                    <option value="HOT_CHEMICAL">7-Tank Hot Phosphate Chemical Immersion (IS:6005)</option>
                    <option value="COLD_CHEMICAL">Standard Cold Phosphating Wash</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Warranty Years (Default 5) *</label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={newProductData.warrantyYears}
                    onChange={(e) => setNewProductData({ ...newProductData, warrantyYears: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Technical Base Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail CRCA steel sheets, interior compartment layouts, brass lever mechanism, secret lockers..."
                  value={newProductData.baseDescription}
                  onChange={(e) => setNewProductData({ ...newProductData, baseDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md"
                >
                  {isSaving ? "Saving..." : "Catalog Model"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
