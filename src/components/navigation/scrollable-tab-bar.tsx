import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/theme-provider';

/** Mantiene visible la pestaña seleccionada, incluso al abrir enlaces directos. */
export function ScrollableTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scroll = useRef<ScrollView>(null);
  const positions = useRef<Record<string, number>>({});
  const selectedKey = state.routes[state.index].key;
  useEffect(() => {
    scroll.current?.scrollTo({
      x: Math.max(0, (positions.current[selectedKey] ?? 0) - 16),
      animated: false,
    });
  }, [selectedKey]);
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <ScrollView
        ref={scroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {state.routes.map((route, index) => {
          const selected = index === state.index;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              aria-selected={selected}
              onLayout={({ nativeEvent }) => {
                positions.current[route.key] = nativeEvent.layout.x;
              }}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!selected && !event.defaultPrevented)
                  navigation.navigate(route.name, route.params);
              }}
              onLongPress={() =>
                navigation.emit({ type: 'tabLongPress', target: route.key })
              }
              style={[
                styles.tab,
                {
                  borderBottomColor: selected ? colors.primary : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  styles.label,
                  { color: selected ? colors.primary : colors.muted },
                ]}
              >
                {descriptors[route.key].options.title ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  tabs: { paddingHorizontal: 8, gap: 4 },
  tab: {
    minHeight: 56,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderBottomWidth: 3,
  },
  label: { fontSize: 14, fontWeight: '600' },
});
