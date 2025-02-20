import { Text, TouchableOpacity, View } from 'react-native';

import { useScoreStore } from '@/store/scoreStore';
import { Team } from '@/store/teamsStore';

interface PlayerScoreListProps {
  team: Team;
  teamColor: {
    bgLight: string;
    textLight: string;
  };
}

export function PlayerScoreList({ team, teamColor }: Readonly<PlayerScoreListProps>) {
  const { playerScores, incrementPlayerScore, decrementPlayerScore } = useScoreStore();

  return (
    <View className="absolute -bottom-20 left-0 right-0 flex-row flex-wrap justify-center gap-2">
      {team.players.map((player) => (
        <View key={player.id} className="flex flex-col items-center justify-center">
          <TouchableOpacity
            onPress={() => incrementPlayerScore(player.id)}
            onLongPress={() => decrementPlayerScore(player.id)}
            className="h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: teamColor.bgLight }}>
            <Text style={{ color: teamColor.textLight }} className="text-lg font-bold">
              {playerScores[player.id] || 0}
            </Text>
          </TouchableOpacity>
          <Text
            style={{ color: teamColor.bgLight }}
            className="mt-1 text-center text-sm font-bold leading-5">
            {player.name}
          </Text>
        </View>
      ))}
    </View>
  );
}
