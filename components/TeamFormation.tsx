import { useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useTeamsStore } from '~/store/teamsStore';

export function TeamFormation() {
  const router = useRouter();
  const { playersPerTeam, setPlayersPerTeam, formTeams } = useTeamsStore();

  const handleFormTeams = () => {
    formTeams();
    router.push('/(tabs)/teams');
  };

  return (
    <View className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <Text className="mb-3 text-xl font-bold text-gray-800">Team Formation</Text>
      <View className="mb-3 flex-row items-center gap-2">
        <Text className="text-base text-gray-600">Players per team:</Text>
        <TextInput
          className="w-16 rounded-lg border border-gray-200 bg-gray-50 p-2 text-center"
          keyboardType="number-pad"
          value={playersPerTeam.toString()}
          onChangeText={(text) => setPlayersPerTeam(Number(text))}
        />
      </View>
      <TouchableOpacity
        className="items-center rounded-lg bg-indigo-600 p-4"
        onPress={handleFormTeams}>
        <Text className="text-base font-bold text-white">Form Teams</Text>
      </TouchableOpacity>
    </View>
  );
}
