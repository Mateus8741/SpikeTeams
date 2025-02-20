import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import { PlayerScoreList } from '@/components/PlayerScoreList';
import { useGameState } from '@/hooks/useGameState';
import { useScoreLogic } from '@/hooks/useScoreLogic';
import { getTeamColor, useTeamsStore } from '@/store/teamsStore';
export default function ScoreScreen() {
  const { teams } = useTeamsStore();
  const router = useRouter();
  const { currentTeamIndex, gameOver, resetWinningTeamScore, score1, score2, winningTeamIndex } =
    useGameState();
  const { handleIncrement, handleDecrement } = useScoreLogic();

  // Determine the next team index that is not currently playing
  const getNextTeamIndex = () => {
    let nextIndex =
      (winningTeamIndex === currentTeamIndex ? currentTeamIndex + 1 : currentTeamIndex) + 1;
    while (nextIndex === currentTeamIndex || nextIndex === currentTeamIndex + 1) {
      nextIndex = nextIndex + 1;
    }
    return nextIndex;
  };

  // Determine colors based on the winning team
  const colors1 = getTeamColor(currentTeamIndex);
  const colors2 = getTeamColor(currentTeamIndex + 1);

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
          onPress={() => handleIncrement(currentTeamIndex)}>
          <View className="mb-12 w-full items-center">
            <Text className="mb-2 text-4xl font-bold text-white">Team {currentTeamIndex + 1}</Text>
            <Text className="mb-2 text-[120px] font-bold text-white">{score1}</Text>
            <View className="mb-4 flex-row gap-4 space-x-5">
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors1.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  handleDecrement(currentTeamIndex);
                }}>
                <FontAwesome name="minus" size={32} color={colors1.textLight} />
              </TouchableOpacity>
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors1.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  handleIncrement(currentTeamIndex);
                }}>
                <FontAwesome name="plus" size={32} color={colors1.textLight} />
              </TouchableOpacity>
            </View>

            <PlayerScoreList team={teams[currentTeamIndex]} teamColor={colors1} />
          </View>
        </TouchableOpacity>

        {/* Time 2 */}
        <Pressable
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: colors2.bg }}
          onPress={() => handleIncrement((currentTeamIndex + 1) % teams.length)}>
          <View className="mb-12 w-full items-center">
            <Text className="mb-2 text-4xl font-bold text-white">
              Team {((currentTeamIndex + 1) % teams.length) + 1}
            </Text>
            <Text className="mb-2 text-[120px] font-bold text-white">{score2}</Text>
            <View className="mb-4 flex-row gap-4 space-x-5">
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors2.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  handleDecrement((currentTeamIndex + 1) % teams.length);
                }}>
                <FontAwesome name="minus" size={32} color={colors2.textLight} />
              </TouchableOpacity>
              <TouchableOpacity
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors2.bgLight }}
                onPress={(e) => {
                  e.stopPropagation();
                  handleIncrement((currentTeamIndex + 1) % teams.length);
                }}>
                <FontAwesome name="plus" size={32} color={colors2.textLight} />
              </TouchableOpacity>
            </View>

            <PlayerScoreList team={teams[currentTeamIndex + 1]} teamColor={colors2} />
          </View>
        </Pressable>
      </View>

      {gameOver && (
        <View className="absolute inset-0 items-center justify-center bg-black/80">
          <Text className="text-5xl font-bold text-white">
            {winningTeamIndex === currentTeamIndex ? 'Team 1 Wins!' : 'Team 2 Wins!'}
          </Text>
          <TouchableOpacity
            className="mt-4 rounded bg-white p-2"
            onPress={() => {
              const nextTeamIndex = getNextTeamIndex();
              resetWinningTeamScore(nextTeamIndex);
            }}>
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
