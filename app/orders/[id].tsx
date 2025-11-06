/**
 * Order Details Screen
 * Shows detailed information about a specific order
 */

import { BodyText, Caption, Heading2 } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight2 } from 'iconsax-react-native';
import { SaudiRiyal } from 'lucide-react-native';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

// Order details interface
interface OrderDetail {
  id: string;
  orderNumber: string;
  storeName: string;
  storeLogo: string;
  date: string;
  products: {
    id: string;
    name: string;
    image: string | number;
    price: number;
    quantity: number;
  }[];
}

// Mock order details data
const mockOrderDetails: OrderDetail[] = [
  {
    id: '1',
    orderNumber: '1278799',
    storeName: 'بنده',
    storeLogo: '🍎',
    date: '22-03-2025',
    products: [
      {
        id: '1',
        name: 'كيك',
        image: require('@/assets/images/cake.png'),
        price: 9.40,
        quantity: 12,
      },
    ],
  },
  {
    id: '2',
    orderNumber: '1278800',
    storeName: 'میرل مارت',
    storeLogo: '🛒',
    date: '22-03-2025',
    products: [
      {
        id: '1',
        name: 'كيك',
        image: require('@/assets/images/cake.png'),
        price: 7.90,
        quantity: 1,
      },
    ],
  },
];

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Find order by id
  const order = mockOrderDetails.find(o => o.id === id);

  if (!order) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowRight2 size={24} color={Colors.white} />
          </TouchableOpacity>
          <Heading2 style={styles.headerTitle}>تفاصيل الطلب</Heading2>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.errorContainer}>
          <BodyText style={styles.errorText}>الطلب غير موجود</BodyText>
          <TouchableOpacity
            style={styles.errorBackButton}
            onPress={() => router.back()}
          >
            <BodyText style={styles.errorBackButtonText}>العودة</BodyText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleAcceptOrder = () => {
    router.push('/orders/success');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowRight2 size={24} color={Colors.white} />
        </TouchableOpacity>
        <Heading2 style={styles.headerTitle}>تفاصيل الطلب</Heading2>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Information Card */}
        <View style={styles.orderInfoCard}>
          {/* Top Line: Store Name and Order Number */}
          <View style={styles.orderInfoRow}>
            <View style={styles.storeSection}>
              <View style={styles.storeLogo}>
                <BodyText style={styles.storeLogoText}>{order.storeLogo}</BodyText>
              </View>
              <BodyText style={styles.storeName}>{order.storeName}</BodyText>
            </View>
          </View>

          {/* Divider */}
          {/* <View style={styles.divider} /> */}

          {/* Bottom Line: Date */}
          <View style={styles.orderInfoRow}>
            <BodyText style={styles.orderNumber}>
              رقم الطلب # {order.orderNumber}
            </BodyText>
            <BodyText style={styles.orderDate}>تاريخ {order.date}</BodyText>
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.productsSection}>
          {order.products.map((product) => (
            <View key={product.id} style={styles.productItem}>
              {/* Product Image */}
              <View style={styles.productImageContainer}>
                {typeof product.image === 'string' ? (
                  <BodyText style={styles.productEmoji}>{product.image}</BodyText>
                ) : (
                  <Image
                    source={product.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                )}
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <BodyText style={styles.productName}>{product.name}</BodyText>
                <View style={styles.priceRow}>
                  <BodyText style={styles.productPrice}>
                    {product.price.toFixed(2)}
                  </BodyText>
                  <SaudiRiyal size={16} color={Colors.textPrimary} />
                </View>
              </View>

              {/* Quantity */}
              <View style={styles.quantitySection}>
                <Caption style={styles.quantityLabel}>الكمية</Caption>
                <BodyText style={styles.quantityValue}>{product.quantity}</BodyText>
              </View>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <BodyText style={styles.summaryTitle}>ملخص الطلب</BodyText>
          
          {order.products.map((product, index) => (
            <View key={product.id}>
              <View style={styles.summaryItem}>
                <View style={styles.summaryItemLeft}>
                  <BodyText style={styles.summaryProductName}>{product.name}</BodyText>
                  <View style={styles.summaryItemDetailsRow}>
                    <Caption style={styles.summaryItemDetails}>
                      {product.quantity} × {product.price.toFixed(2)}
                    </Caption>
                  </View>
                </View>
                <View style={styles.summaryTotalRow}>
                  <BodyText style={styles.summaryTotal}>
                    {(product.price * product.quantity).toFixed(2)}
                  </BodyText>
                  <SaudiRiyal size={18} />
                </View>
              </View>
              {index < order.products.length - 1 && <View style={styles.summaryDivider} />}
            </View>
          ))}

          {/* Grand Total */}
          <View style={styles.grandTotalContainer}>
            <View style={styles.grandTotalDivider} />
            <View style={styles.grandTotalRow}>
              <BodyText style={styles.grandTotalLabel}>المجموع الكلي</BodyText>
              <View style={styles.grandTotalAmountRow}>
                <BodyText style={styles.grandTotalAmount}>
                  {order.products.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2)}
                </BodyText>
                <SaudiRiyal size={20} color={Colors.primary} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAcceptOrder}
          activeOpacity={0.8}
        >
          <BodyText style={styles.acceptButtonText}>قبول الطلب</BodyText>
        </TouchableOpacity>
      </View>
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
    paddingTop: Platform.select({ ios: Spacing['3xl'], android: Spacing['2xl'] }),
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
    flex: 1,
    color: Colors.white,
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  orderInfoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
  },
  storeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  storeLogo: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeLogoText: {
    fontSize: 20,
  },
  storeName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  orderNumber: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  orderDate: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  productsSection: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  productImageContainer: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 30,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'left',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  productPrice: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
  },
  quantitySection: {
    alignItems: 'flex-end',
  },
  quantityLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textAlign: 'left',
  },
  quantityValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    textAlign: 'left',
  },
  summarySection: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'left',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.md,
  },
  summaryItemLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  summaryProductName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'left',
  },
  summaryItemDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.xs,
  },
  summaryItemDetails: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: Spacing.md,
  },
  summaryTotal: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
  },
  grandTotalContainer: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
  },
  grandTotalDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.md,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grandTotalLabel: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'left',
  },
  grandTotalAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  grandTotalAmount: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  actionButtonContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Platform.select({ ios: Spacing.lg, android: Spacing.md }),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  acceptButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    fontSize: Typography.sizes.base,
  },
  errorBackButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  errorBackButtonText: {
    color: Colors.white,
    fontWeight: Typography.weights.semibold,
  },
});

