/**
 * Order Success Screen
 * Success confirmation after accepting an order
 */

import { BodyText, Heading2 } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useRouter } from 'expo-router';
import { TickCircle } from 'iconsax-react-native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function OrderSuccessScreen() {
  const router = useRouter();

  const handleGoToOffers = () => {
    router.replace('/(tabs)/orders');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header} />

      {/* Success Content */}
      <View style={styles.contentCard}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <TickCircle size={60} color={Colors.white} variant="Bold" />
          </View>
        </View>

        <Heading2 style={styles.successTitle}>تم قبول طلبك</Heading2>

        <BodyText style={styles.successDescription}>
          سيقوم فريق نمل بالتواصل معكم لتنسيق التسليم و الاستلام
        </BodyText>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleGoToOffers}
          activeOpacity={0.8}
        >
          <BodyText style={styles.continueButtonText}>تابع صفحة الطلبات</BodyText>
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
    height: Platform.select({ ios: 120, android: 100 }),
  },
  contentCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -BorderRadius.xl,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: Spacing['2xl'],
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  successDescription: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.sizes.base * 1.6,
    marginBottom: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing['2xl'],
    minWidth: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
});

