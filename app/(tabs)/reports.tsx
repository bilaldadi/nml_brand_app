/**
 * Reports Screen
 * Analytics and reporting dashboard - Coming Soon
 */

import { Header } from '@/app/home/components/Header';
import { BodyText } from '@/components/ui';
import { Colors, Spacing, Typography } from '@/constants';
import { useRouter } from 'expo-router';
import { Chart2 } from 'iconsax-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ReportsScreen() {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push({
      pathname: '/(tabs)/account',
      params: { returnTo: '/(tabs)/reports' },
    });
  };

  const handleNotificationPress = () => {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="التقارير"
        variant="normal"
        onProfilePress={handleProfilePress}
        onNotificationPress={handleNotificationPress}
      />

      {/* Coming Soon Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Chart2 size={64} color={Colors.primary} variant="Bold" />
          </View>
        </View>

        <Text style={styles.title}>قريباً</Text>

        <BodyText style={styles.description}>
          نعمل على إعداد صفحة التقارير والإحصائيات الخاصة بك
        </BodyText>

        <BodyText style={styles.subDescription}>
          سنقوم بإشعارك فور توفرها
        </BodyText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing['2xl'],
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FCE7E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  description: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.sizes.base * 1.6,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  subDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textLight,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
});
