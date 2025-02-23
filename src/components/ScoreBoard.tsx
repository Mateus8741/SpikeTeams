import { FontAwesome } from '@expo/vector-icons';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import { useTeamsStore } from '@/store/teamsStore';

interface ScoreBoardProps {
  teamIndex: number;
  score: number;
  colors: { bg: string; bgLight: string; textLight: string };
  handleIncrement: (index: number) => void;
  handleDecrement: (index: number) => void;
}

export function ScoreBoard({
  teamIndex,
  score,
  colors,
  handleIncrement,
  handleDecrement,
}: Readonly<ScoreBoardProps>) {
  const { teams } = useTeamsStore();

  return (
    <Pressable
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.bg }}
      onPress={() => handleIncrement(teamIndex)}>
      <View className="mb-12 w-full items-center">
        <Text className="mb-2 text-4xl font-bold text-white">Team {teamIndex + 1}</Text>
        <Text className="mb-2 text-[120px] font-bold text-white">{score}</Text>
        <View className="mb-4 flex-row gap-4 space-x-5">
          <TouchableOpacity
            className="h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.bgLight }}
            onPress={(e) => {
              e.stopPropagation();
              handleDecrement(teamIndex);
            }}>
            <FontAwesome name="minus" size={32} color={colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity
            className="h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.bgLight }}
            onPress={(e) => {
              e.stopPropagation();
              handleIncrement(teamIndex);
            }}>
            <FontAwesome name="plus" size={32} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* <PlayerScoreList team={teams[teamIndex]} teamColor={colors} /> */}
      </View>
    </Pressable>
  );
}
