import { useScoreStore } from '~/store/scoreStore';

export function useScoreLogic() {
  const { incrementScore, decrementScore } = useScoreStore();

  const handleIncrement = (teamIndex: number) => {
    incrementScore(teamIndex);
  };

  const handleDecrement = (teamIndex: number) => {
    decrementScore(teamIndex);
  };

  return {
    handleIncrement,
    handleDecrement,
  };
} 