/**
 * No Offer Marker Modal
 * Shows outlet details when a no offer marker is pressed
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useOffer } from '@/contexts/OfferContext';
import { Box, Call, CloseCircle, DiscountCircle, Location, Message, Tag } from 'iconsax-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NoOfferModalProps {
  visible: boolean;
  onClose: () => void;
  outletData?: {
    name: string;
    location: string;
    neighborhood: string;
  };
}

export const NoOfferModal: React.FC<NoOfferModalProps> = ({
  visible,
  onClose,
  outletData = {
    name: 'بنده',
    location: 'حي الروضة، شارع الأمير',
    neighborhood: 'الروضة',
  },
}) => {
  const { t } = useTranslation();
  const { clearProducts } = useOffer();

  const actionButtons = [
    { id: 'call', icon: Call, label: 'اتصال', color: Colors.primary },
    { id: 'message', icon: Message, label: 'رسائل', color: Colors.primary },
    { id: 'directions', icon: Location, label: 'الاتجاه', color: Colors.primary },
  ];

  const productCategories = [
    { id: 'clothes', icon: Tag, label: 'ملابس', color: Colors.primary },
    { id: 'products', icon: Box, label: 'جوالات', color: Colors.primary },
    { id: 'accessories', icon: DiscountCircle, label: 'اكسسوارات', color: Colors.primary },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>تفاصيل منفذ البيع</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseCircle size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Outlet Info */}
            <View style={styles.outletInfo}>
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>بنده</Text>
              </View>
              <View style={styles.outletDetails}>
                <Text style={styles.outletName}>{outletData.name}</Text>
                <Text style={styles.outletLocation}>{outletData.location}</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {actionButtons.map((button) => (
                <TouchableOpacity key={button.id} style={styles.actionButton}>
                  <button.icon size={20} color={button.color} variant="Bold" />
                  <Text style={styles.actionButtonText}>{button.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Product Categories Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>بستقبل المنتجات</Text>
              <View style={styles.categoryButtons}>
                {productCategories.map((category) => (
                  <TouchableOpacity key={category.id} style={styles.categoryButton}>
                    <category.icon size={20} color={category.color} variant="Bold" />
                    <Text style={styles.categoryButtonText}>{category.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Send Offer Button */}
            <View style={styles.section}>
              <TouchableOpacity 
                style={styles.sendOfferButton}
                onPress={() => {
                  // Clear any existing products from previous offer
                  // clearProducts();
                  onClose();
                  // Small delay to ensure modal closes before navigation
                  setTimeout(() => {
                    require('expo-router').router.push('/offers/add-offer');
                  }, 300);
                }}
              >
                <Text style={styles.sendOfferButtonText}>أرسل عرض على التصريف</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '85%',
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  closeButton: {
    position: 'absolute',
    left: Spacing.lg,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
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
  outletDetails: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  outletName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  outletLocation: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  actionButtonText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'left',
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  categoryButtonText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
  sendOfferButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendOfferButtonText: {
    color: Colors.white,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
});

