import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ToolTabs } from '@/components/navigation/tool-tabs';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ThemeProvider, useTheme } from '@/theme/theme-provider';

function AppLayout() {
  const { colors, isDark } = useTheme();
  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ToolTabs />
      <ThemeToggle />
    </View>
  );
}

/** El tema y las áreas seguras son compartidos por todas las rutas. */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
