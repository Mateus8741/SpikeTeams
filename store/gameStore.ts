import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Player {
  id: string;
  name: string;
}

interface Team {
  players: Player[];
  score: number;
}

interface GameState {
  players: Player[];
  teams: [Team, Team] | null;
  playersPerTeam: number;
  
  // Actions
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  formTeams: () => void;
  incrementScore: (teamIndex: 0 | 1) => void;
  decrementScore: (teamIndex: 0 | 1) => void;
  resetGame: () => void;
  setPlayersPerTeam: (count: number) => void;
}

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
          const team1 = shuffled.slice(0, state.playersPerTeam);
          const team2 = shuffled.slice(state.playersPerTeam, state.playersPerTeam * 2);
          
          return {
            teams: [
              { players: team1, score: 0 },
              { players: team2, score: 0 },
            ],
          };
        }),
      incrementScore: (teamIndex) =>
        set((state) => {
          if (!state.teams) return state;
          const newTeams = [...state.teams] as [Team, Team];
          newTeams[teamIndex].score += 1;
          return { teams: newTeams };
        }),
      decrementScore: (teamIndex) =>
        set((state) => {
          if (!state.teams) return state;
          const newTeams = [...state.teams] as [Team, Team];
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