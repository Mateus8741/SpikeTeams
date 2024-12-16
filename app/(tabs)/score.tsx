import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { getTeamColor, useGameStore } from '~/store/gameStore';

export default function ScoreScreen() {
  const { teams, incrementScore, decrementScore, resetGame } = useGameStore();

  if (!teams) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-xl text-gray-600">Form teams first to start the game</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Game Score',
          headerStyle: {
            backgroundColor: '#4F46E5',
          },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="space-y-6 p-4">
          <View className="flex-row flex-wrap">
            {teams.map((team, index) => {
              const colors = getTeamColor(index);
              const iconColors = ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'];
              return (
                <View key={team.id} className="w-1/2 p-2">
                  <View className="flex-1">
                    <View className={`${colors.bg} rounded-t-xl p-3`}>
                      <Text className="text-center text-xl font-bold text-white">
                        Team {index + 1}
                      </Text>
                    </View>
                    <View className="rounded-b-xl bg-white p-4 shadow-sm">
                      <View className="mb-4 items-center">
                        <Text className={`text-4xl font-bold ${colors.text}`}>{team.score}</Text>
                        <View className="mt-2 flex-row space-x-2">
                          <TouchableOpacity
                            className={`${colors.bgLight} rounded-full p-2`}
                            onPress={() => decrementScore(index)}>
                            <FontAwesome
                              name="minus"
                              size={20}
                              color={iconColors[index % iconColors.length]}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            className={`${colors.bgLight} rounded-full p-2`}
                            onPress={() => incrementScore(index)}>
                            <FontAwesome
                              name="plus"
                              size={20}
                              color={iconColors[index % iconColors.length]}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View className="space-y-2">
                        {team.players.map((player) => (
                          <View key={player.id} className={`${colors.bgLight} rounded-lg p-2`}>
                            <Text className={`${colors.textLight}`}>{player.name}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <TouchableOpacity className="mt-4 rounded-xl bg-gray-800 p-4" onPress={resetGame}>
            <Text className="text-center text-lg font-semibold text-white">Reset Game</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
