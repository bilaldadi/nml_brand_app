/**
 * Orders Screen
 * Order management and tracking
 */

import { BodyText, Caption } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useRouter } from 'expo-router';
import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Header } from '../home/components/Header';

// Order status types
type OrderStatus = 'in_progress' | 'processing' | 'delivered';

interface Order {
  id: string;
  orderNumber: string;
  storeName: string;
  storeLogo: string; // emoji or image
  status: OrderStatus;
  createdAt: Date;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '1278799',
    storeName: 'بنده',
    storeLogo: '🍎',
    status: 'in_progress',
    createdAt: new Date(),
  },
  {
    id: '2',
    orderNumber: '1278800',
    storeName: 'میرل مارت',
    storeLogo: '🛒',
    status: 'in_progress',
    createdAt: new Date(),
  },
  {
    id: '3',
    orderNumber: '1278801',
    storeName: 'بنده',
    storeLogo: '🛒',
    status: 'processing',
    createdAt: new Date(),
  },
  {
    id: '4',
    orderNumber: '1278802',
    storeName: 'میرل مارت',
    storeLogo: '🛒',
    status: 'delivered',
    createdAt: new Date(),
  },
];

const getStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case 'in_progress':
      return 'قيد التنفيذ';
    case 'processing':
      return 'جاري التجهيز';
    case 'delivered':
      return 'تم التسليم';
    default:
      return '';
  }
};

export default function OrdersScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const [activeTab, setActiveTab] = useState<'previous' | 'active'>('active');
  const [activeStatusFilter, setActiveStatusFilter] = useState<OrderStatus | 'all'>('all');

  // Filter orders based on tab and status
  const filteredOrders = mockOrders.filter(order => {
    // For now, we'll treat all as active. You can add logic to filter by date for previous/active
    const matchesTab = true; // activeTab === 'active' ? ... : ...
    const matchesStatus = activeStatusFilter === 'all' || order.status === activeStatusFilter;
    return matchesTab && matchesStatus;
  });

  const statusFilters: (OrderStatus | 'all')[] = ['all', 'in_progress', 'processing', 'delivered'];

  const renderOrderCard = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderCard}
      activeOpacity={0.7}
      onPress={() => {
        router.push(`/orders/${item.id}`);
      }}
    >
      {/* Status Badge */}
      <View style={styles.statusBadge}>
        <Text style={styles.statusBadgeText}>{getStatusLabel(item.status)}</Text>
      </View>

      {/* Order Content */}
      <View style={styles.orderContent}>
        <View style={styles.storeInfo}>
          <View style={styles.storeLogo}>
            <Text style={styles.storeLogoText}>{item.storeLogo}</Text>
          </View>
          <View style={styles.storeDetails}>
            <BodyText style={styles.storeName}>{item.storeName}</BodyText>
            <Caption style={styles.orderNumber}>رقم الطلب # {item.orderNumber}</Caption>
          </View>
        </View>
        <ArrowLeft2 size={20} color={Colors.textSecondary} variant="Outline" />
      </View>
    </TouchableOpacity>
  );

  const handleProfilePress = () => {
    router.push({
      pathname: '/(tabs)/account',
      params: { returnTo: '/(tabs)/orders' },
    });
  };

  const handleNotificationPress = () => {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header 
        title="طلبات" 
        variant="normal"
        onProfilePress={handleProfilePress}
        onNotificationPress={handleNotificationPress}
      />

      {/* Main Tabs */}
      <View style={styles.mainTabsContainer}>
        <TouchableOpacity
          style={[
            styles.mainTab,
            activeTab === 'active' && styles.mainTabActive,
          ]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.mainTabText,
              activeTab === 'active' && styles.mainTabTextActive,
            ]}
          >
            طلبات نشطة
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.mainTab,
            activeTab === 'previous' && styles.mainTabActive,
          ]}
          onPress={() => setActiveTab('previous')}
        >
          <Text
            style={[
              styles.mainTabText,
              activeTab === 'previous' && styles.mainTabTextActive,
            ]}
          >
            طلبات سابقة
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status Filters */}
      <View style={styles.statusFiltersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusFiltersContent}
        >
          {statusFilters.map((status) => {
            const isActive = activeStatusFilter === status;
            const label = status === 'all' ? 'الكل' : getStatusLabel(status);
            return (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusFilterChip,
                  isActive && styles.statusFilterChipActive,
                  isActive && status === 'all' && styles.statusFilterChipAllActive,
                ]}
                onPress={() => {
                  if (status === 'all') {
                    setActiveStatusFilter('all');
                  } else {
                    setActiveStatusFilter(isActive ? 'all' : status);
                  }
                }}
              >
                <Text
                  style={[
                    styles.statusFilterText,
                    isActive && styles.statusFilterTextActive,
                    isActive && status === 'all' && styles.statusFilterTextAllActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <BodyText style={styles.emptyText}>لا توجد طلبات</BodyText>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ordersList}
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
  mainTabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    gap: Spacing.xs,
  },
  mainTab: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTabActive: {
    backgroundColor: Colors.primary,
  },
  mainTabText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  mainTabTextActive: {
    color: Colors.white,
    fontWeight: Typography.weights.bold,
  },
  statusFiltersContainer: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statusFiltersContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  statusFilterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusFilterChipActive: {
    borderColor: Colors.primary,
    backgroundColor: '#FCE7E8',
  },
  statusFilterChipAllActive: {
    backgroundColor: '#FCE7E8',
    borderColor: Colors.primary,
  },
  statusFilterText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
  statusFilterTextActive: {
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  statusFilterTextAllActive: {
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  ordersList: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statusBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: '#FCE7E8',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    zIndex: 1,
  },
  statusBadgeText: {
    fontSize: Typography.sizes.xs,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  orderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  storeLogo: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeLogoText: {
    fontSize: 24,
  },
  storeDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'left',
  },
  orderNumber: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'left',
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
    textAlign: 'center',
  },
});
