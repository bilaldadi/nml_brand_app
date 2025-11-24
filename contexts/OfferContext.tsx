/**
 * Offer Context
 * Manages offer state across screens with API integration
 */

import { offersService } from '@/services/api';
import { OfferFilters, SellingOffer } from '@/types/api.types';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface Product {
  id: string;
  name: string;
  emoji: string;
  price?: number;
  quantity?: number;
  commission?: number;
}

export type OfferStatus = 'pending' | 'accepted' | 'rejected';

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
  fetchOffers: (filters?: OfferFilters) => Promise<void>;
  isLoadingOffers: boolean;
  offersError: string | null;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

/**
 * Convert API SellingOffer to local SubmittedOffer format
 */
function convertApiOfferToSubmittedOffer(apiOffer: SellingOffer): SubmittedOffer {
  return {
    id: apiOffer.id.toString(),
    outletName: apiOffer.outlet_branch.address_line1 || 'Unknown Outlet',
    outletLocation: `${apiOffer.outlet_branch.city.name}, ${apiOffer.outlet_branch.district.name}`,
    outletNeighborhood: apiOffer.outlet_branch.district.name,
    products: apiOffer.products?.map((p) => ({
      id: p.id.toString(),
      name: p.product.name,
      emoji: '🍰', // Default emoji, can be mapped based on product category
      price: p.unit_price,
      quantity: p.quantity,
      commission: 0, // Not provided by API
    })) || [],
    status: apiOffer.status as OfferStatus,
    createdAt: new Date(apiOffer.created_at),
    totalPrice: apiOffer.total_amount,
    totalQuantity: apiOffer.products?.reduce((sum, p) => sum + p.quantity, 0) || 0,
  };
}

export const OfferProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [outletId, setOutletId] = useState<string | null>(null);
  const [submittedOffers, setSubmittedOffers] = useState<SubmittedOffer[]>([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  const [offersError, setOffersError] = useState<string | null>(null);

  // Fetch offers from API
  const fetchOffers = useCallback(async (filters?: OfferFilters) => {
    setIsLoadingOffers(true);
    setOffersError(null);

    try {
      const response = await offersService.getSellingOffers(filters);
      
      if (response.success && response.data) {
        const convertedOffers = response.data.map(convertApiOfferToSubmittedOffer);
        setSubmittedOffers(convertedOffers);
      } else {
        setOffersError(response.message || 'Failed to fetch offers');
      }
    } catch (error: any) {
      setOffersError(error.message || 'An error occurred while fetching offers');
      setSubmittedOffers([]);
    } finally {
      setIsLoadingOffers(false);
    }
  }, []);

  // Load offers on mount
  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

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
      fetchOffers,
      isLoadingOffers,
      offersError,
    }),
    [
      products,
      addProduct,
      updateProduct,
      removeProduct,
      clearProducts,
      outletId,
      submittedOffers,
      addSubmittedOffer,
      updateOfferStatus,
      fetchOffers,
      isLoadingOffers,
      offersError,
    ]
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
