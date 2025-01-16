import { useEffect, useState } from 'react';

import { useScoreStore } from '~/store/scoreStore';
import { useTeamsStore } from '~/store/teamsStore';

export function useGameState() {
  const { teams } = useTeamsStore();
  const { scores, resetScores } = useScoreStore();
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winningTeamIndex, setWinningTeamIndex] = useState<number | null>(null);

  const score1 = scores[currentTeamIndex] || 0;
  const score2 = scores[(currentTeamIndex + 1) % teams.length] || 0;

  const isGameOver = () => {
    if (score1 >= 12 || score2 >= 12) {
      const scoreDifference = Math.abs(score1 - score2);
      return scoreDifference >= 2;
    }
    return false;
  };

  useEffect(() => {
    if (isGameOver()) {
      setGameOver(true);
      setWinningTeamIndex(
        score1 > score2 ? currentTeamIndex : (currentTeamIndex + 1) % teams.length
      );
    }
  }, [score1, score2]);

  const resetWinningTeamScore = (nextTeamIndex: number) => {
    setCurrentTeamIndex(nextTeamIndex);
    resetScores();
    setGameOver(false);
    setWinningTeamIndex(null);
  };

  return {
    currentTeamIndex,
    gameOver,
    resetWinningTeamScore,
    score1,
    score2,
    winningTeamIndex,
  };
}
