/**
 * OTP Verification Screen
 * Handles OTP verification after phone number entry
 */

import { BodyText, Button, Caption, Heading2 } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const OTP_LENGTH = 4;
const RESEND_TIMEOUT = 60; // seconds

export default function OTPScreen() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (value && index === OTP_LENGTH - 1) {
      const isComplete = newOtp.every(digit => digit !== '');
      if (isComplete) {
        const otpCode = newOtp.join('');
        // Small delay for better UX
        setTimeout(() => {
          verifyOtp(otpCode);
        }, 300);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async (otpCode: string) => {
    if (otpCode.length !== OTP_LENGTH) return;

    setIsLoading(true);
    
    // TODO: Implement OTP verification API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app
      router.replace('/home');
    }, 1500);
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    verifyOtp(otpCode);
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    // TODO: Implement resend OTP API call
    setTimer(RESEND_TIMEOUT);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
  };

  const handleBackPress = () => {
    router.back();
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <BodyText style={styles.backArrow}>→</BodyText>
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Heading2 align="center" style={styles.title}>
            تأكيد رقم الهاتف
          </Heading2>
          <BodyText align="center" color={Colors.textSecondary} style={styles.subtitle}>
            أدخل رمز التحقق المرسل إلى
          </BodyText>
          <BodyText align="center" color={Colors.textPrimary} style={styles.phoneNumber}>
            {phoneNumber || '05XXXXXXXX'}
          </BodyText>
        </View>

        {/* OTP Input */}
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

        {/* Verify Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="تحقق"
            onPress={handleVerify}
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={!isOtpComplete}
          />
        </View>

        {/* Resend Section */}
        <View style={styles.resendContainer}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Caption color={Colors.primary}>
                إعادة إرسال الرمز
              </Caption>
            </TouchableOpacity>
          ) : (
            <Caption color={Colors.textLight}>
              يمكنك إعادة الإرسال بعد {timer} ثانية
            </Caption>
          )}
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
    paddingTop: Spacing.xl,
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
    marginBottom: Spacing.xs,
  },
  phoneNumber: {
    fontWeight: Typography.weights.semibold,
    fontSize: Typography.sizes.lg,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing['2xl'],
  },
  otpInput: {
    width: 56,
    height: 64,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    marginTop: Spacing.xl,
  },
  resendContainer: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
});

