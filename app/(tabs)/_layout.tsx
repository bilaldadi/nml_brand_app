/**
 * Tabs Layout
 * Main app navigation with bottom tabs
 */

import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: I18nManager.isRTL ? 'shift' : 'shift',
        tabBarPosition: I18nManager.isRTL ? 'bottom' : 'bottom',
      }}
      tabBar={({ state, navigation }) => {
        const routes = state.routes;
        const activeIndex = state.index;

        const tabs = [
          { id: 'home', label: t('navigation.home'), icon: 'home', onPress: () => navigation.navigate('home') },
          { id: 'products', label: t('navigation.products'), icon: 'grid-3x3', onPress: () => navigation.navigate('products') },
          { id: 'offers', label: t('navigation.offers'), icon: 'percent', onPress: () => navigation.navigate('offers') },
          { id: 'orders', label: t('navigation.orders'), icon: 'package', onPress: () => navigation.navigate('orders') },
          { id: 'reports', label: t('navigation.reports'), icon: 'bar-chart-3', onPress: () => navigation.navigate('reports') },  
        ].map((tab) => ({ ...tab, active: routes[activeIndex]?.name === tab.id }));

        return <BottomNavigation tabs={tabs} />;
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

