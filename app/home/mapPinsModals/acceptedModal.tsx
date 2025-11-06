/**
 * Accepted Marker Modal
 * Shows outlet details when an accepted marker is pressed
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { Box, Call, CloseCircle, DiscountCircle, Location, Message, Tag, TickCircle, Truck } from 'iconsax-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface AcceptedModalProps {
  visible: boolean;
  onClose: () => void;
  outletData?: {
    name: string;
    location: string;
    neighborhood: string;
  };
}

export const AcceptedModal: React.FC<AcceptedModalProps> = ({
  visible,
  onClose,
  outletData = {
    name: 'بنده',
    location: 'حي الروضة، شارع الأمير',
    neighborhood: 'الروضة',
  },
}) => {
  const { t } = useTranslation();

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

  const statusSteps = [
    { id: 1, label: 'قبول العرض', icon: TickCircle, active: true, completed: true },
    { id: 2, label: 'تجهيز الطلب', icon: Box, active: true, completed: true },
    { id: 3, label: 'مع المندوب', icon: Truck, active: true, completed: true },
    { id: 4, label: 'في الموقع', icon: Location, active: true, completed: true },
    { id: 5, label: 'على الرف', icon: TickCircle, active: true, completed: false },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
       <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
        <TouchableWithoutFeedback>
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

              {/* Status Timeline */}
              <View style={styles.section}>
                <View style={styles.timelineContainer}>
                  {statusSteps.map((step, index) => {
                    const IconComponent = step.icon;
                    const isLast = index === statusSteps.length - 1;
                    const nextStep = statusSteps[index + 1];
                    const lineCompleted = step.completed && nextStep?.completed;
                    
                    return (
                      <React.Fragment key={step.id}>
                        <View style={styles.timelineStep}>
                          <View
                            style={[
                              styles.timelineStepIcon,
                              step.completed && styles.timelineStepIconCompleted,
                            ]}
                          >
                            <IconComponent
                              size={18}
                              color={step.completed ? Colors.white : Colors.textSecondary}
                              variant="Bold"
                            />
                          </View>
                          {!isLast && (
                            <View
                              style={[
                                styles.timelineStepLine,
                                lineCompleted && styles.timelineStepLineCompleted,
                              ]}
                            />
                          )}
                          <Text
                            style={[
                              styles.timelineLabel,
                              step.completed && styles.timelineLabelCompleted,
                            ]}
                          >
                            {step.label}
                          </Text>
                        </View>
                      </React.Fragment>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
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
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  timelineStepIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
    zIndex: 1,
  },
  timelineStepIconCompleted: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timelineStepLine: {
    position: 'absolute',
    top: 20,
    left: '50%',
    width: '100%',
    height: 2,
    backgroundColor: Colors.border,
    borderStyle: 'dashed',
    zIndex: 0,
    
  },
  timelineStepLineCompleted: {
    backgroundColor: Colors.primary,
    borderStyle: 'solid',
  },
  timelineLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  timelineLabelCompleted: {
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
});

