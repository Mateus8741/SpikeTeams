import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import '../../global.css';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: true }} />

        <Stack.Screen name="teams" options={{ headerShown: false }} />

        <Stack.Screen name="score" options={{ headerShown: false }} />

        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
