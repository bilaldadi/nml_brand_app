/**
 * Reports Screen
 * Analytics and reporting dashboard with Sales and Products sections
 */

import { Header } from '@/app/home/components/Header';
import { ProductCard } from '@/app/reports/components';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { ArrowDown2, Calendar } from 'iconsax-react-native';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type TabType = 'sales' | 'products';

interface Product {
  id: string;
  name: string;
  image: any;
  price: number;
}

export default function ReportsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('sales');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleProfilePress = () => {
    router.push({
      pathname: '/(tabs)/account',
      params: { returnTo: '/(tabs)/reports' },
    });
  };

  const handleNotificationPress = () => {};

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, date?: Date) => {
    // On Android, the picker closes automatically
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (date) {
      setSelectedDate(date);
    }
  };

  const formatDate = (date: Date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Sample data - replace with real data
  const salesData = {
    monthlyProgress: 90,
    dueAmount: 6,
    collectedAmount: 6,
    totalOffers: 6,
    totalSales: 6,
  };

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'كرواسان',
      image: require('@/assets/images/cake.png'),
      price: 150,
    },
    {
      id: '2',
      name: 'كيك مريل',
      image: require('@/assets/images/cake.png'),
      price: 120,
    },
    {
      id: '3',
      name: 'دونات',
      image: require('@/assets/images/cake.png'),
      price: 80,
    },
  ];

  const handleProductPress = (productId: string) => {
    router.push(`/reports/${productId}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="تقارير"
        variant="normal"
        onProfilePress={handleProfilePress}
        onNotificationPress={handleNotificationPress}
      />

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'sales' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('sales')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'sales' && styles.tabTextActive,
            ]}
          >
            المبيعات
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'products' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('products')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'products' && styles.tabTextActive,
            ]}
          >
            المنتجات
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Selector */}
        <TouchableOpacity
          style={styles.dateSelector}
          onPress={handleDatePress}
        >
          <Calendar size={20} color={Colors.textSecondary} variant="Bold" />
          <Text style={styles.dateText}> {formatDate(selectedDate)}</Text>
          <ArrowDown2 size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

          {activeTab === 'sales' ? (
            <>
              {/* Monthly Progress */}
              <View style={styles.progressSection}>
                <Text style={styles.progressTitle}>المبيعات خلال الشهر</Text>
                <Text style={styles.progressPercentage}>
                  {salesData.monthlyProgress}%
                </Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${salesData.monthlyProgress}%` },
                    ]}
                  />
                </View>
              </View>

              {/* Statistics Grid */}
              <View style={styles.statsGrid}>
                {/* Row 1 */}
                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>
                      {salesData.collectedAmount}
                    </Text>
                    <Text style={styles.statLabel}>المبيعات المحصلة</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{salesData.dueAmount}</Text>
                    <Text style={styles.statLabel}>المبيعات المستحقة</Text>
                  </View>
                </View>

                {/* Row 2 */}
                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{salesData.totalSales}</Text>
                    <Text style={styles.statLabel}>المبيعات</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>
                      {salesData.totalOffers}
                    </Text>
                    <Text style={styles.statLabel}>مجموع العروض</Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Products List */}
              <View style={styles.productsList}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    onPress={() => handleProductPress(product.id)}
                  />
                ))}
              </View>
            </>
          )}
      </ScrollView>

      {/* Android Date Picker */}
      {showDatePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* iOS Date Picker Modal */}
      {showDatePicker && Platform.OS === 'ios' && (
        <View style={styles.iosDatePickerBackdrop}>
          <TouchableOpacity 
            style={styles.backdropTouchable}
            activeOpacity={1}
            onPress={() => setShowDatePicker(false)}
          >
            <TouchableOpacity 
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.iosDatePickerContainer}>
                <View style={styles.iosDatePickerHeader}>
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Text style={styles.iosDatePickerButton}>تم</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange}
                  maximumDate={new Date()}
                />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    gap: Spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  tabTextActive: {
    color: Colors.white,
    fontWeight: Typography.weights.bold,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginHorizontal: Spacing.sm,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  progressTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  progressPercentage: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: '#4CAF50',
    marginBottom: Spacing.md,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  statsGrid: {
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  statValue: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  productsList: {
    gap: Spacing.sm,
  },
  iosDatePickerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 9999,
  },
  backdropTouchable: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  iosDatePickerContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.select({ ios: 34, android: 0 }),
    alignItems: 'center',
    width: '100%',
  },
  iosDatePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    width: '100%',
  },
  iosDatePickerButton: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
});
