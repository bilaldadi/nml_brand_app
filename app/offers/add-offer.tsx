/**
 * Add Offer Screen
 * Screen to add an offer to an outlet with products
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useOffer } from '@/contexts/OfferContext';
import { useRouter } from 'expo-router';
import { AddCircle } from 'iconsax-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    I18nManager,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function AddOfferScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const { products, clearProducts } = useOffer();

  const handleAddProduct = () => {
    router.push('/offers/add-product');
  };

  const handleSubmitOffer = () => {
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

      <View style={styles.content}>
        {/* Outlet Card */}
        <View style={styles.outletCard}>
          <View style={styles.outletInfo}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>بنده</Text>
            </View>
            <Text style={styles.outletName}>بنده</Text>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المنتجات</Text>

          {products.length === 0 ? (
            <TouchableOpacity
              style={styles.addProductPlaceholder}
              onPress={handleAddProduct}
            >
              <AddCircle size={24} color={Colors.textSecondary} variant="Bold" />
              <Text style={styles.addProductPlaceholderText}>إضافة منتج</Text>
            </TouchableOpacity>
          ) : (
            <>
              {products.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <View style={styles.productInfo}>
                    <Text style={styles.productEmoji}>{product.emoji}</Text>
                    <Text style={styles.productName}>{product.name}</Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addProductButton}
                onPress={handleAddProduct}
              >
                <AddCircle size={20} color={Colors.textSecondary} variant="Bold" />
                <Text style={styles.addProductButtonText}>إضافة منتج</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Submit Button */}
      {products.length > 0 && (
        <View style={styles.footer}>
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
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: Typography.sizes['2xl'],
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
  outletCard: {
    backgroundColor: Colors.background,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'left',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  productEmoji: {
    fontSize: 24,
  },
  productName: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
  },
  addProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  addProductButtonText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
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

