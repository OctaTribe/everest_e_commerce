import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SeedProduct, SeedProductVariant, SEED_SHIPPING_ZONES, SeedShippingZone, SeedComboDeal } from "@/data/seed-data";

export interface CartItem {
  id: string; // unique composite: `${productId}-${variantSku}`
  productId: string;
  productSlug: string;
  productName: string;
  variantSku: string;
  colorName: string;
  colorHex: string;
  dimensionsSummary: string;
  steelGauge: string;
  weightKg: number;
  unitPriceNpr: number;
  quantity: number;
  image: string;
  isBundle?: boolean;
}

export interface ComparisonItem {
  product: SeedProduct;
  variant: SeedProductVariant;
}

export interface UpsellItem {
  id: string;
  name: string;
  nepaliName: string;
  description: string;
  priceNpr: number;
  image: string;
}

export const AVAILABLE_UPSELLS: UpsellItem[] = [
  {
    id: "upsell-brass-padlock",
    name: "Everest Ultra 70mm Solid Brass Heavy Padlock",
    nepaliName: "७० मिमी हेभी ब्रास ताला",
    description: "Duplicate-proof computerized keys with hardened boron steel shackle. Extra security for almirahs and safes.",
    priceNpr: 850,
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "upsell-camphor-kit",
    name: "Anti-Moisture Camphor & Silica Monsoon Wardrobe Kit",
    nepaliName: "कपुर तथा मोइस्चर प्रोटेक्सन किट",
    description: "Protects high-value sarees, pashminas, and legal deeds against humidity, silverfish, and mildew during monsoon.",
    priceNpr: 450,
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "upsell-floor-anchors",
    name: "Heavy Concrete Anchor Bolts & Anti-Vibration Pads",
    nepaliName: "कङ्क्रिट भुइँ एङ्कर बोल्ट सेट",
    description: "High-tensile steel sleeve anchor bolts and high-density rubber pads to bolt tijori safes or almirahs to floors.",
    priceNpr: 650,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop"
  }
];

export interface PromoCode {
  code: string;
  type: "PERCENT" | "FIXED_DISCOUNT" | "FREIGHT_DISCOUNT";
  value: number;
  description: string;
}

interface EverestStoreState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  selectedZone: SeedShippingZone;
  appliedPromo: PromoCode | null;
  addToCart: (product: SeedProduct, variant: SeedProductVariant, quantity?: number) => void;
  addComboToCart: (combo: SeedComboDeal) => void;
  addUpsellToCart: (upsell: UpsellItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  setSelectedZone: (zone: SeedShippingZone) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Comparison Drawer
  comparisonList: ComparisonItem[];
  isComparisonOpen: boolean;
  addToCompare: (product: SeedProduct, variant: SeedProductVariant) => boolean;
  removeFromCompare: (sku: string) => void;
  clearComparison: () => void;
  setComparisonOpen: (open: boolean) => void;

  // Quick View Modal
  quickViewProduct: SeedProduct | null;
  quickViewVariant: SeedProductVariant | null;
  isQuickViewOpen: boolean;
  openQuickView: (product: SeedProduct, variant?: SeedProductVariant) => void;
  closeQuickView: () => void;

  // Instant Search
  isSearchOpen: boolean;
  searchQuery: string;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;

  // User Mode (B2C Customer vs Verified B2B Dealer Wholesale Mode)
  userRole: "CUSTOMER" | "DEALER" | "ADMIN";
  setUserRole: (role: "CUSTOMER" | "DEALER" | "ADMIN") => void;
}

export const useEverestStore = create<EverestStoreState>()(
  persist(
    (set, get) => ({
      // Initial Cart State
      cart: [],
      isCartOpen: false,
      selectedZone: SEED_SHIPPING_ZONES[0], // Birgunj Factory Hub default
      appliedPromo: null,

      addUpsellToCart: (upsell) => {
        const id = `upsell-${upsell.id}`;
        const existing = get().cart.find((item) => item.id === id);

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            isCartOpen: true,
          });
        } else {
          const upsellCartItem: CartItem = {
            id,
            productId: upsell.id,
            productSlug: upsell.id,
            productName: upsell.name,
            variantSku: `ACC-${upsell.id.toUpperCase().slice(0, 8)}`,
            colorName: "Factory Accessory",
            colorHex: "#B45309",
            dimensionsSummary: "Security & Anti-Moisture Accessory",
            steelGauge: "Solid Brass / High-Density",
            weightKg: 1.5,
            unitPriceNpr: upsell.priceNpr,
            quantity: 1,
            image: upsell.image,
            isBundle: false,
          };

          set({
            cart: [...get().cart, upsellCartItem],
            isCartOpen: true,
          });
        }
      },

      applyPromoCode: (inputCode) => {
        const clean = inputCode.trim().toUpperCase();
        if (clean === "EVEREST2039") {
          const promo: PromoCode = {
            code: "EVEREST2039",
            type: "PERCENT",
            value: 0.05, // 5% off
            description: "5% Factory Heritage Anniversary Discount",
          };
          set({ appliedPromo: promo });
          return { success: true, message: "Code EVEREST2039 applied: 5% Factory Discount!" };
        } else if (clean === "BIRGUNJDIRECT") {
          const promo: PromoCode = {
            code: "BIRGUNJDIRECT",
            type: "FREIGHT_DISCOUNT",
            value: 1000, // NPR 1000 off freight
            description: "NPR 1,000 Off Highway Freight",
          };
          set({ appliedPromo: promo });
          return { success: true, message: "Code BIRGUNJDIRECT applied: NPR 1,000 Freight Subsidy!" };
        } else if (clean === "NAMASTE") {
          const promo: PromoCode = {
            code: "NAMASTE",
            type: "FIXED_DISCOUNT",
            value: 500, // NPR 500 off
            description: "NPR 500 Welcome Voucher",
          };
          set({ appliedPromo: promo });
          return { success: true, message: "Code NAMASTE applied: NPR 500 Discount!" };
        }
        return { success: false, message: "Invalid promo code. Try EVEREST2039 or BIRGUNJDIRECT." };
      },

      removePromoCode: () => set({ appliedPromo: null }),

      addToCart: (product, variant, quantity = 1) => {
        const id = `${product.slug}-${variant.sku}`;
        const existing = get().cart.find((item) => item.id === id);

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + quantity } : item
            ),
            isCartOpen: true,
          });
        } else {
          const newItem: CartItem = {
            id,
            productId: product.slug,
            productSlug: product.slug,
            productName: product.name,
            variantSku: variant.sku,
            colorName: variant.colorName,
            colorHex: variant.colorHex,
            dimensionsSummary: `${variant.heightInches}"H × ${variant.widthInches}"W × ${variant.depthInches}"D`,
            steelGauge: product.steelGauge,
            weightKg: variant.weightKg,
            unitPriceNpr: get().userRole === "DEALER" ? variant.dealerPriceNpr : variant.sellingPriceNpr,
            quantity,
            image: variant.exteriorImages[0] || "",
          };

          set({
            cart: [...get().cart, newItem],
            isCartOpen: true,
          });
        }
      },

      addComboToCart: (combo) => {
        const id = `combo-${combo.id}`;
        const existing = get().cart.find((item) => item.id === id);

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            isCartOpen: true,
          });
        } else {
          const comboItem: CartItem = {
            id,
            productId: combo.id,
            productSlug: combo.productSlugs[0] || "sansaar-model-almirah",
            productName: `${combo.title} (${combo.nepaliTitle})`,
            variantSku: `COMBO-${combo.id.toUpperCase().slice(0, 8)}`,
            colorName: "Curated Combo Suite",
            colorHex: "#B45309",
            dimensionsSummary: "Multi-Unit Bundled Setup",
            steelGauge: "Prime Heavy CRCA Steel",
            weightKg: 260, // Estimated bundled weight
            unitPriceNpr: combo.comboPriceNpr,
            quantity: 1,
            image: combo.image,
            isBundle: true,
          };

          set({
            cart: [...get().cart, comboItem],
            isCartOpen: true,
          });
        }
      },

      removeFromCart: (cartItemId) => {
        set({
          cart: get().cart.filter((item) => item.id !== cartItemId),
        });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),
      setCartOpen: (open) => set({ isCartOpen: open }),
      setSelectedZone: (zone) => set({ selectedZone: zone }),

      // Comparison Drawer
      comparisonList: [],
      isComparisonOpen: false,

      addToCompare: (product, variant) => {
        const currentList = get().comparisonList;
        if (currentList.some((item) => item.variant.sku === variant.sku)) {
          return false; // already present
        }
        if (currentList.length >= 4) {
          return false; // max 4 items
        }
        set({
          comparisonList: [...currentList, { product, variant }],
          isComparisonOpen: true,
        });
        return true;
      },

      removeFromCompare: (sku) => {
        set({
          comparisonList: get().comparisonList.filter((item) => item.variant.sku !== sku),
        });
      },

      clearComparison: () => set({ comparisonList: [] }),
      setComparisonOpen: (open) => set({ isComparisonOpen: open }),

      // Quick View Modal
      quickViewProduct: null,
      quickViewVariant: null,
      isQuickViewOpen: false,

      openQuickView: (product, variant) => {
        set({
          quickViewProduct: product,
          quickViewVariant: variant || product.variants[0],
          isQuickViewOpen: true,
        });
      },

      closeQuickView: () => {
        set({
          isQuickViewOpen: false,
          quickViewProduct: null,
          quickViewVariant: null,
        });
      },

      // Instant Search
      isSearchOpen: false,
      searchQuery: "",
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      // User Mode
      userRole: "CUSTOMER",
      setUserRole: (role) => set({ userRole: role }),
    }),
    {
      name: "everest_steel_store_v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        selectedZone: state.selectedZone,
        comparisonList: state.comparisonList,
        userRole: state.userRole,
        appliedPromo: state.appliedPromo,
      }),
    }
  )
);
