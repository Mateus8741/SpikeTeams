import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getTeamColor, Team } from '~/store/gameStore';

interface TeamsModalProps {
  visible: boolean;
  onClose: () => void;
  teams: Team[];
}

export function TeamsModal({ visible, onClose, teams }: TeamsModalProps) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Formed Teams</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="close" size={24} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
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

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalContent: {
    maxHeight: '80%',
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
  closeButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
