/**
 * Offer Context
 * Manages offer state across screens
 */

import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface Product {
  id: string;
  name: string;
  emoji: string;
}

interface OfferContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  clearProducts: () => void;
  outletId: string | null;
  setOutletId: (id: string) => void;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export const OfferProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [outletId, setOutletId] = useState<string | null>(null);

  // Memoize functions to prevent recreation on every render
  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, newProduct]);
  }, []);

  const clearProducts = useCallback(() => {
    setProducts([]);
    setOutletId(null);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      products,
      addProduct,
      clearProducts,
      outletId,
      setOutletId,
    }),
    [products, addProduct, clearProducts, outletId]
  );

  return (
    <OfferContext.Provider value={value}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOffer = () => {
  const context = useContext(OfferContext);
  if (context === undefined) {
    throw new Error('useOffer must be used within an OfferProvider');
  }
  return context;
};

