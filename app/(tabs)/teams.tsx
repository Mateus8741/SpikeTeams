import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useGameStore } from '~/store/gameStore';

export default function TeamsScreen() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const { 
    players, 
    playersPerTeam,
    addPlayer, 
    removePlayer, 
    formTeams, 
    setPlayersPerTeam 
  } = useGameStore();

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
        <View className="p-4 space-y-8">
          {/* Player Registration */}
          <View className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <Text className="text-xl font-bold text-gray-800">Add Players</Text>
            <View className="flex-row space-x-3">
              <TextInput
                className="flex-1 rounded-lg border border-gray-300 p-3 bg-gray-50"
                value={newPlayerName}
                onChangeText={setNewPlayerName}
                placeholder="Enter player name"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                className="bg-indigo-600 rounded-lg px-4 items-center justify-center"
                onPress={() => {
                  if (newPlayerName.trim()) {
                    addPlayer(newPlayerName.trim());
                    setNewPlayerName('');
                  }
                }}>
                <FontAwesome name="plus" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Players List */}
          <View className="bg-white rounded-xl p-6 shadow-sm mt-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Players ({players.length})
            </Text>
            <View className="space-y-3">
              {players.map((player) => (
                <View 
                  key={player.id} 
                  className="flex-row items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <View className="flex-row items-center space-x-4">
                    <FontAwesome name="user" size={20} color="#4F46E5" />
                    <Text className="text-gray-700 text-lg">{player.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removePlayer(player.id)}
                    className="bg-red-100 p-3 rounded-full">
                    <FontAwesome name="trash" size={20} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Team Formation */}
          <View className="bg-white rounded-xl p-6 shadow-sm space-y-4 mt-6">
            <Text className="text-xl font-bold text-gray-800">Team Formation</Text>
            <View className="flex-row items-center space-x-4">
              <Text className="text-gray-700">Players per team:</Text>
              <TextInput
                className="w-16 rounded-lg border border-gray-300 p-2 text-center bg-gray-50"
                keyboardType="number-pad"
                value={playersPerTeam.toString()}
                onChangeText={(text) => setPlayersPerTeam(parseInt(text) || 6)}
              />
            </View>
            <TouchableOpacity
              className="bg-indigo-600 p-4 rounded-lg mt-2"
              onPress={formTeams}>
              <Text className="text-white text-center text-lg font-semibold">
                Form Teams
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
} 