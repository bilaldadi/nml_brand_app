/**
 * Home Screen (Placeholder)
 * Main screen after authentication
 */

import { BodyText, Heading2 } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Heading2 align="center">الصفحة الرئيسية</Heading2>
      <BodyText align="center" color={Colors.textSecondary} style={styles.text}>
        مرحباً بك في تطبيق نمل
      </BodyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  text: {
    marginTop: Spacing.md,
  },
});

