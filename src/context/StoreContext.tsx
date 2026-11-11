import React, { createContext, useContext, useEffect, useState } from 'react';
import { REGIONS, type RegionCode, type RegionInfo } from '../data/regions';
import { PRODUCTS, type DigitalProduct, type TvPlatform } from '../data/products';

export interface CartItem {
  product: DigitalProduct;
  quantity: number;
  platform: TvPlatform;
  macAddress: string;
}

export interface CompletedOrder {
  orderId: string;
  createdAt: string;
  email: string;
  region: RegionCode;
  paymentMethod: 'PayPal' | 'Crypto';
  paymentDetail: string;
  totalFormatted: string;
  licenseKeys: {
    key: string;
    productName: string;
    platform: TvPlatform;
    macAddress: string;
  }[];
}

interface StoreContextValue {
  region: RegionInfo;
  setRegionCode: (code: RegionCode) => void;
  cart: CartItem[];
  addToCart: (product: DigitalProduct, platform?: TvPlatform, macAddress?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (
    productId: string,
    updates: Partial<Pick<CartItem, 'quantity' | 'platform' | 'macAddress'>>,
  ) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalUSD: number;
  orders: CompletedOrder[];
  recordOrder: (order: CompletedOrder) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const REGION_STORAGE_KEY = 'ciaftech_region';
const CART_STORAGE_KEY = 'ciaftech_cart';
const ORDERS_STORAGE_KEY = 'ciaftech_orders';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [regionCode, setRegionCodeState] = useState<RegionCode>(() => {
    const saved = localStorage.getItem(REGION_STORAGE_KEY) as RegionCode | null;
    return saved && REGIONS[saved] ? saved : 'US';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as {
        productId: string;
        quantity: number;
        platform: TvPlatform;
        macAddress: string;
      }[];
      return parsed
        .map((entry) => {
          const product = PRODUCTS.find((p) => p.id === entry.productId);
          if (!product) return null;
          return {
            product,
            quantity: Math.max(1, entry.quantity),
            platform: entry.platform || 'Samsung Tizen OS',
            macAddress: entry.macAddress || '',
          };
        })
        .filter((x): x is CartItem => x !== null);
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<CompletedOrder[]>(() => {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CompletedOrder[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(REGION_STORAGE_KEY, regionCode);
  }, [regionCode]);

  useEffect(() => {
    const serialized = cart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      platform: item.platform,
      macAddress: item.macAddress,
    }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serialized));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const setRegionCode = (code: RegionCode) => setRegionCodeState(code);

  const addToCart = (
    product: DigitalProduct,
    platform: TvPlatform = 'Samsung Tizen OS',
    macAddress = '',
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1, platform, macAddress }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartItem = (
    productId: string,
    updates: Partial<Pick<CartItem, 'quantity' | 'platform' | 'macAddress'>>,
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              ...updates,
              quantity: updates.quantity !== undefined ? Math.max(1, updates.quantity) : item.quantity,
            }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const recordOrder = (order: CompletedOrder) => {
    setOrders((prev) => [order, ...prev]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalUSD = cart.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0,
  );

  return (
    <StoreContext.Provider
      value={{
        region: REGIONS[regionCode],
        setRegionCode,
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        cartCount,
        cartSubtotalUSD,
        orders,
        recordOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
}

