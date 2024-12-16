import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useGameStore } from '~/store/gameStore';

export default function ScoreScreen() {
  const { 
    teams,
    incrementScore,
    decrementScore,
    resetGame,
  } = useGameStore();

  if (!teams) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-xl text-gray-600">Form teams first to start the game</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Game Score',
          headerStyle: {
            backgroundColor: '#4F46E5',
          },
          headerTintColor: '#fff',
        }} 
      />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4 space-y-6">
          <View className="flex-row space-x-6">
            {/* Team 1 */}
            <View className="flex-1">
              <View className="bg-blue-500 rounded-t-xl p-3">
                <Text className="text-white text-xl font-bold text-center">
                  Team 1
                </Text>
              </View>
              <View className="bg-white rounded-b-xl p-4 shadow-sm">
                <View className="items-center mb-4">
                  <Text className="text-4xl font-bold text-blue-500">
                    {teams[0].score}
                  </Text>
                  <View className="flex-row space-x-2 mt-2">
                    <TouchableOpacity
                      className="bg-blue-100 p-2 rounded-full"
                      onPress={() => decrementScore(0)}>
                      <FontAwesome name="minus" size={20} color="#2563EB" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-blue-100 p-2 rounded-full"
                      onPress={() => incrementScore(0)}>
                      <FontAwesome name="plus" size={20} color="#2563EB" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="space-y-2">
                  {teams[0].players.map((player) => (
                    <View key={player.id} className="bg-blue-50 p-2 rounded-lg">
                      <Text className="text-blue-700">{player.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Team 2 */}
            <View className="flex-1">
              <View className="bg-red-500 rounded-t-xl p-3">
                <Text className="text-white text-xl font-bold text-center">
                  Team 2
                </Text>
              </View>
              <View className="bg-white rounded-b-xl p-4 shadow-sm">
                <View className="items-center mb-4">
                  <Text className="text-4xl font-bold text-red-500">
                    {teams[1].score}
                  </Text>
                  <View className="flex-row space-x-2 mt-2">
                    <TouchableOpacity
                      className="bg-red-100 p-2 rounded-full"
                      onPress={() => decrementScore(1)}>
                      <FontAwesome name="minus" size={20} color="#DC2626" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-red-100 p-2 rounded-full"
                      onPress={() => incrementScore(1)}>
                      <FontAwesome name="plus" size={20} color="#DC2626" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="space-y-2">
                  {teams[1].players.map((player) => (
                    <View key={player.id} className="bg-red-50 p-2 rounded-lg">
                      <Text className="text-red-700">{player.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="bg-gray-800 p-4 rounded-xl mt-4"
            onPress={resetGame}>
            <Text className="text-white text-center text-lg font-semibold">
              Reset Game
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
} 