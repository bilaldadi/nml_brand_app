/**
 * Root Index Screen
 * Redirects directly to home
 */

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}
