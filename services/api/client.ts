/**
 * API Client
 * Axios instance with interceptors and base configuration
 */

import { ApiError } from '@/types/api.types';
import { tokenManager } from '@/utils/tokenManager';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Base URL for API requests
const BASE_URL = 'https://backend.nmlapp.com';

/**
 * Create axios instance with base configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request interceptor
 * Adds authentication token to requests if available
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles common response scenarios and errors
 */
apiClient.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Handle 401 Unauthorized - clear token
    if (error.response?.status === 401) {
      tokenManager.clearToken();
    }

    // Return a structured error
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    // Network or other errors
    const apiError: ApiError = {
      success: false,
      message: error.message || 'An unexpected error occurred',
    };

    return Promise.reject(apiError);
  }
);

export default apiClient;
export { BASE_URL };

