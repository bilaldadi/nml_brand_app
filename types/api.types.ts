/**
 * API Type Definitions
 * Generated from Postman collection for NML Brand App
 */

// ============================================================================
// Common Types
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

// ============================================================================
// Auth Types
// ============================================================================

export type UserType = 'supplier_agent' | 'supplier';

export type UserRole = 'admin' | 'coordinator' | 'accountant';

export interface OTPRequestPayload {
  phone: string;
  user_type: UserType;
}

export interface OTPRequestResponse {
  success: boolean;
  message: string;
  expires_at: string;
}

export interface OTPVerifyPayload {
  phone: string;
  otp: string;
  user_type: UserType;
}

export interface SupplierAgent {
  id: number;
  supplier_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: UserRole;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: SupplierAgent;
  access_token: string;
  token_type: 'Bearer';
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// ============================================================================
// Product Types
// ============================================================================

export interface SubCategory {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  sku: number | string;
  name: string;
  image_url?: string;
  cost_price: number;
  selling_price: number;
  is_active: boolean;
  sub_category: SubCategory;
  brand: Brand;
  supplier_id?: number;
  description?: string;
}

export interface ProductFilters extends PaginationParams {
  is_active?: boolean | 0 | 1;
  search?: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
  pagination: PaginationMeta;
}

export interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: Product;
}

// ============================================================================
// Selling Offer Types
// ============================================================================

export type OfferStatus = 'pending' | 'accepted' | 'rejected';

export interface City {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface OutletBranch {
  id: number;
  outlet_id: number;
  address_line1: string;
  address_line2?: string;
  city: City;
  district: District;
  latitude: number;
  longitude: number;
  is_active?: boolean;
  type?: string;
}

export interface SellingOfferProduct {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  product: {
    id: number;
    sku: string;
    name: string;
    image_url?: string;
  };
}

export interface SellingOffer {
  id: number;
  supplier_id: number;
  outlet_branch_id: number;
  outlet_branch: OutletBranch;
  status: OfferStatus;
  total_amount: number;
  products_count: number;
  notes?: string | null;
  valid_until?: string | null;
  is_expired: boolean;
  created_at: string;
  updated_at: string;
  products?: SellingOfferProduct[];
}

export interface OfferFilters {
  status?: OfferStatus;
  outlet_branch_id?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export interface CreateOfferProductPayload {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface CreateOfferPayload {
  outlet_branch_id: number;
  notes?: string;
  valid_until?: string;
  products: CreateOfferProductPayload[];
}

export interface SellingOffersResponse {
  success: boolean;
  message: string;
  data: SellingOffer[];
}

export interface SellingOfferDetailResponse {
  success: boolean;
  message: string;
  data: SellingOffer;
}

export interface CreateOfferResponse {
  success: boolean;
  message: string;
  data: SellingOffer;
}

