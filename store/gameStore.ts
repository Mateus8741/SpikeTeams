import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Player {
  id: string;
  name: string;
}

interface Team {
  id: string;
  players: Player[];
  score: number;
}

interface GameState {
  players: Player[];
  teams: Team[] | null;
  playersPerTeam: number;
  
  // Actions
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  formTeams: () => void;
  incrementScore: (teamIndex: number) => void;
  decrementScore: (teamIndex: number) => void;
  resetGame: () => void;
  setPlayersPerTeam: (count: number) => void;
}

interface TeamColors {
  bg: string;
  text: string;
  bgLight: string;
  textLight: string;
}

const TEAM_COLORS: TeamColors[] = [
  {
    bg: '#3B82F6',    // blue
    text: '#3B82F6',
    bgLight: '#BFDBFE',
    textLight: '#1D4ED8',
  },
  {
    bg: '#EF4444',    // red
    text: '#EF4444',
    bgLight: '#FEE2E2',
    textLight: '#B91C1C',
  },
  {
    bg: '#10B981',    // emerald
    text: '#10B981',
    bgLight: '#D1FAE5',
    textLight: '#047857',
  },
  {
    bg: '#8B5CF6',    // purple
    text: '#8B5CF6',
    bgLight: '#EDE9FE',
    textLight: '#6D28D9',
  },
  {
    bg: '#F59E0B',    // amber
    text: '#F59E0B',
    bgLight: '#FEF3C7',
    textLight: '#B45309',
  },
  {
    bg: '#EC4899',    // pink
    text: '#EC4899',
    bgLight: '#FCE7F3',
    textLight: '#BE185D',
  },
];

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      players: [],
      teams: null,
      playersPerTeam: 4,

      addPlayer: (name) =>
        set((state) => ({
          players: [...state.players, { id: Math.random().toString(), name }],
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
                score: 0,
              });
            }
          }
          
          return { teams };
        }),

      incrementScore: (teamIndex) =>
        set((state) => {
          if (!state.teams) return state;
          const newTeams = [...state.teams];
          newTeams[teamIndex].score += 1;
          return { teams: newTeams };
        }),

      decrementScore: (teamIndex) =>
        set((state) => {
          if (!state.teams) return state;
          const newTeams = [...state.teams];
          if (newTeams[teamIndex].score > 0) {
            newTeams[teamIndex].score -= 1;
          }
          return { teams: newTeams };
        }),

      resetGame: () =>
        set({
          teams: null,
        }),

      setPlayersPerTeam: (count) =>
        set({
          playersPerTeam: count,
        }),
    }),
    {
      name: 'volleyball-game-storage',
    }
  )
);

// Atualizar a função getTeamColor para retornar o objeto de cores
export const getTeamColor = (index: number): TeamColors => {
  return TEAM_COLORS[index % TEAM_COLORS.length];
}; 