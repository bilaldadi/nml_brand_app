/**
 * Welcome Screen
 * First screen users see when they open the app
 * Provides option to join/login
 */

import { BodyText, Button, Heading2, Logo } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleJoinPress = () => {
    // Navigate to login/signup screen
    router.push('/auth/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View
        style={styles.mainContent}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Logo size="medium" />
        </View>

        {/* Welcome Text Section */}
        <View style={styles.textContainer}>
          <Heading2 align="center" style={styles.heading}>
            أهلاً وسهلاً بكم تطبيق نمل
          </Heading2>
          
          <BodyText align="center" color={Colors.textSecondary} style={styles.description}>
            نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص
          </BodyText>
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="انضم لنمل"
            onPress={handleJoinPress}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: Spacing['2xl'],
  },
  heading: {
    marginBottom: Spacing.lg,
  },
  description: {
    paddingHorizontal: Spacing.md,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: 'auto',
  },
});

