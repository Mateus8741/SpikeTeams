import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { GameOverMessage } from '~/components/GameOverPanel';
import { ScorePanel } from '~/components/ScorePanel';
import { useGameState } from '~/hooks/useGameState';
import { useScoreLogic } from '~/hooks/useScoreLogic';
import { getTeamColor, useTeamsStore } from '~/store/teamsStore';
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
    while (nextIndex === currentTeamIndex || nextIndex === (currentTeamIndex + 1) % teams.length) {
      nextIndex = (nextIndex + 1) % teams.length;
    }
    return nextIndex;
  };

  // Determine colors based on the winning team
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
        <ScorePanel
          currentTeamIndex={currentTeamIndex}
          score1={score1}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          colors={colors1}
        />

        {/* Time 2 */}
        <ScorePanel
          currentTeamIndex={(currentTeamIndex + 1) % teams.length}
          score1={score2}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          colors={colors2}
        />
      </View>

      {gameOver && (
        <GameOverMessage
          winningTeamIndex={winningTeamIndex ?? 0}
          currentTeamIndex={currentTeamIndex}
          resetWinningTeamScore={resetWinningTeamScore}
          getNextTeamIndex={getNextTeamIndex}
        />
      )}

      <TouchableOpacity
        className="absolute left-14 top-8 rounded-full bg-white/50 p-2"
        onPress={() => router.push('/')}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}
