/**
 * Root Index Screen
 * Redirects to the welcome screen
 */

import { Redirect } from 'expo-router';

export default function Index() {
  // After welcome, you can navigate to /(tabs)/home
  return <Redirect href="/(tabs)/home" />;
}
