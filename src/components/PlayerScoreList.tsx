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
    <View className="absolute bottom-4 w-full px-4">
      <View className="flex-row flex-wrap justify-center gap-2">
        {team.players.map((player) => (
          <TouchableOpacity
            key={player.id}
            onPress={() => incrementPlayerScore(player.id)}
            onLongPress={() => decrementPlayerScore(player.id)}
            className="items-center rounded-lg p-2"
            style={{ backgroundColor: teamColor.bgLight }}>
            <Text style={{ color: teamColor.textLight }} className="text-lg font-bold">
              {playerScores[player.id] || 0}
            </Text>
            <Text style={{ color: teamColor.textLight }} className="text-sm">
              {player.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
