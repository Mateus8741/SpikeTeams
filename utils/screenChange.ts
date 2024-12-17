import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

type OrientationType = 'portrait' | 'landscape' | 'default';

const orientationMap = {
  portrait: ScreenOrientation.OrientationLock.PORTRAIT,
  landscape: ScreenOrientation.OrientationLock.LANDSCAPE,
  default: ScreenOrientation.OrientationLock.DEFAULT,
} as const;

export function useScreenOrientation(orientation: OrientationType) {
  useEffect(() => {
    // Força a orientação escolhida ao montar
    ScreenOrientation.lockAsync(orientationMap[orientation]);

    // Retorna à orientação padrão ao desmontar
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    };
  }, [orientation]);
}
