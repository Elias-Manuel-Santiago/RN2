import { Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/theme-provider';

/** Botón flotante fuera del contenido de cada herramienta. */
export function ThemeToggle() {
  const { colors, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
      onPress={toggleTheme}
      style={[
        styles.button,
        {
          top: insets.top + 15,
          right: insets.right + 16,
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.icon, { color: colors.text }]}>
        {isDark ? '☀' : '☾'}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  icon: { fontSize: 26 },
});
