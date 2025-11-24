/**
 * Product Details Screen
 * Shows detailed information about a specific product
 */

import { BodyText, Caption, Heading2 } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { Product as APIProduct } from '@/types/api.types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft2, ArrowRight2, Box, Heart, Tag } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  I18nManager,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { productsService } from '@/services/api';
import { BASE_URL } from '@/services/api/client';
import { SaudiRiyal } from 'lucide-react-native';
// @ts-ignore - Image import
import productsImage from '@/assets/images/cake.png';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isRTL = I18nManager.isRTL;
  const [isFavorited, setIsFavorited] = useState(false);
  const [product, setProduct] = useState<APIProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const response = await productsService.getProductById(Number(id));
        
        if (response.success && response.data) {
          setProduct(response.data);
        } else {
          setError(response.message || 'Failed to fetch product');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching product');
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowRight2 size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <BodyText style={styles.loadingText}>جاري تحميل تفاصيل المنتج...</BodyText>
        </View>
      </View>
    );
  }

  // Error or product not found
  if (error || !product) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft2 size={24} color={Colors.white} />
          </TouchableOpacity>
          <Heading2 style={styles.headerTitle}>خطأ</Heading2>
        </View>
        <View style={styles.errorContainer}>
          <BodyText style={styles.errorText}>{error || 'المنتج المطلوب غير موجود'}</BodyText>
          <TouchableOpacity
            style={styles.backToProductsButton}
            onPress={() => router.push('/(tabs)/products')}
          >
            <BodyText style={styles.backToProductsText}>العودة للمنتجات</BodyText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // const handleAddToCart = () => {
  //   // TODO: Implement add to cart functionality
  //   console.log('Add to cart:', product.id, quantity);
  // };

  // const handleQuantityChange = (delta: number) => {
  //   const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta));
  //   setQuantity(newQuantity);
  // };

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
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorited(!isFavorited)}
        >
          <Heart
            size={24}
            color={Colors.white}
            variant={isFavorited ? 'Bold' : 'Outline'}
            fill={isFavorited ? Colors.white : 'none'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image_url ? (
            <Image 
              source={{ uri: `${BASE_URL}/${product.image_url}` }} 
              style={styles.productImage} 
              resizeMode="contain"
              defaultSource={productsImage}
            />
          ) : (
            <Image source={productsImage} style={styles.productImage} resizeMode="contain" />
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.categoryBadge}>
            <Caption style={styles.categoryText}>{product.sub_category.name}</Caption>
          </View>

          <Heading2 style={styles.productName}>{product.name}</Heading2>

          {/* SKU */}
          <View style={styles.section}>
            <Caption style={styles.skuText}>SKU: {product.sku}</Caption>
          </View>

          {/* Description */}
          {product.description && (
            <View style={styles.section}>
              <BodyText style={styles.description}>{product.description}</BodyText>
            </View>
          )}

          {/* Brand Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Caption style={styles.cardLabel}>العلامة التجارية</Caption>
              <BodyText style={styles.cardValue}>
                {product.brand.name}
              </BodyText>
            </View>
            <View style={styles.iconContainer}>
              <Box size={24} color={Colors.primary} variant="Outline" />
            </View>
          </View>

          {/* Cost Price Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Caption style={styles.cardLabel}>سعر التكلفة</Caption>
              <View style={styles.priceRow}>
                <BodyText style={styles.cardValue}>
                  {product.cost_price.toFixed(2)}
                </BodyText>
                <SaudiRiyal size={15} />
              </View>
            </View>
            <View style={styles.iconContainer}>
              <Tag size={24} color={Colors.textSecondary} variant="Outline" />
            </View>
          </View>

          {/* Selling Price Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Caption style={styles.cardLabel}>سعر البيع</Caption>
              <View style={styles.priceRow}>
                <BodyText style={styles.cardValue}>
                  {product.selling_price.toFixed(2)}
                </BodyText>
                <SaudiRiyal size={15} />
              </View>
            </View>
            <View style={styles.iconContainer}>
              <Tag size={24} color={Colors.primary} variant="Outline" />
            </View>
          </View>

          {/* Status */}
          <View style={[styles.infoCard, !product.is_active && styles.inactiveCard]}>
            <View style={styles.cardContent}>
              <Caption style={styles.cardLabel}>الحالة</Caption>
              <BodyText style={[styles.cardValue, !product.is_active && styles.inactiveText]}>
                {product.is_active ? 'نشط' : 'غير نشط'}
              </BodyText>
            </View>
          </View>

          {/* Quantity Selector */}
          {/* <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>الكمية</Heading3>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <BodyText style={quantity <= 1 ? styles.quantityButtonDisabled : styles.quantityButtonText}>
                  -
                </BodyText>
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <BodyText style={styles.quantityText}>{quantity}</BodyText>
              </View>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <BodyText style={quantity >= product.stock ? styles.quantityButtonDisabled : styles.quantityButtonText}>
                  +
                </BodyText>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      {/* <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Caption style={styles.totalLabel}>المجموع</Caption>
          <View style={styles.totalPriceRow}>
            <BodyText style={styles.totalPrice}>
              {(product.price * quantity).toFixed(2)}
            </BodyText>
            <SaudiRiyal size={18} color={Colors.primary} />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.addToCartButton, product.stock === 0 && styles.addToCartButtonDisabled]}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart size={20} color={Colors.white} />
          <BodyText style={styles.addToCartText}>
            {product.stock === 0 ? 'غير متوفر' : 'إضافة للسلة'}
          </BodyText>
        </TouchableOpacity>
      </View> */}
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
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    // paddingBottom: Spacing['3xl'],
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: Spacing.lg,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8465021',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
  },
  categoryText: {
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
    fontSize: Typography.sizes.sm,
  },
  productName: {
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
    textAlign: 'left',
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: '#E8465021',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    marginBottom: Spacing.xs,
    textAlign: 'left',
  },
  cardValue: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    textAlign: 'left',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'flex-start',
  },
  currencyText: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    textAlign: 'right',
  },
  description: {
    color: Colors.textPrimary,
    lineHeight: Typography.sizes.base * 1.6,
    textAlign: 'left',
    marginTop: Spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    justifyContent: 'flex-end',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  quantityButtonDisabled: {
    color: Colors.textLight,
  },
  quantityDisplay: {
    minWidth: 50,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
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
  backToProductsButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  backToProductsText: {
    color: Colors.white,
    fontWeight: Typography.weights.semibold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  loadingText: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
    fontSize: Typography.sizes.base,
  },
  skuText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    textAlign: 'left',
  },
  inactiveCard: {
    borderColor: Colors.error,
    backgroundColor: '#FEE',
  },
  inactiveText: {
    color: Colors.error,
  },
  bottomBar: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Platform.select({ ios: Spacing.lg, android: Spacing.md }),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textAlign: 'right',
  },
  totalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'flex-end',
  },
  totalPrice: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  addToCartButtonDisabled: {
    backgroundColor: Colors.textLight,
  },
  addToCartText: {
    color: Colors.white,
    fontWeight: Typography.weights.semibold,
    fontSize: Typography.sizes.base,
  },
});

