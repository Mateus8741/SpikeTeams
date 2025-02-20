import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTeamsStore } from '~/store/teamsStore';
import { $COLORS } from '~/styles/theme';
import { PlayerLevelSelector } from './PlayerLevelSelector';

export function PlayersList() {
  const { players, removePlayer, updatePlayerLevel } = useTeamsStore();

  return (
    <View className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <Text className="mb-3 text-xl font-bold text-gray-800">Players ({players.length})</Text>
      <View className="gap-2">
        {players.map((player) => (
          <View
            key={player.id}
            className="flex-row items-center justify-between rounded-lg bg-gray-50 p-3">
            <View className="flex-row items-center gap-2">
              <FontAwesome name="user" size={20} color={$COLORS.appColorBase} />
              <Text className="text-base text-gray-600">{player.name}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <PlayerLevelSelector
                level={player.level}
                onLevelChange={(level) => updatePlayerLevel(player.id, level)}
              />
              <TouchableOpacity
                onPress={() => removePlayer(player.id)}
                className="rounded-full bg-red-100 p-2">
                <FontAwesome name="trash" size={20} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
