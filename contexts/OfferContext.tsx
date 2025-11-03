/**
 * Offer Context
 * Manages offer state across screens
 */

import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface Product {
  id: string;
  name: string;
  emoji: string;
  price?: number;
  quantity?: number;
  commission?: number;
}

interface OfferContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
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

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
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
      updateProduct,
      removeProduct,
      clearProducts,
      outletId,
      setOutletId,
    }),
    [products, addProduct, updateProduct, removeProduct, clearProducts, outletId]
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

