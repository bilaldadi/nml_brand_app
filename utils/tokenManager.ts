/**
 * Token Manager
 * In-memory token storage for authentication
 */

class TokenManager {
  private token: string | null = null;

  /**
   * Store authentication token in memory
   */
  setToken(token: string): void {
    this.token = token;
  }

  /**
   * Retrieve authentication token from memory
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Clear authentication token from memory
   */
  clearToken(): void {
    this.token = null;
  }

  /**
   * Check if token exists
   */
  hasToken(): boolean {
    return this.token !== null;
  }
}

// Export singleton instance
export const tokenManager = new TokenManager();

