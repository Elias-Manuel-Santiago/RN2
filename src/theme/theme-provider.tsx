import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import { useColorScheme } from 'react-native';
import { palettes } from './colors';

type Mode = 'light' | 'dark';
type ThemeValue = {
  colors: (typeof palettes)[Mode];
  isDark: boolean;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeValue | null>(null);

/** Usa el tema del sistema hasta que el usuario elige uno manualmente. */
export function ThemeProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  const [choice, setChoice] = useState<Mode | null>(null);
  const mode = choice ?? (systemTheme === 'dark' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider
      value={{
        colors: palettes[mode],
        isDark: mode === 'dark',
        toggleTheme: () => setChoice(mode === 'dark' ? 'light' : 'dark'),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme requiere ThemeProvider.');
  return theme;
}
