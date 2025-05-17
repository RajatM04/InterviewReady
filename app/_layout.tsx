// app/_layout.tsx

import { Slot, usePathname } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QuizProvider } from '../app/Store/QuizContext'; 
import { useEffect } from 'react';

export default function Layout() {
  const pathname = usePathname();
  console.log("Current Route:", pathname);

  useEffect(() => {

  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QuizProvider>
        <Slot />
      </QuizProvider>
    </GestureHandlerRootView>
  );
}
