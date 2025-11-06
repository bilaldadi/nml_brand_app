/**
 * Home Screen (Tabs)
 * Main map-based screen showing suppliers and offers
 */

import { BorderRadius, Colors, MarkerType, Spacing, Typography } from '@/constants';
import { useRouter } from 'expo-router';
import { Box, Location, TickCircle, Truck } from 'iconsax-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { FilterOption, FilterTags, Header, MapControls, MapMarker, MapView, SearchBar } from '../home/components';
import { AcceptedModal } from '../home/mapPinsModals/acceptedModal';
import { NoOfferModal } from '../home/mapPinsModals/noOfferModal';
import { ProcessingModal } from '../home/mapPinsModals/processingModal';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<MarkerType | 'all' | 'no_offers' | 'suppliers' | 'outlets'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapReady, setMapReady] = useState(false);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [acceptedModalVisible, setAcceptedModalVisible] = useState(false);
  const [processingModalVisible, setProcessingModalVisible] = useState(false);
  const [noOfferModalVisible, setNoOfferModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

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
    router.push({
      pathname: '/(tabs)/account',
      params: { returnTo: '/(tabs)/home' },
    });
  };

  const handleNotificationPress = () => {};
  const handleMapPress = () => {
    setMapStyle(mapStyle === 'streets' ? 'satellite' : 'streets');
  };
  const handleTargetPress = () => {};
  const handleMenuPress = () => {
    setViewMode(viewMode === 'map' ? 'list' : 'map');
  };

  // Handle marker press
  const handleMarkerPress = (marker: MapMarker) => {
    setSelectedMarker(marker);
    if (marker.type === 'accepted') {
      setAcceptedModalVisible(true);
    } else if (marker.type === 'processing') {
      setProcessingModalVisible(true);
    } else if (marker.type === 'no_offers') {
      setNoOfferModalVisible(true);
    }
  };

  // Get outlet data for marker
  const getOutletData = (marker: MapMarker) => {
    return {
      name: 'جاره',
      location: 'حي الروضة، شارع الأمير',
      neighborhood: 'الروضة',
      category: 'حلويات. كيك',
    };
  };

  // Render list item card
  const renderListItem = ({ item }: { item: MapMarker }) => {
    const outletData = getOutletData(item);
    const statusSteps = [
      { id: 1, label: 'قبول العرض', icon: TickCircle, completed: true },
      { id: 2, label: 'تجهيز الطلب', icon: Box, completed: true },
      { id: 3, label: 'مع المندوب', icon: Truck, completed: true },
      { id: 4, label: 'في الموقع', icon: Location, completed: false },
      { id: 5, label: 'على الرف', icon: TickCircle, completed: false },
    ];

    return (
      <TouchableOpacity
        style={styles.listCard}
        activeOpacity={0.7}
        onPress={() => handleMarkerPress(item)}
      >
        {/* Processing Status - Time Remaining Badge */}
        {/* {item.type === 'processing' && (
          <View style={styles.timeBadge}>
            <Clock size={14} color={Colors.primary} variant="Bold" />
            <Text style={styles.timeBadgeText}>بقي 3 ساعات</Text>
          </View>
        )} */}

        {/* Outlet Info */}
        <View style={styles.listOutletInfo}>
          <View style={styles.listLogoPlaceholder}>
            <Text style={styles.listLogoText}>ج</Text>
          </View>
          <View style={styles.listOutletDetails}>
            <Text style={styles.listOutletName}>{outletData.name}</Text>
            <Text style={styles.listOutletCategory}>{outletData.category}</Text>
          </View>
        </View>

        {/* Accepted - Timeline */}
        {item.type === 'accepted' && (
          <View style={styles.timelineContainer}>
            {statusSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isLast = index === statusSteps.length - 1;
              const nextStep = statusSteps[index + 1];
              const lineCompleted = step.completed && nextStep?.completed;
              
              return (
                <React.Fragment key={step.id}>
                  <View style={styles.timelineStep}>
                    <View
                      style={[
                        styles.timelineStepIcon,
                        step.completed && styles.timelineStepIconCompleted,
                      ]}
                    >
                      <IconComponent
                        size={14}
                        color={step.completed ? Colors.white : Colors.textSecondary}
                        variant="Bold"
                      />
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.timelineStepLine,
                          lineCompleted && styles.timelineStepLineCompleted,
                        ]}
                      />
                    )}
                  </View>
                </React.Fragment>
              );
            })}
          </View>
        )}

        {/* Processing - Waiting Status */}
        {item.type === 'processing' && (
          <View style={styles.waitingBanner}>
            <Text style={styles.waitingText}>بانتظار قبول الطلب</Text>
          </View>
        )}

        {/* No Offers - Send Offer Button */}
        {item.type === 'no_offers' && (
          <TouchableOpacity
            style={styles.sendOfferButton}
            onPress={() => {
              setSelectedMarker(item);
              setNoOfferModalVisible(true);
            }}
          >
            <Text style={styles.sendOfferButtonText}>ارسل عرض على التصريف</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          <MapView
            markers={filteredMarkers}
            onMarkerPress={handleMarkerPress}
            mapReady={mapReady}
            onMapReady={() => setMapReady(true)}
            getMarkerColor={getMarkerColor}
            mapStyle={mapStyle}
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
      ) : (
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Header
              onProfilePress={handleProfilePress}
              onNotificationPress={handleNotificationPress}
              variant="normal"
            />

            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              variant="normal"
            />

            <FilterTags
              filters={filters}
              activeFilter={activeFilter}
              onFilterPress={setActiveFilter}
              variant="normal"
            />
          </View>

          <FlatList
            data={filteredMarkers}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity
            style={styles.listMenuButton}
            onPress={handleMenuPress}
          >
            <Text style={styles.listMenuButtonText}>الخريطة</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal Overlay */}
      {(acceptedModalVisible || processingModalVisible || noOfferModalVisible) && (
        <View style={styles.modalOverlay} />
      )}

      {/* Accepted Marker Modal */}
      <AcceptedModal
        visible={acceptedModalVisible}
        onClose={() => setAcceptedModalVisible(false)}
        outletData={
          selectedMarker
            ? {
                name: 'بنده',
                location: 'حي الروضة، شارع الأمير',
                neighborhood: 'الروضة',
              }
            : undefined
        }
      />

      {/* Processing Marker Modal */}
      <ProcessingModal
        visible={processingModalVisible}
        onClose={() => setProcessingModalVisible(false)}
        outletData={
          selectedMarker
            ? {
                name: 'بنده',
                location: 'حي الروضة، شارع الأمير',
                neighborhood: 'الروضة',
              }
            : undefined
        }
      />

      {/* No Offer Marker Modal */}
      <NoOfferModal
        visible={noOfferModalVisible}
        onClose={() => setNoOfferModalVisible(false)}
        outletData={
          selectedMarker
            ? {
                name: 'بنده',
                location: 'حي الروضة، شارع الأمير',
                neighborhood: 'الروضة',
              }
            : undefined
        }
      />
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
  listContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listHeader: {
    backgroundColor: Colors.background,
    zIndex: 10,
    elevation: 2,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  listCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    // padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  timeBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: '#FCE7E8',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    zIndex: 1,
  },
  timeBadgeText: {
    fontSize: Typography.sizes.xs,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  listOutletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    // marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    padding: Spacing.sm,

  },
  listLogoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listLogoText: {
    color: Colors.white,
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
  },
  listOutletDetails: {
    flex: 1,
  },
  listOutletName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'left',
  },
  listOutletCategory: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  timelineStepIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
    zIndex: 1,
  },
  timelineStepIconCompleted: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timelineStepLine: {
    position: 'absolute',
    top: 16,
    left: '50%',
    width: '100%',
    height: 2,
    backgroundColor: Colors.border,
    borderStyle: 'dashed',
    zIndex: 0,
  },
  timelineStepLineCompleted: {
    backgroundColor: Colors.primary,
    borderStyle: 'solid',
  },
  waitingBanner: {
    backgroundColor: '#FCE7E8',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    margin: Spacing.sm,
    
  },
  waitingText: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
    textAlign: 'center',
  },
  sendOfferButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    margin: Spacing.sm,
    alignItems: 'center',
  },
  sendOfferButtonText: {
    fontSize: Typography.sizes.base,
    color: Colors.white,
    fontWeight: Typography.weights.bold,
  },
  listMenuButton: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  listMenuButtonText: {
    fontSize: Typography.sizes.base,
    color: Colors.white,
    fontWeight: Typography.weights.semibold,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.overlay,
    zIndex: 999,
  },
});


