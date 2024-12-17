import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { getTeamColor, useGameStore } from '~/store/gameStore';

export default function ScoreScreen() {
  const { teams, incrementScore, decrementScore } = useGameStore();

  if (!teams) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-lg text-gray-500 text-center px-5">
          Form teams first to start the game
        </Text>
      </View>
    );
  }

  const team1 = teams[0];
  const team2 = teams[1];
  const colors1 = getTeamColor(0);
  const colors2 = getTeamColor(1);

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
      <View className="flex-1 flex-row">
        {/* Time 1 */}
        <TouchableOpacity
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: colors1.bg }}
          activeOpacity={0.7}
          onPress={() => incrementScore(0)}>
          <View className="items-center w-full p-5">
            <Text className="text-2xl font-bold text-white mb-5">Team 1</Text>
            <Text className="text-[96px] font-bold text-white mb-5">
              {team1.score}
            </Text>
            <View className="flex-row space-x-5 mb-8">
              <TouchableOpacity
                className="w-12 h-12 rounded-full justify-center items-center"
                style={{ backgroundColor: colors1.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  decrementScore(0);
                }}>
                <FontAwesome name="minus" size={24} color={colors1.textLight} />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 rounded-full justify-center items-center"
                style={{ backgroundColor: colors1.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  incrementScore(0);
                }}>
                <FontAwesome name="plus" size={24} color={colors1.textLight} />
              </TouchableOpacity>
            </View>
            <View className="items-center space-y-2">
              {team1.players.map((player) => (
                <Text key={player.id} className="text-base text-white opacity-90">
                  {player.name}
                </Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>

        {/* Time 2 */}
        <TouchableOpacity
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: colors2.bg }}
          activeOpacity={0.7}
          onPress={() => incrementScore(1)}>
          <View className="items-center w-full p-5">
            <Text className="text-2xl font-bold text-white mb-5">Team 2</Text>
            <Text className="text-[96px] font-bold text-white mb-5">
              {team2.score}
            </Text>
            <View className="flex-row space-x-5 mb-8">
              <TouchableOpacity
                className="w-12 h-12 rounded-full justify-center items-center"
                style={{ backgroundColor: colors2.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  decrementScore(1);
                }}>
                <FontAwesome name="minus" size={24} color={colors2.textLight} />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 rounded-full justify-center items-center"
                style={{ backgroundColor: colors2.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  incrementScore(1);
                }}>
                <FontAwesome name="plus" size={24} color={colors2.textLight} />
              </TouchableOpacity>
            </View>
            <View className="items-center space-y-2">
              {team2.players.map((player) => (
                <Text key={player.id} className="text-base text-white opacity-90">
                  {player.name}
                </Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
