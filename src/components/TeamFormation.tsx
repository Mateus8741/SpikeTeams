import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTeamsStore } from '@/store/teamsStore';
import { $COLORS } from '@/styles/theme';

export function TeamFormation() {
  const router = useRouter();
  const { players, playersPerTeam, setPlayersPerTeam, formTeams } = useTeamsStore();

  const handleFormTeams = () => {
    formTeams();
    router.push('/(tabs)/teams');
  };

  const maxPlayers = Math.max(Math.floor(players.length / 2), 2);
  const minPlayers = 2;

  return (
    <View className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <Text className="mb-3 text-xl font-bold text-gray-800">Team Formation</Text>
      <View className="mb-3">
        <Text className="mb-2 text-base text-gray-600">Players per team: {playersPerTeam}</Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={minPlayers}
          maximumValue={maxPlayers}
          step={1}
          value={playersPerTeam}
          onValueChange={setPlayersPerTeam}
          minimumTrackTintColor={$COLORS.appColorBase}
          maximumTrackTintColor={$COLORS.appColorLight}
          thumbTintColor={$COLORS.appColorBase}
        />
      </View>
      <TouchableOpacity
        className="items-center rounded-lg bg-app-base p-4"
        onPress={handleFormTeams}>
        <Text className="text-base font-bold text-white">Form Teams</Text>
      </TouchableOpacity>
    </View>
  );
}
