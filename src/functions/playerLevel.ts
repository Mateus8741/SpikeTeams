import { cancelAnimation } from 'react-native-reanimated';

import {
    fireScaleAnimation,
    resetScaleAnimation,
    rotationAnimation,
} from '@/animations/playerLevel';

export const levels = [
  { icon: 'volleyball', color: '#9CA3AF', isFireIcon: false },
  { icon: 'volleyball', color: '#60A5FA', isFireIcon: false },
  { icon: 'volleyball', color: '#34D399', isFireIcon: false },
  { icon: 'fire', color: '#F87171', isFireIcon: true },
];

export const handleRotationAnimation = (rotation: any) => {
  rotationAnimation(rotation);
};

export const handleFireAnimation = (fireScale: any, level: number) => {
  cancelAnimation(fireScale);

  if (level === 4) {
    fireScaleAnimation(fireScale);
  } else {
    resetScaleAnimation(fireScale);
  }
};
