/**
 * Home Screen (Tabs)
 * Main map-based screen showing suppliers and offers
 */

import { Colors, MarkerType } from '@/constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, StyleSheet, View } from 'react-native';

import { FilterOption, FilterTags, Header, MapControls, MapMarker, MapView, SearchBar } from '../home/components';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<MarkerType | 'all' | 'no_offers' | 'suppliers' | 'outlets'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapReady, setMapReady] = useState(false);

  // Mock map markers with real Jeddah coordinates
  const markers: MapMarker[] = [
    { 
      id: '1', 
      type: 'accepted', 
      label: 'عروض مقبولة', 
      coordinates: [39.2025, 21.4858] // Jeddah area
    },
    { 
      id: '2', 
      type: 'accepted', 
      label: 'عروض مقبولة', 
      coordinates: [39.2145, 21.4858] // Jeddah area
    },
    { 
      id: '3', 
      type: 'accepted', 
      label: 'عروض مقبولة', 
      coordinates: [39.2165, 21.4613] // Jeddah area
    },
    { 
      id: '4', 
      type: 'processing', 
      label: 'عروض تحت الإجراء', 
      coordinates: [39.1825, 21.4758] // Jeddah area
    },
    { 
      id: '5', 
      type: 'no_offers', 
      label: 'لا يوجد عروض', 
      coordinates: [39.1725, 21.4658] // Jeddah area
    },
  ];

  const filters: FilterOption[] = [
    { type: 'all', label: t('home.filters.all'), color: Colors.primary, showIcon: false },
    { type: 'accepted', label: t('home.filters.accepted'), color: '#4CAF50' },
    { type: 'processing', label: t('home.filters.processing'), color: '#FF9800' },
    { type: 'no_offers', label: t('home.filters.noOffers'), color: '#F44336' },
  ];

  const getMarkerColor = (type: MarkerType | 'no_offers' | 'suppliers' | 'outlets'): string => {
    const filter = filters.find(f => f.type === type);
    return filter?.color || Colors.primary;
  };

  const filteredMarkers = activeFilter === 'all' 
    ? markers 
    : markers.filter(marker => marker.type === activeFilter);

  const handleProfilePress = () => {
    router.push('/account');
  };

  const handleNotificationPress = () => {};
  const handleMapPress = () => {};
  const handleTargetPress = () => {};
  const handleMenuPress = () => {};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.mapContainer}>
        <MapView
          markers={filteredMarkers}
          mapReady={mapReady}
          onMapReady={() => setMapReady(true)}
          getMarkerColor={getMarkerColor}
        />

        <Header
          onProfilePress={handleProfilePress}
          onNotificationPress={handleNotificationPress}
        />

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FilterTags
          filters={filters}
          activeFilter={activeFilter}
          onFilterPress={setActiveFilter}
        />

        <MapControls
          onMapPress={handleMapPress}
          onTargetPress={handleTargetPress}
          onMenuPress={handleMenuPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
});


