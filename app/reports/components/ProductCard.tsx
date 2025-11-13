/**
 * ProductCard Component
 * Displays a product card with image, name, and price
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { SaudiRiyal } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  id: string;
  name: string;
  image: any;
  price: number;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <Text style={styles.productName}>{name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>سعر البيع</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{price}</Text>
            <SaudiRiyal size={14} color={Colors.textPrimary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'flex-end',
  },
  productName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'right',
    marginBottom: Spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  priceLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
});

