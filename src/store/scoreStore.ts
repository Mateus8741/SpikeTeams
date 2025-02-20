import { create } from 'zustand';

interface GameScore {
  scores: number[];
  playerScores: { [key: string]: number };
}

interface ScoreState extends GameScore {
  incrementScore: (teamIndex: number) => void;
  decrementScore: (teamIndex: number) => void;
  incrementPlayerScore: (playerId: string) => void;
  decrementPlayerScore: (playerId: string) => void;
  resetScores: () => void;
}

export const useScoreStore = create<ScoreState>()((set) => ({
  scores: [],
  playerScores: {},

  incrementScore: (teamIndex) =>
    set((state) => {
      const newScores = [...(state.scores || [])];
      if (newScores[teamIndex] === undefined) {
        newScores[teamIndex] = 0;
      }
      newScores[teamIndex] += 1;
      return { scores: newScores };
    }),

  decrementScore: (teamIndex) =>
    set((state) => {
      const newScores = [...(state.scores || [])];
      if (newScores[teamIndex] > 0) {
        newScores[teamIndex] -= 1;
      }
      return { scores: newScores };
    }),

  incrementPlayerScore: (playerId) =>
    set((state) => ({
      playerScores: {
        ...state.playerScores,
        [playerId]: (state.playerScores[playerId] || 0) + 1,
      },
    })),

  decrementPlayerScore: (playerId) =>
    set((state) => ({
      playerScores: {
        ...state.playerScores,
        [playerId]: Math.max(0, (state.playerScores[playerId] || 0) - 1),
      },
    })),

  resetScores: () =>
    set({
      scores: [],
      playerScores: {},
    }),
}));
