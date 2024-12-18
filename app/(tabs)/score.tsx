import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import { useScoreStore } from '~/store/scoreStore';
import { getTeamColor, useTeamsStore } from '~/store/teamsStore';

export default function ScoreScreen() {
  const { teams } = useTeamsStore();
  const { scores, incrementScore, decrementScore, resetScores } = useScoreStore();
  const router = useRouter();
  const [currentTeamIndex, setCurrentTeamIndex] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  const team1 = teams[currentTeamIndex];
  const team2 = teams[(currentTeamIndex + 1) % teams.length];

  // const colors1 = getTeamColor(currentTeamIndex);
  // const colors2 = getTeamColor((currentTeamIndex + 1) % teams.length);
  const colors1 = getTeamColor(0);
  const colors2 = getTeamColor(2);

  const score1 = scores[currentTeamIndex] || 0;
  const score2 = scores[(currentTeamIndex + 1) % teams.length] || 0;

  const isGameOver = () => {
    if (score1 >= 12 || score2 >= 12) {
      const scoreDifference = Math.abs(score1 - score2);
      return scoreDifference >= 2;
    }
    return false;
  };

  useEffect(() => {
    if (isGameOver()) {
      setGameOver(true);
    }
  }, [score1, score2]);

  const resetWinningTeamScore = () => {
    if (score1 > score2) {
      setCurrentTeamIndex(currentTeamIndex);
    } else {
      setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
    }
    resetScores();
    setGameOver(false);
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
          onPress={() => incrementScore(currentTeamIndex)}>
          <View className="w-full items-center">
            <Text className="mb-2 text-4xl font-bold text-white">Team 1</Text>
            <Text className="mb-2 text-[120px] font-bold text-white">{score1}</Text>
            <View className="mb-4 flex-row gap-4 space-x-5">
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors1.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  decrementScore(currentTeamIndex);
                }}>
                <FontAwesome name="minus" size={32} color={colors1.textLight} />
              </TouchableOpacity>
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors1.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  incrementScore(currentTeamIndex);
                }}>
                <FontAwesome name="plus" size={32} color={colors1.textLight} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Time 2 */}
        <Pressable
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: colors2.bg }}
          onPress={() => incrementScore((currentTeamIndex + 1) % teams.length)}>
          <View className="w-full items-center">
            <Text className="mb-2 text-4xl font-bold text-white">Team 2</Text>
            <Text className="mb-2 text-[120px] font-bold text-white">{score2}</Text>
            <View className="mb-4 flex-row gap-4 space-x-5">
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors2.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  decrementScore((currentTeamIndex + 1) % teams.length);
                }}>
                <FontAwesome name="minus" size={32} color={colors2.textLight} />
              </TouchableOpacity>
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors2.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  incrementScore((currentTeamIndex + 1) % teams.length);
                }}>
                <FontAwesome name="plus" size={32} color={colors2.textLight} />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </View>

      {gameOver && (
        <View className="absolute inset-0 items-center justify-center bg-black/80">
          <Text className="text-5xl font-bold text-white">
            {score1 > score2 ? 'Team 1 Wins!' : 'Team 2 Wins!'}
          </Text>
          <TouchableOpacity className="mt-4 rounded bg-white p-2" onPress={resetWinningTeamScore}>
            <Text className="text-lg font-bold text-black">Continuar com Próximo Time</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        className="absolute left-14 top-8 rounded-full bg-white/50 p-2"
        onPress={() => router.push('/')}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}
