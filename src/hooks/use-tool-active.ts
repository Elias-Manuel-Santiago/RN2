import { useIsFocused } from 'expo-router';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

/** No suspende la sesión por el estado transitorio de un diálogo del sistema. */
export function useToolActive() {
  const focused = useIsFocused();
  const [foreground, setForeground] = useState(
    AppState.currentState !== 'background',
  );
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) =>
      setForeground(state !== 'background'),
    );
    return () => subscription.remove();
  }, []);
  return focused && foreground;
}
