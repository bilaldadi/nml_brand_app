import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { BodyText } from '@/components/ui/Typography';
import { Colors, Spacing, Typography } from '@/constants';
import { useLanguage } from '@/i18n/LanguageContext';
import { useRouter } from 'expo-router';
import { Globe, HelpCircle, LogOut, MapPin, PhoneCall, User2 } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AccountScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const isRTL = I18nManager.isRTL;

  const handleToggleLanguage = async () => {
    const newLang = currentLanguage === 'ar' ? 'en' : 'ar';
    await changeLanguage(newLang);
  };

  const tiles = [
    {
      id: 'info',
      label: t('account.accountInfo'),
      icon: <User2 size={20} color={Colors.textSecondary} />,
      onPress: () => {},
    },
    {
      id: 'language',
      label: t('account.language'),
      right: (
        <View style={styles.langRight}>
          <Text style={styles.langCode}>{currentLanguage === 'ar' ? 'العربية' : 'English'}</Text>
          <Globe size={18} color={Colors.textSecondary} />
        </View>
      ),
      onPress: handleToggleLanguage,
    },
    {
      id: 'faq',
      label: t('account.faq'),
      icon: <HelpCircle size={20} color={Colors.textSecondary} />,
      onPress: () => {},
    },
    {
      id: 'privacy',
      label: t('account.privacy'),
      icon: <MapPin size={20} color={Colors.textSecondary} />,
      onPress: () => {},
    },
    {
      id: 'contact',
      label: t('account.contactUs'),
      icon: <PhoneCall size={20} color={Colors.textSecondary} />,
      onPress: () => {},
    },
    {
      id: 'logout',
      label: t('account.logout'),
      icon: <LogOut size={20} color={Colors.textSecondary} />,
      onPress: () => {},
    },
  ];

  const tabs = [
    { id: 'reports', label: t('navigation.reports'), icon: 'bar-chart-3', onPress: () => router.push('/reports') },
    { id: 'orders', label: t('navigation.orders'), icon: 'package', onPress: () => router.push('/orders') },
    { id: 'offers', label: t('navigation.offers'), icon: 'percent', onPress: () => router.push('/offers') },
    { id: 'products', label: t('navigation.products'), icon: 'grid-3x3', onPress: () => router.push('/products') },
    { id: 'home', label: t('navigation.home'), icon: 'home', onPress: () => router.push('/home') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('account.title')}</Text>
        <TouchableOpacity style={styles.headerBack} onPress={() => router.back()}>
          <Text style={styles.backArrow}>{isRTL ? '→' : '←'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tiles.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.onPress} activeOpacity={0.8} style={styles.tile}>
            <View style={styles.tileLeft}>
              {item.icon}
              <BodyText style={styles.tileText}>{item.label}</BodyText>
            </View>
            <View style={styles.tileRight}>
              {item.right}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNavigation tabs={tabs.map((t, idx) => ({ ...t, active: t.id === 'home' && false }))} />
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
  headerBack: {
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
    padding: Spacing.lg,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
  },
  tileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  tileText: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
  },
  tileRight: {
  },
  langRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  langCode: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
  },
});


