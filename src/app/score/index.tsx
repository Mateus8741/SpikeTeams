import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { GameOverPanel } from '@/components/GameOverPanel';
import { ScoreBoard } from '@/components/ScoreBoard';
import { useGameState } from '@/hooks/useGameState';
import { useScoreLogic } from '@/hooks/useScoreLogic';
import { getTeamColor, useTeamsStore } from '@/store/teamsStore';

export default function ScoreScreen() {
  const { teams } = useTeamsStore();
  const router = useRouter();
  const { currentTeamIndex, gameOver, resetWinningTeamScore, score1, score2, winningTeamIndex } =
    useGameState();
  const { handleIncrement, handleDecrement } = useScoreLogic();

  const getNextTeamIndex = () => {
    let nextIndex =
      (winningTeamIndex === currentTeamIndex ? currentTeamIndex + 1 : currentTeamIndex) + 1;
    while (nextIndex === currentTeamIndex || nextIndex === currentTeamIndex + 1) {
      nextIndex = nextIndex + 1;
    }
    return nextIndex;
  };

  const colors1 = getTeamColor(currentTeamIndex);
  const colors2 = getTeamColor((currentTeamIndex + 1) % teams.length);

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

        <ScoreBoard
          teamIndex={currentTeamIndex}
          score={score1}
          colors={colors1}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />

        {/* Time 2 */}
        <ScoreBoard
          teamIndex={(currentTeamIndex + 1) % teams.length}
          score={score2}
          colors={colors2}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      </View>

      {gameOver && (
        <GameOverPanel
          winningTeamIndex={winningTeamIndex ?? 0}
          currentTeamIndex={currentTeamIndex}
          resetWinningTeamScore={resetWinningTeamScore}
          getNextTeamIndex={getNextTeamIndex}
        />
      )}

      <TouchableOpacity
        className="absolute left-14 top-8 rounded-full bg-white/50 p-2"
        onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}
