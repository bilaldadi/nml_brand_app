/**
 * Products Screen
 * Product catalog with grid layout
 */

import { BodyText, Caption } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { Product as APIProduct } from '@/types/api.types';
import { useRouter } from 'expo-router';
import { SaudiRiyal } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { Header } from '@/app/home/components/Header';
import { SearchBar } from '@/app/home/components/SearchBar';
import { productsService } from '@/services/api';
import { BASE_URL } from '@/services/api/client';
// @ts-ignore - Image import
import productsImage from '../../assets/images/cake.png';

export default function ProductsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleProfilePress = () => {
    router.push({
      pathname: '/(tabs)/account',
      params: { returnTo: '/(tabs)/products' },
    });
  };

  // Fetch products from API
  const fetchProducts = useCallback(async (search?: string) => {
    setIsLoading(true);
    setError(null);
    //TODO: Add pagination !important
    try {
      const response = await productsService.getProducts({
        search: search || undefined,
        is_active: 1,
        per_page: 1000, // Fetch all products //TODO: Remove this !important
      });

      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching products');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle search with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fetchProducts]);

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.sub_category.name)));

  // Filter products by category (client-side)
  const filteredProducts = selectedCategory
    ? products.filter(product => product.sub_category.name === selectedCategory)
    : products;

  const handleProductPress = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const renderProductCard = ({ item }: { item: APIProduct }) => {
    const imageUrl = item.image_url 
      ? `${BASE_URL}/${item.image_url}`
      : null;

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item.id)}
        activeOpacity={0.7}
      >
        <Caption style={styles.stockText}>
          {item.brand.name}
        </Caption>
        <View style={styles.productImageContainer}>
          {imageUrl ? (
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.productImage} 
              resizeMode="contain"
              defaultSource={productsImage}
            />
          ) : (
            <Image source={productsImage} style={styles.productImage} resizeMode="contain" />
          )}
        </View>
        <View style={styles.productInfo}>
          <BodyText style={styles.productName} numberOfLines={1}>
            {item.name}
          </BodyText>
          <View style={styles.productPriceContainer}>
            <View style={styles.priceRow}>
              <BodyText style={styles.productPrice}>
                {item.selling_price.toFixed(2)}
              </BodyText>
              <SaudiRiyal size={14} color={Colors.primary} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
          onProfilePress={handleProfilePress}
          onNotificationPress={() => {}}
          variant="normal"
          title="المنتجات"
          />

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="بحث عن منتج..."
        variant="normal"
      />

      {/* Category Filters */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategory && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <BodyText
            style={!selectedCategory ? styles.categoryChipTextActive : styles.categoryChipText}
          >
            الكل
          </BodyText>
        </TouchableOpacity>
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                isActive && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <BodyText
                style={isActive ? styles.categoryChipTextActive : styles.categoryChipText}
              >
                {category}
              </BodyText>
            </TouchableOpacity>
          );
        })}
        </ScrollView>
      </View>

      {/* Products Grid */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <BodyText style={styles.loadingText}>جاري تحميل المنتجات...</BodyText>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <BodyText style={styles.errorText}>{error}</BodyText>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchProducts()}
          >
            <BodyText style={styles.retryButtonText}>إعادة المحاولة</BodyText>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <BodyText style={styles.emptyText}>لا توجد منتجات</BodyText>
            </View>
          }
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
  categoriesWrapper: {
    height: 50,
  },
  categoriesContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#FCE7E8',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  categoryChipText: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  categoryChipTextActive: {
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
  },
  productsList: {
    padding: Spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    // gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  productCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.xs,
    minWidth: '45%',
    maxWidth: '48%',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  productImageContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  productEmoji: {
    fontSize: 48,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'left',
  },
  productPriceContainer: {
    marginTop: 'auto',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.xs,
  },
  productPrice: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  stockText: {
    color: Colors.textPrimary,
    fontSize: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#FF947A2B',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
  },
  errorText: {
    color: Colors.error,
    fontSize: Typography.sizes.base,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: Typography.weights.semibold,
  },
});
