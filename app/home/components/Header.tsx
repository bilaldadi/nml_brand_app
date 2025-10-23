/**
 * Header Component
 * Top overlay header with profile, location, and notifications
 */

import { LanguageSwitcher } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { Bell, MapPin, User } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onProfilePress,
  onNotificationPress,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.overlayHeader}>
      <View style={styles.locationInfo}>
        <MapPin size={16} color={Colors.white} />
        <Text style={styles.locationText}>{t('home.location')}</Text>
      </View>
      <View style={styles.headerRight}>
        <LanguageSwitcher style={styles.languageSwitcher} />
        <TouchableOpacity style={styles.notificationButton} onPress={onNotificationPress}>
          <Bell size={24} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
          <User size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing['2xl'] + Spacing.md,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  locationText: {
    fontSize: Typography.sizes.sm,
    color: Colors.white,
    fontWeight: Typography.weights.medium,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  languageSwitcher: {
    marginRight: Spacing.xs,
  },
});
