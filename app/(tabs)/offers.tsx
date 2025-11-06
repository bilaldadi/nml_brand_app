/**
 * Offers Screen
 * Lists all submitted offers with their statuses
 */

import { FilterOption, FilterTags, Header, SearchBar } from '@/app/home/components';
import { BodyText, Caption } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useOffer } from '@/contexts/OfferContext';
import { useRouter } from 'expo-router';
import { Box, Location, TickCircle, Truck } from 'iconsax-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


export default function OffersScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { submittedOffers } = useOffer();
  const [activeFilter, setActiveFilter] = useState<'all' | 'accepted' | 'processing'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Map filter type to offer status - only accepted and processing
  const filters: FilterOption[] = [
    { type: 'all', label: t('home.filters.all'), color: Colors.primary, showIcon: false },
    { type: 'accepted', label: t('home.filters.accepted'), color: '#4CAF50' },
    { type: 'processing', label: t('home.filters.processing'), color: '#FF9800' },
  ];

  // Filter offers by status - only show accepted and processing
  const filteredOffers = submittedOffers.filter(offer => {
    const matchesStatus = offer.status === 'accepted' || offer.status === 'processing';
    const matchesFilter = activeFilter === 'all' || offer.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      offer.outletName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.outletLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesFilter && matchesSearch;
  });

  const handleProfilePress = () => {
    router.push({
      pathname: '/(tabs)/account',
      params: { returnTo: '/(tabs)/offers' },
    });
  };

  const handleNotificationPress = () => {};

  // Render list item card - matching home list view
  const renderOfferCard = ({ item }: { item: typeof submittedOffers[0] }) => {
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
        onPress={() => {
          // No modal - just navigate or do nothing
        }}
      >
        {/* Outlet Info */}
        <View style={styles.listOutletInfo}>
          <View style={styles.listLogoPlaceholder}>
            <Text style={styles.listLogoText}>
              {item.outletName.charAt(0)}
            </Text>
          </View>
          <View style={styles.listOutletDetails}>
            <Text style={styles.listOutletName}>{item.outletName}</Text>
            <Text style={styles.listOutletCategory}>{item.outletLocation}</Text>
          </View>
        </View>

        {/* Accepted - Timeline */}
        {item.status === 'accepted' && (
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
                    <Text
                      style={[
                        styles.timelineLabel,
                        step.completed && styles.timelineLabelCompleted,
                      ]}
                    >
                      {step.label}
                    </Text>
                  </View>
                </React.Fragment>
              );
            })}
          </View>
        )}

        {/* Processing - Waiting Status */}
        {item.status === 'processing' && (
          <View style={styles.waitingBanner}>
            <Text style={styles.waitingText}>بانتظار قبول الطلب</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Header
          onProfilePress={handleProfilePress}
          onNotificationPress={handleNotificationPress}
          variant="normal"
          title="العروض المرسلة"
        />

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          variant="normal"
        />

        <FilterTags
          filters={filters}
          activeFilter={activeFilter}
          onFilterPress={(filterType) => {
            if (filterType === 'all' || filterType === 'accepted' || filterType === 'processing') {
              setActiveFilter(filterType);
            }
          }}
          variant="normal"
        />
      </View>

      {/* Offers List */}
      {filteredOffers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <BodyText style={styles.emptyText}>لا توجد عروض مرسلة</BodyText>
          <Caption style={styles.emptySubtext}>
            قم بإرسال عرض من الخريطة لعرضه هنا
          </Caption>
        </View>
      ) : (
        <FlatList
          data={filteredOffers}
          renderItem={renderOfferCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  listOutletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
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
  timelineLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  timelineLabelCompleted: {
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.base,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    color: Colors.textLight,
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
  },
});
