import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { PlayerLevelSelector } from './PlayerLevelSelector';

import { useTeamsStore } from '@/store/teamsStore';

export function PlayerRegistration() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerLevel, setNewPlayerLevel] = useState(0);
  const { addPlayer } = useTeamsStore();

  return (
    <View className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <Text className="mb-3 text-xl font-bold text-gray-800">Add Players</Text>
      <View className="mb-4 flex flex-row gap-3">
        <TextInput
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-3"
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder="Enter player name"
          placeholderTextColor="#9CA3AF"
        />
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="items-center justify-center rounded-lg bg-app-base p-3"
            onPress={() => {
              if (newPlayerName.trim()) {
                addPlayer(newPlayerName.trim(), newPlayerLevel);
                setNewPlayerName('');
                setNewPlayerLevel(0);
              }
            }}>
            <FontAwesome name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <PlayerLevelSelector level={newPlayerLevel} onLevelChange={setNewPlayerLevel} />
    </View>
  );
}
