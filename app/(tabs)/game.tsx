import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from '~/components/Button';
import { useGameStore } from '~/store/gameStore';

export default function GameScreen() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const { 
    players, 
    teams, 
    playersPerTeam,
    addPlayer, 
    removePlayer, 
    formTeams, 
    incrementScore,
    decrementScore,
    resetGame,
    setPlayersPerTeam 
  } = useGameStore();

  return (
    <>
      <Stack.Screen options={{ title: 'Volleyball Teams' }} />
      <ScrollView className="flex-1 p-4">
        <View className="space-y-4">
          {/* Player Registration */}
          <View className="space-y-2">
            <Text className="text-lg font-bold">Add Players</Text>
            <View className="flex-row space-x-2">
              <TextInput
                className="flex-1 rounded border border-gray-300 p-2"
                value={newPlayerName}
                onChangeText={setNewPlayerName}
                placeholder="Player name"
              />
              <Button
                title="Add"
                onPress={() => {
                  if (newPlayerName.trim()) {
                    addPlayer(newPlayerName.trim());
                    setNewPlayerName('');
                  }
                }}
              />
            </View>
          </View>

          {/* Players List */}
          <View className="space-y-2">
            <Text className="text-lg font-bold">Players ({players.length})</Text>
            {players.map((player) => (
              <View key={player.id} className="flex-row items-center justify-between bg-gray-100 p-2 rounded">
                <Text>{player.name}</Text>
                <Button title="Remove" onPress={() => removePlayer(player.id)} />
              </View>
            ))}
          </View>

          {/* Team Formation */}
          <View className="space-y-2">
            <Text className="text-lg font-bold">Team Formation</Text>
            <View className="flex-row space-x-2 items-center">
              <Text>Players per team:</Text>
              <TextInput
                className="w-16 rounded border border-gray-300 p-2"
                keyboardType="number-pad"
                value={playersPerTeam.toString()}
                onChangeText={(text) => setPlayersPerTeam(parseInt(text) || 6)}
              />
            </View>
            <Button title="Form Teams" onPress={formTeams} />
          </View>

          {/* Teams Display and Scoring */}
          {teams && (
            <View className="space-y-4">
              <View className="flex-row justify-between">
                {/* Team 1 */}
                <View className="flex-1 mr-2">
                  <Text className="text-lg font-bold">Team 1</Text>
                  <View className="bg-blue-100 p-4 rounded">
                    <Text className="text-2xl text-center mb-2">{teams[0].score}</Text>
                    {teams[0].players.map((player) => (
                      <Text key={player.id}>{player.name}</Text>
                    ))}
                  </View>
                  <Button title="+" onPress={() => incrementScore(0)} />
                  <Button title="-" onPress={() => decrementScore(0)} />
                </View>

                {/* Team 2 */}
                <View className="flex-1 ml-2">
                  <Text className="text-lg font-bold">Team 2</Text>
                  <View className="bg-red-100 p-4 rounded">
                    <Text className="text-2xl text-center mb-2">{teams[1].score}</Text>
                    {teams[1].players.map((player) => (
                      <Text key={player.id}>{player.name}</Text>
                    ))}
                  </View>
                  <Button title="+" onPress={() => incrementScore(1)} />
                  <Button title="-" onPress={() => decrementScore(1)} />
                </View>
              </View>
              <Button title="Reset Game" onPress={resetGame} />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
} 