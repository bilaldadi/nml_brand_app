/**
 * Mapbox Configuration
 * Central configuration for Mapbox integration
 */

export const MAPBOX_CONFIG = {
  // Your Mapbox access token
  ACCESS_TOKEN: 'pk.eyJ1IjoiYmlsYWxkNyIsImEiOiJjbWgzcnd6MjcxZW0wdnhzMjN0NGg4NHlqIn0.CO9He6JFIxss8tnIBUh5Lw',
  
  // Default location: Jeddah, Saudi Arabia
  DEFAULT_CENTER: [39.1925, 21.4858], // [longitude, latitude]
  DEFAULT_ZOOM: 12,
  
  // Map style
  MAP_STYLE: 'mapbox://styles/mapbox/streets-v11',
  
  // Alternative styles you can use:
  // 'mapbox://styles/mapbox/light-v10' - Light theme
  // 'mapbox://styles/mapbox/dark-v10' - Dark theme
  // 'mapbox://styles/mapbox/satellite-v9' - Satellite view
};

export const MARKER_TYPES = {
  ACCEPTED_OFFERS: 'accepted',
  PROCESSING_OFFERS: 'processing',
  NO_OFFERS: 'no_offers',
} as const;

export type MarkerType = typeof MARKER_TYPES[keyof typeof MARKER_TYPES];

