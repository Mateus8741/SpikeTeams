import { Tabs, usePathname } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';

import { useOrientation } from '~/utils/useOrientation';

export default function TabLayout() {
  const pathname = usePathname();

  useOrientation(pathname);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5',
      }}>
      <Tabs.Screen
        name="index"
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
