import { Tabs, usePathname } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';

import { $COLORS } from '@/styles/theme';
import { useOrientation } from '@/utils/useOrientation';

export default function TabLayout() {
  const pathname = usePathname();

  useOrientation(pathname);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: $COLORS.appColorBase,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="score"
        options={{
          title: 'Score',
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </Tabs>
  );
}
