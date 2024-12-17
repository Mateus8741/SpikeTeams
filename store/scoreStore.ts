import { create } from 'zustand';

interface GameScore {
  scores: number[];
}

interface ScoreState extends GameScore {
  incrementScore: (teamIndex: number) => void;
  decrementScore: (teamIndex: number) => void;
  resetScores: () => void;
}

export const useScoreStore = create<ScoreState>()((set) => ({
  scores: [],

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

  resetScores: () =>
    set({
      scores: [],
    }),
})); 