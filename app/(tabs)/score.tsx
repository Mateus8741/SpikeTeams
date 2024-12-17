import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { getTeamColor, useGameStore } from '~/store/gameStore';

export default function ScoreScreen() {
  const { teams, incrementScore, decrementScore } = useGameStore();
  const router = useRouter();

  const [currentTeamIndex, setCurrentTeamIndex] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  const team1 = teams[currentTeamIndex];
  const team2 = teams[(currentTeamIndex + 1) % teams.length];
  const colors1 = getTeamColor(currentTeamIndex);
  const colors2 = getTeamColor((currentTeamIndex + 1) % teams.length);

  useEffect(() => {
    handleGameStatus();
  }, [team1.score, team2.score]);

  const handleGameStatus = () => {
    if (isGameOver() && !gameOver) {
      setGameOver(true);
      setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
    } else if (!isGameOver()) {
      setGameOver(false);
    }
  };

  const isGameOver = () => {
    if (team1.score >= 12 || team2.score >= 12) {
      const scoreDifference = Math.abs(team1.score - team2.score);
      return scoreDifference >= 2;
    }
    return false;
  };

  const resetWinningTeamScore = () => {
    const winningTeamIndex = team1.score > team2.score ? currentTeamIndex : (currentTeamIndex + 1) % teams.length;

    // Zera a pontuação dos times que estão no placar
    team1.score = 0;
    team2.score = 0;

    // Atualiza o índice do time atual para o próximo time
    setCurrentTeamIndex((winningTeamIndex + 1) % teams.length); // O próximo time a competir
    setGameOver(false); // Reseta o estado do jogo
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
            <Text className="mb-2 text-4xl font-bold text-white">{team1.name}</Text>
            <Text className="mb-2 text-[120px] font-bold text-white">{team1.score}</Text>
            <View className="mb-4 flex-row space-x-5">
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
          onPress={() => incrementScore((currentTeamIndex + 1) % teams.length)}>
          <View className="w-full items-center">
            <Text className="mb-2 text-4xl font-bold text-white">{team2.name}</Text>
            <Text className="mb-2 text-[120px] font-bold text-white">{team2.score}</Text>
            <View className="mb-4 flex-row space-x-5">
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

      {gameOver && (
        <View className="absolute inset-0 items-center justify-center bg-black/80">
          <Text className="text-5xl font-bold text-white">
            {team1.score > team2.score ? `${team1.name} Wins!` : `${team2.name} Wins!`}
          </Text>
          <TouchableOpacity
            className="mt-4 rounded bg-white p-2"
            onPress={resetWinningTeamScore}
          >
            <Text className="text-lg font-bold text-black">Continuar com Próximo Time</Text>
          </TouchableOpacity>
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
