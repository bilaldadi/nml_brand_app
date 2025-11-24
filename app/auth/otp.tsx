/**
 * OTP Verification Screen
 * 4-digit code verification with auto-submit
 */

import { BodyText, Button, Heading2 } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { authService } from '@/services/api';
import { ApiError } from '@/types/api.types';
import { tokenManager } from '@/utils/tokenManager';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, I18nManager, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const OTP_LENGTH = 4;
const RESEND_TIMER_SECONDS = 60;

export default function OTPScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const isRTL = I18nManager.isRTL;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [canResend]);

  const handleOtpChange = (value: string, index: number) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === OTP_LENGTH - 1) {
      const isComplete = newOtp.every(digit => digit !== '');
      if (isComplete) {
        const otpCode = newOtp.join('');
        setTimeout(() => {
          verifyOtp(otpCode);
        }, 300);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async (otpCode: string) => {
    if (otpCode.length !== OTP_LENGTH) return;

    setIsLoading(true);
    setError('');

    try {
      // Extract phone number from display format (+966 XXX XXX XXX)
      const cleanPhone = (phoneNumber as string).replace(/\D/g, '');
      
      // Verify OTP with API
      const response = await authService.verifyOTP(cleanPhone, otpCode, 'supplier_agent');
      
      if (response.success && response.access_token) {
        // Store token in memory
        tokenManager.setToken(response.access_token);
        
        // Navigate to home screen
        router.replace('/(tabs)/home');
      } else {
        setError(response.message || t('auth.invalidOTP'));
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || t('auth.invalidOTP'));
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    verifyOtp(otpCode);
  };

  const handleResend = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setError('');

    try {
      // Extract phone number from display format
      const cleanPhone = (phoneNumber as string).replace(/\D/g, '');
      
      // Request new OTP
      const response = await authService.requestOTP(cleanPhone, 'supplier_agent');
      
      if (response.success) {
        setTimer(RESEND_TIMER_SECONDS);
        setCanResend(false);
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
        
        Alert.alert(t('auth.success'), t('auth.otpResent'));
      } else {
        setError(response.message || t('auth.errorGeneric'));
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || t('auth.errorGeneric'));
    } finally {
      setIsLoading(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            {isRTL ? <BodyText style={styles.backArrow}>←</BodyText> : <BodyText style={styles.backArrow}>→</BodyText>}
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Heading2 align="center" style={styles.title}>
            {t('auth.otpTitle')}
          </Heading2>
          <BodyText align="center" color={Colors.textSecondary} style={styles.subtitle}>
            {t('auth.otpSubtitle')} {phoneNumber}
          </BodyText>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              autoFocus={index === 0}
            />
          ))}
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <BodyText color={Colors.error} align="center" style={styles.errorText}>
              {error}
            </BodyText>
          </View>
        ) : null}

        <View style={styles.resendContainer}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend} disabled={isLoading}>
              <BodyText color={Colors.primary} style={styles.resendText}>
                {t('auth.resendCode')}
              </BodyText>
            </TouchableOpacity>
          ) : (
            <BodyText color={Colors.textSecondary} style={styles.resendText}>
              {t('auth.resendTimer', { seconds: timer })}
            </BodyText>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={t('auth.verify')}
            onPress={handleVerify}
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={!isOtpComplete}
          />
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
    paddingBottom: Spacing.xl,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing['2xl'],
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    textAlign: 'center',
    fontSize: Typography.sizes['2xl'],
    color: Colors.textPrimary,
    backgroundColor: Colors.background,
  },
  otpInputFilled: {
    borderColor: Colors.primary,
  },
  errorContainer: {
    marginBottom: Spacing.md,
  },
  errorText: {
    fontSize: Typography.sizes.sm,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  resendText: {
    fontSize: Typography.sizes.base,
  },
  buttonContainer: {
   
  },
});