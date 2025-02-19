import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Player {
  id: string;
  name: string;
  level: number;
}

export interface Team {
  id: string;
  players: Player[];
}

interface TeamsState {
  players: Player[];
  teams: Team[];
  playersPerTeam: number;
  addPlayer: (name: string, level?: number) => void;
  removePlayer: (id: string) => void;
  formTeams: () => void;
  setPlayersPerTeam: (count: number) => void;
  resetTeams: () => void;
  updatePlayerLevel: (id: string, level: number) => void;
}

export const useTeamsStore = create<TeamsState>()(
  persist(
    (set) => ({
      players: [],
      teams: [],
      playersPerTeam: 4,

      addPlayer: (name, level = 0) =>
        set((state) => ({
          players: [...state.players, { id: Math.random().toString(), name, level }],
        })),

      removePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
        })),

      formTeams: () =>
        set((state) => {
          const shuffled = [...state.players].sort(() => Math.random() - 0.5);
          const numberOfTeams = Math.ceil(shuffled.length / state.playersPerTeam);
          const teams: Team[] = [];

          for (let i = 0; i < numberOfTeams; i++) {
            const startIndex = i * state.playersPerTeam;
            const teamPlayers = shuffled.slice(
              startIndex,
              Math.min(startIndex + state.playersPerTeam, shuffled.length)
            );

            if (teamPlayers.length > 0) {
              teams.push({
                id: `team-${i + 1}`,
                players: teamPlayers,
              });
            }
          }

          return { teams };
        }),

      setPlayersPerTeam: (count) =>
        set({
          playersPerTeam: count,
        }),

      resetTeams: () =>
        set({
          teams: [],
        }),

      updatePlayerLevel: (id, level) =>
        set((state) => ({
          players: state.players.map((p) => (p.id === id ? { ...p, level } : p)),
        })),
    }),
    {
      name: 'volleyball-teams-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

interface TeamColors {
  bg: string;
  text: string;
  bgLight: string;
  textLight: string;
}

const TEAM_COLORS: TeamColors[] = [
  {
    bg: '#3B82F6',
    text: '#3B82F6',
    bgLight: '#BFDBFE',
    textLight: '#1D4ED8',
  },
  {
    bg: '#EF4444',
    text: '#EF4444',
    bgLight: '#FEE2E2',
    textLight: '#B91C1C',
  },
  {
    bg: '#10B981',
    text: '#10B981',
    bgLight: '#D1FAE5',
    textLight: '#047857',
  },
  {
    bg: '#8B5CF6',
    text: '#8B5CF6',
    bgLight: '#EDE9FE',
    textLight: '#6D28D9',
  },
  {
    bg: '#F59E0B',
    text: '#F59E0B',
    bgLight: '#FEF3C7',
    textLight: '#B45309',
  },
  {
    bg: '#EC4899',
    text: '#EC4899',
    bgLight: '#FCE7F3',
    textLight: '#BE185D',
  },
];

export const getTeamColor = (index: number): TeamColors => {
  return TEAM_COLORS[index % TEAM_COLORS.length];
};
