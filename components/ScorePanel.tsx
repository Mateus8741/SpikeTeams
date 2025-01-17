import { FontAwesome } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

interface ScorePanelProps {
  currentTeamIndex: number;
  score1: number;
  handleIncrement: (index: number) => void;
  handleDecrement: (index: number) => void;
  colors: {
    bg: string;
    bgLight: string;
    textLight: string;
  };
}

export function ScorePanel({
  currentTeamIndex,
  score1,
  handleIncrement,
  handleDecrement,
  colors,
}: ScorePanelProps) {
  return (
    <Pressable
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.bg }}
      onPress={() => handleIncrement(currentTeamIndex)}>
      <View className="w-full items-center">
        <Text className="mb-2 text-4xl font-bold text-white">Team {currentTeamIndex + 1}</Text>
        <Text className="mb-2 text-[120px] font-bold text-white">{score1}</Text>
        <View className="mb-4 flex-row gap-4 space-x-5">
          <Pressable
            className="h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.bgLight }}
            onPress={(e) => {
              e.stopPropagation();
              handleDecrement(currentTeamIndex);
            }}>
            <FontAwesome name="minus" size={32} color={colors.textLight} />
          </Pressable>
          <Pressable
            className="h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.bgLight }}
            onPress={(e) => {
              e.stopPropagation();
              handleIncrement(currentTeamIndex);
            }}>
            <FontAwesome name="plus" size={32} color={colors.textLight} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
