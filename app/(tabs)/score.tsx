import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { getTeamColor, useGameStore } from '~/store/gameStore';

export default function ScoreScreen() {
  const { teams, incrementScore, decrementScore } = useGameStore();
  const router = useRouter();

  if (!teams) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="px-5 text-center text-lg text-gray-500">
          Form teams first to start the game
        </Text>
      </View>
    );
  }

  const team1 = teams[0];
  const team2 = teams[1];
  const colors1 = getTeamColor(0);
  const colors2 = getTeamColor(2);

  const isGameOver = () => {
    if (team1.score >= 12 || team2.score >= 12) {
      const scoreDifference = Math.abs(team1.score - team2.score);
      return scoreDifference >= 2;
    }
    return false;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Game Score',
          headerShown: false,
        }}
      />
      <View className="flex-1 flex-row">
        {/* Time 1 */}
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: colors1.bg }}
          activeOpacity={0.7}
          onPress={() => incrementScore(0)}>
          <View className="w-full items-center">
            <Text className="mb-2 text-4xl font-bold text-white">Team 1</Text>
            <Text className="mb-2 text-[120px] font-bold text-white">{team1.score}</Text>
            <View className="mb-4 flex-row space-x-5">
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors1.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  decrementScore(0);
                }}>
                <FontAwesome name="minus" size={32} color={colors1.textLight} />
              </TouchableOpacity>
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors1.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  incrementScore(0);
                }}>
                <FontAwesome name="plus" size={32} color={colors1.textLight} />
              </TouchableOpacity>
            </View>
            <View className="items-center space-y-1">
              {team1.players.map((player) => (
                <Text key={player.id} className="text-lg text-white opacity-90">
                  {player.name}
                </Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>

        {/* Time 2 */}
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: colors2.bg }}
          activeOpacity={0.7}
          onPress={() => incrementScore(1)}>
          <View className="w-full items-center">
            <Text className="mb-2 text-4xl font-bold text-white">Team 2</Text>
            <Text className="mb-2 text-[120px] font-bold text-white">{team2.score}</Text>
            <View className="mb-4 flex-row space-x-5">
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors2.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  decrementScore(1);
                }}>
                <FontAwesome name="minus" size={32} color={colors2.textLight} />
              </TouchableOpacity>
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors2.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  incrementScore(1);
                }}>
                <FontAwesome name="plus" size={32} color={colors2.textLight} />
              </TouchableOpacity>
            </View>
            <View className="items-center space-y-1">
              {team2.players.map((player) => (
                <Text key={player.id} className="text-lg text-white opacity-90">
                  {player.name}
                </Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {isGameOver() && (
        <View className="absolute inset-0 items-center justify-center bg-black/80">
          <Text className="text-5xl font-bold text-white">
            {team1.score > team2.score ? 'Team 1 Wins!' : 'Team 2 Wins!'}
          </Text>
        </View>
      )}

      {/* Botão de voltar flutuante no canto superior direito */}
      <TouchableOpacity
        className="absolute left-14 top-8 rounded-full bg-white/50 p-2"
        onPress={() => router.push('/')} // Navegando de volta para a tela index
      >
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}
