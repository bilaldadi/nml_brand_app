/**
 * Auth Service
 * Handles authentication API calls (OTP request/verify/logout)
 */

import apiClient from './client';
import {
  OTPRequestPayload,
  OTPRequestResponse,
  OTPVerifyPayload,
  AuthResponse,
  LogoutResponse,
  UserType,
} from '@/types/api.types';
import { formatPhoneForAPI } from '@/utils/phoneFormatter';

const AUTH_BASE_PATH = '/api/v1/supplier-app/auth';

/**
 * Request OTP for supplier agent authentication
 * 
 * @param phone - Phone number (will be formatted to 966XXXXXXXXX)
 * @param userType - Type of user (default: 'supplier_agent')
 * @returns Promise with OTP request response
 */
export async function requestOTP(
  phone: string,
  userType: UserType = 'supplier_agent'
): Promise<OTPRequestResponse> {
  const formattedPhone = formatPhoneForAPI(phone);
  
  const payload: OTPRequestPayload = {
    phone: formattedPhone,
    user_type: userType,
  };

  const response = await apiClient.post<OTPRequestResponse>(
    `${AUTH_BASE_PATH}/request-otp`,
    payload
  );

  return response.data;
}

/**
 * Verify OTP and receive access token
 * 
 * @param phone - Phone number (will be formatted to 966XXXXXXXXX)
 * @param otp - OTP code (use '1111' in debug mode)
 * @param userType - Type of user (default: 'supplier_agent')
 * @returns Promise with authentication response including token and user data
 */
export async function verifyOTP(
  phone: string,
  otp: string,
  userType: UserType = 'supplier_agent'
): Promise<AuthResponse> {
  const formattedPhone = formatPhoneForAPI(phone);
  
  const payload: OTPVerifyPayload = {
    phone: formattedPhone,
    otp,
    user_type: userType,
  };

  const response = await apiClient.post<AuthResponse>(
    `${AUTH_BASE_PATH}/verify-otp`,
    payload
  );

  return response.data;
}

/**
 * Logout and revoke current access token
 * Requires authentication token
 * 
 * @returns Promise with logout response
 */
export async function logout(): Promise<LogoutResponse> {
  const response = await apiClient.post<LogoutResponse>(
    `${AUTH_BASE_PATH}/logout`
  );

  return response.data;
}

// Export as default object for convenience
const authService = {
  requestOTP,
  verifyOTP,
  logout,
};

export default authService;

