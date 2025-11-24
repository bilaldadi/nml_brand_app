/**
 * Products Service
 * Handles product-related API calls
 */

import { ProductDetailResponse, ProductFilters, ProductsResponse } from '@/types/api.types';
import apiClient from './client';

const PRODUCTS_BASE_PATH = '/api/v1/supplier-app/products';

/**
 * Get all products for authenticated supplier/supplier agent
 * Supports filtering by active status, search term, and pagination
 * 
 * @param filters - Optional filters (is_active, search, pagination)
 * @returns Promise with products list
 */
export async function getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
  const params: Record<string, any> = {};

  if (filters) {
    if (filters.is_active !== undefined) {
      // Convert boolean to 0/1 for API
      params.is_active = filters.is_active === true || filters.is_active === 1 ? 1 : 0;
    }
    if (filters.search) {
      params.search = filters.search;
    }
    if (filters.per_page) {
      params.per_page = filters.per_page;
    }
    if (filters.page) {
      params.page = filters.page;
    }
  }

  const response = await apiClient.get<ProductsResponse>(
    PRODUCTS_BASE_PATH,
    { params }
  );

  return response.data;
}

/**
 * Get single product by ID
 * 
 * @param productId - Product ID
 * @returns Promise with product data
 */
export async function getProductById(productId: number): Promise<ProductDetailResponse> {
  const response = await apiClient.get<ProductDetailResponse>(
    `${PRODUCTS_BASE_PATH}/${productId}`
  );
  return response.data;
}

// Export as default object for convenience
const productsService = {
  getProducts,
  getProductById,
};

export default productsService;

