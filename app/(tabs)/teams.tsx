import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { TeamsModal } from '~/components/TeamsModal';
import { useGameStore } from '~/store/gameStore';

export default function TeamsScreen() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { players, teams, playersPerTeam, addPlayer, removePlayer, formTeams, setPlayersPerTeam } =
    useGameStore();

  const handleFormTeams = () => {
    formTeams();
    setModalVisible(true);
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
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Player Registration */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add Players</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={newPlayerName}
                onChangeText={setNewPlayerName}
                placeholder="Enter player name"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                style={styles.addButton}
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
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Players ({players.length})</Text>
            <View style={styles.playersList}>
              {players.map((player) => (
                <View key={player.id} style={styles.playerItem}>
                  <View style={styles.playerInfo}>
                    <FontAwesome name="user" size={20} color="#4F46E5" />
                    <Text style={styles.playerName}>{player.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removePlayer(player.id)}
                    style={styles.removeButton}>
                    <FontAwesome name="trash" size={20} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Team Formation */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Team Formation</Text>
            <View style={styles.formationContainer}>
              <Text style={styles.label}>Players per team:</Text>
              <TextInput
                style={styles.numberInput}
                keyboardType="number-pad"
                value={playersPerTeam.toString()}
                onChangeText={(text) => setPlayersPerTeam(Number(text))}
              />
            </View>
            <TouchableOpacity style={styles.formButton} onPress={handleFormTeams}>
              <Text style={styles.buttonText}>Form Teams</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {teams && (
        <TeamsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          teams={teams}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  addButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playersList: {
    gap: 8,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playerName: {
    fontSize: 16,
    color: '#4B5563',
  },
  removeButton: {
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 20,
  },
  formationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#4B5563',
  },
  numberInput: {
    width: 60,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
    backgroundColor: '#F9FAFB',
  },
  formButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
