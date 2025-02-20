import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { PlayerRegistration } from '@/components/PlayerRegistration';
import { PlayersList } from '@/components/PlayersList';
import { TeamFormation } from '@/components/TeamFormation';
import { $COLORS } from '@/styles/theme';

export default function TeamsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Team Formation',
          headerStyle: {
            backgroundColor: $COLORS.appColorBase,
          },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="gap-4 p-4">
          <PlayerRegistration />
          <PlayersList />
          <TeamFormation />
        </View>
      </ScrollView>
    </>
  );
}
