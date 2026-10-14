import { Platform } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { SensorControls } from '@/components/sensors/sensor-controls';
import { Metric } from '@/components/ui/metric';
import { ToolScreen } from '@/components/ui/tool-screen';
import { useSensor } from '@/hooks/use-sensor';
import { formatNumber } from '@/utils/format';


export function LightSensorTool() {
  const sensor = useSensor(LightSensor, true);
  return (
    <ToolScreen title="Luz ambiental">
      <Metric
        label="Iluminancia"
        value={formatNumber(sensor.data?.illuminance, 1, 'lx')}
      />
      <SensorControls {...sensor} />
    </ToolScreen>
  );
}
