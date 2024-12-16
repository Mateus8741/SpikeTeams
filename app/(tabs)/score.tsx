import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getTeamColor, useGameStore } from '~/store/gameStore';

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
          <View className="flex-row flex-wrap">
            {teams.map((team, index) => {
              const colors = getTeamColor(index);
              const iconColors = ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'];
              return (
                <View 
                  key={team.id}
                  className="w-1/2 p-2"
                >
                  <View className="flex-1">
                    <View className={`${colors.bg} rounded-t-xl p-3`}>
                      <Text className="text-white text-xl font-bold text-center">
                        Team {index + 1}
                      </Text>
                    </View>
                    <View className="bg-white rounded-b-xl p-4 shadow-sm">
                      <View className="items-center mb-4">
                        <Text className={`text-4xl font-bold ${colors.text}`}>
                          {team.score}
                        </Text>
                        <View className="flex-row space-x-2 mt-2">
                          <TouchableOpacity
                            className={`${colors.bgLight} p-2 rounded-full`}
                            onPress={() => decrementScore(index)}>
                            <FontAwesome name="minus" size={20} color={iconColors[index % iconColors.length]} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            className={`${colors.bgLight} p-2 rounded-full`}
                            onPress={() => incrementScore(index)}>
                            <FontAwesome name="plus" size={20} color={iconColors[index % iconColors.length]} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View className="space-y-2">
                        {team.players.map((player) => (
                          <View 
                            key={player.id} 
                            className={`${colors.bgLight} p-2 rounded-lg`}
                          >
                            <Text className={`${colors.textLight}`}>
                              {player.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
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