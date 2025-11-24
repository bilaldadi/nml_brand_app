/**
 * API Services Barrel Export
 * Central export point for all API services
 */

export { default as authService } from './auth.service';
export { default as productsService } from './products.service';
export { default as offersService } from './offers.service';
export { default as apiClient } from './client';

// Export individual functions for convenience
export * from './auth.service';
export * from './products.service';
export * from './offers.service';

