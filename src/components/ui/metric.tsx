import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/theme-provider';

export function Metric({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.row,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text style={{ color: colors.muted, fontSize: 14 }}>{label}</Text>
      <Text selectable style={[styles.value, { color: colors.text }]}>
        {value}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { padding: 16, borderWidth: 1, borderRadius: 12, gap: 8 },
  value: { fontSize: 22, fontWeight: '600', fontVariant: ['tabular-nums'] },
});
