import { Easing, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';

export const rotationAnimation = (rotation: any) => {
  rotation.value = withSequence(
    withTiming(360, {
      duration: 600,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    withTiming(0, { duration: 0 })
  );
};

export const fireScaleAnimation = (fireScale: any) => {
  fireScale.value = withRepeat(
    withSequence(
      withSpring(1.2, { damping: 2, stiffness: 80 }),
      withSpring(1, { damping: 2, stiffness: 80 })
    ),
    -1,
    true
  );
};

export const resetScaleAnimation = (fireScale: any) => {
  fireScale.value = withSpring(1);
};
