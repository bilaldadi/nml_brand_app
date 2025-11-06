/**
 * Add Offer Screen
 * Screen to add an offer to an outlet with products
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useOffer } from '@/contexts/OfferContext';
import { useRouter } from 'expo-router';
import { AddCircle, Trash } from 'iconsax-react-native';
import { SaudiRiyal } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    I18nManager,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

// Delete Action Component for Swipeable
interface DeleteActionProps {
  progress: SharedValue<number>;
  translation: SharedValue<number>;
  onPress: () => void;
}

const DeleteAction: React.FC<DeleteActionProps> = ({ progress, translation, onPress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: Math.min(progress.value, 1),
    };
  });

  return (
    <Reanimated.View style={[styles.deleteAction, animatedStyle]}>
      <TouchableOpacity
        style={styles.deleteActionButton}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Trash size={20} color={Colors.white} />
      </TouchableOpacity>
    </Reanimated.View>
  );
};

export default function AddOfferScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const { products, updateProduct, removeProduct, clearProducts, addSubmittedOffer } = useOffer();

  // Calculate summary
  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const totalPrice = products.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0);
  const avgCommission = products.length > 0 
    ? products.reduce((sum, p) => sum + (p.commission || 0), 0) / products.length 
    : 0;

  const handleAddProduct = () => {
    router.push('/offers/add-product');
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateProduct(productId, { quantity: newQuantity });
  };

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
  };

  const handleSubmitOffer = () => {
    // Save the offer before clearing
    addSubmittedOffer({
      outletName: 'بنده',
      outletLocation: 'حي الروضة، شارع الأمير',
      outletNeighborhood: 'الروضة',
      products: [...products],
      status: 'processing', // Start as processing
      totalPrice,
      totalQuantity,
    });

    // Clear products after submitting
    clearProducts();
    router.push('/offers/success');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>إضافة عرض لمنفذ بيع</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>{isRTL ? '→' : '←'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Outlet Card */}
        <View style={styles.outletSection}>
          <Text style={styles.sectionTitle}>منفذ البيع</Text>
          <View style={styles.outletCard}>
            <View style={styles.outletInfo}>
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>بنده</Text>
              </View>
              <Text style={styles.outletName}>بنده</Text>
            </View>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>المنتجات</Text>
            {products.length > 0 ? (
              <TouchableOpacity
                style={styles.addProductButtonTop}
                onPress={handleAddProduct}
              >
                <AddCircle size={18} color={Colors.white} variant="Bold" />
                <Text style={styles.addProductButtonTopText}>إضافة منتج</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {products.length === 0 ? (
            <TouchableOpacity
              style={styles.addProductPlaceholder}
              onPress={handleAddProduct}
            >
              <AddCircle size={24} color={Colors.textSecondary} variant="Bold" />
              <Text style={styles.addProductPlaceholderText}>إضافة منتج</Text>
            </TouchableOpacity>
          ) : (
            <ScrollView 
              style={styles.productsScrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.productsScrollContent}
            >
              {products.map((product) => {
                const productPrice = product.price || 0;
                const productQuantity = product.quantity || 0;
                const productCommission = product.commission || 0;
                const totalProductPrice = productPrice * productQuantity;
                
                const renderDeleteAction = (
                  progress: SharedValue<number>,
                  translation: SharedValue<number>
                ) => {
                  return (
                    <DeleteAction
                      progress={progress}
                      translation={translation}
                      onPress={() => handleRemoveProduct(product.id)}
                    />
                  );
                };
                
                return (
                  <Swipeable
                    key={product.id}
                    renderRightActions={isRTL ? renderDeleteAction : undefined}
                    renderLeftActions={isRTL ? undefined : renderDeleteAction}
                    friction={2}
                    rightThreshold={60}
                    leftThreshold={60}
                    overshootRight={false}
                    overshootLeft={false}
                  >
                    <View style={styles.productCard}>
                      {/* Product Image (Right) */}
                      <View style={styles.upperContainer}>
                        <View style={styles.productImageContainer}>
                          <Text style={styles.productEmoji}>{product.emoji}</Text>
                        </View>
                        <Text style={styles.productName}>{product.name}</Text>

                          {/* Actions Container (Left) - Quantity Controls + Delete Button */}
                        <View style={styles.actionsContainer}>
                          {/* Quantity Controls */}
                          <View style={styles.quantityControlsContainer}>
                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() => handleUpdateQuantity(product.id, productQuantity - 1)}
                            >
                              <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <View style={styles.quantityDisplay}>
                              <Text style={styles.quantityText}>{productQuantity}</Text>
                            </View>
                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() => handleUpdateQuantity(product.id, productQuantity + 1)}
                            >
                              <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                          </View>

                          {/* Delete Button */}
                          {/* <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleRemoveProduct(product.id)}
                          >
                            <Trash size={18} color={Colors.textPrimary}/>
                          </TouchableOpacity> */}
                        </View>
                      </View>

                      {/* Product Details (Center) */}
                      <View style={styles.productDetails}>
                        <View style={styles.priceInfo}>
                          <Text style={styles.priceLabel}>سعر الحبة</Text>
                          <View style={styles.priceValueContainer}>
                            <Text style={styles.priceValue}>{productPrice.toFixed(0)}</Text>
                            <SaudiRiyal size={12} color={Colors.textPrimary} />
                          </View>
                        </View>
                        <View style={styles.priceInfo}>
                          <Text style={styles.priceLabel}>الكمية</Text>
                          <View style={styles.priceValueContainer}>
                            <Text style={styles.priceValue}>{productQuantity.toFixed(0)}</Text>
                            <SaudiRiyal size={12} color={Colors.textPrimary} />
                          </View>
                        </View>
                        <View style={styles.priceInfo}>
                          <Text style={styles.priceLabel}>السعر النهائي</Text>
                          <View style={styles.priceValueContainer}>
                            <Text style={styles.priceValue}>{totalProductPrice.toFixed(0)}</Text>
                            <SaudiRiyal size={12} color={Colors.textPrimary} />
                          </View>
                        </View>
                      </View>

                    
                    </View>
                  </Swipeable>
                );
              })}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* Summary and Submit Button */}
      {products.length > 0 && (
        
        <View style={styles.footer}>
          {/* Compact Summary */}
          <View style={styles.summaryCompact}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemValue}>{totalProducts}</Text>
              <Text style={styles.summaryItemLabel}>منتج</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemValue}>{totalQuantity}</Text>
              <Text style={styles.summaryItemLabel}>علبة</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemValueHighlight}>{totalPrice.toFixed(0)}</Text>
              <Text style={styles.summaryItemLabel}>ر.س</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemValue}>{avgCommission.toFixed(1)}%</Text>
              <Text style={styles.summaryItemLabel}>عمولة</Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitOffer}
          >
            <Text style={styles.submitButtonText}>ارسال العرض</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
  backButton: {
    position: 'absolute',
    top: Spacing['2xl'],
    [I18nManager.isRTL ? 'left' : 'right']: Spacing.lg,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  } as any,
  backArrow: {
    color: Colors.white,
    fontSize: Typography.sizes['2xl'],
  },
  content: {
    flex: 1,
  },
  outletSection: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  outletCard: {
    marginTop: Spacing.md,
    backgroundColor: Colors.background,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.lg,
  },
  outletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.white,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  outletName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  section: {
    flex: 1,
    padding: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'left',
  },
  addProductButtonTop: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  addProductButtonTopText: {
    fontSize: Typography.sizes.sm,
    color: Colors.white,
    fontWeight: Typography.weights.semibold,
  },
  productsScrollView: {
    flex: 1,
  },
  productsScrollContent: {
    paddingBottom: Spacing.md,
  },
  addProductPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  addProductPlaceholderText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
  productCard: {
    flexDirection: 'column',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 0.6,
    borderColor: Colors.border,
    gap: Spacing.md,
    position: 'relative',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  quantityControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quantityButton: {
    width: 25,
    height: 25,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,

  },
  quantityDisplay: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.bold,
  },
  // deleteButton: {
  //   position: 'absolute',
  //   top: -25,
  //   right: -12,
  // },
  deleteButtonX: {
    fontSize: 20,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  productDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.bold,
  },
  priceInfo: {
    flexDirection: 'column',
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  priceLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  priceValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceValue: {
    fontSize: Typography.sizes.xs,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    paddingBottom: Spacing.sm,
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
    fontSize: 32,
  },
  deleteAction: {
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  deleteActionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  summaryCompact: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
    gap: 2,
  },
  summaryItemValue: {
    fontSize: Typography.sizes.lg,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.bold,
  },
  summaryItemValueHighlight: {
    fontSize: Typography.sizes.xl,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  summaryItemLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
});

