import { router, Stack } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';

import { PlayerRegistration } from '@/components/PlayerRegistration';
import { PlayersList } from '@/components/PlayersList';
import { TabBarIcon } from '@/components/TabBarIcon';
import { TeamFormation } from '@/components/TeamFormation';
import { useTeamsStore } from '@/store/teamsStore';
import { $COLORS } from '@/styles/theme';

export default function TeamsScreen() {
  const { teams } = useTeamsStore();

  function handleNavigation(route: string) {
    if (!teams.length) {
      Alert.alert('No Teams Found', 'You need to form teams before accessing this screen.', [
        { text: 'OK' },
      ]);
      return;
    }
    router.push(route as any);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Team Formation',
          headerStyle: {
            backgroundColor: $COLORS.appColorBase,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => handleNavigation('/teams')} className="ml-4">
              <TabBarIcon color={$COLORS.appColorBg} name="users" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => handleNavigation('/score')} className="mr-4">
              <TabBarIcon color={$COLORS.appColorBg} name="trophy" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="gap-4 p-4">
          <PlayerRegistration />
          <TeamFormation />
          <PlayersList />
        </View>
      </ScrollView>
    </>
  );
}
