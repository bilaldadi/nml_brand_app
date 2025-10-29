/**
 * Offer Success Screen
 * Success confirmation after submitting an offer
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useRouter } from 'expo-router';
import { TickCircle } from 'iconsax-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OfferSuccessScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleGoHome = () => {
    // Navigate back to home and close all offer screens
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header} />

      {/* Success Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <TickCircle size={80} color={Colors.success} variant="Bold" />
        </View>

        <Text style={styles.successMessage}>تم ارسال العرض لمنفذ البيع</Text>

        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>الذهاب للصفحة الرئيسية</Text>
        </TouchableOpacity>
      </View>
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
    height: 120,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.xl,
  },
  successMessage: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
  },
  homeButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    minWidth: '80%',
    alignItems: 'center',
  },
  homeButtonText: {
    color: Colors.white,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
});

