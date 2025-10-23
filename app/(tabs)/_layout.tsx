/**
 * Tabs Layout
 * Main app navigation with bottom tabs
 */

import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // We'll use custom bottom navigation
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="products" />
      <Tabs.Screen name="offers" />
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="reports" />
    </Tabs>
  );
}

