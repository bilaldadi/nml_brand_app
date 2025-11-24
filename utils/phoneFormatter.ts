/**
 * Phone Number Formatter
 * Utility functions for Saudi phone number formatting
 */

/**
 * Format phone number to 966XXXXXXXXX format for API
 * Accepts various formats:
 * - 966501234567
 * - 00966501234567
 * - 0966501234567
 * - 0501234567
 * - 501234567
 * - +966501234567
 * 
 * @param phone - Phone number in any accepted format
 * @returns Formatted phone number (966XXXXXXXXX) or original if invalid
 */
export function formatPhoneForAPI(phone: string): string {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');

  // Remove leading zeros
  cleaned = cleaned.replace(/^0+/, '');

  // If it starts with 966, return as is
  if (cleaned.startsWith('966')) {
    return cleaned;
  }

  // If it's a 9-digit number starting with 5, prepend 966
  if (cleaned.length === 9 && cleaned.startsWith('5')) {
    return `966${cleaned}`;
  }

  // If it's a 10-digit number starting with 05, remove leading 0 and prepend 966
  if (cleaned.length === 10 && cleaned.startsWith('05')) {
    return `966${cleaned.slice(1)}`;
  }

  // Return the cleaned version (might be invalid, let API handle validation)
  return cleaned.startsWith('966') ? cleaned : `966${cleaned}`;
}

/**
 * Format phone number for display (+966 XXX XXX XXX)
 * 
 * @param phone - Phone number in 966XXXXXXXXX format
 * @returns Formatted phone number for display
 */
export function formatPhoneForDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('966') && cleaned.length === 12) {
    const countryCode = cleaned.slice(0, 3);
    const part1 = cleaned.slice(3, 6);
    const part2 = cleaned.slice(6, 9);
    const part3 = cleaned.slice(9, 12);
    return `+${countryCode} ${part1} ${part2} ${part3}`;
  }
  
  return phone;
}

/**
 * Validate Saudi phone number format
 * 
 * @param phone - Phone number to validate
 * @returns true if valid, false otherwise
 */
export function isValidSaudiPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Saudi number (966 followed by 9 digits starting with 5)
  const saudiPhoneRegex = /^966[5][0-9]{8}$/;
  
  return saudiPhoneRegex.test(cleaned);
}

