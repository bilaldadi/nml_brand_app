/**
 * MapView Component
 * Handles the Mapbox map display with markers
 */

import { MAPBOX_CONFIG, MarkerType } from '@/constants';
import Mapbox from '@rnmapbox/maps';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ShoppingCartIcon } from './ShoppingCartIcon';

// Initialize Mapbox
Mapbox.setAccessToken(MAPBOX_CONFIG.ACCESS_TOKEN);

export interface MapMarker {
  id: string;
  type: MarkerType | 'no_offers' | 'accepted' | 'processing';
  label: string;
  coordinates: [number, number]; // [longitude, latitude]
}

interface MapViewProps {
  markers: MapMarker[];
  mapReady: boolean;
  onMapReady: () => void;
  getMarkerColor: (type: MarkerType | 'no_offers' | 'accepted' | 'processing') => string;
}

export const MapView: React.FC<MapViewProps> = ({
  markers,
  mapReady,
  onMapReady,
  getMarkerColor,
}) => {
  return (
    <Mapbox.MapView
      style={styles.map}
      styleURL={MAPBOX_CONFIG.MAP_STYLE}
      onDidFinishLoadingMap={onMapReady}
      attributionEnabled={false}
      logoEnabled={false}
      compassEnabled={false}
      scaleBarEnabled={false}
    >
      <Mapbox.Camera
        centerCoordinate={MAPBOX_CONFIG.DEFAULT_CENTER}
        zoomLevel={MAPBOX_CONFIG.DEFAULT_ZOOM}
        animationMode="flyTo"
        animationDuration={1000}
      />
      
      {/* Markers */}
      {mapReady && markers.map((marker) => (
        <Mapbox.PointAnnotation
          key={marker.id}
          id={marker.id}
          coordinate={marker.coordinates}
        >
          <View style={styles.markerContainer}>
            <ShoppingCartIcon
              size={50}
              color={
                marker.type === 'processing' ? '#000000' : // Black for processing
                '#FFFFFF' // White for all others
              }
              backgroundColor={
                marker.type === 'accepted' ? '#E84650' : // Red for accepted
                marker.type === 'processing' ? '#F9F9EE' : // Current color for processing
                marker.type === 'no_offers' ? '#000000' : // Black for no offers
                '#F9F9EE' // Default color
              }
              showBorder={marker.type === 'processing'}
            />
          </View>
        </Mapbox.PointAnnotation>
      ))}
    </Mapbox.MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
