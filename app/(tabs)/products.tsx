/**
 * Products Screen
 * Product catalog with grid layout
 */

import { BodyText, Caption } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { Product } from '@/types';
import { useRouter } from 'expo-router';
import { SaudiRiyal } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
// @ts-ignore - Image import
import productsImage from '../../assets/images/cake.png';
// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'كيك المربل',
    description: 'كيك شهي بمذاق المربل اللذيذ',
    price: 25.50,
    image: productsImage,
    category: 'حلويات',
    stock: 150,
  },
  {
    id: '2',
    name: 'تشيز كيك',
    description: 'تشيز كيك كريمي بطبقات الفواكه',
    price: 30.00,
    image: productsImage,
    category: 'حلويات',
    stock: 80,
  },
  {
    id: '3',
    name: 'دونات',
    description: 'دونات طازجة محلاة بالشوكولاتة',
    price: 15.00,
    image: productsImage,
    category: 'حلويات',
    stock: 200,
  },
  {
    id: '4',
    name: 'كرواسون',
    description: 'كرواسون فرنسي مقرمش',
    price: 12.00,
    image: productsImage,
    category: 'مخبوزات',
    stock: 120,
  },
  {
    id: '5',
    name: 'بسكويت الشوكولاتة',
    description: 'بسكويت بالشوكولاتة الغنية',
    price: 18.50,
    image: productsImage,
    category: 'مخبوزات',
    stock: 300,
  },
  {
    id: '6',
    name: 'كيك الفانيليا',
    description: 'كيك فانيليا ناعم ومقرمش',
    price: 22.00,
    image: productsImage,
    category: 'حلويات',
    stock: 90,
  },
];

export default function ProductsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleProfilePress = () => {
    router.push({
      pathname: '/(tabs)/account',
      params: { returnTo: '/(tabs)/products' },
    });
  };

  // Get unique categories
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductPress = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.7}
    >
      <Caption style={styles.stockText}>
        المخزون: {item.stock} حبة
      </Caption>
      <View style={styles.productImageContainer}>
        {typeof item.image === 'string' ? (
          <BodyText style={styles.productEmoji}>{item.image}</BodyText>
        ) : (
          <Image source={item.image} style={styles.productImage} resizeMode="contain" />
        )}
      </View>
      <View style={styles.productInfo}>
        <BodyText style={styles.productName} numberOfLines={1}>
          {item.name}
        </BodyText>
        {/* <Caption style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Caption> */}
        <View style={styles.productPriceContainer}>
          <View style={styles.priceRow}>
            <BodyText style={styles.productPrice}>
              {item.price.toFixed(2)}
            </BodyText>
            <SaudiRiyal size={14} color={Colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
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
});
