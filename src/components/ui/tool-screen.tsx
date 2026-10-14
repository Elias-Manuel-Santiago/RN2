import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/theme-provider';

export function ToolScreen({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 76,
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
        },
      ]}
    >
      <Text
        accessibilityRole="header"
        style={[styles.title, { color: colors.text }]}
      >
        {title}
      </Text>
      {children}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingBottom: 24,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
});
