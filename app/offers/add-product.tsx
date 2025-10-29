/**
 * Add Product Screen
 * Form to add product details for an offer
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useOffer } from '@/contexts/OfferContext';
import { useRouter } from 'expo-router';
import { ArrowDown2 } from 'iconsax-react-native';
import { SaudiRiyal } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    I18nManager,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AddProductScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const { addProduct } = useOffer();

  const [selectedProduct, setSelectedProduct] = useState('كيك المربل');
  const [selectedProductEmoji, setSelectedProductEmoji] = useState('🍰');
  const [selectedCategory, setSelectedCategory] = useState('حلويات');
  const [selectedSubCategory, setSelectedSubCategory] = useState('كيك');
  const [proposedPrice, setProposedPrice] = useState('10');
  const [commission, setCommission] = useState('2');
  const [quantity, setQuantity] = useState('10');

  const [showProductPicker, setShowProductPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showSubCategoryPicker, setShowSubCategoryPicker] = useState(false);

  const products = [
    { id: '1', name: 'كيك المربل', emoji: '🍰' },
    { id: '2', name: 'كيك الشوكولاتة', emoji: '🎂' },
    { id: '3', name: 'كيك الفانيليا', emoji: '🧁' },
  ];

  const categories = [
    { id: '1', name: 'حلويات' },
    { id: '2', name: 'مخبوزات' },
    { id: '3', name: 'مشروبات' },
  ];

  const subCategories = [
    { id: '1', name: 'كيك' },
    { id: '2', name: 'تشيز كيك' },
    { id: '3', name: 'دونات' },
  ];

  const handleAddProduct = () => {
    // Add product to global state
    addProduct({
      name: selectedProduct,
      emoji: selectedProductEmoji,
    });

    // Navigate back to add-offer screen
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>إضافة منتج</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>{isRTL ? '→' : '←'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Product Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>اختر المنتج</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowProductPicker(true)}
          >
            <View style={styles.pickerContent}>
              <Text style={styles.pickerEmoji}>🍰</Text>
              <Text style={styles.pickerText}>{selectedProduct}</Text>
            </View>
            <ArrowDown2 size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>التصنيف</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowCategoryPicker(true)}
          >
            <Text style={styles.pickerText}>{selectedCategory}</Text>
            <ArrowDown2 size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Sub-Category Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>التصنيف الفرعي</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowSubCategoryPicker(true)}
          >
            <Text style={styles.pickerText}>{selectedSubCategory}</Text>
            <ArrowDown2 size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Price and Commission Row */}
        <View style={styles.row}>
          <View style={[styles.section, styles.halfWidth]}>
            <Text style={styles.label}>سعر البيع المقترح</Text>
            <View style={styles.inputWithPrefix}>
              <View style={styles.prefixContainer}>
                <View style={styles.prefixContent}>
                    <Text style={styles.prefixText}>للعلبة</Text>
                    <SaudiRiyal size={18} color={Colors.textPrimary} />
                </View>
              </View>
              <TextInput
                style={styles.inputWithText}
                value={proposedPrice}
                onChangeText={setProposedPrice}
                placeholder="10"
                placeholderTextColor={Colors.textLight}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={[styles.section, styles.halfWidth]}>
            <Text style={styles.label}>عمولة منفذ بيع</Text>
            <View style={styles.inputWithPrefix}>
              <View style={styles.prefixContainer}>
                <Text style={styles.prefixText}>%</Text>
              </View>
              <TextInput
                style={styles.inputWithText}
                value={commission}
                onChangeText={setCommission}
                placeholder="2"
                placeholderTextColor={Colors.textLight}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.section}>
          <Text style={styles.label}>الكمية المبدئية المقترحة</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="10"
            placeholderTextColor={Colors.textLight}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Add Product Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.addButtonText}>إضافة المنتج للبيع</Text>
        </TouchableOpacity>
      </View>

      {/* Product Picker Modal */}
      <Modal
        visible={showProductPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowProductPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>اختر المنتج</Text>
              <TouchableOpacity onPress={() => setShowProductPicker(false)}>
                <Text style={styles.modalClose}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {products.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedProduct(product.name);
                    setSelectedProductEmoji(product.emoji);
                    setShowProductPicker(false);
                  }}
                >
                  <Text style={styles.modalItemEmoji}>{product.emoji}</Text>
                  <Text style={styles.modalItemText}>{product.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Category Picker Modal */}
      <Modal
        visible={showCategoryPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>اختر التصنيف</Text>
              <TouchableOpacity onPress={() => setShowCategoryPicker(false)}>
                <Text style={styles.modalClose}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCategory(category.name);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Sub-Category Picker Modal */}
      <Modal
        visible={showSubCategoryPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSubCategoryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>اختر التصنيف الفرعي</Text>
              <TouchableOpacity onPress={() => setShowSubCategoryPicker(false)}>
                <Text style={styles.modalClose}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {subCategories.map((subCategory) => (
                <TouchableOpacity
                  key={subCategory.id}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedSubCategory(subCategory.name);
                    setShowSubCategoryPicker(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{subCategory.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'left',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  pickerEmoji: {
    fontSize: 24,
  },
  pickerText: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    textAlign: 'right',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputWithPrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    direction: 'ltr',
  },
  prefixContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  prefixContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  prefixText: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.semibold,
  },
  inputWithText: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: Colors.white,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '70%',
    paddingBottom: Spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  modalClose: {
    fontSize: 32,
    color: Colors.textSecondary,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalItemEmoji: {
    fontSize: 24,
  },
  modalItemText: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
  },
});

