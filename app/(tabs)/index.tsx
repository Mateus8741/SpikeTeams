import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { PlayerLevelSelector } from '~/components/PlayerLevelSelector';
import { useTeamsStore } from '~/store/teamsStore';

export default function TeamsScreen() {
  const router = useRouter();
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerLevel, setNewPlayerLevel] = useState(1);

  const {
    players,
    playersPerTeam,
    addPlayer,
    removePlayer,
    formTeams,
    setPlayersPerTeam,
    updatePlayerLevel,
  } = useTeamsStore();

  const handleFormTeams = () => {
    formTeams();
    router.push('/(tabs)/teams');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Team Formation',
          headerStyle: {
            backgroundColor: '#4F46E5',
          },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="gap-4 p-4">
          {/* Player Registration */}
          <View className="mb-4 rounded-xl bg-white p-4 shadow-sm">
            <Text className="mb-3 text-xl font-bold text-gray-800">Add Players</Text>
            <View className="gap-3">
              <TextInput
                className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                value={newPlayerName}
                onChangeText={setNewPlayerName}
                placeholder="Enter player name"
                placeholderTextColor="#9CA3AF"
              />
              <View className="flex-row items-center justify-between">
                <PlayerLevelSelector level={newPlayerLevel} onLevelChange={setNewPlayerLevel} />
                <TouchableOpacity
                  className="items-center justify-center rounded-lg bg-indigo-600 p-3"
                  onPress={() => {
                    if (newPlayerName.trim()) {
                      addPlayer(newPlayerName.trim(), newPlayerLevel);
                      setNewPlayerName('');
                      setNewPlayerLevel(1);
                    }
                  }}>
                  <FontAwesome name="plus" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Players List */}
          <View className="mb-4 rounded-xl bg-white p-4 shadow-sm">
            <Text className="mb-3 text-xl font-bold text-gray-800">Players ({players.length})</Text>
            <View className="gap-2">
              {players.map((player) => (
                <View
                  key={player.id}
                  className="flex-row items-center justify-between rounded-lg bg-gray-50 p-3">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome name="user" size={20} color="#4F46E5" />
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

          {/* Team Formation */}
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
        </View>
      </ScrollView>
    </>
  );
}
