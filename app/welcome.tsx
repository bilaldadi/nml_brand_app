/**
 * Welcome Screen
 * First screen users see when they open the app
 * Provides option to join/login
 */

import { BodyText, Button, Heading2, Logo } from '@/components/ui';
import { BorderRadius, Colors, Spacing } from '@/constants';
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
          <View style={styles.slantedTop} />
          <View style={styles.textBackground}>
            <Heading2 align="center" style={styles.heading}>
              أهلاً وسهلاً بكم تطبيق نمل
            </Heading2>
            
            <BodyText align="center" color={Colors.textSecondary} style={styles.description}>
              نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص تعريفي نص
            </BodyText>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="انضم لنمل"
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
    // backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 330,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F9F9EE',
    alignSelf: 'flex-start',
    // marginLeft: -20,
    borderTopLeftRadius: BorderRadius.xl,
  },
  textBackground: {
    backgroundColor: '#F9F9EE',
    paddingTop: Spacing.md,
    paddingBottom: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
    // borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    borderBottomLeftRadius: BorderRadius.xl,
    // width: 400,
    alignSelf: 'center',
  },
  heading: {
    marginBottom: Spacing.lg,
  },
  description: {
    // paddingHorizontal: Spacing.md,
    lineHeight: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Spacing.xl,
    alignSelf: 'center',
    width: 250,
  },
});

