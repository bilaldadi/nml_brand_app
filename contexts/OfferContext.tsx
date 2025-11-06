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

export type OfferStatus = 'accepted' | 'processing' | 'no_offers';

export interface SubmittedOffer {
  id: string;
  outletName: string;
  outletLocation: string;
  outletNeighborhood: string;
  products: Product[];
  status: OfferStatus;
  createdAt: Date;
  totalPrice: number;
  totalQuantity: number;
}

interface OfferContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  clearProducts: () => void;
  outletId: string | null;
  setOutletId: (id: string) => void;
  submittedOffers: SubmittedOffer[];
  addSubmittedOffer: (offer: Omit<SubmittedOffer, 'id' | 'createdAt'>) => void;
  updateOfferStatus: (offerId: string, status: OfferStatus) => void;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

// Mock initial offers for testing
const mockInitialOffers: SubmittedOffer[] = [
  {
    id: '1',
    outletName: 'بنده',
    outletLocation: 'حي الروضة، شارع الأمير',
    outletNeighborhood: 'الروضة',
    products: [
      { id: '1', name: 'كيك المربل', emoji: '🍰', price: 25.50, quantity: 10, commission: 2 },
      { id: '2', name: 'تشيز كيك', emoji: '🎂', price: 30.00, quantity: 5, commission: 2.5 },
    ],
    status: 'accepted',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    totalPrice: 405.00,
    totalQuantity: 15,
  },
  {
    id: '2',
    outletName: 'العثيم',
    outletLocation: 'حي النزهة، شارع التحلية',
    outletNeighborhood: 'النزهة',
    products: [
      { id: '3', name: 'دونات', emoji: '🍩', price: 15.00, quantity: 20, commission: 1.5 },
      { id: '4', name: 'كرواسون', emoji: '🥐', price: 12.00, quantity: 15, commission: 2 },
    ],
    status: 'processing',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    totalPrice: 480.00,
    totalQuantity: 35,
  },
  {
    id: '3',
    outletName: 'الدانوب',
    outletLocation: 'حي الصفا، شارع الكورنيش',
    outletNeighborhood: 'الصفا',
    products: [
      { id: '5', name: 'بسكويت الشوكولاتة', emoji: '🍪', price: 18.50, quantity: 30, commission: 2 },
    ],
    status: 'processing',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    totalPrice: 555.00,
    totalQuantity: 30,
  },
  {
    id: '4',
    outletName: 'بازار',
    outletLocation: 'حي الزهراء، شارع الملك فهد',
    outletNeighborhood: 'الزهراء',
    products: [
      { id: '6', name: 'كيك الفانيليا', emoji: '🧁', price: 22.00, quantity: 12, commission: 1.8 },
      { id: '7', name: 'كيك المربل', emoji: '🍰', price: 25.50, quantity: 8, commission: 2 },
    ],
    status: 'no_offers',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    totalPrice: 456.00,
    totalQuantity: 20,
  },
  {
    id: '5',
    outletName: 'كارفور',
    outletLocation: 'حي الحمراء، شارع الأمير سلطان',
    outletNeighborhood: 'الحمراء',
    products: [
      { id: '8', name: 'تشيز كيك', emoji: '🎂', price: 30.00, quantity: 10, commission: 2.5 },
      { id: '9', name: 'دونات', emoji: '🍩', price: 15.00, quantity: 25, commission: 1.5 },
      { id: '10', name: 'كرواسون', emoji: '🥐', price: 12.00, quantity: 20, commission: 2 },
    ],
    status: 'accepted',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    totalPrice: 900.00,
    totalQuantity: 55,
  },
];

export const OfferProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [outletId, setOutletId] = useState<string | null>(null);
  const [submittedOffers, setSubmittedOffers] = useState<SubmittedOffer[]>(mockInitialOffers);

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

  const addSubmittedOffer = useCallback((offer: Omit<SubmittedOffer, 'id' | 'createdAt'>) => {
    const newOffer: SubmittedOffer = {
      ...offer,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setSubmittedOffers((prev) => [newOffer, ...prev]);
  }, []);

  const updateOfferStatus = useCallback((offerId: string, status: OfferStatus) => {
    setSubmittedOffers((prev) =>
      prev.map((offer) =>
        offer.id === offerId ? { ...offer, status } : offer
      )
    );
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
      submittedOffers,
      addSubmittedOffer,
      updateOfferStatus,
    }),
    [products, addProduct, updateProduct, removeProduct, clearProducts, outletId, submittedOffers, addSubmittedOffer, updateOfferStatus]
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

