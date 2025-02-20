import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

export function useOrientation(pathname: string) {
  useEffect(() => {
    async function updateOrientation() {
      if (pathname === '/score') {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
    }

    updateOrientation();
  }, [pathname]);
}
