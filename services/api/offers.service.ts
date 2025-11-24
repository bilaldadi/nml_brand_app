/**
 * Selling Offers Service
 * Handles selling offer-related API calls
 */

import {
    CreateOfferPayload,
    CreateOfferResponse,
    OfferFilters,
    SellingOfferDetailResponse,
    SellingOffersResponse,
} from '@/types/api.types';
import apiClient from './client';

const OFFERS_BASE_PATH = '/api/v1/supplier-app/selling-offers';

/**
 * Get all selling offers for authenticated supplier
 * Supports filtering by status, outlet branch, and geographic location
 * 
 * @param filters - Optional filters (status, outlet_branch_id, geo-location)
 * @returns Promise with selling offers list
 */
export async function getSellingOffers(
  filters?: OfferFilters
): Promise<SellingOffersResponse> {
  const params: Record<string, any> = {};

  if (filters) {
    if (filters.status) {
      params.status = filters.status;
    }
    if (filters.outlet_branch_id) {
      params.outlet_branch_id = filters.outlet_branch_id;
    }
    // Geo-filtering parameters (all three required together)
    if (filters.latitude !== undefined) {
      params.latitude = filters.latitude;
    }
    if (filters.longitude !== undefined) {
      params.longitude = filters.longitude;
    }
    if (filters.radius !== undefined) {
      params.radius = filters.radius;
    }
  }

  const response = await apiClient.get<SellingOffersResponse>(
    OFFERS_BASE_PATH,
    { params }
  );

  return response.data;
}

/**
 * Get detailed information about a specific selling offer
 * Includes outlet branch details and all products
 * 
 * @param offerId - Selling offer ID
 * @returns Promise with selling offer details
 */
export async function getSellingOfferDetails(
  offerId: number
): Promise<SellingOfferDetailResponse> {
  const response = await apiClient.get<SellingOfferDetailResponse>(
    `${OFFERS_BASE_PATH}/${offerId}`
  );

  return response.data;
}

/**
 * Create a new selling offer
 * 
 * @param payload - Offer data including outlet branch, products, notes, etc.
 * @returns Promise with created offer details
 */
export async function createSellingOffer(
  payload: CreateOfferPayload
): Promise<CreateOfferResponse> {
  const response = await apiClient.post<CreateOfferResponse>(
    OFFERS_BASE_PATH,
    payload
  );

  return response.data;
}

// Export as default object for convenience
const offersService = {
  getSellingOffers,
  getSellingOfferDetails,
  createSellingOffer,
};

export default offersService;

