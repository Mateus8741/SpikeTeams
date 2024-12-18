import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useScoreStore } from '~/store/scoreStore';
import { getTeamColor, useTeamsStore } from '~/store/teamsStore';

export default function TeamsScreen() {
  const { scores } = useScoreStore();
  const { teams } = useTeamsStore();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Teams',
          headerStyle: {
            backgroundColor: '#4F46E5',
          },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.teamsGrid}>
          {teams.map((team, index) => {
            const colors = getTeamColor(index);
            return (
              <View key={team.id} style={styles.teamCard} className="border border-gray-200">
                <View style={[styles.teamHeader, { backgroundColor: colors.bg }]}>
                  <Text style={styles.teamTitle}>Team {index + 1}</Text>
                </View>
                <View style={styles.teamContent}>
                  {team.players.map((player) => (
                    <View
                      key={player.id}
                      style={[styles.playerTag, { backgroundColor: colors.bgLight }]}>
                      <Text style={[styles.playerTagText, { color: colors.textLight }]}>
                        {player.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  teamCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 12,
  },
  teamHeader: {
    padding: 12,
  },
  teamTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  teamContent: {
    padding: 12,
    gap: 8,
  },
  playerTag: {
    padding: 8,
    borderRadius: 6,
  },
  playerTagText: {
    textAlign: 'center',
  },
});
