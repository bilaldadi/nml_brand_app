/**
 * Welcome Screen
 * Onboarding screen with app introduction
 */

import { BodyText, Button, Heading2, Logo } from '@/components/ui';
import { BorderRadius, Colors, Spacing } from '@/constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, StyleSheet, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleJoinPress = () => {
    router.push('/auth/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.mainContent}>
        <View style={styles.logoContainer}>
          <Logo size="medium" />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.slantedTop} />
          <View style={styles.textBackground}>
            <Heading2 align="center" style={styles.heading}>
              {t('welcome.title')}
            </Heading2>
            
            <BodyText align="center" color={Colors.textSecondary} style={styles.description}>
              {t('welcome.description')}
            </BodyText>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={t('welcome.joinButton')}
            onPress={handleJoinPress}
            variant="primary"
            size="large"
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  textContainer: {
    marginBottom: Spacing['2xl'],
    position: 'relative',
  },
  slantedTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 330,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F9F9EE',
    alignSelf: 'flex-start',
    borderTopLeftRadius: BorderRadius.xl,
  },
  textBackground: {
    backgroundColor: '#F9F9EE',
    paddingTop: Spacing.md,
    paddingBottom: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
    borderTopRightRadius: BorderRadius.xl,
    alignSelf: 'center',
  },
  heading: {
    marginBottom: Spacing.lg,
  },
  description: {
    lineHeight: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Spacing.xl,
    alignSelf: 'center',
    width: 250,
  },
});