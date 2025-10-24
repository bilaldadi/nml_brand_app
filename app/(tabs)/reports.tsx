/**
 * Reports Screen
 * Analytics and reporting dashboard
 */

import { Heading2 } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ReportsScreen() {
  return (
    <View style={styles.container}>
      <Heading2>Reports Screen</Heading2>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
});


