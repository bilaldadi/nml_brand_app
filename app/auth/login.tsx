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
  const [error, setError] = useState('');
  const isRTL = I18nManager.isRTL;

  // Saudi phone number regex: 9 or 10 digits, optionally starting with 0
  const saudiPhoneRegex = /^(05|5)[0-9]{8}$/;

  const validatePhoneNumber = (phone: string): boolean => {
    return saudiPhoneRegex.test(phone);
  };

  const handlePhoneChange = (text: string) => {
    // Only allow digits
    const cleaned = text.replace(/[^0-9]/g, '');
    setPhoneNumber(cleaned);
    setError('');
  };

  const handleLogin = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError(t('auth.invalidPhone'));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Format with +966 prefix for display
      const formattedPhone = phoneNumber.startsWith('0') 
        ? `+966${phoneNumber.slice(1)}` 
        : `+966${phoneNumber}`;
      router.push({
        pathname: '/auth/otp',
        params: { phoneNumber: formattedPhone },
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
          <View style={styles.phoneInputWrapper}>
            <View style={styles.prefixContainer}>
              <BodyText style={styles.prefix}>+966</BodyText>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="5XXXXXXXX"
              placeholderTextColor={Colors.textLight}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          {error ? (
            <Caption style={styles.errorText}>{error}</Caption>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={t('auth.continue')}
            onPress={handleLogin}
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={phoneNumber.length < 9}
          />
        </View>

        {/* <View style={styles.termsContainer}>
          <Caption align="center" color={Colors.textLight}>
            {t('auth.terms')}
          </Caption>
        </View> */}
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
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    direction: 'ltr',
  },
  prefixContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  prefix: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.semibold,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
  },
  errorText: {
    marginTop: Spacing.sm,
    color: Colors.error,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: Spacing.xl,
  },
  termsContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
});