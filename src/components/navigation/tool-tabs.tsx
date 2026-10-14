import { Tabs } from 'expo-router/js-tabs';
import { useTheme } from '@/theme/theme-provider';
import { ScrollableTabBar } from './scrollable-tab-bar';

/** Una ruta por herramienta; las vistas se cargan al abrir su pestaña. */
export function ToolTabs() {
  const { colors } = useTheme();
  return (
    <Tabs
      tabBar={(props) => <ScrollableTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        animation: 'none',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Cámara' }} />
      <Tabs.Screen name="codes" options={{ title: 'Códigos' }} />
      <Tabs.Screen name="location" options={{ title: 'GPS' }} />
      <Tabs.Screen name="accelerometer" options={{ title: 'Acelerómetro' }} />
      <Tabs.Screen name="gyroscope" options={{ title: 'Giroscopio' }} />
      <Tabs.Screen name="biometrics" options={{ title: 'Biometría' }} />
      <Tabs.Screen name="microphone" options={{ title: 'Micrófono' }} />
      <Tabs.Screen name="flashlight" options={{ title: 'Linterna' }} />
      <Tabs.Screen name="vibration" options={{ title: 'Vibración' }} />
      <Tabs.Screen name="light" options={{ title: 'Luz' }} />
    </Tabs>
  );
}
