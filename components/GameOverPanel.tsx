import { Text, TouchableOpacity, View } from 'react-native';

interface GameOverMessageProps {
  winningTeamIndex: number;
  currentTeamIndex: number;
  resetWinningTeamScore: (nextTeamIndex: number) => void;
  getNextTeamIndex: () => number;
}

export function GameOverMessage({
  winningTeamIndex,
  currentTeamIndex,
  resetWinningTeamScore,
  getNextTeamIndex,
}: Readonly<GameOverMessageProps>) {
  return (
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
  );
}
