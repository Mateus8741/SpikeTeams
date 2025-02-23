import { useAnimatedStyle } from 'react-native-reanimated';

export const useVolleyballStyle = (rotation: any) =>
  useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

export const useFireStyle = (scale: any) =>
  useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
