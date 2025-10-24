/**
 * Login Screen
 * Phone number input for authentication
 */

import { BodyText, Button, Caption, Heading2 } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isRTL = I18nManager.isRTL;
  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: '/auth/otp',
        params: { phoneNumber },
      });
    }, 1500);
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            {isRTL ? <BodyText style={styles.backArrow}>←</BodyText> : <BodyText style={styles.backArrow}>→</BodyText>}
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Heading2 align="center" style={styles.title}>
            {t('auth.login')}
          </Heading2>
          <BodyText align="center" color={Colors.textSecondary} style={styles.subtitle}>
            {t('auth.enterPhone')}
          </BodyText>
        </View>

        <View style={styles.inputContainer}>
          <Caption style={styles.label}>{t('auth.phoneNumber')}</Caption>
          <TextInput
            style={styles.input}
            placeholder={t('auth.phonePlaceholder')}
            placeholderTextColor={Colors.textLight}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={t('auth.continue')}
            onPress={handleLogin}
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={phoneNumber.length < 10}
          />
        </View>

        <View style={styles.termsContainer}>
          <Caption align="center" color={Colors.textLight}>
            {t('auth.terms')}
          </Caption>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    paddingTop: Spacing.xl*2,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: Typography.sizes['2xl'],
  },
  titleContainer: {
    marginBottom: Spacing['2xl'],
  },
  title: {
    marginBottom: Spacing.sm,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  inputContainer: {
    marginBottom: Spacing.xl,
  },
  label: {
    marginBottom: Spacing.sm,
    color: Colors.textPrimary,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonContainer: {
    marginTop: Spacing.xl,
  },
  termsContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
});