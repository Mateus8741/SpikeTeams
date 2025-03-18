import { router, Stack } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { TabBarIcon } from '@/components/TabBarIcon';
import { getTeamColor, useTeamsStore } from '@/store/teamsStore';
import { $COLORS } from '@/styles/theme';

export default function TeamsScreen() {
  const { teams } = useTeamsStore();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Teams',
          headerStyle: {
            backgroundColor: $COLORS.appColorBase,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-4">
              <TabBarIcon color={$COLORS.appColorBg} name="chevron-left" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView className="flex-1 bg-gray-100 p-5">
        <View className="flex-row flex-wrap gap-3">
          {teams.map((team, index) => {
            const colors = getTeamColor(index);
            return (
              <View
                key={team.id}
                className="mb-3 w-[48%] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <View style={{ backgroundColor: colors.bg }} className="p-3">
                  <Text className="text-center text-base font-bold text-white">
                    Team {index + 1}
                  </Text>
                </View>
                <View className="gap-2 p-3">
                  {team.players.map((player) => (
                    <View
                      key={player.id}
                      style={{ backgroundColor: colors.bgLight }}
                      className="rounded-md p-2">
                      <Text style={{ color: colors.textLight }} className="text-center">
                        {player.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
