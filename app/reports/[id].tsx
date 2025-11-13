/**
 * Product Report Details Page
 * Shows detailed statistics and charts for a specific product
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowDown2, ArrowRight2, Calendar } from 'iconsax-react-native';
import { SaudiRiyal } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProductData {
  id: string;
  name: string;
  image: any;
  price: number;
  soldCount: number;
  totalSales: number;
  totalProfit: number;
}

// Mock product data - replace with real API call
const getProductData = (id: string): ProductData => {
  return {
    id,
    name: 'كرواسان',
    image: require('@/assets/images/cake.png'),
    price: 150,
    soldCount: 45,
    totalSales: 4000,
    totalProfit: 2300,
  };
};

export default function ProductReportDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const productData = getProductData(id as string);

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

  // Chart data for custom grouped bars
  const chartData = [
    { label: '10k', morning: 4000, evening: 6000 },
    { label: '20k', morning: 8000, evening: 7000 },
    { label: '30k', morning: 6000, evening: 5000 },
    { label: '40k', morning: 7000, evening: 6500 },
    { label: '50k', morning: 9000, evening: 7500 },
    { label: '60k', morning: 11000, evening: 9000 },
    { label: '70k', morning: 8500, evening: 10000 },
    { label: '80k', morning: 12000, evening: 11000 },
  ];

  // Calculate max value for scaling
  const maxValue = Math.max(
    ...chartData.flatMap((d) => [d.morning, d.evening])
  );

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowRight2 size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تقرير المنتج</Text>
        <View style={styles.placeholder} />
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
          <Text style={styles.dateText}>اليوم {formatDate(selectedDate)}</Text>
          <ArrowDown2 size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <View style={styles.productImageContainer}>
              <Image
                source={productData.image}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.productName}>{productData.name}</Text>
            <View style={styles.priceSection}>
              <Text style={styles.priceLabel}>سعر البيع</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{productData.price}</Text>
                <SaudiRiyal size={16} color={Colors.textPrimary} />
              </View>
            </View>
          </View>

          {/* Statistics */}
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
            <Text style={styles.statLabel}>عدد المنتجات المباعة</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>{productData.soldCount}</Text>
              </View>
            </View>

            <View style={styles.statRow}>
            <Text style={styles.statLabel}>مجموع المبيعات</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>{productData.totalSales}</Text>
                <SaudiRiyal size={18} color={Colors.textPrimary} />
              </View>
            </View>

            <View style={styles.statRow}>
            <Text style={styles.statLabel}>إجمالي الربح</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>{productData.totalProfit}</Text>
                <SaudiRiyal size={18} color={Colors.textPrimary} />
              </View>
            </View>
          </View>

          {/* Chart Section */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>
              المبيعات خلال اليوم حسب الفترات الصباحية و المسائية
            </Text>

            {/* Legend */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#7B61FF' }]} />
                <Text style={styles.legendText}>صباحية</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.legendText}>مسائية</Text>
              </View>
            </View>

            {/* Custom Grouped Bar Chart */}
            <View style={styles.chartContainer}>
              <View style={styles.barsContainer}>
                {chartData.map((data, index) => {
                  const morningHeight = (data.morning / maxValue) * 150;
                  const eveningHeight = (data.evening / maxValue) * 150;

                  return (
                    <View key={index} style={styles.barGroup}>
                      {/* Bars */}
                      <View style={styles.bars}>
                        <View
                          style={[
                            styles.bar,
                            styles.morningBar,
                            { height: morningHeight },
                          ]}
                        />
                        <View
                          style={[
                            styles.bar,
                            styles.eveningBar,
                            { height: eveningHeight },
                          ]}
                        />
                      </View>
                      {/* Label */}
                      <Text style={styles.barLabel}>{data.label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
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
  header: {
    backgroundColor: Colors.primary,
    paddingTop: Platform.select({ ios: 60, android: 40 }),
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 8,
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
  productInfo: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  productImageContainer: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    flex: 1,
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'left',
  },
  priceSection: {
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  priceLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  statsContainer: {
    gap: Spacing.md,
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
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statLabel: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
    textAlign: 'right',
  },
  statValueContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  chartSection: {
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
  chartTitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: Typography.sizes.sm * 1.5,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
  chartContainer: {
    paddingVertical: Spacing.lg,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 180,
    paddingHorizontal: Spacing.xs,
  },
  barGroup: {
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 150,
  },
  bar: {
    width: 10,
    borderRadius: 6,
    minHeight: 20,
  },
  morningBar: {
    backgroundColor: '#7B61FF',
  },
  eveningBar: {
    backgroundColor: '#4CAF50',
  },
  barLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
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
    justifyContent: 'flex-start',
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

