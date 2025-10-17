/**
 * Utility functions
 * Add helper functions here as needed
 */

/**
 * Format price in Saudi Riyals
 */
export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} ر.س`;
};

/**
 * Validate Saudi phone number
 */
export const isValidSaudiPhone = (phone: string): boolean => {
  const phoneRegex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  return phoneRegex.test(phone);
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  if (phone.length === 10) {
    return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
  }
  return phone;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

