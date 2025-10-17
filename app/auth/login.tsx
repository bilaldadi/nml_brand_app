/**
 * Login Screen
 * Handles user authentication (login/signup)
 */

import { BodyText, Button, Caption, Heading2 } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // TODO: Implement authentication logic
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app
      router.replace('/home');
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <BodyText>←</BodyText>
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Heading2 align="center" style={styles.title}>
            تسجيل الدخول
          </Heading2>
          <BodyText align="center" color={Colors.textSecondary} style={styles.subtitle}>
            أدخل رقم هاتفك للمتابعة
          </BodyText>
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Caption style={styles.label}>رقم الهاتف</Caption>
          <TextInput
            style={styles.input}
            placeholder="05XXXXXXXX"
            placeholderTextColor={Colors.textLight}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {/* Login Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="متابعة"
            onPress={handleLogin}
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={phoneNumber.length < 10}
          />
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Caption align="center" color={Colors.textLight}>
            بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية
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
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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

