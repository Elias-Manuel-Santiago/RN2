import { Text } from 'react-native';
import { useTheme } from '@/theme/theme-provider';

export function StatusText({
  children,
  error = false,
}: {
  children: string | null;
  error?: boolean;
}) {
  const { colors } = useTheme();
  if (!children) return null;
  return (
    <Text
      accessibilityLiveRegion="polite"
      style={{
        color: error ? colors.danger : colors.muted,
        fontSize: 14,
        lineHeight: 21,
      }}
    >
      {children}
    </Text>
  );
}
